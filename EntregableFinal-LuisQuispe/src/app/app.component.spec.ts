import { TestBed } from '@angular/core/testing';
import { AppComponent } from './app.component';
import { RouterTestingModule } from '@angular/router/testing';
import { NO_ERRORS_SCHEMA } from '@angular/core';

describe('AppComponent', () => {
  let fixture: any;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [AppComponent, RouterTestingModule],
      schemas: [NO_ERRORS_SCHEMA]
    }).compileComponents();
  });

  afterEach(() => {
    if (fixture) {
      fixture.destroy();
    }
  });

  it('should create the app', () => {
    fixture = TestBed.createComponent(AppComponent);
    const app = fixture.componentInstance;
    expect(app).toBeTruthy();
  });

  it('should render the sidenav container', () => {
    fixture = TestBed.createComponent(AppComponent);
    fixture.detectChanges();
    const compiled = fixture.nativeElement as HTMLElement;
    expect(compiled.querySelector('mat-sidenav-container')).toBeTruthy();
  });

  it('should contain Navbar and Toolbar components', () => {
    fixture = TestBed.createComponent(AppComponent);
    fixture.detectChanges();
    const compiled = fixture.nativeElement as HTMLElement;

    expect(compiled.querySelector('app-navbar')).toBeTruthy();
    expect(compiled.querySelector('app-toolbar')).toBeTruthy();
  });
});
