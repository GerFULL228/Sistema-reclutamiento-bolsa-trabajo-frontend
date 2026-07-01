import { Component, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';

@Component({
  selector: 'app-contacto',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule],
  templateUrl: './contacto.html',
  styleUrl: './contacto.css'
})
export class Contacto {
  
  private fb = inject(FormBuilder);

  // Ítem 7: Formulario Reactivo con validaciones estrictas
  contactoForm: FormGroup = this.fb.group({
    nombre: ['', [Validators.required, Validators.minLength(3)]],
    correo: ['', [Validators.required, Validators.email]],
    asunto: ['', [Validators.required, Validators.minLength(5)]],
    mensaje: ['', [Validators.required, Validators.minLength(15)]]
  });

  enviado: boolean = false;

  enviarMensaje() {
    if (this.contactoForm.valid) {
      // Aquí podrías conectar a un servicio si el backend lo requiere
      console.log('Datos validados enviados:', this.contactoForm.value);
      this.enviado = true;
      this.contactoForm.reset();
      
      // Ocultar mensaje de éxito después de 4 segundos
      setTimeout(() => this.enviado = false, 4000);
    } else {
      // Marca todos los campos como tocados para que salten las letras rojas
      this.contactoForm.markAllAsTouched();
    }
  }

  // Método auxiliar para limpiar el HTML al mostrar errores
  tieneError(campo: string, tipoError: string): boolean {
    const control = this.contactoForm.get(campo);
    return !!(control?.hasError(tipoError) && control?.touched);
  }
}