import { ConfigProvider, theme } from 'antd';
import './App.less';
import './styles/theme.less';
import { RouterProvider } from 'react-router-dom';
import router from './router';
import './styles/theme.less';
import 'bytemd/dist/index.css';
import { useStore } from './store';
import { ConfigProvider as IConfigProvider } from './context/ConfigContext';
function App() {
  const isDark = useStore(state => state.isDark);
  return (
    <>
      <ConfigProvider
        theme={{
          token: {
            colorPrimary: '#44a340'
          },
          algorithm: isDark ? theme.darkAlgorithm : theme.defaultAlgorithm
        }}
      >
        <IConfigProvider>
          <RouterProvider router={router} />
        </IConfigProvider>
      </ConfigProvider>
    </>
  );
}

export default App;
