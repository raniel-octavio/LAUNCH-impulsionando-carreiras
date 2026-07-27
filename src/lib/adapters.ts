// src/lib/adapters.ts
import { Database } from "@/types/database";
import { User, Post, Job, Message, Conversation, UserRole, PublicUser } from "@/types";

type DbUser = Database["public"]["Tables"]["users"]["Row"];
type DbPost = Database["public"]["Tables"]["posts"]["Row"];
type DbJob = Database["public"]["Tables"]["jobs"]["Row"];
type DbMessage = Database["public"]["Tables"]["messages"]["Row"];
type DbConversation = Database["public"]["Tables"]["conversations"]["Row"];
type DbPublicUser = Database["public"]["Views"]["user_public_profiles"]["Row"];

export function mapPublicUser(db: DbPublicUser): PublicUser {
  return {
    id: db.id ?? "",
    name: db.name ?? "",
    headline: db.headline ?? "",
    avatar: db.avatar ?? "",
    role: (db.role ?? "candidato") as UserRole,
    company: db.company ?? undefined,
    location: db.location ?? "",
    connections: db.connections ?? 0,
    about: db.about ?? "",
    skills: db.skills ?? [],
    education: db.education ?? undefined,
    experience: db.experience ?? undefined,
    certifications: db.certifications ?? undefined,
    languages: db.languages ?? undefined,
    linkedin: db.linkedin ?? undefined,
    desiredPosition: db.desired_position ?? undefined,
    portfolio: db.portfolio ?? undefined,
    github: db.github ?? undefined,
    courses: db.courses ?? undefined,
    achievements: db.achievements ?? undefined,
    online: db.online ?? false,
  };
}
// ============================================
// USER
// ============================================
export function mapUser(db: DbUser): User {
  return {
    id: db.id,
    name: db.name,
    headline: db.headline ?? "",
    avatar: db.avatar ?? "",
    role: db.role as UserRole,
    company: db.company ?? undefined,
    location: db.location ?? "",
    connections: db.connections ?? 0,
    about: db.about ?? "",
    skills: db.skills ?? [],
    education: db.education ?? undefined,
    experience: db.experience ?? undefined,
    certifications: db.certifications ?? undefined,
    languages: db.languages ?? undefined,
    linkedin: db.linkedin ?? undefined,
    desiredPosition: db.desired_position ?? undefined,
    salaryExpectation: db.salary_expectation ?? undefined,
    birthDate: db.birth_date ?? undefined,
    maritalStatus: db.marital_status ?? undefined,
    portfolio: db.portfolio ?? undefined,
    github: db.github ?? undefined,
    courses: db.courses ?? undefined,
    achievements: db.achievements ?? undefined,
    online: db.online ?? false,
    email: db.email,
    phone: db.phone ?? "",
    whatsapp: db.whatsapp ?? undefined,
  };
}

// Direção inversa: do formato do app pro formato de insert do banco
export function mapUserToInsert(
  user: Omit<User, "connections" | "online"> & { id: string }
): Database["public"]["Tables"]["users"]["Insert"] {
  return {
    id: user.id,
    name: user.name,
    headline: user.headline,
    avatar: user.avatar,
    role: user.role,
    company: user.company ?? null,
    location: user.location,
    about: user.about,
    skills: user.skills,
    education: user.education ?? null,
    experience: user.experience ?? null,
    certifications: user.certifications ?? null,
    languages: user.languages ?? null,
    linkedin: user.linkedin ?? null,
    desired_position: user.desiredPosition ?? null,
    salary_expectation: user.salaryExpectation ?? null,
    birth_date: user.birthDate ?? null,
    marital_status: user.maritalStatus ?? null,
    portfolio: user.portfolio ?? null,
    github: user.github ?? null,
    courses: user.courses ?? null,
    achievements: user.achievements ?? null,
    email: user.email,
    phone: user.phone,
    whatsapp: user.whatsapp ?? null,
  };
}

// ============================================
// POST
// ============================================
export function mapPost(db: DbPost): Post {
  return {
    id: db.id,
    authorId: db.author_id ?? "",
    content: db.content,
    image: db.image ?? undefined,
    likes: db.likes ?? 0,
    comments: db.comments ?? 0,
    shares: db.shares ?? 0,
    createdAt: db.created_at ?? "",
    category: (db.category ?? "artigo") as Post["category"],
  };
}

export function mapPostToInsert(
  post: Omit<Post, "id" | "likes" | "comments" | "shares" | "createdAt">
): Database["public"]["Tables"]["posts"]["Insert"] {
  return {
    author_id: post.authorId,
    content: post.content,
    image: post.image ?? null,
    category: post.category,
  };
}

// ============================================
// JOB
// ============================================
export function mapJob(db: DbJob): Job {
  return {
    id: db.id,
    title: db.title,
    company: db.company,
    location: db.location ?? "",
    type: (db.type ?? "CLT") as Job["type"],
    modality: (db.modality ?? "Presencial") as Job["modality"],
    salary: db.salary ?? undefined,
    description: db.description ?? "",
    requirements: db.requirements ?? [],
    benefits: db.benefits ?? [],
    postedBy: db.posted_by ?? "",
    postedAt: db.posted_at ?? "",
    applicants: db.applicants ?? 0,
  };
}

export function mapJobToInsert(
  job: Omit<Job, "id" | "postedAt" | "applicants">
): Database["public"]["Tables"]["jobs"]["Insert"] {
  return {
    title: job.title,
    company: job.company,
    location: job.location,
    type: job.type,
    modality: job.modality,
    salary: job.salary ?? null,
    description: job.description,
    requirements: job.requirements,
    benefits: job.benefits,
    posted_by: job.postedBy,
  };
}

// ============================================
// MESSAGE
// ============================================
export function mapMessage(db: DbMessage): Message {
  return {
    id: db.id,
    senderId: db.sender_id ?? "",
    content: db.content,
    timestamp: db.created_at ?? "",
    read: db.read ?? false,
  };
}

// ============================================
// CONVERSATION (composta: junta 3 tabelas)
// ============================================
export function mapConversation(
  db: DbConversation,
  participantIds: string[],
  dbMessages: DbMessage[]
): Conversation {
  return {
    id: db.id,
    participantIds,
    messages: dbMessages.map(mapMessage),
    lastMessageAt: db.last_message_at ?? "",
  };
}