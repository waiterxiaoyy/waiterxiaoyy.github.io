import { useNavigate } from 'react-router-dom';
import styles from './index.module.less';
import { Drawer, List, Switch } from 'antd';
import { useEffect, useState } from 'react';
import { useStore } from '@/store';
import storage from '@/utils/storage';
import { useConfig } from '@/context/ConfigContext';
export default function Header() {
  const navigate = useNavigate();
  const config = useConfig();
  const menuItems = config.header.menu as { key: string; label: string; href: string }[];

  const { isDark, updateTheme } = useStore();
  useEffect(() => {
    handleSwitch(isDark);
  }, []);

  const handleMenuChange = (href: string) => {
    console.log('href', href);
    // 使用 navigate 进行跳转
    // const hashHref = href.startsWith('#') ? href : `#${href}`;
    navigate(href);
    onClose();
  };

  const handleSwitch = (isDark: boolean) => {
    if (isDark) {
      document.documentElement.dataset.theme = 'dark';
      document.documentElement.classList.add('dark');
    } else {
      document.documentElement.dataset.theme = 'light';
      document.documentElement.classList.remove('dark');
    }
    storage.set('isDark', isDark);
    updateTheme(isDark);
    if (open) {
      onClose();
    }
  };

  const [open, setOpen] = useState(false);

  const showDrawer = () => {
    setOpen(true);
  };

  const onClose = () => {
    setOpen(false);
  };

  return (
    <div className={styles.container}>
      <div className={styles.info}>
        <div className={styles.title}>{config.header.title}</div>
        <div className={styles.subtitle}>{config.header.slogan}</div>
      </div>
      <div className={styles.nav}>
        <div className={styles.menu}>
          {menuItems.map(item => (
            <a key={item.key} className={styles.item} onClick={() => handleMenuChange(item.href)}>
              {item.label}
            </a>
          ))}
        </div>
        {/* <Dropdown menu={{ items: menuItems, onClick: handleMenuChange }} placement='bottom' arrow>
          <a onClick={e => e.preventDefault()}>
            <button id='nav-toggle' className={styles.navToggle}>
              ☰
            </button>
          </a>
          
        </Dropdown> */}
        <a onClick={showDrawer}>
          <button id='nav-toggle' className={styles.navToggle}>
            ☰
          </button>
        </a>
        <Drawer
          title={
            <Switch
              style={{ float: 'right' }}
              checked={isDark}
              onChange={handleSwitch}
              checkedChildren='🌜'
              unCheckedChildren='🌞'
            />
          }
          onClose={onClose}
          open={open}
          width={200}
        >
          <List
            size='large'
            dataSource={menuItems}
            renderItem={item => <List.Item onClick={() => handleMenuChange(item.href)}>{item.label}</List.Item>}
          />
        </Drawer>
        <div className={styles.switch}>
          <Switch checked={isDark} onChange={handleSwitch} checkedChildren='🌜' unCheckedChildren='🌞' />
        </div>
      </div>
    </div>
  );
}
