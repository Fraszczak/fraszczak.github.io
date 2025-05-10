---
title: Moduł 3
author: pf
publishDate: 2025-03-09
slug: module-3-serwisy-i-zarzadzanie-danymi
description: "<b>Serwisy i zarządzanie danymi</b><br> W tym module zagłębimy się w zarządzanie danymi w Angularze. Nauczysz się tworzyć i konfigurować serwisy, takie jak RecipeService, które pozwalają na efektywne zarządzanie danymi aplikacji. Rozszerzymy model przepisów i przystosujemy komponenty do pracy z nowymi właściwościami. Na koniec zaimplementujemy funkcję usuwania przepisów z listy, co pozwoli na dynamiczne zarządzanie danymi."
next: module-4-formularz-i-walidacja
prev: module-2-komponenty
tags:
  - Angular
---

## Serwisy i zarządzanie danymi

W tym module nauczysz się, jak zarządzać danymi w Angularze za pomocą serwisów. Przejdziemy krok po kroku przez proces tworzenia serwisu, modelu danych oraz dostosowywania komponentów do pracy z tymi elementami. Na koniec dodamy funkcję usuwania przepisów z listy.

### 1. Przygotowanie struktury projektu

1. **Utwórz folder `src/app/ui`** i przenieś do niego komponenty:

   - `recipe-detail`
   - `recipe-list`

   Dzięki temu poprawimy strukturę projektu. Upewnij się, że wszystkie importy w projekcie są zgodne z nową lokalizacją komponentów.

### 2. Tworzenie modelu danych

1. **Utwórz plik `src/app/core/recipe/recipe.model.ts`** i wklej poniższy kod:

   ```typescript
   export interface RecipeModel {
     id: number; // Unikalny identyfikator przepisu
     title: string; // Tytuł przepisu
     description: string; // Krótki opis przepisu
     ingredients: string[]; // Tablica składników
     preparationTime: number; // Czas przygotowania w minutach
     difficulty: "easy" | "medium" | "hard"; // Poziom trudności
   }
   ```

2. W miejscach, gdzie używasz typu inline, np. `{ title: string; description: string }`, zamień go na `RecipeModel`.

3. Jeśli kompilator zgłasza błędy dotyczące brakujących pól, możesz:
   - Użyć `Partial<RecipeModel>`, co sprawi, że wszystkie pola będą opcjonalne.
   - Lub dodać `?` po nazwie właściwości, np. `id?: number`.

### 3. Tworzenie serwisu RecipeService

1. W terminalu, będąc w folderze projektu, uruchom polecenie:

   ```bash
   ng generate service core/recipe/services/recipe
   ```

   To polecenie utworzy pliki:

   - `src/app/core/recipe/services/recipe.service.ts`
   - `src/app/core/recipe/services/recipe.service.spec.ts` (testy, na razie ich nie ruszamy).

2. Przenieś dane przepisów z komponentu `recipe-list` do serwisu. W pliku `recipe.service.ts` dodaj:

   ```typescript
   recipes: RecipeModel[] = [
     {
       id: 1,
       title: 'Spaghetti Carbonara',
       description: 'Klasyczne włoskie danie.',
       ingredients: [],
       preparationTime: 10,
       difficulty: 'easy',
     },
     {
       id: 2,
       title: 'Pancakes',
       description: 'Puszyste naleśniki z syropem klonowym.',
       ingredients: [],
       preparationTime: 20,
       difficulty: 'hard',
     },
     {
       id: 3,
       title: 'Tacos',
       description: 'Meksykańskie tacos z wołowiną i salsą.',
       ingredients: [],
       preparationTime: 30,
       difficulty: 'medium',
     },
   ];
   ```

3. Dodaj metodę, która zwróci listę przepisów:

   ```typescript
   getRecipes(): RecipeModel[] {
     return this.recipes;
   }
   ```

### 4. Wstrzykiwanie serwisu do komponentu

1. W pliku `recipe-list.component.ts` dodaj konstruktor:

   ```typescript
   constructor(private recipeService: RecipeService) {}
   ```

2. Dodaj zmienną do przechowywania przepisów:

   ```typescript
   recipes: RecipeModel[] = [];
   ```

3. Zaimplementuj interfejs `OnInit`, który jest częścią cyklu życia komponentów w Angularze. Interfejs ten wymaga dodania metody `ngOnInit`, która jest wywoływana, gdy komponent jest inicjalizowany. To idealne miejsce na przypisanie danych z serwisu, ponieważ w tym momencie wszystkie zależności komponentu są gotowe.

   W pliku `recipe-list.component.ts` zaimplementuj interfejs i dodaj metodę:

   ```typescript
   import { Component, OnInit } from "@angular/core";

   export class RecipeListComponent implements OnInit {
     recipes: RecipeModel[] = [];

     constructor(private recipeService: RecipeService) {}

     ngOnInit(): void {
       this.recipes = this.recipeService.getRecipes();
     }
   }
   ```

   > **Dlaczego `ngOnInit`?**
   > Metoda `ngOnInit` jest częścią cyklu życia komponentu w Angularze. Wykorzystujemy ją, ponieważ w momencie jej wywołania komponent jest już w pełni zainicjalizowany, a wszystkie jego zależności (np. serwisy) są gotowe do użycia. Dzięki temu mamy pewność, że dane z serwisu zostaną poprawnie przypisane do zmiennej `recipes`.

