---
title: "Architektura systemów"
author: pf
publishDate: 2025-03-18
slug: 2025-03-18-system-architecture
description: "<b>Podsumowanie najważniejszych aspektów architektury systemów</b><br>
  Architektura systemów stanowi fundamentalny aspekt tworzenia solidnych, skalowalnych i łatwych w utrzymaniu systemów oprogramowania. Definiuje ona strukturę i organizację  komponentów systemu, ich wzajemne relacje oraz zasady i wytyczne rządzące ich projektowaniem i ewolucją."
coverImage: /images/posts/system-architecture.png
tags:
  - system architecture
  - workshops
---

## TL;DR

Artykuł omawia kluczowe aspekty architektury systemów, takie jak projektowanie API, wzorce integracji, modularność i wzorce architektoniczne. Podkreśla znaczenie prostoty, skalowalności i bezpieczeństwa w projektowaniu systemów.

## Wprowadzenie

_Architektura systemów stanowi fundamentalny aspekt tworzenia solidnych, skalowalnych i łatwych w utrzymaniu systemów oprogramowania. Definiuje ona strukturę i organizację komponentów systemu, ich wzajemne relacje oraz zasady i wytyczne rządzące ich projektowaniem i ewolucją. Niniejszy artykuł ma na celu podsumowanie kluczowych zagadnień z zakresu architektury systemów, które zostały omówione podczas szkolenia poświęconego tej tematyce, wzbogacone o dodatkowe materiały pochodzace z internetu._

Zakres tego opracowania obejmuje cztery główne obszary, które są kluczowe dla zrozumienia nowoczesnych systemów oprogramowania.

- Pierwszym z nich jest projektowanie efektywnych interfejsów programowania aplikacji (API), które stanowią podstawę komunikacji między różnymi komponentami systemów rozproszonych.
- Drugim obszarem są wzorce integracji, które opisują sprawdzone sposoby łączenia ze sobą różnorodnych systemów i aplikacji w środowiskach korporacyjnych.
- Trzecim ważnym aspektem jest modularność, czyli strategia dzielenia systemów na mniejsze, niezależne i wymienne moduły, co przyczynia się do zwiększenia ich elastyczności i skalowalności.
- Ostatnim omawianym obszarem są powszechne wzorce architektoniczne, które stanowią gotowe schematy organizacyjne dla systemów oprogramowania, oferując sprawdzone rozwiązania dla typowych problemów projektowych.

Zrozumienie tych czterech obszarów jest niezwykle istotne we współczesnym świecie tworzenia oprogramowania. Wzajemnie połączona natura dzisiejszych systemów wymaga solidnej wiedzy na temat tych podstawowych koncepcji architektonicznych. Zaniedbanie któregokolwiek z tych aspektów może prowadzić do poważnych wyzwań w procesie rozwoju, wdrażania i utrzymania oprogramowania. Interfejsy API umożliwiają interakcję między usługami, tworząc kręgosłup systemów rozproszonych. Bez odpowiedniego projektowania API, te interakcje mogą stać się kruche i nieefektywne. Wzorce integracji odpowiadają na realia, w których większość systemów korporacyjnych składa się z różnorodnych, często starszych komponentów, które muszą ze sobą współpracować. Modularność jest niezbędna do zarządzania złożonością, szczególnie w aplikacjach na dużą skalę, umożliwiając niezależny rozwój i skalowanie. Wreszcie, zrozumienie wzorców architektonicznych zapewnia fundament sprawdzonych rozwiązań typowych problemów projektowych, zapobiegając ponownemu wynajdywaniu koła i promując najlepsze praktyki.

## Projektowanie efektywnych API

_Interfejs programowania aplikacji (API) to protokół umożliwiający komunikację między dwoma lub więcej komponentami oprogramowania. API upraszczają tworzenie aplikacji poprzez udostępnianie abstrakcyjnych interfejsów i ukrywanie szczegółów implementacji. Projektowanie API polega na określeniu punktów końcowych (endpointów), formatów żądań i odpowiedzi, protokołów oraz standardów, które umożliwiają płynną komunikację między API a jego konsumentami._

### Kluczowe koncepcje w projektowaniu API

Podstawowymi elementami interakcji z API są punkty końcowe, żądania i odpowiedzi. Punkty końcowe reprezentują specyficzne zasoby lub funkcje udostępniane przez API. Klienci wysyłają żądania do tych punktów końcowych, a serwer API odpowiada, przesyłając dane lub potwierdzenie wykonania operacji. Istotne jest stosowanie standardowych protokołów, takich jak HTTP, oraz powszechnie akceptowanych formatów danych, takich jak JSON. Większość aplikacji chmurowych przyjęła REST jako preferowane podejście do przesyłania danych za pośrednictwem żądań API. JSON jest często preferowany ze względu na swoją lekkość, elastyczność i czytelność dla ludzi. Standaryzacja protokołów i formatów danych zapewnia interoperacyjność między różnymi systemami, niezależnie od ich bazowych technologii, co zmniejsza tarcie w komunikacji i promuje bardziej połączony ekosystem.

