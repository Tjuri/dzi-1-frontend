export class Config {
    nms_id: {
        path: string;
        key: string;
    } = {path: '', key: ''};
    values: { path: string, key: string }[] = [];
    // adhoc update
    adhoc: boolean = false;
    // Required values
    required: string[] = [];

    constructor() {
    }
}
