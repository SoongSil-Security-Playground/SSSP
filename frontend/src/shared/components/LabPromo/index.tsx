"use client";
import { useEffect, useRef, useState } from "react";
import Image from "next/image";
import styles from "./index.module.css";
import Terminal from "../../../../public/terminal.svg";
import { useAuth, useAuthUI } from "@/shared/utils/AuthProvider";
import { useRouter } from "next/navigation";

export default function LabPromo() {
  const ref = useRef<HTMLDivElement>(null);
  const [visible, setVisible] = useState(false);
  const { isLoggedIn } = useAuth();
  const { openLogin } = useAuthUI();
  const router = useRouter();

  useEffect(() => {
    const io = new IntersectionObserver(([e]) => setVisible(e.isIntersecting), { threshold: 0.2 });
    if (ref.current) io.observe(ref.current);
    return () => io.disconnect();
  }, []);

  const handleClick = () => {
    if (!isLoggedIn) openLogin();
    else router.push("/challenges");
  };

  return (
    <section ref={ref} className={`${styles.wrap} ${visible ? styles.visible : ""}`}>
      <div className={styles.inner}>
        <div className={styles.artCol}>
          <div className={styles.floatWrap} aria-hidden>
            <Image src={Terminal} alt="terminal" className={styles.pixelArt} />
            <span className={styles.glow} />
          </div>
        </div>

        <div className={styles.copyCol}>
          <span className={styles.pill}>TERMINAL</span>
          <h3>브라우저에서 바로 문제 풀이</h3>
          <p>설치 없이 시작하는 격리된 셸 환경. 빠르게 실행하고, 쉽게 초기화하세요.</p>
          <div className={styles.ctaRow}>
            <button onClick={handleClick} className={styles.cta}>
              {isLoggedIn ? "문제 목록 보기" : "로그인하고 문제 목록 보기"}
            </button>
          </div>
        </div>
      </div>
    </section>
  );
}
