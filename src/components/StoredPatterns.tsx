import { type FC, useCallback } from 'react';
import { type Pattern } from '../types';
import Button from './Button';
import { DeleteIcon, DownloadIcon, LoadIcon } from './Icons';

import styles from './StoredPatterns.module.less';

const StoredPatterns: FC<{
  patterns: Pattern[];
  onDeleteClick: (i: number) => void;
  onDownloadClick: (i: number) => void;
  onLoadClick: (i: number) => void;
}> = ({ patterns, onDeleteClick, onDownloadClick, onLoadClick }) => {
  const handleDownloadClick = useCallback(
    (i: number) => () => {
      onDownloadClick(i);
    },
    [onDownloadClick],
  );

  const handleLoadClick = useCallback(
    (i: number) => () => {
      onLoadClick(i);
    },
    [onLoadClick],
  );

  const handleDeleteClick = useCallback(
    (i: number) => () => {
      onDeleteClick(i);
    },
    [onDeleteClick],
  );

  return (
    <>
      <header className={styles.header}>Stored patterns</header>
      <ul className={styles.list}>
        {patterns.map(({ name, scale, pattern: { length } }, i) => {
          return (
            <li key={`stored-pattern-${i}`}>
              <header>
                <Button onClick={handleLoadClick(i)}>
                  <LoadIcon />
                </Button>
                <Button onClick={handleDownloadClick(i)}>
                  <DownloadIcon />
                </Button>
                <Button onClick={handleDeleteClick(i)} className={styles.delete}>
                  <DeleteIcon />
                </Button>
              </header>
              <main>
                {name} [{length}]
              </main>
              <footer>{scale}</footer>
            </li>
          );
        })}
      </ul>
    </>
  );
};

export default StoredPatterns;
