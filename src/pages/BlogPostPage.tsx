import { useParams, Link, useNavigate } from "react-router-dom";
import { useState, useEffect } from "react";
import { motion } from "framer-motion";
import {
  ArrowLeftIcon,
  CalendarDaysIcon,
  ClockIcon,
  TagIcon,
  ShareIcon,
} from "@heroicons/react/24/outline";
import { useScrollToTop } from "../hooks/useScrollToTop";
import { useI18n } from "../contexts/I18nContext";
import { getBlogPost, getAllBlogPosts, BlogPost } from "../content/blogPosts";
import { MarkdownRenderer } from "../components/MarkdownRenderer";
import { NotFoundPage } from "./NotFoundPage";

export function BlogPostPage() {
  useScrollToTop();
  const { t } = useI18n();
  const { slug } = useParams<{ slug: string }>();
  const navigate = useNavigate();

  const [post, setPost] = useState<BlogPost | null>(null);
  const [relatedPosts, setRelatedPosts] = useState<BlogPost[]>([]);
  const [loading, setLoading] = useState(true);
  const [notFound, setNotFound] = useState(false);

  useEffect(() => {
    async function loadPost() {
      if (!slug) {
        setNotFound(true);
        setLoading(false);
        return;
      }

      try {
        // Load the current post
        const currentPost = await getBlogPost(slug);

        if (!currentPost) {
          setNotFound(true);
          setLoading(false);
          return;
        }

        setPost(currentPost);

        // Load all posts to find related ones
        const allPosts = await getAllBlogPosts();
        const related = allPosts
          .filter(
            (p) =>
              p.slug !== currentPost.slug &&
              p.tags.some((tag) => currentPost.tags.includes(tag))
          )
          .slice(0, 3);

        setRelatedPosts(related);
      } catch (error) {
        console.error("Failed to load blog post:", error);
        setNotFound(true);
      } finally {
        setLoading(false);
      }
    }

    loadPost();
  }, [slug]);

  useEffect(() => {
    if (post) {
      document.title = `${post.title} | Piotr Fraszczak`;

      // Update meta description
      const metaDescription = document.querySelector(
        'meta[name="description"]'
      );
      if (metaDescription) {
        metaDescription.setAttribute("content", post.excerpt);
      }
    }
  }, [post]);

  const formatDate = (dateString: string) => {
    return new Date(dateString).toLocaleDateString("en-US", {
      year: "numeric",
      month: "long",
      day: "numeric",
    });
  };

  const handleShare = async () => {
    if (!post) return;

    const url = window.location.href;
    const title = post.title;

    if (navigator.share) {
      try {
        await navigator.share({ title, url });
      } catch (err) {
        console.log("Error sharing:", err);
      }
    } else {
      // Fallback: copy to clipboard
      navigator.clipboard.writeText(url);
      // You could show a toast notification here
    }
  };

  // Loading state
  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-center">
          <div className="animate-spin rounded-full h-32 w-32 border-b-2 border-indigo-600 mx-auto mb-4"></div>
          <p className="text-slate-600 dark:text-slate-300">
            Loading blog post...
          </p>
        </div>
      </div>
    );
  }

  // Not found state
  if (notFound || !post) {
    return <NotFoundPage />;
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 via-indigo-50 to-purple-50 dark:from-slate-900 dark:via-slate-900 dark:to-slate-800 py-16">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Back Button */}
        <motion.div
          initial={{ opacity: 0, x: -20 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.4 }}
          className="mb-8"
        >
          <button
            onClick={() => navigate("/blog")}
            className="inline-flex items-center gap-2 text-indigo-600 dark:text-indigo-400 hover:text-indigo-800 dark:hover:text-indigo-300 transition-colors"
          >
            <ArrowLeftIcon className="w-5 h-5" />
            Back to Blog
          </button>
        </motion.div>

        {/* Article Header */}
        <motion.article
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="bg-white dark:bg-slate-800 rounded-2xl shadow-xl overflow-hidden"
        >
          {post.image && (
            <div className="aspect-video bg-gradient-to-r from-indigo-500 to-purple-600">
              <img
                src={post.image}
                alt={post.title}
                className="w-full h-full object-cover"
                onError={(e) => {
                  e.currentTarget.style.display = "none";
                }}
              />
            </div>
          )}

          <div className="p-8 md:p-12">
            {/* Article Meta */}
            <div className="flex flex-wrap items-center gap-4 text-sm text-slate-500 dark:text-slate-400 mb-6">
              <div className="flex items-center gap-1">
                <CalendarDaysIcon className="w-4 h-4" />
                <span>{formatDate(post.date)}</span>
              </div>
              {post.readingTime && (
                <div className="flex items-center gap-1">
                  <ClockIcon className="w-4 h-4" />
                  <span>{post.readingTime} min read</span>
                </div>
              )}
              <div className="flex items-center gap-1">
                <span>By {post.author}</span>
              </div>
              <button
                onClick={handleShare}
                className="flex items-center gap-1 hover:text-indigo-600 dark:hover:text-indigo-400 transition-colors ml-auto"
              >
                <ShareIcon className="w-4 h-4" />
                Share
              </button>
            </div>

            {/* Article Title */}
            <h1 className="text-4xl md:text-5xl font-bold text-slate-900 dark:text-white mb-6">
              {post.title}
            </h1>

            {/* Article Excerpt */}
            <p className="text-xl text-slate-600 dark:text-slate-300 mb-8 leading-relaxed">
              {post.excerpt}
            </p>

            {/* Tags */}
            {post.tags.length > 0 && (
              <div className="flex flex-wrap gap-2 mb-8 pb-8 border-b border-slate-200 dark:border-slate-700">
                {post.tags.map((tag) => (
                  <span
                    key={tag}
                    className="inline-flex items-center px-3 py-1 rounded-full text-sm bg-indigo-100 dark:bg-indigo-900 text-indigo-800 dark:text-indigo-200"
                  >
                    <TagIcon className="w-3 h-3 mr-1" />
                    {tag}
                  </span>
                ))}
              </div>
            )}

            {/* Article Content */}
            <MarkdownRenderer content={post.content} />
          </div>
        </motion.article>

        {/* Related Posts */}
        {relatedPosts.length > 0 && (
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.3 }}
            className="mt-16"
          >
            <h2 className="text-3xl font-bold text-slate-800 dark:text-white mb-8">
              Related Articles
            </h2>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              {relatedPosts.map((relatedPost) => (
                <Link
                  key={relatedPost.slug}
                  to={`/blog/${relatedPost.slug}`}
                  className="block bg-white dark:bg-slate-800 rounded-lg p-6 shadow-lg hover:shadow-xl transition-shadow"
                >
                  <h3 className="font-semibold text-slate-800 dark:text-white mb-2 line-clamp-2">
                    {relatedPost.title}
                  </h3>
                  <p className="text-slate-600 dark:text-slate-300 text-sm line-clamp-3 mb-3">
                    {relatedPost.excerpt}
                  </p>
                  <div className="text-xs text-slate-500 dark:text-slate-400">
                    {formatDate(relatedPost.date)}
                  </div>
                </Link>
              ))}
            </div>
          </motion.div>
        )}
      </div>
    </div>
  );
}
