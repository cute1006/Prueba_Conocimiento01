import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable, throwError } from 'rxjs';
import { catchError } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class ClimaService {
  private apiUrl = 'https://api.openweathermap.org/data/2.5/weather';
  private apiKey = '58f4eb57a5813b2e5429d980f7bff07a';
  constructor(private http: HttpClient) { }

  getWeather(city: string, units: 'metric' | 'imperial' = 'metric'): Observable<any> {
    return this.http.get(`${this.apiUrl}?q=${city}&units=${units}&lang=es&appid=${this.apiKey}`)
      .pipe(
        catchError(error => {
          return throwError(() => new Error('No se pudo obtener el clima. Verifique el nombre de la ciudad.'));
        })
      );
  }
}

