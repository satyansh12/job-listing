import Header from '../../components/Header';
import styles from './styles/index.module.css';
import Text from '../../components/ui/Text';
import Button from '../../components/ui/Button';
import { BadgeIndianRupee, Calendar } from 'lucide-react';
import Badge from '../../components/ui/Badge';

export default function Job() {
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
            <Text>Full Time</Text>
          </div>

          <div className={styles.position}>
            <div>
              <Text step={9} weight="500">
                WordPress Development
              </Text>
              <Text step={4} color="red">
                Bangalore | India
              </Text>
            </div>
            <Button>Edit</Button>
          </div>

          <div className={styles.details}>
            <div>
              <div className={styles.icon}>
                <BadgeIndianRupee size={20} />
                <Text step={3}>Stipend</Text>
              </div>
              <Text>Rs 250000/month</Text>
            </div>

            <div>
              <div className={styles.icon}>
                <Calendar size={20} />
                <Text step={3}>Duration</Text>
              </div>
              <Text>6 months</Text>
            </div>
          </div>

          <div className={styles.about}>
            <Text step={5} weight="500">
              About company
            </Text>
            <Text step={4} style={{ opacity: '0.8' }}>
              We provide technology-based services to help businesses and
              organizations achieve their goals. We offer a wide range of
              services, including software development, system integration,
              network and security services, cloud computing, and data
              analytics. Our primary focus is on leveraging technology to
              streamline business processes, improve productivity, and enhance
              overall efficiency.
            </Text>
          </div>

          <div className={styles.description}>
            <Text step={5} weight="500">
              About the job/internship
            </Text>
            <Text step={4} style={{ opacity: '0.8' }}>
              We are looking for a responsible PHP/WordPress/Laravel/Shopify
              Developer. He/She will be liable for managing services and
              therefore the interchange of knowledge between the server and the
              users. The candidate's primary focus is going to be the event of
              all server-side logic, definition, and maintenance of the central
              database and ensuring high performance and responsiveness to
              requests from the front end. Selected intern's day-to-day
              responsibilities include: 1. Work on the development of theme
              customization, liquid programming language, and corresponding apps
              2. Implement system integrations that are crucial to our success
              3. Contribute to the development of HTML5/CSS/JavaScript and
              standard web technologies integral to building seamless
              multi-channel experiences 4. Work on speed optimization and making
              a mobile-friendly website
            </Text>
          </div>

          <div className={styles.skills}>
            <Text step={5} weight="500">
              Skill(s) required
            </Text>
            <div className={styles.badge}>
              <Badge>CSS</Badge>
              <Badge>HTML</Badge>
              <Badge>JS</Badge>
            </div>
          </div>

          <div className={styles.additional}>
            <Text step={5} weight="500">
              Additional Information
            </Text>
            <Text step={4} style={{ opacity: '0.8' }}>
              Stipend structure: This is a performance-based internship. In
              addition to the minimum-assured stipend, you will also be paid a
              performance-linked incentive (₹ 2500 per design).
            </Text>
          </div>
        </div>
      </main>
    </>
  );
}
