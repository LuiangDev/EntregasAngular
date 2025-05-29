import { TestBed } from '@angular/core/testing';
import { HttpClientTestingModule, HttpTestingController } from '@angular/common/http/testing';
import { AlumnosService } from './alumnos.service';

describe('AlumnosService', () => {
  let service: AlumnosService;
  let httpMock: HttpTestingController;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [HttpClientTestingModule],
      providers: [AlumnosService]
    });
    service = TestBed.inject(AlumnosService);
    httpMock = TestBed.inject(HttpTestingController);
  });

  afterEach(() => {
    httpMock.verify(); // Verificacion de peticiones sin resolver
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });

  it('should retrieve alumnos from the API via GET', () => {
    const mockAlumnos = [
      { nombre: 'Luis', apellido: 'Quispe', email: 'luis.quispe@email.com' },
      { nombre: 'Cinthia', apellido: 'García', email: 'cinthia.garcia@email.com' }
    ];

    service.obtenerAlumnos().subscribe(alumnos => {
      expect(alumnos.length).toBe(2);
      expect(alumnos).toEqual(mockAlumnos);
    });

    const req = httpMock.expectOne('http://localhost:3000/alumnos');
    expect(req.request.method).toBe('GET');
    req.flush(mockAlumnos);
  });
});
