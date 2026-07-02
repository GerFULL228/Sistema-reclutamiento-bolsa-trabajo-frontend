import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-empresas',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './empresas.html',
  styleUrl: './empresas.scss'
})
export class Empresas {
  listaEmpresas = [
    { nombre: 'Tech Corp', sector: 'Tecnología', ubicacion: 'Lima, Perú', ofertasActivas: 12, icono: 'pi-server' },
    { nombre: 'Banco Financiero', sector: 'Banca y Finanzas', ubicacion: 'Remoto', ofertasActivas: 8, icono: 'pi-building-columns' },
    { nombre: 'Salud Integral', sector: 'Salud', ubicacion: 'Arequipa, Perú', ofertasActivas: 5, icono: 'pi-heart-fill' },
    { nombre: 'Retail Global', sector: 'Comercio', ubicacion: 'Múltiples sedes', ofertasActivas: 20, icono: 'pi-shopping-cart' },
    { nombre: 'Agencia Creativa', sector: 'Marketing', ubicacion: 'Remoto', ofertasActivas: 3, icono: 'pi-palette' },
    { nombre: 'Logística Sur', sector: 'Transporte', ubicacion: 'Callao, Perú', ofertasActivas: 7, icono: 'pi-truck' }
  ];
}