<template>
  <div
    ref="controlRef"
    :title="t('plotControl.title')"
    :class="[
      'ol-styled-control-item',
      'plot-control',
      { active: controlState.plotActive }
    ]"
    @click="handleClick"
  >
    <slot>
      <!-- 默认图标 -->
      <svg viewBox="0 0 1024 1024" width="20" height="20" fill="currentColor">
        <path
          d="M512 64C282.8 64 96 250.8 96 480c0 119.6 50.4 227.2 131.2 304.8l-48 87.2 87.2-48C344 884.8 441.6 928 544 928c229.2 0 416-186.8 416-416S773.2 64 544 64z m0 736c-92.4 0-177.2-32-244-88.8l26.4-48c52 36.8 114.4 56.8 181.6 56.8 183.2 0 332-148.8 332-332S727.2 148 544 148 212 296.8 212 480c0 67.2 20 129.6 56.8 181.6l-48 26.4C164 611.2 132 526.4 132 434 132 232.4 296.4 68 544 68S956 232.4 956 434 791.6 800 544 800z"
        />
        <path d="M480 288h64v352h-64z" />
        <path d="M320 448h384v64H320z" />
      </svg>
    </slot>

    <!-- 标绘类型选择面板 -->
    <div v-if="controlState.plotActive" :class="['plot-panel', panelPosition]">
      <div class="plot-types-container">
        <div
          v-for="plotType in plotTypes"
          :key="plotType.type"
          :title="plotType.label"
          :class="['plot-type-item', { active: drawType === plotType.type }]"
          @click.stop="selectPlotType(plotType.type)"
        >
          <div class="plot-type-icon" :title="plotType.label">
            <div :class="plotType.icon" class="plot-type-icon-content"></div>
          </div>
        </div>
      </div>
    </div>
    <!-- 标绘图层 -->
    <ol-vector-layer
      v-if="
        clearOnClose ? controlState.plotActive : !controlState.clearPlotLayerTag
      "
    >
      <ol-source-vector>
        <ol-interaction-draw
          v-if="drawType"
          :type="getDrawType(drawType)"
          :geometryFunction="getGeometryFunction(drawType)"
          @drawend="onDrawEnd"
          @drawstart="onDrawStart"
        >
          <ol-style>
            <ol-style-stroke
              :color="plotThemeColor"
              :width="2"
            ></ol-style-stroke>
            <ol-style-fill :color="plotFillColor"></ol-style-fill>
            <ol-style-circle :radius="7">
              <ol-style-fill :color="plotThemeColor" />
              <ol-style-stroke :color="plotThemeColor" :width="2" />
            </ol-style-circle>
          </ol-style>
        </ol-interaction-draw>
      </ol-source-vector>

      <ol-style>
        <ol-style-stroke :color="plotThemeColor" :width="2"></ol-style-stroke>
        <ol-style-fill :color="plotFillColor"></ol-style-fill>
        <ol-style-circle :radius="7">
          <ol-style-fill :color="plotThemeColor"></ol-style-fill>
        </ol-style-circle>
      </ol-style>
    </ol-vector-layer>
  </div>
</template>

<script setup lang="ts">
import { inject, onUnmounted, watch, ref, computed } from 'vue'
import type Map from 'ol/Map'
import type { DrawEvent } from 'ol/interaction/Draw'
import { createBox, createRegularPolygon } from 'ol/interaction/Draw'
import { LineString, Polygon } from 'ol/geom'
import useControl from '@/composables/useControl'
import { globalI18n, defaultI18n } from '@/i18n'
import type { Coordinate } from 'ol/coordinate'
import { ColorHelper } from '@/utils/color'

// 使用 i18n，优先使用全局配置的 i18n，否则使用默认的
const t = (key: string) => {
  if (globalI18n) {
    return globalI18n.t(key)
  }
  return defaultI18n.t(key)
}
// 使用组合函数
const { controlState, closeAllControls } = useControl()

interface Props {
  // 标绘主颜色
  plotThemeColor?: string
  // 是否在关闭控件时清除标绘图层
  clearOnClose?: boolean
}

const props = withDefaults(defineProps<Props>(), {
  // 标绘主颜色
  plotThemeColor: '#ffcc33',
  // 是否在关闭控件时清除标绘图层
  clearOnClose: false
})

