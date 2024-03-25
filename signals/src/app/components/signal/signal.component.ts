import {
  AfterViewInit,
  Component,
  OnChanges,
  OnInit,
  SimpleChanges,
  signal,
  computed,
  WritableSignal,
} from '@angular/core';

@Component({
  selector: 'app-signal',
  standalone: true,
  imports: [],
  templateUrl: './signal.component.html',
  styleUrl: './signal.component.scss',
})
export class SignalComponent implements OnInit, AfterViewInit, OnChanges {
  numA: WritableSignal<number> = signal(1);
  firstName: WritableSignal<string> = signal('Lucas');
  lastName: WritableSignal<string> = signal('Dantas');
  name = computed(() => {
    return this.firstName() + ' ' + this.lastName();
  });
  other = ['Carne', 'Ovos', 'Salada', 'Sei la'];

  array = signal(['Arroz', 'Feijão', 'Batata']);

  constructor() {
    console.log('Construtor');
  }

  add() {
    this.numA.update((value) => value + 1);
  }

  updateName() {
    return this.lastName.set('Coelho');
  }

  updateArray() {
    const get = this.other[0];
    this.other.shift();
    if(get) {
      this.array.update((value: Array<string>): Array<string> => {
        return [...value, get]
      });
    }
  }

  ngAfterViewInit(): void {
    console.log('this.numA');
  }

  ngOnInit(): void {
    console.log('onInit');
  }

  ngOnChanges(changes: SimpleChanges): void {
    if (changes['numA']) {
      console.log('mudou');
    }
  }

  sum(numA: number , numB: number) {
  return numA + numB
  }
}
