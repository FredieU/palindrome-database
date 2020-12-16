const express = require('express');

const app = express();
// Import additional routes with express router.
app.use(require('./routes/index.routes'));
// Serve static files from public folder.
app.use(express.static('./public'));

// Set port from environment variable or 3000 if not set.
const port = process.env.PORT || 3000;

app.get('/', (req, res) => {
  res.status(200);
});

app.listen(port, () => {
  console.log(`Server listening on port ${port}...`);
});