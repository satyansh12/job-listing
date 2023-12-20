import { BadgeIndianRupee } from 'lucide-react';
import { useContext } from 'react';
import { Link, useRouteLoaderData } from 'react-router-dom';

import Header from '../../components/Header';
import Badge from '../../components/ui/Badge';
import Button from '../../components/ui/Button';
import Text from '../../components/ui/Text';
import { AuthContext } from '../../store/authContext';
import styles from './styles/index.module.css';

export default function Job() {
  const authCtx = useContext(AuthContext);
  const data = useRouteLoaderData('job');
  const job = data.data.job;
  console.log(job);

  return (
    <>
      <Header />
      <main className={styles.main}>
        <div className={styles.title}>
          <p>
            WordPress Development work from home job/internship at Adyaka
            Infosec Private Limited
          </p>
        </div>

        <div className={styles.info}>
          <div className={styles.metadata}>
            <Text>1w ago</Text>
            <Text>•</Text>
            <Text>{job.jobType}</Text>
          </div>

          <div className={styles.position}>
            <div>
              <Text step={9} weight="500">
                {job.jobPosition}
              </Text>
              <Text step={4} color="red">
                {job.location}
              </Text>
            </div>
            {authCtx.user && (
              <Link to="edit">
                <Button>Edit</Button>
              </Link>
            )}
          </div>

          <div className={styles.details}>
            <div>
              <div className={styles.icon}>
                <BadgeIndianRupee size={20} />
                <Text step={3}>Stipend</Text>
              </div>
              <Text>{job.monthlySalary}</Text>
            </div>
          </div>

          <div className={styles.about}>
            <Text step={5} weight="500">
              About company
            </Text>
            <Text step={4} style={{ opacity: '0.8' }}>
              {job.about}
            </Text>
          </div>

          <div className={styles.description}>
            <Text step={5} weight="500">
              About the job/internship
            </Text>
            <Text step={4} style={{ opacity: '0.8' }}>
              {job.description}
            </Text>
          </div>

          <div className={styles.skills}>
            <Text step={5} weight="500">
              Skill(s) required
            </Text>
            <div className={styles.badge}>
              {job.skills.map((el, index) => (
                <Badge key={index}>{el}</Badge>
              ))}
            </div>
          </div>

          <div className={styles.additional}>
            <Text step={5} weight="500">
              Additional Information
            </Text>
            <Text step={4} style={{ opacity: '0.8' }}>
              {job.information}
            </Text>
          </div>
        </div>
      </main>
    </>
  );
}
