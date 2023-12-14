import AuthPage from '../../components/AuthPage';
import Banner from '../../components/Banner';
import RegisterForm from './RegisterForm';
import styles from './styles/index.module.css';

export default function Register() {
  return (
    <div className={styles.main}>
      <AuthPage>
        <RegisterForm />
      </AuthPage>
    </div>
  );
}
