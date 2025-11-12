import type { Layer } from 'ol/layer'
import type LayerGroup from 'ol/layer/Group'
import { getCenter } from 'ol/extent'

/**
 * 图层预览相关的可复用方法
 */

/**
 * 获取图层标题
 * @param layer 图层对象
 * @returns 图层标题
 */
export function getLayerTitle(layer: Layer): string {
  return layer.get('title') || layer.get('name') || '未命名图层'
}

/**
 * 获取图层预览图URL
 * @param layer 图层对象
 * @param map 地图对象（可选，用于获取坐标系中心点）
 * @param resolution 分辨率，可选
 * @returns 预览图URL或null
 */
export function getLayerPreview(layer: Layer): string | null {
  try {
    // 检查图层是否有预设的预览图
    const preview = layer.get('preview')
    if (preview) {
      return preview
    }

    // 如果投影没有定义范围，尝试使用默认的Web Mercator范围
    const defaultExtent = [
      -20037508.342789244, -20037508.342789244, 20037508.342789244,
      20037508.342789244
    ]
    const projectionExtent = layer.getSource()?.getProjection()?.getExtent()
    const center = projectionExtent
      ? getCenter(projectionExtent)
      : getCenter(defaultExtent)

    // eslint-disable-next-line @typescript-eslint/ban-ts-comment
    // @ts-expect-error
    const resolution = layer.getSource()?.getTileGrid()?.getResolution(0)

    // 尝试调用图层的getPreview方法（根据你提供的代码示例）
    if (typeof (layer as any).getPreview === 'function') {
      const previews = (layer as any).getPreview(center, resolution)
      if (Array.isArray(previews) && previews.length > 0) {
        return previews[0]
      }
    }

    // 尝试从图层源获取预览图
    const source = (layer as any).getSource?.()
    if (source && typeof (source as any).getPreview === 'function') {
      const preview = (source as any).getPreview(center, resolution)
      if (preview) {
        return preview
      }
    }
  } catch (error) {
    console.warn('获取图层预览失败:', error)
  }

  return null
}

/**
 * 获取图层组的所有图层
 * @param layerGroup 图层组对象
 * @returns 图层数组
 */
export function getLayerGroupLayers(layerGroup: LayerGroup | Layer[]): Layer[] {
  if (Array.isArray(layerGroup)) {
    return layerGroup
  }

  if (typeof (layerGroup as LayerGroup).getLayers === 'function') {
    return (layerGroup as LayerGroup).getLayers().getArray()
  }

  return [layerGroup as Layer]
}

export default {
  getLayerTitle,
  getLayerPreview,
  getLayerGroupLayers
}
