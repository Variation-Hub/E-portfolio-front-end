const darkColors = [
  '#4169E1',   // RoyalBlue
  '#8B4513',   // SaddleBrown
  '#8B0000',   // DarkRed
  '#8B008B',   // DarkMagenta
  '#2F4F4F',   // DarkSlateGray
  '#556B2F',   // DarkOliveGreen
  '#A52A2A',   // Brown
  '#483D8B',   // DarkSlateBlue
  '#006400',   // DarkGreen
  '#8B4513',   // SaddleBrown
  '#FF8C00',   // DarkOrange
  '#8B0000',   // DarkRed
  '#2F4F4F',   // DarkSlateGray
  '#556B2F',   // DarkOliveGreen
  '#A52A2A',   // Brown
  '#483D8B',   // DarkSlateBlue
  '#00008B',   // DarkBlue
  '#8B008B',   // DarkMagenta
  '#DAA520',   // GoldenRod
  '#FF6347',   // Tomato
  '#8B4513',   // SaddleBrown
  '#FF8C00',   // DarkOrange
  '#8B0000',   // DarkRed
  '#2F4F4F',   // DarkSlateGray
  '#556B2F',   // DarkOliveGreen
]

const lightColors = [
  '#4A90E2',  // Medium Blue
  '#50E3C2',  // Medium Aqua
  '#F5A623',  // Medium Orange
  '#B3B3B3',  // Medium Gray
  '#F2F2F2',  // Light Gray
  '#FF6F61',  // Coral
  '#50B4E0',  // Light Blue
  '#D9E8E0',  // Light Mint
  '#F8E71C',  // Lemon Yellow
  '#7ED321',  // Bright Green
  '#C5C6D0',  // Soft Gray
  '#A9A9A9',  // Dark Gray
  '#FFB100',  // Gold
  '#E3E3E3',  // Very Light Gray
  '#9B59B6',  // Medium Purple
  '#34495E',  // Dark Blue Gray
];

const atoz = "abcdefghijklmnopqrstuvwxyz";

export const IconsData = [
  { name: 'Nvq', color: '#717F84' },
  { name: 'Functional skills', color: '#904887' },
  { name: 'Err', color: '#1D9EB4' },
  { name: 'Technical Certificate', color: '#2FA286' },
  { name: 'Plts', color: '#D06984' },
  { name: 'Svq', color: '#C5975B' },
  { name: 'Vcq', color: '#D0AB3F' },
  { name: 'Vrq', color: '#816855' },
  { name: 'Core Skill', color: '#34D55B' },
  { name: 'Btec National', color: '#5787E0' },
  { name: 'Key Skill', color: '#DA8530' },
  { name: 'Gateway', color: '#335F33' }
];

export const getRandomColor = (latter) => {
  const color = darkColors[atoz.indexOf(latter)]
  return color;
};

export const getLightRandomColor = (latter) => {
  const lightColor = lightColors[atoz.indexOf(latter)]
  return lightColor;
};

export const SocketDomain = {
  Notification: "notification",
  Message: "message",
  CourseAllocation: "Course Allocation",
  MessageSend: "Message Send",
  MessageUpdate: "Message Update",
  MessageDelete: "Message Delete",
  InnovationChat: "Innovation Chat"
}

export const RoleShortForm = {
  Learner: 'Learner',
  Trainer: "AS",
  Employer: "EM",
  IQA: 'IQA',
  LIQA: 'LIQA',
  EQA: 'EQA',
  Admin: 'MA'
}