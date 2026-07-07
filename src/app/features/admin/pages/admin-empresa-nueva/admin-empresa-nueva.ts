import { Component, inject } from '@angular/core';
import { Router, RouterLink } from '@angular/router';
import { NonNullableFormBuilder, ReactiveFormsModule, Validators } from '@angular/forms';
import { ButtonModule } from 'primeng/button';
import { InputTextModule } from 'primeng/inputtext';
import { TextareaModule } from 'primeng/textarea';
import { PasswordModule } from 'primeng/password';
import { AdminEmpresaService } from '../../services/admin-empresa';
import { MessageServices } from '../../../../core/services/messages/message-service';

@Component({
    selector: 'app-admin-empresa-nueva',
    standalone: true,
    imports: [RouterLink, ReactiveFormsModule, ButtonModule, InputTextModule, TextareaModule, PasswordModule],
    templateUrl: './admin-empresa-nueva.html',
    styleUrl: './admin-empresa-nueva.scss'
})
export class AdminEmpresaNueva {

    private router = inject(Router);
    private adminEmpresaService = inject(AdminEmpresaService);
    private messageService = inject(MessageServices);
    private fb = inject(NonNullableFormBuilder);

    guardando = false;

    empresaForm = this.fb.group({
        nombreEmpresa: ['', [Validators.required, Validators.minLength(3)]],
        razonSocial: ['', [Validators.required, Validators.minLength(3)]],
        ruc: ['', [Validators.required, Validators.pattern(/^\d{11}$/)]],
        direccion: ['', [Validators.maxLength(200)]],
        paginaWeb: ['', [Validators.maxLength(150)]],
        descripcion: ['', [Validators.maxLength(500)]],
        nombreContacto: ['', [Validators.required]],
        apellidoContacto: ['', [Validators.required]],
        email: ['', [Validators.required, Validators.email]],
        password: ['', [Validators.required, Validators.minLength(6)]],
    });

    guardar(): void {
        if (this.empresaForm.invalid) {
            this.empresaForm.markAllAsTouched();
            this.messageService.showError('Revisa los campos marcados en rojo.');
            return;
        }

        this.guardando = true;
        const v = this.empresaForm.getRawValue();

        this.adminEmpresaService.crear({
            nombreEmpresa: v.nombreEmpresa,
            razonSocial: v.razonSocial,
            ruc: v.ruc,
            direccion: v.direccion,
            paginaWeb: v.paginaWeb,
            descripcion: v.descripcion,
            usuario: {
                nombre: v.nombreContacto,
                apellido: v.apellidoContacto,
                email: v.email,
                password: v.password
            }
        }).subscribe({
            next: () => {
                this.messageService.showSuccess('Empresa creada correctamente.');
                this.guardando = false;
                this.router.navigateByUrl('/dashboard/admin/empresas');
            },
            error: (err) => {
                this.messageService.showError(err.error?.message || 'No se pudo crear la empresa.');
                this.guardando = false;
            }
        });
    }

    campoInvalido(campo: string): boolean {
        const control = this.empresaForm.get(campo);
        return !!control && control.invalid && (control.dirty || control.touched);
    }
}