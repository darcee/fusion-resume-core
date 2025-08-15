import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import { ConfigProvider, theme, App as AntApp } from 'antd';
import 'antd/dist/reset.css';
import './index.css'
import App from './App.tsx'
import { Amplify } from "aws-amplify";
import outputs from "../amplify_outputs.json";
Amplify.configure(outputs);
createRoot(document.getElementById('root')!).render(
  <StrictMode>
      <ConfigProvider
          theme={{
              algorithm: theme.defaultAlgorithm, // switch to theme.darkAlgorithm for dark
              token: {
                  colorPrimary: '#1677ff', // customize your brand color
              },
          }}
      >
          <AntApp>
            <App />
          </AntApp>
      </ConfigProvider>
  </StrictMode>,
)
