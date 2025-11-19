export type RGB = { r: number; g: number; b: number }
export type RGBA = { r: number; g: number; b: number; a: number }
export type HSL = { h: number; s: number; l: number }

export class ColorHelper {
  // ============== 基础解析 ==============
  /** HEX (#rrggbb / #rgb) → RGB */
  static hexToRgb(hex: string): RGB {
    hex = hex.replace('#', '')
    if (hex.length === 3) {
      hex = hex
        .split('')
        .map(c => c + c)
        .join('')
    }
    const int = parseInt(hex, 16)
    return {
      r: (int >> 16) & 255,
      g: (int >> 8) & 255,
      b: int & 255
    }
  }

  /** HEX (#rrggbbaa / #rgba) → RGBA */
  static hexToRgba(hex: string): RGBA {
    hex = hex.replace('#', '')

    if (hex.length === 3) {
      hex =
        hex
          .split('')
          .map(c => c + c)
          .join('') + 'ff'
    } else if (hex.length === 6) {
      hex += 'ff'
    }

    const int = parseInt(hex, 16)
    return {
      r: (int >> 24) & 255,
      g: (int >> 16) & 255,
      b: (int >> 8) & 255,
      a: (int & 255) / 255
    }
  }

  /** RGB → HEX */
  static rgbToHex(rgb: RGB): string {
    const { r, g, b } = rgb
    const hex = (r << 16) | (g << 8) | b
    return '#' + hex.toString(16).padStart(6, '0')
  }

  /** RGBA → HEX (#rrggbbaa) */
  static rgbaToHex(rgba: RGBA): string {
    const { r, g, b, a } = rgba
    const alpha = Math.round(a * 255)
    const hex = (r << 24) | (g << 16) | (b << 8) | alpha
    return '#' + hex.toString(16).padStart(8, '0')
  }

  /** RGB → HSL */
  static rgbToHsl({ r, g, b }: RGB): HSL {
    r /= 255
    g /= 255
    b /= 255

    const max = Math.max(r, g, b)
    const min = Math.min(r, g, b)
    const d = max - min

    let h = 0
    let l = (max + min) / 2
    let s = d === 0 ? 0 : d / (1 - Math.abs(2 * l - 1))

    if (d !== 0) {
      if (max === r) h = ((g - b) / d) % 6
      else if (max === g) h = (b - r) / d + 2
      else h = (r - g) / d + 4
    }

    h = Math.round(h * 60)
    if (h < 0) h += 360

    return { h, s, l }
  }

  /** HSL → RGB */
  static hslToRgb({ h, s, l }: HSL): RGB {
    s = Math.min(1, Math.max(0, s))
    l = Math.min(1, Math.max(0, l))

    const c = (1 - Math.abs(2 * l - 1)) * s
    const x = c * (1 - Math.abs(((h / 60) % 2) - 1))
    const m = l - c / 2

    let r = 0,
      g = 0,
      b = 0

    if (h < 60) [r, g, b] = [c, x, 0]
    else if (h < 120) [r, g, b] = [x, c, 0]
    else if (h < 180) [r, g, b] = [0, c, x]
    else if (h < 240) [r, g, b] = [0, x, c]
    else if (h < 300) [r, g, b] = [x, 0, c]
    else [r, g, b] = [c, 0, x]

    return {
      r: Math.round((r + m) * 255),
      g: Math.round((g + m) * 255),
      b: Math.round((b + m) * 255)
    }
  }

  // ============== 功能函数 ==============
  /** 修改透明度（输入 hex / rgb / rgba 都可以） */
  static setAlpha(color: string, alpha: number): string {
    if (color.startsWith('#')) {
      const rgba = this.hexToRgba(color)
      rgba.a = alpha
      return `rgba(${rgba.r}, ${rgba.g}, ${rgba.b}, ${rgba.a})`
    }

    if (color.startsWith('rgb')) {
      const match = color.match(/rgba?\((.+)\)/)
      if (!match) throw new Error('Invalid rgb/rgba format')
      const parts = match[1]!.split(',').map(v => parseFloat(v.trim()))
      const [r, g, b] = parts
      return `rgba(${r}, ${g}, ${b}, ${alpha})`
    }

    throw new Error('Unsupported format')
  }

  /** 调亮（ratio = 0.1 → 亮 10%） */
  static lighten(color: string, ratio: number): string {
    const rgb = this.colorToRgb(color)
    const hsl = this.rgbToHsl(rgb)
    hsl.l = Math.min(1, hsl.l + ratio)
    return this.rgbToHex(this.hslToRgb(hsl))
  }

  /** 调暗（ratio = 0.1 → 暗 10%） */
  static darken(color: string, ratio: number): string {
    const rgb = this.colorToRgb(color)
    const hsl = this.rgbToHsl(rgb)
    hsl.l = Math.max(0, hsl.l - ratio)
    return this.rgbToHex(this.hslToRgb(hsl))
  }

  /** 自动识别 hex / rgb / rgba → RGB */
  static colorToRgb(color: string): RGB {
    if (color.startsWith('#')) {
      return this.hexToRgb(color)
    }
    if (color.startsWith('rgb')) {
      const match = color.match(/rgba?\((.+)\)/)
      if (!match) throw new Error('Invalid rgb/rgba format')
      const values = match[1]!.split(',').map(v => parseFloat(v.trim()))
      return { r: values[0]!, g: values[1]!, b: values[2]! }
    }
    throw new Error('Unsupported color format')
  }

  /** 是否是合法颜色 (#hex 或 rgb/rgba) */
  static isValid(color: string): boolean {
    if (/^#([0-9a-fA-F]{3,8})$/.test(color)) return true
    if (/^rgba?\(/.test(color)) return true
    return false
  }
}
