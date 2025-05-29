/***************************************************************************************************
 * Zona de pruebas de Angular.
 * Este archivo se carga en el entorno de testing por defecto y configura la zona de pruebas.
 ***************************************************************************************************/

import 'zone.js/testing';
import { getTestBed } from '@angular/core/testing';
import {
  BrowserDynamicTestingModule,
  platformBrowserDynamicTesting,
} from '@angular/platform-browser-dynamic/testing';

// Configura el entorno de pruebas de Angular.
getTestBed().initTestEnvironment(
  BrowserDynamicTestingModule,
  platformBrowserDynamicTesting()
);

// Usa require.context que funciona con Webpack en Angular CLI
const context = (require as any).context('./', true, /\.spec\.ts$/);
context.keys().forEach(context);
