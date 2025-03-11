---
title: Moduł 1
author: pf
publishDate: 2025-03-09
slug: module-1-wprowadzenie-do-Angulara
description: "<b>Wprowadzenie do Angulara</b><br> W tym module poznasz podstawy Angulara. Zainstalujemy Angular CLI, stworzymy pierwszy projekt i nauczymy się, jak budować proste komponenty, na przykład listę przepisów."
next: module-2-komponenty
tags:
  - Angular
---

## Wprowadzenie do Angulara

### Instalacja Angular CLI

W terminalu wykonaj polecenie:

```bash
  npm install -g @angular/cli@18
```

> _Komenda npm install -g instaluje pakiet globalnie, co oznacza, że Angular CLI będzie dostępny z każdego katalogu na twoim komputerze. CLI to skrót od "Command Line Interface". Na końcu dodaliśmy @18 by zainstalować dokładnie tę wersje._

Aby sprawdzić czy instalacja się powiodła, możesz wpisać

```bash
  ng version
```

Jeśli zobaczysz wersję Angular CLI, oznacza to, że narzędzie zostało zainstalowane prawidłowo.

### Stworzenie projektu

```bash
  ng new recipe-manager
```

Komenda ng new tworzy nowy projekt Angulara o nazwie recipe-manager.

> Angular CLI poprosi o kilka konfiguracji
>
> - wybierz **SCSS** jako preprocesor CSS
> - potwierdź **dodanie Routingu**.

### Instalacja zależności

Po stworzeniu projektu, przejdźmy do jego lokalizacji w terminalu:

```bash
  cd recipe-manager
```

Następnie zainstalujmy zależności:

```bash
  npm install
```

> Komenda npm install pobiera i instaluje wszystkie wymagane paczki, które są zapisane w pliku **package.json** – są to biblioteki i narzędzia potrzebne do działania projektu.
> Zainstalowane paczki trafią do folderu **/node-modules**

### Uruchom serwer deweloperski

W terminalu, będąc w lokalizacji projektu wykonaj:

```bash
  ng serve
```

> Komenda **ng serve** skompiluje aplikację i uruchamia serwer lokalny, dzięki czemu możesz testować aplikację na swoim lokalnym sprzęcie.

Otwórz przeglądarkę i przejdź do adresu: **http://localhost:4200**

Aplikacja będzie działać lokalnie na twoim komputerze pod domyślnym adresem localhost na porcie 4200. Teraz zobaczysz domyślną stronę startową Angulara.

Projekt defaultowo będzie dostępny pod adresem **http://localhost:4200**
**package.json** zawiera sekcje **scripts**, **ng serve** jest tam zdefiniowany jako **start**
Żeby użyć takiego skryptu wykonaj polecenie

```bash
  npm run start
```

> Możesz dowolnie definiować własne skrypty, skrypty mogą zawierać flagi

#### Teraz omówimy strukturę plików, które zostały wygenerowane po utworzeniu projektu.