Dobrze zaprojektowane API powinny być proste i przejrzyste dla programistów. Obejmuje to stosowanie opisowych i spójnych konwencji nazewnictwa dla punktów końcowych, akcji i parametrów. Konsekwencja w projektowaniu API nie dotyczy tylko estetyki, ale tworzy przewidywalne i intuicyjne doświadczenie dla programistów. Oznacza to zachowanie spójnych konwencji nazewnictwa, struktur URL i formatów danych w całym API. API powinno sprawiać wrażenie, jakby zostało zaprojektowane przez jedną osobę z jasną wizją, a nie przez komitet z różnymi pomysłami. Każda niespójność stanowi niewielkie obciążenie poznawcze dla konsumentów API. Dobrze zaprojektowane API stawia na pierwszym miejscu doświadczenie użytkownika, zapewniając, że programiści mogą łatwo zrozumieć funkcjonalności i sposób użycia API. Dbałość o szczegóły jest tutaj kluczowa. Wybieranie jasnych i spójnych nazw dla punktów końcowych API, akcji i parametrów zwiększa użyteczność i przejrzystość. Używanie rzeczowników dla punktów końcowych zasobów, dokładnych czasowników dla metod oraz przestrzeganie standardowych konwencji nazewnictwa w branży jest istotne. Utrzymywanie spójnych nazw w całym API pomaga programistom w szybkim zrozumieniu jego funkcjonalności.

API powinny być również elastyczne, aby obsługiwać różnorodne przypadki użycia i umożliwiać przyszłą rozbudowę bez naruszania istniejących integracji. Projektowanie z myślą o przyszłości oznacza skupienie się na rozwiązywaniu bieżących problemów przy jednoczesnym pozostawieniu miejsca na przyszłą rozbudowę. Oznacza to projektowanie zasobów i punktów końcowych w sposób rozszerzalny. Zamiast sztywno kodować określone pola w odpowiedziach, warto rozważyć użycie bardziej elastycznej struktury, aby łatwo dodawać nowe właściwości. Taka struktura pozwala na łatwe dodawanie nowych właściwości użytkownika w przyszłości bez przerywania istniejących integracji.

Kluczową rolę odgrywa kompleksowa dokumentacja, która wspiera programistów w zrozumieniu i korzystaniu z API. Nawet najlepiej zaprojektowane API jest nieskuteczne bez jasnej i kompleksowej dokumentacji. Dokumentacja służy jako podstawowy przewodnik dla programistów, umożliwiając im zrozumienie możliwości API i sposobu interakcji z nim. Narzędzia takie jak OpenAPI/Swagger mogą pomóc w tworzeniu interaktywnej dokumentacji.

Silne środki bezpieczeństwa są niezbędne do ochrony danych przed nieautoryzowanym dostępem. Bezpieczeństwo jest najważniejsze w projektowaniu API, szczególnie w przypadku pracy z danymi wrażliwymi. Solidne środki bezpieczeństwa budują zaufanie i zapobiegają potencjalnym naruszeniom i nadużyciom. Należy wdrożyć mechanizmy uwierzytelniania, takie jak klucze API, OAuth 2.0 i HTTPS.

API powinny zachowywać się w sposób spójny i przewidywalny, aby minimalizować błędy i ułatwiać integrację. Ważna jest również optymalizacja wydajności, aby zapewnić szybkie czasy odpowiedzi i uniknąć nadmiernego zużycia przepustowości sieci. Należy dążyć do utrzymania niewielkich rozmiarów ładunków żądań i odpowiedzi oraz implementować mechanizmy buforowania i kompresji.

Konieczne jest wdrożenie solidnej obsługi błędów, aby zapewnić klientom znaczące informacje zwrotne w przypadku wystąpienia problemów. Należy używać standardowych kodów statusu HTTP i dostarczać jasne komunikaty o błędach. Jasne i informatywne komunikaty o błędach są kluczowe dla programistów, aby szybko diagnozować i naprawiać problemy. Niejasne komunikaty o błędach mogą prowadzić do znacznych opóźnień w rozwiązywaniu problemów. Standardowe kody statusu i szczegółowe komunikaty o błędach dostarczają niezbędnego kontekstu, aby programiści mogli zidentyfikować problem i wdrożyć działania naprawcze.

Ważne jest również planowanie wersji API, aby zarządzać zmianami i zapewnić kompatybilność wsteczną w miarę ewolucji API. W miarę rozwoju API mogą być konieczne zmiany, które mogłyby przerwać działanie istniejących klientów. Wersjonowanie umożliwia wprowadzanie nowych funkcji i modyfikacji bez zmuszania wszystkich klientów do jednoczesnej aktualizacji. Wprowadzając nowe wersje API, programiści mogą nadal wspierać starszych klientów, jednocześnie udostępniając nowe funkcjonalności w najnowszej wersji.

### Zasady projektowania API RESTful

REST (Representational State Transfer) stał się powszechnie przyjętym stylem architektonicznym do projektowania internetowych API. API RESTful wykorzystują protokół HTTP i jego metody (GET, POST, PUT, DELETE) do wykonywania operacji na zasobach.

Projektowanie zorientowane na zasoby polega na skupieniu się na zasobach (rzeczownikach) zamiast na akcjach (czasownikach) w ścieżkach punktów końcowych. Dla kolekcji należy używać rzeczowników w liczbie mnogiej. Podejście zorientowane na zasoby sprawia, że API jest bardziej intuicyjne i dobrze współgra z koncepcją interakcji z encjami danych. Używanie rzeczowników dla punktów końcowych ułatwia zrozumienie i nawigację po API. Zamiast myśleć o wykonywanych akcjach, programiści myślą o zasobach, z którymi chcą interagować. Na przykład zamiast /createUser, punktem końcowym jest /users z metodą POST do utworzenia użytkownika. Jest to zgodne z tym, jak w świecie rzeczywistym wchodzimy w interakcje z obiektami.

