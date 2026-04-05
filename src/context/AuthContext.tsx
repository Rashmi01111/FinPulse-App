import { createContext, useContext, useState, useEffect, ReactNode } from 'react';
import { clearUserData } from '../services/userStorage';

interface User {
  id: string;
  email: string;
  name: string;
  createdAt: string;
}

interface AuthContextType {
  user: User | null;
  login: (email: string, password: string) => Promise<void>;
  register: (email: string, password: string, name: string) => Promise<void>;
  logout: () => void;
  isLoading: boolean;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export const AuthProvider = ({ children }: { children: ReactNode }) => {
  const [user, setUser] = useState<User | null>(null);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    // Check for existing session on mount
    const savedUser = localStorage.getItem('finance_user');
    if (savedUser) {
      try {
        setUser(JSON.parse(savedUser));
      } catch (error) {
        localStorage.removeItem('finance_user');
      }
    }
    setIsLoading(false);
  }, []);

  const login = async (email: string, password: string) => {
    setIsLoading(true);
    
    try {
      // Simulate API call delay
      await new Promise(resolve => setTimeout(resolve, 1000));
      
      // Get users from localStorage
      const users = JSON.parse(localStorage.getItem('finance_users') || '[]');
      
      // Check for demo credentials
      if (email === 'demo@finance.com' && password === 'demo123') {
        const demoUser: User = {
          id: 'demo-user',
          email: 'demo@finance.com',
          name: 'Demo User',
          createdAt: new Date().toISOString()
        };
        setUser(demoUser);
        localStorage.setItem('finance_user', JSON.stringify(demoUser));
        return;
      }
      
      // Find user by email
      const foundUser = users.find((u: any) => u.email === email);
      
      if (!foundUser) {
        throw new Error('User not found. Please sign up first.');
      }
      
      if (foundUser.password !== password) {
        throw new Error('Incorrect password. Please try again.');
      }
      
      // Remove password from user object before storing
      const { password: _, ...userWithoutPassword } = foundUser;
      setUser(userWithoutPassword);
      localStorage.setItem('finance_user', JSON.stringify(userWithoutPassword));
      
    } catch (error) {
      throw error;
    } finally {
      setIsLoading(false);
    }
  };

  const register = async (email: string, password: string, name: string) => {
    setIsLoading(true);
    
    try {
      // Simulate API call delay
      await new Promise(resolve => setTimeout(resolve, 1000));
      
      // Get existing users
      const users = JSON.parse(localStorage.getItem('finance_users') || '[]');
      
      // Check if user already exists
      if (users.find((u: any) => u.email === email)) {
        throw new Error('User with this email already exists.');
      }
      
      // Create new user
      const newUser = {
        id: Date.now().toString(),
        email,
        password, // In real app, this should be hashed
        name,
        createdAt: new Date().toISOString()
      };
      
      // Save user
      users.push(newUser);
      localStorage.setItem('finance_users', JSON.stringify(users));
      
      // Auto-login after registration
      const { password: _, ...userWithoutPassword } = newUser;
      setUser(userWithoutPassword);
      localStorage.setItem('finance_user', JSON.stringify(userWithoutPassword));
      
    } catch (error) {
      throw error;
    } finally {
      setIsLoading(false);
    }
  };

  const logout = () => {
    if (user) {
      clearUserData(user.id);
    }
    setUser(null);
    localStorage.removeItem('finance_user');
  };

  return (
    <AuthContext.Provider value={{ user, login, register, logout, isLoading }}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (!context) throw new Error('useAuth must be used within AuthProvider');
  return context;
};
