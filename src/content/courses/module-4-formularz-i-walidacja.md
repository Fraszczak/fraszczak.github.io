---
title: Moduł 4
author: pf
publishDate: 2025-03-09
slug: module-4-formularz-i-walidacja
description: "<b>Formularze i walidacja - Dodawanie oraz edytowanie przepisów</b><br> W tym module zagłębimy się w świat formularzy w Angularze. Poznasz zalety i wady obu podejść: prostych Template-Driven Forms oraz bardziej zaawansowanych Reactive Forms. Nauczysz się, kiedy stosować każde z nich, a także dowiesz się, jak wykorzystać biblioteki komponentów UI, takie jak Angular Material, aby ułatwić i przyspieszyć tworzenie interfejsów użytkownika."
next: module-5-routing-i-nawigacja
prev: module-3-serwisy-i-zarzadzanie-danymi
tags:
  - Angular
---

## Formularze i walidacja - Dodawanie oraz edytowanie przepisów

_W tym module nauczymy się, jak tworzyć formularze w Angularze z użyciem dwóch podejść:_

- _Template-driven Forms (formularze oparte na szablonach)_
- _Reactive Forms (formularze reaktywne)_
  _Zbudujemy formularz umożliwiający dodawanie i edytowanie przepisów kulinarnych, z walidacją pól. Na głównej stronie umieścimy przycisk, który będzie pokazywał i ukrywał formularz. Na koniec omówimy walidację formularzy, np. wymagana nazwa przepisu i minimalna liczba składników._

### Template-driven Forms\*\*

Zacznijmy od utworzenia komponentu, który będzie odpowiedzialny za formularz dodawania i edytowania przepisu.
W terminalu w katalogu projektu utwórz nowy komponent

```bash
    ng generate component ui/recipe-template-form
```

> To polecenie utworzy pliki:
>
> - **recipe-template-form.component.ts**
> - **recipe-template-form.component.html**
> - **recipe-template-form.component.scss**

Do komponentu zaimportujmy **CommonModule**.
Następnie przejdźmy do implementacji logiki która pozwoli nam na pokazanie oraz ukrycie komponentu.

Przejdź do **recipe-template-form.component.ts**, dodaj tam zmienną **showForm: boolean = false** - zmienna posłuży jako swojego rodzaju stan, odniesienie do tego czy widzimy komponent czy nie.

W komponencie zdefiniuj metodę **toggleForm(): void** - ta ma manipulować stanem **showForm**

```typescript
{
  this.showForm = !this.showForm;
}
```

Przejdźmy do **recipe-template-form.component.html**
Dodajmy tam początkową formę kodu widoku naszego komponentu

```html
@if (showForm) {
<div>
  <h2>Dodaj nowy przepis</h2>
</div>
}
```

Przejdzmy do komponentu głownego **app.component** i dodajmy nasz nowo utworzony komponent.

Zaimportujmy **RecipeTemplateFormComponent**
Przejdźmy do **app.component.html**, a następnie dodajmy poniższy kod

