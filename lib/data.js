// ============================================================
// CAIRO BOX CRICKET — DEMO DATA FILE
// All data is hardcoded for frontend-only demo purposes
// ============================================================

export const businessInfo = {
  name: "Cairo Box Cricket",
  tagline: "Hyderabad's Premium Box Cricket Arena",
  address: "Raghavendra Nagar Colony, Surya Nagar, Saraswathi Colony, Uppal, Hyderabad, Telangana 500039",
  phone: "08019137997",
  phoneDisplay: "080191 37997",
  rating: 3.9,
  totalReviews: 326,
  hours: "Open 24 Hours",
  plusCode: "9HQ6+GW Uppal",
  whatsapp: "918019137997",
  instagram: "https://instagram.com/cairoboxcricket",
  mapsEmbed: "https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3806.123!2d78.5595!3d17.4065!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x0%3A0x0!2zMTfCsDI0JzIzLjQiTiA3OMKwMzMnMzQuMiJF!5e0!3m2!1sen!2sin!4v1234567890",
};

// ============================================================
// PRICING TIERS
// ============================================================
export const pricingTiers = [
  {
    id: "weekday-day",
    name: "Weekday Day",
    price: 800,
    hours: "6 AM – 6 PM (Mon–Fri)",
    features: ["Full pitch access", "Basic lighting", "Changing room"],
    popular: false,
    icon: "sun",
    color: "blue",
  },
  {
    id: "weekend-day",
    name: "Weekend Day",
    price: 1200,
    hours: "6 AM – 6 PM (Sat–Sun)",
    features: ["Full pitch access", "Basic lighting", "Changing room", "Scoreboard"],
    popular: false,
    icon: "calendar",
    color: "green",
  },
  {
    id: "night-floodlit",
    name: "Night Floodlights",
    price: 1500,
    hours: "6 PM – 4 AM (Daily)",
    features: ["Full pitch access", "Premium floodlights", "Changing room", "Scoreboard", "Refreshment area"],
    popular: true,
    icon: "zap",
    color: "yellow",
  },
];

// ============================================================
// SLOT PRICING BY HOUR
// ============================================================
export function getSlotPrice(hour) {
  if (hour >= 5 && hour < 8) return 600;    // early morning
  if (hour >= 8 && hour < 12) return 800;   // morning
  if (hour >= 12 && hour < 16) return 800;  // afternoon
  if (hour >= 16 && hour < 18) return 1000; // evening start
  if (hour >= 18 && hour < 22) return 1200; // peak evening
  return 1500;                               // night floodlights
}

export function getSlotLabel(hour) {
  if (hour >= 18 || hour < 5) return "NIGHT";
  if (hour >= 16) return "PEAK";
  if (hour >= 8) return "DAY";
  return "EARLY";
}

export function isSlotPeak(hour) {
  return (hour >= 18 && hour <= 21);
}

// ============================================================
// GENERATE SLOTS FOR NEXT 7 DAYS
// ============================================================
function generateRandomBookedSlots() {
  // Pre-booked slots per day (hour indices that are booked)
  const bookedPatterns = [
    [7, 9, 12, 18, 19, 20],
    [6, 10, 14, 17, 19, 21],
    [8, 11, 15, 18, 20, 22],
    [7, 13, 16, 18, 19, 23],
    [9, 12, 17, 18, 20, 1],
    [6, 8, 14, 19, 21, 0],
    [10, 15, 17, 18, 19, 22],
  ];
  return bookedPatterns;
}

