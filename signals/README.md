# Signal Angular 17

Um signal tem a capacidade de armazenar um valor, uma espécie de encapsulamento
que tem a capacidade de notificar os consumidores interessados
sempre que este valor sofre alguma alteração.

A obtenção do seu valor é obtido atráves de um getter o que permite rastrear
seu uso e monitorar mudanças que possam ocorrer

## Utilizando no componente

- Importação

```ts
import { signal } from "@angular/core";
```

- Declarando o valor das variavéis na classe com signal

```ts
numA = signal(1);
firstName = signal("Lucas");
```

- No documento deve ficar assim:

```html
<h3>{{ numA() }}</h3>
<p>{{ firstName() }}</p>
```

## Alterando valores do signal

- Exemplo de uma função que seta o valor do signal com set()

```ts
  setName() {
    return this.firstName.set('João');
  }
```

- Exemplo de uma função que atualiza o valor da variável utilizando o update()

```ts
addCount() {
  this.numA.update((valorAnterior) => valorAnterior + 1);
}
```

_Enquanto update pode resgatar o valor anterior e manipula-lo/altera-lo, o set apenas define um novo valor_

## Tipagem

- Importação

```ts
import { signal, WritableSignal } from "@angular/core";
```

- O signal é do tipo **WritableSignal + tipo da variável**, no exemplo abaixo:

```ts
firstName: WritableSignal<string> = signal("Lucas");
lastName: WritableSignal<string> = signal("Dantas");
```

## Computed

- Se quisermos utilizar o signal a outra variável, como se deve no exemplo abaixo:

```ts
firstName: WritableSignal<string> = signal("Lucas");
lastName: WritableSignal<string> = signal("Dantas");

fullName = this.firstName() + this.lastName();
```

- Porém se caso for alterado/atualizado o valor de firstName ou lastName, na váriavel name continuará o valor inicial, pois a variável "fullName" não é um signal, e não é reativo em caso de atualizações no signal. Então o correto é a utilização do computed(), onde o computed detecta as mudanças no signal.

```ts
fullName = computed(() => {
  return this.firstName() + " " + this.lastName();
});
```

## Update

- declarando um array na classe do componente

```ts
array = signal(["Arroz", "Feijão", "Batata"]);
```

- Renderizando cada item do array no documento

```html
<ul>
  @for (item of array(); track $index) {
  <li>{{ item }}</li>
  }
</ul>
<button (click)="updateArray()">Click</button>
```

- Utilizando o update() para atualzar/adicionar mais um item no array

```ts
updateArray() {
  const foo = "Carne"
  this.array.update((ValorAnterior: Array<string>): Array<string> => {
    return [...ValorAnterior, foo]
  }
// ["Arroz", "Feijão", "Batata", "Carne"]
```

## Effect

Raramente são necessários na maioria dos códigos, mas podem ser úteis em circunstâncias especificas.

  - Registro de dados sendo exibidos e quando eles mudam, seja para análise ou como ferramentas
  de depuração

  - Manter os dados sincronizados com o window.localStorage

  - Adicionando comportamento DOM personalizado que não pode ser expresso com sintaxe de modelo.

  - Executar renderização personalizada em um "canvas", biblioteca de gráficos ou outra biblioteca de UI de terceiros.

Quando não usar efeitos

 - Evite usar efeitos para propagação de alterações de estado. Isso pode resultar em erros, atualizações circulares infinitas ou ciclos de detecção de alterações desnecessários.ExpressionChangedAfterItHasBeenChecked

 -Devido a esses riscos, o Angular por padrão impede que você defina signals em effect. Ele pode ser habilitado, se absolutamente necessário, definindo o sinalizador quando você cria um effect.allowSignalWrites

 -Em vez disso, use signals para modelar o estado que depende de outro estado.

- Utilizando o Effect

```ts
  count = signal(0);
  
  constructor() {
    // Registrando o count no effect, toda vez que o count sofrer alteração, o console.log() retorna o valor atual
    effect(() => {
      console.log(`The count is: ${this.count()}`);
    });
  }
```

*Pode ser util para utilizar alguma lógica em um signal registado no effect*

## Docs

*https://angular.dev/guide/signals*
