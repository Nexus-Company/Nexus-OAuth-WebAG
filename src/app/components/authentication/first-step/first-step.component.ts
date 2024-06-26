import { Component, Input, Output, EventEmitter } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { InputTextModule } from 'primeng/inputtext';
import { ButtonModule } from 'primeng/button';
import { AuthenticationsService } from '../../../../../api/authentications.service';
import { FirstStepResult } from '../../../../../model/firstStepResult';

@Component({
  selector: 'app-auth-first-step',
  standalone: true,
  imports: [FormsModule, InputTextModule, ButtonModule],
  templateUrl: './first-step.component.html',
  styleUrl: './first-step.component.scss',
  providers: [AuthenticationsService]
})
export class FirstStepComponent {
  @Input()
  UserName: string | undefined;

  @Output()
  Completed: EventEmitter<FirstStepResult> = new EventEmitter<FirstStepResult>();

  constructor(private authService: AuthenticationsService) {

  }

  async nextClicked() {
    try {
      var result = await this.authService.apiAuthenticationsFirstStepGet("aa", this.UserName).toPromise();
    } catch (response: any) {
      if (response.status == 400) {
        console.log(response.error)
      }
    }
  }
}
