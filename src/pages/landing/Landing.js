import React, { useState, useEffect } from 'react';
import styles from '../../styles/landing/Landing.module.css';
import Footer from '../../components/Footer';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faBars } from '@fortawesome/free-solid-svg-icons';
import { useNavigate } from 'react-router-dom';
// Import images
import Logo from '../../images/jellyfish.gif';
import locationGif from '../../images/Location.gif';
import envelopeGif from '../../images/Envelope.gif';
import telephoneGif from '../../images/Telephone.gif';
import sttIcon from '../../images/STT.gif';
import nlpIcon from '../../images/NLP.gif';
import multimodalIcon from '../../images/MM.gif';
import beachWithBoats from '../../images/trip.jpg';
import koreamap from '../../images/Event.png';
import santoriniView from '../../images/travel.jpg';
import scrollTopGif from '../../images/scroll-top.gif';
import bgVideo from '../../videos/BG-video.mp4';

const TravelLandingPage = () => {
  const [isNavCollapsed, setIsNavCollapsed] = useState(true);
  const [isNavbarShrunk, setIsNavbarShrunk] = useState(false);
  const [showScrollTop, setShowScrollTop] = useState(false);
  const navigate = useNavigate();

  useEffect(() => {
    const handleScroll = () => {
      setIsNavbarShrunk(window.scrollY > 100);
      setShowScrollTop(window.scrollY > 300);
    };

    const handleResize = () => {
      if (window.innerWidth > 768) {
        setIsNavCollapsed(true);
      }
    };

    window.addEventListener('scroll', handleScroll);
    window.addEventListener('resize', handleResize);

    return () => {
      window.removeEventListener('scroll', handleScroll);
      window.removeEventListener('resize', handleResize);
    };
  }, []);

  const handleNavCollapse = () => setIsNavCollapsed(!isNavCollapsed);

  const scrollToTop = () => {
    window.scrollTo({
      top: 0,
      behavior: 'smooth'
    });
  };

  const scrollToSection = (sectionId) => {
    const section = document.getElementById(sectionId);
    if (section) {
      section.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <div className={styles.pageWrapper} id="page-top">
      <nav className={`${styles.navbar} ${isNavbarShrunk ? styles.navbarShrink : ''}`}>
        <div className={styles.navbarContainer}>
          <a className={styles.navbarBrand} href="#page-top" onClick={() => navigate('/home')}>TripMaven</a>
          <button className={styles.navbarToggler} type="button" onClick={handleNavCollapse}>
            <FontAwesomeIcon icon={faBars} />
          </button>
          <ul className={`${styles.navbarNav} ${!isNavCollapsed ? styles.show : ''}`}>
            <li className={styles.navItem}><a className={styles.navLink} href="#about" onClick={(e) => { e.preventDefault(); scrollToSection('about'); }}>About</a></li>
            <li className={styles.navItem}><a className={styles.navLink} href="#features" onClick={(e) => { e.preventDefault(); scrollToSection('features'); }}>Features</a></li>
            <li className={styles.navItem}><a className={styles.navLink} href="#contact" onClick={(e) => { e.preventDefault(); scrollToSection('contact'); }}>Contact</a></li>
            <li className={styles.navItem}><a className={styles.navLink} href="/login">Login</a></li>
          </ul>
        </div>
      </nav>

      {/* Rest of the component remains the same */}
      
      <div className={styles.contentWrapper}>
        <div className={styles.travelPage}>
          {/* Hero Section */}
          <div className={styles.heroSection}>
            <video autoPlay loop muted className={styles.heroVideo}>
              <source src={bgVideo} type="video/mp4" />
            </video>
            <div className={styles.heroContent}>
              <img src={Logo} alt="Travel logo" className={styles.logo} />
              <h1 className={styles.heroTitle}>TRIPMAVEN</h1>
              <h2 className={styles.heroSubtitle}>프리랜서 여행 가이드의 완벽한 파트너,<br />
              TripMaven을 경험하세요.</h2>
              <button className={`${styles.btn} ${styles.btnLarge}`} onClick={() => navigate('/home')}>시작하기</button>
            </div>
          </div>

          {/* About section */}
          <div className={`${styles.section} ${styles.tealSection}`} id="about">
            <div className={`${styles.container} ${styles.flexContainer}`}>
              <div className={styles.flexHalf}>
                <h2 className={styles.sectionTitle}>소개를 하자면</h2>
                <p className={styles.sectionText}>"MAVEN"은 영어로 전문가라는 뜻입니다 </p>
                <p className={styles.sectionText}>우리는 여러분에게 AI를 이용하여 잊지 못할 최적의 여행을 선사합니다</p>
              </div>
              <div className={`${styles.flexHalf} ${styles.imageWrapper}`}>
                <img src={beachWithBoats} alt="Beach with boats" className={styles.sectionImage} />
              </div>
            </div>
          </div>

          {/* Features section */}
          <div className={`${styles.section} ${styles.darkTealSection}`}>
            <div className={`${styles.container} ${styles.flexContainer}`}>
              <div className={styles.flexHalf}>
                <h2 className={styles.sectionTitle}>고객을 위하여</h2>
                <p className={styles.sectionText}>지역만 검색하면 날씨와 행사들을 한눈에 찾아볼 수 있습니다.<br/>
                고객들께서 여러분이 가고자 하는곳에 어디든 가이드가 있습니다 </p>
              </div>
              <div className={`${styles.flexHalf} ${styles.imageWrapper}`}>
                <img src={koreamap} alt="Tropical beach" className={styles.sectionImage} />
              </div>
            </div>
          </div>

          {/* News Features section */}
          <div className={`${styles.section} ${styles.brightTealSection}`} id="features">
        <div className={styles.container}>
          <h2 className={`${styles.sectionTitle} ${styles.center}`}>
            TripMaven의 주기능
          </h2>
          <p className={styles.sectionSubtitle}>
            저희는 행동, 시선, 표정을 평가하여 가이드 여러분의 능력을 향상시켜줍니다<br/>
            여행지 소개, 고객 응대 등을 평가받고 향상시켜 보세요!         
          </p>
          <div className={styles.featuresContainer}>
            {[
              { title: '음성인식 기술 (STT)', icon: sttIcon, description: '음성을 텍스트로 변환하는 STT 기술' },
              { title: '자연어 처리기술(NLP)', icon: nlpIcon, description: '말을 분석 및 이해하는 NLP 기술' },
              { title: '멀티모달 기술', icon: multimodalIcon, description: '다양한 유형의 데이터를 동시 처리하는 기술 ' }
            ].map((feature, index) => (
              <div key={index} className={styles.featureCard}>
                <img src={feature.icon} alt={feature.title} className={styles.featureIcon} />
                <div className={styles.featureContent}>
                  <h3 className={styles.featureTitle}>{feature.title}</h3>
                  <p className={styles.featureDescription}>{feature.description}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>

          {/* Contact Us section */}
          <div className={styles.contactSection} id="contact">
            <div className={styles.contactImageWrapper}>
              <img src={santoriniView} alt="World map with travel items" className={styles.contactImage} />
              <h2 className={styles.contactTitle}>Contact Us</h2>
            </div>
            <div className={styles.contactInfoWrapper}>
              <h2 className={styles.contactInfoTitle}>연락처</h2>
              <div className={styles.contactInfo}>
              <div className={styles.infoGroup}>
                <img src={locationGif} alt="Location" className={styles.icon} />
                <span className={styles.infoText}>한국 ICT 인재 개발원</span>
              </div>
                <div className={styles.infoGroup}>
                  <img src={telephoneGif} alt="Telephone" className={styles.icon} />
                  <span className={styles.infoText}>010-1234-5678</span>
                </div>
                <div className={styles.infoGroup}>
                  <img src={envelopeGif} alt="Envelope" className={styles.icon} />
                  <span className={styles.infoText}>tripmaven1234@gmail.com</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
      <Footer />
      
      {showScrollTop && (
        <button className={styles.scrollTopButton} onClick={scrollToTop}>
          <img src={scrollTopGif} alt="Scroll to top" className={styles.scrollTopIcon} />
        </button>
      )}
    </div>
  );
};

export default TravelLandingPage;
