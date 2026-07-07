import { Component, inject, OnInit, signal } from '@angular/core';
import { ActivatedRoute, Router, RouterLink } from '@angular/router';
import { NonNullableFormBuilder, ReactiveFormsModule, Validators } from '@angular/forms';
import { ButtonModule } from 'primeng/button';
import { InputTextModule } from 'primeng/inputtext';
import { TextareaModule } from 'primeng/textarea';
import { SelectModule } from 'primeng/select';
import { ConfirmDialogModule } from 'primeng/confirmdialog';
import { ConfirmationService } from 'primeng/api';
import { AdminOfertaService } from '../../services/admin-oferta';
import { Oferta, OfertaEstado } from '../../models/Oferta';
import { MessageServices } from '../../../../core/services/messages/message-service';

@Component({
    selector: 'app-admin-oferta-detalle',
    standalone: true,
    imports: [
        RouterLink,
        ReactiveFormsModule,
        ButtonModule,
        InputTextModule,
        TextareaModule,
        SelectModule,
        ConfirmDialogModule
    ],
    providers: [ConfirmationService],
    templateUrl: './admin-oferta-detalle.html',
    styleUrl: './admin-oferta-detalle.scss'
})
export class AdminOfertaDetalle implements OnInit {

    private route = inject(ActivatedRoute);
    private router = inject(Router);
    private adminOfertaService = inject(AdminOfertaService);
    private messageService = inject(MessageServices);
    private confirmationService = inject(ConfirmationService);
    private fb = inject(NonNullableFormBuilder);

    ofertaId!: number;
    loading = signal<boolean>(true);
    guardando = signal<boolean>(false);
    nombreEmpresa = signal<string>('');

    estadosOptions = [
        { label: 'Borrador', value: 'BORRADOR' },
        { label: 'Activa', value: 'ACTIVA' },
        { label: 'Pausada', value: 'PAUSADA' },
        { label: 'Cerrada', value: 'CERRADA' },
        { label: 'Eliminada', value: 'ELIMINADA' },
    ];

    ofertaForm = this.fb.group({
        titulo: ['', [Validators.required, Validators.minLength(3)]],
        descripcion: ['', [Validators.required, Validators.minLength(10)]],
        ubicacion: ['', [Validators.required]],
        salario: [0, [Validators.required, Validators.min(0)]],
        estado: ['ACTIVA' as OfertaEstado, [Validators.required]],
    });

    ngOnInit(): void {
        this.ofertaId = Number(this.route.snapshot.paramMap.get('id'));
        this.cargarOferta();
    }

    cargarOferta(): void {
        this.loading.set(true);
        this.adminOfertaService.obtenerPorId(this.ofertaId).subscribe({
            next: (oferta: Oferta) => {
                this.nombreEmpresa.set(oferta.nombreEmpresa);

                this.ofertaForm.patchValue({
                    titulo: oferta.titulo,
                    descripcion: oferta.descripcion,
                    ubicacion: oferta.ubicacion,
                    salario: oferta.salario,
                    estado: oferta.estado,
                });

                this.loading.set(false);
            },
            error: () => {
                this.messageService.showError('No se pudo cargar la oferta solicitada.');
                this.loading.set(false);
            }
        });
    }

    guardar(): void {
        if (this.ofertaForm.invalid) {
            this.ofertaForm.markAllAsTouched();
            this.messageService.showError('Revisa los campos marcados en rojo.');
            return;
        }

        this.guardando.set(true);
        const valores = this.ofertaForm.getRawValue();

        this.adminOfertaService.actualizar(this.ofertaId, valores).subscribe({
            next: () => {
                this.messageService.showSuccess('Oferta actualizada correctamente.');
                this.guardando.set(false);
                this.router.navigateByUrl('/dashboard/admin/ofertas');
            },
            error: (err) => {
                this.messageService.showError(err.error?.message || 'No se pudo actualizar la oferta.');
                this.guardando.set(false);
            }
        });
    }

    confirmarEliminar(): void {
        this.confirmationService.confirm({
            header: 'Eliminar oferta',
            message: '¿Seguro que deseas eliminar esta oferta? Esta acción no se puede deshacer.',
            acceptLabel: 'Eliminar',
            rejectLabel: 'Cancelar',
            acceptButtonProps: { severity: 'danger' },
            accept: () => this.eliminarOferta()
        });
    }

    private eliminarOferta(): void {
        this.adminOfertaService.eliminar(this.ofertaId).subscribe({
            next: () => {
                this.messageService.showSuccess('Oferta eliminada correctamente.');
                this.router.navigateByUrl('/dashboard/admin/ofertas');
            },
            error: () => this.messageService.showError('No se pudo eliminar la oferta.')
        });
    }

    campoInvalido(campo: string): boolean {
        const control = this.ofertaForm.get(campo);
        return !!control && control.invalid && (control.dirty || control.touched);
    }
}