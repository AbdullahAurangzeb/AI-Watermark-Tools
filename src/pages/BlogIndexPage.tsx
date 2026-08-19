import React, { useState } from 'react';
import { Card } from '../components/ui/Card';
import { Badge } from '../components/ui/Badge';
import { Link } from '../router/RouterContext';
import { BLOG_POSTS } from '../data/blogData';
import { BookOpen, ArrowRight, Search, Tag, Calendar, Clock } from 'lucide-react';
import { AdPlaceholder } from '../components/ads/AdPlaceholder';
import { SEOHead } from '../components/seo/SEOHead';

export function BlogIndexPage() {
  const [selectedTag, setSelectedTag] = useState<string | null>(null);
  const [searchQuery, setSearchQuery] = useState('');

  const allTags = Array.from(new Set(BLOG_POSTS.flatMap((p) => p.tags)));

  const filteredPosts = BLOG_POSTS.filter((post) => {
    const matchesTag = selectedTag ? post.tags.includes(selectedTag) : true;
    const matchesSearch = searchQuery
      ? post.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
        post.description.toLowerCase().includes(searchQuery.toLowerCase())
      : true;
    return matchesTag && matchesSearch;
  });

  return (
    <div className="flex-1 w-full py-10 md:py-16">
      <SEOHead
        title="AI Text Analysis & Watermarking Blog – AI Watermark Tools"
        description="In-depth engineering guides, Unicode character breakdowns, zero-width space analysis, and technical explanations of AI text artifacts."
      />
      <div className="max-w-5xl mx-auto px-4 sm:px-6 space-y-10">
        
        {/* Header */}
        <div className="space-y-4 text-center">
          <Badge variant="purple" size="md">Knowledge Base & Research</Badge>
          <h1 className="text-3xl sm:text-4xl md:text-5xl font-extrabold text-slate-900 tracking-tight">
            AI Text Watermarking & Analysis Blog
          </h1>
          <p className="text-base sm:text-lg text-slate-600 max-w-2xl mx-auto leading-relaxed">
            In-depth engineering guides, Unicode character breakdowns, and technical explanations of AI text artifacts.
          </p>
        </div>

        {/* Search and Filters Bar */}
        <div className="flex flex-col sm:flex-row items-center justify-between gap-4 p-4 rounded-2xl bg-white border border-slate-200 shadow-xs">
          
          <div className="relative w-full sm:w-80">
            <Search className="w-4 h-4 text-slate-400 absolute left-3.5 top-1/2 -translate-y-1/2" />
            <input
              type="text"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              placeholder="Search articles & guides..."
              className="w-full pl-10 pr-4 py-2 text-sm rounded-xl border border-slate-200 focus:outline-none focus:ring-2 focus:ring-indigo-500/20 focus:border-indigo-500"
            />
          </div>

          <div className="flex items-center gap-1.5 overflow-x-auto w-full sm:w-auto pb-1 sm:pb-0">
            <button
              type="button"
              onClick={() => setSelectedTag(null)}
              className={`px-3 py-1.5 rounded-lg text-xs font-medium transition-colors shrink-0 ${
                selectedTag === null
                  ? 'bg-slate-900 text-white'
                  : 'bg-slate-100 text-slate-600 hover:bg-slate-200'
              }`}
            >
              All Articles
            </button>
            {allTags.slice(0, 4).map((tag) => (
              <button
                key={tag}
                type="button"
                onClick={() => setSelectedTag(tag === selectedTag ? null : tag)}
                className={`px-3 py-1.5 rounded-lg text-xs font-medium transition-colors shrink-0 ${
                  selectedTag === tag
                    ? 'bg-indigo-600 text-white'
                    : 'bg-slate-100 text-slate-600 hover:bg-slate-200'
                }`}
              >
                {tag}
              </button>
            ))}
          </div>

        </div>

        {/* Blog Post List */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {filteredPosts.map((post) => (
            <Card
              key={post.slug}
              variant="default"
              hoverEffect
              className="p-6 flex flex-col justify-between space-y-4 bg-white border border-slate-200/90 group"
            >
              <div className="space-y-3">
                <div className="flex items-center justify-between text-xs text-slate-500">
                  <Badge variant="purple" size="sm">
                    {post.category}
                  </Badge>
                  <span className="flex items-center gap-1">
                    <Clock className="w-3.5 h-3.5 text-slate-400" />
                    <span>{post.readTime}</span>
                  </span>
                </div>

                <h2 className="text-xl font-bold text-slate-900 group-hover:text-indigo-600 transition-colors leading-snug">
                  <Link to={`/blog/${post.slug}`}>
                    {post.title}
                  </Link>
                </h2>

                <p className="text-sm text-slate-600 leading-relaxed line-clamp-3">
                  {post.description}
                </p>
              </div>

              <div className="space-y-4 pt-4 border-t border-slate-100">
                <div className="flex flex-wrap gap-1.5">
                  {post.tags.map((t) => (
                    <span
                      key={t}
                      className="text-[11px] font-medium text-slate-500 bg-slate-100 px-2 py-0.5 rounded-md"
                    >
                      #{t}
                    </span>
                  ))}
                </div>

                <div className="flex items-center justify-between text-xs">
                  <span className="text-slate-400">Published {post.publishedDate}</span>
                  <Link
                    to={`/blog/${post.slug}`}
                    className="font-bold text-slate-900 group-hover:text-indigo-600 flex items-center gap-1"
                  >
                    <span>Read Guide</span>
                    <ArrowRight className="w-3.5 h-3.5 group-hover:translate-x-0.5 transition-transform" />
                  </Link>
                </div>
              </div>
            </Card>
          ))}
        </div>

        {/* Ad Placeholder */}
        <AdPlaceholder slot="in-content" />

      </div>
    </div>
  );
}
