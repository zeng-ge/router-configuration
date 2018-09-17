import System from '../models/System'
import Router from '../models/Router'
import Device from '../models/Device'

export default class BasicInfoService {
  getSystemInfo(): System{
    return {
      name: 'AP-U2_TOP',
      position: `103°53’319”，30°46’114”`,
      serial: '2105021983J0405234234',
      duration: '34:40:05',
      version: 'VIR2C00SPC100',
    } as System
  }
  getRouterInfo(): Router{
    return {
      ssid: 'U2_TOP',
      frequency: '5,790MHZ',
      broadband: '5,790MHZ',
      rtNumber: 2,
      dmb: '19dBm'
    } as Router
  }
  getDevices(): Array<Device>{
    return [
      {
        name: 'auth-service Pod 1',
        ip: '255.255.255.0',
        mac: '9C-B7-93-00-A3-4C',
        sendMcs: 'MCS7',
        receiveMcs: 'MCS7',
        rsl: '37:33',
        distance: '2.5千米'
      } as Device,
      {
        name: 'auth-service Pod 2',
        ip: '/',
        mac: '7C-B7-93-00-A3-4D',
        sendMcs: '/',
        receiveMcs: '/',
        rsl: '/',
        distance: '/'
      } as Device,
      {
        name: 'auth-service Pod 3',
        ip: '192.255.255.0',
        mac: '9C-B7-93-00-A3-4C',
        sendMcs: 'MCS7',
        receiveMcs: 'MCS7',
        rsl: '01:57:33',
        distance: '12.5千米'
      } as Device
    ]
  }
}

export const basicService = new BasicInfoService()
