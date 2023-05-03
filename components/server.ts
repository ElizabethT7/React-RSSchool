import express, { Response, Request } from 'express';
import fs from 'fs';
import path from 'node:path';
import { fileURLToPath } from 'node:url';
import { ViteDevServer, createServer as createViteServer } from 'vite';

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const PORT = 5173;

async function createServer(root = process.cwd()) {
  const app = express();

  const vite: ViteDevServer = await createViteServer({
    root,
    base: '/',
    server: { middlewareMode: true },
    appType: 'custom',
  });

  app.use(vite.middlewares);

  app.get('*', async (req: Request, res: Response) => {
    try {
      const url = req.originalUrl;
      let template = fs.readFileSync(path.resolve(__dirname, 'index.html'), 'utf-8');
      template = await vite.transformIndexHtml(url, template);
      const render = (await vite.ssrLoadModule('/src/entry-server.tsx')).render;
      const parts = template.split('<!--app-html-->');
      res.statusCode = 200;
      res.setHeader('Content-Type', 'text/html');
      const stream: ReactDOMServer.PipeableStream = await render(url, {
        onShellReady() {
          res.write(parts[0]);
          stream.pipe(res);
        },
        onAllReady() {
          res.write(parts[1]);
          res.end();
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
