import { Component, OnInit } from '@angular/core';
import { ApiService } from '../../service/api.service';

@Component({
  selector: 'app-consume-service',
  standalone: true,
  imports: [],
  templateUrl: './consume-service.component.html',
  styleUrl: './consume-service.component.scss',
})
export class ConsumeServiceComponent implements OnInit {
  constructor(private _apiService: ApiService) {}

  ngOnInit(): void {
    console.log(this._apiService.name());

    this._apiService.name$.subscribe({
      next: (value) => console.log(value),
    });

    setTimeout(() => {
      console.log(this._apiService.name());
    }, 3000);
  }
}
