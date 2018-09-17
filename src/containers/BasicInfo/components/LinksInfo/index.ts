import $ from 'jquery'
import Router from '../../../../models/Router'
import Device from '../../../../models/Device'
import { routerFields, deviceFields } from '../../../../constants/link'
import './index.scss'

export default class LinksInfo{
  routerInfo: Router
  devices: Array<Device>
  element: JQuery
  routerInfoElement: JQuery
  deviceListElement: JQuery
  tpl: string = `
    <div class="panel links-info">
      <div class="panel-header">
        <span class="panel-icon link-icon"></span>
        <span class="panel-title">链路信息</span>
      </div>
      <div class="panel-body">
        <div class="router-info"></div>
        <table class="device-list"></table>
      </div>
    </div>
  `
  constructor(){
    this.element = $(this.tpl)
    this.routerInfoElement = this.element.find('.router-info')
    this.deviceListElement = this.element.find('.device-list')
  }

  setRouterInfo(routerInfo: Router) {
    this.routerInfo = routerInfo
    this.updateRouterInfo()
  }

  setDevices(devices: Array<Device>) {
    this.devices = devices
    this.updateDevices()
  }

  updateRouterInfo() {
    const values: any = this.routerInfo || new Router()
    const propElements = []
    for(let index = 0, length = routerFields.length; index < length; index++){
      const field = routerFields[index]
      const value = values[field.name] || ''
      propElements.push(`
        <div class="router-prop">
          <div class="router-prop-name">${field.text}</div>
          <div class="router-prop-value">${value}</div>
        </div>
      `)
    }
    this.routerInfoElement.empty()
    this.routerInfoElement.append(propElements.join(''))
  }

  generateDeviceHeader(): string{
    const ths = []
    for(let index = 0, length = deviceFields.length; index < length; index++){
      const field = deviceFields[index]
      ths.push(`<th>${field.text}</th>`)
    }
    return '<thead><tr></tr></thead>'
  }

  generateDeviceRow(device: any): string{
    const tds = []
    for(let index = 0, length = deviceFields.length; index < length; index++){
      const field = deviceFields[index]
      tds.push(`<td>${device[field.name]}</td>`)
    }
    return `<tr>${tds.join('')}<tr>`
  }

  updateDevices() {
    const devices: Array<Device> = this.devices || []
    const rows = []
    for(let index = 0, length = devices.length; index < length; index++){
      const device = devices[index]
      device.no = index + 1
      rows.push(this.generateDeviceRow(device))
    }
    this.deviceListElement.empty()
    const thead = this.generateDeviceHeader()
    this.deviceListElement.append(`
      ${thead}
      <tbody>${rows.join('')}</tbody>
    `)
  }

  render(): JQuery{
    this.updateRouterInfo()
    return this.element
  }
}
