import { FC } from 'react';

type SortIconProps = {
  direction?: 'asc' | 'desc' | 'none';
};

export const SortIcon: FC<SortIconProps> = ({ direction = 'none' }) => {
  if (direction === 'asc') {
    return (
      <svg viewBox="0 0 24 24" fill="none" stroke="currentColor">
        <path d="M7 15l5-5 5 5" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
      </svg>
    );
  }

  return (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor">
      <path d="M7 10l5 5 5-5" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
    </svg>
  );
};
