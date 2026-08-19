import React, { useState } from 'react';
import { Card } from '../components/ui/Card';
import { Button } from '../components/ui/Button';
import { Badge } from '../components/ui/Badge';
import { Mail, MessageSquare, Check, HelpCircle, Send } from 'lucide-react';
import { AdPlaceholder } from '../components/ads/AdPlaceholder';
import { SEOHead } from '../components/seo/SEOHead';

export function ContactPage() {
  const [submitted, setSubmitted] = useState(false);
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    subject: 'General Inquiry',
    message: '',
  });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!formData.email || !formData.message) return;
    setSubmitted(true);
  };

  return (
    <div className="flex-1 w-full py-10 md:py-16">
      <SEOHead
        title="Contact Us – AI Watermark Tools"
        description="Get in touch with the AI Watermark Tools team for feedback, feature requests, or inquiries."
      />
      <div className="max-w-3xl mx-auto px-4 sm:px-6 space-y-10">
        
        {/* Header */}
        <div className="space-y-3 text-center">
          <Badge variant="purple" size="md">Contact & Feedback</Badge>
          <h1 className="text-3xl sm:text-4xl font-extrabold text-slate-900 tracking-tight">
            Get in Touch
          </h1>
          <p className="text-base text-slate-600 max-w-xl mx-auto">
            Have questions, feedback, or a feature request regarding our text cleaning algorithms? We'd love to hear from you.
          </p>
        </div>

        <Card variant="elevated" className="p-6 sm:p-8 bg-white border border-slate-200">
          {submitted ? (
            <div className="text-center py-10 space-y-4">
              <div className="w-12 h-12 rounded-full bg-emerald-50 text-emerald-600 flex items-center justify-center mx-auto">
                <Check className="w-6 h-6" />
              </div>
              <h2 className="text-2xl font-bold text-slate-900">Message Received!</h2>
              <p className="text-sm text-slate-600 max-w-md mx-auto">
                Thank you for reaching out. We will review your inquiry and respond as soon as possible.
              </p>
              <Button
                variant="outline"
                size="sm"
                onClick={() => {
                  setSubmitted(false);
                  setFormData({ name: '', email: '', subject: 'General Inquiry', message: '' });
                }}
              >
                Send Another Message
              </Button>
            </div>
          ) : (
            <form onSubmit={handleSubmit} className="space-y-5">
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div className="space-y-1.5">
                  <label htmlFor="contact-name" className="text-xs font-semibold text-slate-700">
                    Your Name
                  </label>
                  <input
                    id="contact-name"
                    type="text"
                    required
                    value={formData.name}
                    onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                    placeholder="Jane Doe"
                    className="w-full rounded-xl border border-slate-200 px-3.5 py-2.5 text-sm text-slate-900 placeholder:text-slate-400 focus:border-indigo-500 focus:outline-none focus:ring-2 focus:ring-indigo-500/20"
                  />
                </div>

                <div className="space-y-1.5">
                  <label htmlFor="contact-email" className="text-xs font-semibold text-slate-700">
                    Email Address
                  </label>
                  <input
                    id="contact-email"
                    type="email"
                    required
                    value={formData.email}
                    onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                    placeholder="jane@example.com"
                    className="w-full rounded-xl border border-slate-200 px-3.5 py-2.5 text-sm text-slate-900 placeholder:text-slate-400 focus:border-indigo-500 focus:outline-none focus:ring-2 focus:ring-indigo-500/20"
                  />
                </div>
              </div>

              <div className="space-y-1.5">
                <label htmlFor="contact-subject" className="text-xs font-semibold text-slate-700">
                  Topic / Subject
                </label>
                <select
                  id="contact-subject"
                  value={formData.subject}
                  onChange={(e) => setFormData({ ...formData, subject: e.target.value })}
                  className="w-full rounded-xl border border-slate-200 px-3.5 py-2.5 text-sm text-slate-900 focus:border-indigo-500 focus:outline-none focus:ring-2 focus:ring-indigo-500/20"
                >
                  <option value="General Inquiry">General Inquiry</option>
                  <option value="Bug Report">Bug Report / Text Parsing Issue</option>
                  <option value="Feature Request">Feature Request</option>
                  <option value="Partnership">Partnership / Advertising</option>
                </select>
              </div>

              <div className="space-y-1.5">
                <label htmlFor="contact-message" className="text-xs font-semibold text-slate-700">
                  Message
                </label>
                <textarea
                  id="contact-message"
                  required
                  rows={5}
                  value={formData.message}
                  onChange={(e) => setFormData({ ...formData, message: e.target.value })}
                  placeholder="Describe your question or feedback..."
                  className="w-full rounded-xl border border-slate-200 p-3.5 text-sm text-slate-900 placeholder:text-slate-400 focus:border-indigo-500 focus:outline-none focus:ring-2 focus:ring-indigo-500/20"
                />
              </div>

              <div className="pt-2">
                <Button
                  type="submit"
                  variant="primary"
                  size="md"
                  className="w-full sm:w-auto"
                  rightIcon={<Send className="w-4 h-4" />}
                >
                  Send Inquiry
                </Button>
              </div>
            </form>
          )}
        </Card>

        <AdPlaceholder slot="in-content" />

      </div>
    </div>
  );
}
