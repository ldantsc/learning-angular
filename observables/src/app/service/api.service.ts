import { Injectable, WritableSignal, signal } from '@angular/core';
import { environment } from '../../environments/environment.development';
import { BehaviorSubject } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class ApiService {
  apiURL: string = environment.API_URL;
  public name: WritableSignal<string> = signal('Lucas Dantas');
  public name$ = new BehaviorSubject('Lucas Dantas $');

  constructor() {}
}
