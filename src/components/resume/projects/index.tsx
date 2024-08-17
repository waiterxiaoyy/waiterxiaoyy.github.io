import { message, Tag } from 'antd';
import styles from './index.module.less';
import { GithubFilled, PlaySquareOutlined, ReadOutlined } from '@ant-design/icons';
import { useConfig } from '@/context/ConfigContext';
import Preview from '@/components/preview';
import { useState } from 'react';

export default function Projects() {
  const config = useConfig();
  const [isPreviewOpen, setIsPreviewOpen] = useState(false);
  const [previewSrc, setPreviewSrc] = useState('');
  const [previewAlt, setPreviewAlt] = useState('');

  const handleClickItem = (link: string, type: string) => {
    if (link) {
      window.open(link, '_blank');
    } else {
      message.error(`No ${type} link available`);
    }
  };

  const handleImageClick = (name: string, alt: string) => {
    setPreviewSrc(name);
    setPreviewAlt(alt);
    setIsPreviewOpen(true);
  };

  const handleCloseClick = () => {
    setIsPreviewOpen(false);
  };

  return (
    <div className={styles.projects}>
      <div className={styles.linkTo} id='projects' />
      <div className={styles.title}>项目经历</div>
      <div className={styles.sectionContent}>
        {config?.resume?.projects?.map((project: any) => (
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
                {project.tags.map((tag: string) => (
                  <Tag key={tag}>{tag}</Tag>
                ))}
              </div>
              <div className={styles.techStack}>
                {project.techStack.map((tech: string) => (
                  <Tag key={tech}>{tech}</Tag>
                ))}
              </div>
            </div>
            <div className={styles.projectLinks}>
              {project.demoLink && (
                <a
                  onClick={() => handleClickItem(project.demoLink, 'project')}
                  className={styles.projectLink}
                  target='_blank'
                  rel='noopener noreferrer'
                >
                  <PlaySquareOutlined style={{ marginRight: '5px' }} />
                  <div className={styles.linkName}>在线演示</div>
                </a>
              )}
              {project.githubLink && (
                <a
                  className={styles.projectLink}
                  onClick={() => handleClickItem(project.githubLink, 'github')}
                  target='_blank'
                  rel='noopener noreferrer'
                >
                  <GithubFilled style={{ marginRight: '5px' }} />
                  <div className={styles.linkName}>GitHub</div>
                </a>
              )}
              {project.documentationLink && (
                <a
                  className={styles.projectLink}
                  onClick={() => handleClickItem(project.documentationLink, 'documentation')}
                  target='_blank'
                  rel='noopener noreferrer'
                >
                  <ReadOutlined style={{ marginRight: '5px' }} />
                  <div className={styles.linkName}>项目文档</div>
                </a>
              )}
            </div>
          </div>
        ))}
      </div>
      {isPreviewOpen && <Preview src={previewSrc} alt={previewAlt} handleCloseClick={handleCloseClick} />}
    </div>
  );
}
