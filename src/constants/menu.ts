import BasicInfo from '../containers/BasicInfo'
import WorkingOn from '../containers/WorkingOn'

export const menus = [
  { name: 'basicInfo', text: '基本信息', component: BasicInfo },
  { name: 'quickSetup', text: '快速配置', component: WorkingOn },
  { name: 'microSetup', text: '微波配置', component: WorkingOn },
  { name: 'systemManagement', text: '系统管理', component: WorkingOn },
  { name: 'networkManagement', text: '网络管理', component: WorkingOn },
  { name: 'dailyMonitor', text: '日常监控', component: WorkingOn },
  { name: 'toolBox', text: '工具箱', component: WorkingOn },
  { name: 'advanceFeatures', text: '高级功能', component: WorkingOn },
]
