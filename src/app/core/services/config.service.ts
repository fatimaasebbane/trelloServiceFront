import {Injectable} from '@angular/core';
import {environment} from '../../../environments/environment.development';

type AppEnv = typeof environment;

@Injectable({providedIn: 'root'})
export class ConfigService {

  getEnvironment(): AppEnv {
    return environment;
  }

  isProd(): boolean {
    return environment.production;
  }


  getVersion(): string {
    return '1.0.0';
  }


  getAPIUrl(): string {
    return environment?.apiUrl ?? '';
  }


  getAuthSettings(): AppEnv['settings']['auth'] {
    return environment?.settings?.auth;
  }
}
