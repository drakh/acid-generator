import { type FC } from 'react';
import ScaleSelector, { type Props as ScaleSelectorProps } from './ScaleSelector';
import OutputSelector, { type Props as OutputSelectorProps } from './OutputSelector';

import styles from './Footer.module.less';

type Props = ScaleSelectorProps & OutputSelectorProps;

const Footer: FC<Props> = ({ scaleName, onScaleChange, outputs, onOutputChange }) => {
  return (
    <section className={styles.sequencerFooter}>
      <ScaleSelector scaleName={scaleName} onScaleChange={onScaleChange} />
      <OutputSelector outputs={outputs} onOutputChange={onOutputChange} />
    </section>
  );
};

export { type Props };

export default Footer;