const plotFillColor = computed(() => {
  return ColorHelper.setAlpha(props.plotThemeColor, 0.2)
})
// 定义事件发射器
const emit = defineEmits([
  'click',
  'plot-active-change',
  'plot-start',
  'plot-end'
])

// 从父组件注入地图实例
const map = inject<Map>('map')

// 控制元素引用
const controlRef = ref<HTMLElement | null>(null)

// 面板位置
const panelPosition = ref('bottom-right')

// 绘制类型
const drawType = ref<string | null>(null)

// 扩展的标绘类型配置
const plotTypes = [
  {
    type: 'Point',
    label: t('plotControl.point'),
    icon: 'PointIcon'
  },
  {
    type: 'LineString',
    label: t('plotControl.lineString'),
    icon: 'LineStringIcon'
  },
  {
    type: 'Polygon',
    label: t('plotControl.polygon'),
    icon: 'PolygonIcon'
  },
  {
    type: 'Circle',
    label: t('plotControl.circle'),
    icon: 'CircleIcon'
  },
  {
    type: 'Box',
    label: t('plotControl.box'),
    icon: 'BoxIcon'
  },
  {
    type: 'Square',
    label: t('plotControl.square'),
    icon: 'SquareIcon'
  },
  {
    type: 'Star',
    label: t('plotControl.star'),
    icon: 'StarIcon'
  },
  {
    type: 'StraightArrow',
    label: t('plotControl.straightArrow'),
    icon: 'StraightArrowIcon'
  },
  {
    type: 'FineArrow',
    label: t('plotControl.fineArrow'),
    icon: 'FineArrowIcon'
  }
]

// 获取绘制类型
const getDrawType = (type: string | null) => {
  if (!type) return 'Point'

  // 对于需要特殊处理的类型，使用Circle作为基础类型
  if (
    type === 'Box' ||
    type === 'Square' ||
    type === 'StraightArrow' ||
    type === 'FineArrow' ||
    type === 'Star'
  ) {
    return 'Circle'
  }

  return type
}

// 获取几何函数
const getGeometryFunction = (type: string | null) => {
  if (!type) return undefined

  switch (type) {
    case 'Box':
      return createBox()
    case 'Square':
      return createRegularPolygon(4)
    case 'StraightArrow':
      return createStraightArrowGeometryFunction()
    case 'FineArrow':
      return createFineArrowGeometryFunction()
    case 'Star':
      return createStarGeometryFunction()
    default:
      return undefined
  }
}

// 创建StraightArrow几何函数 - 继承自LineString，是一个简单的直线箭头
const createStraightArrowGeometryFunction = () => {
  return (coordinates: any, geometry: any) => {
    if (!geometry) {
      geometry = new LineString([])
    }

    // 确保有足够的坐标点
    if (coordinates.length >= 2) {
      const start = coordinates[0]
      const end = coordinates[1]

      // 计算箭头的基本参数
      const dx = end[0] - start[0]
      const dy = end[1] - start[1]
      const length = Math.sqrt(dx * dx + dy * dy)
      const angle = Math.atan2(dy, dx)

      if (length > 0) {
        // 箭头头部大小
        const headLength = Math.min(length * 0.2, 20)

        // 箭头两侧点
        const headAngle1 = angle + Math.PI / 6
        const headAngle2 = angle - Math.PI / 6
        const headPoint1 = [
          end[0] - headLength * Math.cos(headAngle1),
          end[1] - headLength * Math.sin(headAngle1)
        ]
        const headPoint2 = [
          end[0] - headLength * Math.cos(headAngle2),
          end[1] - headLength * Math.sin(headAngle2)
        ]

        // 创建StraightArrow - 只有主体线，没有多边形头部
        // 这里我们创建一个包含主体线和头部线的LineString
        const arrowCoords = [start, end, headPoint1, end, headPoint2]

        geometry.setCoordinates(arrowCoords)
      } else {
        // 如果长度为0，创建一个点
        geometry.setCoordinates([start, [start[0] + 1, start[1] + 1]])
      }
    }

    return geometry
  }
}

