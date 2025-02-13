import { ComponentFixture, TestBed } from '@angular/core/testing';
import { ClimaComponent } from './clima.component';
import { of, throwError } from 'rxjs';
import { FormsModule } from '@angular/forms';
import { MatCardModule } from '@angular/material/card';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatButtonModule } from '@angular/material/button';
import { ClimaService } from './clima.service';
import { NoopAnimationsModule } from '@angular/platform-browser/animations';
import { provideHttpClient, withInterceptorsFromDi } from '@angular/common/http';
import { provideHttpClientTesting } from '@angular/common/http/testing';

describe('ClimaComponent', () => {
  let component: ClimaComponent;
  let fixture: ComponentFixture<ClimaComponent>;
  let climaService: ClimaService;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ClimaComponent],
      imports: [
        FormsModule,
        MatCardModule,
        MatFormFieldModule,
        MatInputModule,
        MatButtonModule,
        NoopAnimationsModule, // Usa NoopAnimationsModule para desactivar animaciones en pruebas
      ],
      providers: [
        ClimaService,
        provideHttpClient(withInterceptorsFromDi()), // Configura HttpClient
        provideHttpClientTesting(), // Configura HttpClientTesting
      ],
    }).compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ClimaComponent);
    component = fixture.componentInstance;
    climaService = TestBed.inject(ClimaService);
    fixture.detectChanges();
  });

  it('debería crear el componente', () => {
    expect(component).toBeTruthy();
  });

  

  // ✅ 1. Verifica que la información del clima se muestra correctamente tras una búsqueda exitosa
  it('debería mostrar la información del clima correctamente', () => {
    const mockWeatherData = {
      main: { temp: 25, humidity: 60 },
      weather: [{ description: 'Cielo despejado' }],
    };

    // Espía el método getWeather del servicio y devuelve datos simulados
    spyOn(climaService, 'getWeather').and.returnValue(of(mockWeatherData));

    component.city = 'Managua';
    component.getWeather();

    fixture.detectChanges(); // Actualiza la vista

    expect(component.weatherData).toEqual(mockWeatherData);
    expect(component.errorMessage).toBeNull();
  });

  // ✅ 2. Verifica que se maneja correctamente un error al ingresar una ciudad inválida
  it('debería manejar correctamente un error cuando la ciudad no existe', () => {
    // Espía el método getWeather del servicio y simula un error
    spyOn(climaService, 'getWeather').and.returnValue(throwError(() => new Error('Ciudad no encontrada')));

    component.city = 'CiudadInventada';
    component.getWeather();

    fixture.detectChanges(); // Actualiza la vista

    expect(component.weatherData).toBeNull();
    expect(component.errorMessage).toBe('Ciudad no encontrada. Intente nuevamente.');
  });

  // ✅ 3. Verifica que el campo de entrada y el botón de búsqueda funcionan correctamente
  it('debería actualizar la ciudad y ejecutar la búsqueda al hacer clic en el botón', () => {
    // Espía el método getWeather del componente
    spyOn(component, 'getWeather');

    const input = fixture.nativeElement.querySelector('input');
    const button = fixture.nativeElement.querySelector('button');

    // Simula la entrada del usuario
    input.value = 'Madrid';
    input.dispatchEvent(new Event('input'));
    fixture.detectChanges(); // Actualiza la vista

    // Simula el clic en el botón
    button.click();
    fixture.detectChanges(); // Actualiza la vista

    expect(component.city).toBe('Madrid');
    expect(component.getWeather).toHaveBeenCalled();
  });
});