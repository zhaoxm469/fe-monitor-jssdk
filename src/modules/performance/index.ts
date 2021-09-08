import PageTime from './pageTime';
import ResourcesTime from './resources';

export default class FePerformanceLog {
    constructor() {
        this.init();
    }
    init() {
        new PageTime();
        new ResourcesTime();
    }
}