// 创建FineArrow几何函数 - 继承自Polygon，是一个多边形箭头
const createFineArrowGeometryFunction = () => {
  // 参考 generate() 和 getThirdPoint 的实现思路，使用两点生成细箭头
  const HALF_PI = Math.PI / 2

  const distance = (a: Coordinate, b: Coordinate) => {
    const dx = b[0]! - a[0]!
    const dy = b[1]! - a[1]!
    return Math.sqrt(dx * dx + dy * dy)
  }

  const getAzimuth = (startPoint: Coordinate, endPoint: Coordinate) => {
    let azimuth = 0
    const angle = Math.asin(
      Math.abs(endPoint[1]! - startPoint[1]!) / distance(startPoint, endPoint)
    )
    if (endPoint[1]! >= startPoint[1]! && endPoint[0]! >= startPoint[0]!) {
      azimuth = angle + Math.PI
    } else if (
      endPoint[1]! >= startPoint[1]! &&
      endPoint[0]! < startPoint[0]!
    ) {
      azimuth = Math.PI * 2 - angle
    } else if (endPoint[1]! < startPoint[1]! && endPoint[0]! < startPoint[0]!) {
      azimuth = angle
    } else if (
      endPoint[1]! < startPoint[1]! &&
      endPoint[0]! >= startPoint[0]!
    ) {
      azimuth = Math.PI - angle
    }
    return azimuth
  }

  const getThirdPoint = (
    startPnt: Coordinate,
    endPnt: Coordinate,
    angle: number,
    dist: number,
    clockWise?: boolean
  ): Coordinate => {
    const azimuth = getAzimuth(startPnt, endPnt)
    const alpha = clockWise ? azimuth + angle : azimuth - angle
    const dx = dist * Math.cos(alpha)
    const dy = dist * Math.sin(alpha)
    return [endPnt[0]! + dx, endPnt[1]! + dy]
  }

  // 参数因子，可根据需要调整以匹配视觉效果
  const tailWidthFactor = 0.1
  const neckWidthFactor = 0.2
  const headWidthFactor = 0.25
  const neckAngle = Math.PI / 13 // 约 28°
  const headAngle = Math.PI / 8.5 // 约 42°

  return (coordinates: any, geometry: any) => {
    if (!geometry) {
      geometry = new Polygon([])
    }

    // 使用第一个点和最后一个点作为尾部与头部参考
    if (coordinates.length >= 2) {
      const pnt1 = coordinates[0]
      const pnt2 = coordinates[coordinates.length - 1]

      const len = distance(pnt1, pnt2)
      if (len > 0) {
        const tailWidth = len * tailWidthFactor
        const neckWidth = len * neckWidthFactor
        const headWidth = len * headWidthFactor

        const tailLeft = getThirdPoint(pnt2, pnt1, HALF_PI, tailWidth, true)
        const tailRight = getThirdPoint(pnt2, pnt1, HALF_PI, tailWidth, false)
        const headLeft = getThirdPoint(pnt1, pnt2, headAngle, headWidth, false)
        const headRight = getThirdPoint(pnt1, pnt2, headAngle, headWidth, true)
        const neckLeft = getThirdPoint(pnt1, pnt2, neckAngle, neckWidth, false)
        const neckRight = getThirdPoint(pnt1, pnt2, neckAngle, neckWidth, true)

        const ring = [
          tailLeft,
          neckLeft,
          headLeft,
          pnt2,
          headRight,
          neckRight,
          tailRight,
          tailLeft
        ]

        geometry.setCoordinates([ring])
      } else {
        // 长度过短时给出一个最小可见形状
        const x = pnt1[0]
        const y = pnt1[1]
        geometry.setCoordinates([
          [
            [x, y],
            [x + 0.5, y],
            [x + 0.5, y + 0.5],
            [x, y + 0.5],
            [x, y]
          ]
        ])
      }
    }

    return geometry
  }
}

// 创建星形几何函数
const createStarGeometryFunction = () => {
  return (coordinates: any, geometry: any) => {
    const center = coordinates[0]
    const last = coordinates[coordinates.length - 1]
    const dx = center[0] - last[0]
    const dy = center[1] - last[1]
    const radius = Math.sqrt(dx * dx + dy * dy)
    const rotation = Math.atan2(dy, dx)
    const newCoordinates: number[][] = []
    const numPoints = 12

    for (let i = 0; i < numPoints; ++i) {
      const angle = rotation + (i * 2 * Math.PI) / numPoints
      const fraction = i % 2 === 0 ? 1 : 0.5
      const offsetX = radius * fraction * Math.cos(angle)
      const offsetY = radius * fraction * Math.sin(angle)
      newCoordinates.push([center[0] + offsetX, center[1] + offsetY])
    }

    // 确保第一个点存在再复制
    if (newCoordinates.length > 0 && newCoordinates[0]?.length) {
      newCoordinates.push([newCoordinates[0][0]!, newCoordinates[0][1]!])
    }

    if (!geometry) {
      geometry = new Polygon([newCoordinates])
    } else {
      geometry.setCoordinates([newCoordinates])
    }

    return geometry
  }
}

