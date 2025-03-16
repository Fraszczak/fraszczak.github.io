---
title: Moduł 5
author: pf
publishDate: 2025-03-09
slug: module-5-routing-i-nawigacja
description: "<b>Routing i nawigacja</b><br> W tym module zagłębimy się w świat routingu Angulara. Nauczysz się dynamicznie zarządzać listą składników, tworzyć intuicyjne formularze z walidacją i używać Angular Material do stylizacji. Dodatkowo, w oparciu o eventy Router'a dodamy spinner, oraz logike odpowiedzialną za jego wyświetlanie."
next: module-6-HTTPClient-komunikacja-z-serwerem
prev: module-3-serwisy-i-zarzadzanie-danymi
tags:
  - Angular
---

## Routing i nawigacja

- Routing: tworzenie wielostronicowej aplikacji.
- Dodanie widoków dla różnych części aplikacji, takich jak: lista przepisów, szczegóły przepisu, formularz dodawania/edycji przepisu.
- Widok szczegółowy przepisu: wyświetlanie składników i instrukcji po kliknięciu na dany przepis.

_Moduł 5 jest ważnym krokiem w zrozumieniu, jak organizować wielostronicową aplikację w Angularze za pomocą routingu, co pozwala użytkownikom przemieszczać się między różnymi sekcjami aplikacji._
_W ramach tego modułu dowiemy się, jak ustawić routing dla listy przepisów, widoku szczegółowego oraz formularza dodawania/edycji przepisów._

### Konfiguracja Angular Router

Angular Router umożliwia nawigację między widokami w aplikacji. Najpierw zainstalujemy podstawową konfigurację routingu w głównym module aplikacji.

Przejdź do **app.config.ts** i upewnij się że masz **provideRouter(routes)** w liście providers.
Przejdź do **app.routes.ts** i zdefiuniuj tablice routingu tak by zawierała:

- trasy do widoków listy przepisów,
- szczegółów przepisu,
- widoku dodania / edycji przepisu.
- Powinna też zawierać przekierowanie do komponentu listy dla pustych tras.
  Widok edycji i szczegółów przepisu powinna zawierać parametr **id** by móc określić o jaki przepis chodzi.

  ```typescript
  export const routes: Routes = [
    { path: "", redirectTo: "/recipes", pathMatch: "full" }, // domyślna ścieżka, która przekierowuje na /recipes jeśli nie ma podanej innej ścieżki.
    { path: "recipes", component: RecipeListComponent }, // ścieżka do widoku listy przepisów.
    { path: "recipe/add", component: RecipeReactiveFormComponent }, // ścieżka do formularza dodawania nowego przepisu.
    { path: "recipe/edit/:id", component: RecipeReactiveFormComponent }, // ścieżka do formularza edycji przepisu, gdzie :id jest dynamicznym parametrem.
    { path: "recipe/:id", component: RecipeDetailComponent }, //  ścieżka do szczegółów wybranego przepisu.
  ];
  ```

## Tworzenie Linków do Nawigacji Między Widokami

Teraz utworzymy header naszej aplikacji a w nim menu z linkami, które umożliwią użytkownikowi nawigację po aplikacji.

Przejdź do **app.component.html** i zastąp obecny kod

```html
<section class="container">
  <nav>
    <span><strong>Recipe Manager</strong></span>
    <ul>
      <!-- dyrektywa Angulara, która ustawia trasę na odpowiedni widok. -->
      <li><a routerLink="/recipes">Lista Przepisów</a></li>
      <li><a routerLink="/recipe/add">Dodaj Nowy Przepis</a></li>
    </ul>
  </nav>
  <main>
    <!-- miejsce w szablonie, gdzie Angular Router ładuje komponenty zależnie od bieżącej ścieżki. -->
    <router-outlet></router-outlet>
  </main>
  <footer>&reg;Angular - poziom podstawowy</footer>
</section>
```