export function generateSlots(dayIndex) {
  const patterns = generateRandomBookedSlots();
  const bookedHours = patterns[dayIndex % 7];
  const slots = [];

  for (let h = 5; h < 29; h++) {
    const hour = h % 24;
    const displayHour = hour === 0 ? 12 : hour > 12 ? hour - 12 : hour;
    const ampm = hour < 12 ? "AM" : "PM";
    const endHour = (hour + 1) % 24;
    const endDisplayHour = endHour === 0 ? 12 : endHour > 12 ? endHour - 12 : endHour;
    const endAmpm = endHour < 12 ? "AM" : "PM";

    const isBooked = bookedHours.includes(hour);
    const label = getSlotLabel(hour);
    const isPeak = isSlotPeak(hour);

    slots.push({
      id: `slot-${dayIndex}-${hour}`,
      hour,
      timeLabel: `${displayHour}:00 ${ampm} – ${endDisplayHour}:00 ${endAmpm}`,
      timeStart: `${String(hour).padStart(2, "0")}:00`,
      price: getSlotPrice(hour),
      status: isBooked ? "booked" : "available",
      label,
      isPeak,
      viewers: isPeak && !isBooked ? Math.floor(Math.random() * 4) + 1 : 0,
    });
  }
  return slots;
}

export function getDates() {
  const dates = [];
  const days = ["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"];
  const months = ["Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul", "Aug", "Sep", "Oct", "Nov", "Dec"];

  for (let i = 0; i < 7; i++) {
    const d = new Date();
    d.setDate(d.getDate() + i);
    dates.push({
      index: i,
      day: days[d.getDay()],
      date: d.getDate(),
      month: months[d.getMonth()],
      fullDate: d.toLocaleDateString("en-IN", { weekday: "long", year: "numeric", month: "long", day: "numeric" }),
      shortDate: `${d.getDate()} ${months[d.getMonth()]}`,
      isToday: i === 0,
    });
  }
  return dates;
}

// ============================================================
// EQUIPMENT ADD-ONS
// ============================================================
export const equipmentAddOns = [
  { id: "bat", name: "Bat Rental", price: 100, icon: "bat" },
  { id: "ball", name: "Cricket Ball", price: 50, icon: "circle" },
  { id: "gloves", name: "Wicket-keeping Gloves", price: 80, icon: "hand" },
  { id: "drinks", name: "Energy Drinks Pack (x4)", price: 150, icon: "zap" },
];

// ============================================================
// TESTIMONIALS
// ============================================================
export const testimonials = [
  {
    id: 1,
    name: "Rohit K.",
    location: "Uppal",
    rating: 5,
    text: "Absolutely amazing facility! The floodlights make night matches feel like an IPL stadium. Booked in 30 seconds on the app — no hassle whatsoever.",
    date: "2 days ago",
    avatar: "RK",
  },
  {
    id: 2,
    name: "Sai Krishna",
    location: "Hyderabad",
    rating: 5,
    text: "Best box cricket ground in Uppal hands down. Premium turf, clean facilities, and the staff is super helpful. Our office team comes here every weekend!",
    date: "1 week ago",
    avatar: "SK",
  },
  {
    id: 3,
    name: "Arjun M.",
    location: "Secunderabad",
    rating: 4,
    text: "Great experience overall. The 24/7 availability is a game changer — we played a midnight match last Saturday and it was epic. Highly recommend.",
    date: "2 weeks ago",
    avatar: "AM",
  },
  {
    id: 4,
    name: "Priya Reddy",
    location: "LB Nagar",
    rating: 5,
    text: "Booked for my brother's birthday and everyone loved it! Cairo Premier League registrations are open — our team is definitely signing up this season.",
    date: "3 weeks ago",
    avatar: "PR",
  },
  {
    id: 5,
    name: "Vikram S.",
    location: "Uppal",
    rating: 5,
    text: "The turf quality is top-notch. Have tried many grounds in Hyderabad but Cairo is on a different level. Will definitely be back next weekend!",
    date: "1 month ago",
    avatar: "VS",
  },
];