// 计算面板位置
const calculatePanelPosition = () => {
  if (!controlRef.value) return

  // 获取控制元素的位置信息
  const rect = controlRef.value.getBoundingClientRect()
  const windowWidth = window.innerWidth
  const windowHeight = window.innerHeight

  // 根据控制元素的位置决定面板显示位置
  const isRight = rect.left > windowWidth / 2
  const isBottom = rect.top > windowHeight / 2

  if (isRight && isBottom) {
    panelPosition.value = 'top-left'
  } else if (isRight && !isBottom) {
    panelPosition.value = 'bottom-left'
  } else if (!isRight && isBottom) {
    panelPosition.value = 'top-right'
  } else {
    panelPosition.value = 'bottom-right'
  }
}

// 绘制开始事件处理
const onDrawStart = (event: DrawEvent) => {
  emit('plot-start', { type: drawType.value, event })
}

// 绘制结束事件处理
const onDrawEnd = (event: DrawEvent) => {
  emit('plot-end', { type: drawType.value, event })

  // 绘制结束后清除绘制类型
  //   drawType.value = null
}

// 选择标绘类型
const selectPlotType = (type: string) => {
  drawType.value = type
  emit('plot-active-change', true)

  // 关闭面板
  //   controlState.value.plotActive = false
}

const handleClick = (event: unknown) => {
  // 发射点击事件
  emit('click', event)

  if (map) {
    // 如果之前是激活状态，现在要关闭
    if (controlState.value.plotActive) {
      controlState.value.plotActive = false
      emit('plot-active-change', false)
    } else {
      // 关闭所有其他控件
      closeAllControls()

      // 激活标绘控件
      controlState.value.plotActive = true
      emit('plot-active-change', true)
    }
  } else {
    console.warn('地图实例未找到')
  }
}

// 监听标绘控件状态变化
watch(
  () => controlState.value.plotActive,
  newValue => {
    if (newValue) {
      // 计算面板位置
      calculatePanelPosition()
    } else {
      // 清除活动的标绘类型
      drawType.value = null
    }
  }
)
watch(
  () => controlState.value.clearPlotLayerTag,
  newValue => {
    if (newValue) {
      // 清除标绘图层
      setTimeout(() => {
        controlState.value.clearPlotLayerTag = false
      }, 100)
    }
  }
)

// 监听窗口大小变化
window.addEventListener('resize', () => {
  if (controlState.value.plotActive) {
    setTimeout(() => {
      calculatePanelPosition()
    }, 0)
  }
})

// 组件卸载时清理资源
onUnmounted(() => {
  // 确保组件卸载时关闭标绘控件
  controlState.value.plotActive = false

  // 移除事件监听器
  window.removeEventListener('resize', calculatePanelPosition)
})

// 暴露给外部的属性和方法
defineExpose({
  selectPlotType
})
</script>

