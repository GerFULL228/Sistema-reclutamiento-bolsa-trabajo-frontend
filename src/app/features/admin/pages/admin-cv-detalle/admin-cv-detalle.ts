import { Component, inject, OnInit, signal } from '@angular/core';
import { ActivatedRoute, Router, RouterLink } from '@angular/router';
import { NonNullableFormBuilder, ReactiveFormsModule, Validators } from '@angular/forms';
import { ButtonModule } from 'primeng/button';
import { InputTextModule } from 'primeng/inputtext';
import { TextareaModule } from 'primeng/textarea';
import { ConfirmDialogModule } from 'primeng/confirmdialog';
import { ConfirmationService } from 'primeng/api';
import { AdminCvService } from '../../services/admin-cv';
import { MessageServices } from '../../../../core/services/messages/message-service';

@Component({
    selector: 'app-admin-cv-detalle',
    standalone: true,
    imports: [
        RouterLink,
        ReactiveFormsModule,
        ButtonModule,
        InputTextModule,
        TextareaModule,
        ConfirmDialogModule
    ],
    providers: [ConfirmationService],
    templateUrl: './admin-cv-detalle.html',
    styleUrl: './admin-cv-detalle.scss'
})
export class AdminCvDetalle implements OnInit {

    private route = inject(ActivatedRoute);
    private router = inject(Router);
    private adminCvService = inject(AdminCvService);
    private messageService = inject(MessageServices);
    private confirmationService = inject(ConfirmationService);
    private fb = inject(NonNullableFormBuilder);

    cvId!: number;
    loading = signal<boolean>(true);
    guardando = signal<boolean>(false);
    nombreUsuario = signal<string>('');
    usuarioId: number | null = null;

    cvForm = this.fb.group({
        tituloProfesional: ['', [Validators.required, Validators.minLength(3)]],
        descripcion: ['', [Validators.maxLength(1000)]],
        experiencia: ['', [Validators.maxLength(2000)]],
        habilidades: ['', [Validators.maxLength(1000)]],
        educacion: ['', [Validators.maxLength(1000)]],
        telefono: ['', [Validators.maxLength(20)]],
        linkedin: ['', [Validators.maxLength(150)]],
    });

    ngOnInit(): void {
        this.cvId = Number(this.route.snapshot.paramMap.get('id'));
        this.cargarCv();
    }

    cargarCv(): void {
        this.loading.set(true);
        this.adminCvService.obtenerPorId(this.cvId).subscribe({
            next: (cv) => {
                this.nombreUsuario.set(cv.nombreUsuario);
                this.usuarioId = cv.usuarioId ?? null;

                this.cvForm.patchValue({
                    tituloProfesional: cv.tituloProfesional,
                    descripcion: cv.descripcion,
                    experiencia: cv.experiencia,
                    habilidades: cv.habilidades,
                    educacion: cv.educacion,
                    telefono: cv.telefono,
                    linkedin: cv.linkedin,
                });

                this.loading.set(false);
            },
            error: () => {
                this.messageService.showError('No se pudo cargar el CV solicitado.');
                this.loading.set(false);
            }
        });
    }

    guardar(): void {
        if (this.cvForm.invalid) {
            this.cvForm.markAllAsTouched();
            this.messageService.showError('Revisa los campos marcados en rojo.');
            return;
        }

        if (!this.usuarioId) {
            return;
        }

        this.guardando.set(true);
        const valores = this.cvForm.getRawValue();

        this.adminCvService.actualizar(this.cvId, {
            ...valores,
            usuarioId: this.usuarioId
        }).subscribe({
            next: () => {
                this.messageService.showSuccess('CV actualizado correctamente.');
                this.guardando.set(false);
                this.router.navigateByUrl('/dashboard/admin/cv');
            },
            error: () => {
                this.guardando.set(false);
            }
        });
    }

    confirmarEliminar(): void {
        this.confirmationService.confirm({
            header: 'Eliminar CV',
            message: '¿Seguro que deseas eliminar este CV? Esta acción no se puede deshacer.',
            acceptLabel: 'Eliminar',
            rejectLabel: 'Cancelar',
            acceptButtonProps: { severity: 'danger' },
            accept: () => this.eliminarCv()
        });
    }

    private eliminarCv(): void {
        this.adminCvService.eliminar(this.cvId).subscribe({
            next: () => {
                this.messageService.showSuccess('CV eliminado correctamente.');
                this.router.navigateByUrl('/dashboard/admin/cv');
            },
            error: () => this.messageService.showError('No se pudo eliminar el CV.')
        });
    }

    campoInvalido(campo: string): boolean {
        const control = this.cvForm.get(campo);
        return !!control && control.invalid && (control.dirty || control.touched);
    }
}