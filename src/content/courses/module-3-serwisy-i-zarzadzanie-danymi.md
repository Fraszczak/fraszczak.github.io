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

_W tym module stworzymy serwis RecipeService, który będzie przechowywał i zarządzał danymi przepisów. Skonfigurujemy model danych RecipeModel, a także nauczymy się, jak wstrzykiwać serwis do komponentu, aby umożliwić pobieranie i usuwanie przepisów._

_Serwisy w Angularze pozwalają oddzielić logikę biznesową od warstwy prezentacji. Dzięki temu komponenty są bardziej przejrzyste, a kod jest łatwiejszy do zarządzania i testowania._

Stwórzmy folder **src/app/ui** i przenieśmy tam stworzone przez nas komponenty.

- _recipe-detail_,
- _recipe-list_

Poprawi to trochę naszą strukturę.
Upewnij się, że importy w całym projekcie są zgodne z nową strukturą.

Teraz stwórzmy nasz pierwszy plik z modelem. **src/app/core/recipe/recipe.model.ts**

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

W miejscach w których uzywamy typu inline **{ title: string; description: string }** uzyjmy wcześniej stworzonego modelu**RecipeModel**.
W **RecipeListComponent** jest lista naszych przepisów, nadajmy jej odpowiedni model.
Jezeli kompilator zwórci uwagę, że brakuje pełnej definicji modelu, mozesz uzyć Parial<T>, to tak zwany **utility type** który sprawi, ze wszystkie pola staną się opcjonalne.

```typescript
Partial<RecipeModel>;
```

Możemy także ręcznie pokazać kompilatorowi które pola są opcjonalne poprzed dodanie **?** po nazwie właściwości jak

```typescript
  id?: number;
```

Zwróć uwagę jak teraz pracę utrudnia Ci TypeScript.
Względem JavaScript, kod teraz powstaje trochę wolniej, ale w perspektywie czasu stworzenia a potem utrzymywania takiego projektu będzie łatwiejsze.

### Następnie stwórzmy serwis RecipeService

W terminalu, będąc w folderze projektu utwórz serwis za pomocą Angular CLI:

```bash
  ng generate service core/recipe/services/recipe
```

> To polecenie stworzy pliki:
>
> - **src/app/core/recipe/services/recipe.service.ts**
> - **src/app/core/recipe/services/recipe.service.spec.ts** (testy, na razie ich nie ruszamy).

Na początek przenieśmy do serwisu **recipe-service.ts** przepisy z komponentu **recipe-list**.

Uzupełnijmy brakujące pola modelu wg uznania. (ingredients, preparationTime, difficulty)

```typescript
recipes: RecipeModel[] = [
    {
      title: 'Spaghetti Carbonara',
      description: 'Klasyczne włoskie danie.',
      ingredients: [],
      preparationTime: 10,
      difficulty: 'easy',
    },
    {
      title: 'Pancakes',
      description: 'Puszyste naleśniki z syropem klonowym.',
      ingredients: [],
      preparationTime: 20,
      difficulty: 'hard',
    },
    {
      title: 'Tacos',
      description: 'Meksykańskie tacos z wołowiną i salsą.',
      ingredients: [],
      preparationTime: 30,
      difficulty: 'medium',
    },
  ];
```

Teraz dodajmy metodę **getRecipes(): RecipeModel[]** którą pobierzemy nasz przepisy w przyszłości.

Gdy metoda jest już gotowa, a przepisy są przeniesione do ciała serwisu, wstrzyknijmy serwis **RecipeService** do komponentu **RecipeListComponent** i sprawmy by nasza aplikacja zaczęła działać z wykorzystaniem serwisu.

By wstrzyknąć serwis do komponentu będzie potrzebny nam konstruktor w ciele klasy komponentu. Dodajmy go.

```typescript
  constructor() {}

  // alternatywnie mozemy uzyc funkcji inject() pochodzącej z @angular/core
```

Następnie jako parametr podajmy wcześniej stworzony serwis

```typescript
  constructor(private recipeService: RecipeService) {}
```

W komponencie **RecipeListComponent** dodajmy zmienną

```typescript
  recipes: RecipeModel[]  = []
```

Następnie zaciągnijmy dane z serwisu i przypiszmy je do naszej zmiennej. Żeby zrobić to w odpowiednim momencie, musimy dodać **ngOnInit** life cycle hook.

Zrobimy to poprzez implementacje interfejsu OnInit i spełnienie jego kontraktu

```typescript
  export class RecipeListComponent implements OnInit {
  // ...
  ngOnInit(): void {}
  // ...
```

W ciele ngOnInit przypisz wywołanie funkcji getRecipes z serwisu

```typescript
  export class RecipeListComponent implements OnInit {
  // ...
    ngOnInit(): void {
    this.recipes = this.recipeService.getRecipes();
  }
  // ...
```

