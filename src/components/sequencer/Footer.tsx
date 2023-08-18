import { type FC } from 'react';
import ScaleSelector, { type Props as ScaleSelectorProps } from './ScaleSelector';

type Props = ScaleSelectorProps;

const Footer: FC<Props> = ({ scaleName, onScaleChange }) => {
  return (
    <section>
      <ScaleSelector scaleName={scaleName} onScaleChange={onScaleChange} />
    </section>
  );
};

export { type Props };

export default Footer;
