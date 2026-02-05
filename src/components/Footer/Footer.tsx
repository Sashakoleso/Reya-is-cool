import {FC, useEffect, useState} from 'react';
import * as styles from './Footer.css.ts';
import {ExternalLink} from "../../icons/ExternalLink.tsx";

export const Footer: FC = () => {
  const [localTime, setLocalTime] = useState(() => new Date().toLocaleTimeString('en-GB', {
    hour: '2-digit', minute: '2-digit', timeZone: 'UTC', hour12: false
  }));

  useEffect(() => {
    const interval = setInterval(() => {
      setLocalTime(new Date().toLocaleTimeString('en-GB', {
        hour: '2-digit', minute: '2-digit', timeZone: 'UTC', hour12: false
      }));
    }, 1000);

    return () => clearInterval(interval);
  }, []);

  return (
    <footer className={styles.footerContainer}>
      <div className={styles.time}>{localTime} UTC</div>
      <div className={styles.links}>
        <a
          className={styles.linkItem}
          href="https://docs.reya.xyz/"
          target="_blank"
          rel="noopener noreferrer"
        >
          Docs
          <ExternalLink/>
        </a>
        <a
          className={styles.linkItem}
          href="https://docs.reya.xyz/native-stablecoin/faqs"
          rel="noopener noreferrer"
        >
          Support
        </a>
      </div>
    </footer>
  );
}