// ============================================================
// GALLERY IMAGES (Unsplash)
// ============================================================
export const galleryImages = [
  {
    id: 1,
    url: "https://images.unsplash.com/photo-1540747913346-19e32dc3e97e?w=800&q=80",
    thumb: "https://images.unsplash.com/photo-1540747913346-19e32dc3e97e?w=400&q=70",
    category: "tournaments",
    caption: "Cairo Premier League Season 2 Finals",
    width: 800,
    height: 600,
  },
  {
    id: 2,
    url: "https://images.unsplash.com/photo-1624880357913-a8539238245b?w=800&q=80",
    thumb: "https://images.unsplash.com/photo-1624880357913-a8539238245b?w=400&q=70",
    category: "night",
    caption: "Friday Night Floodlit Match",
    width: 800,
    height: 533,
  },
  {
    id: 3,
    url: "https://images.unsplash.com/photo-1593341646782-e0b495cff86d?w=800&q=80",
    thumb: "https://images.unsplash.com/photo-1593341646782-e0b495cff86d?w=400&q=70",
    category: "ground",
    caption: "The Premium Turf — Drone View",
    width: 800,
    height: 534,
  },
  {
    id: 4,
    url: "https://images.unsplash.com/photo-1531415074968-036ba1b575da?w=800&q=80",
    thumb: "https://images.unsplash.com/photo-1531415074968-036ba1b575da?w=400&q=70",
    category: "day",
    caption: "Morning Match Action",
    width: 800,
    height: 534,
  },
  {
    id: 5,
    url: "https://images.unsplash.com/photo-1565726166189-afbc02da1248?w=800&q=80",
    thumb: "https://images.unsplash.com/photo-1565726166189-afbc02da1248?w=400&q=70",
    category: "night",
    caption: "Floodlights at Full Power",
    width: 800,
    height: 533,
  },
  {
    id: 6,
    url: "https://images.unsplash.com/photo-1578432014316-48b448d79d57?w=800&q=80",
    thumb: "https://images.unsplash.com/photo-1578432014316-48b448d79d57?w=400&q=70",
    category: "tournaments",
    caption: "Season 2 Trophy Ceremony",
    width: 800,
    height: 534,
  },
  {
    id: 7,
    url: "https://images.unsplash.com/photo-1571019613454-1cb2f99b2d8b?w=800&q=80",
    thumb: "https://images.unsplash.com/photo-1571019613454-1cb2f99b2d8b?w=400&q=70",
    category: "day",
    caption: "Weekend Warriors League",
    width: 800,
    height: 534,
  },
  {
    id: 8,
    url: "https://images.unsplash.com/photo-1558618666-fcd25c85cd64?w=800&q=80",
    thumb: "https://images.unsplash.com/photo-1558618666-fcd25c85cd64?w=400&q=70",
    category: "ground",
    caption: "Premium Synthetic Turf Detail",
    width: 800,
    height: 534,
  },
  {
    id: 9,
    url: "https://images.unsplash.com/photo-1568702846914-96b305d2aaeb?w=800&q=80",
    thumb: "https://images.unsplash.com/photo-1568702846914-96b305d2aaeb?w=400&q=70",
    category: "day",
    caption: "Office Tournament — Axis Bank vs HDFC",
    width: 800,
    height: 534,
  },
  {
    id: 10,
    url: "https://images.unsplash.com/photo-1504639725590-34d0984388bd?w=800&q=80",
    thumb: "https://images.unsplash.com/photo-1504639725590-34d0984388bd?w=400&q=70",
    category: "night",
    caption: "Midnight Match — Team Raptors vs Falcons",
    width: 800,
    height: 534,
  },
  {
    id: 11,
    url: "https://images.unsplash.com/photo-1518563172008-e56c5dfbaef6?w=800&q=80",
    thumb: "https://images.unsplash.com/photo-1518563172008-e56c5dfbaef6?w=400&q=70",
    category: "tournaments",
    caption: "Cairo Premier League Season 3 Begins",
    width: 800,
    height: 534,
  },
  {
    id: 12,
    url: "https://images.unsplash.com/photo-1591487734521-39caba7fde66?w=800&q=80",
    thumb: "https://images.unsplash.com/photo-1591487734521-39caba7fde66?w=400&q=70",
    category: "ground",
    caption: "Ground Preparation — Match Day Morning",
    width: 800,
    height: 534,
  },
  {
    id: 13,
    url: "https://images.unsplash.com/photo-1606107557195-0e29a4b5b4aa?w=800&q=80",
    thumb: "https://images.unsplash.com/photo-1606107557195-0e29a4b5b4aa?w=400&q=70",
    category: "day",
    caption: "Corporate Cup Quarterfinals",
    width: 800,
    height: 534,
  },
  {
    id: 14,
    url: "https://images.unsplash.com/photo-1617196034183-421b4040ed20?w=800&q=80",
    thumb: "https://images.unsplash.com/photo-1617196034183-421b4040ed20?w=400&q=70",
    category: "night",
    caption: "Diwali Night Special Match",
    width: 800,
    height: 534,
  },
  {
    id: 15,
    url: "https://images.unsplash.com/photo-1555041469-a586c61ea9bc?w=800&q=80",
    thumb: "https://images.unsplash.com/photo-1555041469-a586c61ea9bc?w=400&q=70",
    category: "ground",
    caption: "Facility Overview — State of the Art",
    width: 800,
    height: 534,
  },
];

