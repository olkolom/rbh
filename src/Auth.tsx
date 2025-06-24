
import { useState } from 'react'
import type { ReactNode } from 'react' 
import { useNavigate } from 'react-router'
import { AuthContext } from './AuthContext'

const AuthProvider = ({ children }: { children: ReactNode }) => {
  const [user, setUser] = useState<string|null>(localStorage.getItem('user') || null)
  const [token, setToken] = useState<string|null>(localStorage.getItem('token') || null)
  const navigate = useNavigate()

  const login = async (credentials: string) => {
    try {
      const response = await fetch('/api/auth/login', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ credentials }),
      })
      const res = await response.json()
      if (res?.user) {
        setUser(res.user)
        setToken(res.token)
        localStorage.setItem('token', res.token)
        localStorage.setItem('user', res.user)
        navigate('/')
        return
      }
      throw new Error(res.message)
    } catch (err) {
      console.error(err)
    }
  };

  const logout = () => {
    setUser(null);
    setToken("");
    localStorage.removeItem("site");
    navigate("/login");
  };

  return (
    <AuthContext value={{ token, user, login, logout }}>
      {children}
    </AuthContext>
  );

};

export default AuthProvider;