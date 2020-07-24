import { Injectable } from '@angular/core';
import { HttpClient, HttpErrorResponse, HttpHeaders } from '@angular/common/http';
import { Observable, throwError } from 'rxjs';
import { catchError, map } from 'rxjs/operators';
import { ILogger, LoggerService } from './logger.service';
import { AppConfig } from '../app.config';

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
            map(resp => {
                this.log.d('Auth params:', resp);

                this.authToken = resp['access_token'];
                this.tokenType = resp['token_type'];
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
