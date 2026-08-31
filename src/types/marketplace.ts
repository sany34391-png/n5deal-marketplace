export type UserRole = "buyer" | "seller" | "manager";

export type UserStatus = "active" | "suspended";

export type AssetStatus = "active" | "suspended";

export interface User {
  id: string;
  name: string;
  email: string;
  role: UserRole;
  status: UserStatus;
}

export interface BuyerProfile {
  userId: string;
  companyName: string;
  minInvestment: number;
  maxInvestment: number;
  industries: string[];
  regions: string[];
  description: string;
}

export interface Asset {
  id: string;
  sellerId: string;
  title: string;
  description: string;
  industry: string;
  location: string;
  price: number;
  revenue: number;
  ebitda: number;
  status: AssetStatus;
}

export interface Message {
  id: string;
  senderId: string;
  receiverId: string;
  assetId?: string;
  content: string;
  createdAt: string;
}