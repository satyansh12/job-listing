import { Link, useNavigate } from 'react-router-dom';
import { useForm } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import * as yup from 'yup';
import toast from 'react-hot-toast';

import Button from '../../components/ui/Button';
import Input from '../../components/ui/Input';
import Text from '../../components/ui/Text';
import styles from './styles/LoginForm.module.css';

const schema = yup
  .object({
    email: yup.string().email().required(),
    password: yup.string().min(6).required(),
  })
  .required();

export default function LoginForm() {
  const navigate = useNavigate();

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm({
    resolver: yupResolver(schema),
  });

  const onSubmit = async (data) => {
    try {
      const res = await fetch(
        import.meta.env.VITE_SERVER_URL + '/api/v1/users/login',
        {
          method: 'POST',
          body: JSON.stringify(data),
          headers: {
            'Content-Type': 'application/json',
          },
        }
      );

      const resData = await res.json();

      if (!res.ok) {
        toast.error(resData.message, {
          style: {
            background: '#333',
            color: '#fff',
          },
        });
        throw new Error(resData.message);
      }

      if (resData.token) {
        const user = {
          token: resData.token,
          recruiterName: resData.recruiterName,
        };

        localStorage.setItem('user', JSON.stringify(user));
        navigate('/');
      }
    } catch (error) {
      console.log(error.message);
    }
  };

  return (
    <form onSubmit={handleSubmit(onSubmit)} className={styles.container}>
      <Text step={8} weight="500">
        Already have an account?
      </Text>
      <Text style={{ marginTop: '0.5rem' }} step={4}>
        Your personal job finder is here
      </Text>

      <div className={styles.inputs}>
        <div className={styles.inputBox}>
          <Input
            variant="large"
            label="email"
            register={register}
            placeholder="Email"
          ></Input>
          <Text color="red">{errors.email?.message}</Text>
        </div>

        <div className={styles.inputBox}>
          <Input
            variant="large"
            label="password"
            register={register}
            type="password"
            placeholder="Password"
          ></Input>
          <Text color="red">{errors.password?.message}</Text>
        </div>
      </div>

      <Button size="large">Sing in</Button>

      <Text style={{ marginTop: '0.6rem' }} step={4}>
        Don’t have an account?{' '}
        <span>
          {' '}
          <Link to="/register">Sign up</Link>
        </span>
      </Text>
    </form>
  );
}
