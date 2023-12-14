import Button from '../../components/ui/Button';
import Input from '../../components/ui/Input';
import Text from '../../components/ui/Text';
import styles from './styles/RegisterForm.module.css';

export default function RegisterForm() {
  return (
    <form className={styles.container}>
      <Text step={8} weight="500">
        Create an account
      </Text>
      <Text style={{ marginTop: '0.5rem' }} step={4}>
        Your personal job finder is here
      </Text>

      <div className={styles.inputs}>
        <Input placeholder="Name"></Input>
        <Input placeholder="Email"></Input>
        <Input placeholder="Mobile"></Input>
        <Input placeholder="Password"></Input>
        <div>
          <input type="checkbox" name="" id="checkbox" />
          <label htmlFor="checkbox">
            By creating an account, I agree to our terms of use and privacy
            policy
          </label>
        </div>
      </div>

      <div className=""></div>

      <Button>Sing in</Button>

      <Text style={{ marginTop: '0.6rem' }} step={4}>
        Don’t have an account? <span>Sign up</span>
      </Text>
    </form>
  );
}