```html
<button (click)="recipeTemplateForm.toggleForm()">{{ recipeTemplateForm.showForm ? 'Ukryj formularz' : 'Dodaj nowy przepis' }}</button>`
<!-- Dodaj formularz do komponentu -->
<app-recipe-template-form #recipeTemplateForm></app-recipe-template-form>
```

> **#recipeTemplateForm** to zmienna (template variable) dzięki niej możemy się dostać do instancji klasy komponentu i bezpośrednio odwołać się do metody zdefiniowanej w ramach komponentu.

Mamy już mechanikę ukrywania i pokazywania komponentu z formularzem którego użyjemy przy dodawaniu nowych przepisów, teraz dodajmy formularz
Do listy importów w **recipe-template-form.component.ts** dorzuć **FormModule**, to moduł który zawiera wszystkie podstawowe zasoby potrzebne do obsługi formularza opartego na szablonach.

Kod potrzebny do stworzenia widoku. Komentarze zawierają opis potrzebny do zrozumienia wykorzystanych mechanizmów.

```html
@if (showForm) {
<div>
  <!-- Nagłówek który wykorzystuje Conditional (ternary) operator do wyświetlania odpowiedniego tekstu-->
  <h2>{{ isEditMode ? 'Edytuj przepis' : 'Dodaj nowy przepis' }}</h2>

  <!-- znacznik (tag) form z dołączoną template variable i przypisaną ngForm, dzięki tego zostanie stworzona nadrzędna instancja grupy kontrolek formularza-->
  <!-- jest też dorzucona obsługa mechanizmu potwierdzania formularza -->
  <!-- Na końcu widzimy artybut novalidate, Angular w ten sposób wyłącza defaultową, natywną walidacje formularza pochodzącą z natywneg formularza HTML ... -->
  <form #recipeForm="ngForm" (ngSubmit)="onSubmit(recipeForm)" novalidate>
    <!-- Tytuł -->
    <div>
      <!-- tytuł inputa, dyrektywa for oraz nam służy do połączenia taga label z tagiem input -->
      <label for="title">Tytuł przepisu:</label>
      <!-- type określa typ danych które będą wprowadzane do inputa -->
      <!-- required oraz minlength to walidatory natywnie zdefiniowane w formularzu HTML, które dorzycają mechanizm walidacji pod kątem wymagalności i długości wprowadonych danych -->
      <!-- #title to template variable, przypisujemy do niej ngModel, dzięki temu zostanie stworzona instancja kontrolki formularza Angular - FormControl -->
      <input type="text" name="title" ngModel required minlength="3" #title="ngModel" />
      <!-- Poniższy kontener to ta treść którą zobaczymy gdy kontrolka będzie błędna oraz już dotknięta przez użytkownika -->
      @if (title.invalid && title.touched) {
      <div>
        <!-- Tę treść zobaczymy gdy użytkownik dotknie kontrolki ale nie wprowadzi żadnych danych, lub gdy usunie wszystko co zawierała kontrolka i zostawi puste - wymagane (required) -->
        @if (title.errors?.required) {
        <small>Tytuł jest wymagany</small>
        }
        <!-- Tę treść zobaczymy gdy użytkonik wprowadzi tekst ktrótszy niż wymagany (3 znaki) -->
        @if (title.errors?.minlength) {
        <small>Tytuł musi mieć co najmniej 3 znaki</small>
        }
      </div>
      }
    </div>

    <!-- Opis -->
    <div>
      <label for="description">Opis przepisu:</label>
      <textarea name="description" ngModel></textarea>
    </div>

    <!-- Składniki -->
    <div>
      <label for="ingredients">Składniki (minimum 2):</label>
      <input type="text" name="ingredients" ngModel required #ingredients="ngModel" />
      @if (ingredients.invalid && ingredients.touched) { @if (ingredients.errors?.required) {
      <small>Składniki są wymagane</small>
      } }
    </div>

    <!-- Przycisk wysyłający -->
    <button type="submit" [disabled]="recipeForm.invalid">{{ isEditMode ? 'Zapisz zmiany' : 'Dodaj przepis' }}</button>
  </form>
</div>
}
```

Gdy dodasz kod szablonu, kompilator poimformuje Cię o blądach, rozwiążesz je dodając logikę komponentu

```typescript
export class RecipeTemplateFormComponent implements OnInit {
  // Normalnie moglibyśmy nie pisać tutaj typu bo po co
  // Robimy to explicite  w celach dydaktycznych
  showForm: boolean = false;

  // wartość wejściowa komponentu która odpowie na pytanie czy dodajemy nowy przepis czy edytujemy już istniejący.
  @Input() isEditMode = false;
  // Jeżeli edytujemy, to potrzebujemy przepis, po to jest ta wartość wejściowa (opcjonalna)
  @Input() currentRecipe: RecipeModel | null = null;

  // Dzięki konstruktorowi wstzrzykniemy zależność (zasób) RecipeService
  constructor(private recipeService: RecipeService) {}

  // onInit life cycle hook przyda się gdy będziemy przygotowywać logikę edycji przepisu
  ngOnInit(): void {
    if (this.currentRecipe) {
      // Jeśli edytujemy, wypełnij formularz danymi przepisu
    }
  }

  // Metoda do pokazania/ukrycia formularza
  toggleForm(): void {
    this.showForm = !this.showForm;
  }

