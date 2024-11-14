import { Injectable, Inject, PLATFORM_ID } from '@angular/core';
import { isPlatformBrowser } from '@angular/common';

@Injectable({
  providedIn: 'root',
})
export class BrowserStorageService {
  private isBrowser: boolean;

  constructor(@Inject(PLATFORM_ID) private platformId: Object) {
    this.isBrowser = isPlatformBrowser(this.platformId);
  }

  // Métodos seguros para window
  public GetWindow(): Window | null {
    if (this.isBrowser) {
      return window;
    }
    return null;
  }

  // Métodos seguros para sessionStorage
  public GetSessionItem(key: string): string | null {
    if (this.isBrowser && window.sessionStorage) {
      return window.sessionStorage.getItem(key);
    }
    return null;
  }

  public SetSessionItem(key: string, value: string): void {
    if (this.isBrowser && window.sessionStorage) {
      window.sessionStorage.setItem(key, value);
    }
  }

  public RemoveSessionItem(key: string): void {
    if (this.isBrowser && window.sessionStorage) {
      window.sessionStorage.removeItem(key);
    }
  }

  // Métodos seguros para localStorage
  public GetLocalItem(key: string): string | null {
    if (this.isBrowser && window.localStorage) {
      return window.localStorage.getItem(key);
    }
    return null;
  }

  public SetLocalItem(key: string, value: string): void {
    if (this.isBrowser && window.localStorage) {
      window.localStorage.setItem(key, value);
    }
  }

  public RemoveLocalItem(key: string): void {
    if (this.isBrowser && window.localStorage) {
      window.localStorage.removeItem(key);
    }
  }

  public ToClick(pSelector: string): void {
    let _window: Window | null = this.GetWindow();

    if (_window)
      if (pSelector)
        _window.document.getElementById(pSelector)?.click();
  }

  public ShowElement(pSelector: string, pShow?: boolean): void {
    let _window: Window | null = this.GetWindow();

    if (_window) {
      if (pShow)
        document.querySelector("#" + pSelector)?.classList.remove('visually-hidden');
      else
        document.querySelector("#" + pSelector)?.classList.add('visually-hidden');
    }
  }

  public LoadOk(): void {
    this.ShowElement('spinnerProcess');
  }

  public OnLoad(): void {
    this.ShowElement('spinnerProcess', true);
  }

}
