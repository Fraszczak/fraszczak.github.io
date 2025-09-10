import React from "react";
import { useParams, Link } from "react-router-dom";
import { motion } from "framer-motion";
import { GlassCard } from "../components/GlassCard";
import {
  ArrowLeftIcon,
  CalendarDaysIcon,
  ClockIcon,
  UserIcon,
} from "@heroicons/react/24/outline";

// Mock data - in real app, this would come from an API or CMS
const blogPosts = [
  {
    id: 1,
    slug: "react-18-nowe-funkcje",
    title: "React 18 - Nowości i najważniejsze zmiany",
    excerpt:
      "Przegląd najważniejszych funkcji wprowadzonych w React 18, w tym Concurrent Features, Suspense i Automatic Batching.",
    content: `# React 18 - Nowości i najważniejsze zmiany

React 18 to jedna z najważniejszych aktualizacji frameworka w ostatnich latach. Wprowadza wiele przełomowych funkcji, które znacznie poprawiają wydajność i doświadczenie użytkownika.

## Concurrent Features

Nowe funkcje współbieżności to prawdopodobnie największa nowość w React 18. Umożliwiają one React przygotowywanie wielu wersji UI jednocześnie, co prowadzi do:

- **Lepszej responsywności** - aplikacja pozostaje responsywna nawet podczas intensywnych obliczeń
- **Inteligentnego priorytetyzowania** - React może przerwać mniej ważne aktualizacje na rzecz pilniejszych
- **Smoother UX** - użytkownik nie doświadcza blokowania interfejsu

### Przykład użycia startTransition

\`\`\`javascript
import { startTransition } from 'react';

function SearchBox() {
  const [isPending, startTransition] = useTransition();
  const [searchQuery, setSearchQuery] = useState('');

  const handleChange = (e) => {
    startTransition(() => {
      setSearchQuery(e.target.value);
    });
  };

  return (
    <div>
      <input onChange={handleChange} />
      {isPending && <Spinner />}
    </div>
  );
}
\`\`\`

## Ulepszone Suspense

Suspense w React 18 został znacznie rozszerzony i teraz obsługuje więcej przypadków użycia:

- **Server-side rendering** - Suspense działa teraz również na serwerze
- **Lepsze error boundaries** - ulepszona obsługa błędów
- **Zagnieżdżone Suspense** - możliwość tworzenia złożonych hierarchii

### Przykład z Suspense

\`\`\`javascript
function App() {
  return (
    <Suspense fallback={<Loading />}>
      <ProfilePage />
      <Suspense fallback={<PostsLoading />}>
        <PostsList />
      </Suspense>
    </Suspense>
  );
}
\`\`\`

## Automatic Batching

React 18 automatycznie grupuje wszystkie aktualizacje stanu, nie tylko te w event handlerach. To oznacza lepszą wydajność out-of-the-box.

### Przed React 18
\`\`\`javascript
// Tylko te aktualizacje były grupowane
function handleClick() {
  setCount(1);
  setFlag(true); // Jedna rerender
}

// Te NIE były grupowane
fetch('/api').then(() => {
  setCount(1); // Rerender
  setFlag(true); // Rerender
});
\`\`\`

### Po React 18
\`\`\`javascript
// Wszystkie aktualizacje są teraz grupowane
fetch('/api').then(() => {
  setCount(1);
  setFlag(true); // Jedna rerender!
});
\`\`\`

## Nowe Hooki

React 18 wprowadza także kilka nowych hooków:

### useId
Generuje unikalne ID dla komponentów:

\`\`\`javascript
function MyComponent() {
  const id = useId();
  return (
    <>
      <label htmlFor={id}>Name:</label>
      <input id={id} type="text" />
    </>
  );
}
\`\`\`

### useDeferredValue
Pozwala na opóźnienie aktualizacji mniej ważnych wartości:

\`\`\`javascript
function SearchResults({ query }) {
  const deferredQuery = useDeferredValue(query);
  const results = useMemo(() => search(deferredQuery), [deferredQuery]);
  return <div>{results}</div>;
}
\`\`\`

## Migracja do React 18

Proces migracji jest stosunkowo prosty:

1. **Zainstaluj React 18**
\`\`\`bash
npm install react@18 react-dom@18
\`\`\`

2. **Zaktualizuj createRoot**
\`\`\`javascript
// Przed
import ReactDOM from 'react-dom';
ReactDOM.render(<App />, document.getElementById('root'));

// Po
import { createRoot } from 'react-dom/client';
const root = createRoot(document.getElementById('root'));
root.render(<App />);
\`\`\`

3. **Testuj aplikację** - większość aplikacji będzie działać bez zmian

## Podsumowanie

React 18 to ogromny krok naprzód dla całego ekosystemu. Concurrent Features, ulepszone Suspense i Automatic Batching to funkcje, które znacznie poprawią doświadczenie użytkowników naszych aplikacji.

Jeśli jeszcze nie zacząłeś migracji, zdecydowanie warto rozważyć aktualizację. Korzyści są znaczące, a proces migracji jest stosunkowo bezbolesny.`,
    image:
      "https://images.pexels.com/photos/11035380/pexels-photo-11035380.jpeg?auto=compress&cs=tinysrgb&w=800",
    category: "React",
    author: "Fraszczak Piotr",
    publishedAt: "2024-01-15",
    readTime: "8 min",
  },
  // Add more posts as needed
];

