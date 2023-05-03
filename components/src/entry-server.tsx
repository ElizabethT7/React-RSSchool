import React from 'react';
import { StaticRouter } from 'react-router-dom/server';
import { Provider } from 'react-redux';
import { renderToPipeableStream } from 'react-dom/server';
import App from './App';
import './index.css';
import { setupStore } from './state/store';
import { Response } from 'express';

const store = setupStore();

export function render(path: string, res: Response) {
  const stream = renderToPipeableStream(
    <html>
      <StaticRouter location={path}>
        <Provider store={store}>
          <App />
        </Provider>
      </StaticRouter>
    </html>,
    {
      onShellReady() {
        res.statusCode = 200;
        res.setHeader('Content-type', 'text/html');
        stream.pipe(res);
      },
    }
  );
  return stream;
}
