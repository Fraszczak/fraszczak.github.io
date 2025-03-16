---
title: Moduł 8
author: pf
publishDate: 2025-03-09
slug: module-8-filtrowanie-i-wyszukiwanie
description: "<b>Filtrowanie i wyszukiwanie</b><br> W tym module skupimy się na dodaniu funkcjonalności filtrowania listy przepisów. Użytkownicy będą mogli filtrować przepisy po poziomie trudności oraz po nazwie, co znacznie ułatwi im wyszukiwanie interesujących przepisów. Dzięki temu Twoja aplikacja stanie się bardziej interaktywna i przyjazna dla użytkownika."
next: module-9-obsluga-plikow
prev: module-7-dyrektywy-pipes
tags:
  - Angular
---

## Filtrowanie i wyszukiwanie

_Filtrowanie przepisów według poziomu trudności wykonania (łatwe, trudne, średnio trudne)_
_Wyszukiwanie przepisów na podstawie nazwy_

### Na początek, rozszerzmy trochę zakres naszych przepsów.

Podmień zawartość pliku **db.json** na kod

```json
{
  "recipes": [
    {
      "id": 1,
      "title": "Spaghetti Carbonara",
      "description": "Klasyczne włoskie danie.",
      "ingredients": ["Pasta", "Eggs", "Pork", "Cheese", "Pepper"],
      "preparationTime": 30,
      "difficulty": "easy"
    },
    {
      "id": 2,
      "title": "Pancakes",
      "description": "Puszyste naleśniki z syropem klonowym.",
      "ingredients": ["Flour", "Milk", "Eggs", "Honey"],
      "preparationTime": 20,
      "difficulty": "medium"
    },
    {
      "id": 3,
      "title": "Tacos",
      "description": "Meksykańskie tacos z wołowiną i salsą.",
      "ingredients": ["Flour", "Milk", "Eggs", "Beef", "Salt"],
      "preparationTime": 60,
      "difficulty": "hard"
    },
    {
      "id": "3",
      "title": "Tacos",
      "description": "Meksykańskie tacos z wołowiną i salsą.",
      "ingredients": ["Flour", "Milk", "Eggs", "Beef", "Salt"],
      "preparationTime": 60,
      "difficulty": "hard"
    }
  ]
}
```

### Dodanie funkcji filtrowania

Przejdź do **recipe-list.component.ts** i dodaj dwie zmienne

```typescript
filteredRecipes: RecipeModel[] = []; // przechowuje liste przefiltrowanych przepisów wg trudności wykonania
selectedDifficulty: string = '';  // informacja o aktualnie wybranym poziomie trudności.
```

Stwórz funkcję **filterRecipes()** - ta funkcja sprawdzi, czy użytkownik wybrał konkretny poziom trudności.
Jeśli tak, to wyświetli przepisy o tej trudności, a jeśli nie, to pokaże wszystkie przepisy

```typescript
     //Gdy przepisy zostaną pobrane z serwera, funkcja getRecipes() zapisze je w recipes
     // a następnie wywoła filterRecipes(), by zastosować filtr (jeśli jest ustawiony).
     filterRecipes(): void {
        if (this.selectedDifficulty) {
            this.filteredRecipes = this.recipes.filter(recipe => recipe.difficulty === this.selectedDifficulty);
         } else {
            this.filteredRecipes = this.recipes;  // Bez filtra pokazujemy wszystkie przepisy
         }
      }
```

Zmień istniejącą funkcję **getRecipes()**, by uwzględniała automatyczne filtrowanie po pobraniu przepisów

```typescript
  private getRecipes(): void {
     this.recipeService.getRecipes()
     .pipe(
         tap((recipesFromGetRecipesMethod: RecipeModel[]) => {
               this.recipes = recipesFromGetRecipesMethod;
               this.filterRecipes(); // Inicjalne filtrowanie przy pobraniu przepisów
            })
     ).subscribe();
   }
```

Dodaj do listy importów dwa moduły **MatSelectModule, FormsModule**
**MatSelectModule** jest potrzebny, aby móc używać elementu `<mat-select>`, który pozwala na wybór poziomu trudności.
**FormsModule** jest potrzebny, aby poprawnie działało dwukierunkowe bindowanie danych, dzięki któremu wybrana trudność automatycznie zapisze się w zmiennej **selectedDifficulty**.

Przejdź do **recipe-list.component.html**.
Wstaw poniższy kod na początku pliku

```html
<mat-form-field>
  <mat-label>Filtruj wg trudności wykonania</mat-label>
  <mat-select [(ngModel)]="selectedDifficulty" (selectionChange)="filterRecipes()">
    <mat-option value="">Wszystkie</mat-option>
    <mat-option value="easy">Łatwy</mat-option>
    <mat-option value="medium">Średni</mat-option>
    <mat-option value="hard">Trudny</mat-option>
  </mat-select>
</mat-form-field>
```

**(ngModel)** wiąże zmienną **selectedDifficulty** z wybraną wartością w `<mat-select>`.
**(selectionChange)="filterRecipes()"** wywołuje funkcję `filterRecipes()`, gdy użytkownik zmieni poziom trudności, dzięki czemu lista przepisów zostanie automatycznie przefiltrowana.

Znajdź blok

```html
@for (recipe of recipes; track recipe)
```

zmień go na

```html
@for (recipe of filteredRecipes; track recipe)
```

Na koniec dorzuć drobne style do pliku **recipe-list.component.scss**

```css
mat-form-field {
  width: 100%;
  border-radius: 12px;
}
```

### Dodanie funkcji wyszukiwania po nazwie.

Przejdź do **recipe-list.component.ts**
Dodaj zmienną **searchTerm**, która będzie przechowywać tekst wpisany przez użytkownika w polu wyszukiwania.

```typescript
searchTerm: string = ""; // Tekst wpisany przez użytkownika do wyszukiwania
```

Zaktualizuj funkcję **filterRecipes()**, by uwzględniała wyszukiwanie po nazwie

```typescript
  filterRecipes(): void {  // Filtrowanie według trudności
      let filteredByDifficulty = this.selectedDifficulty ? this.recipes.filter(recipe => recipe.difficulty === this.selectedDifficulty) : this.recipes;

  // Dodatkowe filtrowanie według nazwy przepisu
      if (this.searchTerm) {
            this.filteredRecipes = filteredByDifficulty.filter(recipe => recipe.title.toLowerCase().includes(this.searchTerm.toLowerCase()));
      } else {
            this.filteredRecipes = filteredByDifficulty; // Bez filtra wyszukiwania pokazujemy przepisy przefiltrowane według trudności
         }
   }
```

Dodaj **MatInputModule** do listy importów.

Następnie przejdź do **`**recipe-list.component.html\*\* i dodaj na samej górze naszej strony input, który będzie wyszukiwarką przepisów

```html
<!-- Pole wyboru przepisu po nazwie -->
<mat-form-field>
  <input matInput placeholder="Wyszukaj przepis" [(ngModel)]="searchTerm" (input)="filterRecipes()" />
</mat-form-field>
```

##### W tym module:

- Dodaliśmy funkcjonalność filtrowania listy przepisów po poziomie trudności oraz po nazwie.
