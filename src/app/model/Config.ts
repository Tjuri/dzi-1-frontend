export class Config {
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

    constructor() {
    }
}
