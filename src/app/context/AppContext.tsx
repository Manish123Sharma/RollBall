import React, { createContext, useContext, useState, ReactNode } from 'react';

export interface Document {
  id: string;
  name: string;
  type: string;
  status: 'verified' | 'under-review' | 'rejected';
  uploadDate: string;
  rejectionReason?: string;
  thumbnail?: string;
}

interface User {
  name: string;
  email: string;
  phone: string;
  emailVerified: boolean;
  phoneVerified: boolean;
  dateOfBirth?: string;
  gender?: string;
  address?: {
    line1: string;
    line2: string;
    city: string;
    state: string;
    pinCode: string;
  };
}

interface AppContextType {
  isAuthenticated: boolean;
  user: User | null;
  documents: Document[];
  login: (email: string, password: string) => void;
  register: (name: string, email: string, phone: string, password: string) => void;
  logout: () => void;
  addDocument: (doc: Document) => void;
  updateUser: (userData: Partial<User>) => void;
  verifyEmail: () => void;
  verifyPhone: () => void;
}

const AppContext = createContext<AppContextType | undefined>(undefined);

export function AppProvider({ children }: { children: ReactNode }) {
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [user, setUser] = useState<User | null>(null);
  const [documents, setDocuments] = useState<Document[]>([
    {
      id: '1',
      name: 'Aadhaar_Card.pdf',
      type: 'Aadhaar',
      status: 'verified',
      uploadDate: '2024-12-10',
    },
    {
      id: '2',
      name: '10th_Certificate.pdf',
      type: '10th Certificate',
      status: 'under-review',
      uploadDate: '2024-12-12',
    },
    {
      id: '3',
      name: 'Graduation_Certificate.pdf',
      type: 'Graduation',
      status: 'rejected',
      uploadDate: '2024-12-11',
      rejectionReason: 'Image is blurry/unclear',
    },
  ]);

  const login = (email: string, password: string) => {
    setIsAuthenticated(true);
    setUser({
      name: 'Rahul Kumar',
      email,
      phone: '+91 98765 43210',
      emailVerified: false,
      phoneVerified: false,
    });
  };

  const register = (name: string, email: string, phone: string, password: string) => {
    setIsAuthenticated(true);
    setUser({
      name,
      email,
      phone,
      emailVerified: false,
      phoneVerified: false,
    });
  };

  const logout = () => {
    setIsAuthenticated(false);
    setUser(null);
  };

  const addDocument = (doc: Document) => {
    setDocuments((prev) => [...prev, doc]);
  };

  const updateUser = (userData: Partial<User>) => {
    if (user) {
      setUser({ ...user, ...userData });
    }
  };

  const verifyEmail = () => {
    if (user) {
      setUser({ ...user, emailVerified: true });
    }
  };

  const verifyPhone = () => {
    if (user) {
      setUser({ ...user, phoneVerified: true });
    }
  };

  return (
    <AppContext.Provider
      value={{
        isAuthenticated,
        user,
        documents,
        login,
        register,
        logout,
        addDocument,
        updateUser,
        verifyEmail,
        verifyPhone,
      }}
    >
      {children}
    </AppContext.Provider>
  );
}

export function useApp() {
  const context = useContext(AppContext);
  if (!context) {
    throw new Error('useApp must be used within AppProvider');
  }
  return context;
}