Należy właściwie używać metod HTTP, rozumiejąc ich semantyczne znaczenie (GET, POST, PUT, DELETE, PATCH) i ich mapowanie na operacje CRUD. Przestrzeganie zamierzonej semantyki metod HTTP zapewnia, że API zachowuje się zgodnie z oczekiwaniami i jest zgodne ze standardami internetowymi. Ułatwia to programistom zrozumienie celu każdego punktu końcowego. Każda metoda HTTP ma określone znaczenie. Na przykład GET służy do pobierania danych, POST do tworzenia nowych danych, PUT do aktualizacji istniejących danych, a DELETE do usuwania danych. Prawidłowe używanie tych metod sprawia, że API jest bardziej przewidywalne i łatwiejsze w użyciu.

REST charakteryzuje się również bezstanowością, gdzie każde żądanie od klienta do serwera musi zawierać wszystkie informacje potrzebne do jego zrozumienia. Bezstanowość poprawia skalowalność i niezawodność, zmniejszając odpowiedzialność serwera za utrzymywanie informacji o sesji klienta. Każde żądanie może być obsługiwane niezależnie przez dowolną dostępną instancję serwera. Gdyby serwer musiał pamiętać stan każdej interakcji z klientem, stałby się bardziej złożony i trudniejszy do skalowania. Bezstanowość upraszcza implementację po stronie serwera i umożliwia łatwiejsze rozdzielanie żądań między wieloma serwerami.

### Podejście API-First

Podejście API-First polega na projektowaniu API przed implementacją backendu. Podkreśla się, że API jest produktem samym w sobie. Podejście API-First zachęca do wczesnego skupienia się na użytkowniku (programiście) API w procesie rozwoju, co prowadzi do lepiej zaprojektowanych i bardziej użytecznych API. Projektując najpierw kontrakt API, zespoły programistyczne mogą uzgodnić funkcjonalności i struktury danych przed napisaniem jakiegokolwiek kodu. Promuje to lepszą komunikację i zmniejsza prawdopodobieństwo przeróbek w późniejszej fazie cyklu rozwoju.

## Bezproblemowa integracja: Łączenie różnorodnych komponentów

_Integracja systemów jest kluczowa w nowoczesnych środowiskach korporacyjnych, gdzie różne aplikacje i systemy muszą ze sobą współpracować. Istnieje kilka kluczowych wzorców integracji, które opisują typowe sposoby łączenia systemów._

### Powszechne wzorce integracji

Integracja punkt-punkt to bezpośrednie połączenie między dwoma systemami. Jest prosta w implementacji dla niewielkiej liczby integracji, ale może prowadzić do silnego sprzężenia i złożoności wraz ze wzrostem liczby systemów. Każde bezpośrednie połączenie wprowadza zależność między dwoma systemami. Wraz ze wzrostem liczby systemów połączonych w ten sposób, sieć zależności staje się coraz bardziej skomplikowana, utrudniając zrozumienie całego systemu i wprowadzając wysokie ryzyko kaskadowych awarii przy wprowadzaniu zmian w jednym systemie.

Integracja typu gwiazda (hub-and-spoke) wykorzystuje centralny węzeł do mediacji komunikacji między wieloma systemami. Zmniejsza złożoność w porównaniu z integracją punkt-punkt. Model typu gwiazda centralizuje logikę integracji, ułatwiając zarządzanie i monitorowanie integracji. Jednakże centralny węzeł może stać się wąskim gardłem lub pojedynczym punktem awarii. Kierując całą komunikację przez centralny węzeł, zmniejsza się złożoność bezpośrednich połączeń między poszczególnymi systemami. Jednak wydajność i dostępność całego ekosystemu integracji stają się zależne od centralnego węzła.

Wzorzec publikuj-subskrybuj (pub/sub) odsprzęga producentów wiadomości od konsumentów za pomocą brokera wiadomości. Umożliwia komunikację typu jeden-do-wielu. Pub/Sub zwiększa skalowalność i odporność, umożliwiając systemom komunikację asynchroniczną bez bezpośrednich zależności. Umożliwia to niezależne skalowanie i zmniejsza wpływ awarii w jednym systemie na inne. Wydawcy nie muszą wiedzieć, kim są subskrybenci, a subskrybenci nie muszą wiedzieć, kim są wydawcy. To luźne sprzężenie umożliwia dodawanie lub usuwanie systemów bez wpływu na podstawowy przepływ komunikacji. Asynchroniczna natura zapewnia, że awaria subskrybenta niekoniecznie uniemożliwia wydawcy kontynuowanie działania.