Następnie przejdź do **app.component.ts** i pozbądź się niepotrzebnego kodu

```typescript
  selectedRecipe: RecipeModel | null = null; // do usunięcia

  onRecipeSelected(recipe: RecipeModel | null) {// do usunięcia
    this.selectedRecipe = recipe; // do usunięcia
  }// do usunięcia
```

Przejdź teraz do **app.component.scss** i podmień zawartość

```css
/* Styl kontenera głównego */
.container {
  min-height: 100vh;
  /*  zapewnia, że kontener rozciąga się na całą wysokość okna przeglądarki. */
  display: flex;
  /* flexbox layout by poukładać elementy na stronie */
  flex-direction: column;
  /* kierunek układania się elementów */
}

/* Styl nawigacji */
nav {
  width: 100%;
  padding: 2rem 0;
  display: flex;
  justify-content: flex-start;
  /* Wyśrodkowanie elementów w poziomie */
  gap: 8rem;
  /* przerwa między blokami */

  span {
    margin: 0;
    padding: 0;
    text-decoration: none;
    transition: color 0.3s ease, text-decoration 0.3s ease;
    align-self: flex-start;

    strong {
      color: #3f51b5;
      font-size: 2rem;
    }
  }

  ul {
    list-style: none;
    display: flex;
    gap: 1.5rem;
    /* Odstęp między linkami */
    margin: 0;
    padding: 0;
  }

  li {
    a {
      text-decoration: none;
      color: #333;
      font-size: 1.1rem;
      transition: color 0.3s ease, text-decoration 0.3s ease;

      &:hover {
        cursor: pointer;
        text-decoration: underline;
        /* Podkreślenie na hover */
        color: #007bff;
        /* Akcentowany kolor na hover */
      }
    }
  }
}

/* Styl głównej sekcji (main) */
main {
  flex: 1;
  /* Wypełnia całą dostępną przestrzeń pionową */
  padding: 2rem;
}

/* Styl stopki */
footer {
  margin-top: auto;
  padding: 1rem 0;
  text-align: center;
  font-size: 0.9rem;
  color: #666;
}
```

Pozbądź się też zaimportowanych, nie używanych zależności z listy imports oraz dodaj **RouterOutlet, RouterLink**

### Tworzenie Widoków dla Każdej Ścieżki

_Teraz utworzymy widoki, które użytkownik zobaczy korzystająć z nawigacji po aplikacji_

#### Widok Listy Przepisów RecipeListComponent

Otwórz **recipe-list.component.html** i upewnij się, że każdy przepis ma link, który prowadzi do widoku szczegółowego.
Dodajmy przycisk "Zobacz szczegóły"

```html
<div class="container">
  @for (recipe of recipes; track recipe) {
  <mat-card class="recipe-card">
    <mat-card-title>{{ recipe.title }}</mat-card-title>
    <mat-card-content>
      <p><strong>Składniki:</strong>{{ recipe.ingredients.join(', ') }}</p>
    </mat-card-content>
    <mat-card-actions>
      <button mat-button color="primary" [routerLink]="[' /recipe', recipe.id]">Zobacz szczegóły</button>
      <button mat-button color="accent" [routerLink]="['/recipe/edit', recipe.id]">Edytuj</button>
      <button mat-button color="warn" (click)="onDeleteRecipe(recipe?.id)">Usuń</button>
    </mat-card-actions>
  </mat-card>
  }
</div>
```

Przejdź do **recipe-list.component.ts**, a następnie:

- pozbądź się metody **onRecipeClick()`=** gdyż nie jest już potrzebna
- dodaj **MatButtonModule** do listy import
  Przejdź do **recipe-list.component.scss** i dodaj

```css
/* Styl głównego kontenera dla kart przepisów */
:host {
  display: block;
  padding: 1rem;
}

