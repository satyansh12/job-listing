import { yupResolver } from '@hookform/resolvers/yup';
import { useForm, Controller } from 'react-hook-form';
import toast from 'react-hot-toast';
import { Link, useNavigate } from 'react-router-dom';
import * as yup from 'yup';

import FormInput from './form/FormInput';
import styles from './styles/JobForm.module.css';
import { Button, Text } from './ui/index';
import FormSelect from './form/FormSelect';
import FormTextArea from './form/FormTextArea';

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
  id,
  jobDetails = {},
  title = 'Add job description',
  toastMessage = 'Successfully posted job',
  action = '+ Add job',
  method = 'POST',
}) {
  const navigate = useNavigate();
  const useFormObject = { resolver: yupResolver(schema) };

  if (jobDetails.skills) {
    jobDetails = {
      ...jobDetails,
      skills: jobDetails.skills.join(','),
    };
  }

  useFormObject.defaultValues = jobDetails;

  const {
    control,
    register,
    handleSubmit,
    formState: { errors },
  } = useForm(useFormObject);

  const onSubmit = async (data) => {
    let url = import.meta.env.VITE_SERVER_URL + '/api/v1/jobs/';

    if (id) {
      url += id;
    }

    const token = JSON.parse(localStorage.getItem('user')).token;
    try {
      const res = await fetch(url, {
        method,
        body: JSON.stringify(data),
        headers: {
          'Content-Type': 'application/json',
          Authorization: 'Bearer ' + token,
        },
      });
      const resData = await res.json();

      if (!res.ok) {
        throw new Error(resData.message);
      }

      navigate('/');
      toast.success(toastMessage);
    } catch (error) {
      toast.error(error.message, {
        style: {
          background: '#333',
          color: '#fff',
        },
      });
    }
    console.log(data);
  };

  const jobTypes = [
    { id: 1, name: 'Fulltime', unavailable: false },
    { id: 2, name: 'Part time', unavailable: false },
    { id: 3, name: 'Temporary', unavailable: false },
  ];

  const category = [
    { id: 1, name: 'Remote', unavailable: false },
    { id: 2, name: 'Office', unavailable: false },
  ];

  let jobTypeIndex;
  if (jobDetails.jobType) {
    jobTypeIndex = jobTypes.map((e) => e.name).indexOf(jobDetails.jobType);
  }

  let categoryIndex;
  if (jobDetails.category) {
    categoryIndex = category.map((e) => e.name).indexOf(jobDetails.category);
  }

  console.log(jobTypeIndex, categoryIndex);

  return (
    <div className={styles.container}>
      <Text step={6} weight="500">
        {title}
      </Text>

      <form onSubmit={handleSubmit(onSubmit)}>
        <div className={styles.inputField}>
          <label htmlFor="companyName">
            <Text step={3}>Company Name</Text>
          </label>
          <div className={styles.group}>
            <FormInput
              label="companyName"
              register={register}
              placeholder="Enter your company name here"
            />
            <Text step={2} color="red">
              {errors.companyName?.message}
            </Text>
          </div>
        </div>

        <div className={styles.inputField}>
          <label htmlFor="logo">
            <Text step={3}>Add logo URL</Text>
          </label>
          <div className={styles.group}>
            <FormInput
              register={register}
              label="logo"
              placeholder="Enter the link"
            />
            <Text color="red">{errors.logo?.message}</Text>
          </div>
        </div>

        <div className={styles.inputField}>
          <label htmlFor="logo">
            <Text step={3}>Job Position</Text>
          </label>
          <div className={styles.group}>
            <FormInput
              register={register}
              label="jobPosition"
              placeholder="Enter the link"
            />
            <Text color="red">{errors.jobPosition?.message}</Text>
          </div>
        </div>

        <div className={styles.inputField}>
          <label htmlFor="monthlySalary">
            <Text step={3}>Monthly Salary</Text>
          </label>
          <div className={styles.group}>
            <FormInput
              register={register}
              label="monthlySalary"
              placeholder="Enter Amount in rupees"
            />
            <Text color="red">{errors.monthlySalary?.message}</Text>
          </div>
        </div>

        <div className={styles.inputField}>
          <label htmlFor="jobType">
            <Text step={3}>Job Type</Text>
          </label>
          <Controller
            name="jobType"
            control={control}
            defaultValue={jobDetails.jobType ?? jobTypes[0].name}
            render={({ field: { onChange } }) => (
              <FormSelect
                index={jobTypeIndex}
                onChange={onChange}
                options={jobTypes}
              />
            )}
          />

          <Text color="red">{errors.jobType?.message}</Text>
        </div>

        <div className={styles.inputField}>
          <label htmlFor="category">
            <Text step={3}>Category</Text>
          </label>
          <Controller
            className={styles.contoller}
            name="category"
            control={control}
            defaultValue={jobDetails.category ?? category[0].name}
            render={({ field: { onChange } }) => (
              <FormSelect
                index={categoryIndex}
                onChange={onChange}
                options={category}
              />
            )}
          />
          <Text color="red">{errors.category?.message}</Text>
        </div>

        <div className={styles.inputField}>
          <label htmlFor="location">
            <Text step={3}>Location</Text>
          </label>
          <div className={styles.group}>
            <FormInput
              register={register}
              label="location"
              placeholder="Enter Location"
            />
            <Text color="red">{errors.location?.message}</Text>
          </div>
        </div>

        <div className={styles.inputField}>
          <label htmlFor="description">
            <Text step={3}>Job Description</Text>
          </label>
          <div className={styles.group}>
            <FormTextArea
              register={register}
              label="description"
              placeholder="Type the job description"
            />
            <Text color="red">{errors.description?.message}</Text>
          </div>
        </div>

        <div className={styles.inputField}>
          <label htmlFor="about">
            <Text step={3}>About Company</Text>
          </label>
          <div className={styles.group}>
            <FormTextArea
              register={register}
              label="about"
              placeholder="Type about your company"
            />
            <Text color="red">{errors.about?.message}</Text>
          </div>
        </div>

        <div className={styles.inputField}>
          <label htmlFor="skills">
            <Text step={3}>Skills Required</Text>
          </label>
          <div className={styles.group}>
            <FormInput
              register={register}
              label="skills"
              placeholder="Enter the must have skills"
            />
            <Text color="red">{errors.skills?.message}</Text>
          </div>
        </div>

        <div className={styles.inputField}>
          <label htmlFor="information">
            <Text step={3}>Information</Text>
          </label>
          <div className={styles.group}>
            <FormInput
              register={register}
              label="information"
              placeholder="Enter the additional information"
            />
            <Text color="red">{errors.information?.message}</Text>
          </div>
        </div>

        <div className={styles.action}>
          <Link to="/">
            <Button
              type="button"
              variant="outline"
              style={{ color: ' var(--primary)' }}
            >
              Cancel
            </Button>
          </Link>
          <Button>{action}</Button>
        </div>
      </form>
    </div>
  );
}
