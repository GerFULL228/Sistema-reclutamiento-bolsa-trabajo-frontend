import { inject, Injectable } from '@angular/core';
import { environment } from '../../../../environment/environmment.develop';
import { HttpClient } from '@angular/common/http';
import { TokenService } from '../../../../core/services/token/token';
import { LoginRequest } from '../../models/LoginRequest';
import { Observable, tap } from 'rxjs';
import { LoginResponse } from '../../models/LoginResponse';

@Injectable({
  providedIn: 'root',
})
export class AuthService {

  private apiUrl = `${environment.apiUrl}/auth`;
  private http = inject(HttpClient);
  private TokenService = inject(TokenService);


  login(data: LoginRequest): Observable<LoginResponse> {

    return this.http.post<LoginResponse>(`${this.apiUrl}/login`, data).pipe(
      tap(res => {

        this.TokenService.saveAccessToken(res.accessToken);
        this.TokenService.saveRefreshToken(res.resfreshToken);
      }

      )
    )
  }

  refreshToken(): Observable<LoginResponse> {

    const refreshToken = this.TokenService.getRefreshToken();

    if (!refreshToken) {
      throw new Error("Refresh token not found");

    }

    return this.http.post<LoginResponse>(`${this.apiUrl}/refresh`, { refreshToken }).pipe(
      tap(res => {

        this.TokenService.saveAccessToken(res.accessToken);
        this.TokenService.saveRefreshToken(res.resfreshToken);
      }

      )
    )

  }

  logout() {
    this.TokenService.clearTokens();
  }

}
