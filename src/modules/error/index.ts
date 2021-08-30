import { ConsoleError } from './console.error';
import { JsError } from './js.error';
import { PromiseError } from './promise.error';
import { ResourcesError } from './resources.error';
import { VueError } from './vue.error';

export default class FeErrorMonitor {
    constructor() {
        this.init();
    }
    init(): void {
        new JsError();
        new PromiseError();
        new ResourcesError();
        new ConsoleError();
        new VueError();
    }
}
