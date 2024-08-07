import React, { useEffect } from 'react';
import './landing.css';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faBars, faMapMarkedAlt, faEnvelope, faMobileAlt } from '@fortawesome/free-solid-svg-icons';
import Footer from '../../components/Footer';
// 이미지 파일을 import
import sightseeingImage from '../../images/sightseeing.jpg';

const Landing = () => {
  useEffect(() => {
    // Navbar shrink function
    const navbarShrink = () => {
      const navbarCollapsible = document.querySelector('#mainNav');
      if (!navbarCollapsible) {
        return;
      }
      if (window.scrollY === 0) {
        navbarCollapsible.classList.remove('navbar-shrink');
      } else {
        navbarCollapsible.classList.add('navbar-shrink');
      }
    };

    // Shrink the navbar 
    navbarShrink();

    // Shrink the navbar when page is scrolled
    window.addEventListener('scroll', navbarShrink);

    // Collapse responsive navbar when toggler is visible
    const navbarToggler = document.querySelector('.navbar-toggler');
    const responsiveNavItems = Array.from(document.querySelectorAll('#navbarResponsive .nav-link'));
    responsiveNavItems.forEach(responsiveNavItem => {
      responsiveNavItem.addEventListener('click', () => {
        if (window.getComputedStyle(navbarToggler).display !== 'none') {
          navbarToggler.click();
        }
      });
    });

    // Cleanup
    return () => {
      window.removeEventListener('scroll', navbarShrink);
      responsiveNavItems.forEach(responsiveNavItem => {
        responsiveNavItem.removeEventListener('click', () => {});
      });
    };
  }, []);

  return (
    <div id="page-top">
      <nav className="navbar navbar-expand-lg navbar-light fixed-top" id="mainNav">
        <div className="container px-4 px-lg-5">
          <a className="navbar-brand" href="#page-top" style={{ color: 'skyblue' }}>Trip Maven</a>
          <button className="navbar-toggler navbar-toggler-right" type="button" data-bs-toggle="collapse" data-bs-target="#navbarResponsive" aria-controls="navbarResponsive" aria-expanded="false" aria-label="Toggle navigation">
            Menu <FontAwesomeIcon icon={faBars} />
          </button>
          <div className="collapse navbar-collapse" id="navbarResponsive">
            <ul className="navbar-nav ms-auto">
              <li className="nav-item"><a className="nav-link" style={{ color: '#0f0f0f' }} href="#about">About</a></li>
              <li className="nav-item"><a className="nav-link" style={{ color: '#0f0f0f' }} href="#contact">Contact</a></li>
              <li className="nav-item"><a className="nav-link" style={{ color: '#0f0f0f' }} href="/login">Login</a></li>
            </ul>
          </div>
        </div>
      </nav>

      <header className="masthead">
        <div className="container px-4 px-lg-5 d-flex h-100 align-items-center justify-content-center">
          <div className="d-flex justify-content-center">
            <div className="text-center">
              <h1 className="mx-auto my-2 text-uppercase mb-4">TRIP MAVEN</h1>
              <h2 className="text-black-25 mx-auto mt-4 mb-5">
                프리랜서 여행 가이드의 완벽한 파트너,<br />
                AI 기술로 더 편리한 서비스를 경험하세요.
              </h2>
              <a className="btn btn-primary" href="/home">시작하기</a>
            </div>
          </div>
        </div>
      </header>

      <section className="about-section text-center" id="about">
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

      <section className="projects-section bg-light" id="projects">
        <div className="container px-4 px-lg-5">
          <div className="row gx-0 mb-4 mb-lg-5 align-items-center">
            <div className="col-xl-8 col-lg-7"></div>
            <div className="col-xl-4 col-lg-5">
              <div className="featured-text text-center text-lg-left">
                <h4>TRIP MAVEN</h4>
                <p className="text-black-50 mb-0"></p>
              </div>
            </div>
          </div>
          <div className="row gx-0 mb-5 mb-lg-0 justify-content-center">
            <div className="col-lg-6">
              <img className="img-fluid" src={sightseeingImage} alt="Sightseeing" />
            </div>
            <div className="col-lg-6">
              <div className="bg-black text-center h-100 project">
                <div className="d-flex h-100">
                  <div className="project-text w-100 my-auto text-center text-lg-left">
                    <h4 className="text-white">AI를 접목한 기술</h4>
                    <p className="mb-0 text-white-50"></p>
                  </div>
                </div>
              </div>
            </div>
          </div>
          <div className="row gx-0 justify-content-center">
            <div className="col-lg-6">
              <img className="img-fluid" src={sightseeingImage} alt="Sightseeing" />
            </div>
            <div className="col-lg-6 order-lg-first">
              <div className="bg-black text-center h-100 project">
                <div className="d-flex h-100">
                  <div className="project-text w-100 my-auto text-center text-lg-right">
                    <h4 className="text-white">가이드와 고객 모두 만족할만한 편리함</h4>
                    <p className="mb-0 text-white-50"></p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      <section className="contact-section bg-white" id="contact">
        <div className="container px-4 px-lg-5">
          <div className="row gx-4 gx-lg-5">
            <div className="col-md-4 mb-3 mb-md-0">
              <div className="card py-4 h-100">
                <div className="card-body text-center style={{ background: 'linear-gradient(135deg, #73a5f6, #0a74da)' }}">
                  <FontAwesomeIcon icon={faMapMarkedAlt} className="text-primary mb-2" />
                  <h4 className="text-uppercase m-0">Address</h4>
                  <hr className="my-4 mx-auto" />
                  <div className="small text-black-75">소재지</div>
                </div>
              </div>
            </div>
            <div className="col-md-4 mb-3 mb-md-0">
              <div className="card py-4 h-100">
                <div className="card-body text-center style={{ background: 'linear-gradient(135deg, #73a5f6, #0a74da)' }}">
                  <FontAwesomeIcon icon={faEnvelope} className="text-primary mb-2" />
                  <h4 className="text-uppercase m-0">Email</h4>
                  <hr className="my-4 mx-auto" />
                  <div className="small text-black-75">이메일 주소</div>
                </div>
              </div>
            </div>
            <div className="col-md-4 mb-3 mb-md-0">
              <div className="card py-4 h-100">
                <div className="card-body text-center style={{ background: 'linear-gradient(135deg, #73a5f6, #0a74da)' }}">
                  <FontAwesomeIcon icon={faMobileAlt} className="text-primary mb-2" />
                  <h4 className="text-uppercase m-0">Phone</h4>
                  <hr className="my-4 mx-auto" />
                  <div className="small text-black-75">전화번호</div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>
      <Footer />
    </div>
  );
};

export default Landing;
