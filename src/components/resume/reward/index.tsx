import { useConfig } from '@/context/ConfigContext';
import styles from './index.module.less';

export default function Reward() {
  const config = useConfig();
  const honors = config?.resume.honors || [];
  return (
    <div className={styles.reward}>
      <div className={styles.linkTo} id='reward' />
      <div className={styles.title}>荣誉奖项</div>
      <div className={styles.sectionContent}>
        <div className={styles.honorList}>
          <ul>
            {honors.map((honor: string, index: number) => (
              <li key={index}>{honor}</li>
            ))}
          </ul>
        </div>
        {/* <div className={styles.honorCard}>
          <div className={styles.cardTitle}>荣誉类</div>
          <div className={styles.cardContent}>
            <div className={styles.honorItem}>国家奖学金</div>
            <div className={styles.honorItem}>广东工业大学一等奖学金</div>

            <div className={styles.honorItem}>广东工业大学新生奖学金</div>
          </div>
        </div> */}
        {/* {honors.map((honor, index) => (
          <div className={styles.honorItem} key={index}>
            <div className={styles.iconContainer}>
              <img src={honor.icon} alt={`${honor.title} Icon`} className={styles.honorIcon} />
            </div>
            <div className={styles.honorDetails}>
              <h3 className={styles.honorTitle}>{honor.title}</h3>
              <div className={styles.honorInstitution}>{honor.institution}</div>
              <div className={styles.honorDate}>{honor.date}</div>
              <p className={styles.honorDescription}>{honor.description}</p>
            </div>
          </div>
        ))} */}
      </div>
    </div>
  );
}
