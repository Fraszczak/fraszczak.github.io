export interface BlogPost {
  slug: string;
  title: string;
  excerpt: string;
  date: string;
  tags: string[];
  author: string;
  image?: string;
  published: boolean;
  content: string;
  readingTime?: number;
}

// Simple frontmatter parser
function parseFrontmatter(content: string) {
  const frontmatterRegex = /^---\s*\n([\s\S]*?)\n---\s*\n([\s\S]*)$/;
  const match = content.match(frontmatterRegex);

  if (!match) {
    return { data: {}, content };
  }

  const [, frontmatterStr, bodyContent] = match;
  const data: Record<string, any> = {};

  // Parse YAML-like frontmatter
  frontmatterStr.split('\n').forEach((line) => {
    const colonIndex = line.indexOf(':');
    if (colonIndex > 0) {
      const key = line.substring(0, colonIndex).trim();
      let value = line.substring(colonIndex + 1).trim();

      // Remove quotes
      if (
        (value.startsWith('"') && value.endsWith('"')) ||
        (value.startsWith("'") && value.endsWith("'"))
      ) {
        value = value.slice(1, -1);
      }

      // Parse arrays
      if (value.startsWith('[') && value.endsWith(']')) {
        const arrayContent = value.slice(1, -1);
        if (arrayContent.trim()) {
          value = arrayContent
            .split(',')
            .map((item) => item.trim().replace(/^["']|["']$/g, ''));
        } else {
          value = [];
        }
      }

      // Parse booleans
      if (value === 'true') value = true;
      if (value === 'false') value = false;

      data[key] = value;
    }
  });

  return { data, content: bodyContent };
}

// Import blog post contents
async function loadBlogPost(slug: string): Promise<string | null> {
  try {
    // Dynamic import of markdown files
    const module = await import(`./blog/${slug}.md?raw`);
    return module.default;
  } catch (error) {
    console.error(`Failed to load blog post: ${slug}`, error);
    return null;
  }
}

// Available blog post slugs (you'll need to maintain this list)
const AVAILABLE_POSTS = [
  'react-hooks-guide',
  'typescript-advanced-tips',
  'vite-deployment-guide',
];

// Parse markdown content and extract frontmatter
export async function parseBlogPost(slug: string): Promise<BlogPost | null> {
  const rawContent = await loadBlogPost(slug);
  if (!rawContent) return null;

  const { data, content } = parseFrontmatter(rawContent);

  // Calculate reading time (rough estimate: 200 words per minute)
  const wordCount = content.split(/\s+/).length;
  const readingTime = Math.ceil(wordCount / 200);

  return {
    slug,
    title: data.title,
    excerpt: data.excerpt,
    date: data.date,
    tags: Array.isArray(data.tags) ? data.tags : [],
    author: data.author,
    image: data.image,
    published: data.published ?? false,
    content,
    readingTime,
  };
}

// Get all blog posts
export async function getAllBlogPosts(): Promise<BlogPost[]> {
  const posts = await Promise.all(
    AVAILABLE_POSTS.map((slug) => parseBlogPost(slug))
  );

  return posts
    .filter((post): post is BlogPost => post !== null && post.published)
    .sort((a, b) => new Date(b.date).getTime() - new Date(a.date).getTime());
}

// Get blog post by slug
export async function getBlogPost(slug: string): Promise<BlogPost | null> {
  return await parseBlogPost(slug);
}
