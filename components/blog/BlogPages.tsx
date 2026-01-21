import React, { useEffect } from 'react';
import { useParams, Link } from 'react-router-dom';
import { ArrowLeft, Calendar, Clock, Tag, User, Share2, Linkedin, Twitter } from 'lucide-react';
import { motion } from 'framer-motion';
import {
  getAllArticles,
  getAllCategories,
  getArticleBySlug,
  getArticlesByCategory,
  getCategoryBySlug,
  Article,
  Category
} from '../../blog/content';
import { BlogLayout, Breadcrumb, ArticleCard, CategoryCard, TableOfContents } from './BlogLayout';

// Blog Index Page - Lists all categories and recent articles
export const BlogIndex: React.FC = () => {
  const categories = getAllCategories();
  const articles = getAllArticles();

  useEffect(() => {
    document.title = 'AI Leadership Blog | EDUK8AGENTIC';
    const meta = document.querySelector('meta[name="description"]');
    if (meta) meta.setAttribute('content', 'Expert insights on AI agents, executive AI training, and strategic AI implementation for non-technical business leaders.');

    // Add Organization schema for SEO
    const existingSchema = document.querySelector('script[type="application/ld+json"][data-schema="organization"]');
    if (!existingSchema) {
      const orgSchema = {
        "@context": "https://schema.org",
        "@type": "Organization",
        "name": "EDUK8AGENTIC",
        "url": "https://eduk8agentic.com",
        "description": "AI training and education for non-technical executives. Learn AI agents, automation, and strategic AI implementation without coding.",
        "foundingDate": "2025",
        "founder": {
          "@type": "Person",
          "name": "Zara Hunter"
        },
        "areaServed": {
          "@type": "Country",
          "name": "United Kingdom"
        },
        "serviceType": ["AI Training", "Executive Education", "AI Consulting"],
        "knowsAbout": ["AI Agents", "Agentic AI", "Executive AI Training", "AI Strategy", "AI Implementation"]
      };

      const script = document.createElement('script');
      script.type = 'application/ld+json';
      script.setAttribute('data-schema', 'organization');
      script.textContent = JSON.stringify(orgSchema);
      document.head.appendChild(script);
    }

    window.scrollTo(0, 0);
  }, []);

  return (
    <BlogLayout>
      {/* Hero Section */}
      <section className="bg-gradient-to-b from-purple-900 to-purple-800 text-white py-20">
        <div className="container mx-auto px-6 max-w-4xl text-center">
          <motion.h1
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="font-serif text-4xl md:text-5xl font-bold mb-6"
          >
            AI Leadership Insights
          </motion.h1>
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.1 }}
            className="text-purple-200 text-xl max-w-2xl mx-auto"
          >
            Strategic AI guidance for executives and senior leaders. No jargon, no code—just practical insights to lead in the age of AI agents.
          </motion.p>
        </div>
      </section>

      {/* Categories Section */}
      <section className="py-16 bg-white">
        <div className="container mx-auto px-6 max-w-6xl">
          <h2 className="font-serif text-3xl font-bold mb-8 text-stone-900">Browse by Category</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {categories.map(category => (
              <CategoryCard
                key={category.slug}
                category={category}
                articleCount={getArticlesByCategory(category.slug).length}
              />
            ))}
          </div>
        </div>
      </section>

      {/* Latest Articles */}
      <section className="py-16 bg-stone-50">
        <div className="container mx-auto px-6 max-w-6xl">
          <h2 className="font-serif text-3xl font-bold mb-8 text-stone-900">Latest Articles</h2>
          {articles.length > 0 ? (
            <div className="space-y-8">
              {/* Featured Article */}
              {articles[0] && (
                <ArticleCard article={articles[0]} featured={true} />
              )}
              {/* More Articles */}
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {articles.slice(1).map(article => (
                  <ArticleCard key={article.slug} article={article} />
                ))}
              </div>
            </div>
          ) : (
            <p className="text-stone-500">More articles coming soon.</p>
          )}
        </div>
      </section>

      {/* Newsletter CTA */}
      <section className="py-20 bg-purple-900 text-white">
        <div className="container mx-auto px-6 max-w-2xl text-center">
          <h2 className="font-serif text-3xl font-bold mb-4">Stay Ahead of the AI Curve</h2>
          <p className="text-purple-200 mb-8">Get weekly insights on AI agents and executive leadership delivered to your inbox.</p>
          <a
            href="mailto:learn@eduk8agentic.com?subject=Subscribe to Newsletter"
            className="inline-block bg-white text-purple-900 px-8 py-4 rounded-full font-bold hover:bg-purple-100 transition-colors"
          >
            Subscribe to Updates →
          </a>
        </div>
      </section>
    </BlogLayout>
  );
};

