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

**Moduł 5: Routing i nawigacja**
* Routing: tworzenie wielostronicowej aplikacji.
* Dodanie widoków dla różnych części aplikacji, takich jak: lista przepisów, szczegóły przepisu, formularz dodawania/edycji przepisu.
* Widok szczegółowy przepisu: wyświetlanie składników i instrukcji po kliknięciu na dany przepis.
  
_Moduł 5 jest ważnym krokiem w zrozumieniu, jak organizować wielostronicową aplikację w Angularze za pomocą routingu, co pozwala użytkownikom przemieszczać się między różnymi sekcjami aplikacji._
_W ramach tego modułu dowiemy się, jak ustawić routing dla listy przepisów, widoku szczegółowego oraz formularza dodawania/edycji przepisów._


1. Konfiguracja Angular Router
  Angular Router umożliwia nawigację między widokami w aplikacji. Najpierw zainstalujemy podstawową konfigurację routingu w głównym module aplikacji.

   * Przejdź do `app.config.ts` i upewnij się że masz `provideRouter(routes)` w liście providers.
   * Przejdź do `app.routes.ts` i zdefiuniuj tablice routingu tak by zawierała:
     * trasy do widoków listy przepisów,
     * szczegółów przepisu,
     * widoku dodania / edycji przepisu. 
     * Powinna też zawierać przekierowanie do komponentu listy dla pustych tras.
   Widok edycji i szczegółów przepisu powinna zawierać parametr **id** by móc określić o jaki przepis chodzi.
   Kod znajdziesz w `component-code.ts` - krok 1.

2. Tworzenie Linków do Nawigacji Między Widokami
   Teraz utworzymy header naszej aplikacji a w nim menu z linkami, które umożliwią użytkownikowi nawigację po aplikacji.

    * Przejdź do `app.component.html` i zastąp obecny kod tym z `template-code.html` - krok 1
    * Następnie przejdź do `app.component.ts` i pozbądź się niepotrzebnego kodu:
        > `selectedRecipe: RecipeModel | null = null;`
        >
        > `onRecipeSelected(recipe: RecipeModel | null) {`
        > `  this.selectedRecipe = recipe;`
        > `}`
    * Przejdź teraz do `app.component.scss` i podmień zawartość na style z pliku `component-style.scss` krok 2.
    * Pozbądź się też zaimportowanych, nie używanych zależności z listy imports oraz dodaj `RouterOutlet, RouterLink`


**Tworzenie Widoków dla Każdej Ścieżki**
Teraz utworzymy widoki, które użytkownik zobaczy korzystająć z nawigacji po aplikacji

3. Widok Listy Przepisów (RecipeListComponent)
  * Otwórz `recipe-list.component.html` i upewnij się, że każdy przepis ma link, który prowadzi do widoku szczegółowego.
    * Dodajmy przycisk "Zobacz szczegóły".
      Kod znajdziesz w pliku `template-code.html` - krok 3.
  * Przejdź do `recipe-list.component.ts`, a następnie:
    * pozbądź się metody `onRecipeClick()` gdyż nie jest już potrzebna
    * dodaj `MatButtonModule` do listy import 
  * Przejdź do `recipe-list.component.scss`, a następnie:
    * dodaj style z pliku `component-style.scss` - krok 3

4. Widok Szczegółów Przepisu (RecipeDetailComponent)
   * Przejdź do `recipe-details-component.ts`, gdzie musimy:
    * zadbać by ten komponent sam zdobył sobie przepis. 
        Podanie go przez Input'a już nie wchodzi w grę.
        To czego będziemy potrzebowali to:
          * **id** przepisu, weźmiemy go sobie z adresu URL,
          * serwis `RecipeService`, który dostarczy nam przpis na podstawie **id**
    * Podmień klase komponentu na tę z pliku `component-code.ts` - krok 4
    * Podmień listę importów komponentu na `CommonModule, RouterLink, MatCardModule, MatButtonModule`.

**Zadanie do wykonania:**
  * Kompilator po skopiowaniu wcześniejszego kodu, na pewno krzyknie, że brakuje mu implementacji metody `getRecipeById` - napisz ją.

  Gdy implementacja `getRecipeById` jest już gotowa:
   * przejdźmy do `recipe-details-component.html` a następnie:
     * musimy go trochę dostosować. Podmień kod na ten z `template-code.html` krok 4
   * Następnie przejdź do `recipe-details-component.scss` i:
     * podmień style na te z `component-style.scss` - krok 4

5. Widok edycji/dodania przepisu (RecipeReactiveFormComponent)
  Musimy zadbać by nasz komponent obsługiwał zerówno dodawanie przepisu jak i edycje.
  Logikę oprzemy o parametr id pochodzący ze ścieżki (route).

  * Przejdź do `recipe-reactive-form-component.ts`.
    * Wstrzyknijmy do konstruktora zależnośc  `Router` oraz `ActivatedRoute`
    * Następnie edytujmy ngOnInit tak by pobierał i ustawiał sobie przepis na podstawie **id** pochodzącego ze ścieżki route.
    * Zostaje metoda `onSubmit()`, która posłuży nam do zapisania zmian i powrotu do listy przepisów.
    > `onSubmit(): void {`
    > `  if (this.recipeFormGroup.valid) {`
    > `    const recipe: RecipeModel = this.recipeFormGroup.value; // Zbieramy dane formularza`
    > `    if (this.isEditMode) {`
    > `      this.recipeService.editRecipe(recipe) // Wysyłanie danych do serwisu w postaci edycji istniejącego przepisu`
    > `    } else {`
    > `    this.recipeService.addRecipe(recipe); // Wysyłanie danych do serwisu w postaci nowego przepisu`
    > `    }`
    > 
    > `    this.router.navigate(['/recipes']); // Powrót do listy przepisów`
    > `  }`
    > `}`


