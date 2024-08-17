import { Tag } from 'antd';
import styles from './index.module.less';
import { useConfig } from '@/context/ConfigContext';
export default function Education() {
  const config = useConfig();

  return (
    <div className={styles.education}>
      <div className={styles.linkTo} id='education' />
      <div className={styles.title}>教育经历</div>
      <div className={styles.sectionContent}>
        {config.resume?.education?.map((item: any, index: number) => (
          <div className={styles.sectionItem} key={index}>
            <img src={item.logo} alt='University Logo' className={styles.educationLogo} />
            <div className={styles.educationDetail}>
              <h3 className={styles.educationSchool}>{item.school}</h3>
              <p className={styles.educationDate}>{item.date}</p>
              <p className={styles.educationMajor}>{item.major}</p>
              <p className={styles.educationMajor}>
                <Tag color='#e47272'>{item.degree}</Tag>
                <Tag color='#87d068'>{item.major}</Tag>
                {item.thesis?.map((the: string, index: number) => (
                  <Tag key={index} color='#37b1f5'>
                    {the}
                  </Tag>
                ))}
              </p>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
