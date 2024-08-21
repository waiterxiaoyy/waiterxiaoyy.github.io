// public/config.js
window.config = {
  // 站点标题
  header: {
    title: 'Yiyang的个人主页',
    slogan: '若年华终将被遗忘，记得你我',
    menu: [
      {
        key: 'home',
        label: '首页',
        href: '/home'
      },
      {
        key: 'resume',
        label: '简历',
        href: '/resume'
      },
      {
        key: 'blog',
        label: '博客',
        href: '/blog'
      },
      {
        key: 'demo',
        label: 'Demo',
        href: '/demo'
      }
    ]
  },
  userInfo: {
    name: 'Yiyang Zhou',
    avatar: '/imgs/avatar.png',
    email: 'waiterxiaoyy@gamil.com',
    signature: '自由编程，创意无限',
    introduction:
      '您好！我是Yiyang，硕士毕业于广东工业大学人工智能专业，立志成为一名优秀的前端工程师，主要技术栈是React+TypeScript。'
  },
  resume: {
    education: [
      {
        school: '广东工业大学',
        logo: '/imgs/gdut.png',
        major: '人工智能',
        degree: '硕士',
        date: '2022-2025',
        thesis: ['医疗数据分析']
      },
      {
        school: '广东财经大学',
        logo: '/imgs/gdufe.png',
        major: '软件工程',
        degree: '本科',
        date: '2018-2022',
        thesis: []
      }
    ],
    works: [
      {
        name: '广州柏视医疗科技有限公司',
        description:
          '参与公司的低代码AI平台开发，使用Moncaco-editor开发React和Less语言的组件编写器，使用prettier对代码进行格式化，将React、dayjs、antd、esbuild挂载到window上，使用esbuild编译tsx代码，使用md5校验代码，利用Blob对象实现编译结果字符串的加载；参与平台官网主页的开发，使用keyframes和animation实现图标三维动画',
        logo: '/imgs/pvmed_logo.jpg',
        date: '2024.6-2024.9',
        jobs: '前端开发'
      }
    ],
    projects: [
      {
        name: '基于React+TypeScript的后台管理系统',
        description:
          '货运后台管理系统包括工作台、系统管理和订单管理三大模块。工作台展示用户信息、订单流水走势图和司机数据图表，帮助用户了解业务情况。系统管理模块涵盖用户、角色和部门管理功能，方便管理员管理信息和权限。订单管理模块包括订单列表、订单聚合和司机列表，帮助用户处理订单和监控司机信息。',
        techStack: ['React18', 'TypeScript', 'Zustand', 'Echarts', 'Ant Design'],
        image: '/imgs/r-manger.png',
        demoLink: '',
        githubLink: '',
        documentationLink: '',
        tags: ['后台管理', '权限认证', '主题颜色', '可视化']
      },
      {
        name: '独立全新开发的个人主页网站',
        description:
          '基于React+TypeScript+Bytemd的静态个人主页网站，含有首页、简历、博客和Demo四大模块。首页展示个人信息和技能栈，简历展示教育经历、工作经历、技能和奖项等，博客展示最新文章和文章列表，Demo展示个人项目和开源项目。实现简约风格和响应式布局。',
        techStack: ['React18', 'TypeScript', 'Bytemd'],
        image: '/imgs/personalsite.png',
        demoLink: 'https://yourblog.com',
        githubLink: 'https://github.com/yourusername/blog',
        documentationLink: 'https://yourdocs.com',
        tags: ['个人网站', '响应式布局', '主题切换', 'Markdown']
      },
      {
        name: 'CodeLLMs-AI: 基于TypeScript+大模型的Vscode插件',
        description:
          '目前已上线插件市场。插件基于TypeScript开发，实现了代码注释，代码补全，代码语言切换和提问等功能，可自定义模型和key以及自动读取系统代理，提高了代码编写效率。',
        techStack: ['TypeScript', 'Vscode'],
        image: '/imgs/CodeLLMsAI-logo.png',
        demoLink: 'https://yourdemo.com',
        githubLink: 'https://github.com/yourusername/chat-app',
        documentationLink: 'https://yourdocs.com',
        tags: ['AI插件', '代码注释', '代码补全', '代码语言切换']
      },
      {
        name: 'YIDE: 基于React+Monaco-Editor+Egg.js的在线前端代码编辑器',
        description:
          'YIDE是一个基于React+TypeScript+Monaco的在线前端代码编辑器，目前支持HTML、CSS、JavaScript等。用户可以在线编写代码，实时预览效果，支持代码高亮、代码提示、代码格式化，支持用户创建文件，导出文件，支持用户自由书写HTML，CSS和JS文件，无需标签模板，是一个轻量级的在线代码编辑器。',
        techStack: ['React', 'Monaco-Editor', 'TypeScript', 'Eggjs'],
        image: '/imgs/clip.png',
        demoLink: 'http://xiaorongshu.cc',
        githubLink: 'https://github.com/waiterxiaoyy/YIDE',
        documentationLink: '',
        tags: ['在线编辑器', '前端助手', '自由书写', '代码格式化', '文件导出']
      }
    ],
    skills: {
      编程: [
        {
          name: 'HTML',
          logo: '/imgs/skills/html.png',
          progress: 85,
          color: '#37b1f5'
        },
        {
          name: 'CSS',
          logo: '/imgs/skills/css.png',
          progress: 65,
          color: '#6968b3'
        },
        {
          name: 'JavaScript',
          logo: '/imgs/skills/js.png',
          progress: 70,
          color: '#e47272'
        },
        {
          name: 'TypeScript',
          logo: '/imgs/skills/ts.png',
          progress: 70,
          color: '#007acc'
        },
        {
          name: 'Java',
          logo: '/imgs/skills/java.png',
          progress: 60,
          color: '#f89820'
        },
        {
          name: 'python',
          logo: '/imgs/skills/python.png',
          progress: 75,
          color: '#3776ab'
        }
      ],
      框架: [
        {
          name: 'React',
          logo: '/imgs/skills/react.png',
          progress: 80,
          color: '#cc7b94'
        },
        {
          name: 'Vue',
          logo: '/imgs/skills/vue.png',
          progress: 63,
          color: '#53a573'
        },
        {
          name: 'Egg.js',
          logo: '/imgs/skills/egg.png',
          progress: 85,
          color: '#f0d264'
        },
        {
          name: 'Uniapp',
          logo: '/imgs/skills/uniapp.png',
          progress: 75,
          color: '#009688'
        }
      ],
      数据科学: [
        {
          name: 'PyTorch',
          logo: '/imgs/skills/pytorch.png',
          progress: 66,
          color: '#ee4c2c'
        },
        {
          name: 'Python',
          logo: '/imgs/skills/python.png',
          progress: 75,
          color: '#ff6f00'
        },
        {
          name: 'Matplotlib',
          logo: '',
          progress: 68,
          color: '#11557c'
        },
        {
          name: 'NumPy',
          logo: '/imgs/skills/numpy.png',
          progress: 70,
          color: '#013243'
        },
        {
          name: 'Pandas',
          logo: '/imgs/skills/pandas.png',
          progress: 70,
          color: '#150458'
        }
      ],
      数据库: [
        {
          name: 'Redis',
          logo: '/imgs/skills/redis.png',
          progress: 75,
          color: '#a41e11'
        },
        {
          name: 'MySQL',
          logo: '/imgs/skills/mysql.png',
          progress: 80,
          color: '#00618a'
        },
        {
          name: 'MongoDB',
          logo: '/imgs/skills/mogodb.png',
          progress: 85,
          color: '#4caf50'
        }
      ],
      部署: [
        {
          name: 'Docker',
          logo: '/imgs/skills/docker.png',
          progress: 70,
          color: '#2496ed'
        },
        {
          name: 'Nginx',
          logo: '',
          progress: 68,
          color: '#009639'
        },
        {
          name: '域名备案',
          logo: '',
          progress: 90,
          color: '#ff5722'
        }
      ]
    },
    honors: [
      '国家奖学金',
      '中国研究生数学建模大赛三等奖（国家级）',
      '第十五届蓝桥杯程序设计广东省赛二等奖（Python）',
      '第十四届蓝桥杯程序设计广东省赛三等奖（JAVA）',
      '广东工业大学优秀共产党员',
      '广东工业大学一等奖学金',
      '广东工业大学新生奖学金',
      '广东财经大学院长奖学金',
      '广东财经大学学业标兵奖',
      '广东财经大学学业优秀奖',
      '广东财经大学学术科研奖'
    ],
    contact: {
      github: 'https://github.com/waiterxiaoyy/',
      juejin: 'https://juejin.cn/user/2681042848976554',
      wechat: 'zhouyiyang0328',
      qq: '738294518'
    }
  }
};
