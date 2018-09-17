import $ from 'jquery'
import Entry from './containers/Entry'
import './index.scss'
declare global {
  interface Window { $: any }
}
window.$ = $

$(document).ready(() => {
  new Entry()
})

