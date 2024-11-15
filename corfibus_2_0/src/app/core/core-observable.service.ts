import { Injectable, signal } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';
import { environment } from '../../environments/environment';

@Injectable({
  providedIn: 'root'
})
export class CoreObservableService {

  //Usuário Logado
  private usuarioLogado$ = new BehaviorSubject<boolean>(environment.userErp.userConnected);
  public SetUsuarioLogado(pUsuarioLogado: boolean) {
    this.usuarioLogado$.next(pUsuarioLogado);
  }
  public GetUsuarioLogado(): Observable<boolean> {
    return this.usuarioLogado$.asObservable();
  }

  //Imagem Usuario
  private usuarioLogadoImage$ = new BehaviorSubject<string | undefined>(undefined);
  public SetUsuarioLogadoImage(pUsuarioLogadoImage: string | undefined) {
    this.usuarioLogadoImage$.next(pUsuarioLogadoImage);
  }
  public GetUsuarioLogadoImage(): Observable<string | undefined> {
    return this.usuarioLogadoImage$.asObservable();
  }

  //Imagem do cliente do Corfibus
  private clienteLogado$ = new BehaviorSubject<boolean>(false);
  public SetClienteLogado(pClienteLogado: boolean) {
    this.clienteLogado$.next(pClienteLogado);
  }
  public GetClienteLogado(): Observable<boolean> {
    return this.clienteLogado$.asObservable();
  }

}
