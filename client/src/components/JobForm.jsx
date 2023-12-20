import { yupResolver } from '@hookform/resolvers/yup';
import { useForm } from 'react-hook-form';
import toast from 'react-hot-toast';
import { useNavigate, useParams, useRouteLoaderData } from 'react-router-dom';
import * as yup from 'yup';

import styles from './styles/JobForm.module.css';
import Button from './ui/Button';
import Input from './ui/Input';
import Text from './ui/Text';

const schema = yup
  .object({
    companyName: yup.string().required(),
    logo: yup.string().url().required(),
    monthlySalary: yup.string().required(),
    jobPosition: yup.string().required(),
    jobType: yup
      .string()
      .oneOf(['Fulltime', 'Part time', 'Temporary'])
      .required(),
    category: yup.string().oneOf(['Remote', 'Office']).required(),
    location: yup.string().required(),
    description: yup.string().required(),
    about: yup.string().required(),
    skills: yup.string().required(),
    information: yup.string().required(),
  })
  .required();

export default function JobForm({
  title = 'Add job description',
  toastMessage = 'Successfully posted job',
  action = 'Add job',
}) {
  const data = useRouteLoaderData('job');
  const job = data.data.job;
  const navigate = useNavigate();
  const { id } = useParams();
  const useFormObject = { resolver: yupResolver(schema) };

  if (id) {
    useFormObject.defaultValues = job;
  }

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm(useFormObject);

  const onSubmit = async (data) => {
    const token = JSON.parse(localStorage.getItem('user')).token;
    try {
      const res = await fetch(
        import.meta.env.VITE_SERVER_URL + '/api/v1/jobs/' + id,
        {
          method: 'PUT',
          body: JSON.stringify(data),
          headers: {
            'Content-Type': 'application/json',
            Authorization: 'Bearer ' + token,
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

      navigate('/');
      toast.success(toastMessage);
    } catch (error) {
      console.log(error.message);
    }
  };

  return (
    <div className={styles.container}>
      <Text step={7} weight="500">
        {title}
      </Text>

      <form onSubmit={handleSubmit(onSubmit)}>
        <div className={styles.inputField}>
          <label htmlFor="companyName">
            <Text step={4}>Company Name</Text>
          </label>
          <Input
            label="companyName"
            register={register}
            placeholder="Enter your company name here"
          />
          <Text color="red">{errors.companyName?.message}</Text>
        </div>

        <div className={styles.inputField}>
          <label htmlFor="logo">
            <Text step={4}>Add logo URL</Text>
          </label>
          <Input
            register={register}
            label="logo"
            placeholder="Enter the link"
          />
          <Text color="red">{errors.logo?.message}</Text>
        </div>

        <div className={styles.inputField}>
          <label htmlFor="logo">
            <Text step={4}>Job Position</Text>
          </label>
          <Input
            register={register}
            label="jobPosition"
            placeholder="Enter the link"
          />
          <Text color="red">{errors.jobPosition?.message}</Text>
        </div>

        <div className={styles.inputField}>
          <label htmlFor="monthlySalary">
            <Text step={4}>Monthly Salary</Text>
          </label>
          <Input
            register={register}
            label="monthlySalary"
            placeholder="Enter Amount in rupees"
          />
          <Text color="red">{errors.monthlySalary?.message}</Text>
        </div>

        <div className={styles.inputField}>
          <label htmlFor="jobType">
            <Text step={4}>Job Type</Text>
          </label>
          <div className={styles.selectBox}>
            <select {...register('jobType')} name="jobType" id="jobType">
              <option value="">Select</option>
              <option value="Fulltime">Fulltime</option>
              <option value="Part time">Partime</option>
              <option value="Temporary">Temporary</option>
            </select>
          </div>
          <Text color="red">{errors.jobType?.message}</Text>
        </div>

        <div className={styles.inputField}>
          <label htmlFor="category">
            <Text step={4}>Category</Text>
          </label>
          <div className={styles.selectBox}>
            <select {...register('category')} name="category" id="category">
              <option value="">Select</option>
              <option value="Remote">Remote</option>
              <option value="Office">Office</option>
            </select>
          </div>
          <Text color="red">{errors.category?.message}</Text>
        </div>

        <div className={styles.inputField}>
          <label htmlFor="location">
            <Text step={4}>Location</Text>
          </label>
          <Input
            register={register}
            label="location"
            placeholder="Enter Location"
          />
          <Text color="red">{errors.location?.message}</Text>
        </div>

        <div className={styles.inputField}>
          <label htmlFor="description">
            <Text step={4}>Job Description</Text>
          </label>
          <textarea
            {...register('description')}
            name="description"
            id="description"
            rows="2"
            placeholder="Type the job description"
          />
          <Text color="red">{errors.description?.message}</Text>
        </div>

        <div className={styles.inputField}>
          <label htmlFor="about">
            <Text step={4}>About Company</Text>
          </label>
          <textarea
            {...register('about')}
            name="about"
            id="about"
            rows="2"
            placeholder="Type about your company"
          />
          <Text color="red">{errors.about?.message}</Text>
        </div>

        <div className={styles.inputField}>
          <label htmlFor="skills">
            <Text step={4}>Skills Required</Text>
          </label>
          <Input
            register={register}
            label="skills"
            placeholder="Enter the must have skills"
          />
          <Text color="red">{errors.skills?.message}</Text>
        </div>

        <div className={styles.inputField}>
          <label htmlFor="information">
            <Text step={4}>Information</Text>
          </label>
          <Input
            register={register}
            label="information"
            placeholder="Enter the additional information"
          />
          <Text color="red">{errors.information?.message}</Text>
        </div>

        <div className={styles.action}>
          <Button>Cancel</Button>
          <Button>{action}</Button>
        </div>
      </form>
    </div>
  );
}
