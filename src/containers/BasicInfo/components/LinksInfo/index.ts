import $ from 'jquery'
import Router from '../../../../models/Router'
import Device from '../../../../models/Device'
import { routerFields, deviceFields, DeviceStatus } from '../../../../constants/link'
import './index.scss'

export default class LinksInfo{
  routerInfo: Router
  devices: Array<Device>
  element: JQuery
  routerInfoElement: JQuery
  deviceListElement: JQuery
  deviceGridElement: JQuery
  tpl: string = `
    <div class="panel links-info">
      <div class="panel-header">
        <span class="panel-icon link-icon"></span>
        <span class="panel-title">链路信息</span>
      </div>
      <div class="panel-body">
        <div class="router-props"></div>
        <table class="device-list" cell-spacing="0" cell-padding="0"></table>
        <div class="device-grid"></div>
      </div>
    </div>
  `
  constructor(){
    this.element = $(this.tpl)
    this.routerInfoElement = this.element.find('.router-props')
    this.deviceListElement = this.element.find('.device-list')
    this.deviceGridElement = this.element.find('.device-grid')
  }

  setRouterInfo(routerInfo: Router) {
    this.routerInfo = routerInfo
    this.updateRouterInfo()
  }

  setDevices(devices: Array<Device>) {
    this.devices = devices
    this.updateDevices()
    this.updateDeviceGrid()
  }

  updateRouterInfo() {
    const values: any = this.routerInfo || new Router()
    const propElements = []
    for(let index = 0, length = routerFields.length; index < length; index++){
      const field = routerFields[index]
      const value = values[field.name] || ''
      propElements.push(`
        <div class="router-prop">
          <div class="router-prop-name">${field.text}:</div>
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
    return `<thead><tr>${ths.join('')}</tr></thead>`
  }

  generateDeviceRow(device: any): string{
    const tds = []
    for(let index = 0, length = deviceFields.length; index < length; index++){
      const field = deviceFields[index]
      const content = field.render ? field.render(device) : device[field.name]
      tds.push(`<td>${content}</td>`)
    }
    return `<tr>${tds.join('')}</tr>`
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

  generateDeviceGridRow(device: any){
    const status = device['status']
    const statusCls = status === DeviceStatus.ONLINE ? 'online' : 'offline'
    return `
      <div class="grid-device ${statusCls}">
        <div class="grid-device-no">${device.no}</div>
        <div class="grid-device-props">
          <div class="device-name">
            <span class="device-status"></span>
            <span class="device-name-value">${device.name}</span>
          </div>
          <div class="device-prop">
            <div class="device-prop-name">IT:</div>
            <div class="device-prop-value">${device.ip}</div>
          </div>
          <div class="device-prop">
            <div class="device-prop-name">RT MAC:</div>
            <div class="device-prop-value">${device.mac}</div>
          </div>
          <div class="device-seperate-line"></div>
          <div class="device-prop column">
            <div class="device-prop-name">发送MSC:</div>
            <div class="device-prop-value">${device.sendMcs}</div>
          </div>
          <div class="device-prop column">
            <div class="device-prop-name">AP RSL:</div>
            <div class="device-prop-value">${device.rsl}</div>
          </div>
          <div class="device-prop column">
            <div class="device-prop-name">接收MSC:</div>
            <div class="device-prop-value">${device.receiveMcs}</div>
          </div>
          <div class="device-prop column">
            <div class="device-prop-name">距离:</div>
            <div class="device-prop-value">${device.distance}</div>
          </div>
        </div>
      </div>
    `
  }

  updateDeviceGrid() {
    const devices: Array<Device> = this.devices || []
    const rows = []
    for(let index = 0, length = devices.length; index < length; index++){
      const device = devices[index]
      device.no = index + 1
      rows.push(this.generateDeviceGridRow(device))
    }
    this.deviceGridElement.empty()
    this.deviceGridElement.append(rows.join(''))
  }

  render(): JQuery{
    this.updateRouterInfo()
    return this.element
  }
}
