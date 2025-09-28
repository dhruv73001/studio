

export const teacherData = {
  name: "Dr. Evelyn Reed",
  attendance: 85,
  assignmentsDue: 3,
  upcomingEvents: 2,
  topStudents: [
    { name: 'Alice Smith', score: 98, class: '10-A' },
    { name: 'Bob Johnson', score: 95, class: '10-A' },
    { name: 'Charlie Brown', score: 92, class: '10-B' },
    { name: 'Diana Prince', score: 91, class: '10-A' },
    { name: 'Ethan Hunt', score: 89, class: '10-C' },
  ],
  leaveRequests: [
    { student: 'Frank Castle', reason: 'Family event', status: 'pending' },
    { student: 'Grace Hopper', reason: 'Medical', status: 'pending' },
  ],
  smartInsights: {
    studentName: "Alex Johnson",
    week: "October 16-22",
    aiSummary: "Alex has excellent attendance but missed one key assignment. Focusing on task submission will be beneficial.",
    riskAlert: true,
    data: [
      { metric: 'Attendance', value: 92, goal: 95 },
      { metric: 'Tasks', value: 66, goal: 100 },
      { metric: 'Quiz Avg', value: 85, goal: 80 },
    ],
  }
};

export const studentData = {
  name: "Alex Johnson",
  attendance: 92,
  leaderboardRank: 4,
  timetable: [
    { time: '09:00 AM', subject: 'Mathematics', teacher: 'Dr. E. Reed' },
    { time: '10:00 AM', subject: 'Physics', teacher: 'Mr. J. Smith' },
    { time: '11:00 AM', subject: 'Lunch Break', teacher: '' },
    { time: '12:00 PM', subject: 'History', teacher: 'Mr. A. Dumbledore' },
    { time: '01:00 PM', subject: 'Computer Science', teacher: 'Ms. A. Lovelace' },
  ],
  tasks: {
    solo: [{ title: 'Algebra Homework Ch. 4', status: 'pending' }],
    group: [{ title: 'Physics Project: Momentum', status: 'submitted' }],
    assessment: [{ title: 'History Mid-term Exam', status: 'pending' }],
  },
  events: [
    { name: 'Science Fair', date: 'Oct 26' },
    { name: 'Annual Sports Day', date: 'Nov 15' },
  ],
};

export const parentData = {
  name: "Mr. & Mrs. Johnson",
  childName: 'Alex Johnson',
  attendance: 92,
  tasks: [
    { title: 'Algebra Homework Ch. 4', status: 'Pending' },
    { title: 'Physics Project: Momentum', status: 'Submitted' },
    { title: 'History Mid-term Exam', status: 'Upcoming' },
  ],
  leaveRequests: [
      { date: 'Oct 20', reason: 'Dentist Appointment', status: 'approved' },
      { date: 'Nov 02', reason: 'Family Vacation', status: 'pending' },
  ],
  smartInsights: {
    week: "October 16-22",
    aiSummary: "Alex has excellent attendance but missed one key assignment. Focusing on task submission will be beneficial.",
    riskAlert: true,
    data: [
      { metric: 'Attendance', value: 92, goal: 95 },
      { metric: 'Tasks', value: 66, goal: 100 },
      { metric: 'Quiz Avg', value: 85, goal: 80 },
    ],
  }
};

export const curriculumRoadmap = [
    { title: 'Unit 1: Algebra', description: 'Foundations of algebraic expressions and equations.', status: 'completed', orderIndex: 1 },
    { title: 'Unit 2: Geometry', description: 'Exploring shapes, spaces, and their properties.', status: 'completed', orderIndex: 2 },
    { title: 'Unit 3: Trigonometry', description: 'Understanding triangles and periodic functions.', status: 'in-progress', orderIndex: 3 },
    { title: 'Unit 4: Calculus', description: 'Introduction to limits, derivatives, and integrals.', status: 'not-started', orderIndex: 4 },
    { title: 'Unit 5: Statistics', description: 'The practice of collecting and analyzing numerical data.', status: 'not-started', orderIndex: 5 },
];

