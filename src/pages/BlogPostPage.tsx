import React, { useState } from 'react';
import { useRouter, Link } from '../router/RouterContext';
import { BLOG_POSTS } from '../data/blogData';
import { Card } from '../components/ui/Card';
import { Badge } from '../components/ui/Badge';
import { AdPlaceholder } from '../components/ads/AdPlaceholder';
import { SEOHead } from '../components/seo/SEOHead';
import { Breadcrumbs } from '../components/seo/Breadcrumbs';
import { BlogContent } from '../components/blog/BlogContent';
import { ArrowLeft, Clock, Calendar, User, Tag, ArrowRight, ChevronDown } from 'lucide-react';

export function BlogPostPage() {
  const { params } = useRouter();
  const slug = params.slug;
  const [openFaqIndex, setOpenFaqIndex] = useState<number | null>(0);

  const post = BLOG_POSTS.find((p) => p.slug === slug);

  if (!post) {
    return (
      <div className="flex-1 flex flex-col items-center justify-center py-20 px-4 text-center">
        <SEOHead />
        <h1 className="text-2xl font-bold text-slate-900 mb-2">Article Not Found</h1>
        <p className="text-slate-500 mb-6">The article you are looking for does not exist or has been relocated.</p>
        <Link
          to="/blog"
          className="inline-flex items-center gap-2 px-5 py-2.5 rounded-xl bg-slate-900 text-white text-sm font-medium hover:bg-slate-800"
        >
          <ArrowLeft className="w-4 h-4" />
          <span>Back to Articles</span>
        </Link>
      </div>
    );
  }

  const otherPosts = BLOG_POSTS.filter((p) => p.slug !== slug).slice(0, 2);

  return (
    <div className="flex-1 w-full py-10 md:py-16">
      <SEOHead />
      <article className="max-w-4xl mx-auto px-4 sm:px-6 space-y-8">
        
        <Breadcrumbs />

        {/* Post Header */}
        <header className="space-y-4">
          <div className="flex items-center justify-between">
            <Badge variant="purple" size="sm">
              {post.category}
            </Badge>
          </div>
          <h1 className="text-3xl sm:text-4xl md:text-5xl font-extrabold text-slate-900 tracking-tight leading-tight">
            {post.title}
          </h1>

          <p className="text-lg text-slate-600 leading-relaxed">
            {post.description}
          </p>

          <div className="flex flex-wrap items-center gap-4 pt-2 text-xs text-slate-500 border-y border-slate-200 py-3">
            <span className="flex items-center gap-1.5 font-medium text-slate-700">
              <User className="w-3.5 h-3.5 text-slate-400" />
              <span>{post.author}</span>
            </span>
            <span>•</span>
            <span className="flex items-center gap-1.5">
              <Calendar className="w-3.5 h-3.5 text-slate-400" />
              <span>{post.publishedDate}</span>
            </span>
            <span>•</span>
            <span className="flex items-center gap-1.5">
              <Clock className="w-3.5 h-3.5 text-slate-400" />
              <span>{post.readTime}</span>
            </span>
          </div>
        </header>

        {/* Ad Placement 1: Top of Article */}
        <AdPlaceholder slot="in-content" />

        {/* Article Body Content */}
        <div className="prose prose-slate max-w-none bg-white p-6 sm:p-10 rounded-2xl border border-slate-200/80 shadow-xs space-y-5 text-slate-800">
          <BlogContent content={post.content} />
        </div>

        {/* Tags */}
        <div className="flex flex-wrap items-center gap-2 pt-2">
          <Tag className="w-4 h-4 text-slate-400" />
          {post.tags.map((tag) => (
            <span
              key={tag}
              className="text-xs font-medium text-slate-600 bg-slate-100 px-3 py-1 rounded-lg border border-slate-200/60"
            >
              #{tag}
            </span>
          ))}
        </div>

        {post.relatedTools && post.relatedTools.length > 0 && (
          <section className="space-y-4">
            <h2 className="text-xl font-bold text-slate-900">Related tools</h2>
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
              {post.relatedTools.map((tool) => (
                <Link
                  key={tool.to}
                  to={tool.to}
                  className="p-4 rounded-xl border border-slate-200 bg-white hover:border-indigo-400 transition-all group"
                >
                  <h3 className="text-sm font-semibold text-slate-900 group-hover:text-indigo-600">
                    {tool.title}
                  </h3>
                  <p className="text-xs text-slate-500 mt-1">{tool.description}</p>
                </Link>
              ))}
            </div>
          </section>
        )}

        {post.faqs && post.faqs.length > 0 && (
          <section className="space-y-4">
            <h2 className="text-xl font-bold text-slate-900">FAQ</h2>
            <div className="space-y-3">
              {post.faqs.map((faq, index) => {
                const isOpen = openFaqIndex === index;
                return (
                  <div key={faq.question} className="rounded-xl border border-slate-200 bg-white overflow-hidden">
                    <button
                      type="button"
                      onClick={() => setOpenFaqIndex(isOpen ? null : index)}
                      className="w-full text-left p-4 flex items-center justify-between gap-4 font-semibold text-slate-900 hover:text-indigo-600"
                      aria-expanded={isOpen}
                    >
                      <span className="text-sm sm:text-base">{faq.question}</span>
                      <ChevronDown className={`w-5 h-5 text-slate-400 shrink-0 transition-transform ${isOpen ? 'rotate-180' : ''}`} />
                    </button>
                    {isOpen && (
                      <div className="px-4 pb-4 text-sm text-slate-600 leading-relaxed border-t border-slate-100 pt-3">
                        {faq.answer}
                      </div>
                    )}
                  </div>
                );
              })}
            </div>
          </section>
        )}

        {/* Ad Placement 2: Bottom of Article */}
        <AdPlaceholder slot="in-content" />

        {/* Related Articles */}
        <div className="space-y-4 pt-8 border-t border-slate-200">
          <h2 className="text-xl font-bold text-slate-900">Recommended Reading</h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            {otherPosts.map((related) => (
              <Card key={related.slug} variant="default" hoverEffect className="p-5 space-y-2 flex flex-col justify-between">
                <div>
                  <span className="text-[11px] font-semibold text-indigo-600">{related.category}</span>
                  <h3 className="text-base font-bold text-slate-900 mt-1">
                    <Link to={`/blog/${related.slug}`} className="hover:text-indigo-600 transition-colors">
                      {related.title}
                    </Link>
                  </h3>
                </div>
                <div className="pt-3 border-t border-slate-100 flex items-center justify-between text-xs text-slate-500">
                  <span>{related.readTime}</span>
                  <Link to={`/blog/${related.slug}`} className="font-semibold text-slate-900 hover:text-indigo-600 flex items-center gap-1">
                    <span>Read</span>
                    <ArrowRight className="w-3 h-3" />
                  </Link>
                </div>
              </Card>
            ))}
          </div>
        </div>

      </article>
    </div>
  );
}
