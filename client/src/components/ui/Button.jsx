import styles from './styles/Button.module.css';

export default function Button({
  children = 'button',
  variant = 'primary',
  disabled = false,
  onClick,
  icon,
  style,
  size,
  type = 'submit',
}) {
  const buttonVariant = styles[variant];
  const buttonWithIcon = icon ? styles.withIcon : '';
  const buttonSize = size == 'large' ? styles.largeButton : '';

  return (
    <button
      onClick={onClick}
      className={`${styles.button} ${buttonVariant} ${buttonWithIcon} ${buttonSize}`}
      disabled={disabled}
      style={{ ...style }}
      type={type}
    >
      {children}
      {icon && <div className={styles.icon}>{icon}</div>}
    </button>
  );
}
