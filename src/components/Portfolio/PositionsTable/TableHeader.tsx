import {FC} from "react";
import {SortIcon} from '../../../icons/SortIcon';
import {SortField, TableHeaderProps} from './types';
import * as styles from './PositionsTable.css';

export const TableHeader: FC<TableHeaderProps> = ({
  sortField,
  sortDirection,
  onSort,
}) => {
  const renderSortIcon = (field: SortField) => {
    if (sortField !== field) {
      return <span className={styles.sortIcon}><SortIcon direction="none"/></span>;
    }

    return (<span className={styles.sortIconActive}>
        <SortIcon direction={sortDirection}/>
      </span>);
  };

  return (
    <thead className={styles.thead}>
    <tr>
      <th className={styles.thSortable} onClick={() => onSort('symbol')}>
        <div className={styles.thContent}>
          Market
          {renderSortIcon('symbol')}
        </div>
      </th>
      <th className={styles.thSortable} onClick={() => onSort('size')}>
        <div className={styles.thContent}>
          Size
          {renderSortIcon('size')}
        </div>
      </th>
      <th className={styles.thSortable} onClick={() => onSort('value')}>
        <div className={styles.thContent}>
          Position Value
          {renderSortIcon('value')}
        </div>
      </th>
      <th className={styles.thSortable} onClick={() => onSort('price')}>
        <div className={styles.thContent}>
          Mark Price
          {renderSortIcon('price')}
        </div>
      </th>
    </tr>
    </thead>
  );
};
