import { createContext, useContext, useState } from 'react';
import { mockUsers } from '../data/mockData';

/*
  AuthContext
  
  This handles all the authentication state for the app. In a real app,
  this would talk to the Django backend for login/register/logout.
  For our redesign, we're using mock data to simulate these flows.
  
  Why Context? Because multiple components need to know who's logged in
  (Navbar shows the user name, Dashboard shows different views for
  coordinators vs instructors, etc). Context lets us share this state
  without passing props through every level.
*/

const AuthContext = createContext(null);

export function AuthProvider({ children }) {
  const [user, setUser] = useState(null);

  // try to find a matching user from our mock data
  function login(email, password) {
    // in a real app, this would be an API call to the Django backend
    const found = mockUsers.find(u => u.email === email);
    
    if (found) {
      setUser(found);
      return { success: true };
    }
    
    // for demo purposes, if the email isn't in our mock data but looks valid,
    // we'll log them in as the first coordinator user
    if (email && password && password.length >= 4) {
      setUser(mockUsers[0]); // default to coordinator
      return { success: true };
    }

    return { success: false, error: 'Invalid email or password. Check your credentials and try again.' };
  }

  function register(formData) {
    // simulate registration — in reality this would POST to Django
    const newUser = {
      id: Date.now(), // just need a unique id
      username: formData.email.split('@')[0],
      email: formData.email,
      firstName: formData.firstName,
      lastName: formData.lastName,
      position: formData.position || 'coordinator',
      title: formData.title || 'Mr',
      institute: formData.institute,
      department: formData.department,
      phone: formData.phone,
      state: formData.state,
      location: formData.location || '',
      isEmailVerified: true, // skip verification for demo
    };
    
    setUser(newUser);
    return { success: true };
  }

  function logout() {
    setUser(null);
  }

  // helper to check if the current user is an instructor
  function isInstructor() {
    return user?.position === 'instructor';
  }

  // helper to get the user's full name
  function getFullName() {
    if (!user) return '';
    return `${user.firstName} ${user.lastName}`;
  }

  const contextValue = {
    user,
    login,
    register,
    logout,
    isInstructor,
    getFullName,
  };

  return (
    <AuthContext.Provider value={contextValue}>
      {children}
    </AuthContext.Provider>
  );
}

// custom hook so we don't have to import useContext everywhere
export function useAuth() {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error('useAuth must be used inside an AuthProvider');
  }
  return context;
}
