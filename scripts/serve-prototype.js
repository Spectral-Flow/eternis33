// Simple static server for the prototype (used by Playwright E2E & CI)
const path = require('path');
const express = require('express');

const app = express();
const port = process.env.PORT || 3000;
const root = path.resolve(__dirname, '..', 'eternis33_prototype');

app.use(express.static(root));

app.listen(port, () => {
  // eslint-disable-next-line no-console
  console.log(`Prototype server listening on http://localhost:${port} (root=${root})`);
});
