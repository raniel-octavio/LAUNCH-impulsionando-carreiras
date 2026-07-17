import type { Conversation, Job, Post } from "@/types";
import { seedConversations, seedJobs, seedPosts, users, CURRENT_USER_ID} from "./seed";
import type { User } from "@/types";


interface Store {
  posts: Post[];
  jobs: Job[];
  conversations: Conversation[];
  users: User[];
}

const globalForStore = globalThis as unknown as { alvoStore?: Store };

function getStore(): Store {
  if (!globalForStore.alvoStore) {
    globalForStore.alvoStore = {
      posts: structuredClone(seedPosts),
      jobs: structuredClone(seedJobs),
      conversations: structuredClone(seedConversations),
      users: structuredClone(users),
    };
  }
  return globalForStore.alvoStore;
}

export { CURRENT_USER_ID };


export function getPosts(): Post[] {
  return [...getStore().posts].sort(
    (a, b) => new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime()
  );
}

export function getJobs(filter?: string): Job[] {
  const jobs = [...getStore().jobs].sort(
    (a, b) => new Date(b.postedAt).getTime() - new Date(a.postedAt).getTime()
  );
  if (!filter) return jobs;
  const q = filter.toLowerCase();
  return jobs.filter(
    (j) =>
      j.title.toLowerCase().includes(q) ||
      j.company.toLowerCase().includes(q) ||
      j.location.toLowerCase().includes(q)
  );
}

export function getConversations(): Conversation[] {
  return [...getStore().conversations].sort(
    (a, b) => new Date(b.lastMessageAt).getTime() - new Date(a.lastMessageAt).getTime()
  );
}

export function getConversationById(id: string): Conversation | undefined {
  return getStore().conversations.find((c) => c.id === id);
}

export function getUnreadCount(currentUserId: string): number {
  return getConversations().reduce(
    (acc, c) =>
      acc + c.messages.filter((m) => m.senderId !== currentUserId && !m.read).length,
    0
  );
}

export function addPost(post: Post): void {
  getStore().posts.unshift(post);
}

export function likePostById(postId: string): void {
  const post = getStore().posts.find((p) => p.id === postId);
  if (post) post.likes += 1;
}

export function addJob(job: Job): void {
  getStore().jobs.unshift(job);
}

export function applyToJobById(jobId: string): void {
  const job = getStore().jobs.find((j) => j.id === jobId);
  if (job) job.applicants += 1;
}

export function sendMessageToConversation(
  conversationId: string,
  senderId: string,
  content: string
): void {
  const conv = getStore().conversations.find((c) => c.id === conversationId);
  if (!conv) return;

  const message = {
    id: `msg-${Date.now()}`,
    senderId,
    content,
    timestamp: new Date().toISOString(),
    read: true,
  };

  conv.messages.push(message);
  conv.lastMessageAt = message.timestamp;
}

export function markConversationAsRead(conversationId: string, currentUserId: string): void {
  const conv = getStore().conversations.find((c) => c.id === conversationId);
  if (!conv) return;

  conv.messages.forEach((m) => {
    if (m.senderId !== currentUserId) m.read = true;
  });
}

export function findOrCreateConversation(
  currentUserId: string,
  participantId: string
): string {
  const existing = getStore().conversations.find(
    (c) =>
      c.participantIds.includes(currentUserId) &&
      c.participantIds.includes(participantId)
  );
  if (existing) return existing.id;

  const newConv: Conversation = {
    id: `conv-${Date.now()}`,
    participantIds: [currentUserId, participantId],
    messages: [],
    lastMessageAt: new Date().toISOString(),
  };
  getStore().conversations.unshift(newConv);
  return newConv.id;
}
export function getUsers(): User[] {
  return [...getStore().users];
}