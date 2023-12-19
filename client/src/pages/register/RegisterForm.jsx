import { Link, useNavigate } from 'react-router-dom';
import { useState } from 'react';
import { useForm } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import * as yup from 'yup';

import Button from '../../components/ui/Button';
import Input from '../../components/ui/Input';
import Text from '../../components/ui/Text';
import styles from './styles/RegisterForm.module.css';
import toast from 'react-hot-toast';

const phoneRegex =
  /^(\+?\d{0,4})?\s?-?\s?(\(?\d{3}\)?)\s?-?\s?(\(?\d{3}\)?)\s?-?\s?(\(?\d{4}\)?)?$/;

const schema = yup
  .object({
    name: yup.string().required(),
    email: yup.string().email().required(),
    mobile: yup
      .string()
      .min(6)
      .matches(phoneRegex, {
        message: 'Please enter valid number.',
        excludeEmptyString: false,
      })
      .required(),
    password: yup.string().min(6).required(),
  })
  .required();

export default function RegisterForm() {
  const [isChecked, setIsChecked] = useState(false);
  const navigate = useNavigate();

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm({
    resolver: yupResolver(schema),
  });

  const onSubmit = async (data) => {
    if (isChecked) {
      try {
        const res = await fetch(
          import.meta.env.VITE_SERVER_URL + '/api/v1/users/register',
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
    }
  };

  return (
    <form onSubmit={handleSubmit(onSubmit)} className={styles.container}>
      <Text step={8} weight="500">
        Create an account
      </Text>
      <Text style={{ marginTop: '0.5rem' }} step={4}>
        Your personal job finder is here
      </Text>

      <div className={styles.inputs}>
        <div className={styles.inputBox}>
          <Input
            variant="large"
            label="name"
            register={register}
            placeholder="Name"
          ></Input>
          <Text color="red">{errors.name?.message}</Text>
        </div>

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
            label="mobile"
            register={register}
            placeholder="Mobile"
          ></Input>
          <Text color="red">{errors.mobile?.message}</Text>
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

        <div>
          <input
            onChange={(e) => setIsChecked(e.target.checked)}
            type="checkbox"
            id="checkbox"
          />
          <label htmlFor="checkbox">
            By creating an account, I agree to our terms of use and privacy
            policy
          </label>
        </div>
      </div>

      <Button size="large">Sing in</Button>

      <Text style={{ marginTop: '0.6rem' }} step={4}>
        Already have an account?
        <span>
          <Link to="/login">Sign in</Link>
        </span>
      </Text>
    </form>
  );
}
