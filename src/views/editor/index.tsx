import { useState, useEffect, useRef } from 'react';
import { Form, Input, Button, message } from 'antd';

import { Editor } from '@bytemd/react';
import zhHans from 'bytemd/lib/locales/zh_Hans.json';
import gfm from '@bytemd/plugin-gfm';
import gemoji from '@bytemd/plugin-gemoji';
import highlight from '@bytemd/plugin-highlight-ssr';
import mediumZoom from '@bytemd/plugin-medium-zoom';
import 'bytemd/dist/index.min.css';
import 'highlight.js/styles/vs.css';
// import frontMatterPlugin from './plugins/FormatPlugin';
import styles from './index.module.less';
import frontmatter from '@bytemd/plugin-frontmatter';
import storage from '@/utils/storage';
import { isValidFileName } from '@/utils';

const plugins = [frontmatter(), gfm(), gemoji(), highlight(), mediumZoom()];

const IEditor = () => {
  const [form] = Form.useForm();
  const [value, setValue] = useState('');
  const valueRef = useRef(value);

  const [isSave, setIsSave] = useState(false);

  const [updateTime, setUpdateTime] = useState('');
  const [messageApi, contextHolder] = message.useMessage();

  useEffect(() => {
    const draft = storage.get('draftBox');
    if (draft) {
      form.setFieldsValue({ title: draft.title });
      setValue(draft.content);
      valueRef.current = draft.content; // 同步更新 useRef 中的值
      message.success('已加载草稿');
      setIsSave(false);
      setUpdateTime(draft.updateTime ? new Date(draft.updateTime).toLocaleString() : '');
    }
  }, []);

  const handlekeydown = (e: KeyboardEvent) => {
    if (e.ctrlKey && e.key === 's') {
      e.preventDefault();
      handleSave();
    }
  };

  useEffect(() => {
    window.addEventListener('keydown', handlekeydown);
    const timer = setInterval(() => {
      if (!isSave) {
        handleSave('auto');
      }
    }, 1000 * 10);
    return () => {
      clearInterval(timer);
      window.removeEventListener('keydown', handlekeydown);
    };
  }, [isSave]);

  const handleValueCancel = (v: string) => {
    // console.log('handleValueCancel', v);
    setIsSave(false);
    setValue(v);
    valueRef.current = v;
  };

  const handleSave = (type?: string) => {
    if (!form.getFieldValue('title')) {
      message.error('标题不能为空');
    } else if (!isValidFileName(form.getFieldValue('title'))) {
      message.error('标题不合法');
      return;
    } else {
      const draft = {
        title: form.getFieldValue('title'),
        content: valueRef.current,
        updateTime: new Date().toISOString() // 当前时间
      };
      setUpdateTime(new Date(draft.updateTime).toLocaleString());
      storage.set('draftBox', draft);
      setIsSave(true);
      if (type !== 'auto') {
        message.success('保存成功');
      }
    }
  };

  const handleDownload = () => {
    if (!form.getFieldValue('title')) {
      message.error('标题不能为空');
      return;
    }
    if (!isValidFileName(form.getFieldValue('title'))) {
      message.error('标题不合法');
      return;
    }
    if (!value) {
      message.error('内容不能为空');
      return;
    }
    if (!isSave) {
      message.warning('请先保存');
      return;
    }
    const blob = new Blob([value], { type: 'text/markdown' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = `${form.getFieldValue('title')}.md`;
    document.body.appendChild(a);
    a.click();

    // 释放URL对象
    document.body.removeChild(a);
    URL.revokeObjectURL(url);
  };

  const uploadImages = async (files: File[]): Promise<{ title: string; url: string }[]> => {
    try {
      const targetDir = 'sites/images/';
      const result = await Promise.all(
        files.map(async file => {
          // 创建 FormData 对象，用于发送文件和目标目录
          const formData = new FormData();
          formData.append('file', file);
          formData.append('targetDir', targetDir);
          messageApi.open({
            type: 'loading',
            content: 'Image uploading...',
            duration: 0
          });
          // 上传文件到服务器
          const res = await fetch('http://47.120.68.169:8000/api/upload', {
            // 替换为你的后端IP和端口
            method: 'POST',
            body: formData
          });

          if (!res.ok) {
            message.error('上传失败');
            throw new Error('Network response was not ok');
          }

          // 解析服务器响应
          const data = await res.json();
          messageApi.destroy();
          // 返回文件的标题和URL
          return {
            title: file.name,
            url: data.data.url || '' // `data.url` 可能为 undefined，因此提供默认值
          };
        })
      );
      message.success('上传成功');
      return result;
    } catch (error) {
      console.error('Upload failed:', error);
      message.error('上传失败');
      return [];
    }
  };

  const handleTemplete = () => {
    // 日期格式2024-08-09
    const now_date = new Date().toISOString().split('T')[0];
    const templete_title = `---\ntitle: \"标题"\nauthor: \"WaiterXiaoYY\"\ndate: \"${now_date}\"\navatar: \"\"\ncategory: '前端'\ntags: [\"Js\", \"React\", \"TypeScript\"]\nabstract: \"书写摘要\"\n---`;

    setValue(templete_title + '\n' + value);
    valueRef.current = templete_title + '\n' + value;
  };

  return (
    <div className={styles.contanier}>
      {contextHolder}
      <div className={styles.editor}>
        <div className={styles.toolbar}>
          <div className={styles.title}>
            <div className={styles.titleInfo}>
              <span>标题：</span>
            </div>
            <div className={styles.titleInput} style={{ display: 'inline-block' }}>
              <Form form={form} layout='inline'>
                <Form.Item name='title'>
                  <Input placeholder='请输入标题' className={styles.inputItem} />
                </Form.Item>
              </Form>
            </div>
          </div>
          <div className={styles.toolItems}>
            <div className={styles.updateTitle}>最近更新：{updateTime}</div>
            <div className={styles.saveStatus}>
              {isSave ? (
                <span style={{ color: '#5d9e58' }}>已保存本地Storage</span>
              ) : (
                <span style={{ color: 'red' }}>未保存</span>
              )}
            </div>
            <div className={styles.btns}>
              <Button size='small' style={{ border: '1px solid #f38d49', marginRight: '5px' }} onClick={handleTemplete}>
                模板
              </Button>
              <Button
                size='small'
                style={{ border: '1px solid #44a340', marginRight: '5px' }}
                onClick={() => handleSave()}
              >
                保存
              </Button>
              <Button size='small' type='primary' onClick={handleDownload}>
                下载
              </Button>
            </div>
          </div>
        </div>
        <div className={styles.editorContainer}>
          <Editor
            locale={zhHans}
            value={value}
            plugins={plugins}
            onChange={v => handleValueCancel(v)}
            uploadImages={uploadImages}
          />
        </div>

        {/* <Viewer value={value} plugins={plugins} /> */}
      </div>
    </div>
  );
};

export default IEditor;
