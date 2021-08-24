import { jsError } from './js.error';
import { promiseError } from './promise.error';
import { resourcesError } from './resources.error';

export class FeErrorReporter {
    reporter() {}
}

export class FeError {
    constructor() {
        this.init();
    }
    init(): void {
        jsError();
        promiseError();
        resourcesError();
    }
}
