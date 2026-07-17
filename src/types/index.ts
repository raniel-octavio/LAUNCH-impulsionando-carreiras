export type UserRole = "candidato" | "recrutador" | "empresa";

export interface User {
  id: string;
  name: string;
  headline: string;
  avatar: string;
  role: UserRole;

  company?: string;
  location: string;
  connections: number;
  about: string;

  skills: string[];

  education?: string;
  experience?: string;

  certifications?: string[];
  languages?: string[];
  linkedin?: string;

  desiredPosition?: string;
  salaryExpectation?: string;

  birthDate?: string;
  maritalStatus?: string;

  portfolio?: string;
  github?: string;

  courses?: string[];
  achievements?: string[];

  online: boolean;
  email: string;
  phone: string;
  whatsapp?: string;
}

export interface Post {
  id: string;
  authorId: string;
  content: string;
  image?: string;
  likes: number;
  comments: number;
  shares: number;
  createdAt: string;
  category: "noticia" | "artigo" | "dica" | "evento";
}

export interface Job {
  id: string;
  title: string;
  company: string;
  location: string;
  type: "CLT" | "PJ" | "Estágio" | "Temporário";
  modality: "Presencial" | "Remoto" | "Híbrido";
  salary?: string;
  description: string;
  requirements: string[];
  benefits: string[];
  postedBy: string;
  postedAt: string;
  applicants: number;
}

export interface Message {
  id: string;
  senderId: string;
  content: string;
  timestamp: string;
  read: boolean;
}

export interface Conversation {
  id: string;
  participantIds: string[];
  messages: Message[];
  lastMessageAt: string;
}
