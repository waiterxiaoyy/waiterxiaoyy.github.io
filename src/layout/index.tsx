import { Outlet, useLocation } from 'react-router-dom';
import Header from '../components/header';
import styles from './index.module.less';
import Footer from '../components/footer';

export default function ILayout() {
  const loadtion = useLocation();

  return (
    <div className={styles.container}>
      <div className={styles.header}>
        <Header />
      </div>
      <div className={styles.content}>
        <Outlet />
      </div>
      {loadtion.pathname !== '/editor' && (
        <div className={styles.footer}>
          <Footer />
        </div>
      )}
    </div>
  );
}
