import { Component } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { Button } from 'primeng/button';
import { IconFieldModule } from 'primeng/iconfield';
import { InputIconModule } from 'primeng/inputicon';
import { InputTextModule } from 'primeng/inputtext';
import { ChipModule } from 'primeng/chip';

@Component({
  selector: 'app-home',
    standalone: true,
  imports: [IconFieldModule, InputIconModule, InputTextModule,FormsModule, Button,ChipModule],
  templateUrl: './home.html',
  styleUrl: './home.css',
})
export class Home {

   value1: any = null;

}
