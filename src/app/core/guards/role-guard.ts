import { inject } from '@angular/core';
import { CanActivateFn, Router } from '@angular/router';
import { TokenService } from '../services/token/token';

export const roleGuard = (rolesPermitidos: string[]): CanActivateFn => {
    return (route, state) => {
        const tokenService = inject(TokenService);
        const router = inject(Router);

        const roles = tokenService.getRoles();
        const tieneAcceso = rolesPermitidos.some(r => roles.includes(r));

        if (tieneAcceso) {
            return true;
        }

        router.navigateByUrl(tokenService.getHomeByRole());
        return false;
    };
};