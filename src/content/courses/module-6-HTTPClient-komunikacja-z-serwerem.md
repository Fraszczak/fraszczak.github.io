---
title: Moduł 6
author: pf
publishDate: 2025-03-09
slug: module-6-HTTPClient-komunikacja-z-serwerem
description: "<b>HTTP Client – komunikacja z serwerem</b><br> W tym module nauczysz się integrować Angulara z backendem. Zainstalujemy i skonfigurujemy JSON-server jako lokalny serwer do symulacji bazy danych. Następnie skonfigurujemy HttpClient i zaktualizujemy RecipeService, aby mógł komunikować się z serwerem za pomocą żądań HTTP. Nauczysz się wykorzystywać metody get, post, put i delete do pobierania, dodawania, aktualizowania i usuwania przepisów."
next: module-7-dyrektywy-pipes
prev: module-5-routing-i-nawigacja
tags:
  - Angular
---

## HTTP Client – komunikacja z serwerem

_Pobieranie przepisów z API: wprowadzenie do komunikacji z backendem._
_Wysyłanie żądań HTTP do serwera (np. zapisywanie, aktualizowanie i usuwanie przepisów)._
_Użycie JSON-server jako lokalnego backendu do symulacji rzeczywistej bazy danych._

### Instalacja JSON-server

Zaczniemy od stworzenia swojego lokalnego serwera, który posłuży za nasz backend.
W prawdziwych projektach używa się tego typu rozwiązać by uniknąć problemów gdy API jest niedostępne.

