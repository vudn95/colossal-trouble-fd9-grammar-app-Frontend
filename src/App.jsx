import { Route, Routes, Navigate } from 'react-router-dom';
import Login from './pages/auth/Login';
import Logout from './pages/auth/Logout';
import Home from './pages/home/Home';
import AddUser from './pages/auth/AddUser';

const RedirestToHome = () => {
  return <Navigate to="/" />;
}

function App() {
  return (
      <Routes>
        {/* auth */}
        <Route path="/login" Component={Login} />
        <Route path="/logout" Component={Logout} />
        <Route path="/add-user" Component={AddUser} />
        {/* Home */}
        <Route path="/" Component={Home} />
        <Route path="*" Component={RedirestToHome} />
      </Routes>
  );
}

export default App
