/*
  Mock Data
  
  Since we're only building the frontend (the Django backend is separate),
  we need some sample data to make the UI actually work and look realistic.
  
  This data structure mirrors the original Django models:
  - Users have profiles with position (coordinator/instructor), institute, etc.
  - WorkshopTypes define what kind of workshops are available
  - Workshops are actual bookings with dates, statuses, etc.
  - Comments are on specific workshop instances
*/

// ---- department options (same as Django model choices) ----
export const departmentChoices = [
  { value: 'computer engineering', label: 'Computer Science' },
  { value: 'information technology', label: 'Information Technology' },
  { value: 'civil engineering', label: 'Civil Engineering' },
  { value: 'electrical engineering', label: 'Electrical Engineering' },
  { value: 'mechanical engineering', label: 'Mechanical Engineering' },
  { value: 'chemical engineering', label: 'Chemical Engineering' },
  { value: 'aerospace engineering', label: 'Aerospace Engineering' },
  { value: 'biosciences and bioengineering', label: 'Biosciences and BioEngineering' },
  { value: 'electronics', label: 'Electronics' },
  { value: 'energy science and engineering', label: 'Energy Science and Engineering' },
];

// ---- title choices ----
export const titleChoices = [
  { value: 'Professor', label: 'Prof.' },
  { value: 'Doctor', label: 'Dr.' },
  { value: 'Mr', label: 'Mr.' },
  { value: 'Mrs', label: 'Mrs.' },
  { value: 'Miss', label: 'Ms.' },
];

// ---- indian states list ----
export const stateChoices = [
  { value: 'IN-AP', label: 'Andhra Pradesh' },
  { value: 'IN-AR', label: 'Arunachal Pradesh' },
  { value: 'IN-AS', label: 'Assam' },
  { value: 'IN-BR', label: 'Bihar' },
  { value: 'IN-CT', label: 'Chhattisgarh' },
  { value: 'IN-GA', label: 'Goa' },
  { value: 'IN-GJ', label: 'Gujarat' },
  { value: 'IN-HR', label: 'Haryana' },
  { value: 'IN-HP', label: 'Himachal Pradesh' },
  { value: 'IN-JK', label: 'Jammu and Kashmir' },
  { value: 'IN-JH', label: 'Jharkhand' },
  { value: 'IN-KA', label: 'Karnataka' },
  { value: 'IN-KL', label: 'Kerala' },
  { value: 'IN-MP', label: 'Madhya Pradesh' },
  { value: 'IN-MH', label: 'Maharashtra' },
  { value: 'IN-MN', label: 'Manipur' },
  { value: 'IN-ML', label: 'Meghalaya' },
  { value: 'IN-MZ', label: 'Mizoram' },
  { value: 'IN-NL', label: 'Nagaland' },
  { value: 'IN-OR', label: 'Odisha' },
  { value: 'IN-PB', label: 'Punjab' },
  { value: 'IN-RJ', label: 'Rajasthan' },
  { value: 'IN-SK', label: 'Sikkim' },
  { value: 'IN-TN', label: 'Tamil Nadu' },
  { value: 'IN-TG', label: 'Telangana' },
  { value: 'IN-TR', label: 'Tripura' },
  { value: 'IN-UT', label: 'Uttarakhand' },
  { value: 'IN-UP', label: 'Uttar Pradesh' },
  { value: 'IN-WB', label: 'West Bengal' },
  { value: 'IN-DL', label: 'Delhi' },
  { value: 'IN-CH', label: 'Chandigarh' },
  { value: 'IN-PY', label: 'Puducherry' },
];

// ---- source options (how users found FOSSEE) ----
export const sourceChoices = [
  { value: 'FOSSEE website', label: 'FOSSEE website' },
  { value: 'Google', label: 'Google' },
  { value: 'Social Media', label: 'Social Media' },
  { value: 'From other College', label: 'From other College' },
];

