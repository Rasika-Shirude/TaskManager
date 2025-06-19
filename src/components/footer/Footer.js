import React from 'react';
import './Footer.css';

const Footer = () => {
  return (
    <div>
      {/* Contact Section */}
      <section className="contact" id="contact">
        <div className="container">
          <h2>Contact Us</h2>
          <div className="contact-content">
            <div className="contact-info">
              <p>If you have questions or need support, reach out to us:</p>
              <ul>
                <li>Email: <a href="mailto:support@taskmanager.com">support@taskmanager.com</a></li>
                <li>Phone: +91-800-123-4567</li>
                <li>Address: 12, ABC, Electronic City, Bangalore</li>
              </ul>
            </div>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer>
        <p>© {new Date().getFullYear()} Task Manager App. All rights reserved.</p>
        <nav>
          <ul>
            <li><a href="#privacy">Privacy Policy</a></li>
            <li><a href="#terms">Terms & Conditions</a></li>
            <li><a href="#faq">FAQ</a></li>
          </ul>
        </nav>
      </footer>
    </div>
  );
};

export default Footer;
