import styles from './styles/Select.module.css';

export default function Select({ children }) {
  return <select className={styles.select}>{children}</select>;
}
