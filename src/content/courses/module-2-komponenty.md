---
title: Moduł 2
author: pf
publishDate: 2025-03-09
slug: module-2-komponenty
description: "<b>Komponenty - style, cykl życia komunikacja między komponentami (Data Binding)</b><br> W tym module nauczysz się stylizować komponenty Angulara, tworzyć szczegółowe widoki i komunikować się między komponentami. Poznasz techniki takie jak Data Binding, @Input() i @Output()."
next: module-3-serwisy-i-zarzadzanie-danymi
prev: module-1-wprowadzenie-do-Angulara
tags:
  - Angular
---

## Komponenty - style, cykl życia komunikacja między komponentami (Data Binding)

_W tym module stworzymy nowy komponent do wyświetlania szczegółów przepisu i nauczymy się przekazywać dane między komponentami._
_Omówimy także interpolację oraz binding (wiązanie) danych – kluczowe pojęcia w Angularze._

### Na początek dodamy kilka stylów globalnych, które wpłyną na wygląd całej aplikacji.

Otwórz plik **src/styles.scss** i dodaj

```css
body {
  font-family: Arial, sans-serif;
  background-color: #f4f4f4;
  margin: 0 auto;
  padding: 0;
  max-width: 1200px;
}

h1,
h2 {
  color: #333;
}

ul {
  list-style-type: none;
  padding: 0;
}
```

> Definiujemy tutaj podstawowe style, które będą miały wpływ na wygląd całej aplikacji, ustawiając m.in. kolor tła i czcionkę.

### Teraz dodamy style do naszego komponentu RecipeListComponent, który wyświetla listę przepisów.

Otwórz plik **src/app/recipe-list/recipe-list.component.scss** i dodaj style

```css
.header {
  text-align: center;
}

h3 {
  color: #ff6347;
  font-size: 1.5em;
}

li {
  background-color: #fff;
  border: 1px solid #ddd;
  margin: 10px 0;
  padding: 15px;
  border-radius: 5px;
  transition: background-color 0.3s ease;
}

li:hover {
  background-color: #f9f9f9;
}

p {
  color: #555;
}
```

> Ustawiliśmy kolor nagłówka, stylizację listy i elementów listy, które będą reagować na najechanie kursorem (hover).

### W tym kroku stworzymy nowy komponent RecipeDetailComponent, który będzie odpowiedzialny za wyświetlanie szczegółów wybranego przepisu.

Otwórz terminal, będąc w swoim projekcie, wpisz

```bash
  ng generate component recipe-detail
```

> Komenda **ng generate component** tworzy komponent o nazwie **recipe-detail**.
> Zostaną wygenerowane cztery pliki:
>
> - recipe-detail.component.ts (logika komponentu),
> - recipe-detail.component.html (szablon HTML),
> - recipe-detail.component.scss (style),
> - recipe-detail.component.spec.ts (testy jednostkowe).

### Teraz dodamy do RecipeDetailComponent właściwość, która pozwoli wyświetlić szczegóły wybranego przepisu.

Otwórz plik **src/app/recipe-detail/recipe-detail.component.ts**.
W kodzie komponentu znajdź klasę **RecipeDetailComponent** i dodaj do niej następującą linię kodu:

```typescript
export class RecipeDetailComponent {
  @Input() selectedRecipe: { title: string; description: string } | null = null;
}
```

> Używamy dekoratora **@Input()**, który pozwala przekazać dane z komponentu
> nadrzędnego **RecipeListComponent** do komponentu podrzędnego **RecipeDetailComponent**.
> By zadziałał, trzeba go zaimportować **import { Input } from '@angular/core';**

### Aktualizacja widoku RecipeDetailComponent

Otwórz plik **src/app/recipe-detail/recipe-detail.component.html** i podmień kod na

```html
<section class="container">
  @if (!selectedRecipe) {
  <div>
    <p>Wybierz przepis z listy, aby zobaczyć szczegóły.</p>
  </div>
  } @if (selectedRecipe) {
  <div class="container--selected">
    <h2>{{ selectedRecipe.title }}</h2>
    <p>{{ selectedRecipe.description }}</p>
  </div>
  }
</section>
```

