import {HttpClient} from "@angular/common/http";
import {Injectable} from "@angular/core";
import {Observable} from "rxjs";
import {ConfigService} from "./config.service";

@Injectable({providedIn: 'root'})
export class HttpService {

  constructor(
    private http: HttpClient,
    private configService: ConfigService
  ) {
  }

  post(endpoint: string, data: any, options?: any): Observable<any> {
    return this.http.post(`${this.apiUrl}/${endpoint}`, data, options);
  }

  get apiUrl(): string {
    return this.configService.getAPIUrl();
  }

  get(endpoint: string, options?: any): Observable<any> {
    return this.http.get(`${this.apiUrl}/${endpoint}`, options);
  }

  put(endpoint: string, data: any, options?: any): Observable<any> {
    return this.http.put(`${this.apiUrl}/${endpoint}`, data, options);
  }

  delete(endpoint: string, options?: any): Observable<any> {
    return this.http.delete(`${this.apiUrl}/${endpoint}`, options);
  }
}
