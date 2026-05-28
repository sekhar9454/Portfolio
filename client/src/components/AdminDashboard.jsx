import { useState, useEffect, useCallback } from 'react';
import { useAuth } from '../context/AuthContext';
import {
  FaSignOutAlt, FaPlus, FaEdit, FaTrash, FaBlog,
  FaBookOpen, FaTimes, FaSave, FaArrowLeft, FaCheck
} from 'react-icons/fa';

export default function AdminDashboard() {
  const { admin, logout, authAxios } = useAuth();
  const [activeTab, setActiveTab] = useState('blogs');
  const [blogs, setBlogs] = useState([]);
  const [publications, setPublications] = useState([]);
  const [showForm, setShowForm] = useState(false);
  const [editing, setEditing] = useState(null);
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);
  const [deleteConfirm, setDeleteConfirm] = useState(null);
  const [toast, setToast] = useState(null);

  // Blog form state
  const [blogForm, setBlogForm] = useState({
    title: '', content: '', excerpt: '', tags: '', published: false
  });

  // Publication form state
  const [pubForm, setPubForm] = useState({
    title: '', type: 'journal', venue: '', year: '', authors: '',
    doi: '', indexing: '', impactFactor: '', quartile: '', status: 'Published', role: ''
  });

  const showToast = (message, type = 'success') => {
    setToast({ message, type });
    setTimeout(() => setToast(null), 3000);
  };

  // Fetch data — used for initial load and manual refresh after mutations
  const fetchData = useCallback(async () => {
    setLoading(true);
    try {
      const [blogsRes, pubsRes] = await Promise.all([
        authAxios.get('/api/blogs?all=true'),
        authAxios.get('/api/publications')
      ]);
      setBlogs(blogsRes.data);
      setPublications(pubsRes.data);
    } catch {
      showToast('Failed to load data', 'error');
    } finally {
      setLoading(false);
    }
  }, [authAxios]);

  // Initial data load
  // eslint-disable-next-line react-hooks/set-state-in-effect
  useEffect(() => { fetchData(); }, [fetchData]);

  // ===== Blog CRUD =====
  const openBlogForm = (blog = null) => {
    if (blog) {
      setEditing(blog._id);
      setBlogForm({
        title: blog.title,
        content: blog.content,
        excerpt: blog.excerpt || '',
        tags: blog.tags?.join(', ') || '',
        published: blog.published
      });
    } else {
      setEditing(null);
      setBlogForm({ title: '', content: '', excerpt: '', tags: '', published: false });
    }
    setShowForm(true);
  };

  const saveBlog = async (e) => {
    e.preventDefault();
    setSaving(true);
    try {
      const payload = {
        ...blogForm,
        tags: blogForm.tags.split(',').map(t => t.trim()).filter(Boolean)
      };
      if (editing) {
        await authAxios.put(`/api/blogs/${editing}`, payload);
        showToast('Blog updated successfully');
      } else {
        await authAxios.post('/api/blogs', payload);
        showToast('Blog created successfully');
      }
      setShowForm(false);
      fetchData();
    } catch (err) {
      showToast(err.response?.data?.message || 'Failed to save blog', 'error');
    } finally {
      setSaving(false);
    }
  };

  const deleteBlog = async (id) => {
    try {
      await authAxios.delete(`/api/blogs/${id}`);
      showToast('Blog deleted');
      setDeleteConfirm(null);
      fetchData();
    } catch {
      showToast('Failed to delete blog', 'error');
    }
  };

  // ===== Publication CRUD =====
  const openPubForm = (pub = null) => {
    if (pub) {
      setEditing(pub._id);
      setPubForm({
        title: pub.title,
        type: pub.type,
        venue: pub.venue,
        year: pub.year,
        authors: pub.authors || '',
        doi: pub.doi || '',
        indexing: pub.indexing || '',
        impactFactor: pub.impactFactor || '',
        quartile: pub.quartile || '',
        status: pub.status || 'Published',
        role: pub.role || ''
      });
    } else {
      setEditing(null);
      setPubForm({
        title: '', type: 'journal', venue: '', year: '', authors: '',
        doi: '', indexing: '', impactFactor: '', quartile: '', status: 'Published', role: ''
      });
    }
    setShowForm(true);
  };

  const savePub = async (e) => {
    e.preventDefault();
    setSaving(true);
    try {
      if (editing) {
        await authAxios.put(`/api/publications/${editing}`, pubForm);
        showToast('Publication updated successfully');
      } else {
        await authAxios.post('/api/publications', pubForm);
        showToast('Publication created successfully');
      }
      setShowForm(false);
      fetchData();
    } catch (err) {
      showToast(err.response?.data?.message || 'Failed to save publication', 'error');
    } finally {
      setSaving(false);
    }
  };

  const deletePub = async (id) => {
    try {
      await authAxios.delete(`/api/publications/${id}`);
      showToast('Publication deleted');
      setDeleteConfirm(null);
      fetchData();
    } catch {
      showToast('Failed to delete publication', 'error');
    }
  };

  return (
    <div className="min-h-screen" style={{ backgroundColor: 'var(--color-bg)' }}>
      {/* Toast */}
      {toast && (
        <div
          className="fixed top-4 right-4 z-50 px-5 py-3 rounded-xl shadow-xl text-sm font-medium flex items-center gap-2 animate-fade-in-up"
          style={{
            backgroundColor: toast.type === 'error' ? '#ef4444' : 'var(--color-accent)',
            color: 'white'
          }}
        >
          {toast.type === 'error' ? <FaTimes /> : <FaCheck />}
          {toast.message}
        </div>
      )}

      {/* Header */}
      <header
        className="sticky top-0 z-40 shadow-lg"
        style={{ backgroundColor: 'var(--color-primary)' }}
      >
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between h-16">
            <div className="flex items-center gap-4">
              <a href="#/" className="text-white/60 hover:text-white transition-colors text-sm flex items-center gap-1">
                <FaArrowLeft size={12} /> Portfolio
              </a>
              <div className="h-6 w-px bg-white/20" />
              <h1 className="text-white font-bold text-lg">Admin Dashboard</h1>
            </div>
            <div className="flex items-center gap-4">
              <span className="text-white/60 text-sm hidden sm:inline">Welcome, {admin?.username}</span>
              <button
                id="admin-logout-btn"
                onClick={logout}
                className="flex items-center gap-2 px-3 py-1.5 rounded-lg text-sm text-white/70 hover:text-white hover:bg-white/10 transition-all cursor-pointer"
              >
                <FaSignOutAlt /> Logout
              </button>
            </div>
          </div>
        </div>
      </header>

      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Tabs */}
        <div className="flex gap-2 mb-8">
          {[
            { id: 'blogs', label: 'Blogs', icon: <FaBlog /> },
            { id: 'publications', label: 'Publications', icon: <FaBookOpen /> }
          ].map(tab => (
            <button
              key={tab.id}
              onClick={() => { setActiveTab(tab.id); setShowForm(false); }}
              className={`flex items-center gap-2 px-5 py-2.5 rounded-xl text-sm font-semibold transition-all cursor-pointer ${
                activeTab === tab.id ? 'shadow-lg' : 'hover:opacity-80'
              }`}
              style={{
                backgroundColor: activeTab === tab.id ? 'var(--color-accent)' : 'var(--color-card)',
                color: activeTab === tab.id ? 'white' : 'var(--color-text)',
                border: `1px solid ${activeTab === tab.id ? 'transparent' : 'var(--color-border)'}`
              }}
            >
              {tab.icon} {tab.label}
            </button>
          ))}
        </div>

        {loading ? (
          <div className="flex items-center justify-center py-20">
            <div className="w-10 h-10 border-3 rounded-full animate-spin" style={{ borderColor: 'var(--color-border)', borderTopColor: 'var(--color-accent)' }} />
          </div>
        ) : showForm ? (
          /* ===== FORM VIEW ===== */
          <div className="rounded-2xl border p-6 md:p-8" style={{ backgroundColor: 'var(--color-card)', borderColor: 'var(--color-border)' }}>
            <div className="flex items-center justify-between mb-6">
              <h2 className="text-xl font-bold" style={{ color: 'var(--color-text)' }}>
                {editing ? 'Edit' : 'Create'} {activeTab === 'blogs' ? 'Blog' : 'Publication'}
              </h2>
              <button onClick={() => setShowForm(false)} className="p-2 rounded-lg hover:bg-black/5 transition-colors cursor-pointer" style={{ color: 'var(--color-text-secondary)' }}>
                <FaTimes />
              </button>
            </div>

            {activeTab === 'blogs' ? (
              <form onSubmit={saveBlog} className="space-y-5">
                <div>
                  <label className="block text-xs font-semibold mb-1.5 uppercase tracking-wider" style={{ color: 'var(--color-text-secondary)' }}>Title *</label>
                  <input className="admin-input" value={blogForm.title} onChange={e => setBlogForm({ ...blogForm, title: e.target.value })} required placeholder="Blog title" />
                </div>
                <div>
                  <label className="block text-xs font-semibold mb-1.5 uppercase tracking-wider" style={{ color: 'var(--color-text-secondary)' }}>Content *</label>
                  <textarea className="admin-textarea" rows={8} value={blogForm.content} onChange={e => setBlogForm({ ...blogForm, content: e.target.value })} required placeholder="Write your blog content..." />
                </div>
                <div className="grid md:grid-cols-2 gap-5">
                  <div>
                    <label className="block text-xs font-semibold mb-1.5 uppercase tracking-wider" style={{ color: 'var(--color-text-secondary)' }}>Excerpt</label>
                    <textarea className="admin-textarea" rows={3} value={blogForm.excerpt} onChange={e => setBlogForm({ ...blogForm, excerpt: e.target.value })} placeholder="Brief summary (auto-generated if empty)" />
                  </div>
                  <div>
                    <label className="block text-xs font-semibold mb-1.5 uppercase tracking-wider" style={{ color: 'var(--color-text-secondary)' }}>Tags (comma-separated)</label>
                    <input className="admin-input" value={blogForm.tags} onChange={e => setBlogForm({ ...blogForm, tags: e.target.value })} placeholder="Research, AI, Security" />
                    <div className="flex items-center gap-2 mt-4">
                      <input
                        type="checkbox"
                        id="blog-published"
                        checked={blogForm.published}
                        onChange={e => setBlogForm({ ...blogForm, published: e.target.checked })}
                        className="w-4 h-4 rounded cursor-pointer"
                      />
                      <label htmlFor="blog-published" className="text-sm cursor-pointer" style={{ color: 'var(--color-text)' }}>Published</label>
                    </div>
                  </div>
                </div>
                <div className="flex gap-3 pt-2">
                  <button type="submit" disabled={saving} className="admin-btn admin-btn-primary">
                    {saving ? <div className="w-4 h-4 border-2 border-white/30 border-t-white rounded-full animate-spin" /> : <FaSave />}
                    {editing ? 'Update' : 'Create'} Blog
                  </button>
                  <button type="button" onClick={() => setShowForm(false)} className="admin-btn admin-btn-secondary">Cancel</button>
                </div>
              </form>
            ) : (
              <form onSubmit={savePub} className="space-y-5">
                <div>
                  <label className="block text-xs font-semibold mb-1.5 uppercase tracking-wider" style={{ color: 'var(--color-text-secondary)' }}>Title *</label>
                  <input className="admin-input" value={pubForm.title} onChange={e => setPubForm({ ...pubForm, title: e.target.value })} required placeholder="Publication title" />
                </div>
                <div className="grid md:grid-cols-3 gap-5">
                  <div>
                    <label className="block text-xs font-semibold mb-1.5 uppercase tracking-wider" style={{ color: 'var(--color-text-secondary)' }}>Type *</label>
                    <select className="admin-input" value={pubForm.type} onChange={e => setPubForm({ ...pubForm, type: e.target.value })}>
                      <option value="journal">Journal</option>
                      <option value="conference">Conference</option>
                    </select>
                  </div>
                  <div>
                    <label className="block text-xs font-semibold mb-1.5 uppercase tracking-wider" style={{ color: 'var(--color-text-secondary)' }}>Year *</label>
                    <input className="admin-input" value={pubForm.year} onChange={e => setPubForm({ ...pubForm, year: e.target.value })} required placeholder="2025" />
                  </div>
                  <div>
                    <label className="block text-xs font-semibold mb-1.5 uppercase tracking-wider" style={{ color: 'var(--color-text-secondary)' }}>Status</label>
                    <select className="admin-input" value={pubForm.status} onChange={e => setPubForm({ ...pubForm, status: e.target.value })}>
                      <option value="Published">Published</option>
                      <option value="Accepted">Accepted</option>
                      <option value="Under Review">Under Review</option>
                      <option value="Under Revision">Under Revision</option>
                    </select>
                  </div>
                </div>
                <div>
                  <label className="block text-xs font-semibold mb-1.5 uppercase tracking-wider" style={{ color: 'var(--color-text-secondary)' }}>Venue (Journal/Conference name) *</label>
                  <input className="admin-input" value={pubForm.venue} onChange={e => setPubForm({ ...pubForm, venue: e.target.value })} required placeholder="Journal or conference name" />
                </div>
                <div className="grid md:grid-cols-2 gap-5">
                  <div>
                    <label className="block text-xs font-semibold mb-1.5 uppercase tracking-wider" style={{ color: 'var(--color-text-secondary)' }}>Authors</label>
                    <input className="admin-input" value={pubForm.authors} onChange={e => setPubForm({ ...pubForm, authors: e.target.value })} placeholder="Author names" />
                  </div>
                  <div>
                    <label className="block text-xs font-semibold mb-1.5 uppercase tracking-wider" style={{ color: 'var(--color-text-secondary)' }}>Role</label>
                    <input className="admin-input" value={pubForm.role} onChange={e => setPubForm({ ...pubForm, role: e.target.value })} placeholder="e.g., First & Corresponding author" />
                  </div>
                </div>
                <div className="grid md:grid-cols-4 gap-5">
                  <div>
                    <label className="block text-xs font-semibold mb-1.5 uppercase tracking-wider" style={{ color: 'var(--color-text-secondary)' }}>DOI</label>
                    <input className="admin-input" value={pubForm.doi} onChange={e => setPubForm({ ...pubForm, doi: e.target.value })} placeholder="10.xxxx/xxxxx" />
                  </div>
                  <div>
                    <label className="block text-xs font-semibold mb-1.5 uppercase tracking-wider" style={{ color: 'var(--color-text-secondary)' }}>Indexing</label>
                    <input className="admin-input" value={pubForm.indexing} onChange={e => setPubForm({ ...pubForm, indexing: e.target.value })} placeholder="SCIE, ESCI, Scopus" />
                  </div>
                  <div>
                    <label className="block text-xs font-semibold mb-1.5 uppercase tracking-wider" style={{ color: 'var(--color-text-secondary)' }}>Impact Factor</label>
                    <input className="admin-input" value={pubForm.impactFactor} onChange={e => setPubForm({ ...pubForm, impactFactor: e.target.value })} placeholder="3.7" />
                  </div>
                  <div>
                    <label className="block text-xs font-semibold mb-1.5 uppercase tracking-wider" style={{ color: 'var(--color-text-secondary)' }}>Quartile</label>
                    <select className="admin-input" value={pubForm.quartile} onChange={e => setPubForm({ ...pubForm, quartile: e.target.value })}>
                      <option value="">None</option>
                      <option value="Q1">Q1</option>
                      <option value="Q2">Q2</option>
                      <option value="Q3">Q3</option>
                      <option value="Q4">Q4</option>
                    </select>
                  </div>
                </div>
                <div className="flex gap-3 pt-2">
                  <button type="submit" disabled={saving} className="admin-btn admin-btn-primary">
                    {saving ? <div className="w-4 h-4 border-2 border-white/30 border-t-white rounded-full animate-spin" /> : <FaSave />}
                    {editing ? 'Update' : 'Create'} Publication
                  </button>
                  <button type="button" onClick={() => setShowForm(false)} className="admin-btn admin-btn-secondary">Cancel</button>
                </div>
              </form>
            )}
          </div>
        ) : (
          /* ===== LIST VIEW ===== */
          <div>
            <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between mb-6 gap-4">
              <h2 className="text-xl font-bold" style={{ color: 'var(--color-text)' }}>
                {activeTab === 'blogs' ? `Blogs (${blogs.length})` : `Publications (${publications.length})`}
              </h2>
              <button
                id="admin-create-btn"
                onClick={() => activeTab === 'blogs' ? openBlogForm() : openPubForm()}
                className="admin-btn admin-btn-primary"
              >
                <FaPlus /> New {activeTab === 'blogs' ? 'Blog' : 'Publication'}
              </button>
            </div>

            {activeTab === 'blogs' ? (
              blogs.length === 0 ? (
                <div className="text-center py-16 rounded-2xl border" style={{ backgroundColor: 'var(--color-card)', borderColor: 'var(--color-border)' }}>
                  <FaBlog className="text-4xl mx-auto mb-3" style={{ color: 'var(--color-text-secondary)', opacity: 0.3 }} />
                  <p className="text-sm" style={{ color: 'var(--color-text-secondary)' }}>No blogs yet. Create your first blog post!</p>
                </div>
              ) : (
                <div className="space-y-3">
                  {blogs.map(blog => (
                    <div
                      key={blog._id}
                      className="rounded-xl border p-5 transition-all hover:shadow-md"
                      style={{ backgroundColor: 'var(--color-card)', borderColor: 'var(--color-border)' }}
                    >
                      <div className="flex flex-col sm:flex-row items-start justify-between gap-3">
                        <div className="flex-1 min-w-0">
                          <div className="flex items-center gap-2 mb-1 flex-wrap">
                            <h3 className="font-bold text-sm" style={{ color: 'var(--color-text)' }}>{blog.title}</h3>
                            <span
                              className="px-2 py-0.5 rounded-full text-xs font-semibold"
                              style={{
                                backgroundColor: blog.published ? 'rgba(5,150,105,0.1)' : 'rgba(107,114,128,0.1)',
                                color: blog.published ? '#059669' : '#6b7280'
                              }}
                            >
                              {blog.published ? 'Published' : 'Draft'}
                            </span>
                          </div>
                          <p className="text-xs mb-2 line-clamp-2" style={{ color: 'var(--color-text-secondary)' }}>{blog.excerpt}</p>
                          <div className="flex flex-wrap gap-1.5">
                            {blog.tags?.map((tag, i) => (
                              <span key={i} className="px-2 py-0.5 rounded text-xs" style={{ backgroundColor: 'var(--color-badge-bg)', color: 'var(--color-badge-text)' }}>{tag}</span>
                            ))}
                            <span className="text-xs" style={{ color: 'var(--color-text-secondary)' }}>
                              {new Date(blog.createdAt).toLocaleDateString()}
                            </span>
                          </div>
                        </div>
                        <div className="flex gap-2 flex-shrink-0">
                          <button onClick={() => openBlogForm(blog)} className="admin-btn admin-btn-secondary" style={{ padding: '0.375rem 0.75rem' }}>
                            <FaEdit size={12} />
                          </button>
                          {deleteConfirm === blog._id ? (
                            <div className="flex gap-1">
                              <button onClick={() => deleteBlog(blog._id)} className="admin-btn admin-btn-danger" style={{ padding: '0.375rem 0.75rem', fontSize: '0.75rem' }}>Confirm</button>
                              <button onClick={() => setDeleteConfirm(null)} className="admin-btn admin-btn-secondary" style={{ padding: '0.375rem 0.75rem', fontSize: '0.75rem' }}>Cancel</button>
                            </div>
                          ) : (
                            <button onClick={() => setDeleteConfirm(blog._id)} className="admin-btn admin-btn-danger" style={{ padding: '0.375rem 0.75rem' }}>
                              <FaTrash size={12} />
                            </button>
                          )}
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              )
            ) : (
              publications.length === 0 ? (
                <div className="text-center py-16 rounded-2xl border" style={{ backgroundColor: 'var(--color-card)', borderColor: 'var(--color-border)' }}>
                  <FaBookOpen className="text-4xl mx-auto mb-3" style={{ color: 'var(--color-text-secondary)', opacity: 0.3 }} />
                  <p className="text-sm" style={{ color: 'var(--color-text-secondary)' }}>No publications yet. Add your first publication!</p>
                </div>
              ) : (
                <div className="overflow-x-auto rounded-xl border" style={{ borderColor: 'var(--color-border)' }}>
                  <table className="admin-table">
                    <thead>
                      <tr>
                        <th>Title</th>
                        <th className="hidden md:table-cell">Type</th>
                        <th className="hidden lg:table-cell">Venue</th>
                        <th>Year</th>
                        <th className="hidden md:table-cell">Quartile</th>
                        <th>Actions</th>
                      </tr>
                    </thead>
                    <tbody>
                      {publications.map(pub => (
                        <tr key={pub._id}>
                          <td>
                            <div className="max-w-xs">
                              <p className="font-medium text-xs leading-snug" style={{ color: 'var(--color-text)' }}>{pub.title}</p>
                              <p className="text-xs mt-1 md:hidden" style={{ color: 'var(--color-text-secondary)' }}>
                                {pub.type === 'journal' ? '📄 Journal' : '🎤 Conference'} • {pub.year}
                              </p>
                            </div>
                          </td>
                          <td className="hidden md:table-cell">
                            <span
                              className="px-2 py-0.5 rounded-full text-xs font-semibold"
                              style={{
                                backgroundColor: pub.type === 'journal' ? 'var(--color-badge-bg)' : 'rgba(245,158,11,0.1)',
                                color: pub.type === 'journal' ? 'var(--color-badge-text)' : '#d97706'
                              }}
                            >
                              {pub.type}
                            </span>
                          </td>
                          <td className="hidden lg:table-cell">
                            <p className="text-xs max-w-xs truncate" style={{ color: 'var(--color-text-secondary)' }}>{pub.venue}</p>
                          </td>
                          <td><span className="text-sm font-mono">{pub.year}</span></td>
                          <td className="hidden md:table-cell">
                            {pub.quartile && (
                              <span
                                className="px-2 py-0.5 rounded text-xs font-bold text-white"
                                style={{ backgroundColor: pub.quartile === 'Q1' ? 'var(--color-q1)' : 'var(--color-q2)' }}
                              >
                                {pub.quartile}
                              </span>
                            )}
                          </td>
                          <td>
                            <div className="flex gap-1">
                              <button onClick={() => openPubForm(pub)} className="admin-btn admin-btn-secondary" style={{ padding: '0.25rem 0.5rem' }}>
                                <FaEdit size={11} />
                              </button>
                              {deleteConfirm === pub._id ? (
                                <div className="flex gap-1">
                                  <button onClick={() => deletePub(pub._id)} className="admin-btn admin-btn-danger" style={{ padding: '0.25rem 0.5rem', fontSize: '0.65rem' }}>Yes</button>
                                  <button onClick={() => setDeleteConfirm(null)} className="admin-btn admin-btn-secondary" style={{ padding: '0.25rem 0.5rem', fontSize: '0.65rem' }}>No</button>
                                </div>
                              ) : (
                                <button onClick={() => setDeleteConfirm(pub._id)} className="admin-btn admin-btn-danger" style={{ padding: '0.25rem 0.5rem' }}>
                                  <FaTrash size={11} />
                                </button>
                              )}
                            </div>
                          </td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              )
            )}
          </div>
        )}
      </main>
    </div>
  );
}
