
import React, { useState } from 'react';
import Link from 'next/link';
import Image from 'next/image';

/**
 * Hakkımızda sayfası
 */
export default function About() {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  const toggleMobileMenu = () => {
    setIsMobileMenuOpen(!isMobileMenuOpen);
  };

  const closeMenu = () => {
    setIsMobileMenuOpen(false);
  };

  return (
    <>
      <style jsx global>{`
        /* Genel Ayarlar */
        html, body {
          background: transparent;
          height: auto;
          overflow-x: hidden;
          overflow-y: auto;
        }

        body {
          padding-top: 0;
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
          gap: 10px;
          color: white;
          cursor: pointer;
          font-size: 1rem;
          font-weight: 600;
          text-transform: uppercase;
          letter-spacing: 1px;
          padding: 10px 15px;
          border-radius: 5px;
          transition: background-color 0.3s ease;
        }

        .menu-button:hover {
          background: rgba(255, 255, 255, 0.1);
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
          transition: all 0.3s ease;
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

        /* Responsive */
        @media (max-width: 768px) {
          .navbar {
            top: 10px;
            left: 10px;
            right: 10px;
          }

          .logo-image {
            max-width: 250px;
            max-height: 90px;
          }

          .navbar-menu {
            width: 100vw;
            padding: 60px 20px;
            overflow-y: auto;
          }

          .navbar-menu a {
            font-size: 1.5rem;
            padding: 8px 15px;
          }

          .menu-logo-image {
            max-width: 150px;
            max-height: 55px;
          }
        }
      `}</style>

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
          <li><Link href="/about" onClick={closeMenu}>Kurumsal</Link></li>
          <li><Link href="/contact" onClick={closeMenu}>İletişim</Link></li>
          <li><Link href="/documents" onClick={closeMenu}>Dökümanlar</Link></li>
        </ul>
      </nav>

      {/* Hero Bölümü */}
      <section style={{ 
        background: 'white', 
        padding: '150px 0 100px 0'
      }}>
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <div style={{ textAlign: 'center', marginBottom: '80px' }}>
            
            <h1 style={{ 
              fontSize: '4rem', 
              fontWeight: '700', 
              marginBottom: '2rem',
              color: '#1a1a1a',
              letterSpacing: '3px'
            }}>
              KURUMSAL
            </h1>
            
            <div style={{ 
              width: '120px', 
              height: '3px', 
              background: '#D21B21', 
              margin: '0 auto 3rem'
            }}></div>
            
            <h2 style={{ 
              fontSize: '1.8rem', 
              color: '#D21B21',
              lineHeight: '1.6',
              maxWidth: '800px',
              margin: '0 auto 2rem',
              fontWeight: '400'
            }}>
              Sınıfının en iyisi ürünler ve lezzetler için OSLO
            </h2>
            
            <p style={{ 
              fontSize: '1.2rem', 
              color: '#555',
              lineHeight: '1.8',
              maxWidth: '800px',
              margin: '0 auto 2rem'
            }}>
              Şirketimiz 2005 yılında pirinç patlağı, sade ve meyveli kek imalatı ile gıda 
              sektöründeki faaliyetlerine başlamış bulunmaktadır. Geçen yıllar içerisinde 
              büyüme stratejimizi, müşterilerimizin ihtiyaçları ile uyum içerisinde ürünler 
              üretip, bugün ki çeşitliliğine ulaştırdık.
            </p>
            
            <p style={{ 
              fontSize: '1.2rem', 
              color: '#555',
              lineHeight: '1.8',
              maxWidth: '800px',
              margin: '0 auto'
            }}>
              Ürünlerimiz, son derece modern ve hijyenik hatlarda el değmeden ve yüksek 
              kapasitede üretilmektedir. Lezzetli bir kekin olmazsa olmazı tüketicilerin 
              isteklerini, taleplerini doğru anlamakla başlar. Bu nedenle AR-GE yatırımlarımız 
              başarılarımızın sebebidir.
            </p>
            
          </div>
        </div>
      </section>

      {/* İstatistik Bölümü */}
      <section style={{ 
        background: '#f8f9fa', 
        padding: '80px 0'
      }}>
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
          <div style={{ 
            display: 'grid', 
            gridTemplateColumns: 'repeat(4, 1fr)', 
            gap: '50px',
            textAlign: 'center'
          }}>
            
            <div>
              <h3 style={{ fontSize: '3.5rem', fontWeight: '700', color: '#D21B21', marginBottom: '10px' }}>20000+</h3>
              <p style={{ color: '#333', fontSize: '1.1rem', fontWeight: '600', margin: 0 }}>
                Yıllık Ton Üretim Kapasitesi
              </p>
            </div>

            <div>
              <h3 style={{ fontSize: '3.5rem', fontWeight: '700', color: '#D21B21', marginBottom: '10px' }}>1000+</h3>
              <p style={{ color: '#333', fontSize: '1.1rem', fontWeight: '600', margin: 0 }}>
                Farklı Ürün Çeşidi
              </p>
            </div>

            <div>
              <h3 style={{ fontSize: '3.5rem', fontWeight: '700', color: '#D21B21', marginBottom: '10px' }}>5240+</h3>
              <p style={{ color: '#333', fontSize: '1.1rem', fontWeight: '600', margin: 0 }}>
                Küresel Müşteriler
              </p>
            </div>

            <div>
              <h3 style={{ fontSize: '3.5rem', fontWeight: '700', color: '#D21B21', marginBottom: '10px' }}>25000+</h3>
              <p style={{ color: '#333', fontSize: '1.1rem', fontWeight: '600', margin: 0 }}>
                Kapalı M2 Alan
              </p>
            </div>

          </div>
        </div>
      </section>

      {/* Şirket Bilgileri */}
      <section style={{ 
        background: 'white', 
        padding: '100px 0'
      }}>
        <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8">
          <div style={{ 
            display: 'grid', 
            gridTemplateColumns: '1fr 1fr', 
            gap: '80px',
            alignItems: 'flex-start'
          }}>
            
            {/* Sol Taraf - Misyon */}
            <div>
              <h2 style={{ 
                fontSize: '2.5rem', 
                fontWeight: '700', 
                color: '#1a1a1a', 
                marginBottom: '30px'
              }}>
                Misyonumuz
              </h2>
              <div style={{ 
                width: '60px', 
                height: '3px', 
                background: '#D21B21', 
                marginBottom: '30px'
              }}></div>
              <p style={{ 
                color: '#555', 
                fontSize: '1.1rem', 
                lineHeight: '1.8'
              }}>
                Faaliyette bulunduğumuz kek, gofret ve çikolata sektörlerinde güvenilir ve 
                kaliteli ürünler üreterek; müşterilerimiz, çalışanlarımız ve hissedarlarının 
                beklentilerini en üst seviyede karşılamak.
              </p>
            </div>

            {/* Sağ Taraf - Vizyon */}
            <div>
              <h2 style={{ 
                fontSize: '2.5rem', 
                fontWeight: '700', 
                color: '#1a1a1a', 
                marginBottom: '30px'
              }}>
                Vizyonumuz
              </h2>
              <div style={{ 
                width: '60px', 
                height: '3px', 
                background: '#D21B21', 
                marginBottom: '30px'
              }}></div>
              <p style={{ 
                color: '#555', 
                fontSize: '1.1rem', 
                lineHeight: '1.8'
              }}>
                Ürün kalitemiz ile tüketicinin öncelikli tercihi olarak sürekliliğimizi 
                sağlamak, pazarımızda lider olmak.
              </p>
            </div>

          </div>
        </div>
      </section>

      {/* Kalite ve Sertifikalar */}
      <section style={{ 
        background: '#f8f9fa', 
        padding: '100px 0'
      }}>
        <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8">
          
          <div style={{ textAlign: 'center', marginBottom: '80px' }}>
            <h2 style={{ 
              fontSize: '2.5rem', 
              fontWeight: '700', 
              color: '#1a1a1a', 
              marginBottom: '20px'
            }}>
              Kalite ve Gıda Güvenliği
            </h2>
            <div style={{ 
              width: '120px', 
              height: '3px', 
              background: '#D21B21', 
              margin: '0 auto 30px'
            }}></div>
            <p style={{ 
              fontSize: '1.2rem', 
              color: '#555',
              lineHeight: '1.8',
              maxWidth: '700px',
              margin: '0 auto'
            }}>
              Gıda güvenliği, helal gıda yönetim sisteminin sürekli iyileştirilmesini, 
              geliştirilmesini ve etkinliğini arttırmak.
            </p>
          </div>

          <div style={{ 
            display: 'grid', 
            gridTemplateColumns: 'repeat(2, 1fr)', 
            gap: '60px'
          }}>
            
            <div style={{ gridColumn: '1 / -1' }}>
              <h3 style={{ 
                fontSize: '1.8rem', 
                fontWeight: '600', 
                color: '#1a1a1a', 
                marginBottom: '30px',
                textAlign: 'center'
              }}>
                Gıda Güvenliği ve Helal Gıda Politikamız
              </h3>
              
              <div style={{ 
                display: 'grid', 
                gridTemplateColumns: '1fr', 
                gap: '20px',
                maxWidth: '900px',
                margin: '0 auto'
              }}>
                <div style={{ 
                  padding: '20px', 
                  background: 'white', 
                  borderRadius: '10px',
                  border: '1px solid #e5e5e5'
                }}>
                  <p style={{ 
                    color: '#555', 
                    fontSize: '1rem', 
                    lineHeight: '1.8',
                    margin: '0',
                    paddingLeft: '20px',
                    position: 'relative'
                  }}>
                    <span style={{ position: 'absolute', left: 0, color: '#D21B21', fontWeight: 'bold' }}>•</span>
                    Ürettiğimiz her üründe en üst güvenli, yasal, helal ve diğer şartlara uygun ürün üretmeyi hedef almak
                  </p>
                </div>

                <div style={{ 
                  padding: '20px', 
                  background: 'white', 
                  borderRadius: '10px',
                  border: '1px solid #e5e5e5'
                }}>
                  <p style={{ 
                    color: '#555', 
                    fontSize: '1rem', 
                    lineHeight: '1.8',
                    margin: '0',
                    paddingLeft: '20px',
                    position: 'relative'
                  }}>
                    <span style={{ position: 'absolute', left: 0, color: '#D21B21', fontWeight: 'bold' }}>•</span>
                    Müşterilerimizin ve ilgili tarafların gereksinim ve beklentilerini gözeterek, müşteri memnuniyetinin sürekliliğini güvence altına almak
                  </p>
                </div>

                <div style={{ 
                  padding: '20px', 
                  background: 'white', 
                  borderRadius: '10px',
                  border: '1px solid #e5e5e5'
                }}>
                  <p style={{ 
                    color: '#555', 
                    fontSize: '1rem', 
                    lineHeight: '1.8',
                    margin: '0',
                    paddingLeft: '20px',
                    position: 'relative'
                  }}>
                    <span style={{ position: 'absolute', left: 0, color: '#D21B21', fontWeight: 'bold' }}>•</span>
                    Bütün üretimlerimizde ham maddeden ve tedarikçilerimizden tüketiciye kadar oluşacak gıda güvenliği ve helal gıda ile ilgili tüm riskleri önceden belirleyip yok etmek
                  </p>
                </div>

                <div style={{ 
                  padding: '20px', 
                  background: 'white', 
                  borderRadius: '10px',
                  border: '1px solid #e5e5e5'
                }}>
                  <p style={{ 
                    color: '#555', 
                    fontSize: '1rem', 
                    lineHeight: '1.8',
                    margin: '0',
                    paddingLeft: '20px',
                    position: 'relative'
                  }}>
                    <span style={{ position: 'absolute', left: 0, color: '#D21B21', fontWeight: 'bold' }}>•</span>
                    Tedarikçilerimizle kalite, gıda güvenliği ve helal gıda anlayışımızın gereği olarak uzun dönemli iş birliği ilkesi doğrultusunda çalışmak
                  </p>
                </div>

                <div style={{ 
                  padding: '20px', 
                  background: 'white', 
                  borderRadius: '10px',
                  border: '1px solid #e5e5e5'
                }}>
                  <p style={{ 
                    color: '#555', 
                    fontSize: '1rem', 
                    lineHeight: '1.8',
                    margin: '0',
                    paddingLeft: '20px',
                    position: 'relative'
                  }}>
                    <span style={{ position: 'absolute', left: 0, color: '#D21B21', fontWeight: 'bold' }}>•</span>
                    Yüksek motivasyon ve başarı azmine sahip çalışanlarımızın bilinçli katılımı ile sürekli gelişmemize bütün çalışanlarımızın katılımını sağlamak
                  </p>
                </div>

                <div style={{ 
                  padding: '20px', 
                  background: 'white', 
                  borderRadius: '10px',
                  border: '1px solid #e5e5e5'
                }}>
                  <p style={{ 
                    color: '#555', 
                    fontSize: '1rem', 
                    lineHeight: '1.8',
                    margin: '0',
                    paddingLeft: '20px',
                    position: 'relative'
                  }}>
                    <span style={{ position: 'absolute', left: 0, color: '#D21B21', fontWeight: 'bold' }}>•</span>
                    Çalışanlarımızı ve diğer tüm paydaşlarımızı, eğitim ve iletişim kanallarını kullanarak bilgilendirmek ve bilinçlendirmek
                  </p>
                </div>

                <div style={{ 
                  padding: '20px', 
                  background: 'white', 
                  borderRadius: '10px',
                  border: '1px solid #e5e5e5'
                }}>
                  <p style={{ 
                    color: '#555', 
                    fontSize: '1rem', 
                    lineHeight: '1.8',
                    margin: '0',
                    paddingLeft: '20px',
                    position: 'relative'
                  }}>
                    <span style={{ position: 'absolute', left: 0, color: '#D21B21', fontWeight: 'bold' }}>•</span>
                    Gıda güvenliği ve helal gıda şartlarının sağlanması hususunda tedarikçiler ile etkin bir iletişim sağlamak
                  </p>
                </div>
              </div>
            </div>

          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="footer">
        <div className="footer-top">
          <div className="footer-content">
            <div className="footer-slogan">
              <h2>Hayatın her anında</h2>
            </div>
            
            <div className="footer-nav">
              <div className="nav-row">
                <a href="/" className="nav-link">Anasayfa</a>
                <a href="/about" className="nav-link">Hakkımızda</a>
                <a href="/products" className="nav-link">Ürünler</a>
                <a href="/catalog" className="nav-link">Katalog</a>
              </div>
              <div className="nav-row">
                <a href="/blog" className="nav-link">Blog</a>
                <a href="/contact" className="nav-link">İletişim</a>
                <a href="/documents" className="nav-link">Dökümanlar</a>
              </div>
            </div>
            
            <div className="footer-social">
              <p className="social-text">Bizi takip edin!</p>
              <div className="social-icons">
                <a href="#" className="social-icon" aria-label="Facebook">
                  <svg width="20" height="20" viewBox="0 0 24 24" fill="currentColor">
                    <path d="M24 12.073c0-6.627-5.373-12-12-12s-12 5.373-12 12c0 5.99 4.388 10.954 10.125 11.854v-8.385H7.078v-3.47h3.047V9.43c0-3.007 1.792-4.669 4.533-4.669 1.312 0 2.686.235 2.686.235v2.953H15.83c-1.491 0-1.956.925-1.956 1.874v2.25h3.328l-.532 3.47h-2.796v8.385C19.612 23.027 24 18.062 24 12.073z"/>
                  </svg>
                </a>
                <a href="#" className="social-icon" aria-label="Instagram">
                  <svg width="20" height="20" viewBox="0 0 24 24" fill="currentColor">
                    <path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.919-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zm0-2.163c-3.259 0-3.667.014-4.947.072-4.358.2-6.78 2.618-6.98 6.98-.059 1.281-.073 1.689-.073 4.948 0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98 1.281.058 1.689.072 4.948.072 3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98-1.281-.059-1.69-.073-4.949-.073zm0 5.838c-3.403 0-6.162 2.759-6.162 6.162s2.759 6.163 6.162 6.163 6.162-2.759 6.162-6.163c0-3.403-2.759-6.162-6.162-6.162zm0 10.162c-2.209 0-4-1.79-4-4 0-2.209 1.791-4 4-4s4 1.791 4 4c0 2.21-1.791 4-4 4zm6.406-11.845c-.796 0-1.441.645-1.441 1.44s.645 1.44 1.441 1.44c.795 0 1.439-.645 1.439-1.44s-.644-1.44-1.439-1.40z"/>
                  </svg>
                </a>
                <a href="#" className="social-icon" aria-label="YouTube">
                  <svg width="20" height="20" viewBox="0 0 24 24" fill="currentColor">
                    <path d="M23.498 6.186a3.016 3.016 0 0 0-2.122-2.136C19.505 3.545 12 3.545 12 3.545s-7.505 0-9.377.505A3.017 3.017 0 0 0 .502 6.186C0 8.07 0 12 0 12s0 3.93.502 5.814a3.016 3.016 0 0 0 2.122 2.136c1.871.505 9.376.505 9.376.505s7.505 0 9.377-.505a3.015 3.015 0 0 0 2.122-2.136C24 15.93 24 12 24 12s0-3.93-.502-5.814zM9.545 15.568V8.432L15.818 12l-6.273 3.568z"/>
                  </svg>
                </a>
              </div>
            </div>
          </div>
        </div>
        
        <div className="footer-bottom">
          <div className="footer-bottom-content">
            <div className="footer-legal">
              <div className="cookie-icon">
                <svg width="16" height="16" viewBox="0 0 24 24" fill="currentColor">
                  <path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm-2 15l-5-5 1.41-1.41L10 14.17l7.59-7.59L19 8l-9 9z"/>
                </svg>
              </div>
              <div className="legal-links">
                <a href="/bilgi-toplumu" className="legal-link">Bilgi Toplumu Hizmetleri</a>
                <a href="/gizlilik" className="legal-link">Gizlilik ve Güvenlik Politikamız</a>
                <a href="/kvkk" className="legal-link">Kişisel Verilerin Korunması</a>
                <a href="/cerez-politikasi" className="legal-link">Çerez Politikası</a>
              </div>
            </div>
            <div className="footer-copyright">
              <p>2023 Şölen Tüm Hakları Saklıdır.</p>
            </div>
          </div>
        </div>
      </footer>
    </>
  )
}
