import $ from 'jquery'

export default class Entry{
  private element: JQuery
  constructor(){
    this.element = $('#app')
    this.init()
  }
  init(){
    this.render()
  }
  render() {
    console.log('abc')
  }
}
