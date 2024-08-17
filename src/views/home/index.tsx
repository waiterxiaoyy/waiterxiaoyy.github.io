import { useConfig } from '@/context/ConfigContext';
import styles from './index.module.less';

export default function Home() {
  const config = useConfig();
  return (
    <div className={styles.container}>
      <div className={styles.myinfo}>
        <div className={styles.avatar}>
          <img src={config.userInfo.avatar} alt='avatar' />
        </div>
        <div className={styles.name}>{config.userInfo.name}</div>
        <div className={styles.sign}>{config.userInfo.signature}</div>
      </div>
    </div>
  );
}
