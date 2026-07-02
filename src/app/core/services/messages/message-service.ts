import { inject, Injectable } from '@angular/core';
import { MessageService } from 'primeng/api';

@Injectable({
  providedIn: 'root',
  
})
export class MessageServices {

   private messageService = inject(MessageService);

    showInfo(detail: string) {
        this.messageService.add({ severity: 'info', summary: 'Info', detail });
    }

    showWarn(detail: string) {
        this.messageService.add({ severity: 'warn', summary: 'Warn', detail });
    }

    showError(detail: string) {
        this.messageService.add({ severity: 'error', summary: 'Error', detail });
    }

    showContrast(detail: string) {
        this.messageService.add({ severity: 'contrast', summary: 'Contrast', detail });
    }

    showSecondary(detail: string) {
        this.messageService.add({ severity: 'secondary', summary: 'Secondary', detail });
    }
    showSuccess(detail:string){
        this.messageService.add({severity: 'success', summary: 'success', detail})
    }
  
}
