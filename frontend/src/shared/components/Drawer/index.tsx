// src/components/Drawer/Drawer.tsx
import React, { type FC, type ReactNode } from 'react'
import styles from './index.module.css'

type DrawerProps = {
  isOpen: boolean
  onClose: () => void
  children: ReactNode
}

export const Drawer: FC<DrawerProps> = ({ isOpen, onClose, children }) => {
  return (
    <>
      <div
        className={
          isOpen
            ? styles.backdropOpen
            : styles.backdropClosed
        }
        onClick={onClose}
      />

      <aside
        className={
          isOpen
            ? styles.panelOpen
            : styles.panelClosed
        }
      >
        <button
          className={styles.closeButton}
          onClick={onClose}
          aria-label="Close drawer"
        >
          ×
        </button>
        <div className={styles.content}>
          {children}
        </div>
      </aside>
    </>
  )
}