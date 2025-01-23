/* eslint-disable jsx-a11y/img-redundant-alt */
import React from 'react';
import './Footer.css';
import footer_logo from '../Assets/logo_big.png';
import instagram_icon from '../Assets/instagram_icon.png';
import pintester_icon from '../Assets/pintester_icon.png';
import whatsapp_icon from '../Assets/whatsapp_icon.png';

const Footer = () => {
  return (
    <footer className="footer" role="contentinfo" itemScope itemType="http://schema.org/Person">
      <div className="footer-left" itemScope itemType="http://schema.org/Person">
        <img src={footer_logo} alt="Profile Picture" itemProp="image" className="u-logo logo" />
        <h3 itemProp="name" className="p-name">SILKSEW</h3>
        <nav aria-label="Footer Navigation">
          <p className="footer-links">
            <a href="/" itemProp="url" className="link-1">Shop</a>
            <a href="/mens" itemProp="url">Men</a>
            <a href="/womens" itemProp="url">Women</a>
            <a href="/kids" itemProp="url">Kids</a>
          </p>
        </nav>
        <p className="footer-name">© 2025 <a style={{ color: 'inherit' }} href="/">WTL</a></p>
      </div>

      <div className="footer-center">
        <div itemScope itemType="http://schema.org/PostalAddress" className="p-address">
          <i className="fa fa-map-marker" aria-hidden="true"></i>
          <p>
            <span itemProp="streetAddress" className="p-street-address">123 This is a Street</span>
            <span itemProp="addressLocality" className="p-locality">A Locality</span>
            <span itemProp="addressRegion" className="p-region">Region state</span>
            <span itemProp="postalCode" className="p-postal-code">12345</span>
          </p>
        </div>
        <div>
          <i className="fa fa-phone" aria-hidden="true"></i>
          <p itemProp="telephone" className="p-tel">+1 234567890</p>
        </div>
        <div>
          <i className="fa fa-envelope" aria-hidden="true"></i>
          <p><a href="mailto:myname@mail.com" itemProp="email" className="u-email">myname@mail.com</a></p>
        </div>
      </div>

      <div className="footer-right">
        <p className="footer-about">
          <span>About Me</span>
          Not a web developer, but have a knack for creating stunning websites and applications. Everywhere @sdavidprince
        </p>
        <div className="footer-socials">
          <a href="/" rel="me" aria-label="Whatsapp" itemProp="sameAs" className="u-url">
            <img src={whatsapp_icon} alt="Whatsapp" />
          </a>
          <a href="/" rel="me" aria-label="Pintester" itemProp="sameAs" className="u-url">
            <img src={pintester_icon} alt="Pintester" />
          </a>
          <a href="/" rel="me" aria-label="Instagram" itemProp="sameAs" className="u-url">
            <img src={instagram_icon} alt="Instagram" />
          </a>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
