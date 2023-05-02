import express from 'express';
import fs from 'fs';
import path from 'node:path';
import { fileURLToPath } from 'node:url';
import { ViteDevServer, createServer as createViteServer } from 'vite';

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const PORT = process.env.PORT || 3001;

async function createServer(root = process.cwd()) {
  const app = express();

  const vite: ViteDevServer = await createViteServer({
    root,
    server: { middlewareMode: true },
    appType: 'custom',
  });

  app.use(vite.middlewares);

  app.get('*', async (req, res) => {
    const url = req.originalUrl;
    try {
      const template = fs.readFileSync(path.resolve(__dirname, 'index.html'), 'utf-8');
      const html = await vite.transformIndexHtml(url, template);
      const { render } = await vite.ssrLoadModule('/src/entry-server.tsx');
      const parts = html.toString().split('not render');
      res.status(200).setHeader('Content-Type', 'text/html');
      res.write(parts[0]);
      const stream: ReactDOMServer.PipeableStream = render(url, {
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

createServer()
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  .then(({ app }: any) => {
    app.listen(PORT, () => console.log(`listening on http://localhost:${PORT}`));
  })
  .catch((e) => console.error(e));
