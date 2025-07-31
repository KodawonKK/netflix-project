import React from 'react';
import './Footer.style.css';
import Facebook from '../assets/icon/facebook.svg';
import Instagram from '../assets/icon/instagram.svg';
import X from '../assets/icon/x.svg';
import Youtube from '../assets/icon/youtube.svg';

const Footer = () => {
  const icon = [
    { name: Facebook, url: 'https://www.facebook.com/NetflixKR' },
    { name: Instagram, url: 'https://www.instagram.com/netflixkr/' },
    { name: X, url: 'https://twitter.com/netflixkr' },
    {
      name: Youtube,
      url: 'https://www.youtube.com/channel/UCiEEF51uRAeZeCo8CJFhGWw/featured',
    },
  ];
  const menu = [
    '화면 해설',
    '고객 센터',
    '기프트카드',
    '미디어 센터',
    '입사정보',
    '이용약관',
    '개인정보',
    '회사정보 ',
  ];
  return (
    <div>
      <div className="footer-wrap">
        <div className="footer">
          <div className="social-links">
            {icon.map((item, idx) => (
              <a
                href={item.url}
                target="_blank"
                rel="noopener noreferrer"
                key={idx}
              >
                <img src={item.name} alt="로고" />
              </a>
            ))}
          </div>
          <div className="footer-menu">
            {menu.map((item, idx) => (
              <span key={idx}>{item}</span>
            ))}
          </div>
          <div className="copyright">
            <div className="copy-text">
              넷플릭스서비시스코리아 유한회사 통신판매업신고번호:
              제2018-서울종로-0426호 전화번호: 00-308-321-0161 (수신자 부담)
            </div>
            <div className="copy-text">대표: 레지널드 숀 톰프슨</div>
            <div className="copy-text">이메일 주소: korea@netflix.com</div>
            <div className="copy-text">
              주소: 대한민국 서울특별시 종로구 우정국로 26, 센트로폴리스 A동
              20층 우편번호 03161
            </div>
            <div className="copy-text">사업자등록번호: 165-87-00119</div>
            <div className="copy-text">
              클라우드 호스팅: Amazon Web Services Inc.
            </div>
            <div id="" className="copy-text">
              <a href="http://www.ftc.go.kr/bizCommPop.do?wrkr_no=1658700119">
                공정거래위원회 웹사이트
              </a>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Footer;
