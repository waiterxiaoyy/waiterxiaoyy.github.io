import { useEffect } from 'react';


let observer: IntersectionObserver | null = null;
export default function useOberserverHook<T>(element:string, callback:Function, watch:undefined | Array<T> = []) {
  useEffect(() => {
    const node = document.querySelector(element) as HTMLDivElement;
    if (node) {
      observer = new IntersectionObserver(entries=> {
        callback && callback(entries);
      });
      observer.observe(node);
    }

    return () => {
      if (observer && node) {
        // 解绑元素
        observer.unobserve(node);

        // 停止监听
        observer.disconnect();
      }
    };
  }, watch);
}
