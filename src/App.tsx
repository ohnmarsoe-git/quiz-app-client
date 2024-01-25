import { BrowserRouter, Routes, Route } from 'react-router-dom';
import './index.css';
import './App.css';
import { AuthProvider } from './context/authProvider';
import Main from './components/Main'
import Layout from './pages/Layout';
import Login from './pages/Login';

function App() {
  return (
      <BrowserRouter>
        <div className="md:container md:mx-auto">
          <AuthProvider>
            <Routes>
              <Route path="/" element={<Main />}>
                <Route path="/" element={<Login />} />
                <Route path="/*" element={<Layout />} />
              </Route>
            </Routes>
          </AuthProvider>
        </div>
      </BrowserRouter>
  );
}

export default App;
