import { ConsoleError } from './console.error';
import { JsError } from './js.error';
import { PromiseError } from './promise.error';
import { ResourcesError } from './resources.error';

export class FeErrorMonitor {
    constructor() {
        this.init();
    }
    init(): void {
        new JsError();
        new PromiseError();
        new ResourcesError();
        new ConsoleError();
    }
}
