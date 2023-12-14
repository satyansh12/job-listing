import Button from '../../components/ui/Button';
import Input from '../../components/ui/Input';
import Text from '../../components/ui/Text';
import styles from './styles/LoginForm.module.css';

export default function LoginForm() {
  return (
    <div className={styles.container}>
      <Text step={8} weight="500">
        Already have an account?
      </Text>
      <Text style={{ marginTop: '0.5rem' }} step={4}>
        Your personal job finder is here
      </Text>

      <div className={styles.inputs}>
        <Input placeholder="Email"></Input>
        <Input placeholder="Password"></Input>
      </div>

      <Button>Sing in</Button>

      <Text style={{ marginTop: '0.6rem' }} step={4}>
        Don’t have an account? <span>Sign up</span>
      </Text>
    </div>
  );
}
