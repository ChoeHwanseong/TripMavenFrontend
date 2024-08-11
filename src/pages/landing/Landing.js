import React, { useEffect, useState } from 'react';
import styles from '../../styles/landing/Landing.module.css';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faBars, faMapMarkedAlt, faEnvelope, faMobileAlt } from '@fortawesome/free-solid-svg-icons';
import Footer from '../../components/Footer';
import sightseeingImage from '../../images/sightseeing.jpg';

const Landing = () => {
  const [isNavCollapsed, setIsNavCollapsed] = useState(true);
  const [isNavbarShrunk, setIsNavbarShrunk] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      if (window.scrollY > 100) {
        setIsNavbarShrunk(true);
      } else {
        setIsNavbarShrunk(false);
      }
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

  return (
    <div id="page-top">
      <nav className={`${styles.navbar} ${isNavbarShrunk ? styles.navbarShrink : ''}`}>
        <div className={styles.navbarContainer}>
          <a className={styles.navbarBrand} href="#page-top">TripMaven</a>
          <button className={styles.navbarToggler} type="button" onClick={handleNavCollapse}>
            <FontAwesomeIcon icon={faBars} />
          </button>
          <ul className={`${styles.navbarNav} ${!isNavCollapsed ? styles.show : ''}`}>
            <li className={styles.navItem}><a className={styles.navLink} href="#about">About</a></li>
            <li className={styles.navItem}><a className={styles.navLink} href="#contact">Contact</a></li>
            <li className={styles.navItem}><a className={styles.navLink} href="/login">Login</a></li>
          </ul>
        </div>
      </nav>

      <header className={styles.masthead}>
        <div className="container px-4 px-lg-5 d-flex h-100 align-items-center justify-content-center">
          <div className="d-flex justify-content-center">
            <div className={styles.mastheadContent}>
              <h1 className={styles.mastheadHeading}>TRIPMAVEN</h1>
              <h2 className={styles.mastheadSubheading}>
                프리랜서 여행 가이드의 완벽한 파트너,<br />
                AI 기술로 더 편리한 서비스를 경험하세요.
              </h2>
              <a className={styles.btn} href="/home">시작하기</a>
            </div>
          </div>
        </div>
      </header>

      <section className={styles.aboutSection} id="about">
        <div className="container px-4 px-lg-5">
          <div className="row gx-4 gx-lg-5 justify-content-center">
            <div className="col-lg-8">
              <h2 className="text-white mb-4">해파리와 함께</h2>
              <p className="text-white-50">
                해파리는 당신의 여행에 있어 행복(Happy)을 찾는(Finder) 리포터(Reporter)의 역할을 해줄꺼에요
              </p>
            </div>
          </div>
        </div>
      </section>

      <section className={styles.projectsSection} id="projects">
        <div className="container px-4 px-lg-5">
          <div className="row gx-0 mb-4 mb-lg-5 align-items-center">
            <div className="col-xl-8 col-lg-7"></div>
            <div className="col-xl-4 col-lg-5">
              <div className="featured-text text-center text-lg-left">
                <h4>TripMaven</h4>
                <p className="text-black-50 mb-0"></p>
              </div>
            </div>
          </div>
          <div className="row gx-0 mb-5 mb-lg-0 justify-content-center">
            <div className="col-lg-6">
              <div className={styles.projectCard}>
                <img className={styles.projectImage} src={sightseeingImage} alt="Sightseeing" />
                <div className={styles.projectText}>
                  <h4 className="text-white">AI를 접목한 기술</h4>
                  <p className="mb-0 text-white-50"></p>
                </div>
              </div>
            </div>
          </div>
          <div className="row gx-0 justify-content-center">
            <div className="col-lg-6">
              <div className={styles.projectCard}>
                <img className={styles.projectImage} src={sightseeingImage} alt="Sightseeing" />
                <div className={styles.projectText}>
                  <h4 className="text-white">가이드와 고객 모두 만족할만한 편리함</h4>
                  <p className="mb-0 text-white-50"></p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      <section className={styles.contactSection} id="contact">
  <div className={styles.contactContainer}>
    <div className={styles.contactCard}>
      <FontAwesomeIcon icon={faMapMarkedAlt} className={styles.contactIcon} />
      <h4 className={styles.contactTitle}>ADDRESS</h4>
      <div className={styles.contactInfo}>소재지</div>
    </div>
    <div className={styles.contactCard}>
      <FontAwesomeIcon icon={faEnvelope} className={styles.contactIcon} />
      <h4 className={styles.contactTitle}>EMAIL</h4>
      <div className={styles.contactInfo}>이메일 주소</div>
    </div>
    <div className={styles.contactCard}>
      <FontAwesomeIcon icon={faMobileAlt} className={styles.contactIcon} />
      <h4 className={styles.contactTitle}>PHONE</h4>
      <div className={styles.contactInfo}>전화번호</div>
    </div>
  </div>
</section>
      <Footer />
    </div>
  );
};

export default Landing;
