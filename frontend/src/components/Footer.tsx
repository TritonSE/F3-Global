import Image from "next/image";

import styles from "./Footer.module.css";
import { FooterMiniBtn } from "./FooterMiniBtn";

export const Footer = function Footer() {
  return (
    <div className={styles.footerContainer}>
      <div className={styles.textContainer}>
        <div className={styles.contactContainer}>
          <div className={styles.headerContainer}>
            <p className={styles.header}>
              <i>F3</i>GLOBAL
            </p>
          </div>

          <a className={styles.bodyText} href="tel:19496683568">
            949.668.3568
          </a>
          <a className={styles.link} href="mailto:info@f3-global.org">
            f3global@email.com
          </a>
          <a
            className={styles.bodyText}
            href="https://maps.app.goo.gl/M1onQnhbgSESpYtU6"
            target="_blank"
          >
            8 The Green STE <br /> A Dover, DE 19901
          </a>
          <div className={styles.socialsContainer}>
            <a href="https://www.linkedin.com/company/f3global/" target="_blank">
              <Image
                src="/imgs/linkedin.png"
                alt="linkedin icon"
                width={40}
                height={40}
                className={styles.icon}
              />
            </a>

            <a
              href="https://www.instagram.com/futureforwardfoundation?utm_source=ig_web_button_share_sheet&igsh=ZDNlZDc0MzIxNw=="
              target="_blank"
            >
              <Image
                src="/imgs/instagram.png"
                alt="instagram icon"
                width={40}
                height={40}
                className={styles.icon}
              />
            </a>
          </div>
          <p className={styles.copyrightText}>
            ©2025 F3Global. All rights reserved. <br />
            F3 Global is a 501(c)(3) non-profit organization.
          </p>
        </div>
        <div className={styles.linksContainer}>
          <div className={styles.linkCol}>
            <p className={styles.labelText}>Services</p>
            <FooterMiniBtn text="Donors" />
            <FooterMiniBtn text="Clients" />
            <FooterMiniBtn text="Members" />
            <FooterMiniBtn text="What We Do" />
            <FooterMiniBtn text="Contact" />
            <FooterMiniBtn
              text="Member Application"
              link="https://my-apply.vercel.app/org/f3-global-foundation"
            />
          </div>
          <div className={styles.linkCol}>
            <p className={styles.labelText}>Company</p>
            <FooterMiniBtn text="About" />
            <FooterMiniBtn text="News" />
            <FooterMiniBtn text="Events" />
            <FooterMiniBtn text="Meet The Team" />
            <FooterMiniBtn text="Privacy Policy" />
            <FooterMiniBtn text="Terms & Conditions" />
          </div>
        </div>
      </div>
    </div>
  );
};
