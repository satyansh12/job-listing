import { Outlet } from 'react-router-dom';
import { Toaster } from 'react-hot-toast';
import styles from './RootLayout.module.css';
import AuthProvider from '../store/authContext';

export default function RootLayout() {
  return (
    <>
      <div className={styles.toast}>
        <Toaster
          position="bottom-left"
          reverseOrder={false}
          toastOptions={{
            style: {
              background: '#333',
              color: '#fff',
            },
          }}
        />
      </div>
      <main>
        <AuthProvider>
          <Outlet />
        </AuthProvider>
      </main>
    </>
  );
}
