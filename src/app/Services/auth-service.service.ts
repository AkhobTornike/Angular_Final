import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Inject, Injectable, PLATFORM_ID } from '@angular/core';
import { User } from '../Interfaces/user';
import { jwtDecode } from 'jwt-decode';
import { Observable } from 'rxjs';
import { environments } from '../../environments/environments';
import { isPlatformBrowser } from '@angular/common';

interface TokenPayload {
  id: number;
  role: string;
  isVerified: string;
}

@Injectable({
  providedIn: 'root'
})
export class AuthServiceService {

  constructor(
    private http: HttpClient,
    @Inject(PLATFORM_ID) private platformId: Object,
  ) { }

  register(user: User): Observable<any> {
    return this.http.post<User>(`${environments.authUrl}/register`, user, {headers: new HttpHeaders({'Content-Type': 'application/json'})})
  }

  login(user: User): Observable<any> {
    return this.http.post<User>(`${environments.authUrl}/login`, user, {headers: new HttpHeaders({'Content-Type': 'application/json'})})
  }

  saveToken(token: string): void {
    if(isPlatformBrowser(this.platformId)) {
      localStorage.setItem('AuthToken', token);
    }
  }

  getLoggedInUser(): Observable<any> {
    const headers = new HttpHeaders({
      Authorization: `Bearer ${this.getToken()}`,
    });
    return this.http.get<any>(`${environments.userUrl}/${this.getLogedInUserId()}`, {headers});
  }

  getLogedInUserId(): number | null {
    const token = this.getToken();
    if (token) {
      const decoded: TokenPayload = jwtDecode(token);
      return decoded.id;
    } 

    return null;
  }

  isLogged(): boolean {
    if (isPlatformBrowser(this.platformId)) {
      return !!localStorage.getItem('authToken');
    }
    return false;
  }

  logOut(): void {
    if (isPlatformBrowser(this.platformId)) {
      localStorage.removeItem('authToken');
    }
  }

  getToken() {
    if (isPlatformBrowser(this.platformId)) {
      return localStorage.getItem('authToken');
    } else {
      return null;
    }
  }
}
