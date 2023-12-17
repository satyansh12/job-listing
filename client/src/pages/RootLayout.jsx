import { Outlet } from 'react-router-dom';
import { Toaster } from 'react-hot-toast';
import styles from './styles/RootLayout.module.css';

export default function RootLayout() {
  return (
    <>
      <div className={styles.toast}>
        <Toaster position="bottom-left" reverseOrder={false} />
      </div>
      <main>
        <Outlet />
      </main>
    </>
  );
}
