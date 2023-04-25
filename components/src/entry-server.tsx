import React from 'react';
import ReactDOMServer, { renderToString } from 'react-dom/server';
import { StaticRouter } from 'react-router-dom/server';
import { Provider } from 'react-redux';
//import { renderToPipeableStream } from 'react-dom/server';
import App from './App';
import './index.css';
import { setupStore } from './state/store';

const store = setupStore();

interface IRenderProps {
  path: string;
  options?: ReactDOMServer.RenderToPipeableStreamOptions;
}

const render = ({ path /*, options*/ }: IRenderProps) => {
  const stream = renderToString(
    <StaticRouter location={path}>
      <Provider store={store}>
        <App />
      </Provider>
    </StaticRouter> //,
    //options
  );
  return stream;
};

export default render;
