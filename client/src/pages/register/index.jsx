import AuthPage from '../../components/AuthPage';
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