// ---- mock users ----
export const mockUsers = [
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

// ---- workshop types (what kinds of workshops exist) ----
export const mockWorkshopTypes = [
  {
    id: 1,
    name: 'Python Programming',
    description: 'A hands-on workshop covering Python basics, data structures, file handling, and object-oriented programming. Suitable for beginners with no prior programming experience. Participants will work on practical exercises to build real-world skills.',
    duration: 2,
    termsAndConditions: 'Participants must bring their own laptops. The workshop will run from 9 AM to 5 PM. A minimum of 20 participants is required for the workshop to be conducted. Certificates will be provided upon successful completion.',
  },
  {
    id: 2,
    name: 'Scilab for Engineers',
    description: 'Learn numerical computing with Scilab — an open-source alternative to MATLAB. This workshop covers matrix operations, plotting, signal processing, and control systems. Ideal for engineering students.',
    duration: 2,
    termsAndConditions: 'Participants should have basic knowledge of engineering mathematics. Lab facilities should be arranged by the coordinator. Scilab must be pre-installed on all machines.',
  },
  {
    id: 3,
    name: 'OpenFOAM Workshop',
    description: 'Introduction to computational fluid dynamics using OpenFOAM. Covers mesh generation, boundary conditions, solver selection, and post-processing with ParaView. Prior knowledge of fluid mechanics recommended.',
    duration: 3,
    termsAndConditions: 'Linux-based systems required. Workshop conducted over 3 consecutive days. Coordinators must ensure stable internet connectivity for all participants.',
  },
  {
    id: 4,
    name: 'LaTeX for Academic Writing',
    description: 'Master document preparation with LaTeX. Covers article formatting, mathematical equations, tables, figures, bibliography management, and thesis templates. Essential for research scholars and academics.',
    duration: 1,
    termsAndConditions: 'Participants need a laptop with TeX Live or MiKTeX installed. The workshop is suitable for all academic disciplines. Basic computer literacy is expected.',
  },
  {
    id: 5,
    name: 'R Programming for Statistics',
    description: 'Statistical computing with R — from data import and cleaning to hypothesis testing, regression analysis, and data visualization with ggplot2. Designed for researchers and data analysts.',
    duration: 2,
    termsAndConditions: 'R and RStudio must be pre-installed. Participants should bring their datasets if they want personalized guidance. Basic statistics knowledge is helpful but not mandatory.',
  },
  {
    id: 6,
    name: 'DWSIM Chemical Process Simulation',
    description: 'Learn process simulation using DWSIM — an open source chemical process simulator. Covers flowsheet creation, thermodynamic property calculations, equilibrium reactors, and process optimization.',
    duration: 2,
    termsAndConditions: 'DWSIM should be installed before the workshop. Knowledge of basic chemical engineering unit operations is required. Minimum 15 participants needed.',
  },
  {
    id: 7,
    name: 'Arduino and IoT Basics',
    description: 'Hands-on workshop on Arduino microcontrollers and basic IoT concepts. Covers digital/analog I/O, sensors, actuators, serial communication, and building simple IoT projects with Wi-Fi modules.',
    duration: 2,
    termsAndConditions: 'Arduino kits will be provided during the workshop. Participants should have basic knowledge of C programming and electronics. Workshop fee includes kit cost.',
  },
  {
    id: 8,
    name: 'Linux System Administration',
    description: 'Comprehensive introduction to Linux system administration. Covers shell commands, file permissions, process management, package installation, networking basics, and shell scripting.',
    duration: 1,
    termsAndConditions: 'A Linux distribution should be installed (Ubuntu recommended). Virtual machines are acceptable. Internet access required for package installations.',
  },
];

// ---- mock workshops (actual bookings) ----
export const mockWorkshops = [
  {
    id: 1,
    coordinatorId: 1,
    coordinatorName: 'Rajesh Kumar',
    coordinatorInstitute: 'Delhi Technological University',
    instructorId: 2,
    instructorName: 'Prof. Anita Sharma',
    workshopType: mockWorkshopTypes[0], // Python Programming
    date: '2026-04-15',
    status: 1, // Accepted
  },
  {
    id: 2,
    coordinatorId: 1,
    coordinatorName: 'Rajesh Kumar',
    coordinatorInstitute: 'Delhi Technological University',
    instructorId: null,
    instructorName: null,
    workshopType: mockWorkshopTypes[1], // Scilab
    date: '2026-05-10',
    status: 0, // Pending
  },
  {
    id: 3,
    coordinatorId: 1,
    coordinatorName: 'Rajesh Kumar',
    coordinatorInstitute: 'Delhi Technological University',
    instructorId: 2,
    instructorName: 'Prof. Anita Sharma',
    workshopType: mockWorkshopTypes[3], // LaTeX
    date: '2026-03-20',
    status: 2, // Deleted
  },
  {
    id: 4,
    coordinatorId: 1,
    coordinatorName: 'Priya Patel',
    coordinatorInstitute: 'NIT Surat',
    instructorId: null,
    instructorName: null,
    workshopType: mockWorkshopTypes[4], // R Programming
    date: '2026-05-22',
    status: 0, // Pending
  },
  {
    id: 5,
    coordinatorId: 1,
    coordinatorName: 'Amit Singh',
    coordinatorInstitute: 'BITS Pilani',
    instructorId: null,
    instructorName: null,
    workshopType: mockWorkshopTypes[2], // OpenFOAM
    date: '2026-06-01',
    status: 0, // Pending
  },
];

// ---- mock comments on workshops ----
export const mockComments = [
  {
    id: 1,
    workshopId: 1,
    authorName: 'Rajesh Kumar',
    comment: 'Looking forward to this workshop! We have 35 students registered already. Is there a limit on maximum participants?',
    createdDate: '2026-04-02',
    isPublic: true,
  },
  {
    id: 2,
    workshopId: 1,
    authorName: 'Prof. Anita Sharma',
    comment: 'Great to hear about the good response. We can accommodate up to 40 students. Please make sure each student has Python 3.10+ installed on their machines before the workshop.',
    createdDate: '2026-04-03',
    isPublic: true,
  },
  {
    id: 3,
    workshopId: 1,
    authorName: 'Rajesh Kumar',
    comment: 'Done, we have shared installation instructions with all students. The computer lab is booked for both days.',
    createdDate: '2026-04-04',
    isPublic: true,
  },
];
