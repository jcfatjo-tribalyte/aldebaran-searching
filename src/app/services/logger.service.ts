import { Injectable } from '@angular/core';
import { NGXLogger } from 'ngx-logger';

export interface ILogger {
    d: (msg: string, ...others: Array<any>) => void;
    w: (msg: string, ...others: Array<any>) => void;
    e: (msg: string, ...others: Array<any>) => void;
    i: (msg: string, ...others: Array<any>) => void;
}

@Injectable({
    providedIn: 'root'
})
export class LoggerService {

    constructor(
        private logger: NGXLogger
    ) {
    }

    public getLogger(componentName: string): ILogger {
        return {
            d: (msg: string, ...others: Array<any>) => this.debug(componentName, msg, ...others),
            w: (msg: string, ...others: Array<any>) => this.warn(componentName, msg, ...others),
            e: (msg: string, ...others: Array<any>) => this.error(componentName, msg, ...others),
            i: (msg: string, ...others: Array<any>) => this.info(componentName, msg, ...others),
        } as ILogger;
    }

    private debug(componentName: string, msg: string, ...others: Array<any>): void {
        this.logger.debug(this.getFormattedComponentMsg(componentName, msg), ...others);
    }

    private warn(componentName: string, msg: string, ...others: Array<any>): void {
        this.logger.warn(this.getFormattedComponentMsg(componentName, msg), ...others);
    }

    private error(componentName: string, msg: string, ...others: Array<any>): void {
        this.logger.error(this.getFormattedComponentMsg(componentName, msg), ...others);
    }

    private info(componentName: string, msg: string, ...others: Array<any>): void {
        this.logger.info(this.getFormattedComponentMsg(componentName, msg), ...others);
    }

    private getFormattedComponentMsg(componentName: string, msg: string): string {
        return '[' + componentName + '] ' + msg;
    }
}
