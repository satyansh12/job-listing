import styles from './styles/Input.module.css';

export default function Input({
  placeholder,
  label,
  register,
  required,
  type = 'text',
}) {
  return (
    <input
      type={type}
      placeholder={placeholder}
      className={styles.input}
      {...register(label, { required })}
    />
  );
}
