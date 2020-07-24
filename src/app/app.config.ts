import { environment } from '../environments/environment';

const IS_PROD_ENVIRONMENT = environment.production;

export class AppConfig {

    public static readonly API_AUTH_URL = 'https://developers.einforma.com/api/v1/oauth/token';
    public static readonly API_AUTH_BODY = [{
        NAME: 'client_id',
        VALUE: 'vo22e1u6pmqfcb9hdrx1tf9b3x7v3ezj2eadm5xd.api.einforma.com'
    }, {
        NAME: 'client_secret',
        VALUE: '6K8dZgRhgF_dQa0oW7tjRcGw817tstmmmI_8kgpsnsU'
    }, {
        NAME: 'grant_type',
        VALUE: 'client_credentials'
    }, {
        NAME: 'scope',
        VALUE: 'buscar%3Aconsultar%3Aempresas'
    }];
    public static readonly API_AUTH_HEADERS = {
        ACCEPT: 'application/json',
        CONTENT_TYPE: 'application/x-www-form-urlencoded'
    };

    public static readonly DEFAULT_LANGUAGE = 'es';
}
