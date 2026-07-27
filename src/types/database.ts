export type Json =
  | string
  | number
  | boolean
  | null
  | { [key: string]: Json | undefined }
  | Json[]

export type Database = {
  // Allows to automatically instantiate createClient with right options
  // instead of createClient<Database, { PostgrestVersion: 'XX' }>(URL, KEY)
  __InternalSupabase: {
    PostgrestVersion: "14.5"
  }
  graphql_public: {
    Tables: {
      [_ in never]: never
    }
    Views: {
      [_ in never]: never
    }
    Functions: {
      graphql: {
        Args: {
          extensions?: Json
          operationName?: string
          query?: string
          variables?: Json
        }
        Returns: Json
      }
    }
    Enums: {
      [_ in never]: never
    }
    CompositeTypes: {
      [_ in never]: never
    }
  }
  public: {
    Tables: {
      conversation_participants: {
        Row: {
          conversation_id: string
          user_id: string
        }
        Insert: {
          conversation_id: string
          user_id: string
        }
        Update: {
          conversation_id?: string
          user_id?: string
        }
        Relationships: [
          {
            foreignKeyName: "conversation_participants_conversation_id_fkey"
            columns: ["conversation_id"]
            isOneToOne: false
            referencedRelation: "conversations"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "conversation_participants_user_id_fkey"
            columns: ["user_id"]
            isOneToOne: false
            referencedRelation: "user_public_profiles"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "conversation_participants_user_id_fkey"
            columns: ["user_id"]
            isOneToOne: false
            referencedRelation: "users"
            referencedColumns: ["id"]
          },
        ]
      }
      conversations: {
        Row: {
          id: string
          last_message_at: string | null
        }
        Insert: {
          id?: string
          last_message_at?: string | null
        }
        Update: {
          id?: string
          last_message_at?: string | null
        }
        Relationships: []
      }
      jobs: {
        Row: {
          applicants: number | null
          benefits: string[] | null
          company: string
          description: string | null
          id: string
          location: string | null
          modality: string | null
          posted_at: string | null
          posted_by: string | null
          requirements: string[] | null
          salary: string | null
          title: string
          type: string | null
        }
        Insert: {
          applicants?: number | null
          benefits?: string[] | null
          company: string
          description?: string | null
          id?: string
          location?: string | null
          modality?: string | null
          posted_at?: string | null
          posted_by?: string | null
          requirements?: string[] | null
          salary?: string | null
          title: string
          type?: string | null
        }
        Update: {
          applicants?: number | null
          benefits?: string[] | null
          company?: string
          description?: string | null
          id?: string
          location?: string | null
          modality?: string | null
          posted_at?: string | null
          posted_by?: string | null
          requirements?: string[] | null
          salary?: string | null
          title?: string
          type?: string | null
        }
        Relationships: [
          {
            foreignKeyName: "jobs_posted_by_fkey"
            columns: ["posted_by"]
            isOneToOne: false
            referencedRelation: "user_public_profiles"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "jobs_posted_by_fkey"
            columns: ["posted_by"]
            isOneToOne: false
            referencedRelation: "users"
            referencedColumns: ["id"]
          },
        ]
      }
      messages: {
        Row: {
          content: string
          conversation_id: string | null
          created_at: string | null
          id: string
          read: boolean | null
          sender_id: string | null
        }
        Insert: {
          content: string
          conversation_id?: string | null
          created_at?: string | null
          id?: string
          read?: boolean | null
          sender_id?: string | null
        }
        Update: {
          content?: string
          conversation_id?: string | null
          created_at?: string | null
          id?: string
          read?: boolean | null
          sender_id?: string | null
        }
        Relationships: [
          {
            foreignKeyName: "messages_conversation_id_fkey"
            columns: ["conversation_id"]
            isOneToOne: false
            referencedRelation: "conversations"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "messages_sender_id_fkey"
            columns: ["sender_id"]
            isOneToOne: false
            referencedRelation: "user_public_profiles"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "messages_sender_id_fkey"
            columns: ["sender_id"]
            isOneToOne: false
            referencedRelation: "users"
            referencedColumns: ["id"]
          },
        ]
      }
      posts: {
        Row: {
          author_id: string | null
          category: string | null
          comments: number | null
          content: string
          created_at: string | null
          id: string
          image: string | null
          likes: number | null
          shares: number | null
        }
        Insert: {
          author_id?: string | null
          category?: string | null
          comments?: number | null
          content: string
          created_at?: string | null
          id?: string
          image?: string | null
          likes?: number | null
          shares?: number | null
        }
        Update: {
          author_id?: string | null
          category?: string | null
          comments?: number | null
          content?: string
          created_at?: string | null
          id?: string
          image?: string | null
          likes?: number | null
          shares?: number | null
        }
        Relationships: [
          {
            foreignKeyName: "posts_author_id_fkey"
            columns: ["author_id"]
            isOneToOne: false
            referencedRelation: "user_public_profiles"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "posts_author_id_fkey"
            columns: ["author_id"]
            isOneToOne: false
            referencedRelation: "users"
            referencedColumns: ["id"]
          },
        ]
      }
      users: {
        Row: {
          about: string | null
          achievements: string[] | null
          avatar: string | null
          birth_date: string | null
          certifications: string[] | null
          company: string | null
          connections: number | null
          courses: string[] | null
          created_at: string | null
          desired_position: string | null
          education: string | null
          email: string
          experience: string | null
          github: string | null
          headline: string | null
          id: string
          languages: string[] | null
          linkedin: string | null
          location: string | null
          marital_status: string | null
          name: string
          online: boolean | null
          phone: string | null
          portfolio: string | null
          role: string
          salary_expectation: string | null
          skills: string[] | null
          whatsapp: string | null
        }
        Insert: {
          about?: string | null
          achievements?: string[] | null
          avatar?: string | null
          birth_date?: string | null
          certifications?: string[] | null
          company?: string | null
          connections?: number | null
          courses?: string[] | null
          created_at?: string | null
          desired_position?: string | null
          education?: string | null
          email: string
          experience?: string | null
          github?: string | null
          headline?: string | null
          id: string
          languages?: string[] | null
          linkedin?: string | null
          location?: string | null
          marital_status?: string | null
          name: string
          online?: boolean | null
          phone?: string | null
          portfolio?: string | null
          role: string
          salary_expectation?: string | null
          skills?: string[] | null
          whatsapp?: string | null
        }
        Update: {
          about?: string | null
          achievements?: string[] | null
          avatar?: string | null
          birth_date?: string | null
          certifications?: string[] | null
          company?: string | null
          connections?: number | null
          courses?: string[] | null
          created_at?: string | null
          desired_position?: string | null
          education?: string | null
          email?: string
          experience?: string | null
          github?: string | null
          headline?: string | null
          id?: string
          languages?: string[] | null
          linkedin?: string | null
          location?: string | null
          marital_status?: string | null
          name?: string
          online?: boolean | null
          phone?: string | null
          portfolio?: string | null
          role?: string
          salary_expectation?: string | null
          skills?: string[] | null
          whatsapp?: string | null
        }
        Relationships: []
      }
    }
    Views: {
      user_public_profiles: {
        Row: {
          about: string | null
          achievements: string[] | null
          avatar: string | null
          certifications: string[] | null
          company: string | null
          connections: number | null
          courses: string[] | null
          desired_position: string | null
          education: string | null
          experience: string | null
          github: string | null
          headline: string | null
          id: string | null
          languages: string[] | null
          linkedin: string | null
          location: string | null
          name: string | null
          online: boolean | null
          portfolio: string | null
          role: string | null
          skills: string[] | null
        }
        Insert: {
          about?: string | null
          achievements?: string[] | null
          avatar?: string | null
          certifications?: string[] | null
          company?: string | null
          connections?: number | null
          courses?: string[] | null
          desired_position?: string | null
          education?: string | null
          experience?: string | null
          github?: string | null
          headline?: string | null
          id?: string | null
          languages?: string[] | null
          linkedin?: string | null
          location?: string | null
          name?: string | null
          online?: boolean | null
          portfolio?: string | null
          role?: string | null
          skills?: string[] | null
        }
        Update: {
          about?: string | null
          achievements?: string[] | null
          avatar?: string | null
          certifications?: string[] | null
          company?: string | null
          connections?: number | null
          courses?: string[] | null
          desired_position?: string | null
          education?: string | null
          experience?: string | null
          github?: string | null
          headline?: string | null
          id?: string | null
          languages?: string[] | null
          linkedin?: string | null
          location?: string | null
          name?: string | null
          online?: boolean | null
          portfolio?: string | null
          role?: string | null
          skills?: string[] | null
        }
        Relationships: []
      }
    }
    Functions: {
      [_ in never]: never
    }
    Enums: {
      [_ in never]: never
    }
    CompositeTypes: {
      [_ in never]: never
    }
  }
}

