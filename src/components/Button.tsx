import { type FC, type ReactNode, useEffect } from 'react';

import styles from './Button.module.less';

interface Props {
  children: ReactNode;
  title?: string;
  bindKey?: KeyboardEvent['code'];
  className?: string;
  onClick?: () => void;
}

const Button: FC<Props> = ({ children, onClick, bindKey, className, title }) => {
  useEffect(() => {
    if (bindKey && onClick) {
      const keyboardHandler = (e: KeyboardEvent) => {
        e.preventDefault();
        const { code } = e;
        if (code === bindKey) {
          onClick();
        }
      };
      window.addEventListener('keypress', keyboardHandler);
      return () => {
        window.removeEventListener('keypress', keyboardHandler);
      };
    }
  }, [bindKey, onClick]);
  return (
    <button
      onClick={onClick}
      className={`${styles.buttonBase} ${className ? className : ''}`}
      title={title}
    >
      {children}
    </button>
  );
};

export default Button;
