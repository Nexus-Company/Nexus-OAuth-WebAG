import { Component, Input } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { InputTextModule } from 'primeng/inputtext';
import { ButtonModule } from 'primeng/button';
import { FloatLabelModule } from 'primeng/floatlabel';
import { CalendarModule } from 'primeng/calendar';
import { PasswordModule } from 'primeng/password';
import { DividerModule } from 'primeng/divider';
import { InputMaskModule } from 'primeng/inputmask';
import { CheckboxModule } from 'primeng/checkbox';
import { CardModule } from 'primeng/card';
import { IconFieldModule } from 'primeng/iconfield';
import { InputIconModule } from 'primeng/inputicon';
import { AccountService } from '../../../../../api/account.service';
import { AccountUpload } from '../../../../../model/accountUpload';
import { AddErrors } from '../../../../utils';

@Component({
  selector: 'app-account-register',
  standalone: true,
  imports: [FormsModule, InputIconModule, IconFieldModule, CardModule, ButtonModule, CheckboxModule, InputMaskModule, DividerModule, CalendarModule, PasswordModule, FloatLabelModule, InputTextModule, ButtonModule],
  templateUrl: './register.component.html',
  styleUrl: './register.component.scss',
  providers: [AccountService]
})
export class RegisterComponent {
  Name: string | undefined;
  Email: string | undefined;
  DateOfBirth: Date | undefined;
  Phone: string | undefined;
  Password: string | undefined;
  ConfirmPassword: string | undefined;
  AcceptTerms: boolean | undefined;

  private account?: AccountUpload;

  constructor(private accountService: AccountService) {
  }

  async createAccount() {
    this.account = {
      name: this.Name ?? "",
      phone: this.Phone ?? "",
      email: this.Email ?? "",
      acceptTerms: this.AcceptTerms ?? false,
      culture: navigator.language,
      dateOfBirth: this.DateOfBirth ?? new Date(),
      confirmPassword: this.ConfirmPassword ?? "",
      password: this.Password ?? "",
      hCaptchaToken: "Aa"
    }

    try {
      var response = await this.accountService.apiAccountRegisterPut(this.account).toPromise();
    } catch (response: any) {
      if (response.status == 400) {
        AddErrors(response.error.errors);
      }
    }
  }
}
