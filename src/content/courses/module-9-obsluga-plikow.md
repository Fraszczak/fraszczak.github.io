---
title: Moduł 9
author: pf
publishDate: 2025-03-09
slug: module-9-obsluga-plikow
description: "<b>Obsługa plików i zdjęć</b><br> W tym module skupimy się na dodaniu funkcjonalności obsługi zdjęć do formularzy. Użytkownicy będą mogli dodawać zdjęcia do formularzy, a następnie będą one wyświetlane w aplikacji. Dzięki temu Twoja aplikacja stanie się bardziej interaktywna i przyjazna dla użytkownika."
prev: module-8-filtrowanie-i-wyszukiwanie
tags:
  - Angular
---

## Obsługa plików i zdjęć

_Dodawanie możliwości wgrania zdjęcia do przepisu._
_Podgląd zdjęć dla każdego przepisu w szczegółowym widoku przepisu._

### Dodanie pola image do modelu RecipeModel

Zakładamy, że chcielibyśmy, by zdjęcia były częścią formularza, dlatego:
Przejdź do **recipe.model.ts**

Dodaj pole

```typescript
image?: string; // URL lub ścieżka do zdjęcia przepisu
```

### Aktualizacja formularza przepisu

Przejdź do **recipe-reactive-form.ts**
Dodaj pole do modelu formularza

```typescript
this.recipeFormGroup = this.fb.group({
  title: ["", [Validators.required, Validators.minLength(3)]],
  description: ["", Validators.required],
  ingredients: [[], Validators.required],
  preparationTime: ["", Validators.required],
  difficulty: ["", Validators.required],
  imageBase64: [""], // nowe pole na obraz
});
```

Dodaj metodę do obsługi wczytywania pliku

```typescript
  // Obsługa wczytania pliku
onFileSelected(event: Event): void {
  const file = (event.target as HTMLInputElement).files?.[0];
  if (file) {
    const reader = new FileReader();
    reader.onload = () => {
      this.recipeFormGroup.patchValue({ imageBase64: reader.result as string });
    };
    reader.readAsDataURL(file);
  }
}
```

Następnie przejdź do **recipe-reactive-form.html** i dodaj jako ostatnie pole formularza

```html
<!-- Image -->
<div class="file-upload-field">
  <label for="image">Zdjęcie przepisu</label>
  <input type="file" id="image" (change)="onFileSelected($event)" />
</div>
`
```

Przydałoby się jeszcze trochę ostylować nasze nowe pole, dlatego przejdź do **recipe-reactive-form.scss** i dodaj

```css
.file-upload-field {
  display: flex;
  flex-direction: column;
  margin-bottom: 16px;

  label {
    font-size: 14px;
    color: #616161;
    margin-bottom: 8px;
  }

  input[type="file"] {
    cursor: pointer;
    padding: 8px;
    border: 1px solid #ccc;
    border-radius: 4px;
  }
}
```

Pięknie, jesteśmy w stanie dodać i przyjąć zdjęcie. Pora je wyświetlić.

## Modyfikacja komponentu recipe-detail.component

Przejdź do widoku komponentu i dodaj na jako pierwszy element taga `<mat-card-content>`

```html
@if (recipe.imageBase64) {
<div class="recipe-image">
  <img [src]="recipe.imageBase64" alt="Zdjęcie przepisu" />
</div>
}
```

Następnie przejdź do pliku ze stylami i dodaj

```css
.recipe-image {
  place-self: center;

  img {
    width: 100%;
    max-width: 300px;
    border-radius: 8px;
    margin-bottom: 16px;
  }
}
```

Dzięki temu, przechodząc do szczegółów przepisu, jesteśmy w stanie zobaczyć opis i zdjęcie dania.
Dobrze byłoby widzieć zdjęcia też jako elementy strony głownej, z listą przepisów, może tylko w delikatnie mniejszym wydaniu.

## Modyfikacja komponentu recipe-list.component

Przejdź do widoku komponentu i dodaj jako pierwszy element taga `<mat-card-content>`

```html
@if (recipe.imageBase64) {
<div class="recipe-image">
  <img [src]="recipe.imageBase64" alt="Zdjęcie przepisu" />
</div>
}
```

Następnie przejdź do pliku ze stylami i dodaj

```css
.recipe-image {
  place-self: center;

  img {
    width: 100%;
    max-width: 150px;
    border-radius: 8px;
    margin-bottom: 16px;
  }
}
```

Teraz w przeglądarce zobaczysz listę przepisów kulinarnych oraz będziesz mógł podejrzeć ich szczegóły a wszystkiemu będą towarzyszyć zdjęcia jakie możesz dodać! 🎉

> _Dla chętnych_
>
> - Dodaj obsługę zdjęć przez komponent **RecipeTemplateFormComponent**

#### Podsumowanie Modułu

- Dodaliśmy funkcjonalność obsługi zdjęć przez nasz formularz
- Dodaliśmy wyświetlanie dodanych zdjęć
