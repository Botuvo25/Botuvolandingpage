import { BrowserRouter, Routes, Route } from 'react-router-dom';
import { IndexPage, NotFoundPage } from './pages';

const App = () => (
  <BrowserRouter>
    <Routes>
      <Route path="/" element={<IndexPage />} />
      <Route path="*" element={<NotFoundPage />} />
    </Routes>
  </BrowserRouter>
);

export default App;