Integracja z brokerem wiadomości wykorzystuje dedykowane pośrednictwo (broker wiadomości) w celu niezawodnego dostarczania i transformacji wiadomości. Promuje odsprzężenie i odporność. Brokerzy wiadomości zapewniają funkcje takie jak kolejkowanie wiadomości, routing i transformacja, zapewniając niezawodne i uporządkowane dostarczanie wiadomości między systemami. Jest to kluczowe dla utrzymania spójności danych i integralności systemu. Brokerzy wiadomości działają jako centralny punkt zarządzania przepływem wiadomości, zapewniając gwarancje dotyczące dostarczania wiadomości i obsługując różne protokoły komunikacyjne. To odciąża poszczególne aplikacje od tych obowiązków, upraszczając ich projekt i poprawiając ogólną niezawodność systemu.

Wzorzec API Gateway działa jako pojedynczy punkt wejścia dla wszystkich żądań klientów do usług backendowych. Jest przydatny w architekturach mikroserwisów do zarządzania i zabezpieczania API. Bramka API upraszcza interakcje klientów, zapewniając jednolity interfejs do wielu usług backendowych. Może również obsługiwać wspólne zadania, takie jak uwierzytelnianie, ograniczanie przepustowości i rejestrowanie żądań. Jednakże, jeśli nie zostanie starannie zaprojektowana, może stać się pojedynczym punktem awarii. Zamiast tego, aby klienci musieli znać adresy wielu indywidualnych usług, wchodzą w interakcje tylko z bramką API. Bramka następnie kieruje żądania do odpowiednich usług. Upraszcza to logikę po stronie klienta i umożliwia scentralizowane zarządzanie dostępem do API i bezpieczeństwem.

Enterprise Service Bus (ESB) to komponent middleware ułatwiający komunikację i transformację między aplikacjami. Często stosowany w architekturze SOA. ESB zapewnia scentralizowaną platformę do integracji różnorodnych aplikacji, obsługując routing wiadomości, transformację danych i konwersję protokołów. Jednakże może stać się złożony i stanowić potencjalne wąskie gardło. ESB działa jako centralny układ nerwowy przedsiębiorstwa, umożliwiając różnym aplikacjom bezproblemową komunikację i wymianę danych. Obsługuje złożoność różnych formatów danych i protokołów komunikacyjnych, pozwalając aplikacjom skupić się na ich podstawowej logice biznesowej.

Architektura oparta na zdarzeniach (Event-Driven Architecture - EDA) polega na komunikacji komponentów za pomocą asynchronicznych zdarzeń. Promuje luźne sprzężenie i przetwarzanie w czasie rzeczywistym. EDA umożliwia wysoce skalowalne i responsywne systemy, w których komponenty mogą reagować na zdarzenia niemal w czasie rzeczywistym. Jest to szczególnie odpowiednie dla aplikacji ze złożonymi przepływami pracy i potrzebą asynchronicznego przetwarzania. Jednak debugowanie i zapewnienie kolejności zdarzeń może być trudne. Zamiast bezpośrednich żądań i odpowiedzi, systemy w EDA emitują zdarzenia, gdy coś znaczącego się dzieje. Inne zainteresowane systemy mogą subskrybować te zdarzenia i odpowiednio reagować. Ta asynchroniczna natura pozwala systemom działać niezależnie i obsługiwać duże ilości zdarzeń.

### Wzorce integracji danych

Warto również wspomnieć o wzorcach integracji danych, takich jak ETL (Extract, Transform, Load - Wyodrębnij, Przekształć, Załaduj) i ELT (Extract, Load, Transform - Wyodrębnij, Załaduj, Przekształć), które służą do przenoszenia i transformowania danych między systemami. Wybór między ETL a ELT zależy od czynników takich jak wolumen danych, wymagania dotyczące przetwarzania i możliwości systemu docelowego. ETL jest tradycyjnie stosowany w hurtowniach danych, natomiast ELT zyskuje popularność w przypadku jezior danych. ETL polega na przekształcaniu danych przed załadowaniem ich do systemu docelowego, co może poprawić jakość danych i wydajność w przypadku obciążeń analitycznych. ELT najpierw ładuje surowe dane i wykonuje transformacje w systemie docelowym, oferując większą elastyczność w obsłudze różnorodnych typów danych i dużych wolumenów.

### Wybór właściwego wzorca integracji

Wybierając wzorzec integracji, kluczowe jest przeanalizowanie wymagań biznesowych oraz uwzględnienie skalowalności, elastyczności i bezpieczeństwa.

## Strategiczna modularność: Budowanie z myślą o elastyczności i skali

_Modularność to praktyka dzielenia systemu na mniejsze, niezależne i wymienne moduły. Podkreśla się tu koncepcję rozdzielenia odpowiedzialności. Modularność jest fundamentalną zasadą zarządzania złożonością dużych systemów oprogramowania. Dzieląc system na mniejsze, samodzielne jednostki, staje się on łatwiejszy do zrozumienia, rozwijania, testowania i utrzymania._

### Korzyści ze strategicznej modularności

Przyjęcie modularnego podejścia przynosi wiele korzyści. Poprawia czytelność i łatwość utrzymania, ułatwiając zrozumienie, naprawianie i aktualizowanie poszczególnych modułów bez wpływu na cały system. Izolując funkcjonalności w modułach, programiści mogą skupić się na określonych obszarach kodu, co ułatwia zrozumienie logiki i zmniejsza ryzyko wprowadzenia niezamierzonych skutków ubocznych przy dokonywaniu zmian.