/* Stylizujemy kontener kart jako siatkę */
.container {
  display: grid;
  grid-template-columns: repeat(3, 1fr);
  /* 3 kolumny o równych szerokościach */
  gap: 1.5rem;
  /* Odstęp między kartami */
}

/* Styl karty przepisu */
.recipe-card {
  text-align: center;
  transition: box-shadow 0.3s ease, transform 0.3s ease;
  min-height: 350px;

  /* Efekt hover: cień wokół karty */
  &:hover {
    box-shadow: 0px 4px 8px rgba(0, 0, 0, 0.2);
    transform: translateY(-2px);
    /* Uniesienie karty na hover */
  }
}

/* Stylizacja tytułu karty */
mat-card-title {
  font-size: 1.5rem;
  font-weight: bold;
  text-align: center;
  color: #3f51b5;
  margin: 1rem 1rem;
}

/* Stylizacja treści (składników) */
mat-card-content {
  p {
    font-size: 1rem;
    color: #333;
    margin: 0.75rem 0;
    line-height: 1.6;
  }

  strong {
    color: #3f51b5;
  }
}

/* Stylizacja przycisków */
mat-card-actions {
  margin: 10px;
  display: flex;
  justify-content: space-between;

  button {
    font-size: 1rem;
  }

  /* Stylowanie przycisków edycji i powrotu */
  button[color="accent"] {
    background-color: #ff4081;
    color: #ffffff;
  }

  button[color="primary"] {
    background-color: #3f51b5;
    color: #ffffff;
  }

  button[color="primary"]:hover,
  button[color="accent"]:hover {
    filter: brightness(0.9);
    /* Przyciemnia kolor przycisku na hover */
  }
}
```

#### Widok Szczegółów Przepisu RecipeDetailComponent

Przejdź do **recipe-details-component.ts**, gdzie musimy:

- zadbać by ten komponent sam zdobył sobie przepis.
  Podanie go przez Input'a już nie wchodzi w grę.
  To czego będziemy potrzebowali to:
  _ **id** przepisu, weźmiemy go sobie z adresu URL,
  _ serwis **RecipeService**, który dostarczy nam przpis na podstawie **id**
- Podmień klase komponentu

```typescript
export class RecipeDetailComponent implements OnInit {
  recipe: RecipeModel | undefined;

  constructor(private route: ActivatedRoute, private recipeService: RecipeService) {}

