import { environment } from '../environments/environment';

const IS_PROD_ENVIRONMENT = environment.production;

export class AppConfig {
    public static readonly DEFAULT_LANGUAGE = 'es';
}
