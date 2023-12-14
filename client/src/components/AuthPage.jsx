import Banner from './Banner';
import styles from './styles/AuthPage.module.css';

export default function AuthPage({ children }) {
  return (
    <div className={styles.container}>
      <div className={styles.wrapper}>{children}</div>
      <Banner />
    </div>
  );
}
