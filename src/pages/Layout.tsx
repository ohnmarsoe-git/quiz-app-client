import { useContext } from 'react';
import { Routes, Route } from 'react-router-dom';
import AuthContext from '../context/authProvider';
import PrivateRoute from '../components/PrivateRoute';
import Navbar from '../components/Navbar';
import NotFound from '../components/NotFound';
import Quiz from './Quiz';
import Login from './Login';
import SignIn from './SignIn';
import Home from './Home';
import Settings from './Settings';
import Results from './Results';
import PersistLogin from '../components/PersistLogin';
import Logout from '../components/Logout';

const Layout = () => {
  const { authState } = useContext(AuthContext);

  return (
    <>
      {authState.isAuth && <Navbar />}

      <Routes>
        {/** public Routes */}
        <Route path="/login" element={<Login />} />
        <Route path="/signin" element={<SignIn />} />
        <Route path="/logout" element={<Logout />} />
        <Route path="*" element={<NotFound />}></Route>

        {/** protectd Routes */}
        <Route element={<PersistLogin />}>
          <Route path="/" element={<PrivateRoute />}>
            <Route path="/quiz" element={<Home />} />
            <Route path="/quiz" element={<Home />} />
            <Route path="/quiz/:id" element={<Quiz />} />
            <Route path="/account" element={<Settings />} />
            <Route path="/results" element={<Results />} />
            <Route path="*" element={<NotFound />}></Route>
          </Route>
        </Route>

      </Routes>
    </>
  );
};

export default Layout;