Modularność zwiększa skalowalność, umożliwiając niezależny rozwój, testowanie i wdrażanie modułów, a także skalowanie określonych części aplikacji w zależności od zapotrzebowania. W systemie modularnym, jeśli określona funkcja lub usługa doświadcza dużego zapotrzebowania, skalowaniu podlega tylko moduł odpowiedzialny za tę funkcjonalność, a nie cała aplikacja. Prowadzi to do bardziej efektywnego wykorzystania zasobów i oszczędności kosztów.

Dobrze zaprojektowane moduły mogą być często ponownie wykorzystywane w różnych częściach aplikacji, a nawet w innych projektach. Tworzenie modułów wielokrotnego użytku zmniejsza duplikację kodu i promuje spójność w całej aplikacji. Prowadzi to do bardziej efektywnego procesu rozwoju i łatwiejszej w utrzymaniu bazy kodu.

Różne zespoły mogą pracować nad różnymi modułami jednocześnie, co przyspiesza cykl rozwoju. Dzieląc aplikację na niezależne moduły z dobrze zdefiniowanymi interfejsami, wiele zespołów programistycznych może pracować równolegle, nie ingerując w postęp innych. Znacznie skraca to ogólny czas rozwoju.

Testowanie mniejszych, izolowanych modułów jest znacznie prostsze i bardziej wydajne niż testowanie dużej, monolitycznej aplikacji. Testy jednostkowe mogą koncentrować się na specyficznej funkcjonalności każdego modułu, co prowadzi do bardziej niezawodnego i kompleksowego pokrycia testami.

Modularna architektura ułatwia dostosowywanie się do zmieniających się wymagań i wprowadzanie nowych funkcji. Umożliwia wprowadzanie zmian i dodawanie nowych funkcji do określonych części aplikacji bez konieczności dokonywania znaczących modyfikacji w całym systemie. To sprawia, że aplikacja jest bardziej elastyczna i lepiej dostosowana do zmieniających się potrzeb biznesowych.

Dzięki ponownemu wykorzystaniu kodu, efektywnemu rozwojowi i łatwiejszemu utrzymaniu, modularność może prowadzić do znacznych oszczędności kosztów w dłuższej perspektywie. Ponowne wykorzystanie modułów zmniejsza ilość nowego kodu, który trzeba napisać i przetestować. Równoległy rozwój przyspiesza cały proces rozwoju. Łatwiejsze utrzymanie zmniejsza czas i zasoby potrzebne do naprawiania błędów i wdrażania aktualizacji.

### Strategie strategicznej modularności

Istnieją różne podejścia do identyfikowania i tworzenia modułów. Można organizować moduły według funkcji, grupując powiązane moduły na podstawie funkcjonalności aplikacji. Modularność oparta na funkcjach dopasowuje architekturę oprogramowania do domeny biznesowej, ułatwiając zrozumienie celu każdego modułu i jego wkładu w ogólną aplikację.

Można również dokonać dekompozycji opartej na domenach, dzieląc system na moduły odpowiadające określonym domenom biznesowym. Modularność oparta na domenach zapewnia, że architektura oprogramowania odzwierciedla strukturę biznesową, co prowadzi do bardziej intuicyjnego i łatwiejszego w utrzymaniu systemu.

Inną strategią jest dekompozycja funkcjonalna, polegająca na oddzielaniu modułów na podstawie odrębnych funkcjonalności (np. interfejs użytkownika, logika biznesowa, zarządzanie danymi). Dekompozycja funkcjonalna promuje jasne rozdzielenie odpowiedzialności, ułatwiając niezależne zarządzanie różnymi aspektami aplikacji.

Należy również wydzielić moduły odpowiedzialne za kwestie techniczne, takie jak logowanie, obsługa błędów i bezpieczeństwo. Oddzielenie kwestii technicznych do dedykowanych modułów poprawia organizację kodu i ponowne wykorzystanie tych wspólnych funkcjonalności.

Kluczowe jest zdefiniowanie strategicznie ważnych interfejsów między modułami, aby zapewnić ich efektywną interakcję. Dobrze zdefiniowane interfejsy działają jak kontrakty między modułami, określając sposób ich komunikacji. Umożliwia to niezależny rozwój i ewolucję modułów bez naruszania integralności całego systemu.

### Najlepsze praktyki strategicznej modularności

Należy zdefiniować jasne granice modułów, minimalizować zależności między nimi (niskie sprzężenie), maksymalizować spójność wewnątrz modułów oraz używać interfejsów i abstrakcji do odsprzęgania modułów. Ważne jest również pisanie testów jednostkowych dla każdego modułu, efektywne dokumentowanie modułów, unikanie cyklicznych zależności oraz regularne refaktoryzowanie kodu.

## Eksploracja fundamentalnych wzorców architektury systemów

_Wzorce architektury oprogramowania to wielokrotnie używane rozwiązania typowych problemów w projektowaniu oprogramowania. Istnieje wiele powszechnie stosowanych wzorców, z których każdy ma swoje charakterystyczne cechy, przypadki użycia, zalety i wady._

### Powszechne wzorce architektoniczne

Architektura warstwowa (N-warstwowa) organizuje aplikację w poziome warstwy (np. prezentacji, logiki biznesowej, dostępu do danych). Promuje rozdzielenie odpowiedzialności. Jest to powszechny i stosunkowo łatwy do zrozumienia wzorzec, który skutecznie oddziela różne aspekty aplikacji. Jednakże czasami może prowadzić do wąskich gardeł wydajności, jeśli dane muszą przechodzić przez wiele warstw, i może stać się sztywny, jeśli nie zostanie starannie zaprojektowany.