// ============================================================
// TOURNAMENTS
// ============================================================
export const tournaments = [
  {
    id: "cpl-s3",
    name: "Cairo Premier League",
    season: "Season 3",
    status: "registration_open",
    startDate: "2025-06-01",
    endDate: "2025-06-30",
    registrationDeadline: "2025-05-25",
    prizePool: {
      winner: 25000,
      runnerUp: 10000,
      mvp: 5000,
      total: 40000,
    },
    maxTeams: 16,
    registeredTeams: 11,
    entryFee: 2000,
    format: "T10",
    description: "The biggest box cricket tournament in Uppal is back! Cairo Premier League Season 3 promises fierce competition, electric atmosphere, and massive prizes. Register your team now before spots run out.",
    image: "https://images.unsplash.com/photo-1540747913346-19e32dc3e97e?w=800&q=80",
  },
];

export const pastTournaments = [
  {
    id: "cpl-s2",
    name: "Cairo Premier League Season 2",
    date: "December 2024",
    winner: "Uppal Strikers",
    runnerUp: "Hyderabad Hawks",
    mvp: "Rohit K.",
    totalTeams: 16,
    image: "https://images.unsplash.com/photo-1578432014316-48b448d79d57?w=800&q=80",
  },
  {
    id: "corporate-cup",
    name: "Corporate Cup 2024",
    date: "October 2024",
    winner: "TCS Warriors",
    runnerUp: "Infosys Tigers",
    mvp: "Sai Krishna",
    totalTeams: 8,
    image: "https://images.unsplash.com/photo-1606107557195-0e29a4b5b4aa?w=800&q=80",
  },
  {
    id: "diwali-cup",
    name: "Diwali Night Cup 2024",
    date: "November 2024",
    winner: "Raptors XI",
    runnerUp: "Night Owls",
    mvp: "Arjun M.",
    totalTeams: 8,
    image: "https://images.unsplash.com/photo-1617196034183-421b4040ed20?w=800&q=80",
  },
];

