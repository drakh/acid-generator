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

const { PI, cos, sin } = Math;

type Vec = [number, number];
type Matrix = [Vec, Vec];

// var angle = (Math.atan2(x,y) * (180/Math.PI) + 360) % 360;

const rad2deg = (deg: number): number => deg * (180 / PI);
const deg2rad = (rad: number): number => rad * (PI / 180);

const matrixMultiply = ([[a, b], [c, d]]: Matrix, [x, y]: Vec): Vec => {
  return [a * x + b * y, c * x + d * y];
};

const matrixRotate = (x: number): Matrix => {
  return [
    [cos(x), -sin(x)],
    [sin(x), cos(x)],
  ];
};

const vecAdd = ([a1, a2]: Vec, [b1, b2]: Vec): Vec => {
  return [a1 + b1, a2 + b2];
};

const describeArc = (
  cx: number,
  cy: number,
  radius: number,
  startDegrees: number,
  endDegrees: number,
  rotationDegrees: number,
): string => {
  const rotMatrix = matrixRotate(deg2rad(rotationDegrees));

  const [sx, sy] = vecAdd(
    matrixMultiply(rotMatrix, [
      radius * cos(deg2rad(startDegrees)),
      radius * sin(deg2rad(startDegrees)),
    ]),
    [cx, cy],
  );
  const [ex, ey] = vecAdd(
    matrixMultiply(rotMatrix, [
      radius * cos(deg2rad(startDegrees + endDegrees)),
      radius * sin(deg2rad(startDegrees + endDegrees)),
    ]),
    [cx, cy],
  );

  const fA = endDegrees > rad2deg(PI) ? 1 : 0;
  const fS = endDegrees > 0 ? 1 : 0;

  return [
    'M',
    sx,
    sy,
    'A',
    radius,
    radius,
    deg2rad(rotationDegrees),
    fA,
    fS,
    ex,
    ey,
  ].join(' ');
};

const radius = 40;
const mid = 50;

type Direction = 'vertical' | 'horizontal';

const calculateValue = (
  startX: number,
  startY: number,
  pageX: number,
  pageY: number,
  step: number,
  min: number,
  max: number,
  currentValue: number,
  direction: Direction,
): number => {
  const newValue =
    currentValue + (direction === 'horizontal' ? pageX - startX : startY - pageY) * step;
  return newValue >= max ? max : newValue <= min ? min : newValue;
};

interface Props {
  value: number;
  min: number;
  max: number;
  step: number;
  defaultValue: number;
  direction: Direction;
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
    const rangePath = describeArc(mid, mid, radius, 0, 300, 120);
    const valuePath = describeArc(
      mid,
      mid,
      radius,
      0,
      mapRange(value, min, max, 0, 300),
      120,
    );

    return { rangePath, valuePath };
  }, [value, min, max]);

  const handleMouseDown = useCallback(
    (e: ReactMouseEvent) => {
      e.preventDefault();
      const { pageX: startX, pageY: startY } = e;

      const handleMouseMove = (e: MouseEvent) => {
        e.preventDefault();
        const { pageX, pageY } = e;
        const v = calculateValue(
          startX,
          startY,
          pageX,
          pageY,
          step,
          min,
          max,
          value,
          direction,
        );
        onChange(v);
      };

      const handleMouseUp = () => {
        window.removeEventListener('mousemove', handleMouseMove);
        window.removeEventListener('mouseup', handleMouseUp);
      };

      window.addEventListener('mouseup', handleMouseUp);
      window.addEventListener('mousemove', handleMouseMove);
    },
    [direction, value, min, max, onChange, step],
  );

  const wrapper = useRef<SVGSVGElement>(null);

  useEffect(() => {
    if (wrapper.current) {
      const touchStartHandler = (e: TouchEvent) => {
        e.preventDefault();
        const {
          touches: [{ pageX: startX, pageY: startY }],
        } = e;
        const touchMoveHandler = (e: TouchEvent) => {
          e.preventDefault();

          const {
            touches: [{ pageX, pageY }],
          } = e;
          onChange(
            calculateValue(
              startX,
              startY,
              pageX,
              pageY,
              step,
              min,
              max,
              value,
              direction,
            ),
          );
        };
        const touchEndHandler = () => {
          wrapper.current?.removeEventListener('touchmove', touchMoveHandler);
          wrapper.current?.removeEventListener('touchend', touchEndHandler);
        };

        wrapper.current?.addEventListener('touchend', touchEndHandler);
        wrapper.current?.addEventListener('touchmove', touchMoveHandler);
      };
      wrapper.current.addEventListener('touchstart', touchStartHandler, {
        passive: false,
      });
      return () => {
        wrapper.current?.removeEventListener('touchstart', touchStartHandler);
      };
    }
  }, [value, min, max, direction, onChange]);

  return (
    <div className={styles.svgWrapper}>
      <svg onMouseDown={handleMouseDown} viewBox="0 0 100 100" ref={wrapper}>
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
    <form className={styles.knobWrapper} ref={wrapper} onSubmit={handleOnSubmit}>
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
        />
      </label>
    </form>
  );
};

export default KnobComponent;