  ngOnInit(): void {
    const id = this.route.snapshot.paramMap.get("id");
    if (id) {
      this.recipe = this.recipeService.getRecipeById(+id);
    }
  }
}
```

Podmień listę importów komponentu na **CommonModule, RouterLink, MatCardModule, MatButtonModule**.

##### Zadanie do wykonania

Kompilator po skopiowaniu wcześniejszego kodu, na pewno krzyknie, że brakuje mu implementacji metody **getRecipeById** - napisz ją.

Gdy implementacja jest już gotowa przejdźmy do **recipe-details-component.html**
Podmień kod na

```html
@if (recipe) {
<mat-card>
  <mat-card-title>{{ recipe.title }}</mat-card-title>
  <mat-card-content>
    <p><strong>Składniki:</strong> {{ recipe.ingredients.join(', ') }}</p>
    <p><strong>Opis:</strong> {{ recipe.description }}</p>
  </mat-card-content>
  <mat-card-actions>
    <button mat-button color="accent" [routerLink]="['/recipe/edit', recipe.id]">Edytuj</button>
    <button mat-button color="primary" routerLink="/recipes">Powrót do listy</button>
  </mat-card-actions>
</mat-card>
}
```

Następnie przejdź do **recipe-details-component.scss** podmień style

```css
/* Kontener główny karty, ustawiony na pełną szerokość i wysokość */
:host {
  display: flex;
  justify-content: center; /* Wycentrowanie karty na środku */
  align-items: center;
}
> 
  /* Karta z przepisem */
  mat-card {
  max-width: 600px; /* Maksymalna szerokość karty */
  width: 90%; /* Ustawia szerokość karty do 90% ekranu */
  padding: 2rem;
  box-shadow: 0 4px 12px rgba(0, 0, 0, 0.15); /* Dodanie cienia */
  border-radius: 8px;
  background-color: #ffffff;
  transition: transform 0.3s ease; /* Animacja dla efektu hover */
  > &:hover {
    transform: scale(1.02); /* Delikatne powiększenie na hover */
  }
}
> 
  /* Tytuł przepisu */
  mat-card-title {
  font-size: 1.5rem;
  font-weight: bold;
  text-align: center;
  color: #3f51b5; /* Kolor akcentu */
  margin-bottom: 1rem;
}
> 
  /* Sekcja treści - stylizowanie składników i opisu */
  mat-card-content {
  font-size: 1rem;
  color: #333;
  > p {
    margin: 0.75rem 0;
    line-height: 1.6;
  }
  > strong {
    color: #3f51b5;
  }
}
> 
  /* Stylizacja przycisków akcji */
  mat-card-actions {
  display: flex;
  justify-content: space-between;
  margin-top: 1.5rem;
  > button {
    font-size: 1rem;
    padding: 0.5rem 1.5rem;
  }
  > 
    /* Stylowanie przycisków edycji i powrotu */
    button[color="accent"] {
    background-color: #ff4081;
    color: #ffffff;
  }
  > button[color="primary"] {
    background-color: #3f51b5;
    color: #ffffff;
  }
  > button[color="primary"]:hover,
  button[color="accent"]:hover {
    filter: brightness(0.9); /* Przyciemnia kolor przycisku na hover */
  }
}
```

### Widok edycji/dodania przepisu RecipeReactiveFormComponent

Musimy zadbać by nasz komponent obsługiwał zerówno dodawanie przepisu jak i edycje.
Logikę oprzemy o parametr **id** pochodzący ze ścieżki (route).

Przejdź do **recipe-reactive-form-component.ts**
Wstrzyknijmy do konstruktora zależnośc **Router** oraz **ActivatedRoute**
Następnie edytujmy **ngOnInit** tak by pobierał i ustawiał sobie przepis na podstawie **id** pochodzącego ze ścieżki route.
Zostaje metoda **onSubmit()**, która posłuży nam do zapisania zmian i powrotu do listy przepisów.

```typescript
  onSubmit(): void {
    if (this.recipeFormGroup.valid) {
      const recipe: RecipeModel = this.recipeFormGroup.value; // Zbieramy dane formularza
      if (this.isEditMode) {
        this.recipeService.editRecipe(recipe); // Wysyłanie danych do serwisu w postaci edycji istniejącego przepisu
      } else {
        this.recipeService.addRecipe(recipe); // Wysyłanie danych do serwisu w postaci nowego przepisu
      }
      this.router.navigate(["/recipes"]); // Powrót do listy przepisów
    }
  }
