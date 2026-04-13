import { createContext, useContext, useState } from 'react';


/*
  AuthContext
  
  This handles all the authentication state for the app. In a real app,
  this would talk to the Django backend for login/register/logout.
  For this redesign, I use demo credentials to simulate these flows.
  
  Why Context? Because multiple components need to know who's logged in
  (Navbar shows the user name, Dashboard shows different views for
  coordinators vs instructors, etc). Context lets us share this state
  without passing props through every level.
*/

const AuthContext = createContext(null);

// Demo credentials kept explicitly for frontend-only auth fallback
const demoUsers = [
  {
    id: 1,
    username: 'rajesh.coordinator',
    email: 'rajesh@college.edu',
    firstName: 'Rajesh',
    lastName: 'Kumar',
    position: 'coordinator',
    title: 'Mr',
    institute: 'Delhi Technological University',
    department: 'computer engineering',
    phone: '9876543210',
    state: 'IN-DL',
    location: 'Delhi',
    isEmailVerified: true,
  },
  {
    id: 2,
    username: 'prof.sharma',
    email: 'sharma@iitb.ac.in',
    firstName: 'Anita',
    lastName: 'Sharma',
    position: 'instructor',
    title: 'Professor',
    institute: 'IIT Bombay',
    department: 'mechanical engineering',
    phone: '9123456789',
    state: 'IN-MH',
    location: 'Mumbai',
    isEmailVerified: true,
  },
];

export function AuthProvider({ children }) {
  const [user, setUser] = useState(null);

  // Demo-only login — matches against the two hardcoded accounts above.
  // In production, this would POST to the Django backend's auth endpoint.
  function login(email, password) {
    // Validate inputs before checking credentials
    if (!email || !password || password.length < 4) {
      return { success: false, error: 'Please enter a valid email and a password with at least 4 characters.' };
    }

    const found = demoUsers.find(u => u.email === email);

    if (found) {
      setUser(found);
      return { success: true };
    }

    // Unknown email — reject explicitly
    return { success: false, error: 'Unknown account. This demo accepts only: rajesh@college.edu (coordinator) or sharma@iitb.ac.in (instructor).' };
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
