import $ from 'jquery'
import System from '../../../../models/System'
import { fields } from '../../../../constants/system'
import './index.scss'

export default class SystemInfo{
  systemInfo: System
  element: JQuery
  propsElement: JQuery
  tpl: string = `
    <div class="panel system-info">
      <div class="panel-header">
        <span class="panel-icon system-icon"></span>
        <span class="panel-title">系统信息</span>
      </div>
      <div class="panel-body">
        <div class="system-props"></div>
      </div>
    </div>
  `

  constructor(){
    this.element = $(this.tpl)
    this.propsElement = this.element.find('.system-props')
  }

  setSystemInfo(systemInfo: System) {
    this.systemInfo = systemInfo
    this.renderItems()
  }

  renderItems(){
    const items = []
    const values: any = this.systemInfo || {}
    for(let index = 0, length = fields.length; index < length; index++){
      const field = fields[index]
      items.push(`
        <div class="system-prop-item">
          <div class="system-prop-item-name">${field.text}:</div>
          <div class="system-prop-item-value">${values[field.name]}</div>
        </div>
      `)
    }
    this.propsElement.empty()
    this.propsElement.append(items.join(''))
  }

  render(): JQuery{
    this.renderItems()
    return this.element
  }
}
