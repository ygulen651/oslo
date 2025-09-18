import { useState, useEffect } from 'react';
import Head from 'next/head';
import Link from 'next/link';
import Image from 'next/image';
import { client, queries } from '../../lib/sanity.client';

export default function BlogPage({ blogPosts, blogSettings }) {
  const [selectedCategory, setSelectedCategory] = useState('all');
  const [searchTerm, setSearchTerm] = useState('');
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  const toggleMobileMenu = () => {
    setIsMobileMenuOpen(!isMobileMenuOpen);
  };

  const closeMenu = () => {
    setIsMobileMenuOpen(false);
  };

  // Kategorileri al
  const categories = ['all', 'lezzet-hikayeleri', 'urun-tanitimlari', 'sirket-haberleri', 'etkinlikler'];
  const categoryLabels = {
    'all': 'Tümü',
    'lezzet-hikayeleri': 'Lezzet Hikayeleri',
    'urun-tanitimlari': 'Ürün Tanıtımları',
    'sirket-haberleri': 'Şirket Haberleri',
    'etkinlikler': 'Etkinlikler'
  };

  // Filtrelenmiş blog yazıları
  const filteredPosts = blogPosts?.filter(post => {
    const matchesCategory = selectedCategory === 'all' || post.category === selectedCategory;
    const matchesSearch = post.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         post.excerpt.toLowerCase().includes(searchTerm.toLowerCase());
    return matchesCategory && matchesSearch;
  }) || [];

  return (
    <>
      <Head>
        <title>{blogSettings?.blogTitle || 'OSLO Blog'} - OSLO</title>
        <meta name="description" content={blogSettings?.blogSubtitle || 'OSLO Blog sayfası'} />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <div className="blog-page">
        {/* Fixed Navbar */}
        <nav className="navbar">
          <div className="navbar-brand">
            <Link href="/" className="logo-link">
              <img src="/Artboard 1@2x.png" alt="OSLO" className="logo-image" />
            </Link>
          </div>
          
          <button className="menu-button" onClick={toggleMobileMenu}>
            <span className="menu-text">MENU</span>
            <div className="hamburger-icon">
              <span></span>
              <span></span>
            </div>
          </button>
          
          <ul className={`navbar-menu ${isMobileMenuOpen ? 'active' : ''}`}>
            <li className="menu-header">
              <div className="menu-logo">
                <img src="/Artboard 1@2x.png" alt="OSLO" className="menu-logo-image" />
              </div>
            <button onClick={closeMenu} className="close-button">×</button>
          </li>
          <li><Link href="/" onClick={closeMenu}>Ana Sayfa</Link></li>
          <li><Link href="/products" onClick={closeMenu}>Ürünler</Link></li>
          <li><Link href="/blog" onClick={closeMenu}>Blog</Link></li>
          <li><Link href="/about" onClick={closeMenu}>Hakkımızda</Link></li>
          <li><Link href="/contact" onClick={closeMenu}>İletişim</Link></li>
          <li><Link href="/documents" onClick={closeMenu}>Dökümanlar</Link></li>
          </ul>
        </nav>

        {/* Header */}
        <div className="blog-page-header">
          <div className="blog-page-container">
            <div className="blog-header-content">
              <h1 className="blog-page-title">
                {blogSettings?.blogTitle || 'OSLO Blog'}
              </h1>
              <p className="blog-page-subtitle">
                {blogSettings?.blogSubtitle || 'Hayatını OSLO\'ya Dönüştürmek Senin Elinde!'}
              </p>
              
              {/* Search ve Filters */}
              <div className="blog-filters-compact">
                <div className="blog-search">
                  <input
                    type="text"
                    placeholder="Blog yazılarında ara..."
                    value={searchTerm}
                    onChange={(e) => setSearchTerm(e.target.value)}
                    className="blog-search-input"
                  />
                </div>
                
                <div className="blog-categories">
                  {categories.map(category => (
                    <button
                      key={category}
                      className={`blog-category-btn ${selectedCategory === category ? 'active' : ''}`}
                      onClick={() => setSelectedCategory(category)}
                    >
                      {categoryLabels[category]}
                    </button>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Blog Posts */}
        <div className="blog-posts-section">
          <div className="blog-page-container">
            {filteredPosts.length > 0 ? (
              <div className="blog-posts-grid">
                {filteredPosts.map((post) => (
                  <article key={post._id} className="blog-post-card">
                    <div className="blog-post-image">
                      <Link href={`/blog/${post.slug?.current || post._id}`}>
                        <Image
                          src={post.featuredImage?.asset?.url || '/placeholder.svg'}
                          alt={post.featuredImage?.alt || post.title}
                          width={400}
                          height={400}
                          className="blog-post-img"
                          quality={90}
                          priority={false}
                          placeholder="blur"
                          blurDataURL="data:image/jpeg;base64,/9j/4AAQSkZJRgABAQAAAQABAAD/2wBDAAYEBQYFBAYGBQYHBwYIChAKCgkJChQODwwQFxQYGBcUFhYaHSUfGhsjHBYWICwgIyYnKSopGR8tMC0oMCUoKSj/2wBDAQcHBwoIChMKChMoGhYaKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCj/wAARCAABAAEDASIAAhEBAxEB/8QAFQABAQAAAAAAAAAAAAAAAAAAAAv/xAAUEAEAAAAAAAAAAAAAAAAAAAAA/8QAFQEBAQAAAAAAAAAAAAAAAAAAAAX/xAAUEQEAAAAAAAAAAAAAAAAAAAAA/9oADAMBAAIRAxEAPwCdABmX/9k="
                        />
                      </Link>
                      
                      {/* Overlay Content */}
                      <div className="blog-post-overlay">
                        {post.category && (
                          <span className="blog-post-category">
                            {categoryLabels[post.category] || post.category}
                          </span>
                        )}
                        
                        <div className="blog-post-overlay-content">
                          <h2 className="blog-post-title">
                            <Link href={`/blog/${post.slug?.current || post._id}`}>
                              {post.title}
                            </Link>
                          </h2>
                          <p className="blog-post-excerpt">
                            {post.excerpt}
                          </p>
                          <div className="blog-post-meta">
                            <span className="blog-post-author">
                              {post.author || 'OSLO Ekibi'}
                            </span>
                            <span className="blog-post-date">
                              {post.publishedAt ? new Date(post.publishedAt).toLocaleDateString('tr-TR') : ''}
                            </span>
                          </div>
                          <Link href={`/blog/${post.slug?.current || post._id}`} className="blog-post-link">
                            Devamını Oku
                          </Link>
                        </div>
                      </div>
                    </div>
                  </article>
                ))}
              </div>
            ) : (
              <div className="blog-no-posts">
                <h3>Blog yazısı bulunamadı</h3>
                <p>Aradığınız kriterlere uygun blog yazısı bulunamadı.</p>
              </div>
            )}
          </div>
        </div>

        {/* Back to Home */}
        <div className="blog-back-home">
          <div className="blog-page-container">
            <Link href="/" className="blog-back-link">
              ← Ana Sayfaya Dön
            </Link>
          </div>
        </div>
      </div>

      <style jsx>{`
        .blog-page {
          min-height: 100vh;
          background: linear-gradient(135deg, #f8f9fa 0%, #e9ecef 100%);
          padding-top: 80px;
        }

        .blog-page-container {
          max-width: 1200px;
          margin: 0 auto;
          padding: 0 20px;
        }

        .blog-page-header {
          background: white;
          padding: 80px 0;
          text-align: center;
          margin-bottom: 60px;
          box-shadow: 0 4px 20px rgba(0, 0, 0, 0.1);
        }

        .blog-page-title {
          font-size: 3.5rem;
          font-weight: 800;
          color: #D21B21;
          margin-bottom: 20px;
          text-shadow: none;
        }

        .blog-page-subtitle {
          font-size: 1.2rem;
          color: #666;
          max-width: 600px;
          margin: 0 auto;
        }

        .blog-filters {
          background: white;
          padding: 40px 0;
          margin-bottom: 60px;
          box-shadow: 0 2px 10px rgba(0, 0, 0, 0.05);
        }

        .blog-search {
          margin-bottom: 20px;
        }

        .blog-search-input {
          width: 100%;
          max-width: 400px;
          padding: 15px 20px;
          border: 2px solid #D21B21;
          border-radius: 50px;
          font-size: 1rem;
          outline: none;
          transition: all 0.3s ease;
        }

        .blog-search-input:focus {
          border-color: #B0151A;
          box-shadow: 0 0 0 3px rgba(233, 30, 99, 0.1);
        }

        .blog-categories {
          display: flex;
          flex-wrap: wrap;
          gap: 10px;
          justify-content: center;
        }

        .blog-category-btn {
          padding: 10px 20px;
          border: 2px solid #D21B21;
          background: transparent;
          color: #D21B21;
          border-radius: 25px;
          cursor: pointer;
          transition: all 0.3s ease;
          font-weight: 600;
        }

        .blog-category-btn:hover,
        .blog-category-btn.active {
          background: #D21B21;
          color: white;
          transform: translateY(-2px);
          box-shadow: 0 4px 15px rgba(233, 30, 99, 0.3);
        }

        .blog-posts-section {
          padding: 40px 0;
        }

        .blog-posts-grid {
          display: grid;
          grid-template-columns: repeat(auto-fit, minmax(350px, 1fr));
          gap: 30px;
          margin-bottom: 40px;
        }

        .blog-post-card {
          background: transparent;
          border-radius: 16px;
          overflow: hidden;
          box-shadow: 0 4px 20px rgba(0, 0, 0, 0.08);
          transition: all 0.3s ease;
          border: none;
        }

        .blog-post-card:hover {
          transform: translateY(-8px);
          box-shadow: 0 12px 30px rgba(0, 0, 0, 0.12);
        }

        .blog-post-image {
          position: relative;
          height: 500px;
          overflow: hidden;
          border-radius: 16px;
        }

        .blog-post-img {
          width: 100%;
          height: 100%;
          object-fit: contain;
          object-position: center;
          transition: transform 0.4s ease;
          image-rendering: -webkit-optimize-contrast;
          image-rendering: crisp-edges;
          filter: brightness(1.05) contrast(1.1);
          background: #f8f9fa;
        }

        .blog-post-card:hover .blog-post-img {
          transform: scale(1.03);
          filter: brightness(1.1) contrast(1.15);
        }

        .blog-post-overlay {
          position: absolute;
          top: 0;
          left: 0;
          right: 0;
          bottom: 0;
          background: linear-gradient(
            to bottom,
            rgba(0, 0, 0, 0.1) 0%,
            rgba(0, 0, 0, 0.3) 50%,
            rgba(0, 0, 0, 0.7) 100%
          );
          display: flex;
          flex-direction: column;
          justify-content: space-between;
          padding: 20px;
          color: white;
        }

        .blog-post-category {
          position: absolute;
          top: 20px;
          left: 20px;
          background: rgba(233, 30, 99, 0.95);
          color: white;
          padding: 8px 16px;
          border-radius: 20px;
          font-size: 0.75rem;
          font-weight: 700;
          text-transform: uppercase;
          letter-spacing: 0.5px;
          backdrop-filter: blur(10px);
          box-shadow: 0 2px 10px rgba(0, 0, 0, 0.2);
        }

        .blog-post-overlay-content {
          margin-top: auto;
        }

        .blog-post-content {
          padding: 30px;
        }

        .blog-post-title {
          font-size: 1.4rem;
          font-weight: 700;
          color: white;
          margin-bottom: 12px;
          line-height: 1.3;
          text-shadow: 0 2px 4px rgba(0, 0, 0, 0.5);
        }

        .blog-post-title a {
          color: inherit;
          text-decoration: none;
          transition: color 0.3s ease;
        }

        .blog-post-title a:hover {
          color: #ffb3d1;
        }

        .blog-post-excerpt {
          color: rgba(255, 255, 255, 0.9);
          line-height: 1.5;
          margin-bottom: 15px;
          display: -webkit-box;
          -webkit-line-clamp: 2;
          -webkit-box-orient: vertical;
          overflow: hidden;
          font-size: 0.9rem;
          text-shadow: 0 1px 2px rgba(0, 0, 0, 0.5);
        }

        .blog-post-meta {
          display: flex;
          justify-content: space-between;
          align-items: center;
          margin-bottom: 15px;
          font-size: 0.8rem;
          color: rgba(255, 255, 255, 0.8);
          text-shadow: 0 1px 2px rgba(0, 0, 0, 0.5);
        }

        .blog-post-link {
          display: inline-block;
          background: #D21B21;
          color: white;
          padding: 12px 24px;
          border-radius: 8px;
          text-decoration: none;
          font-weight: 600;
          font-size: 0.9rem;
          transition: all 0.3s ease;
          border: 2px solid #D21B21;
        }

        .blog-post-link:hover {
          background: white;
          color: #D21B21;
          transform: translateY(-2px);
          box-shadow: 0 5px 15px rgba(233, 30, 99, 0.3);
        }

        .blog-no-posts {
          text-align: center;
          padding: 60px 20px;
          background: white;
          border-radius: 20px;
          box-shadow: 0 10px 30px rgba(0, 0, 0, 0.1);
        }

        .blog-no-posts h3 {
          font-size: 1.8rem;
          color: #333;
          margin-bottom: 15px;
        }

        .blog-no-posts p {
          color: #666;
          font-size: 1.1rem;
        }

        .blog-back-home {
          padding: 40px 0;
          text-align: center;
        }

        .blog-back-link {
          display: inline-block;
          background: rgba(255, 255, 255, 0.2);
          color: white;
          padding: 15px 30px;
          border-radius: 25px;
          text-decoration: none;
          font-weight: 600;
          transition: all 0.3s ease;
          backdrop-filter: blur(10px);
        }

        .blog-back-link:hover {
          background: rgba(255, 255, 255, 0.3);
          transform: translateY(-2px);
        }

        @media (max-width: 768px) {
          .blog-page-title {
            font-size: 2.5rem;
          }
          
          .blog-posts-grid {
            grid-template-columns: 1fr;
          }
          
          .blog-categories {
            justify-content: flex-start;
          }

          .blog-post-image {
            height: 350px;
          }
        }
        
        @media (max-width: 480px) {
          .blog-post-image {
            height: 300px;
          }
        }

        /* Navbar */
        .navbar {
          position: fixed;
          top: 15px;
          left: 15px;
          right: 15px;
          z-index: 1000;
          display: flex;
          justify-content: space-between;
          align-items: center;
        }

        .navbar-brand {
          display: flex;
          align-items: center;
        }

        .logo-link {
          text-decoration: none;
          color: white;
          display: flex;
          align-items: center;
        }

        .logo-text {
          font-size: 2rem;
          font-weight: 900;
          color: white;
          text-shadow: 2px 2px 4px rgba(0, 0, 0, 0.3);
          letter-spacing: 3px;
          text-shadow: 2px 2px 4px rgba(0, 0, 0, 0.3);
          -webkit-text-stroke: 1px rgba(255, 255, 255, 0.8);
        }

        .logo-image {
          max-width: 450px;
          max-height: 150px;
          width: auto;
          height: auto;
          object-fit: contain;
          filter: drop-shadow(2px 2px 4px rgba(0, 0, 0, 0.3));
        }

        .menu-button {
          background: transparent;
          border: none;
          display: flex;
          align-items: center;
          gap: 15px;
          cursor: pointer;
          padding: 12px 20px;
          border-radius: 8px;
          transition: all 0.3s ease;
        }

        .menu-button:hover {
          background: rgba(255, 255, 255, 0.1);
          transform: translateY(-2px);
        }

        .menu-text {
          font-size: 1.2rem;
          font-weight: 700;
          color: white;
          text-transform: uppercase;
          letter-spacing: 2px;
        }

        .hamburger-icon {
          background: white;
          width: 40px;
          height: 40px;
          border-radius: 50%;
          display: flex;
          flex-direction: column;
          align-items: center;
          justify-content: center;
          gap: 3px;
          border: 2px solid white;
        }

        .hamburger-icon span {
          width: 16px;
          height: 3px;
          background: #D21B21;
          border-radius: 2px;
        }

        .navbar-menu {
          display: none;
          position: fixed;
          top: 0;
          right: 0;
          width: 50vw;
          height: 100vh;
          background: #D21B21;
          list-style: none;
          margin: 0;
          padding: 60px 40px;
          flex-direction: column;
          gap: 20px;
          box-shadow: -4px 0 20px rgba(0, 0, 0, 0.1);
          z-index: 999;
          overflow-y: auto;
        }

        .navbar-menu.active {
          display: flex;
        }

        .navbar-menu li {
          position: relative;
        }

        .menu-header {
          display: flex;
          justify-content: space-between;
          align-items: center;
          margin-bottom: 30px;
          padding-bottom: 20px;
          border-bottom: 2px solid rgba(255, 255, 255, 0.3);
        }

        .menu-logo {
          display: flex;
          align-items: center;
        }

        .menu-logo-image {
          max-width: 200px;
          max-height: 70px;
          width: auto;
          height: auto;
          object-fit: contain;
          filter: drop-shadow(2px 2px 4px rgba(0, 0, 0, 0.3));
        }

        .menu-logo-text {
          font-size: 2rem;
          font-weight: 800;
          color: white;
          text-transform: uppercase;
          letter-spacing: 3px;
          text-shadow: 2px 2px 4px rgba(0, 0, 0, 0.3);
        }

        .close-button {
          background: none;
          border: none;
          color: white;
          font-size: 2rem;
          cursor: pointer;
          padding: 5px 10px;
          border-radius: 50%;
          transition: all 0.3s ease;
        }

        .close-button:hover {
          background: rgba(255, 255, 255, 0.2);
          transform: scale(1.1);
        }

        .navbar-menu a {
          color: white;
          text-decoration: none;
          font-weight: 700;
          font-size: 1.2rem;
          transition: all 0.3s ease;
          padding: 15px 0;
          display: block;
          border-bottom: 1px solid rgba(255, 255, 255, 0.2);
        }

        .navbar-menu a:hover {
          opacity: 0.8;
          transform: translateX(10px);
          color: rgba(255, 255, 255, 0.9);
        }

        /* Blog page header adjustment */
        .blog-page-header {
          margin-top: 80px;
          background: linear-gradient(135deg, #f8f9fa 0%, #e9ecef 100%);
          padding: 40px 0;
        }

        .blog-header-content {
          text-align: center;
        }

        .blog-page-title {
          font-size: 3rem;
          font-weight: 800;
          color: #e74c3c;
          margin-bottom: 15px;
          text-shadow: 2px 2px 4px rgba(0,0,0,0.1);
        }

        .blog-page-subtitle {
          font-size: 1.2rem;
          color: #6c757d;
          margin-bottom: 30px;
          font-weight: 500;
        }

        .blog-filters-compact {
          display: flex;
          flex-direction: column;
          gap: 20px;
          align-items: center;
          max-width: 600px;
          margin: 0 auto;
        }

        .blog-search {
          width: 100%;
          max-width: 400px;
        }

        .blog-search-input {
          width: 100%;
          padding: 15px 20px;
          border: 2px solid #e9ecef;
          border-radius: 50px;
          font-size: 1rem;
          transition: all 0.3s ease;
          background: white;
        }

        .blog-search-input:focus {
          outline: none;
          border-color: #e74c3c;
          box-shadow: 0 0 0 3px rgba(231, 76, 60, 0.1);
        }

        .blog-categories {
          display: flex;
          gap: 10px;
          flex-wrap: wrap;
          justify-content: center;
        }

        .blog-category-btn {
          padding: 10px 20px;
          border: 2px solid #e74c3c;
          background: white;
          color: #e74c3c;
          border-radius: 25px;
          font-weight: 600;
          cursor: pointer;
          transition: all 0.3s ease;
          font-size: 0.9rem;
        }

        .blog-category-btn:hover {
          background: #e74c3c;
          color: white;
          transform: translateY(-2px);
          box-shadow: 0 4px 12px rgba(231, 76, 60, 0.3);
        }

        .blog-category-btn.active {
          background: #e74c3c;
          color: white;
          box-shadow: 0 4px 12px rgba(231, 76, 60, 0.3);
        }

        /* Responsive */
        @media (max-width: 768px) {
          .navbar {
            top: 15px;
            left: 15px;
            right: 15px;
          }

          .logo-text {
            font-size: 1.5rem;
            letter-spacing: 2px;
          }

          .logo-image {
            max-width: 250px;
            max-height: 90px;
          }

          .menu-button {
            padding: 10px 16px;
            gap: 12px;
          }

          .menu-text {
            font-size: 1rem;
          }

          .hamburger-icon {
            width: 35px;
            height: 35px;
          }

          .hamburger-icon span {
            width: 14px;
            height: 2px;
          }

          .navbar-menu {
            width: 100vw;
            padding: 60px 20px;
            overflow-y: auto;
          }

          .navbar-menu a {
            font-size: 1.1rem;
            padding: 12px 0;
          }

          .menu-logo-image {
            max-width: 150px;
            max-height: 55px;
          }

          .menu-logo-text {
            font-size: 1.5rem;
            letter-spacing: 2px;
          }
        }
      `}</style>
    </>
  );
}

export async function getStaticProps() {
  try {
    console.log('=== BLOG SAYFASI VERİ ÇEKİLİYOR ===');
    
    const [blogPosts, blogSettings] = await Promise.all([
      client.fetch(queries.blogPosts),
      client.fetch(queries.blogSettings)
    ]);

    console.log('Blog Posts:', blogPosts?.length || 0);
    console.log('Blog Settings:', blogSettings);

    return {
      props: {
        blogPosts: blogPosts || [],
        blogSettings: blogSettings || null,
      },
      revalidate: 60,
    };
  } catch (error) {
    console.error('Blog veri çekme hatası:', error);
    console.error('Hata detayı:', error.message);
    console.error('Stack trace:', error.stack);
    
    return {
      props: {
        blogPosts: [],
        blogSettings: null,
      },
      revalidate: 60,
    };
  }
}
