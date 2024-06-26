import { NgModule, ModuleWithProviders, SkipSelf, Optional } from '@angular/core';
import { Configuration } from './configuration';
import { HttpClient } from '@angular/common/http';


import { AccountService } from './api/account.service';
import { ApplicationsService } from './api/applications.service';
import { AuthenticationTwoFactorService } from './api/authenticationTwoFactor.service';
import { AuthenticationsService } from './api/authentications.service';
import { AuthenticationsQrCodeService } from './api/authenticationsQrCode.service';
import { FilesService } from './api/files.service';
import { MetricsService } from './api/metrics.service';
import { OAuthService } from './api/oAuth.service';

@NgModule({
  imports:      [],
  declarations: [],
  exports:      [],
  providers: [
    AccountService,
    ApplicationsService,
    AuthenticationTwoFactorService,
    AuthenticationsService,
    AuthenticationsQrCodeService,
    FilesService,
    MetricsService,
    OAuthService ]
})
export class ApiModule {
    public static forRoot(configurationFactory: () => Configuration): ModuleWithProviders<ApiModule> {
        return {
            ngModule: ApiModule,
            providers: [ { provide: Configuration, useFactory: configurationFactory } ]
        };
    }

    constructor( @Optional() @SkipSelf() parentModule: ApiModule,
                 @Optional() http: HttpClient) {
        if (parentModule) {
            throw new Error('ApiModule is already loaded. Import in your base AppModule only.');
        }
        if (!http) {
            throw new Error('You need to import the HttpClientModule in your AppModule! \n' +
            'See also https://github.com/angular/angular/issues/20575');
        }
    }
}
