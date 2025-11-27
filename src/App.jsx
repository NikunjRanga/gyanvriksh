/**
 * Main App Component
 * Root component with routing setup
 */

import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { Home, About, Features, Blog, Dashboard, RecordStory, StoriesList, EditStory } from './pages';

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/about" element={<About />} />
        <Route path="/features" element={<Features />} />
        <Route path="/blog" element={<Blog />} />
        <Route path="/dashboard" element={<Dashboard />} />
        <Route path="/record" element={<RecordStory />} />
        <Route path="/stories" element={<StoriesList />} />
        <Route path="/stories/:id/edit" element={<EditStory />} />
      </Routes>
    </Router>
  );
}

export default App;
