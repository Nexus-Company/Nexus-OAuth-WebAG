import { Component } from '@angular/core';
import { FirstStepComponent } from './first-step/first-step.component';

@Component({
    selector: 'app-authentication',
    standalone: true,
    templateUrl: './authentication.component.html',
    styleUrl: './authentication.component.scss',
    imports: [FirstStepComponent]
})

export class AuthenticationComponent {
    FirstStepCompleted() {
        throw new Error('Method not implemented.');
    }
}