> Akcja przypisania wartości do zmiennej recipe dzieje się w metodzie ngOnInit, bo to bezpieczny moment w którym wszystko potrzebne jest gotowe, komponent jest wyrenderowany i mamy dostępn do jego zależności, serwis jest stworzony a jego instancja jest dostępna w scope komponentu.
> Jest to bardzo istotne, w momencie w którym przejdziemy do programowania reaktywnego, zrozumienie cykli życia jest niezbędne.

Po wykonaniu wszystkich kroków aplikacja powinna wrócić do stanu sprzed dodania serwisu.
Możesz mieć problem z importami, wyrównaj je.

### Rozszerzyliśmy model o dodatkowe właściwości, zróbmy to samo z widokiem komponentów wyświetlających nasze przepisy

Przejdzmy do **recipe-list-element.component.html** dostosujmy widok do modelu analogiczne do tego co już jest tam robione.
Dorzućmy linijki które wyświtlą nam poziom trudności oraz czas przygotowania.

```typescript
  @if (recipe) {
    <article (click)="onRecipeClick(recipe)">
        <h3>{{ recipe.title }}</h3>
        <p>{{ recipe.description }}</p>
        <p>Poziom trudności: {{ recipe.difficulty }}</p>
        <p>Czas przygotowania: {{ recipe.preparationTime }} minut</p>
    </article>
}
```

To samo zróbmy z komponentem **recipe-detail.component**

Wszystkie modele inline zamień na **RecipeModel** lub **RecipeModel & { selectedRecipeTitle: string }** w zależności od potrzeby (ten drugi jest potrzebny przy przyciskach)

> Podczas zmian w modelach, zauważ ile to pracy, dlatego bardzo ważna jest chociaż podstawowa znajomość TS'a oraz prawidłowe modelowanie najlepiej od samego początku powstawania projektu.

Możesz potrzebować mapowania, np przy emitowaniu wartości, możesz to zrobić poprzez stworzenie nowego obiektu i przypsanie do niego ręcznie pól jakie Cię interesuje, przykład:

```typescript
const toEmit = {
  id: listElement.id,
  title: listElement.title,
  description: listElement.description,
  ingredients: listElement.ingredients,
  preparationTime: listElement.preparationTime,
  difficulty: listElement.difficulty,
};
```

### Dodajmy teraz przycisk który pozwoli nam usunąć przepis.

Zacznijmy od widoku, przejdzmy do **recipe-list-element.html** i dodajmy

```html
<button (click)="onDeleteRecipe(recipe.id)">Usuń</button>
<p>Czas przygotowania: {{ recipe.preparationTime }} minut</p>
```

Przejdzmy do **recipe-list-element.component.ts** i dodajmy implementacje metody **onDeleteRecipe(id: number)** Powinna emitować **id** do komponentu nadrzędnego.

Następnie przejdzmy do komponentu **recipe-list.component.html** i dodajmy obsługę zdarzenia

```html
(recipeRemoved)="onDeleteRecipe($event)"
```

W tym samym komponencie, w jego **.ts** zaimplementuje metodę **onDeleteRecipe(id: number)**
_Teraz brakuje nam już tylko logiki która obsłuży usuwanie przepisu._

Przejdzmy do serwisu **recipe-service.ts** i dodajmy metode

```typescript
@Injectable({
  providedIn: "root",
})
export class RecipeService {
  // ...

  // Metoda usuwająca przepis
  deleteRecipe(id: number): void {
    this.recipes = this.recipes.filter((r) => r.id !== id);
  }
}
```

Gdy już mamy gotową metodę, wywołajmy ja w metodzie **onDeleteRecipe** w komponencie **recipe-listcomponent.ts**, przekazując **id** jako parametr.

Przy akcji usunięcia pamiętajmy o odświeżeniu modelu danych.

```typescript
export class RecipeListComponent implements OnInit {
  // ...
  onDeleteRecipe(id: number): void {
    this.recipeService.deleteRecipe(id); // Usuwanie przepisu
    this.recipes = this.recipeService.getRecipes(); // Odśwież listę
  }
}
```

Na sam koniec powinieneś zobaczyć błędy w konsoli, dotyczą one typów.
Usuń opcjonalność z właściwości modelu **RecipeModel**.
Upewnij się, że wszędzie używasz tego modelu danych.

Teraz w przeglądarce zobaczysz listę przepisów kulinarnych, będziesz mógł podejrzeć ich szczegóły oraz usunąć wybrane pozycje! 🎉

## Podsumowanie Modułu:

W tym module:

- Utworzyliśmy i skonfigurowaliśmy serwis RecipeService.
- Nauczyliśmy się, jak zarządzać danymi przy użyciu serwisów.
- Rozszerzyliśmy RecipeModel i przystosowaliśmy komponenty do pracy z nowymi właściwościami.
- Zaimplementowaliśmy funkcję usuwania przepisów z listy.

#### Zadanie dla chętnych

- Spraw by naciśnięciu przycisku usunięcia przepis nie był jednocześnie zaznaczany.
- Spraw by usunięcie zaznaczonego przepisu powodowało jego "odznaczenie".
