import { NgModule } from '@angular/core';
import { HttpClient, HttpClientModule } from '@angular/common/http';
import { BrowserModule } from '@angular/platform-browser';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { ReactiveFormsModule } from '@angular/forms';

import { TranslateHttpLoader } from '@ngx-translate/http-loader';
import { TranslateLoader, TranslateModule } from '@ngx-translate/core';
import { LoggerModule, NgxLoggerLevel } from 'ngx-logger';

import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatCardModule } from '@angular/material/card';
import { MatButtonModule } from '@angular/material/button';
import { MatListModule } from '@angular/material/list';
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';
import { MatSnackBarModule } from '@angular/material/snack-bar';

import { AppConfig } from './app.config';
import { LoggerService } from './services/logger.service';
import { ApiService } from './services/api.service';

import { AppComponent } from './app.component';
import { environment } from '../environments/environment';

export function httpLoaderFactory(http: HttpClient) {
    return new TranslateHttpLoader(http, '../assets/i18n/', '.json');
}

@NgModule({
    declarations: [
        AppComponent
    ],
    imports: [
        BrowserModule,
        BrowserAnimationsModule,
        ReactiveFormsModule,
        HttpClientModule,
        TranslateModule.forRoot({
            loader: {
                provide: TranslateLoader,
                useFactory: httpLoaderFactory,
                deps: [HttpClient]
            },
            defaultLanguage: 'es'
        }),
        LoggerModule.forRoot({
            level: !environment.production ? NgxLoggerLevel.DEBUG : NgxLoggerLevel.ERROR,
            timestampFormat: 'short'
        }),
        MatFormFieldModule,
        MatInputModule,
        MatCardModule,
        MatButtonModule,
        MatListModule,
        MatProgressSpinnerModule,
        MatSnackBarModule
    ],
    providers: [
        AppConfig,
        LoggerService,
        ApiService
    ],
    bootstrap: [
        AppComponent
    ]
})
export class AppModule {
}
