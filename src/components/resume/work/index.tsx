import { useConfig } from '@/context/ConfigContext';
import styles from './index.module.less';

export default function Work() {
  const config = useConfig();
  return (
    <div className={styles.works}>
      <div className={styles.linkTo} id='work' />
      <div className={styles.title}>工作经历</div>
      <div className={styles.sectionContent}>
        {config?.resume.works?.map((work: any) => (
          <div className={styles.workItem} key={work.name}>
            <div className={styles.workDetails}>
              <div className={styles.workImageContainer}>
                <img src={work.logo} alt={`${work.name} Image`} className={styles.workImage} />
              </div>
              <div className={styles.workInfo}>
                <div className={styles.workLeft}>
                  <h3 className={styles.workName}>{work.name}</h3>
                  <p className={styles.workDescription}>{work.description}</p>
                </div>
                <div className={styles.workRight}>
                  <div className={styles.workJobs}>{work.jobs}</div>
                  <div className={styles.workDate}>{work.date}</div>
                </div>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
