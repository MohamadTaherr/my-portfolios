'use client';

import { FormEvent, useEffect, useMemo, useState, useRef } from 'react';
import { fetchAdminAPI, uploadFile, uploadMultipleFiles } from '@/lib/api';
import type { PortfolioItem, PortfolioMediaType } from '@/types/portfolio';

type Panel = 'portfolio' | 'categories' | 'site' | 'page' | 'structure' | 'skills' | 'clients' | 'analytics';

type Category = {
  id: string;
  name: string;
  description?: string;
  color?: string;
  icon?: string;
  order: number;
};

type PortfolioDraft = ReturnType<typeof createEmptyDraft>;

type ClientDraft = {
  name: string;
  project: string;
  category: string;
  description: string;
  testimonial: string;
  clientName: string;
  year: string;
  logoUrl: string;
  rating: number;
};

const textInputClass =
  'w-full rounded-xl border border-white/10 bg-white/5 px-4 py-3 text-sm text-white placeholder:text-white/40 focus:border-primary focus:outline-none';
const selectClass =
  'w-full rounded-xl border border-white/10 bg-[#1a1a2e] px-4 py-3 text-sm text-white focus:border-primary focus:outline-none [&>option]:bg-[#1a1a2e] [&>option]:text-white';
const labelClass = 'space-y-2 text-sm text-white/70';

const createEmptyDraft = () => ({
  title: '',
  summary: '',
  client: '',
  category: '',
  mediaType: 'VIDEO' as PortfolioMediaType,
  videoProvider: '',
  videoId: '',
  mediaUrl: '',
  thumbnailUrl: '',
  documentUrl: '',
  externalUrl: '',
  galleryInput: '',
  tagsInput: '',
  contentJson: '',
  featured: false,
  order: 0,
});

const createEmptyClient = (): ClientDraft => ({
  name: '',
  project: '',
  category: '',
  description: '',
  testimonial: '',
  clientName: '',
  year: '',
  logoUrl: '',
  rating: 5,
});

