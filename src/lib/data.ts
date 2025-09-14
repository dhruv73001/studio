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
  ]
};

export const curriculumRoadmap = [
    { unit: 'Unit 1: Algebra', status: 'completed' },
    { unit: 'Unit 2: Geometry', status: 'completed' },
    { unit: 'Unit 3: Trigonometry', status: 'in-progress' },
    { unit: 'Unit 4: Calculus', status: 'upcoming' },
    { unit: 'Unit 5: Statistics', status: 'upcoming' },
];
