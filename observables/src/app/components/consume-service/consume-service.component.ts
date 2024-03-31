import { Component, OnInit, signal } from '@angular/core';
import { ApiService } from '../../service/api.service';

@Component({
  selector: 'app-consume-service',
  standalone: true,
  imports: [],
  templateUrl: './consume-service.component.html',
  styleUrl: './consume-service.component.scss',
})
export class ConsumeServiceComponent implements OnInit {
  public getTask = signal<null | Array<{ id: string; title: string }>>(null);

  constructor(private _apiService: ApiService) {}

  ngOnInit(): void {
    this._apiService.httpListTask$().subscribe({
      next: (next) => {
        console.log(next);
        this.getTask.set(next);
      },
      error: (error) => console.log(error),
      complete: () => console.log('complete!'),
    });

    setTimeout(() => {
      console.log(this._apiService.name());
    }, 3000);
  }
}