  // Metoda do zatwierdzenia zmian (submit) formularza
  onSubmit(form: NgForm): void {
    // chcemy zmienić / dodać przepis jedynie gdy formularz nie zawiera błędów
    if (form.valid) {
      // tworzymy instancje przepisu (RecipeModel)
      const newRecipe: RecipeModel = {
        id: this.isEditMode ? this.currentRecipe!.id : Date.now(), //id musi być unikalny
        title: form.value.title,
        description: form.value.description,
        ingredients: form.value.ingredients.split(","),
        preparationTime: 30, // na razie nie mamy kontrolki, dodajemy predefiniowaną wartość
        difficulty: "easy", // na razie nie mamy kontrolki, dodajemy predefiniowaną wartość
      };

      // Serwis zawiera osobne metody na dodanie i edycje przepisu dlatego
      if (this.isEditMode) {
        this.recipeService.editRecipe(newRecipe);
      } else {
        this.recipeService.addRecipe(newRecipe);
      }

      // Gdy już wszystkie czynności wymagane do dodania lub edycji przepisu są wykonane, musimy zresetować formularz i ukryć komponent
      form.reset();
      this.showForm = false;
    }
  }
}
```

#### Teraz w przeglądarce zobaczysz przycisk dodaj nowy przepis, a po kliknięciu zobaczysz komponent odpowiedzialny za dodanie przepisu! 🎉

##### Zadanie do wykonania

- Dodaj kontrolki do obsługi poziomu trudności wykonania oraz czas przygotowania dania z przepisu.

## Reactive Forms

Zacznijmy od utworzenia komponentu, który będzie odpowiedzialny za formularz dodawania i edytowania przepisu.
W terminalu w katalogu projektu utwórz nowy komponent

```bash
    ng generate component ui/recipe-reactive-form
```

> To polecenie utworzy pliki:
>
> - recipe-reactive-form.component.ts
> - recipe-reactive-form.component.html
> - recipe-reactive-form.component.scss

Przejdź do **recipe-reactive-form.component.ts**

Zaimporuj **CommonModule**
Dodaj zmienną **showForm: boolean = false**
Zdefiniuj metodę

```typescript
    toggleForm(): void {
        this.showForm = !this.showForm;
    }
```

Przejdźmy do **recipe-reactive-form.component.html**
Dodajmy tam początkową formę kodu widoku naszego komponentu

```html
@if (showForm) {
<div>
  <h2>Dodaj nowy przepis</h2>
</div>
}
```

Logikę odpowiedzialną za wyświetlenie oraz ukrycie już mamy.
Przejdźmy do **app.component.html** i podmieńmy tagi komponentów

```html
<!-- ... -->

<!-- <app-recipe-template-form #recipeReactiveForm></app-recipe-template-form> -->
<app-recipe-reactive-form #recipeReactiveForm></app-recipe-reactive-form>
```

Następnie przejdźmy do **app.component.ts** i zaimportujmy nasz nowy komponent

Teraz dodajmy formularz do listy importów w **app-recipe-reactive-form.component.ts** dorzuć **ReactiveFormModule**, moduł potrzebny do pełnej obsługi formularzy Angular opartych na modelu.

Kod potrzebny do stworzenia widoku.

```html
@if (showForm) {
<div>
  <h2>{{ isEditMode ? 'Edytuj przepis' : 'Dodaj nowy przepis' }}</h2>

  <form [formGroup]="recipeFormGroup" (ngSubmit)="onSubmit()" novalidate>
    <!-- Tytuł -->
    <div>
      <label for="title">Tytuł przepisu:</label>
      <input type="text" formControlName="title" />
      @if (recipeFormGroup.get('title')?.invalid && recipeFormGroup.get('title')?.touched) { @if (recipeFormGroup.get('title')?.errors?.required) {
      <small>Tytuł jest wymagany</small>
      } @if (recipeFormGroup.get('title')?.errors?.minlength) {
      <small>Tytuł musi mieć co najmniej 3 znaki</small>
      } }
    </div>

    <!-- Składniki -->
    <div>
      <label for="ingredients">Składniki (minimum 2):</label>
      <input type="text" formControlName="ingredients" />
      @if (recipeFormGroup.get('ingredients')?.invalid && recipeFormGroup.get('ingredients')?.touched) { @if (recipeFormGroup.get('ingredients')?.errors?.required) {
      <small>Składniki są wymagane</small>
      } }
    </div>

    <button type="submit" [disabled]="recipeFormGroup.invalid">{{ isEditMode ? 'Zapisz zmiany' : 'Dodaj przepis' }}</button>
  </form>
</div>
}
```

Gdy dodasz kod szablonu, kompilator poimformuje Cię o blądach.
By je rozwiązać dodaj logikę komponentu

```typescript
export class RecipeReactiveFormComponent implements OnInit {
  @Input() isEditMode = false;
  @Input() currentRecipe: RecipeModel | null = null;

  showForm = false;
  recipeFormGroup!: FormGroup;

  // wstrzykujemy FormBuildera, to dzięki niemu będziemy w stanie zbudować reactive forms
  constructor(private fb: FormBuilder, private recipeService: RecipeService) {}

