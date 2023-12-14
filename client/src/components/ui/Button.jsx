import styles from './styles/Button.module.css';

export default function Button({
  children = 'button',
  variant = 'primary',
  disabled = false,
  onClick,
  icon,
  inlineStyles,
}) {
  const buttonVariant = styles[variant];
  const buttonWithIcon = icon ? styles.withIcon : '';

  return (
    <button
      onClick={onClick}
      className={`${styles.button} ${buttonVariant} ${buttonWithIcon}`}
      disabled={disabled}
      style={{ ...inlineStyles }}
    >
      {children}
      {icon && <div className={styles.icon}>{icon}</div>}
    </button>
  );
}
