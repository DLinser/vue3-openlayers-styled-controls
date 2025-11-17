// 导入语言文件
import zhCN from './locales/zh-CN.ts'
import en from './locales/en.ts'

// 定义支持的语言类型
export type Locale = 'zh-CN' | 'en'
export type LocaleMessages = typeof zhCN

// 创建一个简单的翻译函数
class SimpleI18n {
  private locale: string = 'zh-CN'
  private messages: Record<string, any> = {
    'zh-CN': zhCN,
    en: en
  }

  constructor(config?: { locale?: string; messages?: Record<string, any> }) {
    if (config) {
      this.locale = config.locale || this.locale
      this.messages = {
        ...this.messages,
        ...config.messages
      }
    }
  }

  t(key: string): string {
    // 简单的键值查找，支持嵌套对象
    const keys = key.split('.')
    let message: any = this.messages[this.locale]

    if (!message) {
      return key
    }

    for (const k of keys) {
      if (typeof message === 'object' && message !== null) {
        message = message[k]
      } else {
        message = undefined
        break
      }
    }

    return typeof message === 'string' ? message : key
  }

  setLocale(locale: string) {
    this.locale = locale
  }

  getLocale() {
    return this.locale
  }
}

// 创建默认实例
const defaultI18n = new SimpleI18n()

// 导出简单易用的函数
export function createI18n(config?: {
  locale?: string
  messages?: Record<string, any>
}) {
  return new SimpleI18n(config)
}

export function useI18n() {
  return {
    t: defaultI18n.t.bind(defaultI18n),
    locale: defaultI18n.getLocale()
  }
}

// 用于插件安装时的配置
export let globalI18n: SimpleI18n | null = null

export function setGlobalI18n(i18n: SimpleI18n) {
  globalI18n = i18n
}

export { defaultI18n }
