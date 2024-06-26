import { Injectable } from '@angular/core';
import { AuthenticationResult } from '../../../model/authenticationResult';

@Injectable({
  providedIn: 'root'
})
export class AuthenticationService {

  constructor() { }

  getResult(): Authentication {
    try {
      return new Authentication(
        localStorage.getItem('auth_date'),
        localStorage.getItem('auth_rftk'),
        localStorage.getItem('auth_tk'),
        localStorage.getItem('auth_age')
      );
    } catch {
      return new Authentication(null);
    }
  }

  setToken(result?: AuthenticationResult): void {
    // localStorage.setItem('auth_date', result?.date?.toString() ?? "")
    localStorage.setItem('auth_rftk', result?.refreshToken ?? "")
    localStorage.setItem('auth_tk', result?.token ?? "")
    localStorage.setItem('auth_age', result?.expiresIn?.toString() ?? "32")
  }

  isAuthorized(): boolean {
    var authorization = this.getResult();

    if (authorization == null || authorization == undefined)
      return false;

    let date = ((authorization.Date ?? 0) as number) +
      (((authorization.Age ?? 0) as number) * 1000);

    return authorization.Token != null &&
      authorization.Token != undefined &&
      authorization.Token != '' &&
      date > Date.now();
  }
}

export class Authentication {
  Date: Number = Date.UTC(Date.now());
  Age: Number = 1;
  Refresh: string | null | undefined = null;
  Token: string = '';

  constructor(date: string | null, rftk?: string | null, tk?: string | null, age?: string | null) {
    this.Token = tk ?? "";
    this.Refresh = rftk;
    this.Age = Number.parseFloat(age ?? "0")
    this.Date = Date.parse(date ?? Date.now().toString())
  }
}