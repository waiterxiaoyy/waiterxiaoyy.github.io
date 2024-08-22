import styles from './index.module.less';

export default function Footer() {
  return (
    <div className={styles.container}>
      <div className={styles.footer}>
        &copy; 2024 WaiterXiaoYY. All rights reserved. <a href='https://beian.miit.gov.cn/'>粤ICP备2021149192号-3</a>
      </div>
    </div>
  );
}
