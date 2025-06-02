import { ComponentFixture, TestBed } from '@angular/core/testing';
import { HttpClientTestingModule } from '@angular/common/http/testing';
import { AbmCursosComponent } from './abm-cursos.component';
import { Router } from '@angular/router';
import { CursoService } from '../../services/curso.service';
import { of } from 'rxjs';

describe('AbmCursosComponent', () => {
  let component: AbmCursosComponent;
  let fixture: ComponentFixture<AbmCursosComponent>;
  let cursoServiceMock: any;
  let routerMock: any;

  beforeEach(async () => {
    cursoServiceMock = jasmine.createSpyObj('CursoService', [
      'cursoSeleccionado$',
      'actualizarCurso',
      'agregarCurso',
      'limpiarCursoSeleccionado'
    ]);
    cursoServiceMock.cursoSeleccionado$ = of(null);

    routerMock = jasmine.createSpyObj('Router', ['navigate']);

    await TestBed.configureTestingModule({
      imports: [AbmCursosComponent, HttpClientTestingModule],
      providers: [
        { provide: CursoService, useValue: cursoServiceMock },
        { provide: Router, useValue: routerMock }
      ]
    }).compileComponents();

    fixture = TestBed.createComponent(AbmCursosComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
