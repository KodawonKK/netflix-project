import React, { useEffect, useRef, useState } from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
import '../layout/AppLayout.style.css';
import Container from 'react-bootstrap/Container';
import Form from 'react-bootstrap/Form';
import Nav from 'react-bootstrap/Nav';
import Navbar from 'react-bootstrap/Navbar';
import { Link, Outlet, useNavigate } from 'react-router-dom';
import logo from '../assets/logo/netflix-logo.png';
import searchIcon from '../assets/icon/search.png';
import ProfileImg from '../assets/profile/profile-img.png';
import Footer from './Footer';
import NotiIcon from '../assets/icon/notice.svg';
import NavDropdown from 'react-bootstrap/NavDropdown';
// import { useSearchMovies } from '../hooks/movie/useSearchMovies';

const AppLayout = () => {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isSearch, setIsSearch] = useState(null);
  const [result, setResult] = useState([]);
  const [query, setQuery] = useState('');
  const [isMobileClick, setMobileClick] = useState(false);
  const searchRef = useRef(null);
  const mobileMenuRef = useRef();
  const navigate = useNavigate();

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
  const handleKeyDown = e => {
    if (e.key === 'Enter') {
      // Enter 입력 시 navigate
      const value = e.target.value.trim();
      if (value) navigate(`/search?q=${value}`, { state: { query: value } });
    }
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

  useEffect(() => {
    const handleClickOutside = e => {
      if (mobileMenuRef.current && !mobileMenuRef.current.contains(e.target)) {
        setMobileClick(false);
      }
    };
    document.addEventListener('mousedown', handleClickOutside);
    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, []);

  return (
    <div>
      <div className={`header ${isScrolled ? 'scrolled' : ''} navbar`}>
        <div className="nav-left">
          <Link to="/">
            <div className="logo-wrap">
              <img src={logo} alt="Netflix Logo" width="100%" />
            </div>
          </Link>
          <div className="nav-menu-wrap">
            <div
              className="nav-menu-mobile-wrap"
              ref={mobileMenuRef}
              onClick={e => {
                setMobileClick(true);
              }}
            >
              <span>메뉴</span>
              <div className="dropdown-icon"></div>
              <div className={`nav-mobile ${isMobileClick ? 'open' : 'close'}`}>
                {menu.map((item, idx) => (
                  <Link to={item.url} key={idx} className="nav-menu-mobile">
                    {item.title}
                  </Link>
                ))}
              </div>
            </div>

            {menu.map((item, idx) => (
              <Link to={item.url} key={idx} className="nav-menu">
                {item.title}
              </Link>
            ))}
          </div>
        </div>
        <div className={`d-flex nav-right ${isSearch ? 'open' : 'close'}`}>
          <div className="search-btn" onClick={clickSearch}>
            <img src={searchIcon} alt="search" width="100%" />
          </div>
          <div className="search-wrap" ref={searchRef}>
            <div className="search-btn" style={{ margin: 0 }}>
              <img src={searchIcon} alt="search" width="100%" />
            </div>
            <input
              type="text"
              placeholder="제목, 사람, 장르"
              id="search"
              name="search"
              onChange={e => setQuery(e.target.value)}
              onKeyDown={handleKeyDown}
            />
          </div>
          <div className="notice-wrap">
            <img src={NotiIcon} alt="알림" />
          </div>
          <div className="profile-wrap">
            <div className="profile-img-wrap">
              <img src={ProfileImg} alt="profileimage" width="100%" />
              <div className="dropdown-icon"></div>
            </div>
            <div className="profile-sub-wrap">
              {profileMenu.map((item, key) => (
                <div className="profile-sub-menu" key={key}>
                  {item}
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
      <Outlet />
      <Footer />
    </div>
  );
};

export default AppLayout;
