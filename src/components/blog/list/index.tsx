import { useEffect, useState } from 'react';
import styles from './index.module.less';
import blogMetadata from '@/blogMetadata.json';
import { Blog, MenuItem } from '@/types/post';
import { countCategory, countTags, filterBlogs, generateTimeMenu, getGreeting, sortByDate } from '@/utils';

import { Badge, Button, Empty, Input, Menu, Spin, Tag } from 'antd';
import { AiFillTags } from 'react-icons/ai';
import { MdCategory } from 'react-icons/md';
import { MdTimeline } from 'react-icons/md';
import useOberserverHook from '@/hooks/useObserverHook';
import ITbas from '../tabs';
import { useNavigate } from 'react-router-dom';
import storage from '@/utils/storage';

export default function BlogArticle() {
  const [blogs, setBlogs] = useState<Blog.Metadata[]>([]);
  const [blogList, setBlogList] = useState<Blog.Metadata[]>([]);
  const [filteredBlogs, setFilteredBlogs] = useState<Blog.Metadata[]>([]);

  const [tagsInfo, setTagsInfo] = useState<Blog.TagInfo>({});
  const [categoryInfo, setCategoryInfo] = useState<Blog.CategoryInfo>({});
  const [timeMenu, setTimeMenu] = useState<MenuItem[]>([]);
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [hasMore, setHasMore] = useState<boolean>(true);

  const [page, setPage] = useState({ pageNum: 1, pageSize: 2 });

  const [seletedTimeMenu, setSelectedTimeMenu] = useState<string[]>([]);
  const [seletedCategory, setSelectedCategory] = useState<string>('');
  const [seletedSearch, setSelectedSearch] = useState<string>('');

  const navigate = useNavigate();

  useEffect(() => {
    console.log('category', storage.get('category'));
    setSelectedCategory(storage.get('category') || '');
    setSelectedTimeMenu(storage.get('time') || []);
    // setSelectedSearch(storage.get('search') || '');
    initializeData();
  }, []);

  const initializeData = async () => {
    let sortedBlogMetadata: Blog.Metadata[] = [];

    if (blogMetadata && blogMetadata.length > 0) {
      const timeMenuInfo = await generateTimeMenu(blogMetadata);
      const categoryInfo = await countCategory(blogMetadata);
      const blogMetadataSeleted = await filterBlogs(
        blogMetadata,
        timeMenuInfo[0]?.key as string,
        seletedCategory,
        seletedSearch
      );
      sortedBlogMetadata = await sortByDate(blogMetadataSeleted);

      const blogsTagsInfo = await countTags(sortedBlogMetadata);

      setTimeMenu(timeMenuInfo);
      setTagsInfo(blogsTagsInfo);
      setCategoryInfo(categoryInfo);
      setBlogs(blogMetadata);
      setFilteredBlogs(sortedBlogMetadata);
    }
  };

  const getFileBlogs = async () => {
    const blogMetadataSeleted = await filterBlogs(blogs, seletedTimeMenu[0], seletedCategory, seletedSearch);
    const sortedBlogMetadata = await sortByDate(blogMetadataSeleted);
    const blogsTagsInfo = await countTags(sortedBlogMetadata);
    setTagsInfo(blogsTagsInfo);
    setFilteredBlogs(sortedBlogMetadata);
    setBlogList([]);
    setHasMore(true);
    setPage({ pageNum: 1, pageSize: 2 });
  };

  useEffect(() => {
    getFileBlogs();
  }, [seletedTimeMenu, seletedCategory, seletedSearch]);

  useOberserverHook(
    '#yy-loading',
    async (entries: IntersectionObserverEntry[]) => {
      if (entries[0].isIntersecting && hasMore) {
        setIsLoading(true);
        await getBlogList(filteredBlogs);
      }
    },
    [blogs, filteredBlogs, blogList]
  );

  const getBlogList = async (data: Blog.Metadata[]) => {
    const { pageNum, pageSize } = page;
    const start = (pageNum - 1) * pageSize;
    const end = start + pageSize;
    if (end >= data.length) {
      setIsLoading(false);
      setHasMore(false);
    }
    const newBlogList = data.slice(start, end);
    setBlogList([...blogList, ...newBlogList]);
    setPage({ ...page, pageNum: pageNum + 1 });
  };

  const timeChange = ({ key }: { key: string }) => {
    setSelectedTimeMenu([key]);
    storage.set('time', [key]);
  };

  const searchChange = (_e: any) => {
    setSelectedSearch(_e.target?.value ? _e.target?.value : _e);
    storage.set('search', _e.target?.value ? _e.target?.value : _e);
  };

  const categoryChange = (_e: any, category: string) => {
    setSelectedCategory(category);
    storage.set('category', category);
  };

  const handleAllBlogs = () => {
    setSelectedCategory('');
    setSelectedTimeMenu([]);
    setSelectedSearch('');
    storage.set('category', '');
    storage.set('time', []);
    storage.set('search', '');
  };

  const handleTimeMenuChange = (timeMenu: string[]) => {
    setSelectedTimeMenu(timeMenu);
    storage.set('time', timeMenu);
  };
  const handleCategoryChange = (category: string) => {
    setSelectedCategory(category);
    storage.set('category', category);
  };

  const handleBlogClick = (id: number) => {
    navigate(`/blog/${id}`);
  };
  return (
    <div className={styles.container}>
      <div className={styles.content}>
        <div className={styles.left}>
          <div className={styles.tabs}>
            <ITbas
              categoryInfo={categoryInfo}
              timeMenu={timeMenu}
              seletedTimeMenu={seletedTimeMenu}
              seletedCategory={seletedCategory}
              searchChange={searchChange}
              handleTimeMenuChange={handleTimeMenuChange}
              handleCategoryChange={handleCategoryChange}
              handleAllBlogs={handleAllBlogs}
            />
          </div>
          <div className={styles.blogList}>
            {blogList.length > 0 ? (
              blogList?.map(blog => (
                <div key={blog.fileName} className={styles.blogItem} onClick={() => handleBlogClick(blog.id)}>
                  <div className={styles.blogItemInfo}>
                    <div className={styles.blogItemTitle}>{blog.title}</div>
                    <div className={styles.blogItemAbstract}>{blog.abstract}</div>
                    <div className={styles.blogItembottom}>
                      <div className={styles.blogItemLeft}>
                        <div className={styles.blogItemDate}>{blog.date}</div> |
                        <div className={styles.blogItemAutor}>{blog.author}</div>
                      </div>
                      <div className={styles.blogItemTags}>
                        {blog.tags.slice(0, 3).map(tag => (
                          <Tag
                            style={{ border: 'none', backgroundColor: '#eeeeee', fontSize: '14px', color: '#8a919f' }}
                            key={tag}
                          >
                            {tag}
                          </Tag>
                        ))}
                      </div>
                    </div>
                  </div>
                  {blog.avatar ? (
                    <div className={styles.blogItemImage}>
                      <img src={blog.avatar} alt={blog.title} />
                    </div>
                  ) : null}
                </div>
              ))
            ) : (
              <div className={styles.blogNull}>
                <Empty description='快去写博客啦' />
              </div>
            )}
          </div>
          <div id='yy-loading' className={styles.blogLoading}>
            {blogList.length > 0 ? isLoading ? <Spin /> : '没有更多了' : null}
          </div>
        </div>
        <div className={styles.right}>
          <div className={styles.blogHello}>
            <p style={{ fontSize: '18px', fontWeight: '700', marginBottom: '1rem' }}>{getGreeting()}</p>
            <p style={{ fontSize: '14px' }}>欢迎来到我的博客，这里记录了我的学习和生活。</p>
          </div>
          <div className={styles.blogSearch}>
            <Input
              // addonBefore={<SearchOutlined />}
              placeholder='博客标题 / 摘要'
              allowClear
              // enterButton='搜索'
              size='large'
              onPressEnter={searchChange}
            />
          </div>
          <div className={styles.allBlogButton}>
            <Button shape='round' size='large' block onClick={handleAllBlogs}>
              <span style={{ color: 'var(--text-color)' }}>所有博客</span>
            </Button>
          </div>
          <div className={styles.blogDateBox}>
            <div className={styles.meTitle}>
              <MdTimeline style={{ marginRight: '10px', verticalAlign: 'middle' }} />
              日期
            </div>
            <div className={styles.blogDate}>
              <Menu
                onClick={timeChange}
                // defaultOpenKeys={['sub1']}
                mode='inline'
                items={timeMenu}
                selectedKeys={seletedTimeMenu}
              />
            </div>
          </div>
          <div className={styles.blogCategoryBox}>
            <div className={styles.meTitle}>
              <MdCategory style={{ marginRight: '10px', verticalAlign: 'middle' }} />
              分类
            </div>
            <div className={styles.blogCategory}>
              {categoryInfo ? (
                Object.entries(categoryInfo).map(([category, { count }]) => (
                  <div
                    key={category}
                    className={`${styles.blogCategoryItem} ${
                      seletedCategory === category ? styles.blogCategoryItemSelected : ''
                    }`}
                    onClick={e => categoryChange(e, category)}
                  >
                    <div className={styles.blogCategoryName}>{category}</div>
                    <div className={styles.blogCategoryCount}>{count}</div>
                  </div>
                ))
              ) : (
                <div>
                  <Empty description='暂无分类' image={Empty.PRESENTED_IMAGE_SIMPLE} />
                </div>
              )}
            </div>
          </div>

          <div className={styles.blogTagBox}>
            <div className={styles.meTitle}>
              <AiFillTags style={{ marginRight: '10px', verticalAlign: 'middle' }} />
              标签
            </div>
            <div className={styles.blogTag}>
              {Object.keys(tagsInfo).length > 0 ? (
                Object.entries(tagsInfo).map(([tag, { count, color, badgeColor }]) => (
                  <Tag key={tag} bordered={false} color={color}>
                    {tag} <Badge count={count} size='small' color={badgeColor} />
                  </Tag>
                ))
              ) : (
                <div style={{ display: 'inline-block', textAlign: 'center' }}>
                  <Empty description='暂无分类' image={Empty.PRESENTED_IMAGE_SIMPLE} />
                </div>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
