import Banner from './Banner';
import styles from './styles/AuthPage.module.css';
import worker from '../assets/joblist.png';

export default function AuthPage({ children }) {
  return (
    <div className={styles.container}>
      <div className={styles.wrapper}>{children}</div>
      <div className={styles.banner}>
        <Banner image={worker} title="Your Personal Job Finder" />
      </div>
    </div>
  );
}
