import { Navbar, Container, Spinner } from 'react-bootstrap';
import 'bootstrap/dist/css/bootstrap.min.css';
import { Route, Routes } from 'react-router';
import Auth from './pages/Auth.tsx';
import Dashboard from './pages/Dashboard.tsx';
import { useAuthStore } from './store/AuthStore.ts';
import { useItemsStore } from './store/ItemsStore.ts';
import ProtectedRoute from './components/ProtectedRoute.tsx';


const App = ()=> {
  const { isAuthenticated, user, logout } = useAuthStore();
  const { isLoading } = useItemsStore();

  return (
      <>
        <Navbar className="bg-primary position-relative">
          {isLoading && <Spinner className="position-absolute left-20" animation="border" variant="dark" />}
          <Container>
            <Navbar.Brand>{user?.email}</Navbar.Brand>
            <Navbar.Toggle />
            <Navbar.Collapse className="justify-content-end">
              {
                isAuthenticated ? (
                  <Navbar.Text>
                    <a href="login" onClick={logout}>LOGOUT</a>
                  </Navbar.Text>
                ) : (<>
                  <Navbar.Text>
                    <a href="login">LOGIN</a>
                  </Navbar.Text>
                  <Navbar.Text className="mx-3">
                    <a href="register">REGISTER</a>
                  </Navbar.Text>
                </>)
              }
            </Navbar.Collapse>
          </Container>
        </Navbar>
        <main>
          <Container>
          <Routes>
            <Route path="/login" element={<Auth />} />
            <Route path="/register" element={<Auth />} />
            <Route
              path="/"
              element={
                <ProtectedRoute>
                  <Dashboard />
                </ProtectedRoute>
              }
            />


          </Routes>
          </Container>
        </main>
      </>

  )
}

export default App
