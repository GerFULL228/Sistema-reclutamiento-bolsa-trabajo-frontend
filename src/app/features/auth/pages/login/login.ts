import { Component, inject } from '@angular/core';
import { FormBuilder, FormGroup, NonNullableFormBuilder, ReactiveFormsModule, Validators } from '@angular/forms';
import { ActivatedRoute, Router, RouterLink } from '@angular/router';
import { Button } from 'primeng/button';
import { InputTextModule } from 'primeng/inputtext';
import { FloatLabelModule } from 'primeng/floatlabel';
import { DividerModule } from 'primeng/divider';
import { PasswordModule } from 'primeng/password';
import { AuthService } from '../../services/auth/auth';
import { TokenService } from '../../../../core/services/token/token';

import { ToastModule } from 'primeng/toast';
import { MessageServices } from '../../../../core/services/messages/message-service';

@Component({
  selector: 'app-login',
  imports: [Button, RouterLink, ReactiveFormsModule, DividerModule, PasswordModule, InputTextModule, FloatLabelModule, ToastModule],
  templateUrl: './login.html',
  styleUrl: './login.scss',
})
export class Login {


  private authService = inject(AuthService);
  private tokenService = inject(TokenService);
  private router = inject(Router);
  private messageService = inject(MessageServices);
  private route = inject(ActivatedRoute);
  loading: boolean = false;
  errorMessage: string = '';

  private fb = inject(NonNullableFormBuilder);
  loginForm = this.fb.group({
    email: ['', [Validators.required, Validators.email]],
    password: ['', [Validators.required, Validators.minLength(3)]],

  });


  login() {
    this.loading = true;
    if (this.loginForm.invalid) {
      this.loading = false;
      this.loginForm.markAllAsTouched();
      this.messageService.showError('Por favor, complete todos los campos correctamente.');

      return;
    }

    this.authService.login(this.loginForm.getRawValue())
      .subscribe({
        next: (res) => {
          const returnUrl = this.route.snapshot.queryParams['returnUrl'];

          const home = this.tokenService.getHomeByRole();

          this.router.navigate([returnUrl || home], {
            replaceUrl: true
          });
          this.loading = false;
          console.log('Login successful:', res);


        },
        error: (err) => {
          this.errorMessage = err.error?.message || 'Error de conexion con el servidor';
          this.loading = false;
          this.messageService.showError(this.errorMessage);
        }
      });

  }




}
