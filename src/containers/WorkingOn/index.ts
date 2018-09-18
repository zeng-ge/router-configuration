import $ from 'jquery'
import './index.scss'

export default class WorkingOn{
  element: JQuery
  tpl: string = `
    <div class="router-working-on">
      努力建设中...
    </div>
  `
  constructor(){
    this.element = $(this.tpl)
  }
  render() {
    return this.element
  }
}
