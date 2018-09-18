import $ from 'jquery'
import { menus } from '../../constants/menu'
import './index.scss'

export default class Menu{
  element: JQuery
  activeItem: any
  onSelectItem: Function
  tpl: string = `<ul class="router-menu"></ul>`
  constructor(activeItem: string, onSelectItem: Function) {
    this.element = $(this.tpl)
    this.activeItem = activeItem
    this.onSelectItem = onSelectItem
    this.bindEvents()
  }

  onSelectMenu = (event: any) => {
    const currentTarget = $(event.currentTarget)
    const type = currentTarget.attr('type')
    if (type !== this.activeItem.name) {
      const activeItem = this.getMenuItemByType(type)
      this.activeItem = activeItem
      this.updateActiveMenu()
      this.onSelectItem(activeItem)
    }
  }

  getMenuItemByType(type:string){
    let menuItem = null
    for(let index = 0, length = menus.length; index < length; index++){
      const menu = menus[index]
      if(menu.name === type){
        menuItem = menu
        break
      }
    }
    return menuItem
  }

  bindEvents(){
    this.element.on('click', '.router-menu-item', this.onSelectMenu)
  }

  updateActiveMenu() {
    const oldActiveMenuItem: JQuery = this.element.find('.active')
    oldActiveMenuItem.removeClass('active')

    const activeItem: JQuery = this.element.find(`[type=${this.activeItem.name}]`)
    activeItem.addClass('active')
  }

  renderItems() {
    const lis = []
    for(let index = 0, length = menus.length; index < length; index++) {
      const menu = menus[index]
      lis.push(`
        <li type="${menu.name}" class="router-menu-item">
          <div class="router-menu-item-content">${menu.text}</div>
        </li>
      `)
    }
    this.element.append(lis.join(''))
  }

  render() {
    this.renderItems()
    this.updateActiveMenu()
    return this.element
  }
}
