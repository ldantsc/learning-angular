import { Component, OnInit, inject } from '@angular/core';
import { ApiService } from '../../service/api.service';

@Component({
  selector: 'app-outro-componente',
  standalone: true,
  imports: [],
  templateUrl: './outro-componente.component.html',
  styleUrl: './outro-componente.component.scss',
})
export class OutroComponenteComponent implements OnInit {

  apiService = inject(ApiService)

  ngOnInit(): void {
    console.log(this.apiService.name());

    this.apiService.name$.subscribe({
      next: (value) => console.log(value),
    });

    this.apiService.name$.next('Outro nome')

    this.apiService.name.set('Signal Alterado')
    console.log(this.apiService.name())
  }
}
