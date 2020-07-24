import { Component } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { TranslateService } from '@ngx-translate/core';
import { AppConfig } from './app.config';
import { ApiService } from './services/api.service';
import { ILogger, LoggerService } from './services/logger.service';
import { combineLatest } from 'rxjs';

@Component({
    selector: 'app-root',
    templateUrl: './app.component.html',
    styleUrls: ['./app.component.scss']
})
export class AppComponent {

    private log: ILogger;

    constructor(
        private http: HttpClient,
        private translateService: TranslateService,
        private apiService: ApiService,
        loggerService: LoggerService
    ) {
        this.log = loggerService.getLogger('AppComponent');
        this.init();
    }

    private init(): void {
        this.translateService.setDefaultLang(AppConfig.DEFAULT_LANGUAGE);
        const useLang$ = this.translateService.use(AppConfig.DEFAULT_LANGUAGE);
        const initApi$ = this.apiService.init();

        combineLatest([useLang$, initApi$]).subscribe(() => {
            this.log.d('App initialized!');
        });
    }
}
