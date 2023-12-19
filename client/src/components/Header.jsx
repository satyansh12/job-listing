import { useContext } from 'react';
import image from '../assets/header.png';
import styles from './styles/Header.module.css';
import Button from './ui/Button';
import Text from './ui/Text';
import { AuthContext } from '../store/authContext';
import { Link } from 'react-router-dom';

export default function Header() {
  const authCtx = useContext(AuthContext);
  return (
    <div className={styles.header}>
      <img src={image} alt="" />
      <main>
        <Text step={6} color="white" weight="500">
          JobFinder
        </Text>
        <div className={styles.actions}>
          {authCtx.user ? (
            <>
              <Link onClick={authCtx.logout}>
                <Link onClick={authCtx.logout}>
                  <Text step={4} color="white">
                    Logout
                  </Text>
                </Link>
              </Link>
              <div>
                <Text step={4} color="white">
                  {authCtx.user.recruiterName}
                </Text>
              </div>
            </>
          ) : (
            <>
              <Link to="/auth/login">
                <Button variant="soft">Login</Button>
              </Link>
              <Link to="/auth/register">
                <Button variant="secondary">Register</Button>
              </Link>
            </>
          )}
        </div>
      </main>
    </div>
  );
}
