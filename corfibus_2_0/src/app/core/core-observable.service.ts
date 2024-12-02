import { Injectable, signal } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';
import { environment } from '../../environments/environment';

@Injectable({
  providedIn: 'root'
})
export class CoreObservableService {

  //Usuário Logado
  private usuarioLogado$;

  //Imagem Usuario
  private usuarioLogadoImage$;

  //Imagem do cliente do Corfibus
  private clienteLogado$;

  constructor() {
    this.clienteLogado$ = new BehaviorSubject<boolean>(false);
    this.usuarioLogadoImage$ = new BehaviorSubject<string | undefined>(undefined);
    this.usuarioLogado$ = new BehaviorSubject<boolean>(environment.userErp.userConnected);
  }

  public SetUsuarioLogado(pUsuarioLogado: boolean) {
    this.usuarioLogado$.next(pUsuarioLogado);
  }
  public GetUsuarioLogado(): Observable<boolean> {
    return this.usuarioLogado$.asObservable();
  }

  public SetUsuarioLogadoImage(pUsuarioLogadoImage: string | undefined) {
    this.usuarioLogadoImage$.next(pUsuarioLogadoImage);
  }
  public GetUsuarioLogadoImage(): Observable<string | undefined> {
    return this.usuarioLogadoImage$.asObservable();
  }

  public SetClienteLogado(pClienteLogado: boolean) {
    this.clienteLogado$.next(pClienteLogado);
  }

  public GetClienteLogado(): Observable<boolean> {
    return this.clienteLogado$.asObservable();
  }

}
