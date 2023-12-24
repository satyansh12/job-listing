import { useCallback, useContext, useEffect, useState } from 'react';

import Header from '../../components/Header';
import { AuthContext } from '../../store/authContext';
import JobCard from './JobCard';
import SearchBox from './SearchBox';
import styles from './styles/index.module.css';
import toast from 'react-hot-toast';

export default function Home() {
  const [jobs, setJobs] = useState();
  const [params, setParams] = useState({});
  const authCtx = useContext(AuthContext);
  const setParamsObj = (val) => setParams(val);

  const fetchJobs = useCallback(async () => {
    try {
      const res = await fetch(
        `${import.meta.env.VITE_SERVER_URL}/api/v1/jobs?jobPosition=${
          params.jobPosition ?? ''
        }&skills=${params.skills ?? ''}`
      );

      if (!res.ok) {
        throw new Error('Something went wrong');
      }

      const resData = await res.json();
      setJobs(resData.data.jobs);
    } catch (error) {
      toast.error(error.message);
      console.log(error);
    }
  }, [params]);

  useEffect(() => {
    fetchJobs();
  }, [fetchJobs]);

  return (
    <div>
      <Header />
      <main className={styles.main}>
        <SearchBox authCtx={authCtx} setParamsObj={setParamsObj} />
        {jobs && (
          <div className={styles.jobsCollection}>
            {jobs.map((job) => (
              <JobCard key={job._id} job={job} authCtx={authCtx} />
            ))}
          </div>
        )}
      </main>
    </div>
  );
}
