import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { combineLatest } from 'rxjs';
import { TranslateService } from '@ngx-translate/core';
import { AppConfig } from './app.config';
import { ApiService } from './services/api.service';
import { ILogger, LoggerService } from './services/logger.service';

@Component({
    selector: 'app-root',
    templateUrl: './app.component.html',
    styleUrls: ['./app.component.scss']
})
export class AppComponent implements OnInit {

    public searchForm: FormGroup;

    private log: ILogger;

    constructor(
        private translateService: TranslateService,
        private apiService: ApiService,
        loggerService: LoggerService
    ) {
        this.log = loggerService.getLogger('AppComponent');
        this.init();
    }

    public ngOnInit(): void {
        this.searchForm = new FormGroup({
            vatId: new FormControl('', Validators.required)
        });
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
