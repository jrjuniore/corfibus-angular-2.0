import { ApplicationConfig, provideExperimentalZonelessChangeDetection, LOCALE_ID } from '@angular/core';
import { Location } from '@angular/common';
import { provideRouter } from '@angular/router';

import { routes } from './app.routes';
import { provideClientHydration } from '@angular/platform-browser';
import { provideAnimationsAsync } from '@angular/platform-browser/animations/async';

import { MAT_DIALOG_DATA, MAT_DIALOG_DEFAULT_OPTIONS, MatDialogRef } from '@angular/material/dialog';
import { registerLocaleData } from '@angular/common';
import localePt from '@angular/common/locales/pt';
registerLocaleData(localePt, 'pt');


export const appConfig: ApplicationConfig = {
  providers: [
    provideExperimentalZonelessChangeDetection(), provideRouter(routes), Location, provideClientHydration(), provideAnimationsAsync(),
    {
      provide: MAT_DIALOG_DEFAULT_OPTIONS, useValue: {
        hasBackdrop: true, autoFocus: true, disableClose: true,
        panelClass: 'formCad'
      }
    },
    { provide: MAT_DIALOG_DATA, useValue: false },
    { provide: LOCALE_ID, useValue: 'pt' },

  ]
};