type DatabaseWithoutInternals = Omit<Database, "__InternalSupabase">

type DefaultSchema = DatabaseWithoutInternals[Extract<keyof Database, "public">]

export type Tables<
  DefaultSchemaTableNameOrOptions extends
    | keyof (DefaultSchema["Tables"] & DefaultSchema["Views"])
    | { schema: keyof DatabaseWithoutInternals },
  TableName extends DefaultSchemaTableNameOrOptions extends {
    schema: keyof DatabaseWithoutInternals
  }
    ? keyof (DatabaseWithoutInternals[DefaultSchemaTableNameOrOptions["schema"]]["Tables"] &
        DatabaseWithoutInternals[DefaultSchemaTableNameOrOptions["schema"]]["Views"])
    : never = never,
> = DefaultSchemaTableNameOrOptions extends {
  schema: keyof DatabaseWithoutInternals
}
  ? (DatabaseWithoutInternals[DefaultSchemaTableNameOrOptions["schema"]]["Tables"] &
      DatabaseWithoutInternals[DefaultSchemaTableNameOrOptions["schema"]]["Views"])[TableName] extends {
      Row: infer R
    }
    ? R
    : never
  : DefaultSchemaTableNameOrOptions extends keyof (DefaultSchema["Tables"] &
        DefaultSchema["Views"])
    ? (DefaultSchema["Tables"] &
        DefaultSchema["Views"])[DefaultSchemaTableNameOrOptions] extends {
        Row: infer R
      }
      ? R
      : never
    : never

