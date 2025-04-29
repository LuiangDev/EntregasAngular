import { Titulo20Directive } from './titulo20.directive';
import { ElementRef, Renderer2 } from '@angular/core';

describe('Titulo20Directive', () => {
  it('should create an instance', () => {
    const mockElementRef = { nativeElement: document.createElement('div') } as ElementRef;
    const mockRenderer2 = jasmine.createSpyObj<Renderer2>('Renderer2', ['setStyle']);

    const directive = new Titulo20Directive(mockElementRef, mockRenderer2);
    expect(directive).toBeTruthy();
  });
});
