import { type FC } from 'react';
import {
  FaRegSmileBeam as Acid,
  FaRegSmileWink as AcidWaitingToHit,
} from 'react-icons/fa';
import { DEFAULTS } from '../constants';
import Knob from './Knob';

import styles from './GeneratorControls.module.less';

const GeneratorControls: FC<{
  patternLength: number;
  spread: number;
  density: number;
  accentsDensity: number;
  slidesDensity: number;
  waiting: boolean;

  onGenerateClick: () => void;
  onPatternLengthChange: (v: number) => void;
  onDensityChange: (v: number) => void;
  onSpreadChange: (v: number) => void;
  onAccentsChange: (v: number) => void;
  onSlidesChange: (v: number) => void;
}> = ({
  patternLength,
  density,
  spread,
  accentsDensity,
  slidesDensity,
  waiting,
  onGenerateClick,
  onSpreadChange,
  onDensityChange,
  onPatternLengthChange,
  onAccentsChange,
  onSlidesChange,
}) => {
  return (
    <nav className={styles.controls}>
      <button
        className={`${styles.smile} ${waiting ? styles.waiting : ''}`}
        onClick={onGenerateClick}
      >
        {waiting ? <AcidWaitingToHit /> : <Acid />}
      </button>
      <ul>
        <li>
          <Knob
            onChange={onPatternLengthChange}
            min={16}
            max={64}
            defaultValue={DEFAULTS.SEQ_LENGTH}
            value={patternLength}
            direction={'vertical'}
            step={16}
            label={'PATTERN LENGTH'}
          />
        </li>
        <li>
          <Knob
            onChange={onSpreadChange}
            min={0}
            max={100}
            defaultValue={50}
            value={spread}
            direction={'vertical'}
            step={1}
            label={'SPREAD'}
          />
        </li>
        <li>
          <Knob
            onChange={onDensityChange}
            min={0}
            max={100}
            defaultValue={50}
            value={density}
            direction={'vertical'}
            step={1}
            label={'DENSITY'}
          />
        </li>
        <li>
          <Knob
            onChange={onAccentsChange}
            min={0}
            max={100}
            defaultValue={50}
            value={accentsDensity}
            direction={'vertical'}
            step={1}
            label={'ACCENTS DENSITY'}
          />
        </li>
        <li>
          <Knob
            onChange={onSlidesChange}
            min={0}
            max={100}
            defaultValue={50}
            value={slidesDensity}
            direction={'vertical'}
            step={1}
            label={'SLIDES DENSITY'}
          />
        </li>
      </ul>
      <aside>
        <label>
          <input type="checkbox" />
          START WITH NOTE
        </label>
        <label>
          <input type="checkbox" />
          START WITH ACCENT
        </label>
      </aside>
    </nav>
  );
};

export default GeneratorControls;
