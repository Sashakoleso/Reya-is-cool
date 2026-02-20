import {FC, memo} from "react";
import {formatNumber, formatUSD, getSymbolDisplayName} from '../../../utils/formatters';
import {PositionRowProps} from './types';
import * as styles from './PositionRow.css';

const PRICE_CHANGE_THRESHOLD = 0.01; // 0.01%

const isPriceChangeSignificant = (prevPrice: string, nextPrice: string): boolean => {
  const prev = parseFloat(prevPrice);
  const next = parseFloat(nextPrice);

  if (prev === 0) return next !== 0;

  const percentChange = Math.abs((next - prev) / prev) * 100;
  return percentChange > PRICE_CHANGE_THRESHOLD;
};

const arePropsEqual = (prevProps: PositionRowProps, nextProps: PositionRowProps): boolean => {
  const isSizeUnchanged = prevProps.position.totalQty === nextProps.position.totalQty;
  const isPriceUnchanged = !isPriceChangeSignificant(prevProps.position.markPrice, nextProps.position.markPrice);

  return isSizeUnchanged && isPriceUnchanged;
};

const PositionRowComponent: FC<PositionRowProps> = ({position}) => {
  const displayName = getSymbolDisplayName(position.symbol);
  const isLong = position.side === 'B';

  return (<tr className={styles.row}>
    <td className={styles.marketCell}>
        <span className={isLong ? styles.symbolLong : styles.symbolShort}>
          {displayName}
        </span>
      <span className={`${styles.symbolSuffix} ${isLong ? styles.symbolLong : styles.symbolShort}`}>
          {position.maxLeverage || ''}
        </span>
    </td>
    <td className={styles.sizeCell}>
      {formatNumber(position.totalQty, 2)}
    </td>
    <td className={styles.valueCell}>
      {formatUSD(position.positionValue)}
    </td>
    <td className={styles.priceCell}>
      {formatNumber(position.markPrice, 2)}
    </td>
  </tr>);
};

export const PositionRow = memo(PositionRowComponent, arePropsEqual);
