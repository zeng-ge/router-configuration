export enum DeviceStatus{
  ONLINE = 1,
  OFFLINE = 0
}

export const routerFields = [
  { name: 'ssid', text: 'SSID' },
  { name: 'frequency', text: '工作频点' },
  { name: 'broadband', text: '信道宽带' },
  { name: 'rtNumber', text: '连接RT数' },
  { name: 'dmb', text: '实际发功' },
]

export const deviceFields = [
  { name: 'no', text: '序号' },
  { name: 'name', text: '名称', render: function(values: any){
    const value = values['name']
    const status = values['status']
    const statusCls = status === DeviceStatus.ONLINE ? 'online' : 'offline'
    return `<span class="circle ${statusCls}"></span><span>${value}</span>`
  } },
  { name: 'ip', text: 'IP地址' },
  { name: 'mac', text: 'RT MAC' },
  { name: 'sendMcs', text: '发送MCS' },
  { name: 'receiveMcs', text: '接收MCS' },
  { name: 'rsl', text: 'AP RSL' },
  { name: 'distance', text: '距离' },
]
