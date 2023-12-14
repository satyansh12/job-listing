import styles from './styles/Input.module.css';

export default function Input({ placeholder }) {
  return (
    <input type="text" placeholder={placeholder} className={styles.input} />
  );
}