W terminalu, będąc w projekcie wykonaj [json-server](https://www.npmjs.com/package/json-server)

```bash
npm install json-server --save-dev
```

Następne stwórzmy folder a w nim plik `fake-api/db.json`

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

Przejdź do **package.json** i dodaj w sekcji **scripts**

```json
  "fake-api": "json-server --watch fake-api/db.json --port 3000"
```

Serwer uruchomisz wykonując polecenie w terminalu

```bash
npm run fake-api
```

## Dostosowanie metody GET w serwisie RecipeService

Zastosowanie HttpClient'a pozwala aplikacjom Angular na efektywną wymianę danych z serwerem, co jest kluczowe w przypadku aplikacji typu SPA (Single Page Application).

Zacznijmy od podania **provideHttpClient()** w pliku głównym konfiguracji naszej aplikacji **app.config.ts**.
Natępnie przejdźmy do **recipe-service.ts**
Będąc w serwisie wstrzyknijmy **HttpClient**.
To on dostarczy nam metody CRUD których użyjemy do komunikacji z backendem.

```typescript
constructor(private httpClient: HttpClient) {}
```

Będziemy potrzebowali URL pod który mamy uderzać po dane.
Normalnie w projekcie mielibyśmy plik konfiguracyjny, ale na potrzeby naszego projektu zdefiniujmy zmienną

```typescript
baseUrl = "http://localhost:3000"; // Zmienna zawiera defaultowy url dla json-server'a.
```

Następnie edytujmy kod naszej metody **getRecipes()**
Obecnie moteda wygląd tak:

```typescript
 getRecipes(): RecipeModel[] {
  return this.recipes;
 }
```

By wykonać zapytanie o dane do backendu użyjemy wcześniej podanego do pliku konfiguracyjnego a nastepnie wstrzykniętego do serwisu HttpClient'a.

```typescript
// Metoda pobierająca wszystkie przepisy asynchronicznie
// W tym celu używa HttpClient, bazuje na strumieniach
getRecipes(): Observable<RecipeModel[]> {
    // w db.json sprawdzisz, że path do danych to właśnie /recipes
      return this.httpClient.get<RecipeModel[]>(`${this.baseUrl}/recipes`)
}
```

## Dostosowanie komponentów używających metody GET z serwisu RecipeService

Przejdź do **recipe-list.component**
W ngOnInit zachodzi inicjalne pobranie i przypisanie przepsiów. Kod wygląda tak

```typescript
ngOnInit(): void {
  this.recipes = this.recipeService.getRecipes();
}
```

Metoda **getRecipes** zwraca strumień danych. By pobrać z niego dane, musimy się do niego zasubskrybować.
Przypisanie metody jak dotąd nie wchodzi w grę, musimy użyć operatora **pipe**, a nastepnie **tap** pochądzących z biblioteki RxJS.
Wewnątrz operatora **tap** dokonamy przypisania wartości do zmiennej **recipes**

```typescript
  ngOnInit(): void {
    // metoda zwraca strumień, za pomocą operatora pipe jesteśmy w stanie wykonać dodatkowe operacje na danych które w nim "płyną"
    this.recipeService
      .getRecipes()
      .pipe(
        // operator tap służy do wykonania działań na danych, ale bez wpływu na zwracany model
        tap((recipesFromGetRecipesMethod: RecipeModel[]) => {
          //przypisanie modelu do zmiennej
          this.recipes = recipesFromGetRecipesMethod;
        })
        // gdy wykonamy metodę subscribe() strumień zwróci nam dane gdy tylko będą dostępne
      )
      .subscribe();
  }
```

Gdy już inicjalne przypisanie modelu danych mamy za sobą pora dostosować metodę **onDeleteRecipe**, ta też korzysta z serwisu.
Jednak zanim do tego przejdziemy, wcześniej musimy dostosować metodę w serwisie.

## Dostosowanie metody DELETE w serwisie RecipeService

Przejdźmy do **RecipeService** a następnie odnajdźmy metodę **deleteRecipe**. Obecnie kod wygląda tak:

```typescript
     // Metoda usuwająca przepis
     deleteRecipe(id: number): void {
        this.recipes = this.recipes.filter(r => r.id !== id);
     }
```

By pobrać dane z serwera, musimy użyć instancji **HttpClient**. Model zwracanych danych też się zmieni, domyślasz się już pewnie,
że będzie to strumień.

```typescript
  // Metoda usuwająca przepis
  deleteRecipe(id: number): Observable<void> {
    return this.httpClient.delete<void>(`${this.baseUrl}/recipes/${id}`)
  }
```

## Dostosowanie komponentów używających metody DELETE z serwisu RecipeService

Przejdź do **recipe-list.component**

Następnie odnajdź metodę **onDeleteRecipe(id: number | undefined)**, na ten moment kod wygląda tak:

```typescript
  onDeleteRecipe(id: number | undefined): void {
     if (id) {
        this.recipeService.deleteRecipe(id);  // Usuwanie przepisu
        this.recipes = this.recipeService.getRecipes();  // Odśwież listę
      }
  }
```

Domyślasz się już pewnie że, samo wywołanie metody teraz nic nie da, gdyż metoda z serwisu zwraca teraz strumień.
Musimy się zasubskrybować.
Po usunięciu musimy odświeżyć model przepisów dla komponentów. Mamy już gotową logikę w **ngOnInit**
Warto byłoby wynieść ją do osobnej metody którą wywołamy tu i w **ngOnInit**

Stwórzmy metodę **private getRecipes(): void** do niej przenieśmy logikę z **ngOnInit**

W metodzie **ngOnInit** wywołajmy świeżo utworzoną metodę **getRecipes**.

Następnie po subskrybcji do **deleteRecipe** wywołajmy metodę **getRecipes** by odświeżyć model zawierający przepisy.

## Przerób resztę metod serwisu RecipeService, tak by dane były pobierane z naszego fake-api poprzez HttpClient.

```typescript
//...
export class RecipeService {
  baseUrl = "http://localhost:3000";

  constructor(private httpClient: HttpClient) {}

  // Metoda pobierająca wszystkie przepisy asynchronicznie
  // W tym celu używa HttpClient, bazuje na strumieniach
  getRecipes(): Observable<RecipeModel[]> {
    // w db.json sprawdzisz, że path do danych to właśnie /recipes
    return this.httpClient.get<RecipeModel[]>(`${this.baseUrl}/recipes`);
  }

  // Metoda pobierająca przepis po id asynchronicznie
  // W tym celu używa HttpClient, bazuje na strumieniach
  getRecipeById(id: number): Observable<RecipeModel | undefined> {
    return this.httpClient.get<RecipeModel>(`${this.baseUrl}/recipes/${id}`);
  }

  // Metoda usuwająca przepis asynchronicznie
  deleteRecipe(id: number): Observable<void> {
    return this.httpClient.delete<void>(`${this.baseUrl}/recipes/${id}`);
  }

  // Metoda dodająca nowy przepis asynchronicznie
  // Jako zwrotkę, otrzymamy nowo dodany element
  addRecipe(recipe: RecipeModel): Observable<RecipeModel> {
    return this.httpClient.post<RecipeModel>(`${this.baseUrl}/recipes`, recipe);
  }

  // Metoda edytująca istniejący przepis asynchronicznie
  // Jako zwrotkę, otrzymamy edytowany element
  editRecipe(updatedRecipe: RecipeModel): Observable<RecipeModel> {
    return this.httpClient.put<RecipeModel>(`${this.baseUrl}/recipes/${updatedRecipe.id}`, updatedRecipe);
  }

  // Metoda pobierająca wszystkie popularne składniki
  getPopularIngredients(): Observable<string[]> {
    return this.httpClient.get<{ popularIngredients: string[] }>(`${this.baseUrl}/ingredients`).pipe(map((result) => result.popularIngredients));
  }
}
```

W tym module:

- Zainstalowaliśmy i skonfigurowaliśmy JSON-server jako lokalny backend do symulacji rzeczywistej bazy danych.
- Skonfigurowaliśmy HttpClient i przelobiliśmy serwis RecipeService, który teraz umożliwia wysyłanie żądań HTTP do serwera.
- Wykorzystaliśmy metody get, post, put oraz delete z HttpClient do pobierania, dodawania, aktualizowania i usuwania przepisów.