export const tournamentBracket = {
  rounds: [
    {
      name: "Round of 16",
      matches: [
        { id: "m1", team1: "Uppal Strikers", team2: "Falcon XI", score1: 87, score2: 62, completed: true, winner: "Uppal Strikers" },
        { id: "m2", team1: "Hyderabad Hawks", team2: "Royal Smashers", score1: 103, score2: 78, completed: true, winner: "Hyderabad Hawks" },
        { id: "m3", team1: "Raptors XI", team2: "Night Owls", score1: 91, score2: 88, completed: true, winner: "Raptors XI" },
        { id: "m4", team1: "Thunder Bolts", team2: "Metro Warriors", score1: 0, score2: 0, completed: false, winner: null },
        { id: "m5", team1: "Green Giants", team2: "Red Devils", score1: 0, score2: 0, completed: false, winner: null },
        { id: "m6", team1: "Blue Sharks", team2: "City Lions", score1: 0, score2: 0, completed: false, winner: null },
        { id: "m7", team1: "TCS Warriors", team2: "Infosys Tigers", score1: 0, score2: 0, completed: false, winner: null },
        { id: "m8", team1: "Desert Kings", team2: "Rock Riders", score1: 0, score2: 0, completed: false, winner: null },
      ],
    },
    {
      name: "Quarter Finals",
      matches: [
        { id: "qf1", team1: "Uppal Strikers", team2: "Hyderabad Hawks", score1: 0, score2: 0, completed: false, winner: null },
        { id: "qf2", team1: "Raptors XI", team2: "TBD", score1: 0, score2: 0, completed: false, winner: null },
        { id: "qf3", team1: "TBD", team2: "TBD", score1: 0, score2: 0, completed: false, winner: null },
        { id: "qf4", team1: "TBD", team2: "TBD", score1: 0, score2: 0, completed: false, winner: null },
      ],
    },
    {
      name: "Semi Finals",
      matches: [
        { id: "sf1", team1: "TBD", team2: "TBD", score1: 0, score2: 0, completed: false, winner: null },
        { id: "sf2", team1: "TBD", team2: "TBD", score1: 0, score2: 0, completed: false, winner: null },
      ],
    },
    {
      name: "Final",
      matches: [
        { id: "final", team1: "TBD", team2: "TBD", score1: 0, score2: 0, completed: false, winner: null },
      ],
    },
  ],
};

// ============================================================
// ADMIN DASHBOARD DATA
// ============================================================
const generateRevenueData = () => {
  const data = [];
  const today = new Date();
  for (let i = 29; i >= 0; i--) {
    const d = new Date(today);
    d.setDate(d.getDate() - i);
    const dayOfWeek = d.getDay();
    const isWeekend = dayOfWeek === 0 || dayOfWeek === 6;
    const base = isWeekend ? 18000 : 12000;
    const variance = Math.floor(Math.random() * 6000) - 2000;
    data.push({
      date: `${d.getDate()}/${d.getMonth() + 1}`,
      revenue: base + variance,
      bookings: Math.floor((base + variance) / 1100),
    });
  }
  return data;
};

const generatePeakHoursMatrix = () => {
  const hours = Array.from({ length: 24 }, (_, i) => i);
  const days = ["Mon", "Tue", "Wed", "Thu", "Fri", "Sat", "Sun"];
  const matrix = {};

  days.forEach((day) => {
    matrix[day] = {};
    hours.forEach((h) => {
      const isWeekend = day === "Sat" || day === "Sun";
      const isPeakEvening = h >= 18 && h <= 21;
      const isMorning = h >= 7 && h <= 10;
      let base = 10;
      if (isPeakEvening) base = isWeekend ? 95 : 80;
      else if (isMorning) base = isWeekend ? 60 : 40;
      else if (h >= 11 && h <= 14) base = isWeekend ? 70 : 50;
      else if (h >= 22 || h < 5) base = 20;
      matrix[day][h] = Math.min(100, base + Math.floor(Math.random() * 15));
    });
  });
  return matrix;
};

