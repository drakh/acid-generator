import {
  type ChangeEvent,
  type FC,
  type FormEvent,
  type MouseEvent as ReactMouseEvent,
  useCallback,
  useEffect,
  useMemo,
  useRef,
  useState,
} from 'react';
import { mapRange } from '../utils';

import styles from './Knob.module.less';

const minRadians = (4 * Math.PI) / 3;
const maxRadians = -Math.PI / 3;
const radius = 40;
const midX = 50;
const midY = 50;

interface Props {
  value: number;
  min: number;
  max: number;
  step: number;
  defaultValue: number;
  direction: 'vertical' | 'horizontal';
  onChange: (v: number) => void;
}

const Knob: FC<Omit<Props, 'defaultValue'>> = ({
  value,
  min,
  max,
  onChange,
  direction,
  step,
}) => {
  const { rangePath: rP, valuePath: vP } = useMemo(() => {
    const zeroRadians = mapRange(
      min > 0 && max > 0 ? min : 0,
      min,
      max,
      minRadians,
      maxRadians,
    );
    const valueRadians = mapRange(value, min, max, minRadians, maxRadians);

    const minX = midX + Math.cos(minRadians) * radius;
    const minY = midY - Math.sin(minRadians) * radius;
    const maxX = midX + Math.cos(maxRadians) * radius;
    const maxY = midY - Math.sin(maxRadians) * radius;
    const zeroX = midX + Math.cos(zeroRadians) * radius;
    const zeroY = midY - Math.sin(zeroRadians) * radius;
    const valueX = midX + Math.cos(valueRadians) * radius;
    const valueY = midY - Math.sin(valueRadians) * radius;

    const largeArc = Math.abs(zeroRadians - valueRadians) < Math.PI ? 0 : 1;
    const sweep = valueRadians > zeroRadians ? 0 : 1;

    const rangePath = `M ${minX} ${minY} A ${radius} ${radius} 0 1 1 ${maxX} ${maxY}`;
    const valuePath = `M ${zeroX} ${zeroY} A ${radius} ${radius} 0 ${largeArc} ${sweep} ${valueX} ${valueY}`;

    return { rangePath, valuePath };
  }, [value, min, max]);

  const handleMouseDown = useCallback(
    ({ pageX: startX, pageY: startY }: ReactMouseEvent) => {
      const handleMouseMove = (e: MouseEvent) => {
        e.preventDefault();
        const { pageX, pageY } = e;
        const newValue =
          value + (direction === 'horizontal' ? pageX - startX : startY - pageY) * step;
        onChange(newValue >= max ? max : newValue <= min ? min : newValue);
      };

      const handleMouseUp = () => {
        window.removeEventListener('mousemove', handleMouseMove);
        window.removeEventListener('mouseup', handleMouseUp);
      };

      window.addEventListener('mouseup', handleMouseUp);
      window.addEventListener('mousemove', handleMouseMove);
    },
    [direction, value, min, max, onChange],
  );

  return (
    <div className={styles.svgWrapper}>
      <svg onMouseDown={handleMouseDown} viewBox="0 0 100 100">
        <path d={rP}></path>
        <path d={vP}></path>
      </svg>
    </div>
  );
};

const KnobComponent: FC<Props & { label: string }> = ({
  value,
  min,
  max,
  step,
  onChange,
  defaultValue,
  direction,
  label,
}) => {
  const [inputVal, setInputVal] = useState<number>(value || defaultValue);

  useEffect(() => {
    setInputVal(value);
  }, [setInputVal, value]);

  const handleOnSubmit = useCallback(
    (e: FormEvent) => {
      e.preventDefault();
      onChange(inputVal);
    },
    [inputVal, onChange],
  );

  const handleKnobChange = useCallback(
    (val: number) => {
      onChange(val);
    },
    [onChange],
  );

  const handleInputChange = useCallback(
    ({ currentTarget: { value } }: ChangeEvent<HTMLInputElement>) =>
      setInputVal(Number(value)),
    [setInputVal],
  );

  const wrapper = useRef<HTMLFormElement>(null);

  useEffect(() => {
    if (wrapper.current) {
      const wheelHandler = (e: WheelEvent) => {
        e.preventDefault();
        const { deltaY } = e;
        const stepDown = value - step <= min ? min : value - step;
        const stepUp = value + step >= max ? max : value + step;
        onChange(deltaY < 0 ? stepUp : stepDown);
      };
      wrapper.current?.addEventListener('wheel', wheelHandler, { passive: false });
      return () => {
        wrapper.current?.removeEventListener('wheel', wheelHandler);
      };
    }
  }, [onChange, value, min, max, step]);

  return (
    <form className={styles.knobWrapper} ref={wrapper}>
      <label>
        <header>{label}</header>
        <Knob
          value={inputVal}
          min={min}
          max={max}
          step={step}
          onChange={handleKnobChange}
          direction={direction}
        />
        <input
          type="number"
          value={inputVal}
          min={min}
          max={max}
          step={step}
          onChange={handleInputChange}
          onSubmit={handleOnSubmit}
        />
      </label>
    </form>
  );
};

export default KnobComponent;