| Plik                  |                                                                                       Opis                                                                                        |
| --------------------- | :-------------------------------------------------------------------------------------------------------------------------------------------------------------------------------: |
| **angular.json**      |                           Jest to główny plik konfiguracyjny Angulara. Zawiera ustawienia dotyczące budowania, testowania oraz uruchamiania aplikacji.                            |
| **package.json**      |          Zawiera listę zależności projektu oraz skrypty do zarządzania aplikacją. Znajdziesz tu m.in. informację o tym, jaką wersję Angulara i innych bibliotek używasz.          |
| **package-lock.json** | Zabezpiecza konkretne wersje zależności, które zostały zainstalowane przez npm. Dzięki temu wszyscy deweloperzy pracujący nad projektem będą używać tych samych wersji bibliotek. |
| **tsconfig.\*.json**  |                   Plik konfiguracyjny dla TypeScript. Angular opiera się na TypeScript, więc tutaj znajdziesz ustawienia dotyczące kompilacji kodu TypeScript.                    |
| **src/index.html**    |                                                     To główny plik HTML aplikacji. Angular wstawia tutaj wygenerowane widoki.                                                     |
| **src/main.ts**       |                                           Punkt wejścia dla aplikacji Angular. Tutaj Angular inicjalizuje moduły i uruchamia aplikację.                                           |
| **src/styles.scss**   |                                               Główny plik stylów dla aplikacji, w formacie SCSS. Możesz tutaj dodać globalne style.                                               |
| **src/app/**          |                                     To najważniejszy folder, ponieważ tutaj będą znajdować się moduły, komponenty i serwisy twojej aplikacji.                                     |

### Dlaczego projekt nie zawiera żadnego modułu?

Przed v17 podczas tworzenia projektu, Angular automatycznie wygenerowałby podstawowy element, AppModule. Znalazłbyś go w pliku:
**src/app/app.module.ts.**

Po v17 podstawowym elementem jest to standalone komponent **src/app/app.component.ts.**

> Taki komponent w gruncie rzeczy pełni obie funkcje na raz, Angular pod spodem i tak stworzy sobie moduł dla takiego komponentu.
> Więcej o standalone komponentach powiemy sobie w dalszej części materiału.

### Tworzenie pierwszego komponentu: wyświetlanie listy przepisów kulinarnych.

#### Na początek chciałbym żebyśmy trochę posprzątali:

1. Usuń zawartość szablonu w komponencie **app.component**.
2. Wyczyść tablice importowanych zależności komponentu. Znajdziesz ją wewnątrz dekoratora **@Component**. (metadane)
3. Usuń też test **should render title** z **app.component.spec.ts**

#### Będąc w folderze projektu, w terminalu wpisz

```bash
  ng generate component recipe-list
```

> Komenda **ng generate component** automatycznie wygeneruje strukturę nowego komponentu w folderze **src/app/recipe-list/**.

Otwórz plik **src/app/recipe-list/recipe-list.component.ts**. Znajdziesz tam domyślną klasę komponentu:

Dodaj zmienną recipes, przypisz do zmiennej tablice, która zawiera 3 obiekty, kazdy obiekt powinien zawierać dwie "propercje" **title** oraz **description**. Każda jest typu string i zawiera przykładowy tekst.

```json
recipes = [
    {
    title: 'Spaghetti Carbonara',
    description: 'Klasyczne włoskie danie.'
    },
    {
      title: 'Pancakes',
      description: 'Puszyste naleśniki z miodem.'
    },
    {
      title: 'Tacos',
      description: 'Meksykańskie tacos z wołowiną i pieprzem.'
    }
  ];
```

Otwórz plik **src/app/recipe-list/recipe-list.component.html** a następnie, dodaj kod HTML do wyświetlania listy przepisów:

W znaczniku **h2** zawrzyj tekst **"Lista Przepisów"**

Użyj znaczników **ul** oraz **li** do wyświetlenia listy.
Przeiteruj się po tablicy za pomocą bloku **@for**
Za pomocą znacznika **h3** wyświetl tytuł a za pomocą znacznika **p** wyświetl opis produktu.

```html
<h2>Lista Przepisów</h2>
<ul>
  @for (recipe of recipes; track recipe) {
  <li>
    <h3>{{ recipe.title }}</h3>
    <p>{{ recipe.description }}</p>
  </li>
  }
</ul>
```

> Użyliśmy bloku **@for**, który iteruje po tablicy recipes i generuje elementy listy na podstawie danych.

> W Angularze **{{ recipe.title }}** i **{{ recipe.description }}** to przykład tzw. interpolacji.

1. Otwórz plik **src/app/app.component.ts** a następnie,
   zaimporuj stworzony komponent poprzez dodanie **RecipeListComponent** do listy importów.
2. Teraz otwórz plik **src/app/app.component.html**, a następnie
   dodaj tag _(selector)_ komponentu **recipe-list**, aby wyświetlić go na stronie głównej

```html
<app-recipe-list></app-recipe-list>
```

> Angular identyfikuje komponent **RecipeListComponent** dzięki jego selectorowi: **app-recipe-list**
> Możemy go używać jako tagu HTML, aby wyświetlić zawartość komponentu.

Zapisz wszystkie zmiany i uruchom ponownie serwer, jeśli został zatrzymany

```bash
  ng serve
```

Teraz w przeglądarce zobaczysz listę przepisów kulinarnych! 🎉

## Podsumowanie:

W tym module:

- Zainstalowaliśmy Angular CLI i stworzyliśmy projekt.
- Zrozumieliśmy strukturę projektu Angular.
- Stworzyliśmy pierwszy komponent wyświetlający listę przepisów.
