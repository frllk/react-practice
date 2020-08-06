/* import dva from 'dva';
import './index.css';

// 1. Initialize
const createHistory = require('history').createHistory
const app = dva({
  history: createHistory()
});

// const app = dva(); */

import app from './app'

// 2. Plugins
// app.use({});

// 3. Model
// app.model(require('./models/example').default);
// app.model(require('./models/user').default);

// 4. Router
app.router(require('./router').default);

// 5. Start
app.start('#root');
