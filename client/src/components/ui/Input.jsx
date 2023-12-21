import styles from './styles/Input.module.css';

export default function Input({ variant, placeholder, label, type = 'text' }) {
  const inputVariant = variant == 'large' ? styles.largeInput : '';

  return (
    <input
      id={label}
      type={type}
      placeholder={placeholder}
      className={`${styles.input} ${inputVariant}`}
    />
  );
}
