import { useCallback, useContext, useEffect, useState } from 'react';

import Header from '../../components/Header';
import { AuthContext } from '../../store/authContext';
import JobCard from './JobCard';
import SearchBox from './SearchBox';
import styles from './styles/index.module.css';

export default function Home() {
  const [jobs, setJobs] = useState();
  const [params, setParams] = useState({});
  const authCtx = useContext(AuthContext);
  const paramsObj = (val) => setParams(val);

  const fetchJobs = useCallback(async () => {
    try {
      const res = await fetch(
        import.meta.env.VITE_SERVER_URL +
          `/api/v1/jobs?jobPosition=${params.jobPosition ?? ''}&skills=${
            params.skills ?? ''
          }`
      );
      const resData = await res.json();
      setJobs(resData.data.jobs);
    } catch (error) {
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
        <SearchBox authCtx={authCtx} paramsObj={paramsObj} />
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
