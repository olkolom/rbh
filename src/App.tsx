import { Button } from '@/components/ui/button'
import { BrowserRouter, Routes, Route, Navigate, Outlet } from 'react-router'
import AuthProvider from './Auth.tsx'
import { useAuth } from './AuthContext.ts'
import Login from './Login.tsx'

const Dashboard = () => {
  const auth = useAuth()
  return (
    <div className='flex flex-row gap-2 p-2'>
      <p className='text-red-600 text-2xl'>{auth.user}</p>
      <Button onClick={() => auth?.logout()}>
        Log out
      </Button>
    </div>
  )
}

const PrivateRoute = () => {
  const auth = useAuth()
  const NextMove = !auth?.token ? <Navigate to='/login' /> : <Outlet />
  return NextMove
}

function App() {
  return (
    <BrowserRouter>
      <AuthProvider>
        <Routes>
          <Route path="/login" element={<Login />} />
          <Route element={<PrivateRoute />}>
            <Route path="/" element={<Dashboard />} />
          </Route>
        </Routes>
      </AuthProvider>
    </BrowserRouter>
      
  )
}

export default App
