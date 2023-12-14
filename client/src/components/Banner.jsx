import banner from '../assets/joblist.png';
import Text from './ui/Text';
import styles from './styles/Banner.module.css';

export default function Banner() {
  return (
    <div className={styles.container}>
      <div className={styles.title}>
        <Text step={7} weight="400">
          Your Personal Job Finder
        </Text>
      </div>
      <div className={styles.image}>
        <img src={banner} alt="" />
      </div>
    </div>
  );
}