Architektura klient-serwer oddziela klientów (wnioskujących) od serwerów (dostawców) zasobów lub usług. Jest powszechna w aplikacjach internetowych i systemach rozproszonych. Jest fundamentalna dla wielu usług online, umożliwiając scentralizowane zarządzanie danymi i udostępnianie zasobów. Jednakże serwer może stać się wąskim gardłem i pojedynczym punktem awarii, jeśli nie zostanie odpowiednio przeskalowany i nie będzie wysoce dostępny.

Architektura oparta na zdarzeniach (EDA) polega na komunikacji komponentów za pomocą asynchronicznych zdarzeń. Umożliwia luźne sprzężenie i responsywność w czasie rzeczywistym. (Omówiono już w sekcji Wzorce integracji).

Architektura mikroserwisów strukturyzuje aplikację jako zbiór małych, niezależnych i wdrażalnych usług. Promuje skalowalność, izolację błędów i niezależne zespoły. Oferuje znaczne korzyści pod względem skalowalności, odporności i zwinności rozwoju, dzieląc monolityczną aplikację na mniejsze, niezależnie zarządzane usługi. Jednakże wprowadza złożoność w obszarach takich jak komunikacja między usługami, wdrażanie i monitorowanie.

Architektura oparta na przestrzeni (Space-Based Architecture) wykorzystuje rozproszony magazyn danych w pamięci, aby osiągnąć wysoką skalowalność i niskie opóźnienia. Nadaje się do aplikacji o wysokich wymaganiach dotyczących dostępu do danych. Jest przeznaczona dla aplikacji wymagających bardzo szybkiego dostępu do dużych ilości danych, takich jak analiza w czasie rzeczywistym lub platformy transakcyjne o wysokiej częstotliwości. Osiąga to poprzez przechowywanie danych w pamięci w rozproszonej sieci. Jednakże zapewnienie spójności danych w rozproszonej przestrzeni może być wyzwaniem.

Architektura zorientowana na usługi (SOA) wykorzystuje komponenty oprogramowania zwane usługami do tworzenia aplikacji biznesowych. Podkreśla ponowne wykorzystanie i interoperacyjność usług. Skupia się na tworzeniu wielokrotnie używanych usług biznesowych, które można łączyć w celu budowania złożonych aplikacji. Promuje interoperacyjność między różnymi systemami i technologiami. Chociaż jest podobna do mikroserwisów, SOA zwykle ma większe, bardziej ogólne usługi.

Architektura potokowa (Pipes and Filters) przetwarza dane przez serię dyskretnych kroków (filtrów) połączonych kanałami (pipes). Nadaje się do przetwarzania danych i potoków ETL. Dobrze sprawdza się w przypadku zadań, które można podzielić na serię niezależnych kroków przetwarzania, takich jak transformacja danych lub potoki ciągłej integracji/ciągłego wdrażania (CI/CD). Promuje modularność i łatwość modyfikacji. Jednakże ogólna przepustowość jest ograniczona przez najwolniejszy filtr w potoku.

Architektura tablicy ogłoszeń (Blackboard Architecture) wykorzystuje wspólną przestrzeń roboczą (tablicę ogłoszeń), w której niezależne źródła wiedzy współpracują w celu rozwiązania problemu. Jest przydatna w przypadku złożonych problemów bez dobrze zdefiniowanego algorytmu, takich jak systemy sztucznej inteligencji. Jest skuteczna w rozwiązywaniu złożonych, niedeterministycznych problemów, gdzie rozwiązanie wymaga integracji wiedzy z wielu wyspecjalizowanych źródeł. Wspólna tablica ogłoszeń ułatwia komunikację i współpracę między tymi źródłami. Jednakże zaprojektowanie mechanizmu kontroli zarządzającego źródłami wiedzy może być wyzwaniem.

## Dodatkowe aspekty architektury systemów

### Cecha jakościowa a atrybut jakościowy

W inżynierii systemów atrybuty jakościowe to niefunkcjonalne wymagania służące do oceny wydajności systemu . Są one czasami nazywane charakterystykami architektury lub "ilities" ze względu na ich wspólny sufiks . Atrybut jakościowy jest cechą funkcji, opisującą aspekt jej zachowania i spełniane w tym zakresie wymaganie . W literaturze preferuje się termin charakterystyki architektury, argumentując, że atrybuty jakości sugerują ocenę jakości po fakcie, a nie projektowanie . Przykłady atrybutów jakościowych obejmują dostępność, niezawodność, wydajność, bezpieczeństwo, modyfikowalność i użyteczność.

### Scenariusz atrybutu jakościowego

Scenariusz atrybutu jakościowego jest powszechną formą specyfikacji wymagań dotyczących atrybutów jakościowych, która powinna być jednoznaczna i testowalna . Składa się z sześciu części: źródła bodźca, bodźca, artefaktu, środowiska, odpowiedzi i miary odpowiedzi . Scenariusze te umożliwiają jasną komunikację oczekiwań i ograniczeń, ułatwiając podejmowanie decyzji i analizę kompromisów dotyczących projektu architektonicznego . Przykładowy scenariusz dla atrybutu jakościowego elastyczność w firmie telekomunikacyjnej mógłby wyglądać tak: "Żądanie dodania nowej promocji dla istniejącego produktu do systemu w okienku nocnym wdrożone w czasie nie dłuższym niż 2 tygodnie od zgłoszenia zmiany przez departament marketingu".

