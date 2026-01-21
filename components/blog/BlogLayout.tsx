import React from 'react';
import { Link } from 'react-router-dom';
import { ArrowLeft, Calendar, Clock, Tag, ChevronRight } from 'lucide-react';
import { Article, Category, categories } from '../../blog/content';

interface BlogLayoutProps {
  children: React.ReactNode;
}

export const BlogLayout: React.FC<BlogLayoutProps> = ({ children }) => {
  return (
    <div className="min-h-screen bg-[#FDFCFB]">
      {/* Blog Header */}
      <header className="bg-white border-b border-stone-200 sticky top-0 z-50">
        <div className="container mx-auto px-6 py-4 flex items-center justify-between">
          <Link to="/" className="flex items-center gap-2">
            <div className="w-8 h-8 bg-purple-600 rounded-lg flex items-center justify-center text-white font-bold text-lg">8</div>
            <span className="font-serif font-bold text-lg">
              EDUK8<span className="text-purple-600">AGENTIC</span>
            </span>
          </Link>
          <nav className="hidden md:flex items-center gap-6 text-sm font-medium">
            <Link to="/blog" className="hover:text-purple-600 transition-colors">Blog</Link>
            <Link to="/#paths" className="hover:text-purple-600 transition-colors">Services</Link>
            <Link to="/#footer" className="px-4 py-2 bg-purple-600 text-white rounded-full hover:bg-purple-700 transition-colors">
              Contact
            </Link>
          </nav>
        </div>
      </header>

      {children}

      {/* Blog Footer */}
      <footer className="bg-stone-900 text-white py-16">
        <div className="container mx-auto px-6">
          <div className="grid grid-cols-1 md:grid-cols-4 gap-12">
            <div className="md:col-span-2">
              <div className="flex items-center gap-2 mb-4">
                <div className="w-10 h-10 bg-purple-600 rounded-lg flex items-center justify-center text-white font-bold text-xl">8</div>
                <span className="font-serif font-bold text-xl">EDUK8AGENTIC</span>
              </div>
              <p className="text-stone-400 leading-relaxed">
                AI Agent Training for Non-Technical Executives. Learn to leverage AI agents strategically without coding.
              </p>
            </div>
            <div>
              <h4 className="font-bold mb-4">Categories</h4>
              <ul className="space-y-2">
                {categories.map(cat => (
                  <li key={cat.slug}>
                    <Link to={`/blog/${cat.slug}`} className="text-stone-400 hover:text-white transition-colors text-sm">
                      {cat.name}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>
            <div>
              <h4 className="font-bold mb-4">Contact</h4>
              <a href="mailto:learn@eduk8agentic.com" className="text-purple-400 hover:text-purple-300 transition-colors">
                learn@eduk8agentic.com
              </a>
              <p className="text-stone-400 text-sm mt-4">
                London, United Kingdom
              </p>
            </div>
          </div>
          <div className="border-t border-stone-800 mt-12 pt-8 text-center text-stone-500 text-sm">
            © 2025 EDUK8AGENTIC. All rights reserved.
          </div>
        </div>
      </footer>
    </div>
  );
};

// Breadcrumb component
interface BreadcrumbProps {
  items: { label: string; href?: string }[];
}

export const Breadcrumb: React.FC<BreadcrumbProps> = ({ items }) => {
  return (
    <nav className="flex items-center gap-2 text-sm text-stone-500 mb-8">
      {items.map((item, index) => (
        <React.Fragment key={index}>
          {index > 0 && <ChevronRight size={14} />}
          {item.href ? (
            <Link to={item.href} className="hover:text-purple-600 transition-colors">
              {item.label}
            </Link>
          ) : (
            <span className="text-stone-900">{item.label}</span>
          )}
        </React.Fragment>
      ))}
    </nav>
  );
};

// Article Card component
interface ArticleCardProps {
  article: Article;
  featured?: boolean;
}

export const ArticleCard: React.FC<ArticleCardProps> = ({ article, featured = false }) => {
  return (
    <Link
      to={`/blog/${article.categorySlug}/${article.slug}`}
      className={`group block bg-white rounded-2xl overflow-hidden shadow-lg hover:shadow-xl transition-all ${
        featured ? 'md:flex' : ''
      }`}
    >
      <div className={`${featured ? 'md:w-1/2' : ''} h-48 ${featured ? 'md:h-auto' : ''} bg-gradient-to-br from-purple-600 to-purple-800 flex items-center justify-center`}>
        <span className="text-white/30 font-serif text-6xl">8</span>
      </div>
      <div className={`${featured ? 'md:w-1/2' : ''} p-6`}>
        <div className="flex items-center gap-3 mb-3">
          <span className="text-purple-600 text-xs font-bold uppercase tracking-wider">{article.category}</span>
          <span className="text-stone-300">•</span>
          <span className="text-stone-400 text-xs">{article.readTime}</span>
        </div>
        <h3 className={`font-serif font-bold text-stone-900 mb-3 group-hover:text-purple-600 transition-colors ${
          featured ? 'text-2xl' : 'text-xl'
        }`}>
          {article.title}
        </h3>
        <p className="text-stone-500 text-sm leading-relaxed mb-4 line-clamp-3">
          {article.excerpt}
        </p>
        <div className="flex items-center gap-4 text-xs text-stone-400">
          <span className="flex items-center gap-1">
            <Calendar size={12} />
            {new Date(article.publishedDate).toLocaleDateString('en-GB', { day: 'numeric', month: 'short', year: 'numeric' })}
          </span>
        </div>
      </div>
    </Link>
  );
};

// Category Card component
interface CategoryCardProps {
  category: Category;
  articleCount: number;
}

export const CategoryCard: React.FC<CategoryCardProps> = ({ category, articleCount }) => {
  return (
    <Link
      to={`/blog/${category.slug}`}
      className="group block bg-white p-6 rounded-2xl shadow-lg hover:shadow-xl transition-all border border-stone-100 hover:border-purple-200"
    >
      <h3 className="font-serif text-xl font-bold text-stone-900 mb-2 group-hover:text-purple-600 transition-colors">
        {category.name}
      </h3>
      <p className="text-stone-500 text-sm leading-relaxed mb-4">
        {category.description}
      </p>
      <span className="text-purple-600 text-sm font-semibold">
        {articleCount} {articleCount === 1 ? 'article' : 'articles'} →
      </span>
    </Link>
  );
};

// Table of Contents component
interface TOCItem {
  id: string;
  text: string;
  level: number;
}

interface TableOfContentsProps {
  items: TOCItem[];
}

export const TableOfContents: React.FC<TableOfContentsProps> = ({ items }) => {
  return (
    <div className="bg-stone-50 rounded-xl p-6 sticky top-24">
      <h4 className="font-bold text-stone-900 mb-4">Table of Contents</h4>
      <nav className="space-y-2">
        {items.map((item) => (
          <a
            key={item.id}
            href={`#${item.id}`}
            className={`block text-sm text-stone-600 hover:text-purple-600 transition-colors ${
              item.level === 3 ? 'pl-4' : ''
            }`}
          >
            {item.text}
          </a>
        ))}
      </nav>
    </div>
  );
};
