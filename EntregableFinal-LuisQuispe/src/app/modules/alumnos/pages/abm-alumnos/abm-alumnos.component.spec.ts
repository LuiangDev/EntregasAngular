import { ComponentFixture, TestBed } from '@angular/core/testing';
import { HttpClientTestingModule } from '@angular/common/http/testing';
import { AbmAlumnosComponent } from './abm-alumnos.component';
import { Router } from '@angular/router';
import { AlumnosService } from '../../services/alumnos.service';
import { of } from 'rxjs';

describe('AbmAlumnosComponent', () => {
  let component: AbmAlumnosComponent;
  let fixture: ComponentFixture<AbmAlumnosComponent>;
  let alumnosServiceMock: any;
  let routerMock: any;

  beforeEach(async () => {
    alumnosServiceMock = jasmine.createSpyObj('AlumnosService', [
      'alumnoSeleccionado$',
      'actualizarAlumno',
      'agregarAlumno',
      'limpiarAlumnoSeleccionado'
    ]);
    alumnosServiceMock.alumnoSeleccionado$ = of(null);

    routerMock = jasmine.createSpyObj('Router', ['navigate']);

    await TestBed.configureTestingModule({
      imports: [AbmAlumnosComponent, HttpClientTestingModule],
      providers: [
        { provide: AlumnosService, useValue: alumnosServiceMock },
        { provide: Router, useValue: routerMock }
      ]
    }).compileComponents();

    fixture = TestBed.createComponent(AbmAlumnosComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
