import { inject, ref } from 'vue'
import type Map from 'ol/Map'

type ExtentedMap = Map & {
  controls_?: any[]
}

// 定义控件状态类型
export interface ControlState {
  measureLengthActive: boolean
  measureAreaActive: boolean
  swipeActive: boolean
  baseLayerSwitcherActive: boolean
  plotActive: boolean
  clearPlotLayerTag: boolean
  textLabelActive: boolean
  // 可以添加更多控件状态
}

// 创建全局控件状态
const controlState = ref<ControlState>({
  measureLengthActive: false,
  measureAreaActive: false,
  swipeActive: false,
  baseLayerSwitcherActive: false,
  plotActive: false,
  clearPlotLayerTag: false,
  textLabelActive: false
})

export default function useControl() {
  const map = inject<ExtentedMap>('map')

  // 关闭所有控件
  const closeAllControls = () => {
    controlState.value.measureLengthActive = false
    controlState.value.measureAreaActive = false
    controlState.value.swipeActive = false
    controlState.value.baseLayerSwitcherActive = false
    controlState.value.plotActive = false
    controlState.value.textLabelActive = false
  }

  /**
   * @description: 清空标绘图层
   */
  const clearPlotLayer = () => {
    controlState.value.clearPlotLayerTag = true
  }

  return {
    map,
    controlState,
    closeAllControls,
    clearPlotLayer
  }
}

// 导出控件状态，供组件直接使用
export { controlState }
