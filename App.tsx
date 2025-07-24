console.log('App.tsx mounted');

import { BrowserRouter, Routes, Route } from 'react-router-dom';
import IndexPage from './pages/Index';
import NotFoundPage from './pages/NotFound';

const App = () => (
  <BrowserRouter>
    <Routes>
      <Route path="/" element={<IndexPage />} />
      <Route path="*" element={<NotFoundPage />} />
    </Routes>
  </BrowserRouter>
);

export default App;
