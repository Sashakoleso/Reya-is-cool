import {FC} from "react";
import {useWalletStore} from '../../store/walletStore';
import {formatAddress} from '../../utils/formatters.ts';
import * as styles from './Header.css.ts';
import {Logo} from "../../icons/Logo.tsx";
export const Header: FC = () => {
  const walletAddress = useWalletStore.walletAddress();

  return (
    <header className={styles.header}>
      <div className={styles.logo}>
        <span className={styles.logoIconWrap}>
          <Logo/>
        </span>
        <span className={styles.logoText}>Portfolio</span>
      </div>
      {walletAddress && (
        <div className={styles.walletInfo}>
          <span>{formatAddress(walletAddress)}</span>
        </div>
      )}
    </header>
  );
}