// Category Page - Lists all articles in a category
export const CategoryPage: React.FC = () => {
  const { categorySlug } = useParams<{ categorySlug: string }>();
  const category = categorySlug ? getCategoryBySlug(categorySlug) : undefined;
  const articles = categorySlug ? getArticlesByCategory(categorySlug) : [];

  useEffect(() => {
    if (category) {
      document.title = category.metaTitle;
      const meta = document.querySelector('meta[name="description"]');
      if (meta) meta.setAttribute('content', category.metaDescription);
    }
    window.scrollTo(0, 0);
  }, [category]);

  if (!category) {
    return (
      <BlogLayout>
        <div className="container mx-auto px-6 py-20 text-center">
          <h1 className="font-serif text-4xl font-bold mb-4">Category Not Found</h1>
          <Link to="/blog" className="text-purple-600 hover:underline">← Back to Blog</Link>
        </div>
      </BlogLayout>
    );
  }

  return (
    <BlogLayout>
      {/* Category Header */}
      <section className="bg-gradient-to-b from-stone-900 to-stone-800 text-white py-16">
        <div className="container mx-auto px-6 max-w-4xl">
          <Breadcrumb items={[
            { label: 'Blog', href: '/blog' },
            { label: category.name }
          ]} />
          <h1 className="font-serif text-4xl md:text-5xl font-bold mb-4">{category.name}</h1>
          <p className="text-stone-300 text-lg max-w-2xl">{category.description}</p>
        </div>
      </section>

      {/* Articles Grid */}
      <section className="py-16 bg-white">
        <div className="container mx-auto px-6 max-w-6xl">
          {articles.length > 0 ? (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
              {articles.map(article => (
                <ArticleCard key={article.slug} article={article} />
              ))}
            </div>
          ) : (
            <div className="text-center py-12">
              <p className="text-stone-500 mb-4">No articles in this category yet.</p>
              <Link to="/blog" className="text-purple-600 hover:underline">← Browse all articles</Link>
            </div>
          )}
        </div>
      </section>
    </BlogLayout>
  );
};

