import { useContext, useEffect, useState } from 'react';

import Header from '../../components/Header';
import styles from './styles/index.module.css';
import { Badge, Button, Input, Text } from '../../components/ui/index';
import { AuthContext } from '../../store/authContext';
import JobCard from './JobCard';

export default function Home() {
  const [jobs, setJobs] = useState();
  const authCtx = useContext(AuthContext);

  useEffect(() => {
    const fetchJobs = async () => {
      try {
        const res = await fetch(
          import.meta.env.VITE_SERVER_URL + '/api/v1/jobs'
        );
        const resData = await res.json();
        setJobs(resData.data.jobs);
      } catch (error) {
        console.log(error);
      }
    };

    fetchJobs();
  }, []);

  useEffect(() => {
    console.log(jobs);
  }, [jobs]);

  return (
    <div>
      <Header />
      <main className={styles.main}>
        <form className={styles.form}>
          <div className={styles.inputBox}>
            <Input
              variant="large"
              label="jobPosition"
              placeholder="Type any job title"
            ></Input>
          </div>
          <div className={styles.selectBox}>
            <select name="skills" id="skills">
              <option value="">Select</option>
              <option value="Fulltime">Fulltime</option>
              <option value="Part time">Partime</option>
              <option value="Temporary">Temporary</option>
            </select>

            <div className={styles.selected}>
              <Button />
              <Button />
              <Button />
            </div>

            <Text color="red">Clear</Text>
          </div>

          {authCtx.user && <Button>Add Job</Button>}
        </form>

        {jobs && (
          <div className={styles.jobsCollection}>
            {jobs.map((job) => (
              <JobCard job={job} authCtx={authCtx}/>
            ))}
          </div>
        )}
      </main>
    </div>
  );
}
