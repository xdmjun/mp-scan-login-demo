import defaultSettings from '@/settings'

const title = defaultSettings.title || '微信扫码登录Demo'

export default function getPageTitle(pageTitle) {
  if (pageTitle) {
    return `${pageTitle}`
  }
  return `${title}`
}
