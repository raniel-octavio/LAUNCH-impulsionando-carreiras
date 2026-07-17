"use server";

import { revalidatePath } from "next/cache";
import { redirect } from "next/navigation";
import {
  addJob,
  addPost,
  applyToJobById,
  findOrCreateConversation,
  likePostById,
  sendMessageToConversation,
} from "@/lib/store";
import { CURRENT_USER_ID } from "@/lib/seed";
import type { Job, Post } from "@/types";

export async function createPost(formData: FormData) {
  const content = formData.get("content")?.toString().trim();
  const category = formData.get("category")?.toString() as Post["category"];

  if (!content) return;

  addPost({
    id: `post-${Date.now()}`,
    authorId: CURRENT_USER_ID,
    content,
    likes: 0,
    comments: 0,
    shares: 0,
    createdAt: new Date().toISOString(),
    category: category || "noticia",
  });

  revalidatePath("/");
}

export async function likePost(formData: FormData) {
  const postId = formData.get("postId")?.toString();
  if (!postId) return;
  likePostById(postId);
  revalidatePath("/");
}

export async function createJob(formData: FormData) {
  const title = formData.get("title")?.toString().trim();
  const company = formData.get("company")?.toString().trim();
  const description = formData.get("description")?.toString().trim();

  if (!title || !company || !description) return;

  const job: Job = {
    id: `job-${Date.now()}`,
    title,
    company,
    location: formData.get("location")?.toString().trim() || "",
    type: (formData.get("type")?.toString() as Job["type"]) || "CLT",
    modality: (formData.get("modality")?.toString() as Job["modality"]) || "Híbrido",
    salary: formData.get("salary")?.toString().trim() || undefined,
    description,
    requirements: formData.get("requirements")?.toString().split("\n").filter(Boolean) ?? [],
    benefits: formData.get("benefits")?.toString().split("\n").filter(Boolean) ?? [],
    postedBy: CURRENT_USER_ID,
    postedAt: new Date().toISOString(),
    applicants: 0,
  };

  addJob(job);
  revalidatePath("/");
  revalidatePath("/vagas");
  redirect("/vagas");
}

export async function applyToJob(formData: FormData) {
  const jobId = formData.get("jobId")?.toString();
  if (!jobId) return;
  applyToJobById(jobId);
  revalidatePath("/");
  revalidatePath("/vagas");
}

export async function sendMessage(formData: FormData) {
  const conversationId = formData.get("conversationId")?.toString();
  const content = formData.get("content")?.toString().trim();

  if (!conversationId || !content) return;

  sendMessageToConversation(conversationId, CURRENT_USER_ID, content);
  revalidatePath("/mensagens");
  revalidatePath(`/mensagens/${conversationId}`);
}

export async function openConversation(formData: FormData) {
  const participantId = formData.get("participantId")?.toString();
  if (!participantId) return;

  const convId = findOrCreateConversation(CURRENT_USER_ID, participantId);
  redirect(`/mensagens/${convId}`);
}
