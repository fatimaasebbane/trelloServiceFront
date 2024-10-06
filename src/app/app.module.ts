import {NgModule} from '@angular/core';
import {AppComponent} from './app.component';
import {BrowserModule, provideClientHydration} from '@angular/platform-browser';
import {AppRoutingModule} from './app-routing.module';
import {CoreModule} from './core/core.module';
import {LayoutModule} from './layout/layout.module';
import {FeaturesModule} from './features/features.module';
import {SharedModule} from './shared/shared.module';
import {authInterceptorProviders} from './auth/interceptors/auth.interceptor';
import {HttpClientModule} from '@angular/common/http';

@NgModule({
  declarations: [
    AppComponent,
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    CoreModule,
    LayoutModule,
    FeaturesModule,
    SharedModule,
    HttpClientModule

  ],
  providers: [provideClientHydration(), authInterceptorProviders],
  bootstrap: [AppComponent]
})
export class AppModule {
}
