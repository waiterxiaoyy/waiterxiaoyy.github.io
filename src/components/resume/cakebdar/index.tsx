import React, { useEffect, useState } from 'react';
import styles from './index.module.less'; // 确保你创建了一个 CSS 模块文件
import ContributionJsonData from '@/contribution.json'; // 导入 JSON 数据
// 定义数据结构的类型
export type MonthItem = { colspan: number; month: number; year: number };

export type DateItem = {
  date: string;
  count: number;
  intensity: number;
};

// TypeScript 对象的定义
const MonthMap: Record<number, string> = {
  1: 'Jan',
  2: 'Feb',
  3: 'Mar',
  4: 'Apr',
  5: 'May',
  6: 'Jun',
  7: 'Jul',
  8: 'Aug',
  9: 'Sep',
  10: 'Oct',
  11: 'Nov',
  12: 'Dec'
};

const WeekMap: Record<number, string> = {
  0: 'Sun',
  1: 'Mon',
  2: 'Tue',
  3: 'Wed',
  4: 'Thu',
  5: 'Fri',
  6: 'Sat'
};

const levelColorMap: Record<number, string> = {
  0: '#ebedf0',
  1: '#9be9a8',
  2: '#30a14e',
  3: '#216e39',
  4: '#1c7092' // 假设你要用这个颜色作为第 4 等级
};

// 组件定义
const ContributionChart: React.FC = () => {
  // 从 JSON 数据中获取数据

  const [contribution_data, setContribution_data] = useState<DateItem[][] | undefined>();
  const [total, setTotal] = useState(0);
  const [months, setMonths] = useState<MonthItem[]>();
  useEffect(() => {
    setContribution_data(ContributionJsonData.contributions as unknown as DateItem[][]);
    setTotal(ContributionJsonData.total);
    const map: Map<string, MonthItem> = new Map();
    const monthsData: MonthItem[] = [];
    for (const item of ContributionJsonData.contributions as unknown as DateItem[][]) {
      const date = item[0].date;
      const [year, month] = date.split('-');
      const key = year + month;

      const existingMonth = map.get(key);

      if (existingMonth) {
        existingMonth.colspan += 1;
      } else {
        const month_tmp: MonthItem = { colspan: 1, month: Number(month), year: Number(year) };
        map.set(key, month_tmp);
        monthsData.push(month_tmp);
      }
    }

    setMonths(monthsData);
  }, []);
  console.log('contribution_data', contribution_data);

  const getBackgroundColor = (level: number): string => {
    return levelColorMap[level] || '#ebedf0'; // 如果等级不在范围内，返回默认颜色
  };

  return (
    <div className={styles.contributionChart}>
      <table>
        <thead className={styles.thead}>
          <tr>
            <th id='first-block'></th>
            {months?.map(item => (
              <th key={item.month} colSpan={item.colspan} className={styles.label}>
                <span>{MonthMap[item.month]}</span>
              </th>
            ))}
          </tr>
        </thead>
        <tbody className={styles.tbody}>
          {Object.entries(WeekMap).map(([key, value]) => (
            <tr key={key}>
              <td className={styles.label} style={{ width: '30px' }}>
                {value}
              </td>
              {contribution_data?.map((item, index) => {
                if (item.length >= Number(key)) {
                  return (
                    <td
                      data-date={7}
                      key={index}
                      className={`${styles.block}`}
                      style={{
                        backgroundColor: getBackgroundColor(
                          item[Number(key)].intensity ? item[Number(key)].intensity : 0
                        )
                      }}
                    ></td>
                  );
                } else {
                  return <td key={index} className={`${styles.block} ${styles.hidden}`}></td>;
                }
              })}
            </tr>
          ))}
        </tbody>
      </table>
      {/* {showFooter && (
        <div className='tfoot'>
          <div className={styles.description}>{description}</div>
          {colors.length > 0 && (
            <div className={styles.colors}>
              <span className={styles.lessText}>{lessText}</span>
              {colors.map((color, index) => (
                <span
                  key={index}
                  className={styles.colorItem}
                  style={{ backgroundColor: color, marginLeft: '4px' }}
                ></span>
              ))}
              <span className={styles.moreText}>{moreText}</span>
            </div>
          )}
        </div>
      )} */}
    </div>
  );
};

export default ContributionChart;
