import { Component, inject, OnInit, signal } from '@angular/core';
import { ActivatedRoute, Router, RouterLink } from '@angular/router';
import { NonNullableFormBuilder, ReactiveFormsModule, Validators } from '@angular/forms';
import { ButtonModule } from 'primeng/button';
import { InputTextModule } from 'primeng/inputtext';
import { TextareaModule } from 'primeng/textarea';
import { TagModule } from 'primeng/tag';
import { AdminEmpresaService } from '../../services/admin-empresa';
import { Empresa, EstadoValidacion } from '../../models/Empresa';
import { MessageServices } from '../../../../core/services/messages/message-service';

@Component({
  selector: 'app-admin-empresa-detalle',
  standalone: true,
  imports: [
    RouterLink,
    ReactiveFormsModule,
    ButtonModule,
    InputTextModule,
    TextareaModule,
    TagModule
  ],
  templateUrl: './admin-empresa-detalle.html',
  styleUrl: './admin-empresa-detalle.scss'
})
export class AdminEmpresaDetalle implements OnInit {

  private route = inject(ActivatedRoute);
  private router = inject(Router);
  private adminEmpresaService = inject(AdminEmpresaService);
  private messageService = inject(MessageServices);
  private fb = inject(NonNullableFormBuilder);

  empresaId!: number;
  loading = signal<boolean>(true);
  guardando = signal<boolean>(false);
  estadoActual = signal<EstadoValidacion>('PENDIENTE');
  correoUsuario = signal<string>('');
  procesando = signal<boolean>(false);

  empresaForm = this.fb.group({
    nombreEmpresa: ['', [Validators.required, Validators.minLength(3)]],
    razonSocial: ['', [Validators.required, Validators.minLength(3)]],
    ruc: ['', [Validators.required, Validators.pattern(/^\d{11}$/)]],
    direccion: ['', [Validators.maxLength(200)]],
    paginaWeb: ['', [Validators.maxLength(150)]],
    descripcion: ['', [Validators.maxLength(500)]],
  });

  ngOnInit(): void {
    this.empresaId = Number(this.route.snapshot.paramMap.get('id'));
    this.cargarEmpresa();
  }

  cargarEmpresa(): void {
    this.loading.set(true);
    this.adminEmpresaService.obtenerPorId(this.empresaId).subscribe({
      next: (empresa: Empresa) => {
        this.estadoActual.set(empresa.estadoValidacion);
        this.correoUsuario.set(empresa.usuarioEmail);

        this.empresaForm.patchValue({
          nombreEmpresa: empresa.nombreEmpresa,
          razonSocial: empresa.razonSocial,
          ruc: empresa.ruc,
        });

        this.loading.set(false);
      },
      error: () => {
        this.messageService.showError('No se pudo cargar la empresa solicitada.');
        this.loading.set(false);
      }
    });
  }

  guardar(): void {
    if (this.empresaForm.invalid) {
      this.empresaForm.markAllAsTouched();
      this.messageService.showError('Revisa los campos marcados en rojo.');
      return;
    }

    this.guardando.set(true);
    const valores = this.empresaForm.getRawValue();

    this.adminEmpresaService.actualizar(this.empresaId, {
      nombreEmpresa: valores.nombreEmpresa,
      razonSocial: valores.razonSocial,
      ruc: valores.ruc,
      direccion: valores.direccion,
      paginaWeb: valores.paginaWeb,
      descripcion: valores.descripcion,
      usuario: { email: this.correoUsuario() }
    }).subscribe({
      next: () => {
        this.messageService.showSuccess('Empresa actualizada correctamente.');
        this.guardando.set(false);
        this.router.navigateByUrl('/dashboard/admin/empresas');
      },
      error: () => {
        this.guardando.set(false);
      }
    });
  }

  campoInvalido(campo: string): boolean {
    const control = this.empresaForm.get(campo);
    return !!control && control.invalid && (control.dirty || control.touched);
  }

  aprobar(): void {
    this.cambiarEstado('ACTIVO');
  }

  rechazar(): void {
    this.cambiarEstado('RECHAZADO');
  }

  private cambiarEstado(estado: EstadoValidacion): void {
    this.procesando.set(true);

    this.adminEmpresaService.actualizarEstado(this.empresaId, estado).subscribe({
      next: () => {
        this.estadoActual.set(estado);
        this.messageService.showSuccess(`Empresa marcada como ${estado}.`);
        this.procesando.set(false);
      },
      error: () => {
        this.procesando.set(false);
      }
    });
  }
}
