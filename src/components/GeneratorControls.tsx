import { type FC } from 'react';
import {
  FaRegSmileBeam as Acid,
  FaRegSmileWink as AcidWaitingToHit,
} from 'react-icons/fa';

import styles from './GeneratorControls.module.less';

const GeneratorControls: FC<{ onGenerateClick: () => void; waiting: boolean }> = ({
  onGenerateClick,
  waiting,
}) => {
  return (
    <nav className={styles.controls}>
      <button
        className={`${styles.smile} ${waiting ? styles.waiting : ''}`}
        onClick={onGenerateClick}
      >
        {waiting ? <AcidWaitingToHit /> : <Acid />}
      </button>
    </nav>
  );
};

export default GeneratorControls;
