import { Component, Input, NgModule, OnInit, input } from '@angular/core';
import { MatInputModule } from '@angular/material/input';
import { MatFormFieldModule } from '@angular/material/form-field';
import { FormsModule } from '@angular/forms';
import { MatCheckboxModule } from '@angular/material/checkbox';
import { MatCardModule } from '@angular/material/card';
import { MatIconModule } from '@angular/material/icon';
import { MatDivider } from '@angular/material/divider';
import { MatButtonModule } from '@angular/material/button';
import { CommonModule } from '@angular/common';
import { LoadingComponent } from '../loading/loading.component';

export enum Step {
  FirstStep,
  SecondStep,
  Loading,
  TwoFactor
}

@Component({
  selector: 'app-authentication',
  standalone: true,
  imports: [LoadingComponent, FormsModule, CommonModule, MatFormFieldModule, MatInputModule, MatCheckboxModule, MatCardModule, MatButtonModule, MatDivider, MatIconModule],
  templateUrl: './authentication.component.html',
  styleUrl: './authentication.component.scss'
})

export class AuthenticationComponent implements OnInit {
  ActualStep: Step = Step.FirstStep;
  ShowNext: boolean = true;

  @Input() User: string = '';
  @Input() Password: string = '';

  ngOnInit(): void {

  }

  nextStepButton() {
    this.ActualStep = this.ActualStep + 1;

    if (this.ActualStep > Step.TwoFactor)
      this.ActualStep = Step.FirstStep;

    // this.ShowNext = this.ActualStep != Step.Loading;
  }
}