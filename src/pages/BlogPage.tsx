import React, { useState } from "react";
import { Link } from "react-router-dom";
import { motion } from "framer-motion";
import { GlassCard } from "../components/GlassCard";
import {
  MagnifyingGlassIcon,
  CalendarDaysIcon,
  ClockIcon,
} from "@heroicons/react/24/outline";

const blogPosts = [
  {
    id: 1,
    slug: "react-18-nowe-funkcje",
    title: "React 18 - Nowości i najważniejsze zmiany",
    excerpt:
      "Przegląd najważniejszych funkcji wprowadzonych w React 18, w tym Concurrent Features, Suspense i Automatic Batching.",
    content: `# React 18 - Nowości i najważniejsze zmiany

React 18 wprowadza wiele ekscytujących funkcji, które znacznie poprawiają wydajność i doświadczenie użytkownika...

## Concurrent Features
Nowe funkcje umożliwiają React przygotowywanie wielu wersji UI jednocześnie...

## Suspense
Ulepszona obsługa asynchronicznego ładowania komponentów...

## Automatic Batching
Lepsze grupowanie aktualizacji state dla zwiększenia wydajności...`,
    image:
      "https://images.pexels.com/photos/11035380/pexels-photo-11035380.jpeg?auto=compress&cs=tinysrgb&w=600",
    category: "React",
    author: "Fraszczak Piotr",
    publishedAt: "2024-01-15",
    readTime: "8 min",
  },
  {
    id: 2,
    slug: "typescript-tips-tricks",
    title: "TypeScript: Wskazówki dla zaawansowanych",
    excerpt:
      "Poznaj zaawansowane techniki TypeScript, które pomogą Ci pisać lepszy i bezpieczniejszy kod.",
    content: `# TypeScript: Wskazówki dla zaawansowanych

TypeScript oferuje wiele zaawansowanych funkcji, które mogą znacznie poprawić jakość Twojego kodu...`,
    image:
      "https://images.pexels.com/photos/4164418/pexels-photo-4164418.jpeg?auto=compress&cs=tinysrgb&w=600",
    category: "TypeScript",
    author: "Fraszczak Piotr",
    publishedAt: "2024-01-10",
    readTime: "12 min",
  },
  {
    id: 3,
    slug: "nodejs-performance-optimization",
    title: "Optymalizacja wydajności Node.js",
    excerpt:
      "Praktyczne sposoby na zwiększenie wydajności aplikacji Node.js w środowisku produkcyjnym.",
    content: `# Optymalizacja wydajności Node.js

Wydajność aplikacji Node.js jest kluczowa dla sukcesu każdego projektu...`,
    image:
      "https://images.pexels.com/photos/1181675/pexels-photo-1181675.jpeg?auto=compress&cs=tinysrgb&w=600",
    category: "Node.js",
    author: "Fraszczak Piotr",
    publishedAt: "2024-01-05",
    readTime: "10 min",
  },
  {
    id: 4,
    slug: "docker-dla-frontend-developerow",
    title: "Docker dla Frontend Developerów",
    excerpt:
      "Jak używać Docker w projektach frontendowych - od podstaw do zaawansowanych konfiguracji.",
    content: `# Docker dla Frontend Developerów

Docker może znacznie uprościć proces developmentu i deploymentu aplikacji frontendowych...`,
    image:
      "https://images.pexels.com/photos/1181298/pexels-photo-1181298.jpeg?auto=compress&cs=tinysrgb&w=600",
    category: "DevOps",
    author: "Fraszczak Piotr",
    publishedAt: "2023-12-28",
    readTime: "15 min",
  },
];

const categories = ["Wszystkie", "React", "TypeScript", "Node.js", "DevOps"];