export type CalendarEvent = {
  title: string;
  description: string;
  startDate: string;
  endDate: string;
  time: string;
  type: 'Quiz' | 'Assignment' | 'Event' | 'Holiday' | 'Class';
};

export const calendarData: { events: CalendarEvent[] } = {
  events: [
    {
      title: 'Math Quiz',
      description: 'Chapter 5 Quiz',
      startDate: '2025-10-30',
      endDate: '2025-10-30',
      time: '10:00 AM',
      type: 'Quiz',
    },
    {
      title: 'Science Assignment Submission',
      description: 'Submit lab report',
      startDate: '2025-11-02',
      endDate: '2025-11-02',
      time: '11:59 PM',
      type: 'Assignment',
    },
    {
      title: 'Parent-Teacher Meeting',
      description: 'Discuss student progress',
      startDate: '2025-11-05',
      endDate: '2025-11-05',
      time: '4:00 PM',
      type: 'Event',
    },
    {
      title: 'School Holiday – Diwali',
      description: 'Holiday',
      startDate: '2025-11-12',
      endDate: '2025-11-12',
      time: 'All Day',
      type: 'Holiday',
    },
     {
      title: 'Physics Class',
      description: 'Lecture on Thermodynamics',
      startDate: new Date().toISOString().split('T')[0], // Today
      endDate: new Date().toISOString().split('T')[0],
      time: '11:00 AM',
      type: 'Class',
    },
     {
      title: 'History Class',
      description: 'Discussion on World War II',
      startDate: new Date().toISOString().split('T')[0], // Today
      endDate: new Date().toISOString().split('T')[0],
      time: '01:00 PM',
      type: 'Class',
    },
  ],
};


export const leaderboardData = [
    { rank: 1, name: 'Alice Smith', points: 1250, avatar: 'https://picsum.photos/seed/alice/40', badges: ['Top Scorer', 'Perfect Attendance'] },
    { rank: 2, name: 'Bob Johnson', points: 1180, avatar: 'https://picsum.photos/seed/bob/40', badges: ['Top Scorer'] },
    { rank: 3, name: 'Charlie Brown', points: 1120, avatar: 'https://picsum.photos/seed/charlie/40', badges: ['Perfect Attendance'] },
    { rank: 4, name: 'Alex Johnson', points: 1050, avatar: 'https://picsum.photos/seed/alex/40', badges: [] },
    { rank: 5, name: 'Diana Prince', points: 980, avatar: 'https://picsum.photos/seed/diana/40', badges: ['Top Scorer'] },
    { rank: 6, name: 'Ethan Hunt', points: 950, avatar: 'https://picsum.photos/seed/ethan/40', badges: [] },
    { rank: 7, name: 'Frank Castle', points: 920, avatar: 'https://picsum.photos/seed/frank/40', badges: ['Perfect Attendance'] },
];

export const groupStudyData = [
  {
    id: 'room1',
    title: 'Calculus Crash Course',
    subject: 'Mathematics',
    host: 'Alice Smith',
    participants: [
      { name: 'Alice Smith', avatar: 'https://picsum.photos/seed/alice/40' },
      { name: 'Bob Johnson', avatar: 'https://picsum.photos/seed/bob/40' },
      { name: 'Charlie Brown', avatar: 'https://picsum.photos/seed/charlie/40' },
    ],
  },
  {
    id: 'room2',
    title: 'Shakespeare Study Sesh',
    subject: 'Literature',
    host: 'Diana Prince',
    participants: [
      { name: 'Diana Prince', avatar: 'https://picsum.photos/seed/diana/40' },
      { name: 'Ethan Hunt', avatar: 'https://picsum.photos/seed/ethan/40' },
    ],
  },
];