export default function AdminDashboard() {
  const [status, setStatus] = useState<'checking' | 'login' | 'ready'>('checking');
  const [password, setPassword] = useState('');
  const [error, setError] = useState<string | null>(null);
  const [toast, setToast] = useState<string | null>(null);
  const [activePanel, setActivePanel] = useState<Panel>('portfolio');
  const [loading, setLoading] = useState(false);

  const [siteSettings, setSiteSettings] = useState<Record<string, any>>({});
  const [pageContent, setPageContent] = useState<Record<string, any>>({});
  const [navigation, setNavigation] = useState<Record<string, any>>({});
  const [footer, setFooter] = useState<Record<string, any>>({});
  const [skills, setSkills] = useState<Record<string, any>>({});
  const [about, setAbout] = useState<Record<string, any>>({});
  const [portfolioItems, setPortfolioItems] = useState<PortfolioItem[]>([]);
  const [clients, setClients] = useState<any[]>([]);
  const [categories, setCategories] = useState<Category[]>([]);
  const [analyticsSettings, setAnalyticsSettings] = useState<Record<string, any>>({});

  const [portfolioDraft, setPortfolioDraft] = useState<PortfolioDraft>(createEmptyDraft());
  const [editingPortfolioId, setEditingPortfolioId] = useState<string | null>(null);
  const [clientDraft, setClientDraft] = useState<ClientDraft>(createEmptyClient());
  const [editingClientId, setEditingClientId] = useState<string | null>(null);
  const [categoryDraft, setCategoryDraft] = useState({ name: '', description: '', color: '', icon: '', order: 0 });
  const [uploadingFile, setUploadingFile] = useState(false);

  useEffect(() => {
    verifySession();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  useEffect(() => {
    if (!toast) return;
    const id = setTimeout(() => setToast(null), 3000);
    return () => clearTimeout(id);
  }, [toast]);

  const verifySession = async () => {
    try {
      const response = await fetchAdminAPI('/verify');
      if (response.authenticated) {
        setStatus('ready');
        await loadAdminData();
      } else {
        setStatus('login');
      }
    } catch {
      setStatus('login');
    }
  };

  const loadAdminData = async () => {
    setLoading(true);
    try {
      const [site, page, nav, foot, skillsData, aboutData, portfolio, clientList, categoriesList, analytics] = await Promise.all([
        fetchAdminAPI('/site-settings'),
        fetchAdminAPI('/page-content'),
        fetchAdminAPI('/navigation'),
        fetchAdminAPI('/footer'),
        fetchAdminAPI('/skills'),
        fetchAdminAPI('/about'),
        fetchAdminAPI('/portfolio'),
        fetchAdminAPI('/clients'),
        fetchAdminAPI('/categories'),
        fetchAdminAPI('/analytics-settings'),
      ]);

      setSiteSettings(site || {});
      setPageContent(page || {});
      setNavigation(nav || {});
      setFooter(foot || {});
      setSkills(skillsData || {});
      setAbout(aboutData || {});
      setPortfolioItems(portfolio || []);
      setClients(clientList || []);
      setCategories(categoriesList || []);
      setAnalyticsSettings(analytics || {});
    } catch (err) {
      console.error('Failed to load admin data', err);
      setError('Unable to load dashboard data. Please try again.');
    } finally {
      setLoading(false);
    }
  };

  const handleLogin = async (event: FormEvent) => {
    event.preventDefault();
    setError(null);
    try {
      await fetchAdminAPI('/login', { method: 'POST', body: JSON.stringify({ password }) });
      setStatus('ready');
      setPassword('');
      await loadAdminData();
    } catch (err) {
      console.error('Login failed', err);
      setError('Incorrect password.');
    }
  };

  const triggerToast = (message: string) => setToast(message);

  const saveSiteSettings = async (event: FormEvent) => {
    event.preventDefault();
    await fetchAdminAPI('/site-settings', { method: 'PUT', body: JSON.stringify(siteSettings) });
    triggerToast('Site settings saved');
  };

  const savePageContent = async (event: FormEvent) => {
    event.preventDefault();
    await fetchAdminAPI('/page-content', { method: 'PUT', body: JSON.stringify(pageContent) });
    triggerToast('Page content saved');
  };

  const saveNavigation = async (event: FormEvent) => {
    event.preventDefault();
    await fetchAdminAPI('/navigation', { method: 'PUT', body: JSON.stringify(navigation) });
    triggerToast('Navigation updated');
  };

  const saveFooter = async (event: FormEvent) => {
    event.preventDefault();
    await fetchAdminAPI('/footer', { method: 'PUT', body: JSON.stringify(footer) });
    triggerToast('Footer updated');
  };

  const saveSkills = async (event: FormEvent) => {
    event.preventDefault();
    await fetchAdminAPI('/skills', { method: 'PUT', body: JSON.stringify(skills) });
    triggerToast('Skills updated');
  };

  const saveAbout = async (event: FormEvent) => {
    event.preventDefault();
    await fetchAdminAPI('/about', { method: 'PUT', body: JSON.stringify(about) });
    triggerToast('About saved');
  };

  const saveAnalyticsSettings = async (event: FormEvent) => {
    event.preventDefault();
    await fetchAdminAPI('/analytics-settings', { method: 'PUT', body: JSON.stringify(analyticsSettings) });
    triggerToast('Analytics settings saved');
  };

  const resetPortfolioDraft = () => {
    setEditingPortfolioId(null);
    setPortfolioDraft(createEmptyDraft());
  };

  const parseJson = (value: string) => {
    if (!value.trim()) return {};
    try {
      return JSON.parse(value);
    } catch {
      return { body: value };
    }
  };

  const handlePortfolioSubmit = async (event: FormEvent) => {
    event.preventDefault();
    const payload = {
      title: portfolioDraft.title,
      summary: portfolioDraft.summary,
      client: portfolioDraft.client,
      category: portfolioDraft.category,
      mediaType: portfolioDraft.mediaType,
      videoProvider: portfolioDraft.videoProvider,
      videoId: portfolioDraft.videoId,
      mediaUrl: portfolioDraft.mediaUrl,
      thumbnailUrl: portfolioDraft.thumbnailUrl,
      documentUrl: portfolioDraft.documentUrl,
      externalUrl: portfolioDraft.externalUrl,
      gallery: portfolioDraft.galleryInput
        ? portfolioDraft.galleryInput.split('\n').map((img) => img.trim()).filter(Boolean)
        : [],
      tags: portfolioDraft.tagsInput
        ? portfolioDraft.tagsInput.split(',').map((tag) => tag.trim()).filter(Boolean)
        : [],
      content: parseJson(portfolioDraft.contentJson),
      featured: portfolioDraft.featured,
      order: Number(portfolioDraft.order) || 0,
    };

    if (editingPortfolioId) {
      await fetchAdminAPI(`/portfolio/${editingPortfolioId}`, { method: 'PUT', body: JSON.stringify(payload) });
      triggerToast('Portfolio item updated');
    } else {
      await fetchAdminAPI('/portfolio', { method: 'POST', body: JSON.stringify(payload) });
      triggerToast('Portfolio item created');
    }

    resetPortfolioDraft();
    await loadAdminData();
  };

  const handlePortfolioEdit = (item: PortfolioItem) => {
    setEditingPortfolioId(item.id);
    setPortfolioDraft({
      title: item.title,
      summary: item.summary || '',
      client: item.client || '',
      category: item.category || '',
      mediaType: item.mediaType,
      videoProvider: item.videoProvider || '',
      videoId: item.videoId || '',
      mediaUrl: item.mediaUrl || '',
      thumbnailUrl: item.thumbnailUrl || '',
      documentUrl: item.documentUrl || '',
      externalUrl: item.externalUrl || '',
      galleryInput: (item.gallery || []).join('\n'),
      tagsInput: (item.tags || []).join(', '),
      contentJson: item.content ? JSON.stringify(item.content, null, 2) : '',
      featured: Boolean(item.featured),
      order: item.order ?? 0,
    });
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const handlePortfolioDelete = async (id: string) => {
    if (!confirm('Delete this portfolio entry?')) return;
    await fetchAdminAPI(`/portfolio/${id}`, { method: 'DELETE' });
    triggerToast('Portfolio item deleted');
    await loadAdminData();
  };

  const handleClientSubmit = async (event: FormEvent) => {
    event.preventDefault();
    if (editingClientId) {
      await fetchAdminAPI(`/clients/${editingClientId}`, { method: 'PUT', body: JSON.stringify(clientDraft) });
      triggerToast('Client updated');
      setEditingClientId(null);
    } else {
      await fetchAdminAPI('/clients', { method: 'POST', body: JSON.stringify(clientDraft) });
      triggerToast('Client added');
    }
    setClientDraft(createEmptyClient());
    await loadAdminData();
  };

  const handleClientEdit = (client: any) => {
    setEditingClientId(client.id);
    setClientDraft({
      name: client.name || '',
      project: client.project || '',
      category: client.category || '',
      description: client.description || '',
      testimonial: client.testimonial || '',
      clientName: client.clientName || '',
      year: client.year || '',
      logoUrl: client.logoUrl || '',
      rating: client.rating || 5,
    });
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const handleClientDelete = async (id: string) => {
    if (!confirm('Remove this client testimonial?')) return;
    await fetchAdminAPI(`/clients/${id}`, { method: 'DELETE' });
    await loadAdminData();
    triggerToast('Client removed');
  };

  const sortedPortfolio = useMemo(
    () =>
      [...portfolioItems].sort((a, b) => {
        if (a.featured && !b.featured) return -1;
        if (!a.featured && b.featured) return 1;
        return (a.order ?? 0) - (b.order ?? 0);
      }),
    [portfolioItems]
  );

  const handleFileUpload = async (file: File, field: 'mediaUrl' | 'thumbnailUrl' | 'documentUrl' | 'logoUrl') => {
    try {
      setUploadingFile(true);
      const result = await uploadFile(file);
      if (field === 'logoUrl') {
        setClientDraft((prev) => ({ ...prev, logoUrl: result.url }));
      } else {
        setPortfolioDraft((prev) => ({ ...prev, [field]: result.url }));
      }
      triggerToast(`File uploaded successfully`);
    } catch (error) {
      console.error('Upload failed:', error);
      setError('File upload failed. Please try again.');
    } finally {
      setUploadingFile(false);
    }
  };

  const handleMultipleFileUpload = async (files: FileList) => {
    try {
      setUploadingFile(true);
      const fileArray = Array.from(files);
      const result = await uploadMultipleFiles(fileArray);
      const urls = result.files.map((f) => f.url);
      setPortfolioDraft((prev) => ({
        ...prev,
        galleryInput: [...(prev.galleryInput ? prev.galleryInput.split('\n') : []), ...urls].join('\n'),
      }));
      triggerToast(`${urls.length} files uploaded successfully`);
    } catch (error) {
      console.error('Upload failed:', error);
      setError('File upload failed. Please try again.');
    } finally {
      setUploadingFile(false);
    }
  };

  const handleCategorySubmit = async (event: FormEvent) => {
    event.preventDefault();
    await fetchAdminAPI('/categories', { method: 'POST', body: JSON.stringify(categoryDraft) });
    setCategoryDraft({ name: '', description: '', color: '', icon: '', order: 0 });
    await loadAdminData();
    triggerToast('Category added');
  };

  const handleCategoryDelete = async (id: string) => {
    if (!confirm('Delete this category?')) return;
    await fetchAdminAPI(`/categories/${id}`, { method: 'DELETE' });
    await loadAdminData();
    triggerToast('Category deleted');
  };

  const extractVideoIdFromUrl = (url: string): { provider: string; id: string } | null => {
    // YouTube patterns
    const youtubePatterns = [
      /(?:youtube\.com\/watch\?v=|youtu\.be\/)([^&\s]+)/,
      /youtube\.com\/embed\/([^?&\s]+)/,
      /youtube\.com\/v\/([^?&\s]+)/,
    ];

    for (const pattern of youtubePatterns) {
      const match = url.match(pattern);
      if (match) {
        return { provider: 'YouTube', id: match[1] };
      }
    }

    // Vimeo patterns
    const vimeoPatterns = [
      /vimeo\.com\/(\d+)/,
      /vimeo\.com\/video\/(\d+)/,
      /player\.vimeo\.com\/video\/(\d+)/,
    ];

    for (const pattern of vimeoPatterns) {
      const match = url.match(pattern);
      if (match) {
        return { provider: 'Vimeo', id: match[1] };
      }
    }

    return null;
  };

  const handleVideoUrlChange = (value: string) => {
    const extracted = extractVideoIdFromUrl(value);
    if (extracted) {
      setPortfolioDraft((prev) => ({
        ...prev,
        videoProvider: extracted.provider,
        videoId: extracted.id,
      }));
      triggerToast(`Extracted ${extracted.provider} video ID: ${extracted.id}`);
    } else {
      // If it's just an ID, keep it
      setPortfolioDraft((prev) => ({ ...prev, videoId: value }));
    }
  };

  if (status === 'checking') {
    return (
      <div className="min-h-screen flex items-center justify-center bg-black text-white">
        Loading admin studio...
      </div>
    );
  }

  if (status === 'login') {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-black via-[#0a0a16] to-black px-4">
        <form
          onSubmit={handleLogin}
          className="w-full max-w-md space-y-6 rounded-3xl border border-white/10 bg-white/5 p-8 backdrop-blur"
        >
          <div className="space-y-2 text-center">
            <p className="text-sm uppercase tracking-[0.4em] text-white/60">Backoffice</p>
            <h1 className="text-3xl text-white font-[family-name:var(--font-playfair)]">Enter admin password</h1>
          </div>
          <input
            type="password"
            className={textInputClass}
            placeholder="••••••••"
            value={password}
            onChange={(event) => setPassword(event.target.value)}
          />
          {error && <p className="text-sm text-rose-400">{error}</p>}
          <button type="submit" className="w-full rounded-full bg-white text-black py-3 font-semibold uppercase tracking-[0.3em]">
            Access dashboard
          </button>
        </form>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-b from-black via-[#07070d] to-black text-white">
      <div className="container mx-auto px-4 py-16 space-y-10">
        <header className="space-y-3">
          <p className="text-xs uppercase tracking-[0.5em] text-white/60">Creator Control Center</p>
          <h1 className="text-4xl md:text-5xl font-[family-name:var(--font-playfair)]">Admin Studio</h1>
          <p className="text-white/70 max-w-2xl">
            Update copy, reorder work, launch new case studies, and maintain every surface of the portfolio without touching code.
          </p>
        </header>

        <nav className="flex flex-wrap gap-3">
          {[
            { id: 'portfolio', label: 'Portfolio' },
            { id: 'categories', label: 'Categories' },
            { id: 'site', label: 'Brand Voice' },
            { id: 'page', label: 'Section Copy' },
            { id: 'structure', label: 'Navigation & Footer' },
            { id: 'skills', label: 'Skills & About' },
            { id: 'clients', label: 'Clients' },
            { id: 'analytics', label: 'Analytics' },
          ].map((tab) => (
            <button
              key={tab.id}
              onClick={() => setActivePanel(tab.id as Panel)}
              className={`px-5 py-2 rounded-full text-sm font-semibold transition ${
                activePanel === tab.id ? 'bg-white text-black' : 'bg-white/10 text-white/70 hover:bg-white/20'
              }`}
            >
              {tab.label}
            </button>
          ))}
        </nav>

        {toast && (
          <div className="rounded-2xl border border-emerald-500/30 bg-emerald-500/10 px-4 py-3 text-emerald-200 text-sm">{toast}</div>
        )}

        <div className="rounded-3xl border border-white/10 bg-white/5 backdrop-blur p-8 space-y-8">
          {loading && <p className="text-white/60">Refreshing data...</p>}
          {activePanel === 'portfolio' && renderPortfolioPanel()}
          {activePanel === 'categories' && renderCategoriesPanel()}
          {activePanel === 'site' && renderSitePanel()}
          {activePanel === 'page' && renderPagePanel()}
          {activePanel === 'structure' && renderStructurePanel()}
          {activePanel === 'skills' && renderSkillsPanel()}
          {activePanel === 'clients' && renderClientsPanel()}
          {activePanel === 'analytics' && renderAnalyticsPanel()}
        </div>
      </div>
    </div>
  );

  function renderPortfolioPanel() {
    return (
      <div className="space-y-10">
        <form onSubmit={handlePortfolioSubmit} className="grid gap-6">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-xs uppercase tracking-[0.4em] text-white/60">New / Edit</p>
              <h2 className="text-2xl font-semibold">Portfolio Item</h2>
            </div>
            {editingPortfolioId && (
              <button type="button" className="text-sm text-white/60 hover:text-white" onClick={resetPortfolioDraft}>
                Cancel edit
              </button>
            )}
          </div>

          <div className="grid gap-4 md:grid-cols-2">
            <label className={labelClass}>
              Title
              <input
                className={textInputClass}
                value={portfolioDraft.title}
                onChange={(event) => setPortfolioDraft((prev) => ({ ...prev, title: event.target.value }))}
                required
              />
            </label>
            <label className={labelClass}>
              Client / collaborator
              <input
                className={textInputClass}
                value={portfolioDraft.client}
                onChange={(event) => setPortfolioDraft((prev) => ({ ...prev, client: event.target.value }))}
              />
            </label>
            <label className={labelClass}>
              Category (required)
              <select
                className={selectClass}
                value={portfolioDraft.category}
                onChange={(event) => setPortfolioDraft((prev) => ({ ...prev, category: event.target.value }))}
                required
              >
                <option value="">Select a category</option>
                {categories.map((cat) => (
                  <option key={cat.id} value={cat.name}>
                    {cat.icon} {cat.name}
                  </option>
                ))}
              </select>
            </label>
            <label className={labelClass}>
              Media type
              <select
                className={selectClass}
                value={portfolioDraft.mediaType}
                onChange={(event) =>
                  setPortfolioDraft((prev) => ({ ...prev, mediaType: event.target.value as PortfolioMediaType }))
                }
              >
                {['VIDEO', 'ARTICLE', 'GALLERY', 'IMAGE', 'DOCUMENT', 'TEXT'].map((type) => (
                  <option key={type} value={type}>
                    {type}
                  </option>
                ))}
              </select>
            </label>
            {portfolioDraft.mediaType === 'VIDEO' && (
              <>
                <label className={labelClass}>
                  Video Provider
                  <select
                    className={selectClass}
                    value={portfolioDraft.videoProvider}
                    onChange={(event) => setPortfolioDraft((prev) => ({ ...prev, videoProvider: event.target.value }))}
                  >
                    <option value="">Select provider</option>
                    <option value="YouTube">YouTube</option>
                    <option value="Vimeo">Vimeo</option>
                  </select>
                </label>
                <label className={labelClass}>
                  Video URL or ID
                  <input
                    className={textInputClass}
                    value={portfolioDraft.videoId}
                    onChange={(event) => handleVideoUrlChange(event.target.value)}
                    placeholder="Paste full YouTube/Vimeo URL or just the video ID"
                  />
                  <p className="text-xs text-white/50 mt-1">
                    ✨ Paste the full URL and we&apos;ll extract the ID automatically!
                  </p>
                </label>
              </>
            )}

            {portfolioDraft.mediaType === 'IMAGE' && (
              <label className={labelClass}>
                Image URL
                <div className="flex gap-2">
                  <input
                    className={textInputClass}
                    value={portfolioDraft.mediaUrl}
                    onChange={(event) => setPortfolioDraft((prev) => ({ ...prev, mediaUrl: event.target.value }))}
                    placeholder="Upload an image file"
                  />
                  <label className="rounded-xl border border-white/10 bg-white/5 px-4 py-3 text-sm text-white cursor-pointer hover:bg-white/10 transition whitespace-nowrap">
                    {uploadingFile ? 'Uploading...' : 'Upload'}
                    <input
                      type="file"
                      accept="image/*"
                      className="hidden"
                      onChange={(e) => e.target.files?.[0] && handleFileUpload(e.target.files[0], 'mediaUrl')}
                      disabled={uploadingFile}
                    />
                  </label>
                </div>
              </label>
            )}
            <label className={labelClass}>
              Thumbnail URL
              <div className="flex gap-2">
                <input
                  className={textInputClass}
                  value={portfolioDraft.thumbnailUrl}
                  onChange={(event) => setPortfolioDraft((prev) => ({ ...prev, thumbnailUrl: event.target.value }))}
                />
                <label className="rounded-xl border border-white/10 bg-white/5 px-4 py-3 text-sm text-white cursor-pointer hover:bg-white/10 transition whitespace-nowrap">
                  {uploadingFile ? 'Uploading...' : 'Upload'}
                  <input
                    type="file"
                    accept="image/*"
                    className="hidden"
                    onChange={(e) => e.target.files?.[0] && handleFileUpload(e.target.files[0], 'thumbnailUrl')}
                    disabled={uploadingFile}
                  />
                </label>
              </div>
            </label>
            {portfolioDraft.mediaType === 'DOCUMENT' && (
              <label className={labelClass}>
                Document URL (PDF pitch / deck)
                <div className="flex gap-2">
                  <input
                    className={textInputClass}
                    value={portfolioDraft.documentUrl}
                    onChange={(event) => setPortfolioDraft((prev) => ({ ...prev, documentUrl: event.target.value }))}
                    placeholder="Upload a PDF document"
                  />
                  <label className="rounded-xl border border-white/10 bg-white/5 px-4 py-3 text-sm text-white cursor-pointer hover:bg-white/10 transition whitespace-nowrap">
                    {uploadingFile ? 'Uploading...' : 'Upload PDF'}
                    <input
                      type="file"
                      accept=".pdf,application/pdf"
                      className="hidden"
                      onChange={(e) => e.target.files?.[0] && handleFileUpload(e.target.files[0], 'documentUrl' as any)}
                      disabled={uploadingFile}
                    />
                  </label>
                </div>
              </label>
            )}

            {(portfolioDraft.mediaType === 'ARTICLE' || portfolioDraft.mediaType === 'TEXT') && (
              <label className={labelClass}>
                External link (optional)
                <input
                  className={textInputClass}
                  value={portfolioDraft.externalUrl}
                  onChange={(event) => setPortfolioDraft((prev) => ({ ...prev, externalUrl: event.target.value }))}
                  placeholder="Link to article or external content"
                />
              </label>
            )}
          </div>

          <label className={labelClass}>
            Summary / intro
            <textarea
              className={`${textInputClass} min-h-[120px]`}
              value={portfolioDraft.summary}
              onChange={(event) => setPortfolioDraft((prev) => ({ ...prev, summary: event.target.value }))}
            />
          </label>

          <div className="grid gap-4 md:grid-cols-2">
            {portfolioDraft.mediaType === 'GALLERY' && (
              <label className={labelClass}>
                Gallery URLs (one per line)
                <textarea
                  className={`${textInputClass} min-h-[120px]`}
                  value={portfolioDraft.galleryInput}
                  onChange={(event) => setPortfolioDraft((prev) => ({ ...prev, galleryInput: event.target.value }))}
                />
                <label className="mt-2 rounded-xl border border-white/10 bg-white/5 px-4 py-3 text-sm text-white cursor-pointer hover:bg-white/10 transition text-center block">
                  {uploadingFile ? 'Uploading...' : 'Upload Gallery Images'}
                  <input
                    type="file"
                    accept="image/*"
                    multiple
                    className="hidden"
                    onChange={(e) => e.target.files && handleMultipleFileUpload(e.target.files)}
                    disabled={uploadingFile}
                  />
                </label>
              </label>
            )}
            <label className={labelClass}>
              Tags (comma separated)
              <textarea
                className={`${textInputClass} min-h-[120px]`}
                value={portfolioDraft.tagsInput}
                onChange={(event) => setPortfolioDraft((prev) => ({ ...prev, tagsInput: event.target.value }))}
              />
            </label>
          </div>

          {(portfolioDraft.mediaType === 'ARTICLE' || portfolioDraft.mediaType === 'TEXT') && (
            <label className={labelClass}>
              Long-form content (JSON or plain text)
              <textarea
                className={`${textInputClass} min-h-[160px]`}
                value={portfolioDraft.contentJson}
                onChange={(event) => setPortfolioDraft((prev) => ({ ...prev, contentJson: event.target.value }))}
                placeholder="Enter article content or JSON with 'body' field"
              />
            </label>
          )}

          <div className="grid gap-4 md:grid-cols-3">
            <label className={`${labelClass} flex items-center gap-2`}>
              <input
                type="checkbox"
                checked={portfolioDraft.featured}
                onChange={(event) => setPortfolioDraft((prev) => ({ ...prev, featured: event.target.checked }))}
              />
              Feature on homepage
            </label>
            <label className={labelClass}>
              Order
              <input
                type="number"
                className={textInputClass}
                value={portfolioDraft.order}
                onChange={(event) => setPortfolioDraft((prev) => ({ ...prev, order: Number(event.target.value) || 0 }))}
              />
            </label>
          </div>

          <div className="flex gap-3">
            <button type="submit" className="rounded-full bg-white text-black px-6 py-3 font-semibold">
              {editingPortfolioId ? 'Update entry' : 'Publish entry'}
            </button>
            {editingPortfolioId && (
              <button type="button" className="rounded-full border border-white/30 px-6 py-3" onClick={resetPortfolioDraft}>
                Reset
              </button>
            )}
          </div>
        </form>

        <div className="space-y-4">
          <h3 className="text-xl font-semibold">Current entries</h3>
          <div className="grid gap-4">
            {sortedPortfolio.map((item) => (
              <div key={item.id} className="rounded-2xl border border-white/10 p-4 flex flex-wrap items-center gap-4 bg-white/5">
                <div className="flex-1 min-w-[200px]">
                  <p className="text-sm uppercase tracking-[0.3em] text-white/50">{item.mediaType}</p>
                  <p className="text-lg font-semibold">{item.title}</p>
                  <p className="text-white/60 text-sm">{item.category || 'Uncategorized'}</p>
                </div>
                <div className="flex gap-2">
                  <button className="px-4 py-2 rounded-full border border-white/30 text-sm" onClick={() => handlePortfolioEdit(item)}>
                    Edit
                  </button>
                  <button
                    className="px-4 py-2 rounded-full border border-rose-400/40 text-sm text-rose-300"
                    onClick={() => handlePortfolioDelete(item.id)}
                  >
                    Delete
                  </button>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    );
  }

  function renderSitePanel() {
    return (
      <form onSubmit={saveSiteSettings} className="space-y-6">
        <header>
          <p className="text-xs uppercase tracking-[0.4em] text-white/60">Brand voice</p>
          <h2 className="text-2xl font-semibold">Hero & Biography</h2>
        </header>

        {/* Cinematic Intro Toggle */}
        <div className="p-6 rounded-2xl border border-white/10 bg-white/5 space-y-4">
          <div className="flex items-start justify-between">
            <div className="space-y-2">
              <h3 className="text-lg font-semibold text-white">Cinematic Intro</h3>
              <p className="text-sm text-white/60">
                Show the animated countdown intro when users first visit your site. The intro only plays once per session.
              </p>
            </div>
            <label className="relative inline-flex items-center cursor-pointer">
              <input
                type="checkbox"
                checked={siteSettings.enableCinematicIntro ?? true}
                onChange={(e) =>
                  setSiteSettings((prev) => ({ ...prev, enableCinematicIntro: e.target.checked }))
                }
                className="sr-only peer"
              />
              <div className="w-11 h-6 bg-white/20 peer-focus:outline-none peer-focus:ring-4 peer-focus:ring-primary/20 rounded-full peer peer-checked:after:translate-x-full rtl:peer-checked:after:-translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:start-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-primary"></div>
            </label>
          </div>
        </div>

        <div className="grid gap-4 md:grid-cols-2">
          <label className={labelClass}>
            Name
            <input
              className={textInputClass}
              value={siteSettings.name || ''}
              onChange={(event) => setSiteSettings((prev) => ({ ...prev, name: event.target.value }))}
            />
          </label>
          <label className={labelClass}>
            Tagline
            <input
              className={textInputClass}
              value={siteSettings.tagline || ''}
              onChange={(event) => setSiteSettings((prev) => ({ ...prev, tagline: event.target.value }))}
            />
          </label>
          <label className={labelClass}>
            Welcome badge
            <input
              className={textInputClass}
              value={siteSettings.welcomeMessage || ''}
              onChange={(event) => setSiteSettings((prev) => ({ ...prev, welcomeMessage: event.target.value }))}
            />
          </label>
          <label className={labelClass}>
            Showreel URL
            <input
              className={textInputClass}
              value={siteSettings.showreelUrl || ''}
              onChange={(event) => setSiteSettings((prev) => ({ ...prev, showreelUrl: event.target.value }))}
            />
          </label>
        </div>
        <label className={labelClass}>
          Bio
          <textarea
            className={`${textInputClass} min-h-[120px]`}
            value={siteSettings.bio || ''}
            onChange={(event) => setSiteSettings((prev) => ({ ...prev, bio: event.target.value }))}
          />
        </label>
        <div className="grid gap-4 md:grid-cols-3">
          {['yearsExperience', 'projectsCompleted', 'clientsServed', 'industryAwards'].map((field) => (
            <label key={field} className={labelClass}>
              {field}
              <input
                type="number"
                className={textInputClass}
                value={siteSettings[field] || 0}
                onChange={(event) => setSiteSettings((prev) => ({ ...prev, [field]: Number(event.target.value) || 0 }))}
              />
            </label>
          ))}
        </div>
        <div className="grid gap-4 md:grid-cols-3">
          <label className={labelClass}>
            Email
            <input
              className={textInputClass}
              value={siteSettings.email || ''}
              onChange={(event) => setSiteSettings((prev) => ({ ...prev, email: event.target.value }))}
            />
          </label>
          <label className={labelClass}>
            Phone
            <input
              className={textInputClass}
              value={siteSettings.phone || ''}
              onChange={(event) => setSiteSettings((prev) => ({ ...prev, phone: event.target.value }))}
            />
          </label>
          <label className={labelClass}>
            Location
            <input
              className={textInputClass}
              value={siteSettings.location || ''}
              onChange={(event) => setSiteSettings((prev) => ({ ...prev, location: event.target.value }))}
            />
          </label>
        </div>
        <button type="submit" className="rounded-full bg-white text-black px-6 py-3 font-semibold">
          Save site settings
        </button>
      </form>
    );
  }

  function renderPagePanel() {
    const fields = [
      'heroHeadline',
      'heroSubheadline',
      'aboutTitle',
      'aboutSubtitle',
      'skillsTitle',
      'skillsSubtitle',
      'contactTitle',
      'contactSubtitle',
      'contactDescription',
      'clientsTitle',
      'clientsSubtitle',
    ];

    return (
      <form onSubmit={savePageContent} className="space-y-6">
        <header>
          <p className="text-xs uppercase tracking-[0.4em] text-white/60">Section copy</p>
          <h2 className="text-2xl font-semibold">Page content</h2>
          <p className="text-sm text-white/60 mt-2">
            For clientsTitle, you can use HTML like: Trusted by &lt;span className="bg-gradient-to-r from-primary to-accent bg-clip-text text-transparent"&gt;World-Class Brands&lt;/span&gt;
          </p>
        </header>
        {fields.map((field) => (
          <label key={field} className={labelClass}>
            {field}
            {field === 'clientsTitle' ? (
              <textarea
                className={`${textInputClass} min-h-[80px]`}
                value={pageContent[field] || ''}
                onChange={(event) => setPageContent((prev) => ({ ...prev, [field]: event.target.value }))}
                placeholder="e.g., Trusted by <span class='bg-gradient-to-r from-primary to-accent bg-clip-text text-transparent'>World-Class Brands</span>"
              />
            ) : (
              <input
                className={textInputClass}
                value={pageContent[field] || ''}
                onChange={(event) => setPageContent((prev) => ({ ...prev, [field]: event.target.value }))}
              />
            )}
          </label>
        ))}
        <button type="submit" className="rounded-full bg-white text-black px-6 py-3 font-semibold">
          Save page copy
        </button>
      </form>
    );
  }

  function renderStructurePanel() {
    return (
      <div className="space-y-8">
        <form onSubmit={saveNavigation} className="space-y-6">
          <h3 className="text-xl font-semibold">Navigation</h3>

          <label className={labelClass}>
            Logo Text
            <input
              type="text"
              className={textInputClass}
              value={navigation.logoText || ''}
              onChange={(e) => setNavigation({ ...navigation, logoText: e.target.value })}
              placeholder="Logo text (e.g., EH)"
            />
          </label>

          <div className="space-y-4">
            <h4 className="text-lg font-medium text-white/80">Navigation Links</h4>
            <p className="text-sm text-white/60">Main navigation menu items</p>
            {(navigation.mainNavigation || []).map((item: any, index: number) => (
              <div key={index} className="p-4 bg-white/5 rounded-lg space-y-3">
                <div className="grid grid-cols-2 gap-3">
                  <input
                    type="text"
                    className={textInputClass}
                    value={item.label || ''}
                    onChange={(e) => {
                      const newNav = [...(navigation.mainNavigation || [])];
                      newNav[index] = { ...newNav[index], label: e.target.value };
                      setNavigation({ ...navigation, mainNavigation: newNav });
                    }}
                    placeholder="Label (e.g., Home)"
                  />
                  <input
                    type="text"
                    className={textInputClass}
                    value={item.href || ''}
                    onChange={(e) => {
                      const newNav = [...(navigation.mainNavigation || [])];
                      newNav[index] = { ...newNav[index], href: e.target.value };
                      setNavigation({ ...navigation, mainNavigation: newNav });
                    }}
                    placeholder="Link (e.g., #hero)"
                  />
                </div>
                <input
                  type="number"
                  className={textInputClass}
                  value={item.order ?? index}
                  onChange={(e) => {
                    const newNav = [...(navigation.mainNavigation || [])];
                    newNav[index] = { ...newNav[index], order: parseInt(e.target.value) };
                    setNavigation({ ...navigation, mainNavigation: newNav });
                  }}
                  placeholder="Display order"
                />
                <button
                  type="button"
                  onClick={() => {
                    const newNav = (navigation.mainNavigation || []).filter((_: any, i: number) => i !== index);
                    setNavigation({ ...navigation, mainNavigation: newNav });
                  }}
                  className="px-4 py-2 bg-red-500/20 hover:bg-red-500/30 text-red-400 rounded-lg transition-colors w-full"
                >
                  Remove Link
                </button>
              </div>
            ))}
            <button
              type="button"
              onClick={() => {
                const newLink = { label: '', href: '', order: (navigation.mainNavigation || []).length };
                setNavigation({ ...navigation, mainNavigation: [...(navigation.mainNavigation || []), newLink] });
              }}
              className="px-4 py-2 bg-white/10 hover:bg-white/20 text-white rounded-lg transition-colors"
            >
              + Add Navigation Link
            </button>
          </div>

          <button type="submit" className="rounded-full bg-white text-black px-6 py-3 font-semibold hover:bg-white/90 transition-colors">
            Save Navigation
          </button>
        </form>

        <form onSubmit={saveFooter} className="space-y-6">
          <h3 className="text-xl font-semibold">Footer</h3>

          <label className={labelClass}>
            Copyright Text
            <input
              type="text"
              className={textInputClass}
              value={footer.copyrightText || ''}
              onChange={(e) => setFooter({ ...footer, copyrightText: e.target.value })}
              placeholder="© 2025 Your Name. All rights reserved."
            />
          </label>

          <label className={labelClass}>
            Tagline
            <input
              type="text"
              className={textInputClass}
              value={footer.tagline || ''}
              onChange={(e) => setFooter({ ...footer, tagline: e.target.value })}
              placeholder="Footer tagline or slogan"
            />
          </label>

          <label className="flex items-center gap-3 cursor-pointer">
            <input
              type="checkbox"
              checked={footer.showSocialLinks ?? true}
              onChange={(e) => setFooter({ ...footer, showSocialLinks: e.target.checked })}
              className="w-5 h-5 rounded border-white/20 bg-white/5 text-primary focus:ring-2 focus:ring-primary"
            />
            <span className="text-white/90">Show social links in footer</span>
          </label>

          <div className="space-y-4">
            <h4 className="text-lg font-medium text-white/80">Footer Navigation</h4>
            <p className="text-sm text-white/60">Additional footer links</p>
            {(footer.footerNavigation || []).map((item: any, index: number) => (
              <div key={index} className="p-4 bg-white/5 rounded-lg space-y-3">
                <div className="grid grid-cols-2 gap-3">
                  <input
                    type="text"
                    className={textInputClass}
                    value={item.label || ''}
                    onChange={(e) => {
                      const newNav = [...(footer.footerNavigation || [])];
                      newNav[index] = { ...newNav[index], label: e.target.value };
                      setFooter({ ...footer, footerNavigation: newNav });
                    }}
                    placeholder="Label (e.g., Privacy)"
                  />
                  <input
                    type="text"
                    className={textInputClass}
                    value={item.href || ''}
                    onChange={(e) => {
                      const newNav = [...(footer.footerNavigation || [])];
                      newNav[index] = { ...newNav[index], href: e.target.value };
                      setFooter({ ...footer, footerNavigation: newNav });
                    }}
                    placeholder="Link (e.g., /privacy)"
                  />
                </div>
                <input
                  type="number"
                  className={textInputClass}
                  value={item.order ?? index}
                  onChange={(e) => {
                    const newNav = [...(footer.footerNavigation || [])];
                    newNav[index] = { ...newNav[index], order: parseInt(e.target.value) };
                    setFooter({ ...footer, footerNavigation: newNav });
                  }}
                  placeholder="Display order"
                />
                <button
                  type="button"
                  onClick={() => {
                    const newNav = (footer.footerNavigation || []).filter((_: any, i: number) => i !== index);
                    setFooter({ ...footer, footerNavigation: newNav });
                  }}
                  className="px-4 py-2 bg-red-500/20 hover:bg-red-500/30 text-red-400 rounded-lg transition-colors w-full"
                >
                  Remove Link
                </button>
              </div>
            ))}
            <button
              type="button"
              onClick={() => {
                const newLink = { label: '', href: '', order: (footer.footerNavigation || []).length };
                setFooter({ ...footer, footerNavigation: [...(footer.footerNavigation || []), newLink] });
              }}
              className="px-4 py-2 bg-white/10 hover:bg-white/20 text-white rounded-lg transition-colors"
            >
              + Add Footer Link
            </button>
          </div>

          <button type="submit" className="rounded-full bg-white text-black px-6 py-3 font-semibold hover:bg-white/90 transition-colors">
            Save Footer
          </button>
        </form>
      </div>
    );
  }

  function renderSkillsPanel() {
    return (
      <div className="space-y-8">
        <form onSubmit={saveSkills} className="space-y-6">
          <h3 className="text-xl font-semibold">Skills & Metrics</h3>

          <div className="space-y-4">
            <h4 className="text-lg font-medium text-white/80">Statistics</h4>
            <p className="text-sm text-white/60">Add impressive numbers to showcase your achievements</p>
            {(skills.stats || []).map((stat: any, index: number) => (
              <div key={index} className="p-4 bg-white/5 rounded-lg space-y-3">
                <div className="grid grid-cols-2 gap-3">
                  <input
                    type="text"
                    className={textInputClass}
                    value={stat.number || ''}
                    onChange={(e) => {
                      const newStats = [...(skills.stats || [])];
                      newStats[index] = { ...newStats[index], number: e.target.value };
                      setSkills({ ...skills, stats: newStats });
                    }}
                    placeholder="Number (e.g., 20+)"
                  />
                  <input
                    type="text"
                    className={textInputClass}
                    value={stat.label || ''}
                    onChange={(e) => {
                      const newStats = [...(skills.stats || [])];
                      newStats[index] = { ...newStats[index], label: e.target.value };
                      setSkills({ ...skills, stats: newStats });
                    }}
                    placeholder="Label (e.g., Years Experience)"
                  />
                </div>
                <div className="grid grid-cols-2 gap-3">
                  <input
                    type="text"
                    className={textInputClass}
                    value={stat.icon || ''}
                    onChange={(e) => {
                      const newStats = [...(skills.stats || [])];
                      newStats[index] = { ...newStats[index], icon: e.target.value };
                      setSkills({ ...skills, stats: newStats });
                    }}
                    placeholder="Icon emoji (e.g., 🎬)"
                  />
                  <input
                    type="number"
                    className={textInputClass}
                    value={stat.order ?? index}
                    onChange={(e) => {
                      const newStats = [...(skills.stats || [])];
                      newStats[index] = { ...newStats[index], order: parseInt(e.target.value) };
                      setSkills({ ...skills, stats: newStats });
                    }}
                    placeholder="Display order"
                  />
                </div>
                <button
                  type="button"
                  onClick={() => {
                    const newStats = (skills.stats || []).filter((_: any, i: number) => i !== index);
                    setSkills({ ...skills, stats: newStats });
                  }}
                  className="px-4 py-2 bg-red-500/20 hover:bg-red-500/30 text-red-400 rounded-lg transition-colors w-full"
                >
                  Remove Stat
                </button>
              </div>
            ))}
            <button
              type="button"
              onClick={() => {
                const newStat = { id: Date.now().toString(), number: '', label: '', icon: '⭐', order: (skills.stats || []).length };
                setSkills({ ...skills, stats: [...(skills.stats || []), newStat] });
              }}
              className="px-4 py-2 bg-white/10 hover:bg-white/20 text-white rounded-lg transition-colors"
            >
              + Add Statistic
            </button>
          </div>

          <div className="space-y-4">
            <h4 className="text-lg font-medium text-white/80">Core Competencies</h4>
            <p className="text-sm text-white/60">Your key skills and expertise areas</p>
            {(skills.competencies || ['']).map((comp: string, index: number) => (
              <div key={index} className="flex gap-2">
                <input
                  type="text"
                  className={`${textInputClass} flex-1`}
                  value={comp}
                  onChange={(e) => {
                    const newComps = [...(skills.competencies || [''])];
                    newComps[index] = e.target.value;
                    setSkills({ ...skills, competencies: newComps });
                  }}
                  placeholder={`Competency ${index + 1} (e.g., Scriptwriting)`}
                />
                <button
                  type="button"
                  onClick={() => {
                    const newComps = (skills.competencies || ['']).filter((_: string, i: number) => i !== index);
                    setSkills({ ...skills, competencies: newComps.length > 0 ? newComps : [''] });
                  }}
                  className="px-4 py-2 bg-red-500/20 hover:bg-red-500/30 text-red-400 rounded-lg transition-colors"
                >
                  Remove
                </button>
              </div>
            ))}
            <button
              type="button"
              onClick={() => {
                const newComps = [...(skills.competencies || ['']), ''];
                setSkills({ ...skills, competencies: newComps });
              }}
              className="px-4 py-2 bg-white/10 hover:bg-white/20 text-white rounded-lg transition-colors"
            >
              + Add Competency
            </button>
          </div>

          <button type="submit" className="rounded-full bg-white text-black px-6 py-3 font-semibold hover:bg-white/90 transition-colors">
            Save Skills & Metrics
          </button>
        </form>

        <form onSubmit={saveAbout} className="space-y-6">
          <h3 className="text-xl font-semibold">About Section</h3>

          <div className="space-y-4">
            <h4 className="text-lg font-medium text-white/80">Body Paragraphs</h4>
            <p className="text-sm text-white/60">Add the main text content for your About section. First paragraph will have a large drop cap.</p>
            {(about.bodyParagraphs || ['']).map((para: string, index: number) => (
              <div key={index} className="flex gap-2">
                <textarea
                  className={`${textInputClass} min-h-[100px] flex-1`}
                  value={para}
                  onChange={(e) => {
                    const newParagraphs = [...(about.bodyParagraphs || [''])];
                    newParagraphs[index] = e.target.value;
                    setAbout({ ...about, bodyParagraphs: newParagraphs });
                  }}
                  placeholder={`Paragraph ${index + 1}`}
                />
                <button
                  type="button"
                  onClick={() => {
                    const newParagraphs = (about.bodyParagraphs || ['']).filter((_: string, i: number) => i !== index);
                    setAbout({ ...about, bodyParagraphs: newParagraphs.length > 0 ? newParagraphs : [''] });
                  }}
                  className="px-4 py-2 bg-red-500/20 hover:bg-red-500/30 text-red-400 rounded-lg transition-colors self-start"
                >
                  Remove
                </button>
              </div>
            ))}
            <button
              type="button"
              onClick={() => {
                const newParagraphs = [...(about.bodyParagraphs || ['']), ''];
                setAbout({ ...about, bodyParagraphs: newParagraphs });
              }}
              className="px-4 py-2 bg-white/10 hover:bg-white/20 text-white rounded-lg transition-colors"
            >
              + Add Paragraph
            </button>
          </div>

          <label className={labelClass}>
            Signing Name (optional)
            <input
              type="text"
              className={textInputClass}
              value={about.signingName || ''}
              onChange={(e) => setAbout({ ...about, signingName: e.target.value })}
              placeholder="Name displayed at the end (e.g., Edmond Haddad)"
            />
          </label>

          <div className="space-y-4">
            <h4 className="text-lg font-medium text-white/80">Featured Brands</h4>
            <p className="text-sm text-white/60">Brands you&apos;ve worked with (displayed in the stats sidebar)</p>
            {(about.featuredBrands || ['']).map((brand: string, index: number) => (
              <div key={index} className="flex gap-2">
                <input
                  type="text"
                  className={`${textInputClass} flex-1`}
                  value={brand}
                  onChange={(e) => {
                    const newBrands = [...(about.featuredBrands || [''])];
                    newBrands[index] = e.target.value;
                    setAbout({ ...about, featuredBrands: newBrands });
                  }}
                  placeholder={`Brand ${index + 1}`}
                />
                <button
                  type="button"
                  onClick={() => {
                    const newBrands = (about.featuredBrands || ['']).filter((_: string, i: number) => i !== index);
                    setAbout({ ...about, featuredBrands: newBrands.length > 0 ? newBrands : [''] });
                  }}
                  className="px-4 py-2 bg-red-500/20 hover:bg-red-500/30 text-red-400 rounded-lg transition-colors"
                >
                  Remove
                </button>
              </div>
            ))}
            <button
              type="button"
              onClick={() => {
                const newBrands = [...(about.featuredBrands || ['']), ''];
                setAbout({ ...about, featuredBrands: newBrands });
              }}
              className="px-4 py-2 bg-white/10 hover:bg-white/20 text-white rounded-lg transition-colors"
            >
              + Add Brand
            </button>
          </div>

          <button type="submit" className="rounded-full bg-white text-black px-6 py-3 font-semibold hover:bg-white/90 transition-colors">
            Save About Section
          </button>
        </form>
      </div>
    );
  }

  function renderCategoriesPanel() {
    return (
      <div className="space-y-8">
        <form onSubmit={handleCategorySubmit} className="space-y-4">
          <h3 className="text-xl font-semibold">Add Category</h3>
          <div className="grid gap-4 md:grid-cols-2">
            <label className={labelClass}>
              Name
              <input
                className={textInputClass}
                value={categoryDraft.name}
                onChange={(e) => setCategoryDraft((prev) => ({ ...prev, name: e.target.value }))}
                required
              />
            </label>
            <label className={labelClass}>
              Icon (emoji)
              <input
                className={textInputClass}
                value={categoryDraft.icon}
                onChange={(e) => setCategoryDraft((prev) => ({ ...prev, icon: e.target.value }))}
                placeholder="🎬"
              />
            </label>
            <label className={labelClass}>
              Color (hex)
              <input
                type="color"
                className={textInputClass}
                value={categoryDraft.color}
                onChange={(e) => setCategoryDraft((prev) => ({ ...prev, color: e.target.value }))}
              />
            </label>
            <label className={labelClass}>
              Order
              <input
                type="number"
                className={textInputClass}
                value={categoryDraft.order}
                onChange={(e) => setCategoryDraft((prev) => ({ ...prev, order: Number(e.target.value) }))}
              />
            </label>
          </div>
          <label className={labelClass}>
            Description
            <textarea
              className={`${textInputClass} min-h-[80px]`}
              value={categoryDraft.description}
              onChange={(e) => setCategoryDraft((prev) => ({ ...prev, description: e.target.value }))}
            />
          </label>
          <button type="submit" className="rounded-full bg-white text-black px-6 py-3 font-semibold">
            Add Category
          </button>
        </form>

        <div className="space-y-4">
          <h3 className="text-xl font-semibold">Existing Categories</h3>
          <div className="grid gap-4">
            {categories.map((category) => (
              <div key={category.id} className="rounded-2xl border border-white/10 p-4 flex flex-wrap items-center gap-4 bg-white/5">
                <div className="flex-1 min-w-[200px]">
                  <p className="text-lg font-semibold">
                    {category.icon} {category.name}
                  </p>
                  <p className="text-sm text-white/60">{category.description}</p>
                  {category.color && (
                    <div className="mt-2 flex items-center gap-2">
                      <div className="w-6 h-6 rounded" style={{ backgroundColor: category.color }} />
                      <span className="text-xs text-white/50">{category.color}</span>
                    </div>
                  )}
                </div>
                <button
                  className="px-4 py-2 rounded-full border border-rose-400/40 text-sm text-rose-300"
                  onClick={() => handleCategoryDelete(category.id)}
                >
                  Delete
                </button>
              </div>
            ))}
          </div>
        </div>
      </div>
    );
  }

  function renderClientsPanel() {
    return (
      <div className="space-y-8">
        <form onSubmit={handleClientSubmit} className="space-y-4">
          <div className="flex items-center justify-between">
            <h3 className="text-xl font-semibold">{editingClientId ? 'Edit Client' : 'Add Client Highlight'}</h3>
            {editingClientId && (
              <button
                type="button"
                className="text-sm text-white/60 hover:text-white"
                onClick={() => {
                  setEditingClientId(null);
                  setClientDraft(createEmptyClient());
                }}
              >
                Cancel Edit
              </button>
            )}
          </div>
          <div className="grid gap-4 md:grid-cols-2">
            {Object.entries(clientDraft).map(([key, value]) => (
              <label key={key} className={labelClass}>
                {key}
                {key === 'logoUrl' ? (
                  <div className="flex gap-2">
                    <input
                      className={textInputClass}
                      value={value}
                      onChange={(event) => setClientDraft((prev) => ({ ...prev, [key]: event.target.value }))}
                    />
                    <label className="rounded-xl border border-white/10 bg-white/5 px-4 py-3 text-sm text-white cursor-pointer hover:bg-white/10 transition whitespace-nowrap">
                      {uploadingFile ? 'Uploading...' : 'Upload'}
                      <input
                        type="file"
                        accept="image/*"
                        className="hidden"
                        onChange={(e) => e.target.files?.[0] && handleFileUpload(e.target.files[0], 'logoUrl')}
                        disabled={uploadingFile}
                      />
                    </label>
                  </div>
                ) : key === 'category' ? (
                  <select
                    className={selectClass}
                    value={value}
                    onChange={(event) => setClientDraft((prev) => ({ ...prev, [key]: event.target.value }))}
                  >
                    <option value="">Select a category</option>
                    {categories.map((cat) => (
                      <option key={cat.id} value={cat.name}>
                        {cat.icon} {cat.name}
                      </option>
                    ))}
                  </select>
                ) : (
                  <input
                    className={textInputClass}
                    type={key === 'rating' ? 'number' : 'text'}
                    value={value}
                    onChange={(event) =>
                      setClientDraft((prev) => ({
                        ...prev,
                        [key]: key === 'rating' ? Number(event.target.value) || 0 : event.target.value,
                      }))
                    }
                  />
                )}
              </label>
            ))}
          </div>
          <div className="flex gap-3">
            <button type="submit" className="rounded-full bg-white text-black px-6 py-3 font-semibold">
              {editingClientId ? 'Update Client' : 'Add Client'}
            </button>
            {editingClientId && (
              <button
                type="button"
                className="rounded-full border border-white/30 px-6 py-3"
                onClick={() => {
                  setEditingClientId(null);
                  setClientDraft(createEmptyClient());
                }}
              >
                Reset
              </button>
            )}
          </div>
        </form>

        <div className="space-y-4">
          <h3 className="text-xl font-semibold">Existing clients</h3>
          <div className="grid gap-4">
            {clients.map((client) => (
              <div key={client.id} className="rounded-2xl border border-white/10 p-4 flex flex-wrap items-center gap-4 bg-white/5">
                <div className="flex-1 min-w-[200px]">
                  <p className="text-lg font-semibold">{client.name}</p>
                  <p className="text-sm text-white/60">{client.project}</p>
                </div>
                <div className="flex gap-2">
                  <button
                    className="px-4 py-2 rounded-full border border-white/30 text-sm"
                    onClick={() => handleClientEdit(client)}
                  >
                    Edit
                  </button>
                  <button
                    className="px-4 py-2 rounded-full border border-rose-400/40 text-sm text-rose-300"
                    onClick={() => handleClientDelete(client.id)}
                  >
                    Remove
                  </button>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    );
  }

  function renderAnalyticsPanel() {
    return (
      <form onSubmit={saveAnalyticsSettings} className="space-y-6">
        <header>
          <p className="text-xs uppercase tracking-[0.4em] text-white/60">Analytics & Tracking</p>
          <h2 className="text-2xl font-semibold">Analytics Settings</h2>
          <p className="text-white/70 max-w-2xl mt-2">
            Control which analytics services are enabled on your site. Changes take effect immediately after saving.
          </p>
        </header>

        <div className="space-y-6">
          {/* Vercel Analytics */}
          <div className="p-6 rounded-2xl border border-white/10 bg-white/5 space-y-4">
            <div className="flex items-start justify-between">
              <div className="space-y-2">
                <h3 className="text-lg font-semibold text-white">Vercel Web Analytics</h3>
                <p className="text-sm text-white/60">
                  Track page views and visitor insights with Vercel&apos;s built-in analytics. Make sure to enable Web Analytics in your Vercel project settings first.
                </p>
              </div>
              <label className="relative inline-flex items-center cursor-pointer">
                <input
                  type="checkbox"
                  checked={analyticsSettings.enableVercelAnalytics || false}
                  onChange={(e) =>
                    setAnalyticsSettings((prev) => ({ ...prev, enableVercelAnalytics: e.target.checked }))
                  }
                  className="sr-only peer"
                />
                <div className="w-11 h-6 bg-white/20 peer-focus:outline-none peer-focus:ring-4 peer-focus:ring-primary/20 rounded-full peer peer-checked:after:translate-x-full rtl:peer-checked:after:-translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:start-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-primary"></div>
              </label>
            </div>
            {analyticsSettings.enableVercelAnalytics && (
              <div className="p-4 rounded-lg bg-emerald-500/10 border border-emerald-500/20 text-sm text-emerald-200">
                ✓ Vercel Analytics is enabled. Make sure you&apos;ve enabled it in your Vercel project dashboard.
              </div>
            )}
          </div>

          {/* Google Analytics */}
          <div className="p-6 rounded-2xl border border-white/10 bg-white/5 space-y-4">
            <div className="flex items-start justify-between">
              <div className="space-y-2">
                <h3 className="text-lg font-semibold text-white">Google Analytics</h3>
                <p className="text-sm text-white/60">
                  Track detailed user behavior with Google Analytics. Enter your GA4 Measurement ID (e.g., G-XXXXXXXXXX).
                </p>
              </div>
              <label className="relative inline-flex items-center cursor-pointer">
                <input
                  type="checkbox"
                  checked={analyticsSettings.enableGoogleAnalytics || false}
                  onChange={(e) =>
                    setAnalyticsSettings((prev) => ({ ...prev, enableGoogleAnalytics: e.target.checked }))
                  }
                  className="sr-only peer"
                />
                <div className="w-11 h-6 bg-white/20 peer-focus:outline-none peer-focus:ring-4 peer-focus:ring-primary/20 rounded-full peer peer-checked:after:translate-x-full rtl:peer-checked:after:-translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:start-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-primary"></div>
              </label>
            </div>
            <label className={labelClass}>
              Google Analytics Measurement ID
              <input
                type="text"
                className={textInputClass}
                value={analyticsSettings.googleAnalyticsId || ''}
                onChange={(e) =>
                  setAnalyticsSettings((prev) => ({ ...prev, googleAnalyticsId: e.target.value }))
                }
                placeholder="G-XXXXXXXXXX"
                disabled={!analyticsSettings.enableGoogleAnalytics}
              />
            </label>
            {analyticsSettings.enableGoogleAnalytics && !analyticsSettings.googleAnalyticsId && (
              <div className="p-4 rounded-lg bg-amber-500/10 border border-amber-500/20 text-sm text-amber-200">
                ⚠ Please enter your Google Analytics Measurement ID to enable tracking.
              </div>
            )}
          </div>
        </div>

        <button type="submit" className="rounded-full bg-white text-black px-6 py-3 font-semibold">
          Save analytics settings
        </button>
      </form>
    );
  }
}
