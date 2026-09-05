import express from 'express';
import { fileURLToPath } from 'url';
import path from 'path';

//define the application environment
const NODE_ENV = process.env.NODE_ENV?.toLowerCase() || 'production';
//define the port number the server will listen on
const PORT = process.env.PORT || 3000;

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const app = express();
app.set('view engine', 'ejs');
//tell Express where to find your templates
app.set('views', path.join(__dirname, 'src', 'views'));

//serve static files from the public directory
app.use(express.static(path.join(__dirname, 'public')));

app.get('/', async (req, res) => {
  const title = 'Home';
  res.render('home', { title });
});

app.get('/organizations', async (req, res) => {
  const title = 'Our Partner Organizations';
  res.render('organizations', { title });
});

app.get('/projects', async (req, res) => {
  const title = 'Service Projects';
  res.render('projects', { title });
});

app.listen(PORT, '0.0.0.0', () => {
  console.log(`Server is running at http://0.0.0.0:${PORT}`);
  console.log(`Environment: ${NODE_ENV}`);
});