import { Component, inject } from '@angular/core';
import { NonNullableFormBuilder, ReactiveFormsModule, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { Company } from '../../services/company';
import { CompanyRequest } from '../../models/CompanyRequest';
import { MessageServices } from '../../../../core/services/messages/message-service';

@Component({
  selector: 'app-company-profile',
  standalone: true,
  imports: [ReactiveFormsModule],
  templateUrl: './company-profile.html',
  styleUrl: './company-profile.scss',
})
export class CompanyProfile {

  private companyService = inject(Company);
  private router = inject(Router);
  private messageService = inject(MessageServices);
  private fb = inject(NonNullableFormBuilder);

  loading = false;

  goBack(): void {
    this.router.navigate(['/empresas']);
  }

  companyForm = this.fb.group({
    nombre: ['', [Validators.required, Validators.minLength(3)]],
    ruc: ['', [Validators.required, Validators.pattern(/^[0-9]{11}$/)]],
    correoCorporativo: ['', [Validators.required, Validators.email]],
    telefono: ['', [Validators.required, Validators.pattern(/^[0-9]{9}$/)]],
    direccion: ['', [Validators.required]],
    descripcion: ['', [Validators.required, Validators.minLength(20)]],
  });

  guardar(): void {
    if (this.companyForm.invalid) {
      this.companyForm.markAllAsTouched();
      this.messageService.showError('Por favor, completa todos los campos correctamente.');
      return;
    }

    this.loading = true;
    const data: CompanyRequest = this.companyForm.getRawValue();

    this.companyService.createCompany(data).subscribe({
      next: () => {
        this.loading = false;
        this.messageService.showSuccess('Perfil de empresa creado correctamente.');
        this.router.navigate(['/dashboard/company']);
      },
      error: (err) => {
        this.loading = false;
        this.messageService.showError(err.error?.message || 'Error al crear el perfil de la empresa.');
      }
    });
  }
}