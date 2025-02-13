import { Component } from '@angular/core';
import { ClimaService } from './clima.service';

@Component({
  selector: 'app-clima',
  //standalone: true,
  //imports: [],
  templateUrl: './clima.component.html',
  styleUrl: './clima.component.scss'
})
export class ClimaComponent {
  city = '';
  weatherData: any;
  unit: 'C' | 'F' = 'C';
  units: 'metric' | 'imperial' = 'metric';
  errorMessage: string | null = null;

  constructor(private weatherService: ClimaService) {}

  getWeather() {
    if (!this.city.trim()) {
      this.errorMessage = 'Ingrese una ciudad válida.';
      this.weatherData = null;
      return;
    }
  
    this.weatherService.getWeather(this.city, this.units).subscribe({
      next: (data) => {
        this.weatherData = data;
        this.errorMessage = null;
      },
      error: () => {
        this.errorMessage = 'Ciudad no encontrada. Intente nuevamente.';
        this.weatherData = null;
      }
    });
  }
  

  toggleUnit() {
    this.unit = this.unit === 'C' ? 'F' : 'C';
    this.units = this.units === 'metric' ? 'imperial' : 'metric';
    this.getWeather();
  }
}

