import { injectable } from 'inversify';

@injectable()
export class LogService {
    log(...arg: any[]) {
        console.log(...arg);
    }
}