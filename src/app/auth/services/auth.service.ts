import {Injectable} from '@angular/core';
import {HttpService} from '../../core/services/http.service';
import {Observable} from 'rxjs';
import {TokenStorageService} from '../../core/services/token-storage.service';

@Injectable()
export class AuthService {
  sendEmail(email: string): Observable<any> {
    throw new Error('Method not implemented.');
  }

  constructor(private http: HttpService, private tokenStorageService: TokenStorageService) {
  }

  login(username: string, password: string): Observable<any> {
    return this.http.post('/auth/login', {username, password});
  }

  register(firstName: string, lastName: string, email: string, password: string): Observable<any> {
    return this.http.post('/auth/register', {firstName, lastName, email, password});
  }

  refreshToken(): Observable<any> {
    const refreshToken = this.tokenStorageService.getRefreshToken();
    return this.http.post('/auth/refresh', {refreshToken});
  }

  logout(): void {
    this.tokenStorageService.signOut();
  }
}