  // definiujemy nasza formGroup dzięki FormBuilder'owi, zauważ że na tym poziomie defiuniujesz strukturę, wartośc początkową, walidatory i tak dalej.
  ngOnInit(): void {
    this.recipeFormGroup = this.fb.group({
      title: ["", [Validators.required, Validators.minLength(3)]],
      description: ["", Validators.required],
      ingredients: ["", Validators.required],
    });

    // metoda patchValue inteligętnie podmienia wartości kontrolek podanych jako wartość wejściowa funkcji
    if (this.currentRecipe) {
      this.recipeFormGroup.patchValue(this.currentRecipe);
    }
  }

  toggleForm(): void {
    this.showForm = !this.showForm;
  }

  onSubmit(): void {
    if (this.recipeFormGroup.valid) {
      const newRecipe: RecipeModel = {
        id: this.isEditMode ? this.currentRecipe!.id : Date.now(),
        ...this.recipeFormGroup.value, // ta linijka tworzy 'shadow copy' obecnych wartości formularza i je tu wrzuca, dzięki temu nie musimy ich deklarować ręcznie jeżeli się nie zmianiają, nie są mapowane, parsowane itp.
        ingredients: this.recipeFormGroup.value.ingredients.split(","), // metoda pomocnicza split(',') znajduje w ciągu znaków ',' i na tej podstawie rozdziela ciąg na części
        preparationTime: 30,
        difficulty: "easy",
      };

      if (this.isEditMode) {
        this.recipeService.editRecipe(newRecipe);
      } else {
        this.recipeService.addRecipe(newRecipe);
      }

      this.recipeFormGroup.reset();
      this.showForm = false;
    }
  }
}
```

#### Teraz w przeglądarce zobaczysz przycisk dodaj nowy przepis, a po kliknięciu zobaczysz komponent odpowiedzialny za dodanie przepisu! 🎉

##### Zadanie do wykonania

- Dodaj kontrolki do obsługi poziomu trudności wykonania oraz czas przygotowania dania z przepisu.

## Angular Material

_Instalacja Angular Material, Angular CDK oraz Angular Animations_
_Jeżeli masz bieżące nie "zakomitowane" zmiany, musisz je "zakomitować" teraz._

W terminalu przejdź do lokalizacji swojego projektu i uruchom polecenie

```bash
ng add @angular/material
```

> Po wykonaniu powyższego polecenia, Angular Material poprosi o wybór opcji, które zainstalują style, czcionki i animacje dla projektu:
>
> - **Theme**: Wybierz **Azure/Blue**
> - **Global Typography Styles**: Wybierz **Yes**.
> - **Animations**: Wybierz **Yes** (dzięki temu animacje Angular Material będą działały poprawnie).

**Po wykonaniu tego polecenia część plików została edytowana.**

### Użycie komponentów UI pochodzących z biblioteki Angular Material

Po instalacji zaszły pewne zmiany w projekcie, m.in dostaliśmy predefiniowany zestaw styli globalnych.
Przejdźmy teraz do pliku **styles.scss** i podmieńmy kod

```css
// /* You can add global styles to this file, and also import other style files */
html,
body {
  height: 100%;
}
body {
  margin: 0 auto;
  max-width: 1200px;
  font-family: Roboto, "Helvetica Neue", sans-serif;
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

Dodając bibliotekę zaznaczyliśmy że chcemy korzystać z animacji, a więc przejdźmy do ustawień głównych aplikacji **app.config.ts** i upewnijmy się że na liście provide jest **provideAnimationsAsync()**

Przejdźmy teraz do obecnie używanego komponentu dodawania i edytowania przepisów **app-recipe-reactive-form.component.ts** i dodajmy do listy importów **MatFormFieldModule, MatInputModule, MatButtonModule, MatSelectModule**

Gdy już importy mamy ograne, czas na edycje widoku. Przejdź do **app-recipe-reactive-form.component.html** i podmień kod pliku na

```html
@if (showForm) {
<div>
  <h2>{{ isEditMode ? 'Edytuj przepis' : 'Dodaj nowy przepis' }}</h2>

  <form [formGroup]="recipeFormGroup" (ngSubmit)="onSubmit()" class="reactive-form" novalidate>
    <!-- Tytuł -->
    <div>
      <mat-form-field class="form-control-full-width">
        <mat-label>Tytuł przepisu</mat-label>
        <input matInput type="text" formControlName="title" />
        @if (recipeFormGroup.get('title')?.hasError('required')){
        <mat-error> Tytuł jest wymagany </mat-error>
        } @if (recipeFormGroup.get('title')?.hasError('minlength')) {
        <mat-error> Tytuł musi mieć co najmniej 3 znaki </mat-error>
        }
      </mat-form-field>
    </div>

    <!-- Opis -->
    <div>
      <mat-form-field class="form-control-full-width">
        <mat-label>Opis: </mat-label>
        <textarea matInput cdkTextareaAutosize #autosize="cdkTextareaAutosize" cdkAutosizeMinRows="1" cdkAutosizeMaxRows="5" type="text" formControlName="description"></textarea>
        @if (recipeFormGroup.get('description')?.errors?.required) {
        <mat-error>Składniki są wymagane </mat-error>
        }
      </mat-form-field>
    </div>

    <!-- Składniki -->
    <div>
      <mat-form-field class="form-control-full-width">
        <mat-label>Składniki (minimum 2):</mat-label>
        <textarea matInput cdkTextareaAutosize #autosize="cdkTextareaAutosize" cdkAutosizeMinRows="1" cdkAutosizeMaxRows="5" type="text" formControlName="ingredients"></textarea>
        @if (recipeFormGroup.get('ingredients')?.errors?.required) {
        <mat-error> Składniki są wymagane </mat-error>
        }
      </mat-form-field>
    </div>

    <!-- Poziom trudności -->
    <div>
      <mat-form-field class="form-control-full-width">
        <mat-label>Poziom trudności wykonania :</mat-label>
        <select matNativeControl required formControlName="difficulty">
          <option value="hard">hard</option>
          <option value="medium">medium</option>
          <option value="easy">easy</option>
        </select>
      </mat-form-field>
    </div>

    <!-- Czas przygotowania -->
    <div>
      <mat-form-field class="form-control-full-width">
        <mat-label>Czas wykonania (w minutach):</mat-label>
        <input matInput type="text" formControlName="preparationTime" />
        @if (recipeFormGroup.get('preparationTime')?.errors?.required) {
        <mat-error> Czas wykonania jest wymagany </mat-error>
        }
      </mat-form-field>
    </div>

    <button mat-raised-button color="primary" type="submit" [disabled]="recipeFormGroup.invalid">{{ isEditMode ? 'Zapisz zmiany' : 'Dodaj przepis' }}</button>
  </form>
</div>
}
```

Dorzućmy style do `app-recipe-reactive-form.component.scss` by trochę wyrównać nasze kontenery na kontrolki jak i sam formularz

```css
.reactive-form {
  min-width: 150px;
  max-width: 500px;
  width: 100%;
}

.form-control-full-width {
  width: 100%;
}
```

##### Zadanie do wykonania

- Kontrolka składników jest obsługiwana przez textarea, fajnie byłoby gdyby użytkownik nie musiał wpisywać ich z palca a mógł wybrać z listy wielokrotnego wyboru.
  Zaimplementuj to w oparciu o `https://material.angular.io/components/select/overview#multiple-selection`
  Dorzućmy też wyświetlanie składników po wyborze przepisu.
  Potrzebna będzie lista składników by móc po niej iterować, przykładowa

```typescript
// Lista popularnych składników
popularIngredients: string[] = [
  'Tomatoes', 'Onions', 'Garlic', 'Potatoes', 'Carrots', 'Olive oil', 'Butter',
  'Chicken', 'Beef', 'Pork', 'Salt', 'Pepper', 'Paprika', 'Basil', 'Parsley',
  'Oregano', 'Lemon', 'Sugar', 'Flour', 'Eggs', 'Milk', 'Cheese', 'Cream',
  'Bread', 'Rice', 'Pasta', 'Beans', 'Lettuce', 'Spinach', 'Broccoli', 'Mushrooms',
  'Fish', 'Shrimp', 'Soy sauce', 'Vinegar', 'Honey', 'Peppers', 'Zucchini', 'Cucumber',
  'Corn', 'Chili powder'
];
```

##### Zadanie dodatkowe

_ Przerób komponent `recipe-template-form` tak by używał Angular Material komponentów UI
_ Przerób reszte komponentów, tak by używały Angular Material komponentów UI

## Podsumowanie Modułu:

Mieliśmy okazję poznać oba sposoby na tworzenie formularzy w Angularze.

- Template-Driven Forms są prostsze do wdrożenia, ale mniej elastyczne. Świetnie sprawdzają się w małych formularzach.
- Reactive Forms dają większą kontrolę nad logiką formularza, są bardziej złożone, ale umożliwiają skomplikowaną walidację i łatwą integrację z innymi częściami aplikacji.
- Dowiedzieliśmy się czym są biblioteki komponentów UI i jak ich użyć w projekcie na przykładzie Angular Material
