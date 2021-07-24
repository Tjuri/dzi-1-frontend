import {Config} from "./Config";

export class ConfigContainer {
    deviceBrand: string = '';
    deviceName: string = '';
    configId: string = ''
    created: string = ''
    lastModified: string = ''
    config: Config;

    constructor(deviceBrand: string, deviceName: string, configId: string) {
        this.deviceBrand = deviceBrand;
        this.deviceName = deviceName;
        this.configId = configId;
        this.config = new Config();
    }
}