> Używamy bloku **@If**, aby pokazać szczegóły przepisu, jeśli został wybrany.
> Jeśli nie, wyświetlamy komunikat z prośbą o wybór przepisu.

Otwórz plik **src/app/recipe-detail/recipe-detail.component.scss** i dodaj style

```css
.container {
  &--selected {
    border: 2px dashed #000000;
    margin: 10px 0;
    padding: 15px;
    border-radius: 5px;
    transition: background-color 0.3s ease;
  }
  p {
    color: #555;
  }

  h2 {
    color: #555;
    font-size: 1.5em;
  }
}
```

### Aktualizacja RecipeListComponent (interpolation i event binding), aby umożliwić użytkownikowi kliknięcie na przepis i wyświetlenie jego szczegółów.

Otwórz plik **src/app/recipe-list/recipe-list.component.ts** i dodaj kod

```typescript
  @Output() recipeSelected = new EventEmitter<{ title: string, description: string }>();

  onRecipeClick(recipe: { title: string, description: string }) {
    this.recipeSelected.emit(recipe);
  }
```

> W powyższym kodzie użyliśmy **EventEmitter** i dekoratora **@Output()**.
> Wszystko po to żeby móc emitować zdarzenie, gdy użytkownik kliknie na przepis.
> Funkcja **onRecipeClick()** wysyła dane o przepisie do komponentu nadrzędnego.

Otwórz plik **src/app/recipe-list/recipe-list.component.html** i dodaj możliwość kliknięcia na przepis.

```html
<h2 class="header">Lista Przepisów</h2>
<ul>
  @for (recipe of recipes; track recipe) {
  <li (click)="onRecipeClick(recipe)">
    <h3>{{ recipe.title }}</h3>
    <p>{{ recipe.description }}</p>
  </li>
  }
</ul>
```

> Używamy **event binding (click)**, aby wywołać funkcję **onRecipeClick()** w momencie kliknięcia na przepis. Dzięki temu możemy przechwycić kliknięcie i przekazać dane wybranego przepisu.

### Aktualizacja komponentu głównego AppComponent (property binding)

_Teraz w AppComponent odbierzemy dane o wybranym przepisie i przekażemy je do RecipeDetailComponent._

Otwórz plik **src/app/app.component.ts** i dodaj

```typescript
  selectedRecipe: { title: string, description: string } | null = null;

  onRecipeSelected(recipe: { title: string, description: string }) {
    this.selectedRecipe = recipe;
    }
```

> Kiedy użytkownik wybierze przepis w **RecipeListComponent**, dane o wybranym przepisie są przekazywane do **AppComponent** za pomocą event bindingu.

Otwórz plik **src/app/app.component.html** Zaktualizuj go o kod

```html
<app-recipe-list (recipeSelected)="onRecipeSelected($event)"></app-recipe-list> <app-recipe-detail [selectedRecipe]="selectedRecipe"></app-recipe-detail>
```

**Nie zapomnij o importach w pliku app.component.ts.**

> Tutaj mamy zarówno event binding - kiedy recipeSelected emituje zdarzenie
> oraz property binding - kiedy selectedRecipe jest przekazywany do **RecipeDetailComponent**.

Teraz w przeglądarce zobaczysz listę przepisów kulinarnych oraz będziesz mógł podejrzeć ich szczegóły! 🎉

## Podsumowanie Modułu:

W tym module:

- Nauczyliśmy się jak stylizować komponenty w Angularze, zarówno lokalnie, jak i globalnie.
- Utworzyliśmy drugi komponent wyświetlający szczegóły przepisu i wprowadziliśmy mechanizmy komunikacji między komponentami (Data Binding) - @Input() i @Output()
- Poznaliśmy 'interpolation', 'event binding', 'property binding' oraz jak przekazywać dane między komponentami w Angularze.

#### Zadanie dla chętnych

- Spraw by pozycja wybrana z listy przepisów odróżniała się od tych nie wybranych (selected vs not selected).

_Podpowiedź: Możesz użyć dyrektywy ngClass_
