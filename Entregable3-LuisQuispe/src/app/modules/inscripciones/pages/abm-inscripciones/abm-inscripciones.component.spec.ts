import { ComponentFixture, TestBed } from '@angular/core/testing';
import { HttpClientTestingModule } from '@angular/common/http/testing';
import { AbmInscripcionesComponent } from './abm-inscripciones.component';
import { Router } from '@angular/router';
import { InscripcionService } from '../../services/inscripcion.service';
import { CursoService } from '../../../cursos/services/curso.service';
import { AlumnosService } from '../../../alumnos/services/alumnos.service';
import { of } from 'rxjs';

describe('AbmInscripcionesComponent', () => {
  let component: AbmInscripcionesComponent;
  let fixture: ComponentFixture<AbmInscripcionesComponent>;
  let inscripcionServiceMock: any;
  let cursoServiceMock: any;
  let alumnosServiceMock: any;
  let routerMock: any;

  beforeEach(async () => {
    inscripcionServiceMock = jasmine.createSpyObj('InscripcionService', [
      'inscripcionSeleccionada$',
      'obtenerInscripciones',
      'actualizarInscripcion',
      'agregarInscripcion'
    ]);
    inscripcionServiceMock.inscripcionSeleccionada$ = of(null);
    inscripcionServiceMock.obtenerInscripciones.and.returnValue(of([]));

    cursoServiceMock = jasmine.createSpyObj('CursoService', ['obtenerCursos']);
    cursoServiceMock.obtenerCursos.and.returnValue(of([]));

    alumnosServiceMock = jasmine.createSpyObj('AlumnosService', ['obtenerAlumnos']);
    alumnosServiceMock.obtenerAlumnos.and.returnValue(of([]));

    routerMock = jasmine.createSpyObj('Router', ['navigate']);

    await TestBed.configureTestingModule({
      imports: [AbmInscripcionesComponent, HttpClientTestingModule],
      providers: [
        { provide: InscripcionService, useValue: inscripcionServiceMock },
        { provide: CursoService, useValue: cursoServiceMock },
        { provide: AlumnosService, useValue: alumnosServiceMock },
        { provide: Router, useValue: routerMock }
      ]
    }).compileComponents();

    fixture = TestBed.createComponent(AbmInscripcionesComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
