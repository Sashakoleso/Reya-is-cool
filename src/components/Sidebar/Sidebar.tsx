import {FC} from "react";
import * as styles from './Sidebar.css.ts';
import {OverviewIcon} from "../../icons/OverviewIcon.tsx";

export const Sidebar: FC = () => (
  <aside className={styles.sidebar}>
    <nav>
      <div className={`${styles.navItem} ${styles.navItemActive}`}>
        <OverviewIcon/>
        Overview
      </div>

      <div className={styles.navSubItem}>
        Portfolio Overview
      </div>
    </nav>
  </aside>
);