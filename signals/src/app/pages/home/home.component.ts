import { Component } from '@angular/core';
import { SignalComponent } from '../../components/signal/signal.component';

@Component({
  selector: 'app-home',
  standalone: true,
  imports: [SignalComponent],
  templateUrl: './home.component.html',
  styleUrl: './home.component.scss'
})
export class HomeComponent {

}