### Testowanie atrybutów jakościowych

Testowanie architektury systemów obejmuje weryfikację różnych atrybutów jakościowych:

- Testowanie wydajności (Performance Testing): Ocenia szybkość, skalowalność i stabilność systemu pod obciążeniem, symulując scenariusze użycia z wirtualnymi użytkownikami . Pomaga identyfikować wąskie gardła i zapewniać zgodność z wymaganiami wydajnościowymi .
- Testowanie poprawności (Correctness Testing): Sprawdza, czy oprogramowanie działa zgodnie z oczekiwaniami i wymaganiami użytkownika, weryfikując funkcjonalność i wykrywając błędy . Obejmuje testy jednostkowe, integracyjne i systemowe .
- Testowanie dostępności (Availability Testing): Zapewnia, że system jest operacyjny i dostępny dla użytkowników, nawet w przypadku awarii sprzętu lub oprogramowania . Mierzy czas sprawności i identyfikuje potencjalne punkty awarii .
- Testowanie modyfikowalności (Modifiability Testing): Ocenia łatwość wprowadzania zmian w systemie bez powodowania defektów lub pogorszenia istniejącej jakości . Testy te mogą obejmować analizę kodu i architektury.

### Dobry, czysty kod

Dobry, czysty kod charakteryzuje się czytelnością, zrozumiałością i łatwością modyfikacji . Jest elegancki, skupiony na jednym zadaniu i zadbany .

- Podejście top-down: Posiada wiedzę o modelu domeny i poprzez szukanie "beacon-ów" w kodzie, buduje zrozumienie w relacji do modelu
- Podejście bottom-up: Buduje zrozumienie na bazie kodu, wyciągając z niego abstrakcje i porządkuje je

### Modelowanie w architekturze systemów

_Modelowanie systemów to proces tworzenia abstrakcyjnych modeli systemu, z których każdy przedstawia inną perspektywę . Modele wizualne, często oparte na UML (Unified Modeling Language), pomagają w zrozumieniu funkcjonalności systemu, komunikacji z klientami i specyfikacji wymagań . Modelowanie ułatwia identyfikację problemów niespójności i niekompletności na wczesnym etapie projektowania . Diagramy UML, takie jak diagramy klas, przypadków użycia, komponentów i wdrożeń, oferują różne perspektywy systemu._

#### Podejście multi-model vs single-model

_W architekturze systemów rozróżnia się podejście z jednym modelem (single-model) i wieloma modelami (multi-model)._

- Podejście single-model: Każdy klient korzysta z własnej, niezależnej instancji oprogramowania i bazy danych . Zapewnia większą kontrolę, bezpieczeństwo i możliwość dostosowania, ale może być droższe i mniej efektywne pod względem wykorzystania zasobów .
- Podejście multi-model: Wielu klientów dzieli tę samą instancję oprogramowania i bazy danych, z izolacją danych poszczególnych klientów . Jest bardziej efektywne kosztowo i łatwiejsze w skalowaniu, ale oferuje mniejszą kontrolę i możliwości dostosowania.

Wybór między tymi podejściami zależy od specyficznych wymagań biznesowych, w tym poziomu dostosowania, kosztów, złożoności zarządzania i wymagań bezpieczeństwa danych .

## Wnioski: Zasady solidnego projektowania systemów

Podsumowując, w niniejszym artykule omówiono kluczowe aspekty architektury systemów, w tym projektowanie API, wzorce integracji, modularność i powszechne wzorce architektoniczne. Przy projektowaniu solidnych i efektywnych systemów warto kierować się kilkoma nadrzędnymi zasadami. Należy dążyć do prostoty i przejrzystości projektów, budować systemy zdolne do adaptacji do zmieniających się wymagań i technologii, priorytetowo traktować skalowalność i wydajność, a także skupić się na niezawodności i odporności na awarie. Bezpieczeństwo powinno być integralną częścią procesu projektowania od samego początku. Należy pamiętać, że wybór wzorców architektonicznych i zasad projektowania zależy w dużej mierze od specyficznych wymagań i ograniczeń projektu. Nie istnieje jedno uniwersalne rozwiązanie. Wreszcie, w dynamicznie rozwijającej się dziedzinie architektury systemów, ciągłe uczenie się i eksploracja nowych koncepcji są kluczowe dla tworzenia nowoczesnych i efektywnych rozwiązań.

#### Najlepsze praktywki

| Najlepsza praktyka         | Opis                                                                                                            |
| -------------------------- | --------------------------------------------------------------------------------------------------------------- |
| Używaj opisowych nazw      | Jasne i spójne nazewnictwo punktów końcowych, akcji i parametrów.                                               |
| Przestrzegaj zasad RESTful | Przestrzegaj zasad RESTful, takich jak projektowanie zorientowane na zasoby i właściwe użycie metod HTTP.       |
| Utrzymuj małe ładunki      | Minimalizuj rozmiar treści żądań i odpowiedzi dla lepszej wydajności.                                           |
| Implementuj obsługę błędów | Zapewnij klientom znaczące informacje zwrotne za pomocą standardowych kodów statusu HTTP i jasnych komunikatów. |
| Kompleksowa dokumentacja   | Zapewnij dokładną dokumentację wspierającą programistów.                                                        |
| Zabezpiecz swoje API       | Wdróż mechanizmy uwierzytelniania i autoryzacji w celu ochrony danych.                                          |
| Implementuj stronicowanie  | Umożliw klientom pobieranie danych w zarządzanych porcjach.                                                     |
| Używaj wersji              | Zarządzaj zmianami w API bez przerywania działania istniejących klientów.                                       |

