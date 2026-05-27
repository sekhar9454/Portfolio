import { useState, useEffect } from 'react';
import axios from 'axios';
import Section from './Section';
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
      <div className="grid sm:grid-cols-1 md:grid-cols-1 lg:grid-cols-1 gap-6 w-full">
        {blogs.map(blog => (
          <article
            key={blog._id}
            className="rounded-xl border overflow-hidden transition-all duration-300 hover:-translate-y-1 hover:shadow-xl group p-10"
            style={{ backgroundColor: 'var(--color-card)', borderColor: 'var(--color-border)' }}
          >
            {/* Header gradient bar */}
            <div className="h-1.5" style={{ background: `linear-gradient(90deg, var(--color-primary), var(--color-accent))` }} />

            <div className="p-6">
              <h3
                className="font-bold text-lg mb-2 transition-colors"
                style={{ color: 'var(--color-text)', fontFamily: "'Playfair Display', serif" }}
              >
                {blog.title}
              </h3>

              <div className="flex flex-wrap items-center gap-3 mb-3 text-xs" style={{ color: 'var(--color-text-secondary)' }}>
                <span className="flex items-center gap-1">
                  <FaCalendar size={10} />
                  {new Date(blog.createdAt).toLocaleDateString('en-US', { year: 'numeric', month: 'long', day: 'numeric' })}
                </span>
                {blog.tags?.length > 0 && (
                  <span className="flex items-center gap-1">
                    <FaTag size={10} />
                    {blog.tags.join(', ')}
                  </span>
                )}
              </div>

              <p
                className="text-sm leading-relaxed mb-4 p-4"
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