export type TablesInsert<
  DefaultSchemaTableNameOrOptions extends
    | keyof DefaultSchema["Tables"]
    | { schema: keyof DatabaseWithoutInternals },
  TableName extends DefaultSchemaTableNameOrOptions extends {
    schema: keyof DatabaseWithoutInternals
  }
    ? keyof DatabaseWithoutInternals[DefaultSchemaTableNameOrOptions["schema"]]["Tables"]
    : never = never,
> = DefaultSchemaTableNameOrOptions extends {
  schema: keyof DatabaseWithoutInternals
}
  ? DatabaseWithoutInternals[DefaultSchemaTableNameOrOptions["schema"]]["Tables"][TableName] extends {
      Insert: infer I
    }
    ? I
    : never
  : DefaultSchemaTableNameOrOptions extends keyof DefaultSchema["Tables"]
    ? DefaultSchema["Tables"][DefaultSchemaTableNameOrOptions] extends {
        Insert: infer I
      }
      ? I
      : never
    : never

export type TablesUpdate<
  DefaultSchemaTableNameOrOptions extends
    | keyof DefaultSchema["Tables"]
    | { schema: keyof DatabaseWithoutInternals },
  TableName extends DefaultSchemaTableNameOrOptions extends {
    schema: keyof DatabaseWithoutInternals
  }
    ? keyof DatabaseWithoutInternals[DefaultSchemaTableNameOrOptions["schema"]]["Tables"]
    : never = never,
> = DefaultSchemaTableNameOrOptions extends {
  schema: keyof DatabaseWithoutInternals
}
  ? DatabaseWithoutInternals[DefaultSchemaTableNameOrOptions["schema"]]["Tables"][TableName] extends {
      Update: infer U
    }
    ? U
    : never
  : DefaultSchemaTableNameOrOptions extends keyof DefaultSchema["Tables"]
    ? DefaultSchema["Tables"][DefaultSchemaTableNameOrOptions] extends {
        Update: infer U
      }
      ? U
      : never
    : never

export type Enums<
  DefaultSchemaEnumNameOrOptions extends
    | keyof DefaultSchema["Enums"]
    | { schema: keyof DatabaseWithoutInternals },
  EnumName extends DefaultSchemaEnumNameOrOptions extends {
    schema: keyof DatabaseWithoutInternals
  }
    ? keyof DatabaseWithoutInternals[DefaultSchemaEnumNameOrOptions["schema"]]["Enums"]
    : never = never,
> = DefaultSchemaEnumNameOrOptions extends {
  schema: keyof DatabaseWithoutInternals
}
  ? DatabaseWithoutInternals[DefaultSchemaEnumNameOrOptions["schema"]]["Enums"][EnumName]
  : DefaultSchemaEnumNameOrOptions extends keyof DefaultSchema["Enums"]
    ? DefaultSchema["Enums"][DefaultSchemaEnumNameOrOptions]
    : never

export type CompositeTypes<
  PublicCompositeTypeNameOrOptions extends
    | keyof DefaultSchema["CompositeTypes"]
    | { schema: keyof DatabaseWithoutInternals },
  CompositeTypeName extends PublicCompositeTypeNameOrOptions extends {
    schema: keyof DatabaseWithoutInternals
  }
    ? keyof DatabaseWithoutInternals[PublicCompositeTypeNameOrOptions["schema"]]["CompositeTypes"]
    : never = never,
> = PublicCompositeTypeNameOrOptions extends {
  schema: keyof DatabaseWithoutInternals
}
  ? DatabaseWithoutInternals[PublicCompositeTypeNameOrOptions["schema"]]["CompositeTypes"][CompositeTypeName]
  : PublicCompositeTypeNameOrOptions extends keyof DefaultSchema["CompositeTypes"]
    ? DefaultSchema["CompositeTypes"][PublicCompositeTypeNameOrOptions]
    : never

export const Constants = {
  graphql_public: {
    Enums: {},
  },
  public: {
    Enums: {},
  },
} as const
