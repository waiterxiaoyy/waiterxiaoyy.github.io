import { useEffect, useState } from 'react';
import styles from './index.module.less';
import { useConfig } from '@/context/ConfigContext';

interface skillItem {
  name: string;
  logo: string;
  progress: number;
  color: string;
}

interface skillTypeList {
  [key: string]: skillItem[];
}

export default function Skills() {
  const [showSkills, setShowSkills] = useState<skillItem[]>();
  const [selectedCategory, setSelectedCategory] = useState<string>('所有技能');
  const config = useConfig();
  const skills = config?.resume.skills as skillTypeList;
  useEffect(() => {
    const allSkills = Object.values(skills).flat();
    setShowSkills(allSkills);
  }, []);

  useEffect(() => {
    const progressBars = document.querySelectorAll(`.${styles.progress}`) as NodeListOf<HTMLDivElement>;

    const animateProgressBars = () => {
      progressBars.forEach(progressBar => {
        const value = progressBar.getAttribute('data-progress');
        if (value) {
          progressBar.style.width = `${value}%`;
        }
      });
    };

    const handleScroll = () => {
      const section = document.querySelector(`.${styles.sectionContent}`) as HTMLElement;
      if (section) {
        const sectionTop = section.getBoundingClientRect().top;
        const windowHeight = window.innerHeight;
        if (sectionTop < windowHeight) {
          animateProgressBars();
          window.removeEventListener('scroll', handleScroll);
        }
      }
    };

    window.addEventListener('scroll', handleScroll);
    handleScroll(); // Trigger the function in case the section is already in view

    return () => window.removeEventListener('scroll', handleScroll);
  }, [showSkills]);

  const handleChangeSkills = (name: string) => {
    if (name === '所有技能') {
      const allSkills = Object.values(skills).flat();
      setShowSkills(allSkills);
    } else {
      setShowSkills(skills[name]);
    }
    setSelectedCategory(name);
  };

  return (
    <div className={styles.skills}>
      <div className={styles.linkTo} id='skills' />
      <div className={styles.title}>专业技能</div>
      <div className={styles.sectionSelect}>
        <div
          className={`${styles.sectionSelectItem} ${selectedCategory === '所有技能' ? styles.selected : ''}`}
          onClick={() => handleChangeSkills('所有技能')}
        >
          所有技能
        </div>
        {Object.entries(skills).map(([name]) => (
          <div
            key={name}
            className={`${styles.sectionSelectItem} ${selectedCategory === name ? styles.selected : ''}`}
            onClick={() => handleChangeSkills(name)}
          >
            {name}
          </div>
        ))}
      </div>
      <div className={styles.sectionContent}>
        {showSkills?.map(skill => (
          <div className={styles.skillsItem} key={skill.name}>
            {skill.logo ? (
              <img src={skill.logo} alt={`${skill.name} Logo`} className={styles.skillsLogo} />
            ) : (
              <div className={styles.skillsLogoPlaceholder} style={{ backgroundColor: skill.color }}>
                {skill.name.charAt(0)}
              </div>
            )}
            <div className={styles.skillsDetails}>
              <div className={styles.progressBar}>
                <div
                  className={styles.progress}
                  data-progress={skill.progress}
                  style={{ backgroundColor: skill.color }}
                >
                  {' '}
                  <span className={styles.skillsName}>{skill.name}</span>
                </div>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
