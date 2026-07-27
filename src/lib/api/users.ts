// src/lib/api/users.ts
import { supabase } from "@/lib/supabaseClient";
import { mapUser, mapUserToInsert } from "@/lib/adapters";
import { User } from "@/types";
import { Database } from "@/types/database";

type UserUpdate = Database["public"]["Tables"]["users"]["Update"];

// ============================================
// Busca todos os usuários
// ============================================
export async function getUsers(): Promise<User[]> {
  const { data, error } = await supabase.from("users").select("*");

  if (error) {
    console.error("Erro ao buscar usuários:", error);
    throw error;
  }

  return data.map(mapUser);
}

// ============================================
// Busca um usuário específico pelo id
// ============================================
export async function getUserById(id: string): Promise<User | null> {
  const { data, error } = await supabase
    .from("users")
    .select("*")
    .eq("id", id)
    .single();

  if (error) {
    console.error("Erro ao buscar usuário:", error);
    return null;
  }

  return mapUser(data);
}

// ============================================
// Cria o perfil de um usuário (após signUp no Auth)
// ============================================
export async function createUser(
  user: Omit<User, "connections" | "online"> & { id: string }
): Promise<User> {
  const insertData = mapUserToInsert(user);

  const { data, error } = await supabase
    .from("users")
    .insert(insertData)
    .select()
    .single();

  if (error) {
    console.error("Erro ao criar usuário:", error);
    throw error;
  }

  return mapUser(data);
}

// ============================================
// Atualiza campos do próprio perfil
// ============================================
export async function updateUser(
  id: string,
  updates: Partial<User>
): Promise<User> {
  const updateData: UserUpdate = {};

  if (updates.name !== undefined) updateData.name = updates.name;
  if (updates.headline !== undefined) updateData.headline = updates.headline;
  if (updates.avatar !== undefined) updateData.avatar = updates.avatar;
  if (updates.company !== undefined) updateData.company = updates.company;
  if (updates.location !== undefined) updateData.location = updates.location;
  if (updates.about !== undefined) updateData.about = updates.about;
  if (updates.skills !== undefined) updateData.skills = updates.skills;
  if (updates.education !== undefined) updateData.education = updates.education;
  if (updates.experience !== undefined) updateData.experience = updates.experience;
  if (updates.certifications !== undefined) updateData.certifications = updates.certifications;
  if (updates.languages !== undefined) updateData.languages = updates.languages;
  if (updates.linkedin !== undefined) updateData.linkedin = updates.linkedin;
  if (updates.desiredPosition !== undefined) updateData.desired_position = updates.desiredPosition;
  if (updates.salaryExpectation !== undefined) updateData.salary_expectation = updates.salaryExpectation;
  if (updates.birthDate !== undefined) updateData.birth_date = updates.birthDate;
  if (updates.maritalStatus !== undefined) updateData.marital_status = updates.maritalStatus;
  if (updates.portfolio !== undefined) updateData.portfolio = updates.portfolio;
  if (updates.github !== undefined) updateData.github = updates.github;
  if (updates.courses !== undefined) updateData.courses = updates.courses;
  if (updates.achievements !== undefined) updateData.achievements = updates.achievements;
  if (updates.phone !== undefined) updateData.phone = updates.phone;
  if (updates.whatsapp !== undefined) updateData.whatsapp = updates.whatsapp;

  const { data, error } = await supabase
    .from("users")
    .update(updateData)
    .eq("id", id)
    .select()
    .single();

  if (error) {
    console.error("Erro ao atualizar usuário:", error);
    throw error;
  }

  return mapUser(data);
}