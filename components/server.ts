import express from 'express';
import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';
import { ViteDevServer, createServer as createViteServer } from 'vite';

const __dirname = path.dirname(fileURLToPath(import.meta.url));
//const isTest = process.env.VITEST;

async function createServer(root = process.cwd()) {
  const app = express();

  //app.use(express.static('dist'));

  const vite: ViteDevServer = await createViteServer({
    root,
    server: { middlewareMode: true },
    appType: 'custom',
  });

  app.use(vite.middlewares);

  app.get('*', async (req, res) => {
    try {
      const url = req.originalUrl;
      let template = fs.readFileSync(path.resolve(__dirname, 'dist/client/index.html'), 'utf-8');
      template = await vite.transformIndexHtml(url, template);
      const { render } = await vite.ssrLoadModule('/src/entry-server.tsx');
      const appHtml = await render(url);
      const html = template.replace(`<!--ssr-outlet-->`, appHtml);
      res.status(200).setHeader('Content-Type', 'text/html').end(html);
      const parts = template.toString().split('not render');
      res.write(parts[0]);
      const stream: ReactDOMServer.PipeableStream = render(req.url, {
        onShellReady() {
          stream.pipe(res);
        },
        onShellError() {
          console.log('Error');
        },
        onAllReady() {
          res.write(parts[1]);
          res.end();
        },
        onError(err: Error | unknown) {
          console.error(err);
        },
      });
    } catch (e: Error | unknown) {
      vite.ssrFixStacktrace(e as Error);
    }
  });
  return { app };
}

//if (!isTest) {
createServer()
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  .then(({ app }: any) => {
    app.listen(5173, () => console.log(`listening on http://localhost:5173`));
  })
  .catch((e) => console.error(e));
//}
