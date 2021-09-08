import { ConsoleError } from './console.error';
import { JsError } from './js.error';
import { unhandledrejectionError } from './unhandledrejection.error';
import { ResourcesError } from './resources.error';
import { VueError } from './vue.error';
import FeCollapse from './collapse';

export default class FeErrorLog {
    constructor() {
        this.init();
    }
    init(): void {
        new JsError();
        new unhandledrejectionError();
        new ResourcesError();
        new ConsoleError();
        new VueError();
        new FeCollapse();
    }
}
