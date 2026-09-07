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
    PostgrestVersion: "14.17"
  }
  public: {
    Tables: {
      content_blocks: {
        Row: {
          id: string
          section: string
          title: string
          body: string
          icon: string | null
          sort_order: number
          created_at: string
          updated_at: string
        }
        Insert: {
          id?: string
          section: string
          title: string
          body: string
          icon?: string | null
          sort_order?: number
          created_at?: string
          updated_at?: string
        }
        Update: {
          id?: string
          section?: string
          title?: string
          body?: string
          icon?: string | null
          sort_order?: number
          created_at?: string
          updated_at?: string
        }
        Relationships: []
      }
      courses: {
        Row: {
          id: string
          slug: string
          name: string
          full_name: string
          holes: number | null
          par: number | null
          lat: number | null
          lng: number | null
          udisc_url: string | null
          map_image_url: string | null
          created_at: string
          updated_at: string
        }
        Insert: {
          id?: string
          slug: string
          name: string
          full_name: string
          holes?: number | null
          par?: number | null
          lat?: number | null
          lng?: number | null
          udisc_url?: string | null
          map_image_url?: string | null
          created_at?: string
          updated_at?: string
        }
        Update: {
          id?: string
          slug?: string
          name?: string
          full_name?: string
          holes?: number | null
          par?: number | null
          lat?: number | null
          lng?: number | null
          udisc_url?: string | null
          map_image_url?: string | null
          created_at?: string
          updated_at?: string
        }
        Relationships: []
      }
      division_prices: {
        Row: {
          id: string
          division_id: string
          label: string
          price: number
          sort_order: number
        }
        Insert: {
          id?: string
          division_id: string
          label: string
          price: number
          sort_order?: number
        }
        Update: {
          id?: string
          division_id?: string
          label?: string
          price?: number
          sort_order?: number
        }
        Relationships: [
          {
            foreignKeyName: "division_prices_division_id_fkey"
            columns: ["division_id"]
            isOneToOne: false
            referencedRelation: "tournament_divisions"
            referencedColumns: ["id"]
          },
        ]
      }
      faq: {
        Row: {
          id: string
          question: string
          answer: string
          sort_order: number
          created_at: string
          updated_at: string
        }
        Insert: {
          id?: string
          question: string
          answer: string
          sort_order?: number
          created_at?: string
          updated_at?: string
        }
        Update: {
          id?: string
          question?: string
          answer?: string
          sort_order?: number
          created_at?: string
          updated_at?: string
        }
        Relationships: []
      }
      partners: {
        Row: {
          id: string
          slug: string
          name: string
          full_name: string
          logo_url: string | null
          is_partner: boolean
          is_default_sponsor: boolean
          sort_order: number
          created_at: string
          updated_at: string
        }
        Insert: {
          id?: string
          slug: string
          name: string
          full_name: string
          logo_url?: string | null
          is_partner?: boolean
          is_default_sponsor?: boolean
          sort_order?: number
          created_at?: string
          updated_at?: string
        }
        Update: {
          id?: string
          slug?: string
          name?: string
          full_name?: string
          logo_url?: string | null
          is_partner?: boolean
          is_default_sponsor?: boolean
          sort_order?: number
          created_at?: string
          updated_at?: string
        }
        Relationships: []
      }
      past_tournaments: {
        Row: {
          id: string
          slug: string
          title: string
          date: string
          end_date: string | null
          location: string
          image_url: string | null
          divisions: string[]
          photos: string[]
          sponsor_partner_ids: string[] | null
          created_at: string
          updated_at: string
        }
        Insert: {
          id?: string
          slug: string
          title: string
          date: string
          end_date?: string | null
          location: string
          image_url?: string | null
          divisions?: string[]
          photos?: string[]
          sponsor_partner_ids?: string[] | null
          created_at?: string
          updated_at?: string
        }
        Update: {
          id?: string
          slug?: string
          title?: string
          date?: string
          end_date?: string | null
          location?: string
          image_url?: string | null
          divisions?: string[]
          photos?: string[]
          sponsor_partner_ids?: string[] | null
          created_at?: string
          updated_at?: string
        }
        Relationships: []
      }
      registrations: {
        Row: {
          id: string
          tournament_id: string
          division_id: string | null
          division_name: string
          price_label: string
          price: number
          full_name: string
          email: string
          phone: string
          status: string
          notes: string | null
          created_at: string
          updated_at: string
        }
        Insert: {
          id?: string
          tournament_id: string
          division_id?: string | null
          division_name: string
          price_label: string
          price: number
          full_name: string
          email: string
          phone: string
          status?: string
          notes?: string | null
          created_at?: string
          updated_at?: string
        }
        Update: {
          id?: string
          tournament_id?: string
          division_id?: string | null
          division_name?: string
          price_label?: string
          price?: number
          full_name?: string
          email?: string
          phone?: string
          status?: string
          notes?: string | null
          created_at?: string
          updated_at?: string
        }
        Relationships: [
          {
            foreignKeyName: "registrations_tournament_id_fkey"
            columns: ["tournament_id"]
            isOneToOne: false
            referencedRelation: "tournaments"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "registrations_division_id_fkey"
            columns: ["division_id"]
            isOneToOne: false
            referencedRelation: "tournament_divisions"
            referencedColumns: ["id"]
          },
        ]
      }
      site_settings: {
        Row: {
          id: boolean
          name: string
          tagline: string
          description: string
          email: string
          instagram: string | null
          whatsapp: string | null
          city: string
          director: string | null
          created_at: string
          updated_at: string
        }
        Insert: {
          id?: boolean
          name: string
          tagline: string
          description: string
          email: string
          instagram?: string | null
          whatsapp?: string | null
          city: string
          director?: string | null
          created_at?: string
          updated_at?: string
        }
        Update: {
          id?: boolean
          name?: string
          tagline?: string
          description?: string
          email?: string
          instagram?: string | null
          whatsapp?: string | null
          city?: string
          director?: string | null
          created_at?: string
          updated_at?: string
        }
        Relationships: []
      }
      tournament_divisions: {
        Row: {
          id: string
          tournament_id: string
          name: string
          spots: number | null
          sort_order: number
          created_at: string
        }
        Insert: {
          id?: string
          tournament_id: string
          name: string
          spots?: number | null
          sort_order?: number
          created_at?: string
        }
        Update: {
          id?: string
          tournament_id?: string
          name?: string
          spots?: number | null
          sort_order?: number
          created_at?: string
        }
        Relationships: [
          {
            foreignKeyName: "tournament_divisions_tournament_id_fkey"
            columns: ["tournament_id"]
            isOneToOne: false
            referencedRelation: "tournaments"
            referencedColumns: ["id"]
          },
        ]
      }
      tournaments: {
        Row: {
          id: string
          slug: string
          title: string
          date: string
          end_date: string | null
          registration_deadline: string
          registration_deadline_confirmed: boolean
          location: string
          description: string
          image_url: string | null
          status: string
          prices_approximate: boolean
          pdga_link: string | null
          sponsor_partner_ids: string[] | null
          course_id: string | null
          created_at: string
          updated_at: string
        }
        Insert: {
          id?: string
          slug: string
          title: string
          date: string
          end_date?: string | null
          registration_deadline: string
          registration_deadline_confirmed?: boolean
          location: string
          description: string
          image_url?: string | null
          status?: string
          prices_approximate?: boolean
          pdga_link?: string | null
          sponsor_partner_ids?: string[] | null
          course_id?: string | null
          created_at?: string
          updated_at?: string
        }
        Update: {
          id?: string
          slug?: string
          title?: string
          date?: string
          end_date?: string | null
          registration_deadline?: string
          registration_deadline_confirmed?: boolean
          location?: string
          description?: string
          image_url?: string | null
          status?: string
          prices_approximate?: boolean
          pdga_link?: string | null
          sponsor_partner_ids?: string[] | null
          course_id?: string | null
          created_at?: string
          updated_at?: string
        }
        Relationships: [
          {
            foreignKeyName: "tournaments_course_id_fkey"
            columns: ["course_id"]
            isOneToOne: false
            referencedRelation: "courses"
            referencedColumns: ["id"]
          },
        ]
      }
      trainings: {
        Row: {
          id: string
          slug: string
          title: string
          day: string
          time: string
          location: string
          level: string
          description: string
          status: string
          confirmed: boolean
          image_url: string | null
          created_at: string
          updated_at: string
        }
        Insert: {
          id?: string
          slug: string
          title: string
          day: string
          time: string
          location: string
          level: string
          description: string
          status?: string
          confirmed?: boolean
          image_url?: string | null
          created_at?: string
          updated_at?: string
        }
        Update: {
          id?: string
          slug?: string
          title?: string
          day?: string
          time?: string
          location?: string
          level?: string
          description?: string
          status?: string
          confirmed?: boolean
          image_url?: string | null
          created_at?: string
          updated_at?: string
        }
        Relationships: []
      }
    }
    Views: {
      [_ in never]: never
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
  public: {
    Enums: {},
  },
} as const
