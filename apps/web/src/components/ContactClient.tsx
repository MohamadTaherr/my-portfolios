'use client';

import { useState, useEffect } from 'react';

interface ContactInfo {
  email?: string;
  phone?: string;
  location?: string;
  socialLinks?: {
    linkedin?: string;
    vimeo?: string;
    instagram?: string;
  };
}

interface PageContent {
  contactTitle?: string;
  contactSubtitle?: string;
  contactDescription?: string;
}

interface ContactClientProps {
  contactInfo: ContactInfo;
}

export default function ContactClient({ contactInfo }: ContactClientProps) {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    message: '',
  });
  const [status, setStatus] = useState<'idle' | 'loading' | 'success' | 'error'>('idle');
  const [pageContent, setPageContent] = useState<PageContent | null>(null);

  useEffect(() => {
    fetch('/api/page-content')
      .then(res => res.json())
      .then((data: PageContent) => setPageContent(data))
      .catch(err => console.error('Error fetching page content:', err));
  }, []);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setStatus('loading');

    try {
      const response = await fetch('/api/contact', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(formData),
      });

      if (!response.ok) {
        throw new Error('Failed to send message');
      }

      setStatus('success');
      setFormData({ name: '', email: '', message: '' });
      setTimeout(() => setStatus('idle'), 5000);
    } catch (error) {
      console.error('Error submitting form:', error);
      setStatus('error');
      setTimeout(() => setStatus('idle'), 5000);
    }
  };

  const contactTitle = pageContent?.contactTitle || 'Start a Conversation';
  const contactSubtitle = pageContent?.contactSubtitle || "Let's Connect";
  const contactDescription = pageContent?.contactDescription || "Ready to bring your story to life? Let's discuss your next project.";

  const socialLinks = [
    contactInfo.socialLinks?.linkedin && { name: 'LinkedIn', icon: 'in', url: contactInfo.socialLinks.linkedin },
    contactInfo.socialLinks?.vimeo && { name: 'Vimeo', icon: 'Vi', url: contactInfo.socialLinks.vimeo },
    contactInfo.socialLinks?.instagram && { name: 'Instagram', icon: 'Ig', url: contactInfo.socialLinks.instagram },
  ].filter(Boolean) as { name: string; icon: string; url: string }[];

  return (
    <section id="contact" className="relative py-32 md:py-40 overflow-hidden bg-black">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <div className="max-w-3xl mx-auto">
          {/* Section Header */}
          <div className="text-center mb-20 animate-fade-in">
            <p className="text-gold/60 text-sm tracking-[0.3em] uppercase mb-4">
              {contactSubtitle}
            </p>
            <h2 className="text-5xl md:text-6xl lg:text-7xl font-[family-name:var(--font-playfair)] text-ivory mb-6">
              {contactTitle}
            </h2>
            <p className="text-xl text-ivory/60 max-w-2xl mx-auto">
              {contactDescription}
            </p>
          </div>

          {/* Contact Form */}
          <form onSubmit={handleSubmit} className="space-y-8 mb-16">
            <div className="space-y-3">
              <label htmlFor="name" className="block text-ivory/60 text-sm tracking-wider uppercase">
                Name
              </label>
              <input
                type="text"
                id="name"
                name="name"
                value={formData.name}
                onChange={handleChange}
                required
                className="w-full px-0 py-4 bg-transparent border-0 border-b-2 border-gold/20 text-ivory text-lg placeholder:text-ivory/30 focus:outline-none spotlight-input"
                placeholder="Your name"
              />
            </div>

            <div className="space-y-3">
              <label htmlFor="email" className="block text-ivory/60 text-sm tracking-wider uppercase">
                Email
              </label>
              <input
                type="email"
                id="email"
                name="email"
                value={formData.email}
                onChange={handleChange}
                required
                className="w-full px-0 py-4 bg-transparent border-0 border-b-2 border-gold/20 text-ivory text-lg placeholder:text-ivory/30 focus:outline-none spotlight-input"
                placeholder="your@email.com"
              />
            </div>

            <div className="space-y-3">
              <label htmlFor="message" className="block text-ivory/60 text-sm tracking-wider uppercase">
                Message
              </label>
              <textarea
                id="message"
                name="message"
                value={formData.message}
                onChange={handleChange}
                required
                rows={6}
                className="w-full px-0 py-4 bg-transparent border-0 border-b-2 border-gold/20 text-ivory text-lg placeholder:text-ivory/30 focus:outline-none spotlight-input resize-none"
                placeholder="Tell me about your project..."
              />
            </div>

            <div className="pt-8">
              <button
                type="submit"
                disabled={status === 'loading'}
                className="w-full md:w-auto px-12 py-5 border border-gold/60 text-gold hover:bg-gold hover:text-black transition-all duration-500 cinematic-hover disabled:opacity-50 disabled:cursor-not-allowed"
              >
                <span className="font-[family-name:var(--font-playfair)] text-lg tracking-wider">
                  {status === 'loading' ? 'Sending...' : status === 'success' ? 'Message Sent!' : 'Send Message'}
                </span>
              </button>
            </div>

            {status === 'success' && (
              <p className="text-gold/80 text-center animate-fade-in">
                Thank you for reaching out. I&apos;ll get back to you soon.
              </p>
            )}

            {status === 'error' && (
              <p className="text-red-400/80 text-center animate-fade-in">
                Something went wrong. Please try again or email me directly.
              </p>
            )}
          </form>

          {/* Contact Info & Social */}
          <div className="glass p-10 space-y-8">
            <div className="grid grid-cols-1 md:grid-cols-3 gap-8 text-center">
              {contactInfo.email && (
                <div className="space-y-2">
                  <p className="text-gold/60 text-xs tracking-widest uppercase">Email</p>
                  <a href={\`mailto:\${contactInfo.email}\`} className="text-ivory/80 hover:text-gold transition-colors">
                    {contactInfo.email}
                  </a>
                </div>
              )}
              {contactInfo.phone && (
                <div className="space-y-2">
                  <p className="text-gold/60 text-xs tracking-widest uppercase">Phone</p>
                  <a href={\`tel:\${contactInfo.phone}\`} className="text-ivory/80 hover:text-gold transition-colors">
                    {contactInfo.phone}
                  </a>
                </div>
              )}
              {contactInfo.location && (
                <div className="space-y-2">
                  <p className="text-gold/60 text-xs tracking-widest uppercase">Location</p>
                  <p className="text-ivory/80">{contactInfo.location}</p>
                </div>
              )}
            </div>

            {socialLinks.length > 0 && (
              <>
                <div className="h-px bg-gold/20" />
                <div className="flex justify-center gap-6">
                  {socialLinks.map((social) => (
                    <a
                      key={social.name}
                      href={social.url}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="w-12 h-12 border border-gold/30 flex items-center justify-center text-gold/80 hover:border-gold hover:text-gold hover:bg-gold/5 transition-all duration-500"
                      aria-label={social.name}
                    >
                      <span className="text-xs font-bold">{social.icon}</span>
                    </a>
                  ))}
                </div>
              </>
            )}
          </div>
        </div>
      </div>

      {/* Background decorations */}
      <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-96 h-96 bg-gold/5 rounded-full blur-3xl" />
      <div className="film-grain absolute inset-0 opacity-20 pointer-events-none" />
    </section>
  );
}
