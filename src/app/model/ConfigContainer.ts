
export class ConfigContainer {
    configId: string = '';
    deviceBrand: string = '';
    deviceName: string = '';
    created: string = '';
    lastModified: string = '';
    nms_id: {
        path: string;
        values: string[];
    } = {path: '', values: []};
    values: {
        path: string,
        key: string
    }[] = [];
    // adhoc update
    adhoc: boolean = false;
    // Required values
    required: string[] = [];

    constructor(deviceBrand: string, deviceName: string, configId: string) {
        this.deviceBrand = deviceBrand;
        this.deviceName = deviceName;
        this.configId = configId;
    }
}
