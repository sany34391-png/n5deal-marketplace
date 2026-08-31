import type {
  Asset,
  BuyerProfile,
  Message,
  User,
} from "@/types/marketplace";

export const users: User[] = [
  {
    id: "user-1",
    name: "Alexander Borodin",
    email: "alex.borodin@example.com",
    role: "buyer",
    status: "active",
  },
  {
    id: "user-2",
    name: "Emma Wilson",
    email: "emma.wilson@example.com",
    role: "buyer",
    status: "active",
  },
  {
    id: "user-3",
    name: "Daniel Carter",
    email: "daniel.carter@example.com",
    role: "seller",
    status: "active",
  },
  {
    id: "user-4",
    name: "Sophia Brown",
    email: "sophia.brown@example.com",
    role: "seller",
    status: "active",
  },
  {
    id: "user-5",
    name: "Michael Johnson",
    email: "michael.johnson@example.com",
    role: "seller",
    status: "active",
  },
  {
    id: "user-6",
    name: "N5Deal Manager",
    email: "manager@n5deal.com",
    role: "manager",
    status: "active",
  },
];
export const buyerProfiles: BuyerProfile[] = [
  {
    userId: "user-1",
    companyName: "Morgan Capital",
    minInvestment: 1000000,
    maxInvestment: 10000000,
    industries: ["SaaS", "Fintech", "Technology"],
    regions: ["Europe", "North America"],
    description:
      "Investment company focused on acquiring profitable technology businesses.",
  },
  {
    userId: "user-2",
    companyName: "Wilson Holdings",
    minInvestment: 500000,
    maxInvestment: 5000000,
    industries: ["Healthcare", "Technology"],
    regions: ["Europe"],
    description:
      "Private investment group looking for established companies with growth potential.",
  },
];
export const assets: Asset[] = [
  {
    id: "asset-1",
    sellerId: "user-3",
    title: "B2B SaaS Analytics Platform",
    description:
      "Established B2B analytics platform with recurring revenue and a growing international customer base.",
    industry: "SaaS",
    location: "Germany",
    price: 2400000,
    revenue: 1100000,
    ebitda: 320000,
    status: "active",
  },
  {
    id: "asset-2",
    sellerId: "user-3",
    title: "Fintech Payment Platform",
    description:
      "European fintech platform providing payment infrastructure for small and medium businesses.",
    industry: "Fintech",
    location: "United Kingdom",
    price: 4800000,
    revenue: 2100000,
    ebitda: 650000,
    status: "active",
  },
  {
    id: "asset-3",
    sellerId: "user-4",
    title: "Healthcare Software Company",
    description:
      "Healthcare software provider serving clinics and private medical organizations.",
    industry: "Healthcare",
    location: "Poland",
    price: 1800000,
    revenue: 900000,
    ebitda: 280000,
    status: "active",
  },
  {
    id: "asset-4",
    sellerId: "user-4",
    title: "E-commerce Business",
    description:
      "Established online retail business with strong brand recognition and international customers.",
    industry: "E-commerce",
    location: "France",
    price: 3200000,
    revenue: 1900000,
    ebitda: 410000,
    status: "active",
  },
  {
    id: "asset-5",
    sellerId: "user-5",
    title: "Logistics Technology Company",
    description:
      "Technology company developing software solutions for logistics and transportation businesses.",
    industry: "Logistics",
    location: "Netherlands",
    price: 6200000,
    revenue: 3400000,
    ebitda: 920000,
    status: "active",
  },
  {
    id: "asset-6",
    sellerId: "user-5",
    title: "Cybersecurity SaaS",
    description:
      "Growing cybersecurity SaaS business with recurring B2B subscriptions.",
    industry: "Cybersecurity",
    location: "Estonia",
    price: 3500000,
    revenue: 1600000,
    ebitda: 470000,
    status: "active",
  },
];
export const messages: Message[] = [
  {
    id: "message-1",
    senderId: "user-1",
    receiverId: "user-3",
    assetId: "asset-1",
    content:
      "Hello, I am interested in learning more about this opportunity.",
    createdAt: "2026-08-30T10:30:00Z",
  },
];