#### Wzorce integracji

| Wzorzec integracji                 | Opis                                                         | Zalety                                                                            | Wady                                                                                    |
| ---------------------------------- | ------------------------------------------------------------ | --------------------------------------------------------------------------------- | --------------------------------------------------------------------------------------- |
| Punkt-punkt                        | Bezpośrednie połączenie między dwoma systemami.              | Prosty w implementacji dla niewielkiej liczby integracji.                         | Prowadzi do silnego sprzężenia i złożoności wraz ze wzrostem liczby integracji.         |
| Hub-and-Spoke                      | Centralny węzeł pośredniczy w komunikacji.                   | Upraszcza zarządzanie i dodawanie nowych punktów końcowych.                       | Centralny węzeł może być wąskim gardłem i pojedynczym punktem awarii.                   |
| Publikuj-subskrybuj                | Odsprzężona komunikacja za pośrednictwem brokera wiadomości. | Skalowalność, odporność, komunikacja asynchroniczna.                              | Potencjalna złożoność w zarządzaniu tematami i zapewnieniu dostarczania wiadomości.     |
| API Gateway                        | Pojedynczy punkt wejścia dla żądań klientów.                 | Uproszczona interakcja z klientem, scentralizowane bezpieczeństwo i zarządzanie.  | Może stać się wąskim gardłem i pojedynczym punktem awarii.                              |
| Enterprise Service Bus             | Middleware do komunikacji, transformacji i routingu.         | Scentralizowana platforma integracyjna, obsługuje różnorodne protokoły i formaty. | Może stać się złożony, wąskim gardłem i zasobożerny.                                    |
| Architektura oparta na zdarzeniach | Komunikacja za pomocą asynchronicznych zdarzeń.              | Wysoka skalowalność, responsywność w czasie rzeczywistym, luźne sprzężenie.       | Debugowanie może być złożone, wyzwania w zapewnieniu kolejności i dostarczania zdarzeń. |

#### Dzielenie na moduły

| Korzyść                          | Opis                                                                                       |
| -------------------------------- | ------------------------------------------------------------------------------------------ |
| Poprawiona łatwość utrzymania    | Łatwiejsze zrozumienie, naprawianie i aktualizowanie poszczególnych modułów.               |
| Zwiększona skalowalność          | Moduły można skalować niezależnie w zależności od zapotrzebowania.                         |
| Możliwość ponownego użycia kodu  | Moduły można ponownie wykorzystywać w różnych częściach aplikacji lub w innych projektach. |
| Równoległy rozwój                | Różne zespoły mogą pracować nad różnymi modułami jednocześnie.                             |
| Uproszczone testowanie           | Łatwiejsze testowanie poszczególnych modułów w izolacji.                                   |
| Zwiększona elastyczność/zwinność | Łatwiejsze dostosowywanie się do zmieniających się wymagań i wprowadzanie nowych funkcji.  |
| Redukcja kosztów                 | Dzięki ponownemu wykorzystaniu kodu, efektywnemu rozwojowi i łatwiejszemu utrzymaniu.      |

#### Wzorce architektury

| Wzorzec integracji           | Opis                                                                                            | Zalety                                                                             | Wady                                                     |
| ---------------------------- | ----------------------------------------------------------------------------------------------- | ---------------------------------------------------------------------------------- | -------------------------------------------------------- |
| Warstwowa (N-warstwowa)      | Organizuje aplikację w poziome warstwy (np. prezentacji, logiki biznesowej, dostępu do danych). | Rozdzielenie odpowiedzialności, modularność, łatwość utrzymania.                   | Aplikacje internetowe, systemy korporacyjne.             |
| Klient-serwer                | Oddziela klientów (wnioskujących) od serwerów (dostawców) zasobów lub usług.                    | Centralizowane zarządzanie zasobami, skalowalność.                                 | Aplikacje internetowe, systemy rozproszone, bazy danych. |
| Mikroserwisy                 | Strukturyzuje aplikację jako zbiór małych, niezależnych i wdrażalnych usług.                    | Niezależne wdrażanie, skalowalność, odporność na awarie, różnorodność technologii. | Aplikacje chmurowe, złożone aplikacje biznesowe.         |
| Zorientowana na usługi (SOA) | Wykorzystuje komponenty oprogramowania zwane usługami do tworzenia aplikacji biznesowych.       | Ponowne wykorzystanie usług, interoperacyjność, luźne sprzężenie.                  | Integracja systemów korporacyjnych, aplikacje biznesowe. |
| Potokowa (Pipes and Filters) | Przetwarza dane przez serię dyskretnych kroków (filtrów) połączonych kanałami (pipes).          | Modularność, łatwość modyfikacji, nadaje się do przetwarzania danych.              | Przetwarzanie danych, potoki ETL, systemy integracji.    |
