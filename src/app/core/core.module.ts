import {NgModule, Optional, SkipSelf} from '@angular/core';
import {CommonModule} from '@angular/common';
import {ConfigService} from './services/config.service';
import {HttpService} from './services/http.service';
import {LocalStorageService} from './services/local-storage.service';
import {TokenStorageService} from './services/token-storage.service';

@NgModule({
  imports: [
    CommonModule
  ],
  providers: [
    ConfigService,
    HttpService,
    LocalStorageService,
    TokenStorageService
  ]
})
export class CoreModule {
  constructor(@Optional() @SkipSelf() parentModule: CoreModule) {
    if (parentModule) {
      throw new Error(
        'CoreModule is already loaded. Import it in the AppModule only.'
      );
    }
  }
}
