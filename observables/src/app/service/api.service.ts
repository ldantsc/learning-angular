import { Injectable, WritableSignal, signal } from '@angular/core';
import { environment } from '../../environments/environment.development';
import { BehaviorSubject, Observable, shareReplay } from 'rxjs';
import { HttpClient } from '@angular/common/http';

interface Tasks {
  id: string,
  title: string
}

@Injectable({
  providedIn: 'root',
})

export class ApiService {
  #apiURL: WritableSignal<string> = signal(environment.API_URL);
  public name: WritableSignal<string> = signal('Lucas Dantas');
  public name$ = new BehaviorSubject('Lucas Dantas $');

  constructor(private _http: HttpClient) {
  }

  public httpListTask$(): Observable<Tasks[]> {
    return this._http.get<Tasks[]>(this.#apiURL()).pipe(
      shareReplay()
    )
  }
}
