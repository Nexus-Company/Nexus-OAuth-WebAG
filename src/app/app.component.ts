import { RouterOutlet } from '@angular/router';
import { Component, LOCALE_ID } from '@angular/core';
import { CommonModule } from '@angular/common';
import { BASE_PATH, BASE_URL } from '../../variables';
import { Configuration } from '../../configuration';
import { AuthenticationService } from './services/authenticationservice';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [RouterOutlet, CommonModule],
  templateUrl: './app.component.html',
  styleUrl: './app.component.scss',
  providers: [{ provide: BASE_PATH, useValue: BASE_URL },
  {
    provide: Configuration,
    useFactory: (authService: AuthenticationService) => new Configuration({
      accessToken: authService.getResult()?.Token ?? ''
    }),
    deps: [AuthenticationService]
  }]
})
export class AppComponent {
  title = 'Nexus-OAuth-WebAG';

  constructor() {}
}
