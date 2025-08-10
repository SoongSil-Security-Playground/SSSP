import styles from "./page.module.css";
import Tbdtbddl from "../../public/tbdtbddl.svg";
import Flag from "../../public/flag.svg";
import Image from "next/image";
import LabPromo from "@/shared/components/LabPromo";

export default function HomePage() {
  return (
    <div className={styles.mainContainer}>
      <div className={styles.mainContent}>
        <div className={styles.mainTitle}>
          <div className={styles.floatingImageLeft}>
            <Image src={Flag} alt="left" priority/>
          </div>
          SOONGSIL
          <br />
          SECURITY
          <br />
          PLAYGROUND
          <div className={styles.floatingImageRight}>
            <Image src={Tbdtbddl} alt="right" priority/>
          </div>
        </div>

        <a href="#labPromo" className={styles.scrollHint} aria-label="아래로 이동">
          <svg
            className={styles.scrollIcon}
            viewBox="0 0 24 24"
            aria-hidden="true"
          >
            <path d="M6 9l6 6 6-6" />
          </svg>
          <span className={styles.scrollText}>아래로 내려보세요</span>
        </a>

        <section id="labPromo" className={styles.promoSection}>
          <LabPromo/>
        </section>
      </div>
    </div>
  );
}
