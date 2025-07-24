import React from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
import '../layout/AppLayout.style.css';
import Container from 'react-bootstrap/Container';
import Form from 'react-bootstrap/Form';
import Nav from 'react-bootstrap/Nav';
import Navbar from 'react-bootstrap/Navbar';
import { Outlet } from 'react-router-dom';
import logo from '../assets/logo/netflix-logo.png';
import searchIcon from '../assets/icon/search.png';
import ProfileImg from '../assets/profile/profile-img.png';

const AppLayout = () => {
  const menu = ['홈', '시리즈', '영화', '내가 찜한 리스트'];
  return (
    <div>
      <Navbar expand="lg" className="navbar bg-black">
        <Container fluid>
          {/* 로고 */}
          <Navbar.Brand href="#" className="text-danger fw-bold">
            <div className="logo-wrap">
              <img src={logo} alt="Netflix Logo" width="100%" />
            </div>
          </Navbar.Brand>
          <Navbar.Toggle aria-controls="navbarScroll" />
          <Navbar.Collapse id="navbarScroll">
            <Nav
              className="me-auto my-2 my-lg-0"
              style={{ maxHeight: '100px' }}
              navbarScroll
            >
              {menu.map((item, idx) => (
                <Nav.Link href="#action1" className="text-white" key={idx}>
                  {item}
                </Nav.Link>
              ))}
            </Nav>
            <Form className="d-flex nav-right">
              {/* 검색 버튼 */}
              <button className="search-btn">
                <img src={searchIcon} alt="search" width="100%" />
              </button>
              {/* 프로필 */}
              <div className="profile-wrap">
                <img src={ProfileImg} alt="profileimage" width="100%" />
              </div>
            </Form>
          </Navbar.Collapse>
        </Container>
      </Navbar>
      <Outlet />
    </div>
  );
};

export default AppLayout;
