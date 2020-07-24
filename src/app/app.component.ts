import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { combineLatest, Observable } from 'rxjs';
import { finalize } from 'rxjs/operators';
import { TranslateService } from '@ngx-translate/core';
import { AppConfig } from './app.config';
import { ApiService } from './services/api.service';
import { ILogger, LoggerService } from './services/logger.service';
import { CompanyFileModel } from './models/company-file.model';

@Component({
    selector: 'app-root',
    templateUrl: './app.component.html',
    styleUrls: ['./app.component.scss']
})
export class AppComponent implements OnInit {

    public readonly COMPANY_FIELDS = [
        'denominacion', 'nombreComercial', 'domicilioSocial', 'localidad',
        'formaJuridica', 'cnae', 'fechaUltimoBalance', 'identificativo',
        'situacion', 'telefono', 'fax', 'web', 'email', 'cargoPrincipal',
        'capitalSocial', 'ventas', 'anioVentas', 'empleados', 'fechaConstitucion'
    ];

    public searchForm: FormGroup;
    public isLoading = false;
    public company$: Observable<CompanyFileModel>;

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

    public searchCompany(): void {
        if (this.searchForm.valid) {
            this.isLoading = true;

            const vatId = this.searchForm.get('vatId').value;

            this.company$ = this.apiService.getCompanyByVat(vatId).pipe(
                finalize(() => this.isLoading = false)
            );
        }
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
