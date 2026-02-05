import {FC, FormEvent, useState} from 'react';
import {useWalletStore} from '../../../store/walletStore';
import {isValidAddress} from '../../../utils/formatters';
import {WalletInputProps} from './types';
import * as styles from './WalletInput.css';

const DEFAULT_WALLET = '0xB4B77d6180cc14472A9a7BDFF01cc2459368D413';

export const WalletInput: FC<WalletInputProps> = ({onSubmit}) => {
  const [inputValue, setInputValue] = useState(DEFAULT_WALLET);
  const [error, setError] = useState<string | null>(null);
  const setWalletAddress = useWalletStore.setWalletAddress();
  const setIsWalletAddressValid = useWalletStore.setIsWalletAddressValid();

  const handleSubmit = (e: FormEvent) => {
    e.preventDefault();
    setError(null);
    setIsWalletAddressValid(true);

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
    onSubmit?.(trimmedAddress);
  };

  return (
    <div className={styles.container}>
      <form id="wallet-input-form" onSubmit={handleSubmit} className={styles.form}>
        <input
          id="wallet-input"
          type="text"
          value={inputValue}
          onChange={(e) => setInputValue(e.target.value)}
          placeholder="Enter wallet address (0x...)"
          className={styles.input}
        />
        <button type="submit" className={styles.button}>
          Load Portfolio
        </button>
      </form>
      {error && <div className={styles.error}>{error}</div>}
    </div>
  );
}
