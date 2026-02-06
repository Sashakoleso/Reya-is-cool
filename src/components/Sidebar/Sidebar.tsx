import {FC} from "react";
import * as styles from './Sidebar.css.ts';
import {OverviewIcon} from "../../icons/OverviewIcon.tsx";
import {useWalletStore} from "../../store/walletStore.ts";

export const Sidebar: FC = () => {
  const activeTab = useWalletStore.useActiveTab();
  const setActiveTab = useWalletStore.useSetActiveTab();

  return (
    <aside className={styles.sidebar}>
      <nav>
        <div className={`${styles.navItem} ${styles.navItemActive}`}>
          <OverviewIcon/>
          Overview
        </div>

        <div
          className={`${styles.navSubItem} ${activeTab === 'portfolio' ? styles.navSubItemActive : ''}`}
          onClick={() => setActiveTab('portfolio')}
        >
          Portfolio Overview
        </div>

        <div
          className={`${styles.navSubItem} ${activeTab === 'chart' ? styles.navSubItemActive : ''}`}
          onClick={() => setActiveTab('chart')}
        >
          Chart data
        </div>
      </nav>
    </aside>
  );
};