import express from 'express';
import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';
import render from './dist/server/entry-server.js';
//import render from './src/entry-server.tsx';

const __dirname = path.dirname(fileURLToPath(import.meta.url));
console.log(__dirname);

const PORT = process.env.PORT || 3001;

const html = fs.readFileSync(path.resolve(__dirname, 'dist/client/index.html')).toString();

const parts = html.split('not render');

const app = express();

app.use('/assets', express.static(path.resolve(__dirname, 'dist/client/assets')));
app.use((req, res) => {
  res.write(parts[0]);
  const stream = render(req.url, {
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
    onError(err) {
      console.error(err);
    },
  });
});

console.log(`listening on http://localhost:${PORT}`);

app.listen(PORT);