```

##### Zadanie do wykonania

Brakuje nam **id** w modelu który przesyłamy do serwisu.
Gdy już mamy gotową implementacje **recipe-reactive-form.component.ts** podmień w głównej tablicy routingu
**app.routes.ts** gotowy komponent na **recipe-template-form.component** i samodzielnie doprowadź go do analogicznego stanu.

Możesz się zastanawiać co gdy widoki są bardziej skomplikowane - potrzebują dodatkowych danych co spowoduje opóźnienie w wyświetleniu strony.
W takiej sytuacji warto wyświetlić loader (spinner) by użytkownik Naszej aplikacji wiedział, że coś się dzieje.

Dodajmy go zatem - użyjemy gotowego komponentu pochodzącego z dodanej przez Nas wcześniej biblioteki komponentów [Angular Material](https://material.angular.io/components/progress-spinner/overview)

Przejdźmy do **app.component.ts** i zaimportujmy **MatProgressSpinnerModule**

Następnie przejdźmy do **app.component.html** i dodajmy go w widoku pod **<router-outlet></router-outlet>**

Fajnie żeby był na środku strony i trochę odsunięty od headera. Dodajmy potrzebne style.

```css
mat-spinner {
  place-self: center;
  margin-top: 10rem;
}
```

Teraz zostaje nam już tylko logika która wyświetli spinner w odpowiednim momencie jak również go ukryje.
Tu do gry wchodzą eventy pochodzące z routera, które powiedzą nam w jakim stanie jest router naszej aplikacji.

Przejdźmy do **app.component.ts**
Dodaj konstruktor i wstrzyknij **Router**
Dodaj zmienną

```typescript
isLoading: boolean = false;
```

Następnie do ciała konstruktora dodaj

```typescript
  constructor(private router: Router) {
    this.router.events.subscribe((e) => {
      // subskrybujemy się do strumienia events
      if (e instanceof NavigationStart) {
        // sprawdzamy instancje
        this.isLoading = true; // gdy nawigacja startuje chcemy widzieć loader
      }
      if (e instanceof NavigationEnd) {
        this.isLoading = false; // w każdym innym przypadku chcemy go wyłączyć
      }
      if (e instanceof NavigationCancel) {
        this.isLoading = false;
      }
      if (e instanceof NavigationError) {
        this.isLoading = false;
      }
    });
  }
```

Dorzuć blok **@if** do widoku naszego spinnera oraz do naszego **router-outlet**, powinieneś mieć

```html
@if (!isLoading) {
<router-outlet></router-outlet>
} @if (isLoading) {
<mat-spinner></mat-spinner>
}
```

**Zagadka**
Czy domyślasz się dlaczego umieszczamy spinner w tym a nie w innym miejscu?

Gdy wszystko już niemal gotowe - przydałoby się coś co opóźni wyświetlanie którejś ze stron by sprawdzić czy spinner zadziała. Użyjmy **Resolver** a w nim dodamy timmer który opóźni wyświetlenie strony. Zaimplementujmy go więc.

Przejdźmy do terminala, będąc w projekcie wpisz

```bash
  ng generate resolver core/recipe/resolvers/recipe-page
```

Guardy można obsłużyć funkcyjnie, można też poprzez serwis.

Przejdźmy do naszego nowo utworzonego resolvera **recipe-page.resolver.ts**

linijkę z return'em zamień na

```typescript
return of(null) // of() tworzy strumień
  .pipe(
    // pipe pozwala na uzycie operatorów na strumieniu
    debounceTime(5000), // operator: opóźni zwrotkę o 5 sekund
    map(() => true) // operator: zmapuje zwrotkę do wartości true
  );
```

Dodaj potrzebne importy.

O strumieniach porozmawiamy sobie później, na razie nie przejmuj się, jeżeli nie rozumiesz kodu.

Przejdźmy teraz do **app.routes.ts** i dodajmy nasz resolver do routa który obsługuje dodanie nowego przepisu

```typescript
  {
   path: 'recipe/add',
   component: RecipeReactiveFormComponent,
   resolve: { recipePageResolver }
  },
```

##### Podsumowanie Modułu:

W tym module:

Mieliśmy okazję poznać czym jest Angular Router oraz podstawowe zasady działania.

- Utworzyliśmy RecipeReactiveFormComponent, który obsługuje widok dodawania i edytowania przepisów za pomocą Reactive Forms.
- Dodaliśmy logikę umożliwiającą dynamiczne zarządzanie listą składników.
- Stworzyliśmy przyjazny dla użytkownika widok formularza z intuicyjną walidacją pól.
- Użyliśmy Angular Material do stylizacji formularzy, co wzmacnia spójność i wygląd aplikacji.
- W oparciu o Event'y Router'a dodaliśmy spinner oraz logikę decydującą o momencie jego wyświetlenia
