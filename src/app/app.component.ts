import { Component, OnInit } from '@angular/core';
import { SpinnerService } from './services/spinner.service';
import { AuthService } from './security/auth.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrl: './app.component.scss'
})
export class AppComponent {
  title = 'front-auth';

  constructor(
    public spinnerService: SpinnerService
    ) { }

}
