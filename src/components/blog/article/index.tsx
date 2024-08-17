import { useEffect, useState } from 'react';
import styles from './index.module.less';
import blogMetadata from '@/blogMetadata.json';
import { Tag } from 'antd';
// 编辑 / 视图
import { Viewer } from '@bytemd/react';
import breaks from '@bytemd/plugin-breaks';
import footnotes from '@bytemd/plugin-footnotes';
import gfm from '@bytemd/plugin-gfm';
import gemoji from '@bytemd/plugin-gemoji';
import highlight from '@bytemd/plugin-highlight';
// import highlight from "@bytemd/plugin-highlight-ssr";
import mediumZoom from '@bytemd/plugin-medium-zoom';
import frontmatter from '@bytemd/plugin-frontmatter';
// import math from '@bytemd/plugin-math';
import math from '@bytemd/plugin-math-ssr';
import mermaid from '@bytemd/plugin-mermaid';

// 引入基础css
import 'bytemd/dist/index.min.css';
// 引入高亮css
import 'highlight.js/styles/vs.css';

// 引入主题: 主题列表 https://github.com/xitu/juejin-markdown-themes
// import 'juejin-markdown-themes/dist/juejin.min.css'; // 掘金主题
// import 'juejin-markdown-themes/dist/geek-black.min.css';
// import 'juejin-markdown-themes/dist/condensed-night-purple.min.css';
// import 'juejin-markdown-themes/dist/condensed-night-purple';
import 'juejin-markdown-themes/dist/smartblue.min.css';
// import 'juejin-markdown-themes/dist/devui-blue.min.css';
// import 'juejin-markdown-themes/dist/nico.min.css';
// import 'juejin-markdown-themes/dist/arknights.min.css';
// import 'juejin-markdown-themes/dist/fancy.min.css';
// import 'juejin-markdown-themes/dist/v-green.min.css';
// import 'juejin-markdown-themes/dist/hydrogen.min.css';
// 代码主题
import 'highlightjs/styles/atom-one-dark-reasonable.css';
// import 'highlightjs/styles/an-old-hope.css';
// import 'highlightjs/styles/a11y-dark.css';

import MarkNav from 'markdown-navbar';

import { ClockCircleOutlined, OrderedListOutlined, TagsFilled } from '@ant-design/icons';
// import style from 'react-syntax-highlighter/dist/esm/styles/hljs/a11y-dark';

// 目录
// import MarkdownNavbar from 'markdown-navbar';
import 'markdown-navbar/dist/navbar.css';
import { MdCategory } from 'react-icons/md';
import { useParams } from 'react-router-dom';
import { Blog } from '@/types/post';
import { calculateReadingTime } from '@/utils';

const plugins = [gfm(), gemoji(), highlight(), mediumZoom(), breaks(), footnotes(), frontmatter(), math(), mermaid()];

const BlogArticle = () => {
  const { articleId } = useParams();
  const [post, setPost] = useState<Blog.Metadata>();

  const [readTime, setReadTime] = useState<number>(0);

  const loadData = async () => {
    const post = blogMetadata.find(item => item.id === Number(articleId));
    const time = await calculateReadingTime(post?.mdContent as string);
    setReadTime(time);
    setPost(post);
  };

  useEffect(() => {
    loadData();
  }, []);

  return (
    <div className={styles.contanier}>
      <div className={styles.content}>
        <div className={styles.left}>
          <div className={styles.mdContent}>
            <div className={styles.articleInfo}>
              <div className={styles.articleTitle}>{post?.title}</div>
              <div className={styles.articleInfoItem}>
                <div className={styles.articleInfoItemLeft}>
                  <div className={styles.articleInfoItemLeftItem}>
                    <span>{post?.author}</span>
                  </div>
                  <div className={styles.articleInfoItemLeftItem}>
                    <span>{post?.date}</span>
                  </div>
                  <div className={styles.articleInfoItemLeftItem}>
                    <ClockCircleOutlined style={{ marginRight: 5 }} />
                    <span>阅读{readTime}分钟</span>
                  </div>
                </div>
                <div className={styles.articleInfoItemRight}>
                  <div className={styles.articleInfoItemRightItem}>
                    <MdCategory style={{ marginRight: 5, verticalAlign: 'middle' }} />
                    <span>
                      <Tag color='#87d068'>{post?.category}</Tag>
                    </span>
                  </div>
                  <div className={styles.articleInfoItemRightItem}>
                    <TagsFilled style={{ marginRight: 5, verticalAlign: 'middle' }} />
                    {post?.tags.map((tag, index) => {
                      return (
                        <Tag key={index} style={{ marginRight: 10 }}>
                          {tag}
                        </Tag>
                      );
                    })}
                  </div>
                </div>
              </div>
            </div>
            <Viewer value={post?.mdContent as string} plugins={plugins} />
          </div>
        </div>
        <div className={styles.right}>
          <div className={styles.mdToc}>
            <div className={styles.mdTocTitle}>
              <OrderedListOutlined
                style={{
                  marginRight: 10
                }}
              />
              目录
            </div>
            <div className={styles.mdTocContent}>
              <MarkNav
                className='article-menu'
                source={post?.mdContent as string}
                headingTopOffset={208}
                // updateHashAuto={false}
                ordered={false}
              />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default BlogArticle;
