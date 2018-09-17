import $ from 'jquery'
import BasicInfo from '../BasicInfo/index'
import { menus } from '../../constants/menu'
import './index.scss'

const defaultMenu = menus[0]
export default class Entry{
  private basicInfo: BasicInfo
  private element: JQuery
  private menuElement: JQuery
  private contentElement: JQuery
  private activeMenuItem: string = defaultMenu.name
  tpl: string = `
  <div class="router-wrap">
    <div class="router-header">
      <div class="router-container">
        <ul class="router-menu"></ul>
        <div class="router-env">
          <div class="router-personal">
            <span class="logout-icon"></span>
            <span class="logout-text">退出登录</span>
          </div>
          <div class="router-language">
            <span class="chinese">中文</span>
            <span class="english">英文</span>
          </div>
        </div>
      </div>
      <div class="router-header-line"></div>
    </div>
    <div class="router-content"></div>
  </div>
  `
  constructor(){
    this.element = $(this.tpl)
    this.basicInfo = new BasicInfo()
    this.menuElement = this.element.find('.router-menu')
    this.contentElement = this.element.find('.router-content')
    this.bindEvents()
    this.render()
  }

  onSelectMenu = (event: any) => {
    const currentTarget = $(event.currentTarget)
    const type = currentTarget.attr('type')
    if (type !== this.activeMenuItem) {
      this.activeMenuItem = type
      this.updateActiveMenu()
    }
  }

  bindEvents(){
    this.menuElement.on('click', '.router-menu-item', this.onSelectMenu)
  }

  updateActiveMenu() {
    const oldActiveMenuItem: JQuery = this.menuElement.find('.active')
    oldActiveMenuItem.removeClass('active')

    const activeItem: JQuery = this.menuElement.find(`[type=${this.activeMenuItem}]`)
    activeItem.addClass('active')
  }

  renderMenu() {
    const lis = []
    for(let index = 0, length = menus.length; index < length; index++) {
      const menu = menus[index]
      lis.push(`
        <li type="${menu.name}" class="router-menu-item">
          <div class="router-menu-item-content">${menu.text}</div>
        </li>
      `)
    }
    this.menuElement.append(lis.join(''))
  }

  render() {
    this.renderMenu()
    this.updateActiveMenu()
    this.contentElement.append(this.basicInfo.render())
    $(document.body).append(this.element)
  }
}