export function BlogPage() {
  const [searchTerm, setSearchTerm] = useState("");
  const [selectedCategory, setSelectedCategory] = useState("Wszystkie");

  const filteredPosts = blogPosts.filter((post) => {
    const matchesSearch =
      post.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
      post.excerpt.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesCategory =
      selectedCategory === "Wszystkie" || post.category === selectedCategory;
    return matchesSearch && matchesCategory;
  });

  return (
    <div className="pt-24 pb-20 px-4 sm:px-6 lg:px-8">
      <div className="max-w-4xl mx-auto">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="text-center mb-16"
        >
          <h1 className="text-5xl font-bold text-slate-800 dark:text-white mb-6">
            Blog
          </h1>
          <p className="text-xl text-slate-600 dark:text-slate-300">
            Dzielę się wiedzą i doświadczeniem z rozwoju aplikacji webowych
          </p>
        </motion.div>

        {/* Search and Filter */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.2 }}
          className="mb-12 space-y-6"
        >
          {/* Search */}
          <div className="relative">
            <MagnifyingGlassIcon className="absolute left-4 top-1/2 transform -translate-y-1/2 w-5 h-5 text-slate-400" />
            <input
              type="text"
              placeholder="Szukaj artykułów..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="w-full pl-12 pr-4 py-4 bg-white/20 dark:bg-slate-800/20 backdrop-blur-lg border border-white/30 dark:border-slate-700/30 rounded-2xl text-slate-800 dark:text-white placeholder-slate-500 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-transparent"
            />
          </div>

          {/* Category Filter */}
          <div className="flex flex-wrap gap-3">
            {categories.map((category) => (
              <button
                key={category}
                onClick={() => setSelectedCategory(category)}
                className={`px-4 py-2 rounded-full text-sm font-medium transition-all duration-300 ${
                  selectedCategory === category
                    ? "bg-gradient-to-r from-indigo-500 to-purple-500 text-white"
                    : "bg-white/20 dark:bg-slate-800/20 backdrop-blur-lg border border-white/30 dark:border-slate-700/30 text-slate-700 dark:text-slate-300 hover:bg-white/30 dark:hover:bg-slate-700/30"
                }`}
              >
                {category}
              </button>
            ))}
          </div>
        </motion.div>

        {/* Blog Posts */}
        <div className="space-y-8">
          {filteredPosts.map((post, index) => (
            <motion.div
              key={post.id}
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: index * 0.1 }}
            >
              <Link to={`/blog/${post.slug}`}>
                <GlassCard className="overflow-hidden group">
                  <div className="md:flex">
                    <div className="md:w-1/3">
                      <img
                        src={post.image}
                        alt={post.title}
                        className="w-full h-48 md:h-full object-cover group-hover:scale-105 transition-transform duration-500"
                      />
                    </div>
                    <div className="md:w-2/3 p-6">
                      <div className="flex items-center gap-4 mb-3">
                        <span className="text-xs px-3 py-1 bg-indigo-100 dark:bg-indigo-900 text-indigo-600 dark:text-indigo-300 rounded-full">
                          {post.category}
                        </span>
                        <div className="flex items-center text-sm text-slate-500">
                          <CalendarDaysIcon className="w-4 h-4 mr-1" />
                          {new Date(post.publishedAt).toLocaleDateString(
                            "pl-PL"
                          )}
                        </div>
                        <div className="flex items-center text-sm text-slate-500">
                          <ClockIcon className="w-4 h-4 mr-1" />
                          {post.readTime}
                        </div>
                      </div>
                      <h2 className="text-2xl font-bold text-slate-800 dark:text-white mb-3 group-hover:text-indigo-600 dark:group-hover:text-indigo-400 transition-colors duration-200">
                        {post.title}
                      </h2>
                      <p className="text-slate-600 dark:text-slate-300 line-clamp-3 leading-relaxed">
                        {post.excerpt}
                      </p>
                    </div>
                  </div>
                </GlassCard>
              </Link>
            </motion.div>
          ))}
        </div>

        {filteredPosts.length === 0 && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            className="text-center py-12"
          >
            <p className="text-xl text-slate-600 dark:text-slate-300">
              Nie znaleziono artykułów spełniających kryteria wyszukiwania.
            </p>
          </motion.div>
        )}
      </div>
    </div>
  );
}
