export type DeviceInfo = {
  type: 'MOBILE_APP' | 'MOBILE_BROWSER' | 'DESKTOP';
  appDetails: string;
  deviceDetails: string;
  ipAddress: string;
};
