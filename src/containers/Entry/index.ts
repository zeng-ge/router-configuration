import $ from 'jquery'
import BasicInfo from '../BasicInfo'
import { menus } from '../../constants/menu'
import './index.scss'
import Menu from '../../components/Menu'

const defaultMenu = menus[0]
export default class Entry{
  private component: any
  private element: JQuery
  private menu: Menu
  private routerContainer: JQuery
  private contentElement: JQuery
  private activeMenu: any = defaultMenu
  tpl: string = `
  <div class="router-wrap">
    <div class="router-header">
      <div class="router-container">
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
    this.menu = new Menu(this.activeMenu, this.onSelectMenuItem)
    this.routerContainer = this.element.find('.router-container')
    this.contentElement = this.element.find('.router-content')
    this.render()
  }

  onSelectMenuItem = (menu: any) => {
    this.activeMenu = menu
    this.renderComponent()
  }

  createComponent(){
    const componentClass = this.activeMenu.component
    return new componentClass()
  }

  renderComponent(){
    this.component = this.createComponent()
    this.contentElement.empty()
    this.contentElement.append(this.component.render())
  }

  renderMenu() {
    this.routerContainer.prepend(this.menu.render())
  }

  render() {
    this.renderMenu()
    this.renderComponent()
    $(document.body).append(this.element)
  }
}
