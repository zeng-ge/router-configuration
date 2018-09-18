import { DeviceStatus } from '../constants/link'

export default class Device{
  no: number
  name: string
  ip: string
  mac: string
  sendMcs: string
  receiveMcs: string
  rsl: string
  distance: string
  status: DeviceStatus
}
