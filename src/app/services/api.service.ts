import { Injectable } from '@angular/core';
import { HttpClient, HttpErrorResponse, HttpHeaders } from '@angular/common/http';
import { Observable, throwError } from 'rxjs';
import { catchError, map, tap } from 'rxjs/operators';
import { AppConfig } from '../app.config';
import { ILogger, LoggerService } from './logger.service';
import { AuthModel } from '../models/auth.model';
import { CompanyFileModel } from '../models/company-file.model';

@Injectable({
    providedIn: 'root'
})
export class ApiService {

    private log: ILogger;
    private authToken: string;
    private tokenType: string;

    constructor(
        private http: HttpClient,
        loggerService: LoggerService
    ) {
        this.log = loggerService.getLogger('AuthService');
    }

    public init(): Observable<any> {
        this.log.d('Initiating API auth.');

        const requestBody = AppConfig.API_AUTH_BODY.map(bodyElement => {
            return bodyElement.NAME + '=' + bodyElement.VALUE;
        }).join('&');

        const requestHeaders = new HttpHeaders({
            accept: AppConfig.API_AUTH_HEADERS.ACCEPT,
            'Content-Type': AppConfig.API_AUTH_HEADERS.CONTENT_TYPE
        });

        return this.http.post(AppConfig.API_AUTH_URL, requestBody, {
            headers: requestHeaders
        }).pipe(
            catchError(this.handleError),
            tap((resp: AuthModel) => {
                this.log.d('Auth result:', resp);

                this.authToken = resp['access_token'];
                this.tokenType = resp['token_type'];
            })
        );
    }

    public getCompanyByVat(vatId: string): Observable<any> {
        this.log.d('Getting company by VAT ID');

        const requestHeaders = new HttpHeaders({
            accept: AppConfig.API_AUTH_HEADERS.ACCEPT,
            authorization: [this.tokenType, this.authToken].join(' ')
        });

        return this.http.get(AppConfig.API_SEARCH_URL + vatId + AppConfig.API_SEARCH_TYPE, {
            headers: requestHeaders
        }).pipe(
            catchError(this.handleError),
            tap((resp: CompanyFileModel) => {
                this.log.d('Search result:', resp);
            })
        );
    }

    private handleError(error: HttpErrorResponse) {
        if (error.error instanceof ErrorEvent) {
            console.error('An error occurred:', error.error.message);
        } else {
            console.error(`Backend returned code ${error.status}, body was: ${error.error}`);
        }
        return throwError('Something bad happened; please try again later.');
    }
}