export const adminStats = {
  todayRevenue: 14400,
  todayRevenueTrend: 12,
  weekRevenue: 89200,
  weekRevenueTrend: 8,
  totalCustomers: 1247,
  customersTrend: 23,
  slotsBookedToday: 12,
  totalSlotsToday: 24,
  slotsTrend: 4,
  revenueData: generateRevenueData(),
  peakHoursMatrix: generatePeakHoursMatrix(),
  todayBookings: [
    { id: "CBC2024001", customer: "Rohit Kumar", phone: "9876543210", slot: "7:00 AM – 8:00 AM", amount: 800, status: "paid", addOns: ["Bat", "Ball"], checkIn: "checked_in" },
    { id: "CBC2024002", customer: "Sai Krishna Reddy", phone: "9123456789", slot: "9:00 AM – 10:00 AM", amount: 950, status: "paid", addOns: ["Ball"], checkIn: "checked_in" },
    { id: "CBC2024003", customer: "Arjun Mehta", phone: "9988776655", slot: "12:00 PM – 1:00 PM", amount: 800, status: "paid", addOns: [], checkIn: "not_arrived" },
    { id: "CBC2024004", customer: "Priya Sharma", phone: "9845123456", slot: "6:00 PM – 7:00 PM", amount: 1350, status: "paid", addOns: ["Drinks Pack"], checkIn: "not_arrived" },
    { id: "CBC2024005", customer: "Vikram Singh", phone: "9701234567", slot: "7:00 PM – 8:00 PM", amount: 1200, status: "pending", addOns: ["Bat", "Gloves"], checkIn: "not_arrived" },
    { id: "CBC2024006", customer: "Karan Patel", phone: "9876012345", slot: "8:00 PM – 9:00 PM", amount: 1500, status: "paid", addOns: ["Drinks Pack", "Ball"], checkIn: "not_arrived" },
    { id: "CBC2024007", customer: "Ravi Teja", phone: "8801234567", slot: "9:00 PM – 10:00 PM", amount: 1500, status: "paid", addOns: [], checkIn: "not_arrived" },
    { id: "CBC2024008", customer: "Akhil Reddy", phone: "9966554433", slot: "10:00 PM – 11:00 PM", amount: 1650, status: "pending", addOns: ["Bat", "Ball"], checkIn: "not_arrived" },
  ],
  recentReviews: [
    { name: "Rohit K.", rating: 5, text: "Best box cricket ground in Hyderabad!", date: "2 days ago" },
    { name: "Sai Krishna", rating: 5, text: "Amazing facility, top-class turf. Will be back!", date: "3 days ago" },
    { name: "Arjun M.", rating: 4, text: "Great experience. Night matches under floodlights are epic.", date: "5 days ago" },
    { name: "Priya R.", rating: 5, text: "Booked for our office team — everyone loved it!", date: "1 week ago" },
    { name: "Karan P.", rating: 4, text: "Smooth booking process. Love the new app interface.", date: "1 week ago" },
  ],
};

// ============================================================
// FAKE BOOKING NOTIFICATIONS (for "Just Booked" toast)
// ============================================================
export const fakeBookingNotifications = [
  { name: "Rahul", slot: "8 PM", team: "5 players" },
  { name: "Arjun", slot: "9 PM", team: "6 players" },
  { name: "Sai Krishna", slot: "7 PM", team: "8 players" },
  { name: "Vikram", slot: "10 PM", team: "4 players" },
  { name: "Karan", slot: "6 PM", team: "7 players" },
  { name: "Ravi Teja", slot: "11 PM", team: "5 players" },
  { name: "Priya", slot: "8 PM", team: "6 players" },
  { name: "Rohit", slot: "9 PM", team: "8 players" },
];

// ============================================================
// WHY CAIRO FEATURES
// ============================================================
export const whyCairoFeatures = [
  {
    icon: "Zap",
    title: "Premium Turf",
    desc: "FIFA-grade synthetic turf with cushioned underlay — perfect bounce every time.",
    color: "green",
  },
  {
    icon: "Sun",
    title: "Floodlit Nights",
    desc: "600W professional floodlights. Night matches that feel like T20 stadium cricket.",
    color: "yellow",
  },
  {
    icon: "Car",
    title: "Free Parking",
    desc: "Secure, well-lit parking for 30+ vehicles. No parking hassle, ever.",
    color: "blue",
  },
  {
    icon: "Package",
    title: "Equipment Rental",
    desc: "Bats, balls, gloves, pads — everything you need, on-site rental at affordable rates.",
    color: "purple",
  },
];
