import { ITbas as ITbasProp, MenuItem } from '@/types/post';
import styles from './index.module.less';
import { Button, Cascader, Input, Select } from 'antd';
import type { CascaderProps } from 'antd';
export default function ITbas(props: ITbasProp) {
  const {
    categoryInfo,
    timeMenu,
    seletedTimeMenu,
    seletedCategory,
    handleTimeMenuChange,
    handleCategoryChange,
    searchChange,
    handleAllBlogs
  } = props;

  const options = timeMenu
    .map((item: MenuItem) => {
      if (item) {
        return {
          key: item.key,
          label: item.label as string,
          children: item.children?.map((child: MenuItem) => {
            if (child) {
              return {
                key: child.key,
                label: child.label as string
              };
            }
          })
        };
      }
      return null;
    })
    .filter(Boolean) as MenuItem[];

  const selectItems = Object.keys(categoryInfo).map(key => {
    return { value: key, label: key };
  });

  const handleClearSelect = () => {
    handleCategoryChange('');
  };

  const handleTimeChange: CascaderProps<MenuItem>['onChange'] = value => {
    handleTimeMenuChange([value[1] ? (value[1] as string) : '']);
  };

  const handleSearchChange = (event: any) => {
    searchChange(event);
  };

  return (
    <div className={styles.container}>
      <div className={styles.tabs}>
        <div className={styles.tabsTop}>
          <div style={{ marginBottom: '10px' }}>
            <Button shape='round' size='middle' block onClick={handleAllBlogs}>
              <span style={{ color: 'var(--text-color)' }}>所有博客</span>
            </Button>
          </div>
          <Input.Search
            // addonBefore={<SearchOutlined />}
            placeholder='博客标题 / 摘要'
            enterButton='搜索'
            allowClear
            onSearch={handleSearchChange}
            size='middle'
          />
        </div>
        <div className={styles.tabsBottom}>
          <div className={styles.timeMenu}>
            <Cascader
              allowClear
              value={seletedTimeMenu}
              fieldNames={{ label: 'label', value: 'key', children: 'children' }}
              options={options}
              onChange={handleTimeChange}
              onClear={() => handleTimeMenuChange([])}
              placeholder='请选择时间'
            />
          </div>
          <div className={styles.category}>
            <Select
              value={seletedCategory}
              style={{ width: 120 }}
              allowClear
              options={selectItems}
              placeholder='分类'
              onClear={handleClearSelect}
              onSelect={handleCategoryChange}
            />
          </div>
        </div>
      </div>
    </div>
  );
}
