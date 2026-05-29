import { useState, useEffect } from 'react';
import axios from 'axios';
import Section from '../components/Section';
import { FaBlog, FaCalendar, FaTag } from 'react-icons/fa';

export default function Blogs() {
  const [blogs, setBlogs] = useState([]);
  const [expanded, setExpanded] = useState(null);

  useEffect(() => {
    axios.get('/api/blogs')
      .then(res => setBlogs(res.data))
      .catch(() => { });
  }, []);

  if (blogs.length === 0) return null;

  return (
    <Section id="blogs" title="Blog & Insights" icon={<FaBlog />} alt>
      <div className="space-y-6">
        {blogs.map(blog => (
          <article
            key={blog._id}
            className="rounded-xl border overflow-hidden transition-all duration-300 hover:-translate-y-1 hover:shadow-xl group"
            style={{ backgroundColor: 'var(--color-card)', borderColor: 'var(--color-border)' }}
          >
            {/* Header gradient bar */}
            <div className="h-1.5" style={{ background: `linear-gradient(90deg, var(--color-primary), var(--color-accent))` }} />

            <div className="p-6">
              <h3
                className="font-bold text-lg mb-3 transition-colors"
                style={{ color: 'var(--color-text)', fontFamily: "'Playfair Display', serif" }}
              >
                {blog.title}
              </h3>

              <div className="flex flex-wrap items-center gap-3 mb-4 text-xs" style={{ color: 'var(--color-text-secondary)' }}>
                <span className="flex items-center gap-1.5">
                  <FaCalendar size={10} />
                  {new Date(blog.createdAt).toLocaleDateString('en-US', { year: 'numeric', month: 'long', day: 'numeric' })}
                </span>
                {blog.tags?.length > 0 && (
                  <span className="flex items-center gap-1.5">
                    <FaTag size={10} />
                    {blog.tags.join(', ')}
                  </span>
                )}
              </div>

              <p
                className="text-sm leading-relaxed mb-5"
                style={{ color: 'var(--color-text-secondary)' }}
              >
                {expanded === blog._id ? blog.content : blog.excerpt}
              </p>

              <button
                onClick={() => setExpanded(expanded === blog._id ? null : blog._id)}
                className="text-xs font-semibold transition-colors cursor-pointer"
                style={{ color: 'var(--color-accent)' }}
              >
                {expanded === blog._id ? '← Show Less' : 'Read More →'}
              </button>
            </div>
          </article>
        ))}
      </div>
    </Section>
  );
}