### 5. Tworzenie i rozszerzanie komponentu `recipe-list-element`

1. **Utwórz nowy komponent `recipe-list-element`** za pomocą Angular CLI:

   ```bash
   ng generate component ui/recipe-list-element
   ```

   Ten komponent będzie odpowiadał za wyświetlanie pojedynczego elementu listy przepisów.

2. Przenieś kod HTML odpowiedzialny za wyświetlanie pojedynczego przepisu z komponentu `recipe-list` do nowo utworzonego komponentu `recipe-list-element.component.html`.

   Przykład kodu:

   ```html
   @if (recipe) {
   <article>
     <h3>{{ recipe.title }}</h3>
     <p>{{ recipe.description }}</p>
   </article>
   }
   ```

3. Dodaj obsługę kliknięcia na przepis w komponencie `recipe-list-element`. Przenieś `(click)="onRecipeClick(recipe)"` z komponentu `recipe-list` do `recipe-list-element.component.html`:

   ```html
   @if (recipe) {
   <article (click)="onRecipeClick(recipe)">
     <h3>{{ recipe.title }}</h3>
     <p>{{ recipe.description }}</p>
   </article>
   }
   ```

4. Rozszerz widok komponentu `recipe-list-element` o dodatkowe elementy modelu:

   ```html
   @if (recipe) {
   <article (click)="onRecipeClick(recipe)">
     <h3>{{ recipe.title }}</h3>
     <p>{{ recipe.description }}</p>
     <p>Poziom trudności: {{ recipe.difficulty }}</p>
     <p>Czas przygotowania: {{ recipe.preparationTime }} minut</p>
   </article>
   }
   ```

5. W pliku `recipe-list-element.component.ts` dodaj właściwość `@Input` do przyjmowania danych przepisu oraz metodę `onRecipeClick`:

   ```typescript
   import { Component, Input, Output, EventEmitter } from "@angular/core";
   import { RecipeModel } from "src/app/core/recipe/recipe.model";

   @Component({
     selector: "app-recipe-list-element",
     templateUrl: "./recipe-list-element.component.html",
     styleUrls: ["./recipe-list-element.component.css"],
   })
   export class RecipeListElementComponent {
     @Input() recipe!: RecipeModel;
     @Output() recipeClicked = new EventEmitter<RecipeModel>();

     onRecipeClick(recipe: RecipeModel): void {
       this.recipeClicked.emit(recipe);
     }
   }
   ```

6. W pliku `recipe-list.component.html` użyj nowego komponentu `recipe-list-element` i obsłuż zdarzenie `recipeClicked`:

   ```html
   @for (let recipe of recipes) {
   <app-recipe-list-element [recipe]="recipe" (recipeClicked)="onRecipeClick($event)"></app-recipe-list-element>
   }
   ```

### 6. Dodanie funkcji usuwania przepisów

1. W pliku `recipe-list-element.component.html` dodaj przycisk usuwania:

   ```html
   <button (click)="onDeleteRecipe(recipe.id)">Usuń</button>
   ```

2. W pliku `recipe-list-element.component.ts` zaimplementuj metodę:

   ```typescript
   onDeleteRecipe(id: number): void {
     this.recipeRemoved.emit(id);
   }
   ```

3. W pliku `recipe-list.component.ts` dodaj metodę obsługującą usuwanie:

   ```typescript
   onDeleteRecipe(id: number): void {
     this.recipeService.deleteRecipe(id);
     this.recipes = this.recipeService.getRecipes();
   }
   ```

4. W serwisie `recipe.service.ts` dodaj metodę usuwającą przepis:

   ```typescript
   deleteRecipe(id: number): void {
     this.recipes = this.recipes.filter((r) => r.id !== id);
   }
   ```

### 7. Testowanie aplikacji

Po wykonaniu wszystkich kroków aplikacja powinna działać poprawnie. W przeglądarce zobaczysz listę przepisów, będziesz mógł podejrzeć ich szczegóły oraz usuwać wybrane pozycje.

### Podsumowanie

W tym module:

- Utworzyliśmy i skonfigurowaliśmy serwis RecipeService.
- Nauczyliśmy się zarządzać danymi za pomocą serwisów.
- Rozszerzyliśmy model danych i dostosowaliśmy komponenty do nowych właściwości.
- Dodaliśmy funkcję usuwania przepisów z listy.

#### Zadanie dla chętnych

- Spraw, by naciśnięcie przycisku usunięcia nie zaznaczało przepisu.
- Spraw, by usunięcie zaznaczonego przepisu powodowało jego "odznaczenie".
