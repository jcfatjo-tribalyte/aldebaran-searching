import { Component } from '@angular/core';
import { TranslateService } from '@ngx-translate/core';
import { AppConfig } from './app.config';

@Component({
    selector: 'app-root',
    templateUrl: './app.component.html',
    styleUrls: ['./app.component.scss']
})
export class AppComponent {

    constructor(
        private translateService: TranslateService
    ) {
        this.initTranslation();
    }

    private initTranslation() {
        this.translateService.setDefaultLang(AppConfig.DEFAULT_LANGUAGE);
        this.translateService.use(AppConfig.DEFAULT_LANGUAGE);
    }
}
