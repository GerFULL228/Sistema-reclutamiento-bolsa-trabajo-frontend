import { Component, computed, inject, OnInit, signal } from '@angular/core';
import { RouterLink } from '@angular/router';
import { FormsModule } from '@angular/forms';
import { TableModule } from 'primeng/table';
import { ButtonModule } from 'primeng/button';
import { InputTextModule } from 'primeng/inputtext';
import { ConfirmDialogModule } from 'primeng/confirmdialog';
import { ConfirmationService } from 'primeng/api';
import { AdminCvService } from '../../services/admin-cv';
import { CurriculumVitae } from '../../models/CurriculumVitae';
import { MessageServices } from '../../../../core/services/messages/message-service';

@Component({
    selector: 'app-admin-cv',
    standalone: true,
    imports: [RouterLink, FormsModule, TableModule, ButtonModule, InputTextModule, ConfirmDialogModule],
    providers: [ConfirmationService],
    templateUrl: './admin-cv.html',
    styleUrl: './admin-cv.scss'
})
export class AdminCv implements OnInit {

    private adminCvService = inject(AdminCvService);
    private messageService = inject(MessageServices);
    private confirmationService = inject(ConfirmationService);

    loading = signal<boolean>(true);
    cvs = signal<CurriculumVitae[]>([]);
    busqueda = signal<string>('');

    cvsFiltrados = computed(() => {
        const texto = this.busqueda().toLowerCase().trim();
        if (!texto) return this.cvs();

        return this.cvs().filter(cv =>
            cv.tituloProfesional?.toLowerCase().includes(texto) ||
            cv.nombreUsuario?.toLowerCase().includes(texto) ||
            cv.telefono?.toLowerCase().includes(texto)
        );
    });

    ngOnInit(): void {
        this.cargarCvs();
    }

    cargarCvs(): void {
        this.loading.set(true);
        this.adminCvService.listar().subscribe({
            next: (cvs) => {
                this.cvs.set(cvs);
                this.loading.set(false);
            },
            error: () => {
                this.messageService.showError('No se pudo cargar la lista de CVs.');
                this.loading.set(false);
            }
        });
    }

    confirmarEliminar(cv: CurriculumVitae): void {
        this.confirmationService.confirm({
            header: 'Eliminar CV',
            message: `¿Seguro que deseas eliminar el CV de "${cv.nombreUsuario}"? Esta acción no se puede deshacer.`,
            acceptLabel: 'Eliminar',
            rejectLabel: 'Cancelar',
            acceptButtonProps: { severity: 'danger' },
            accept: () => this.eliminarCv(cv)
        });
    }

    private eliminarCv(cv: CurriculumVitae): void {
        this.adminCvService.eliminar(cv.id).subscribe({
            next: () => {
                this.messageService.showSuccess('CV eliminado correctamente.');
                this.cvs.update(lista => lista.filter(c => c.id !== cv.id));
            },
            error: () => this.messageService.showError('No se pudo eliminar el CV.')
        });
    }
}