// Article Page - Full article view
export const ArticlePage: React.FC = () => {
  const { categorySlug, articleSlug } = useParams<{ categorySlug: string; articleSlug: string }>();
  const article = articleSlug ? getArticleBySlug(articleSlug) : undefined;
  const category = categorySlug ? getCategoryBySlug(categorySlug) : undefined;

  useEffect(() => {
    if (article) {
      document.title = article.metaTitle;
      const meta = document.querySelector('meta[name="description"]');
      if (meta) meta.setAttribute('content', article.metaDescription);

      // Add Article Schema markup for SEO
      const existingSchema = document.querySelector('script[type="application/ld+json"][data-schema="article"]');
      if (existingSchema) existingSchema.remove();

      const articleSchema = {
        "@context": "https://schema.org",
        "@type": "Article",
        "headline": article.title,
        "description": article.metaDescription,
        "author": {
          "@type": "Person",
          "name": article.author.name,
          "jobTitle": article.author.role,
          "worksFor": {
            "@type": "Organization",
            "name": "EDUK8AGENTIC"
          }
        },
        "publisher": {
          "@type": "Organization",
          "name": "EDUK8AGENTIC",
          "url": "https://eduk8agentic.com",
          "logo": {
            "@type": "ImageObject",
            "url": "https://eduk8agentic.com/logo.png"
          }
        },
        "datePublished": article.publishedDate,
        "dateModified": article.updatedDate || article.publishedDate,
        "mainEntityOfPage": {
          "@type": "WebPage",
          "@id": `https://eduk8agentic.com/blog/${categorySlug}/${articleSlug}`
        },
        "keywords": article.tags.join(", "),
        "articleSection": article.category,
        "wordCount": article.content.replace(/<[^>]*>/g, '').split(/\s+/).length,
        "inLanguage": "en-GB"
      };

      const script = document.createElement('script');
      script.type = 'application/ld+json';
      script.setAttribute('data-schema', 'article');
      script.textContent = JSON.stringify(articleSchema);
      document.head.appendChild(script);

      // Cleanup on unmount
      return () => {
        const schemaScript = document.querySelector('script[type="application/ld+json"][data-schema="article"]');
        if (schemaScript) schemaScript.remove();
      };
    }
    window.scrollTo(0, 0);
  }, [article, categorySlug, articleSlug]);

  if (!article || !category) {
    return (
      <BlogLayout>
        <div className="container mx-auto px-6 py-20 text-center">
          <h1 className="font-serif text-4xl font-bold mb-4">Article Not Found</h1>
          <Link to="/blog" className="text-purple-600 hover:underline">← Back to Blog</Link>
        </div>
      </BlogLayout>
    );
  }

  // Extract TOC from content
  const tocItems = article.content.match(/<h2[^>]*id="([^"]*)"[^>]*>([^<]*)<\/h2>/g)?.map(match => {
    const idMatch = match.match(/id="([^"]*)"/);
    const textMatch = match.match(/>([^<]*)</);
    return {
      id: idMatch ? idMatch[1] : '',
      text: textMatch ? textMatch[1] : '',
      level: 2
    };
  }) || [];

  const shareUrl = `https://eduk8agentic.com/blog/${categorySlug}/${articleSlug}`;

  return (
    <BlogLayout>
      {/* Article Header */}
      <header className="bg-gradient-to-b from-purple-900 to-purple-800 text-white py-16">
        <div className="container mx-auto px-6 max-w-4xl">
          <Breadcrumb items={[
            { label: 'Blog', href: '/blog' },
            { label: category.name, href: `/blog/${categorySlug}` },
            { label: 'Article' }
          ]} />

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
          >
            <span className="inline-block bg-purple-700/50 text-purple-200 px-3 py-1 rounded-full text-sm font-medium mb-4">
              {article.category}
            </span>
            <h1 className="font-serif text-3xl md:text-5xl font-bold mb-6 leading-tight">
              {article.title}
            </h1>

            <div className="flex flex-wrap items-center gap-6 text-purple-200 text-sm">
              <div className="flex items-center gap-2">
                <User size={16} />
                <span>{article.author.name}</span>
              </div>
              <div className="flex items-center gap-2">
                <Calendar size={16} />
                <span>{new Date(article.publishedDate).toLocaleDateString('en-GB', { day: 'numeric', month: 'long', year: 'numeric' })}</span>
              </div>
              <div className="flex items-center gap-2">
                <Clock size={16} />
                <span>{article.readTime}</span>
              </div>
            </div>
          </motion.div>
        </div>
      </header>

      {/* Article Content */}
      <main className="py-16 bg-white">
        <div className="container mx-auto px-6 max-w-6xl">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-12">
            {/* Sidebar */}
            <aside className="lg:col-span-3 order-2 lg:order-1">
              <div className="lg:sticky lg:top-24">
                {tocItems.length > 0 && <TableOfContents items={tocItems} />}

                {/* Share */}
                <div className="mt-8 bg-stone-50 rounded-xl p-6">
                  <h4 className="font-bold text-stone-900 mb-4">Share This Article</h4>
                  <div className="flex gap-3">
                    <a
                      href={`https://www.linkedin.com/sharing/share-offsite/?url=${encodeURIComponent(shareUrl)}`}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="p-3 bg-[#0077B5] text-white rounded-lg hover:opacity-90 transition-opacity"
                    >
                      <Linkedin size={18} />
                    </a>
                    <a
                      href={`https://twitter.com/intent/tweet?url=${encodeURIComponent(shareUrl)}&text=${encodeURIComponent(article.title)}`}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="p-3 bg-black text-white rounded-lg hover:opacity-90 transition-opacity"
                    >
                      <Twitter size={18} />
                    </a>
                  </div>
                </div>

                {/* Tags */}
                <div className="mt-8">
                  <h4 className="font-bold text-stone-900 mb-4">Topics</h4>
                  <div className="flex flex-wrap gap-2">
                    {article.tags.map(tag => (
                      <span key={tag} className="px-3 py-1 bg-stone-100 text-stone-600 text-xs rounded-full">
                        {tag}
                      </span>
                    ))}
                  </div>
                </div>
              </div>
            </aside>

            {/* Main Content */}
            <article className="lg:col-span-9 order-1 lg:order-2">
              <div
                className="prose prose-lg prose-stone max-w-none
                  prose-headings:font-serif prose-headings:text-stone-900
                  prose-h2:text-3xl prose-h2:mt-12 prose-h2:mb-6
                  prose-h3:text-2xl prose-h3:mt-8 prose-h3:mb-4
                  prose-p:text-stone-600 prose-p:leading-relaxed
                  prose-a:text-purple-600 prose-a:no-underline hover:prose-a:underline
                  prose-strong:text-stone-900
                  prose-ul:my-6 prose-li:my-2
                  prose-blockquote:border-purple-600 prose-blockquote:bg-stone-50 prose-blockquote:py-4 prose-blockquote:px-6 prose-blockquote:rounded-r-xl
                  prose-table:rounded-xl prose-table:overflow-hidden prose-table:shadow-lg
                  prose-th:bg-purple-900 prose-th:text-white prose-th:font-semibold
                  prose-td:border-stone-200
                "
                dangerouslySetInnerHTML={{ __html: article.content }}
              />

              {/* Author Box */}
              <div className="mt-16 p-8 bg-stone-50 rounded-2xl flex flex-col md:flex-row gap-6 items-start">
                <div className="w-16 h-16 bg-purple-600 rounded-full flex items-center justify-center text-white font-bold text-2xl flex-shrink-0">
                  {article.author.name.split(' ').map(n => n[0]).join('')}
                </div>
                <div>
                  <h4 className="font-bold text-stone-900 text-lg">{article.author.name}</h4>
                  <p className="text-purple-600 text-sm mb-3">{article.author.role}</p>
                  <p className="text-stone-600 text-sm leading-relaxed">
                    Zara Hunter is the founder of EDUK8AGENTIC, helping non-technical executives understand and leverage AI agents for strategic advantage. With a background in leadership development and technology consulting, she bridges the gap between AI capabilities and business outcomes.
                  </p>
                </div>
              </div>

              {/* Related Articles */}
              <div className="mt-16">
                <h3 className="font-serif text-2xl font-bold mb-8">Continue Reading</h3>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  {getAllArticles()
                    .filter(a => a.slug !== article.slug)
                    .slice(0, 2)
                    .map(relatedArticle => (
                      <ArticleCard key={relatedArticle.slug} article={relatedArticle} />
                    ))}
                </div>
              </div>
            </article>
          </div>
        </div>
      </main>

      {/* CTA Section */}
      <section className="py-20 bg-gradient-to-r from-purple-900 to-purple-700 text-white">
        <div className="container mx-auto px-6 max-w-3xl text-center">
          <h2 className="font-serif text-3xl md:text-4xl font-bold mb-6">
            Ready to Lead with AI?
          </h2>
          <p className="text-purple-200 text-lg mb-8">
            Join other executives building AI competency with EDUK8AGENTIC. No coding required—just strategic AI fluency.
          </p>
          <Link
            to="/#footer"
            className="inline-block bg-white text-purple-900 px-10 py-4 rounded-full font-bold text-lg hover:bg-purple-100 transition-colors"
          >
            Book Your Strategy Session →
          </Link>
        </div>
      </section>
    </BlogLayout>
  );
};
