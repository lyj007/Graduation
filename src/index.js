import dva from 'dva';
import './index.css';

// 1. Initialize
const app = dva();

// 2. Plugins
// app.use({});

// 3. Model
app.model(require('./two/models').default);
app.model(require('./First/models').default);
app.model(require('./three/models').default);

// 4. Router
app.router(require('./router').default);

// 5. Start
app.start('#root');
