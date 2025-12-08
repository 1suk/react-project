import './App.css'
import { AuthProvider } from './context/UserContext'
import AppRoutes from './routes/routePath'
import LoginModal from './components/modals/LoginModal'
import RegisterModal from './components/modals/RegisterModal'

function App() {

  return (
    <AuthProvider>
      <AppRoutes/>
      <RegisterModal/>
      <LoginModal/>
    </AuthProvider>
  )
}

export default App
