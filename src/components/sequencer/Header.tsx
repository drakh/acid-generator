import { type FC } from 'react';
import { DownloadIcon, ShiftLeft, ShiftRight } from '../Icons';
import Button from '../Button';

import styles from './Header.module.less';

interface Props {
  name: string;
  onDownloadClick: () => void;
  onShiftLeftClick: () => void;
  onShiftRightClick: () => void;
}

const Header: FC<Props> = ({
  name,
  onDownloadClick,
  onShiftRightClick,
  onShiftLeftClick,
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
            <Button className={styles.header} onClick={onShiftRightClick}>
              <ShiftRight />
            </Button>
          </li>
          <li>
            <Button className={styles.header} onClick={onShiftLeftClick}>
              <ShiftLeft />
            </Button>
          </li>
        </menu>
      </aside>
    </>
  );
};

export { type Props };

export default Header;
