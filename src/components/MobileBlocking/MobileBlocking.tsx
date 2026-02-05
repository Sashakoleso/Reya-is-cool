import {FC} from 'react';
import * as styles from './MobileBlocking.css';
import {WarnIcon} from "../../icons/WarnIcon.tsx";

export const MobileBlocking: FC = () => (
  <div className={styles.container}>
    <WarnIcon/>
    <div className={styles.content}>
      <h1 className={styles.title}>Mobile Experience Under Development</h1>
      <p className={styles.description}>
        We're working hard to bring you the best mobile trading experience.
        In the meantime, please visit us on your desktop for the full experience.
      </p>
      <div className={styles.footer}>
        Open on Desktop for best experience
      </div>
    </div>
  </div>
);

