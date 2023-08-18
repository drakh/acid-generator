import { type FC } from 'react';
import { IoCloudDownloadOutline as DownloadIcon } from 'react-icons/io5';
import Button from '../Button';

import styles from './Header.module.less';

interface Props {
  name: string;
  onDownloadClick: () => void;
}

const Header: FC<Props> = ({ name, onDownloadClick }) => {
  return (
    <>
      <input type="text" value={name} readOnly className={styles.header} />
      <aside>
        <menu>
          <li>
            <Button
              onClick={onDownloadClick}
              title="save as midi"
              className={styles.header}
            >
              <DownloadIcon />
            </Button>
          </li>
        </menu>
      </aside>
    </>
  );
};

export { type Props };

export default Header;