**Zadanie do wykonania:**
  * Brakuje nam **id** w modelu który przesyłamy do serwisu.
  * Gdy już mamy gotową implementacje `recipe-reactive-form.component.ts` podmień w głównej tablicy routingu
    `app.routes.ts` gotowy komponent na `recipe-template-form.component` i samodzielnie doprowadź go do analogicznego stanu.



6. Możesz się zastanawiać co gdy widoki są bardziej skomplikowane - potrzebują dodatkowych danych co spowoduje opóźnienie w wyświetleniu strony.
   W takiej sytuacji warto wyświetlić loader (spinner) by użytkownik Naszej aplikacji wiedział, że coś się dzieje. Dodajmy go zatem - użyjemy gotowego komponentu pochodzącego z dodanej przez Nas wcześniej biblioteki komponentów Angular Material (https://material.angular.io/components/progress-spinner/overview)
  * Przejdźmy do `app.component.ts` i zaimportujmy `MatProgressSpinnerModule`
  * Następnie przejdźmy do `app.component.html` i dodajmy go w widoku pod `<router-outlet></router-outlet>`
  * Fajnie żeby był na środku strony i trochę odsunięty od headera. Dodajmy potrzebne style.
    > `mat-spinner {`
    > `place-self: center;`
    > `margin-top: 10rem;`
    > `}`
  * Teraz zostaje nam już tylko logika która wyświetli spinner w odpowiednim momencie jak również go ukryje.
    Tu do gry wchodzą eventy pochodzące z routera, które powiedzą nam w jakim stanie jest router naszej aplikacji.
      * Przejdźmy do `app.component.ts`
      * Dodaj konstruktor i wstrzyknij `Router`.
      * Dodaj zmienną `isLoading: boolean = false`
      * Następnie do ciała konstruktora dodaj
        > `constructor(private router: Router) {`
        > `  this.router.events.subscribe(e => { // subskrybujemy się do strumienia events`
        > `    if (e instanceof NavigationStart) { // sprawdzamy instancje`
        > `      this.isLoading = true // gdy nawigacja startuje chcemy widzieć loader`
        > `    }`
        > `    if (e instanceof NavigationEnd) {`
        > `      this.isLoading = false // w każdym innym przypadku chcemy go wyłączyć`
        > `    }`
        > `    if (e instanceof NavigationCancel) {`
        > `      this.isLoading = false`
        > `    }`
        > `    if (e instanceof NavigationError) {`
        > `      this.isLoading = false`
        > `    }`
        > `  })`
        > `}`
      * Dorzuć blok `@if` do widoku naszego spinnera oraz do naszego `router-outlet`, powinieneś mieć
        > `@if (!isLoading) {`
        > `  <router-outlet></router-outlet>`
        > `}`
        > `@if (isLoading) {`
        > `  <mat-spinner></mat-spinner>`
        > `}`

**Zagadka**
   Czy domyślasz się dlaczego umieszczamy spinner w tym a nie w innym miejscu?



  * Gdy wszystko już niemal gotowe - przydałoby się coś co opóźni wyświetlanie którejś ze stron by sprawdzić czy spinner zadziała. Użyjmy `Resolver` a w nim dodamy timmer który opóźni wyświetlenie strony. Zaimplementujmy go więc.
    * Przejdźmy do terminala, będąc w projekcie wpisz `ng generate resolver core/recipe/resolvers/recipe-page`
      Guardy można obsłużyć funkcyjnie, można też poprzez serwis.
    * Przejdźmy do naszego nowo utworzonego resolvera `recipe-page.resolver.ts`
    * linijkę z return'em zamień na
    >  `return of(null).pipe( // of() tworzy strumień`
    >  `  debounceTime(5000), // opóźni zwrotkę o 5 sekund`
    >  `  map(() => true) // zmapuje zwrotkę do wartości true`
    >  `);`
    * Dodaj potrzebne importy. O strumieniach porozmawiamy sobie później, na razie nie przejmuj się, jeżeli nie rozumiesz kodu.
    * Przejdźmy teraz do `app.routes.ts` i dodajmy nasz resolver do routa który obsługuje dodanie nowego przepisu
      > `{ path: 'recipe/add', component: RecipeReactiveFormComponent, resolve: { recipePageResolver } },`

##### Podsumowanie Modułu:
W tym module:

Mieliśmy okazję poznać czym jest Angular Router oraz podstawowe zasady działania.
* Utworzyliśmy RecipeReactiveFormComponent, który obsługuje widok dodawania i edytowania przepisów za pomocą Reactive Forms.
* Dodaliśmy logikę umożliwiającą dynamiczne zarządzanie listą składników.
* Stworzyliśmy przyjazny dla użytkownika widok formularza z intuicyjną walidacją pól.
* Użyliśmy Angular Material do stylizacji formularzy, co wzmacnia spójność i wygląd aplikacji.
* W oparciu o Event'y Router'a dodaliśmy spinner oraz logikę decydującą o momencie jego wyświetlenia
