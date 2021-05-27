type DeviceInfo = {
  type: 'PC' | 'MOBILE';
  deviceName: string;
  deviceOperatingSystem: string;
  deviceVersion: string;
};

export type QrLoginRequest = {
  issuedFor: string | null;
  mobileSignature: string | null;
  webSignature: string;
  deviceInfo: DeviceInfo;
};
