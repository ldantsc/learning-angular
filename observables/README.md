# Observables

## Injeção de dependências

De acordo com a documentação do Angular, injeção de dependência é um padrão de projeto no qual uma classe solicita dependências de fontes externas ao invés de criá-las.

## Services

Os arquivos em Angular possuem responsabilidades bem definidas. É uma boa prática que o componente contenha apenas a lógica para definir comportamentos e conseguir renderizar os arquivos na tela. Assim, é necessário que haja um arquivo para guardar toda a lógica de negócios e que seja responsável pela comunicação com o servidor. Esse arquivo é o service.

- Criando um service com Angular CLI

```
ng generate service
```

## Tipos de Injetores

O decorator @injectable(), por padrão, possui um metadado chamado providedIn. Esse nome vem de provider (provedor), que significa fornecedor. Ele é o responsável por fornecer uma instância dessa classe através da injeção de dependência. Nesse caso, o valor dessa propriedade: providedIn: 'root', indica que o Angular deve fornecer o serviço no injetor raiz, em outras palavras, significa que esse **serviço é visível para toda a aplicação e você pode injetá-lo em qualquer lugar** do seu projeto.

## Injetando o service no componente

- Exemplo de injeção de dependência no construtor

```ts
import { Component } from '@angular/core';
import { ApiService } from '../../service/api.service';

@Component({
...
})
export class ConsumeServiceComponent {
  constructor(private apiService: ApiService) {

  }
}
```

- Exemplo de injeção de dependência na própria classe com inject()

```ts
import { Component, inject } from '@angular/core';
import { ApiService } from '../../service/api.service';

@Component({
...
})
export class ConsumeServiceComponent {
  apiService = inject(ApiService
  )
}
```

## Compartilhamento de dados entre componentes

**Com Signal (Atual)**

- No service, api.service.ts

```ts
public name: WritableSignal<string> = signal("Lucas Dantas")
```

- No componente, consume-service.component.ts

```ts
  ngOnInit(): void {
    console.log(this._apiService.name()) // 'Lucas Dantas'
  }
```

<hr>

**Com BehaviorSubject / RxJs**

- Importação

```ts
import { BehaviorSubject } from "rxjs";
```

- No service, api.service.ts

```ts
public name$ = new BehaviorSubject('Lucas Dantas $')
```

_o $ indica um observable_

- No componente, consume-service.component.ts
- Utilizar subscribe()

```ts
  ngOnInit(): void {
    this._apiService.name$.subscribe({
      next: (value) => console.log(value), // 'Lucas Dantas $'
    });
  }
```

_será observado toda vez que o BehaviorSubject sofrer alguma alteração._

## Alterando o valor em todos os componentes que estão inscritos

**Com BehaviorSubject / RxJs**

- No componente, outro-componente.component.ts, foi realizado um
  subscribe também no BehaviorSubject name$

- Para mudar este valor utilizar o next()

```ts
this.apiService.name$.subscribe({
  next: (value) => console.log(value),
});

this.apiService.name$.next("Outro nome");
```

_Todos os componentes inscritos em name$, tera o valor alterado para 'Outro nome' (nesse exemplo)_

<hr>

**Com Signal (Atual)**

- No componente, outro-componente.component.ts

```ts
this.apiService.name.set("Signal Alterado"); // Alterando valor
console.log(this.apiService.name()); // exibindo novo valor
```

- Para verificar se também foi alterado em outro componente por exemplo no consume-service.component.ts utilizo o setTimeout, após 3s exibe o name alterado

```ts
ngOnInit(): void {

  console.log(this._apiService.name()); // 'Lucas Dantas'

  setTimeout(() => {
    console.log(this._apiService.name()); // 'Signal Alterado'
  }, 3000);
}
```

_Funciona de maneira similar ao BehaviorSubject_

## HTTP

Utilização do http no angular

- Importação do provideHttpClient e criação no app.config.ts

```ts
import { provideHttpClient } from "@angular/common/http";

export const appConfig: ApplicationConfig = {
  providers: [provideRouter(routes), provideHttpClient()],
};
```

- Injetando no service, no construtor (Comum)

```ts
import { HttpClient } from "@angular/common/http";

@Injectable({
  providedIn: "root",
})
export class ApiService {
  constructor(private _http: HttpClient) {}
}
```

- Ou injetando no service com signal (Novo)

```ts
import { Injectable, inject } from "@angular/core";
import { HttpClient } from "@angular/common/http";

@Injectable({
  providedIn: "root",
})
export class ApiService {
  #http = inject(HttpClient);
}
```

Realizando a chamada http no Service
Em api.service.ts

- tipando o Observable com interface
- realizando chamada get
- utilizando o Observable
- _o $ no nome da função significa que é um observable_

```ts
interface Tasks {
  id: string,
  title: string
}

export class ApiService {
  #apiURL: WritableSignal<string> = signal(environment.API_URL);
  public name: WritableSignal<string> = signal('Lucas Dantas');
  public name$ = new BehaviorSubject('Lucas Dantas $');

  constructor(private _http: HttpClient) {
  }

  public httpListTask$(): Observable<Tasks[]> {
    return this._http.get<Tasks[]>(this.#apiURL())
  }
```

## Requisições com subscribe

Realizando a requisição no componente com subscribe

```ts
ngOnInit(): void{
  this._apiService.httpListTask$().subscribe({
    next: (next) => console.log(next),
      error: (error) => console.log(error),
      complete: () => console.log("complete!")
    });
}
```

next = São os dados da requisição caso seja bem sucedida.

error = Em caso de erro, exibirá o erro ocorrido da requisição.

complete = Se a requisição for bem sucedida, utiliza-lo para informar que a requisição foi bem sucedida


- Salvando os dados em getTask (signal)

```ts
  public getTask = signal<null | Array<{ id: string; title: string }>>(null);

  ngOnInit(): void {
    this._apiService.httpListTask$().subscribe({
      next: (next) => {
        console.log(next);
        this.getTask.set(next);
      },
      error: (error) => console.log(error),
      complete: () => console.log('complete!'),
    });
}
```
