import React from 'react';
import ReactDOMServer from 'react-dom/server';
import { StaticRouter } from 'react-router-dom/server';
import { Provider } from 'react-redux';
import { renderToPipeableStream } from 'react-dom/server';
import App from './App';
import './index.css';
import { setupStore } from './state/store';

const store = setupStore();

/*interface IRenderProps {
  path: string;
  options?: ReactDOMServer.RenderToPipeableStreamOptions;
}*/

const render = (path: string, options: ReactDOMServer.RenderToPipeableStreamOptions) => {
  const stream = renderToPipeableStream(
    <StaticRouter location={path}>
      <Provider store={store}>
        <App />
      </Provider>
    </StaticRouter>,
    { ...options }
  );
  return stream;
};

export default render;
