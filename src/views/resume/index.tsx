import { GithubFilled, QqOutlined, WechatFilled } from '@ant-design/icons';
import { SiJuejin } from 'react-icons/si';
import styles from './index.module.less';
import { MdEmail } from 'react-icons/md';
import Education from '@/components/resume/education';
import Reward from '@/components/resume/reward';
import Skills from '@/components/resume/skills';
import Projects from '@/components/resume/projects';
import Work from '@/components/resume/work';
import { useConfig } from '@/context/ConfigContext';
import { HashLink as Link } from 'react-router-hash-link';
import { message } from 'antd';

type Section = {
  component: () => JSX.Element;
  description: string;
};

const sections: { [key: string]: Section } = {
  Education: {
    component: () => <Education />,
    description: '教育经历'
  },
  Work: {
    component: () => <Work />,
    description: '工作经历'
  },

  Projects: {
    component: () => <Projects />,
    description: '项目经历'
  },
  Skills: {
    component: () => <Skills />,
    description: '专业技能'
  },
  Reward: {
    component: () => <Reward />,
    description: '荣誉奖励'
  }
};

export default function Resume() {
  const config = useConfig();

  const copyContent = async (text: string) => {
    try {
      await navigator.clipboard.writeText(text);
      message.success('复制成功');
    } catch (err) {
      message.error('复制失败');
    }
  };
  const handleClickConcat = (type: string) => {
    console.log('config', config);
    if (type === 'github') {
      window.open(config.resume.contact.github);
    }
    if (type === 'juejin') {
      window.open(config.resume.contact.juejin);
    }
    if (type === 'wechat') {
      copyContent(config.resume.contact.wechat);
    }
    if (type === 'qq') {
      copyContent(config.resume.contact.qq);
    }
  };

  return (
    <div className={styles.container}>
      <div className={styles.left}>
        <div className={styles.info}>
          <div className={styles.avatar}>
            <img src={config.userInfo.avatar} alt='avatar' />
          </div>
          <div className={styles.name}>{config.userInfo.name}</div>
          <div className={styles.contact}>
            <div className={styles.email}>
              <MdEmail style={{ marginRight: '10', verticalAlign: 'middle' }} />
              <span>{config.userInfo.email}</span>
            </div>
          </div>
          <div className={styles.divider}></div>
          <div className={styles.about}>
            <div className={styles.title}>About Me</div>
            <div className={styles.content}>{config.userInfo.introduction}</div>
          </div>
          <div className={styles.divider}></div>
          <div className={styles.social}>
            <div className={styles.icon} onClick={() => handleClickConcat('github')}>
              <GithubFilled />
            </div>

            <div className={styles.icon} onClick={() => handleClickConcat('juejin')}>
              <SiJuejin style={{ verticalAlign: 'middle' }} />
            </div>
            <div className={styles.icon} onClick={() => handleClickConcat('wechat')}>
              <WechatFilled />
            </div>
            <div className={styles.icon} onClick={() => handleClickConcat('qq')}>
              <QqOutlined />
            </div>
          </div>
        </div>
      </div>
      <div className={styles.right}>
        <div className={styles.resume}>
          <div className={styles.title}>个人简历</div>
          <div className={styles.linkContainer}>
            {Object.keys(sections).map(sec => (
              <div id={sec} className={styles.linkItem}>
                <Link to={`#${sec.toLowerCase()}`}>{sections[sec]?.description}</Link>
              </div>
            ))}
          </div>
          <div className={styles.divider}></div>
          {Object.entries(sections).map(([name, Section]) => (
            <Section.component key={name} />
          ))}
        </div>
      </div>
    </div>
  );
}
