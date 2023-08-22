import { type FC } from 'react';
import { DownloadIcon, SaveIcon, ShiftLeftIcon, ShiftRightIcon } from '../Icons';
import Button from '../Button';

import styles from './Header.module.less';

interface Props {
  name: string;
  onDownloadClick: () => void;
  onShiftLeftClick: () => void;
  onShiftRightClick: () => void;
  onPatternStoreClick: () => void;
}

const Header: FC<Props> = ({
  name,
  onDownloadClick,
  onShiftRightClick,
  onShiftLeftClick,
  onPatternStoreClick,
}) => {
  return (
    <>
      <input type="text" value={name} readOnly className={styles.header} />
      <aside>
        <menu className={styles.toolbar}>
          <li>
            <Button
              onClick={onDownloadClick}
              title="save as midi"
              className={`${styles.header} ${styles.download}`}
            >
              <DownloadIcon />
            </Button>
          </li>
          <li>
            <Button
              className={styles.header}
              title="store pattern"
              onClick={onPatternStoreClick}
            >
              <SaveIcon />
            </Button>
          </li>
          <li>
            <Button
              className={styles.header}
              onClick={onShiftRightClick}
              title="shift pattern right"
            >
              <ShiftRightIcon />
            </Button>
          </li>
          <li>
            <Button
              className={styles.header}
              onClick={onShiftLeftClick}
              title="shift pattern left"
            >
              <ShiftLeftIcon />
            </Button>
          </li>
        </menu>
      </aside>
    </>
  );
};

export { type Props };

export default Header;
