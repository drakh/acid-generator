import { type FC, useCallback, useState } from 'react';
import { Knob, type KnobProps } from 'primereact/knob';
import { SlEmotsmile } from 'react-icons/sl';

import styles from './GeneratorControls.module.less';

const GeneratorControls: FC = () => {
  const [val, setVal] = useState(0);

  const onChange = useCallback(
    ({ value }: KnobProps) => {
      if (value) {
        setVal(value);
      }
    },
    [setVal],
  );

  return (
    <nav>
      <button className={styles.smile}>
        <SlEmotsmile />
      </button>
      <Knob onChange={onChange} value={val} min={0} max={50} step={5} />
    </nav>
  );
};

export default GeneratorControls;
