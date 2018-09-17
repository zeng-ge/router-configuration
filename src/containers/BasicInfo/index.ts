import $ from 'jquery'
import LinksInfo from './components/LinksInfo'
import SystemInfo from './components/SystemInfo'
import './index.scss'
import BasicInfoService, { basicService } from '../../services/BasicInfoService'

export default class BasicInfo{
  linksInfo: LinksInfo
  systemInfo: SystemInfo
  element: JQuery

  tpl: string = `
    <div class="basic-info"></div>
  `

  constructor() {
    this.linksInfo = new LinksInfo()
    this.systemInfo = new SystemInfo()
    this.element = $(this.tpl)
    this.loadBasicInfo()
  }

  loadBasicInfo() {
    const systemProps = basicService.getSystemInfo()
    const routerProps = basicService.getRouterInfo()
    const devices = basicService.getDevices()

    this.linksInfo.setRouterInfo(routerProps)
    this.linksInfo.setDevices(devices)
    this.systemInfo.setSystemInfo(systemProps)
  }

  render() {
    this.element.append(this.linksInfo.render())
    this.element.append(this.systemInfo.render())
    return this.element
  }
}
