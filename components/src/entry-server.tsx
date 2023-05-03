import React from 'react';
import { StaticRouter } from 'react-router-dom/server';
import { Provider } from 'react-redux';
import { RenderToPipeableStreamOptions, renderToPipeableStream } from 'react-dom/server';
import App from './App';
import './index.css';
import { setupStore } from './state/store';
//import { Response } from 'express';

export function render(path: string, options: RenderToPipeableStreamOptions) {
  const store = setupStore();
  const stream = renderToPipeableStream(
    <html>
      <StaticRouter location={path}>
        <Provider store={store}>
          <App />
        </Provider>
      </StaticRouter>
    </html>,
    options
  );
  return stream;
}
