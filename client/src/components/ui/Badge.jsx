import styles from './styles/Badge.module.css';
import Text from './Text';

export default function Badge({ children }) {
  return (
    <div className={styles.badge}>
      <Text weight="500">{children}</Text>
    </div>
  );
}