export function BlogPostPage() {
  const { slug } = useParams();
  const post = blogPosts.find((p) => p.slug === slug);

  if (!post) {
    return (
      <div className="pt-24 pb-20 px-4 sm:px-6 lg:px-8">
        <div className="max-w-4xl mx-auto text-center">
          <h1 className="text-4xl font-bold text-slate-800 dark:text-white mb-4">
            Post nie znaleziony
          </h1>
          <Link
            to="/blog"
            className="inline-flex items-center text-indigo-600 dark:text-indigo-400 hover:underline"
          >
            <ArrowLeftIcon className="w-4 h-4 mr-2" />
            Wróć do bloga
          </Link>
        </div>
      </div>
    );
  }

  return (
    <div className="pt-24 pb-20 px-4 sm:px-6 lg:px-8">
      <div className="max-w-4xl mx-auto">
        {/* Back to Blog */}
        <motion.div
          initial={{ opacity: 0, x: -20 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.4 }}
          className="mb-8"
        >
          <Link
            to="/blog"
            className="inline-flex items-center text-indigo-600 dark:text-indigo-400 hover:underline"
          >
            <ArrowLeftIcon className="w-4 h-4 mr-2" />
            Wróć do bloga
          </Link>
        </motion.div>

        {/* Article Header */}
        <motion.article
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
        >
          <GlassCard className="overflow-hidden mb-8">
            <img
              src={post.image}
              alt={post.title}
              className="w-full h-64 md:h-80 object-cover"
            />
            <div className="p-8">
              <div className="flex flex-wrap items-center gap-4 mb-6">
                <span className="px-3 py-1 bg-indigo-100 dark:bg-indigo-900 text-indigo-600 dark:text-indigo-300 rounded-full text-sm font-medium">
                  {post.category}
                </span>
                <div className="flex items-center text-sm text-slate-500">
                  <UserIcon className="w-4 h-4 mr-1" />
                  {post.author}
                </div>
                <div className="flex items-center text-sm text-slate-500">
                  <CalendarDaysIcon className="w-4 h-4 mr-1" />
                  {new Date(post.publishedAt).toLocaleDateString("pl-PL")}
                </div>
                <div className="flex items-center text-sm text-slate-500">
                  <ClockIcon className="w-4 h-4 mr-1" />
                  {post.readTime}
                </div>
              </div>

              <h1 className="text-4xl md:text-5xl font-bold text-slate-800 dark:text-white mb-6">
                {post.title}
              </h1>

              <p className="text-xl text-slate-600 dark:text-slate-300 leading-relaxed">
                {post.excerpt}
              </p>
            </div>
          </GlassCard>

          {/* Article Content */}
          <GlassCard className="p-8">
            <div
              className="prose prose-lg max-w-none dark:prose-invert prose-headings:text-slate-800 dark:prose-headings:text-white prose-p:text-slate-600 dark:prose-p:text-slate-300 prose-strong:text-slate-800 dark:prose-strong:text-white prose-code:text-indigo-600 dark:prose-code:text-indigo-400 prose-code:bg-slate-100 dark:prose-code:bg-slate-800 prose-pre:bg-slate-100 dark:prose-pre:bg-slate-800"
              dangerouslySetInnerHTML={{
                __html: post.content.replace(/\n/g, "<br />"),
              }}
            />
          </GlassCard>
        </motion.article>

        {/* Share and Navigation */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.4 }}
          className="mt-12 text-center"
        >
          <GlassCard className="p-6">
            <p className="text-slate-600 dark:text-slate-300 mb-4">
              Podobał Ci się artykuł? Podziel się nim!
            </p>
            <div className="flex justify-center gap-4">
              <button className="px-4 py-2 bg-blue-500 text-white rounded-lg hover:bg-blue-600 transition-colors duration-200">
                Twitter
              </button>
              <button className="px-4 py-2 bg-blue-700 text-white rounded-lg hover:bg-blue-800 transition-colors duration-200">
                LinkedIn
              </button>
              <button className="px-4 py-2 bg-green-500 text-white rounded-lg hover:bg-green-600 transition-colors duration-200">
                WhatsApp
              </button>
            </div>
          </GlassCard>
        </motion.div>
      </div>
    </div>
  );
}
