import type React from "react"
import { useAuthStore } from '../store/AuthStore.ts';
import { useNavigate } from 'react-router';

interface ProtectedRouteProps {
  children: React.ReactNode
}

const ProtectedRoute = ({ children }: ProtectedRouteProps) => {
  const { isAuthenticated } = useAuthStore()
  const navigate = useNavigate()

  if (!isAuthenticated) {
    navigate('/login')
  }

  return <>{children}</>
}

export default ProtectedRoute
