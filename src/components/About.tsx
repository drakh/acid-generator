import { type FC } from 'react';
import ReactMarkdown from 'react-markdown';

import styles from './About.module.less';

const About: FC<{ content: string }> = ({ content }) => {
  return (
    <aside className={styles.about}>
      <header>ABOUT</header>
      <main>
        <ReactMarkdown children={content} />
      </main>
    </aside>
  );
};

export default About;
