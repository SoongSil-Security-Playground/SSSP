import React, { type FC } from 'react'
import styles from './index.module.css'

export const Footer: FC = () => {
  return (
    <footer className={styles.footerContainer}>
      <div className={styles.copy}>© 2025 SSSP. All rights reserved.</div>
      <nav className={styles.linkList}>
        <a href="/privacy" className={styles.link}>Privacy Policy</a>
        <a href="/terms" className={styles.link}>Terms of Service</a>
        <a href="/contact" className={styles.link}>Contact Us</a>
      </nav>
    </footer>
  )
}
