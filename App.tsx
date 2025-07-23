import { BrowserRouter, Routes, Route } from 'react-router-dom';
import IndexPage from './pages/Index';       // import directly from Index.tsx
import NotFoundPage from './pages/NotFound'; // import directly from NotFound.tsx

const App = () => (
  <BrowserRouter>
    <Routes>
      <Route path="/" element={<IndexPage />} />
      <Route path="*" element={<NotFoundPage />} />
    </Routes>
  </BrowserRouter>
);

export default App;