<style scoped lang="scss">
.plot-control {
  position: relative;

  &.active {
    background-color: var(--styled-control-item-active-bg-color, #eeeeee);
  }
  .plot-panel {
    position: absolute;
    background: var(
      --styled-control-plot-panel-bg-color,
      rgba(255, 255, 255, 0.8)
    );
    border: 1px solid var(--styled-control-bar-border-color);
    border-radius: 8px;
    box-shadow: var(
      --styled-control-bar-box-shadow,
      0px 2px 4px 0px rgba(148, 149, 151, 0.5)
    );
    padding: 12px;
    z-index: 1000;

    &.bottom-right {
      top: calc(100% + 10px);
      left: 0;
    }

    &.bottom-left {
      top: calc(100% + 10px);
      right: 0;
    }

    &.top-right {
      bottom: 0;
      left: calc(100% + 10px);
    }

    &.top-left {
      bottom: 0;
      right: calc(100% + 10px);
    }

    .plot-types-container {
      display: grid;
      grid-template-columns: repeat(3, 1fr);
      gap: 10px;
    }

    .plot-type-item {
      display: flex;
      flex-direction: column;
      align-items: center;
      border-radius: 4px;
      cursor: pointer;
      border: 2px solid transparent;

      &:hover {
        background-color: var(--styled-control-item-hover-bg-color, #f5f5f5);
        border-color: #1890ff;
      }

      &.active {
        background-color: var(--styled-control-item-active-bg-color, #e6f7ff);
        border-color: #1890ff;
      }

      .plot-type-icon {
        width: 20px;
        height: 20px;
        display: flex;
        align-items: center;
        justify-content: center;
        padding: 2px;
        .plot-type-icon-content {
          width: 20px;
          height: 20px;
          box-sizing: border-box;
        }
        /* 标绘类型图标 */
        .PointIcon {
          width: 8px;
          height: 8px;
          border-radius: 50%;
          background-color: var(--styled-control-icon-color);
        }

        .LineStringIcon {
          position: relative;

          &::before {
            content: '';
            position: absolute;
            top: 50%;
            left: 0;
            right: 0;
            height: 1px;
            background-color: var(--styled-control-icon-color);
            transform: translateY(-50%);
          }

          &::after {
            content: '';
            position: absolute;
            top: 50%;
            left: 50%;
            width: 6px;
            height: 6px;
            background-color: var(--styled-control-icon-color);
            border-radius: 50%;
            transform: translate(-50%, -50%);
          }
        }

        .PolygonIcon {
          position: relative;
          background-color: var(--styled-control-icon-color); /* 空心多边形 */
          /* 更贴近实际不规则多边形形状 */
          clip-path: polygon(
            15% 70%,
            25% 35%,
            55% 22%,
            85% 45%,
            70% 80%,
            38% 88%
          );
        }

        .CircleIcon {
          border: 1px solid var(--styled-control-icon-color);
          border-radius: 50%;
          background-color: var(--styled-control-icon-fill-color);
        }

        .BoxIcon {
          width: 20px;
          height: 14px;
          border: 1px solid var(--styled-control-icon-color);
          background-color: var(--styled-control-icon-fill-color);
          margin: 3px 0;
        }

        .SquareIcon {
          width: 18px;
          height: 18px;
          border: 1px solid var(--styled-control-icon-color);
          background-color: var(--styled-control-icon-fill-color);
          margin: 1px 1px;
        }

        .StarIcon {
          position: relative;

          &::before {
            content: '';
            position: absolute;
            top: 50%;
            left: 50%;
            width: 20px;
            height: 20px;
            background-color: var(--styled-control-icon-color);
            clip-path: polygon(
              50% 0%,
              61% 35%,
              98% 35%,
              68% 57%,
              79% 91%,
              50% 70%,
              21% 91%,
              32% 57%,
              2% 35%,
              39% 35%
            );
            transform: translate(-50%, -50%);
          }
        }

        /* StraightArrow图标 - 更形象的箭头（加粗箭杆与更宽箭头） */
        .StraightArrowIcon {
          position: relative;
          &::before {
            /* 箭杆 */
            content: '';
            position: absolute;
            top: 50%;
            left: 10%;
            right: 0;
            height: 1px;
            background-color: var(--styled-control-icon-color);
            border-radius: 1px;
            transform: translateY(-50%);
          }

          &::after {
            /* 箭头改为开口的“>”形状 */
            content: '';
            position: absolute;
            top: 50%;
            right: 8%;
            width: 8px;
            height: 8px;
            border-right: 1px solid var(--styled-control-icon-color);
            border-top: 1px solid var(--styled-control-icon-color);
            transform: translateY(-50%) rotate(45deg);
          }
        }

        /* FineArrow图标 - 精细箭头，添加一个装饰矩形 */
        .FineArrowIcon {
          position: relative;

          &::before {
            content: '';
            position: absolute;
            top: 50%;
            left: 2px;
            right: 6px;
            height: 4px;
            background-color: var(--styled-control-icon-color);
            transform: translateY(-50%);
          }

          &::after {
            content: '';
            position: absolute;
            top: 50%;
            right: 2px;
            width: 0;
            height: 0;
            border-top: 4px solid transparent;
            border-bottom: 4px solid transparent;
            border-left: 8px solid var(--styled-control-icon-color);
            transform: translateY(-50%);
          }

          /* 添加装饰矩形 */
          .decoration {
            position: absolute;
            top: 50%;
            left: 6px;
            width: 4px;
            height: 4px;
            background-color: var(--styled-control-icon-color);
            transform: translateY(-50%);
          }
        }
      }
    }
  }
}
</style>
