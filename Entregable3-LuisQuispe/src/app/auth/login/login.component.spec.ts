import { ComponentFixture, TestBed } from '@angular/core/testing';
import { ReactiveFormsModule } from '@angular/forms';
import { Router } from '@angular/router';
import { AuthService } from '../auth.service';
import { LoginComponent } from './login.component';
import Swal from 'sweetalert2';

describe('LoginComponent', () => {

    beforeEach(() => {
    spyOn(Swal, 'fire');
  });

  let component: LoginComponent;
  let fixture: ComponentFixture<LoginComponent>;
  let authServiceSpy: jasmine.SpyObj<AuthService>;
  let routerSpy: jasmine.SpyObj<Router>;

  beforeEach(async () => {
    const authServiceMock = jasmine.createSpyObj('AuthService', ['login']);
    const routerMock = jasmine.createSpyObj('Router', ['navigate']);

    await TestBed.configureTestingModule({
      imports: [ReactiveFormsModule, LoginComponent],
      providers: [
        { provide: AuthService, useValue: authServiceMock },
        { provide: Router, useValue: routerMock }
      ]
    }).compileComponents();

    fixture = TestBed.createComponent(LoginComponent);
    component = fixture.componentInstance;
    authServiceSpy = TestBed.inject(AuthService) as jasmine.SpyObj<AuthService>;
    routerSpy = TestBed.inject(Router) as jasmine.SpyObj<Router>;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should have form invalid when empty', () => {
    expect(component.loginForm.valid).toBeFalsy();
  });

  it('should have form valid when filled', () => {
    component.loginForm.setValue({
      username: 'admin',
      password: '12345',
      role: 'admin'
    });
    expect(component.loginForm.valid).toBeTruthy();
  });

  it('should call AuthService.login and navigate to home on successful login', () => {
    component.loginForm.setValue({
      username: 'admin',
      password: '12345',
      role: 'admin'
    });

    authServiceSpy.login.and.returnValue(true);
    component.onSubmit();

    expect(authServiceSpy.login).toHaveBeenCalledWith('admin', '12345', 'admin');
    expect(routerSpy.navigate).toHaveBeenCalledWith(['/alumnos']);
  });

  it('should not navigate if login fails', () => {

    component.loginForm.setValue({
      username: 'user',
      password: 'wrong',
      role: 'user'
    });

    authServiceSpy.login.and.returnValue(false);
    component.onSubmit();

    expect(authServiceSpy.login).toHaveBeenCalledWith('user', 'wrong', 'user');
    expect(routerSpy.navigate).not.toHaveBeenCalled();
  });
});
