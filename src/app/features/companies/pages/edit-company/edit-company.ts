import { Component, inject, OnInit } from '@angular/core';
import { NonNullableFormBuilder, ReactiveFormsModule, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { Company } from '../../services/company';
import { CompanyRequest } from '../../models/CompanyRequest';
import { MessageServices } from '../../../../core/services/messages/message-service';

@Component({
  selector: 'app-edit-company',
  standalone: true,
  imports: [ReactiveFormsModule],
  templateUrl: './edit-company.html',
  styleUrl: './edit-company.scss',
})
export class EditCompany implements OnInit {

  private companyService = inject(Company);
  private router = inject(Router);
  private messageService = inject(MessageServices);
  private fb = inject(NonNullableFormBuilder);

  loading = false;
  loadingData = true;
  companyId!: number;

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

  ngOnInit(): void {
    this.companyService.getMyCompany().subscribe({
      next: (res) => {
        this.companyId = res.id;
        this.companyForm.patchValue(res);
        this.loadingData = false;
      },
      error: () => {
        this.loadingData = false;
        this.messageService.showError('No se pudo cargar la información de la empresa.');
      }
    });
  }

  actualizar(): void {
    if (this.companyForm.invalid) {
      this.companyForm.markAllAsTouched();
      this.messageService.showError('Por favor, completa todos los campos correctamente.');
      return;
    }

    this.loading = true;
    const data: CompanyRequest = this.companyForm.getRawValue();

    this.companyService.updateCompany(this.companyId, data).subscribe({
      next: () => {
        this.loading = false;
        this.messageService.showSuccess('Perfil actualizado correctamente.');
        this.router.navigate(['/dashboard/company']);
      },
      error: (err) => {
        this.loading = false;
        this.messageService.showError(err.error?.message || 'Error al actualizar el perfil.');
      }
    });
  }
}