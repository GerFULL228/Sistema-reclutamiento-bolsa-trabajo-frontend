import { Component, inject } from '@angular/core';
import { NonNullableFormBuilder, ReactiveFormsModule, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { ButtonModule } from 'primeng/button';
import { InputTextModule } from 'primeng/inputtext';
import { PasswordModule } from 'primeng/password';
import { ToastModule } from 'primeng/toast';
import { MessageServices } from '../../../../../core/services/messages/message-service';
// IMPORTANTE: Importamos el AuthService
import { AuthService } from '../../../services/auth/auth'; 

@Component({
  selector: 'app-postulante-register',
  standalone: true,
  imports: [ReactiveFormsModule, ButtonModule, InputTextModule, PasswordModule, ToastModule],
  templateUrl: './postulante-register.html',
  styleUrl: './postulante-register.scss',
})
export class PostulanteRegister {
  private fb = inject(NonNullableFormBuilder);
  private router = inject(Router);
  private messageService = inject(MessageServices);
  private authService = inject(AuthService); // Inyectamos el servicio

  loading = false;

  postulanteForm = this.fb.group({
    nombreCompleto: ['', [Validators.required, Validators.minLength(3)]],
    correo: ['', [Validators.required, Validators.email]],
    password: ['', [Validators.required, Validators.minLength(6)]],
    telefono: ['', [Validators.required, Validators.pattern(/^[0-9]{9,15}$/)]],
    profesion: ['', [Validators.required]],
    ciudad: ['', [Validators.required]],
    resumen: ['', [Validators.required, Validators.minLength(20)]],
  });

  goBack() {
    this.router.navigate(['/auth/register']);
  }

 registrar() {
    if (this.postulanteForm.invalid) {
      this.postulanteForm.markAllAsTouched();
      this.messageService.showError('Por favor completa todos los campos correctamente.');
      return;
    }

    this.loading = true;
    const formValue = this.postulanteForm.getRawValue();

    // 1. Separar el nombre completo en Nombre y Apellido (el backend pide ambos)
    const nombreParts = formValue.nombreCompleto.split(' ');
    const nombre = nombreParts[0];
    const apellido = nombreParts.slice(1).join(' ') || 'No especificado';

    // 2. Construir el objeto EXACTAMENTE como lo espera el DTO de Spring Boot
    const dataToSend = {
      usuario: {
        nombre: nombre,
        apellido: apellido,
        email: formValue.correo,      // Mapeamos 'correo' del form a 'email' del DTO
        password: formValue.password
      },
      // Mapeamos los campos que tenemos a los que pide el DTO PostulanteRequest
      direccion: formValue.ciudad, 
      genero: "No especificado",      // Dato temporal ya que el form no lo tiene
      fechaNacimiento: "1990-01-01"   // Dato temporal (formato ISO)
    };

    // 3. Enviamos la data formateada al servicio
    this.authService.registerPostulante(dataToSend).subscribe({
      next: (res) => {
        this.loading = false;
        this.messageService.showSuccess('¡Registro exitoso! Por favor, inicia sesión.');
        this.router.navigate(['/auth/login']); 
      },
      error: (err) => {
        this.loading = false;
        const errorMsg = err.error?.message || 'Error al conectar con el servidor para el registro.';
        this.messageService.showError(errorMsg);
      }
    });
  }
}