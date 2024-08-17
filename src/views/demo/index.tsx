import { Tag } from 'antd';
import styles from './index.module.less';
import { GithubFilled, PlaySquareOutlined, ReadOutlined } from '@ant-design/icons';
import { useEffect, useState } from 'react';
import { useConfig } from '@/context/ConfigContext';
import Preview from '@/components/preview';

interface ProjectType {
  name: string;
  description: string;
  tags: string[];
  techStack: string[];
  image: string;
  demoLink: string;
  githubLink: string;
  documentationLink: string;
}

export default function Demo() {
  const titleText = '欢迎来到小工具展示页！';
  const descriptionText =
    '开发一些有用的小工具对我来说不仅是乐趣，还希望能为社区带来帮助。如果你发现它们对你有用，我会非常开心！一起来享受编程的乐趣吧！';
  const config = useConfig();
  const projects = config?.resume?.projects as ProjectType[];
  const [displayedTitle, setDisplayedTitle] = useState('');
  const [displayedDescription, setDisplayedDescription] = useState('');
  const [titleComplete, setTitleComplete] = useState(false);

  const [isPreviewOpen, setIsPreviewOpen] = useState(false);
  const [previewSrc, setPreviewSrc] = useState('');
  const [previewAlt, setPreviewAlt] = useState('');

  useEffect(() => {
    let titleIndex = 0;
    const titleInterval = setInterval(() => {
      setDisplayedTitle(prev => prev + titleText[titleIndex++]);
      if (titleIndex === titleText.length - 1) {
        setTitleComplete(true);
        clearInterval(titleInterval);
        return;
      }
    }, 100);

    return () => clearInterval(titleInterval);
  }, [titleText]);

  useEffect(() => {
    if (titleComplete) {
      let descriptionIndex = 0;
      const descriptionInterval = setInterval(() => {
        setDisplayedDescription(prev => prev + descriptionText[descriptionIndex++]);
        if (descriptionIndex === descriptionText.length - 1) {
          clearInterval(descriptionInterval);
          return;
        }
      }, 50); // 设置打印间隔时间，50ms

      return () => clearInterval(descriptionInterval);
    }
  }, [titleComplete, descriptionText]);

  const handleImageClick = (name: string, alt: string) => {
    setPreviewSrc(name);
    setPreviewAlt(alt);
    setIsPreviewOpen(true);
  };

  const handleCloseClick = () => {
    setIsPreviewOpen(false);
  };

  return (
    <div className={styles.container}>
      {isPreviewOpen && <Preview src={previewSrc} alt={previewAlt} handleCloseClick={handleCloseClick} />}
      <div className={styles.content}>
        <div className={styles.title}>
          <div className={styles.titleText}>我的项目</div>
          <div className={styles.titleHello}>{displayedTitle}</div>
          {titleComplete && <div className={styles.titleDescription}>{displayedDescription}</div>}
        </div>
        <div className={styles.projectList}>
          {projects.map(project => (
            <div className={styles.projectItem} key={project.name}>
              <div className={styles.projectImageContainer}>
                <img
                  onClick={() => handleImageClick(project.image, project.name)}
                  src={project.image}
                  alt={`${project.name} Image`}
                  className={styles.projectImage}
                />
              </div>
              <div className={styles.projectDetails}>
                <h3 className={styles.projectName}>{project.name}</h3>
                <p className={styles.projectDescription}>{project.description}</p>
                <div className={styles.tags}>
                  {project.tags.map(tag => (
                    <Tag key={tag}>{tag}</Tag>
                  ))}
                </div>
                <div className={styles.techStack}>
                  {project.techStack.map(tech => (
                    <Tag key={tech}>{tech}</Tag>
                  ))}
                </div>
              </div>
              <div className={styles.projectLinks}>
                <a href={project.demoLink} className={styles.projectLink} target='_blank' rel='noopener noreferrer'>
                  <PlaySquareOutlined style={{ marginRight: '5px' }} />

                  <div className={styles.linkName}>在线演示</div>
                </a>
                <a href={project.githubLink} className={styles.projectLink} target='_blank' rel='noopener noreferrer'>
                  <GithubFilled style={{ marginRight: '5px' }} />

                  <div className={styles.linkName}>GitHub</div>
                </a>
                <a
                  href={project.documentationLink}
                  className={styles.projectLink}
                  target='_blank'
                  rel='noopener noreferrer'
                >
                  <ReadOutlined style={{ marginRight: '5px' }} />
                  <div className={styles.linkName}>项目文档</div>
                </a>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
