import { Blog, MenuItem } from "@/types/post";

// 统计每个tag的数量并按数量排序
export const countTags = async (blogMetadata: Blog.Metadata[]): Promise<Blog.TagInfo> => {
    const tagCount: Blog.TagInfo = {};

    blogMetadata.forEach(blog => {
        blog.tags.forEach(tag => {

            if (tagCount[tag]) {
                tagCount[tag].count++;
            } else {
                tagCount[tag] = { color: '' ,count: 1, badgeColor: '' };
            }
        });
    });

    // 将对象转换为数组以进行排序
    const sortedTags = Object.entries(tagCount).sort((a, b) => b[1].count - a[1].count);

    // 将排序后的数组转换回对象
    const sortedTagCount: Blog.TagInfo = {};
    sortedTags.forEach(([tag, { count }], index) => {
        sortedTagCount[tag] = { count, color: TagColors[index % TagColors.length], badgeColor: IColors[index % IColors.length] };    
    });


    return sortedTagCount;
}

export const countCategory = async (blogMetadata: Blog.Metadata[]): Promise<Blog.CategoryInfo> => {
    const categoryCount: Blog.CategoryInfo = {};

    blogMetadata.forEach(blog => {
        if (categoryCount[blog.category]) {
            categoryCount[blog.category].count++;
        } else {
            categoryCount[blog.category] = { count: 1 };
        }
    });

    return categoryCount;
}


// 按日期对所有文件进行排序，新的在前，旧的在后
export const sortByDate = async (blogMetadata: Blog.Metadata[]): Promise<Blog.Metadata[]> => {
    return blogMetadata.sort((a, b) => new Date(b.date).getTime() - new Date(a.date).getTime());
}

export const IColors = [
    '#FF5733', '#33FF57', '#3357FF', '#FF33A6', '#FF8C33', 
    '#33FFDD', '#DD33FF', '#FFDD33', '#33A6FF', '#A633FF',
    '#FF3333', '#33FF33', '#3333FF', '#FF33CC', '#FFAA33', 
    '#33FFAA', '#AA33FF', '#FFAA33', '#33CCFF', '#CC33FF',
    '#FF6633', '#33FF66', '#3366FF', '#FF3399', '#FFBB33', 
    '#33FFBB', '#BB33FF', '#FFBB66', '#33BBFF', '#BB66FF',
];

export const TagColors = [
    'processing',  // 处理
    'success',     // 成功
    'error',       // 错误
    'warning',     // 警告
    'magenta',     // 品红
    'red',         // 红色
    'volcano',     // 火山
    'orange',      // 橙色
    'gold',        // 金色
    'lime',        // 青柠
    'green',       // 绿色
    'cyan',        // 青色
    'blue',        // 蓝色
    'geekblue',    // 极客蓝
    'purple'       // 紫色
  ];

export function hashStringToIndex(str: string): number {
    let hash = 0;
    for (let i = 0; i < str.length; i++) {
        hash = str.charCodeAt(i) + ((hash << 5) - hash);
        hash = hash & hash; // 保证hash值在32位以内
    }
    return Math.abs(hash) % TagColors.length;
}


export function generateTimeMenu(data: Blog.Metadata[]): MenuItem[] {
    const menu: MenuItem[] = [];

    // 先按年份和月份进行分类
    const dateMap: { [year: string]: { [month: string]: Blog.Metadata[] } } = {};

    data.forEach(item => {
        const [year, month] = item.date.split('-').slice(0, 2);
        if (!dateMap[year]) {
            dateMap[year] = {};
        }
        if (!dateMap[year][month]) {
            dateMap[year][month] = [];
        }
        dateMap[year][month].push(item);
    });

    // 生成菜单结构
    for (const year in dateMap) {
        const yearItem: MenuItem = {
            key: year,
            label: year + '-' + (parseInt(year) + 1),
            children: []
        };

        // 按月份从小到大排序
        const sortedMonths = Object.keys(dateMap[year]).sort((a, b) =>  parseInt(b) - parseInt(a));

        for (const month of sortedMonths) {
            const monthItem: MenuItem = {
                key: `${year}-${month}`,
                label: `${year}-${month}`
            };

            yearItem.children?.push(monthItem);
        }

        menu.push(yearItem as MenuItem);
    }

    // 根据年份从大到小排序
    return menu.sort((a, b) => parseInt(b?.key as string) - parseInt(a?.key as string));
}


export function getGreeting() {
    const now = new Date();
    const hour = now.getHours();

    if (hour >= 0 && hour < 12) {
        return "上午好!";
    } else if (hour >= 12 && hour < 18) {
        return "下午好!";
    } else {
        return "晚上好!";
    }
}

export const filterBlogs = async (blogs: Blog.Metadata[], timeInfo: string, category: string, searchField: string) => {
    return blogs.filter(blog => {
      // Check if the blog date starts with the timeInfo
      const matchesTimeInfo = timeInfo ? blog.date.startsWith(timeInfo) : true;
      
      // Check if the blog category matches the category
      const matchesCategory = category ? blog.category === category : true;
      
      // Check if the blog title or abstract contains the searchField
      const matchesSearchField = searchField ? (
        blog.title.toLowerCase().includes(searchField.toLocaleLowerCase()) || blog.abstract.toLocaleLowerCase().includes(searchField.toLocaleLowerCase())
      ) : true;
      
      return matchesTimeInfo && matchesCategory && matchesSearchField;
    });
  };
  
/**
 * 计算文本的阅读时间
 * @param {string} text - 要计算的文本内容
 * @param {number} wordsPerMinute - 每分钟阅读的单词数量（默认200）
 * @returns {number} - 阅读时间，以分钟为单位
 */
export const calculateReadingTime = async (text: string, wordsPerMinute = 200) => {
    if (!text) return 0;
  
    const words = text.split(/\s+/).length;
    const readingTime = Math.ceil(words / wordsPerMinute);
  
    return readingTime;
  };


export const isValidFileName = (title: string): boolean =>{
    // 检查长度
    if (title.length === 0 || title.length > 50) {
      return false;
    }
  
    // 检查非法字符
    const invalidCharacters = /[\/\\:*?"<>|]/;
    if (invalidCharacters.test(title)) {
      return false;
    }
  
    // 检查是否以空白字符开头或结尾
    if (title.trim() !== title) {
      return false;
    }
  
    // 检查保留名称（根据系统自定义）
    const reservedNames = [
      'CON', 'PRN', 'AUX', 'NUL', 'COM1', 'COM2', 'COM3', 'COM4',
      'COM5', 'COM6', 'COM7', 'COM8', 'COM9', 'LPT1', 'LPT2', 'LPT3',
      'LPT4', 'LPT5', 'LPT6', 'LPT7', 'LPT8', 'LPT9'
    ];
  
    // 文件名不能是保留名称（不区分大小写）
    if (reservedNames.includes(title.toUpperCase())) {
      return false;
    }
  
    // 如果以上条件都通过，则文件名是合法的
    return true;
  }