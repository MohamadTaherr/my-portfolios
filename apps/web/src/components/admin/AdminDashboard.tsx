'use client';

import { FormEvent, useEffect, useMemo, useState, useRef } from 'react';
import { fetchAdminAPI, uploadFile, uploadMultipleFiles } from '@/lib/api';
import type { PortfolioItem, PortfolioMediaType } from '@/types/portfolio';

type Panel = 'portfolio' | 'categories' | 'site' | 'page' | 'structure' | 'skills' | 'clients';

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

  const [portfolioDraft, setPortfolioDraft] = useState<PortfolioDraft>(createEmptyDraft());
  const [editingPortfolioId, setEditingPortfolioId] = useState<string | null>(null);
  const [clientDraft, setClientDraft] = useState<ClientDraft>(createEmptyClient());
  const [categoryDraft, setCategoryDraft] = useState({ name: '', description: '', color: '', icon: '', order: 0 });
  const [uploadingFile, setUploadingFile] = useState(false);

  useEffect(() => {
    verifySession();
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
      const [site, page, nav, foot, skillsData, aboutData, portfolio, clientList, categoriesList] = await Promise.all([
        fetchAdminAPI('/site-settings'),
        fetchAdminAPI('/page-content'),
        fetchAdminAPI('/navigation'),
        fetchAdminAPI('/footer'),
        fetchAdminAPI('/skills'),
        fetchAdminAPI('/about'),
        fetchAdminAPI('/portfolio'),
        fetchAdminAPI('/clients'),
        fetchAdminAPI('/categories'),
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
    await fetchAdminAPI('/clients', { method: 'POST', body: JSON.stringify(clientDraft) });
    setClientDraft(createEmptyClient());
    await loadAdminData();
    triggerToast('Client added');
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
                    ✨ Paste the full URL and we'll extract the ID automatically!
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
    ];

    return (
      <form onSubmit={savePageContent} className="space-y-6">
        <header>
          <p className="text-xs uppercase tracking-[0.4em] text-white/60">Section copy</p>
          <h2 className="text-2xl font-semibold">Page content</h2>
        </header>
        {fields.map((field) => (
          <label key={field} className={labelClass}>
            {field}
            <input
              className={textInputClass}
              value={pageContent[field] || ''}
              onChange={(event) => setPageContent((prev) => ({ ...prev, [field]: event.target.value }))}
            />
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
        <form onSubmit={saveNavigation} className="space-y-4">
          <h3 className="text-xl font-semibold">Navigation</h3>
          <label className={labelClass}>
            Links JSON
            <textarea
              className={`${textInputClass} min-h-[180px]`}
              value={JSON.stringify(navigation, null, 2)}
              onChange={(event) => {
                try {
                  setNavigation(JSON.parse(event.target.value));
                  setError(null);
                } catch {
                  setError('Invalid navigation JSON');
                }
              }}
            />
          </label>
          <button type="submit" className="rounded-full bg-white text-black px-6 py-3 font-semibold">
            Save navigation
          </button>
        </form>

        <form onSubmit={saveFooter} className="space-y-4">
          <h3 className="text-xl font-semibold">Footer</h3>
          <label className={labelClass}>
            Footer JSON
            <textarea
              className={`${textInputClass} min-h-[180px]`}
              value={JSON.stringify(footer, null, 2)}
              onChange={(event) => {
                try {
                  setFooter(JSON.parse(event.target.value));
                  setError(null);
                } catch {
                  setError('Invalid footer JSON');
                }
              }}
            />
          </label>
          <button type="submit" className="rounded-full bg-white text-black px-6 py-3 font-semibold">
            Save footer
          </button>
        </form>
      </div>
    );
  }

  function renderSkillsPanel() {
    return (
      <div className="space-y-8">
        <form onSubmit={saveSkills} className="space-y-4">
          <h3 className="text-xl font-semibold">Skills & Metrics</h3>
          <label className={labelClass}>
            Skills JSON
            <textarea
              className={`${textInputClass} min-h-[200px]`}
              value={JSON.stringify(skills, null, 2)}
              onChange={(event) => {
                try {
                  setSkills(JSON.parse(event.target.value));
                  setError(null);
                } catch {
                  setError('Invalid skills JSON');
                }
              }}
            />
          </label>
          <button type="submit" className="rounded-full bg-white text-black px-6 py-3 font-semibold">
            Save skills
          </button>
        </form>

        <form onSubmit={saveAbout} className="space-y-4">
          <h3 className="text-xl font-semibold">About Section</h3>
          <label className={labelClass}>
            About JSON
            <textarea
              className={`${textInputClass} min-h-[200px]`}
              value={JSON.stringify(about, null, 2)}
              onChange={(event) => {
                try {
                  setAbout(JSON.parse(event.target.value));
                  setError(null);
                } catch {
                  setError('Invalid about JSON');
                }
              }}
            />
          </label>
          <button type="submit" className="rounded-full bg-white text-black px-6 py-3 font-semibold">
            Save about section
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
          <h3 className="text-xl font-semibold">Add client highlight</h3>
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
          <button type="submit" className="rounded-full bg-white text-black px-6 py-3 font-semibold">
            Add client
          </button>
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
                <button
                  className="px-4 py-2 rounded-full border border-rose-400/40 text-sm text-rose-300"
                  onClick={() => handleClientDelete(client.id)}
                >
                  Remove
                </button>
              </div>
            ))}
          </div>
        </div>
      </div>
    );
  }
}
