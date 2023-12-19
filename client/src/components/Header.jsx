import image from '../assets/header.png';
import styles from './styles/Header.module.css';
import Button from './ui/Button';
import Text from './ui/Text';

export default function Header() {
  return (
    <div className={styles.header}>
      <img src={image} alt="" />
      <main>
        <Text step={6} color="white" weight="500">
          JobFinder
        </Text>
        <div className={styles.actions}>
          <Button variant="soft">Login</Button>
          <Button variant="secondary">Register</Button>
        </div>
      </main>
    </div>
  );
}
