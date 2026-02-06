import {FC, FormEvent, useEffect, useState} from "react";
import {useWalletStore} from '../../store/walletStore';
import {formatAddress, isValidAddress} from '../../utils/formatters.ts';
import * as styles from './Header.css.ts';
import {Logo} from "../../icons/Logo.tsx";

const DEFAULT_WALLET = '0xB4B77d6180cc14472A9a7BDFF01cc2459368D413';

export const Header: FC = () => {
  const walletAddress = useWalletStore.useWalletAddress();
  const setWalletAddress = useWalletStore.useSetWalletAddress();
  const setIsWalletAddressValid = useWalletStore.useSetIsWalletAddressValid();

  const [isEditing, setIsEditing] = useState(false);
  const [inputValue, setInputValue] = useState(walletAddress || DEFAULT_WALLET);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    if (walletAddress) setInputValue(walletAddress);
  }, [walletAddress]);

  const handleSubmit = (e?: FormEvent) => {
    e?.preventDefault();
    setError(null);

    const trimmedAddress = inputValue.trim();

    if (!trimmedAddress) {
      setError('Please enter a wallet address');
      setIsWalletAddressValid(false);
      return;
    }

    if (!isValidAddress(trimmedAddress)) {
      setError('Invalid wallet address format');
      setIsWalletAddressValid(false);
      return;
    }

    setWalletAddress(trimmedAddress);
    setIsWalletAddressValid(true);
    setIsEditing(false);
  };

  const handleButtonClick = () => {
    if (isEditing) {
      handleSubmit();
    } else {
      setIsEditing(true);
    }
  };

  return (
    <header className={styles.header}>
      <div className={styles.logo}>
        <span className={styles.logoIconWrap}>
          <Logo/>
        </span>
        <span className={styles.logoText}>Portfolio</span>
      </div>
      <div className={styles.walletInfo}>
        <div className={styles.walletWrapper}>
          {error && <div className={styles.walletError}>{error}</div>}
          {isEditing && (<input
            className={styles.walletInput}
            value={inputValue}
            onChange={(e) => setInputValue(e.target.value)}
            placeholder={DEFAULT_WALLET}
            onKeyDown={(e) => e.key === 'Enter' && handleSubmit()}
            autoFocus
          />)}
          <button className={styles.walletButton} onClick={handleButtonClick}>
            {walletAddress && !isEditing ? formatAddress(walletAddress) : 'Load portfolio'}
          </button>
        </div>
      </div>
    </header>
  );
};
