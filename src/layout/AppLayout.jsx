import React, { useEffect, useRef, useState } from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
import '../layout/AppLayout.style.css';
import Container from 'react-bootstrap/Container';
import Form from 'react-bootstrap/Form';
import Nav from 'react-bootstrap/Nav';
import Navbar from 'react-bootstrap/Navbar';
import { Link, Outlet } from 'react-router-dom';
import logo from '../assets/logo/netflix-logo.png';
import searchIcon from '../assets/icon/search.png';
import ProfileImg from '../assets/profile/profile-img.png';
import Footer from './Footer';
import NotiIcon from '../assets/icon/notice.svg';

const AppLayout = () => {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isSearch, setIsSearch] = useState(null);
  const searchRef = useRef(null);

  const menu = [
    { title: '홈', url: '/' },
    { title: '시리즈', url: '/series' },
    { title: '영화', url: '/movies' },
    { title: '내가 찜한 리스트', url: '/' },
  ];
  const profileMenu = ['프로필 관리', '프로필 이전', '계정', '고객센터'];

  const clickSearch = e => {
    setIsSearch(true);
  };

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 50);
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  useEffect(() => {
    const handleClickOutside = e => {
      if (searchRef.current && !searchRef.current.contains(e.target)) {
        setIsSearch(false);
      }
    };

    document.addEventListener('mousedown', handleClickOutside);
    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, []);

  return (
    <div>
      <Navbar
        expand="lg"
        className={`header ${isScrolled ? 'scrolled' : ''} navbar`}
      >
        <Container fluid>
          {/* 로고 */}
          <Navbar.Brand className="text-danger fw-bold">
            <Link to="/">
              <div className="logo-wrap">
                <img src={logo} alt="Netflix Logo" width="100%" />
              </div>
            </Link>
          </Navbar.Brand>
          <Navbar.Toggle aria-controls="navbarScroll" />
          <Navbar.Collapse id="navbarScroll">
            <Nav
              className="me-auto my-2 my-lg-0"
              style={{ maxHeight: '100px', fontSize: '12px' }}
              navbarScroll
            >
              {menu.map((item, idx) => (
                <Nav.Link href={item.url} className="text-white" key={idx}>
                  {item.title}
                </Nav.Link>
              ))}
            </Nav>
            <Form className={`d-flex nav-right ${isSearch ? 'open' : 'close'}`}>
              {/* 검색 버튼 */}
              <div className="search-btn" onClick={clickSearch}>
                <img src={searchIcon} alt="search" width="100%" />
              </div>
              <div className="search-wrap" ref={searchRef}>
                <div className="search-btn">
                  <img src={searchIcon} alt="search" width="100%" />
                </div>
                <input
                  type="text"
                  placeholder="제목, 사람, 장르"
                  id="search"
                  name="search"
                />
              </div>
              {/* 프로필 */}
              <div className="notice-wrap">
                <img src={NotiIcon} alt="알림" />
              </div>
              <div className="profile-wrap">
                <img src={ProfileImg} alt="profileimage" width="100%" />
                <div className="dropdown-icon"></div>
                <div className="profile-sub-wrap">
                  {profileMenu.map((item, key) => (
                    <div className="profile-sub-menu" key={key}>
                      {item}
                    </div>
                  ))}
                </div>
              </div>
            </Form>
          </Navbar.Collapse>
        </Container>
      </Navbar>
      <Outlet />
      <Footer />
    </div>
  );
};

export default AppLayout;
