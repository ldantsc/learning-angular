import { Component } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { ConsumeServiceComponent } from './components/consume-service/consume-service.component';
import { OutroComponenteComponent } from './components/outro-componente/outro-componente.component';

@Component({
  selector: 'app-root',
  standalone: true,
  template: `
    <app-consume-service />
    <app-outro-componente />
  `,
  imports: [RouterOutlet, ConsumeServiceComponent, OutroComponenteComponent],
})
export class AppComponent {
  title = 'observables';
}
