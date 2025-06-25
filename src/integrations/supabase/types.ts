export type Json =
  | string
  | number
  | boolean
  | null
  | { [key: string]: Json | undefined }
  | Json[]

export type Database = {
  public: {
    Tables: {
      achievements: {
        Row: {
          badge_emoji: string
          created_at: string | null
          description: string
          id: string
          is_rare: boolean | null
          name: string
          tea_points_reward: number
          unlock_criteria: Json
          xp_reward: number
        }
        Insert: {
          badge_emoji: string
          created_at?: string | null
          description: string
          id?: string
          is_rare?: boolean | null
          name: string
          tea_points_reward: number
          unlock_criteria: Json
          xp_reward: number
        }
        Update: {
          badge_emoji?: string
          created_at?: string | null
          description?: string
          id?: string
          is_rare?: boolean | null
          name?: string
          tea_points_reward?: number
          unlock_criteria?: Json
          xp_reward?: number
        }
        Relationships: []
      }
      admin_audit_log: {
        Row: {
          action: string
          admin_email: string
          created_at: string | null
          details: Json | null
          id: string
          ip_address: string | null
          target_id: string | null
          target_table: string | null
          user_agent: string | null
        }
        Insert: {
          action: string
          admin_email: string
          created_at?: string | null
          details?: Json | null
          id?: string
          ip_address?: string | null
          target_id?: string | null
          target_table?: string | null
          user_agent?: string | null
        }
        Update: {
          action?: string
          admin_email?: string
          created_at?: string | null
          details?: Json | null
          id?: string
          ip_address?: string | null
          target_id?: string | null
          target_table?: string | null
          user_agent?: string | null
        }
        Relationships: []
      }
      chat_rooms: {
        Row: {
          created_at: string | null
          id: string
          is_active: boolean | null
          name: string
          submission_id: string | null
        }
        Insert: {
          created_at?: string | null
          id?: string
          is_active?: boolean | null
          name: string
          submission_id?: string | null
        }
        Update: {
          created_at?: string | null
          id?: string
          is_active?: boolean | null
          name?: string
          submission_id?: string | null
        }
        Relationships: [
          {
            foreignKeyName: "chat_rooms_submission_id_fkey"
            columns: ["submission_id"]
            isOneToOne: false
            referencedRelation: "tea_submissions"
            referencedColumns: ["id"]
          },
        ]
      }
      evidence_ratings: {
        Row: {
          anonymous_token: string
          created_at: string
          credibility_score: number
          evidence_url: string
          id: string
          submission_id: string
        }
        Insert: {
          anonymous_token: string
          created_at?: string
          credibility_score: number
          evidence_url: string
          id?: string
          submission_id: string
        }
        Update: {
          anonymous_token?: string
          created_at?: string
          credibility_score?: number
          evidence_url?: string
          id?: string
          submission_id?: string
        }
        Relationships: [
          {
            foreignKeyName: "evidence_ratings_submission_id_fkey"
            columns: ["submission_id"]
            isOneToOne: false
            referencedRelation: "tea_submissions"
            referencedColumns: ["id"]
          },
        ]
      }
      feedback_submissions: {
        Row: {
          created_at: string
          description: string
          email: string | null
          id: string
          priority: string
          status: string
          title: string
          type: string
          updated_at: string
          url: string | null
          user_agent: string | null
        }
        Insert: {
          created_at?: string
          description: string
          email?: string | null
          id?: string
          priority?: string
          status?: string
          title: string
          type: string
          updated_at?: string
          url?: string | null
          user_agent?: string | null
        }
        Update: {
          created_at?: string
          description?: string
          email?: string | null
          id?: string
          priority?: string
          status?: string
          title?: string
          type?: string
          updated_at?: string
          url?: string | null
          user_agent?: string | null
        }
        Relationships: []
      }
      messages: {
        Row: {
          anonymous_token: string
          chat_room_id: string | null
          content: string
          created_at: string | null
          id: string
          is_deleted: boolean | null
        }
        Insert: {
          anonymous_token: string
          chat_room_id?: string | null
          content: string
          created_at?: string | null
          id?: string
          is_deleted?: boolean | null
        }
        Update: {
          anonymous_token?: string
          chat_room_id?: string | null
          content?: string
          created_at?: string | null
          id?: string
          is_deleted?: boolean | null
        }
        Relationships: [
          {
            foreignKeyName: "messages_chat_room_id_fkey"
            columns: ["chat_room_id"]
            isOneToOne: false
            referencedRelation: "chat_rooms"
            referencedColumns: ["id"]
          },
        ]
      }
      moderation_queue: {
        Row: {
          assigned_to: string | null
          created_at: string | null
          id: string
          priority: number | null
          reason: string
          resolved_at: string | null
          status: string | null
          submission_id: string | null
        }
        Insert: {
          assigned_to?: string | null
          created_at?: string | null
          id?: string
          priority?: number | null
          reason: string
          resolved_at?: string | null
          status?: string | null
          submission_id?: string | null
        }
        Update: {
          assigned_to?: string | null
          created_at?: string | null
          id?: string
          priority?: number | null
          reason?: string
          resolved_at?: string | null
          status?: string | null
          submission_id?: string | null
        }
        Relationships: [
          {
            foreignKeyName: "moderation_queue_submission_id_fkey"
            columns: ["submission_id"]
            isOneToOne: false
            referencedRelation: "tea_submissions"
            referencedColumns: ["id"]
          },
        ]
      }
      notifications: {
        Row: {
          anonymous_token: string
          created_at: string
          data: Json | null
          id: string
          is_read: boolean
          message: string
          title: string
          type: string
        }
        Insert: {
          anonymous_token: string
          created_at?: string
          data?: Json | null
          id?: string
          is_read?: boolean
          message: string
          title: string
          type: string
        }
        Update: {
          anonymous_token?: string
          created_at?: string
          data?: Json | null
          id?: string
          is_read?: boolean
          message?: string
          title?: string
          type?: string
        }
        Relationships: []
      }
      profiles: {
        Row: {
          avatar_url: string | null
          created_at: string | null
          full_name: string | null
          id: string
          updated_at: string | null
          user_id: string
          username: string | null
        }
        Insert: {
          avatar_url?: string | null
          created_at?: string | null
          full_name?: string | null
          id?: string
          updated_at?: string | null
          user_id: string
          username?: string | null
        }
        Update: {
          avatar_url?: string | null
          created_at?: string | null
          full_name?: string | null
          id?: string
          updated_at?: string | null
          user_id?: string
          username?: string | null
        }
        Relationships: []
      }
      rate_limits: {
        Row: {
          action_count: number | null
          action_type: string
          anonymous_token: string
          created_at: string | null
          id: string
          window_start: string | null
        }
        Insert: {
          action_count?: number | null
          action_type: string
          anonymous_token: string
          created_at?: string | null
          id?: string
          window_start?: string | null
        }
        Update: {
          action_count?: number | null
          action_type?: string
          anonymous_token?: string
          created_at?: string | null
          id?: string
          window_start?: string | null
        }
        Relationships: []
      }
      reaction_types: {
        Row: {
          emoji: string
          id: string
          is_active: boolean | null
          name: string
          points_value: number
        }
        Insert: {
          emoji: string
          id?: string
          is_active?: boolean | null
          name: string
          points_value: number
        }
        Update: {
          emoji?: string
          id?: string
          is_active?: boolean | null
          name?: string
          points_value?: number
        }
        Relationships: []
      }
      role_invitations: {
        Row: {
          accepted_at: string | null
          created_at: string | null
          email: string
          expires_at: string
          id: string
          invitation_token: string
          invited_by: string
          notes: string | null
          role: Database["public"]["Enums"]["user_role"]
          status: string | null
        }
        Insert: {
          accepted_at?: string | null
          created_at?: string | null
          email: string
          expires_at?: string
          id?: string
          invitation_token?: string
          invited_by: string
          notes?: string | null
          role: Database["public"]["Enums"]["user_role"]
          status?: string | null
        }
        Update: {
          accepted_at?: string | null
          created_at?: string | null
          email?: string
          expires_at?: string
          id?: string
          invitation_token?: string
          invited_by?: string
          notes?: string | null
          role?: Database["public"]["Enums"]["user_role"]
          status?: string | null
        }
        Relationships: []
      }
      security_audit_trail: {
        Row: {
          created_at: string | null
          details: Json | null
          event_type: string
          id: string
          ip_address: string | null
          session_id: string | null
          severity: string
          user_agent: string | null
          user_context: string | null
        }
        Insert: {
          created_at?: string | null
          details?: Json | null
          event_type: string
          id?: string
          ip_address?: string | null
          session_id?: string | null
          severity?: string
          user_agent?: string | null
          user_context?: string | null
        }
        Update: {
          created_at?: string | null
          details?: Json | null
          event_type?: string
          id?: string
          ip_address?: string | null
          session_id?: string | null
          severity?: string
          user_agent?: string | null
          user_context?: string | null
        }
        Relationships: []
      }
      submission_flags: {
        Row: {
          additional_details: string | null
          anonymous_token: string
          created_at: string
          flag_reason: string
          id: string
          reviewed_at: string | null
          reviewed_by: string | null
          status: string
          submission_id: string
        }
        Insert: {
          additional_details?: string | null
          anonymous_token: string
          created_at?: string
          flag_reason: string
          id?: string
          reviewed_at?: string | null
          reviewed_by?: string | null
          status?: string
          submission_id: string
        }
        Update: {
          additional_details?: string | null
          anonymous_token?: string
          created_at?: string
          flag_reason?: string
          id?: string
          reviewed_at?: string | null
          reviewed_by?: string | null
          status?: string
          submission_id?: string
        }
        Relationships: [
          {
            foreignKeyName: "submission_flags_submission_id_fkey"
            columns: ["submission_id"]
            isOneToOne: false
            referencedRelation: "tea_submissions"
            referencedColumns: ["id"]
          },
        ]
      }
      submission_ratings: {
        Row: {
          anonymous_token: string
          created_at: string
          id: string
          rating: number
          submission_id: string
        }
        Insert: {
          anonymous_token: string
          created_at?: string
          id?: string
          rating: number
          submission_id: string
        }
        Update: {
          anonymous_token?: string
          created_at?: string
          id?: string
          rating?: number
          submission_id?: string
        }
        Relationships: [
          {
            foreignKeyName: "submission_ratings_submission_id_fkey"
            columns: ["submission_id"]
            isOneToOne: false
            referencedRelation: "tea_submissions"
            referencedColumns: ["id"]
          },
        ]
      }
      tea_points_transactions: {
        Row: {
          amount: number
          anonymous_token: string
          created_at: string | null
          description: string | null
          id: string
          metadata: Json | null
          transaction_type: string
        }
        Insert: {
          amount: number
          anonymous_token: string
          created_at?: string | null
          description?: string | null
          id?: string
          metadata?: Json | null
          transaction_type: string
        }
        Update: {
          amount?: number
          anonymous_token?: string
          created_at?: string | null
          description?: string | null
          id?: string
          metadata?: Json | null
          transaction_type?: string
        }
        Relationships: []
      }
      tea_submissions: {
        Row: {
          anonymous_token: string
          average_rating: number | null
          category: string
          content: string
          created_at: string | null
          evidence_credibility_score: number | null
          evidence_urls: string[] | null
          flag_count: number | null
          has_evidence: boolean | null
          id: string
          is_verified: boolean | null
          moderator_notes: string | null
          rating_count: number | null
          reactions: Json | null
          status: string | null
          updated_at: string | null
          verification_data: Json | null
          verification_method: string | null
          verification_score: number | null
        }
        Insert: {
          anonymous_token: string
          average_rating?: number | null
          category: string
          content: string
          created_at?: string | null
          evidence_credibility_score?: number | null
          evidence_urls?: string[] | null
          flag_count?: number | null
          has_evidence?: boolean | null
          id?: string
          is_verified?: boolean | null
          moderator_notes?: string | null
          rating_count?: number | null
          reactions?: Json | null
          status?: string | null
          updated_at?: string | null
          verification_data?: Json | null
          verification_method?: string | null
          verification_score?: number | null
        }
        Update: {
          anonymous_token?: string
          average_rating?: number | null
          category?: string
          content?: string
          created_at?: string | null
          evidence_credibility_score?: number | null
          evidence_urls?: string[] | null
          flag_count?: number | null
          has_evidence?: boolean | null
          id?: string
          is_verified?: boolean | null
          moderator_notes?: string | null
          rating_count?: number | null
          reactions?: Json | null
          status?: string | null
          updated_at?: string | null
          verification_data?: Json | null
          verification_method?: string | null
          verification_score?: number | null
        }
        Relationships: []
      }
      user_achievements: {
        Row: {
          achievement_id: string
          anonymous_token: string
          id: string
          unlocked_at: string | null
        }
        Insert: {
          achievement_id: string
          anonymous_token: string
          id?: string
          unlocked_at?: string | null
        }
        Update: {
          achievement_id?: string
          anonymous_token?: string
          id?: string
          unlocked_at?: string | null
        }
        Relationships: [
          {
            foreignKeyName: "user_achievements_achievement_id_fkey"
            columns: ["achievement_id"]
            isOneToOne: false
            referencedRelation: "achievements"
            referencedColumns: ["id"]
          },
        ]
      }
      user_levels: {
        Row: {
          badge_color: string | null
          level: number
          max_xp: number | null
          min_xp: number
          name: string
          perks: Json | null
        }
        Insert: {
          badge_color?: string | null
          level: number
          max_xp?: number | null
          min_xp: number
          name: string
          perks?: Json | null
        }
        Update: {
          badge_color?: string | null
          level?: number
          max_xp?: number | null
          min_xp?: number
          name?: string
          perks?: Json | null
        }
        Relationships: []
      }
      user_profiles: {
        Row: {
          anonymous_token: string
          created_at: string | null
          id: string
          is_verified: boolean | null
          reputation_score: number | null
          updated_at: string | null
          user_id: string | null
          verification_level: string | null
        }
        Insert: {
          anonymous_token?: string
          created_at?: string | null
          id?: string
          is_verified?: boolean | null
          reputation_score?: number | null
          updated_at?: string | null
          user_id?: string | null
          verification_level?: string | null
        }
        Update: {
          anonymous_token?: string
          created_at?: string | null
          id?: string
          is_verified?: boolean | null
          reputation_score?: number | null
          updated_at?: string | null
          user_id?: string | null
          verification_level?: string | null
        }
        Relationships: []
      }
      user_progression: {
        Row: {
          anonymous_token: string
          created_at: string | null
          current_level: number | null
          current_xp: number | null
          id: string
          tea_points: number | null
          total_posts: number | null
          total_reactions_given: number | null
          total_reactions_received: number | null
          updated_at: string | null
        }
        Insert: {
          anonymous_token: string
          created_at?: string | null
          current_level?: number | null
          current_xp?: number | null
          id?: string
          tea_points?: number | null
          total_posts?: number | null
          total_reactions_given?: number | null
          total_reactions_received?: number | null
          updated_at?: string | null
        }
        Update: {
          anonymous_token?: string
          created_at?: string | null
          current_level?: number | null
          current_xp?: number | null
          id?: string
          tea_points?: number | null
          total_posts?: number | null
          total_reactions_given?: number | null
          total_reactions_received?: number | null
          updated_at?: string | null
        }
        Relationships: []
      }
      user_reactions: {
        Row: {
          anonymous_token: string
          created_at: string | null
          id: string
          reaction_type: string
          submission_id: string | null
        }
        Insert: {
          anonymous_token: string
          created_at?: string | null
          id?: string
          reaction_type: string
          submission_id?: string | null
        }
        Update: {
          anonymous_token?: string
          created_at?: string | null
          id?: string
          reaction_type?: string
          submission_id?: string | null
        }
        Relationships: [
          {
            foreignKeyName: "user_reactions_submission_id_fkey"
            columns: ["submission_id"]
            isOneToOne: false
            referencedRelation: "tea_submissions"
            referencedColumns: ["id"]
          },
        ]
      }
      user_roles: {
        Row: {
          assigned_at: string | null
          assigned_by: string
          id: string
          is_active: boolean | null
          notes: string | null
          role: Database["public"]["Enums"]["user_role"]
          user_email: string
        }
        Insert: {
          assigned_at?: string | null
          assigned_by: string
          id?: string
          is_active?: boolean | null
          notes?: string | null
          role?: Database["public"]["Enums"]["user_role"]
          user_email: string
        }
        Update: {
          assigned_at?: string | null
          assigned_by?: string
          id?: string
          is_active?: boolean | null
          notes?: string | null
          role?: Database["public"]["Enums"]["user_role"]
          user_email?: string
        }
        Relationships: []
      }
      verification_requests: {
        Row: {
          admin_notes: string | null
          anonymous_token: string
          auto_verified: boolean | null
          created_at: string | null
          evidence_data: Json | null
          evidence_files: string[] | null
          id: string
          processed_at: string | null
          status: string | null
          submission_id: string | null
          verification_score: number | null
          verification_type: string
        }
        Insert: {
          admin_notes?: string | null
          anonymous_token: string
          auto_verified?: boolean | null
          created_at?: string | null
          evidence_data?: Json | null
          evidence_files?: string[] | null
          id?: string
          processed_at?: string | null
          status?: string | null
          submission_id?: string | null
          verification_score?: number | null
          verification_type: string
        }
        Update: {
          admin_notes?: string | null
          anonymous_token?: string
          auto_verified?: boolean | null
          created_at?: string | null
          evidence_data?: Json | null
          evidence_files?: string[] | null
          id?: string
          processed_at?: string | null
          status?: string | null
          submission_id?: string | null
          verification_score?: number | null
          verification_type?: string
        }
        Relationships: [
          {
            foreignKeyName: "verification_requests_submission_id_fkey"
            columns: ["submission_id"]
            isOneToOne: false
            referencedRelation: "tea_submissions"
            referencedColumns: ["id"]
          },
        ]
      }
    }
    Views: {
      [_ in never]: never
    }
    Functions: {
      accept_role_invitation: {
        Args: { invitation_token: string }
        Returns: Json
      }
      award_tea_points: {
        Args: {
          p_token: string
          p_points: number
          p_type: string
          p_description?: string
        }
        Returns: undefined
      }
      award_tea_points_secure: {
        Args: {
          p_anonymous_token: string
          p_points_amount: number
          p_transaction_type: string
          p_description?: string
        }
        Returns: Json
      }
      award_xp: {
        Args: { p_token: string; p_xp: number; p_source: string }
        Returns: Json
      }
      award_xp_secure: {
        Args: {
          p_anonymous_token: string
          p_xp_amount: number
          p_source: string
        }
        Returns: Json
      }
      calculate_user_level: {
        Args: { xp: number }
        Returns: number
      }
      check_enhanced_rate_limit: {
        Args: {
          p_token: string
          p_action: string
          p_max_actions?: number
          p_window_minutes?: number
        }
        Returns: Json
      }
      check_gamification_rate_limit: {
        Args: {
          p_token: string
          p_action: string
          p_max_actions?: number
          p_window_minutes?: number
        }
        Returns: Json
      }
      check_rate_limit_api: {
        Args: {
          p_token: string
          p_action: string
          p_max_actions?: number
          p_window_minutes?: number
        }
        Returns: Json
      }
      check_rate_limit_enhanced: {
        Args: {
          p_token: string
          p_action: string
          p_max_actions?: number
          p_window_minutes?: number
        }
        Returns: Json
      }
      check_rate_limit_secure: {
        Args: {
          p_token: string
          p_action: string
          p_max_actions?: number
          p_window_minutes?: number
        }
        Returns: Json
      }
      check_rate_limit_server: {
        Args: {
          p_token: string
          p_action: string
          p_max_actions?: number
          p_window_minutes?: number
        }
        Returns: Json
      }
      check_rate_limit_ultimate: {
        Args: {
          p_token: string
          p_action: string
          p_max_actions?: number
          p_window_minutes?: number
        }
        Returns: Json
      }
      comprehensive_security_health_check: {
        Args: Record<PropertyKey, never>
        Returns: Json
      }
      get_current_user_verification_level: {
        Args: Record<PropertyKey, never>
        Returns: string
      }
      get_security_health_summary: {
        Args: Record<PropertyKey, never>
        Returns: {
          check_type: string
          total_policies: number
          status: string
        }[]
      }
      get_user_role_by_email: {
        Args: { user_email: string }
        Returns: Database["public"]["Enums"]["user_role"]
      }
      get_user_role_enhanced: {
        Args: Record<PropertyKey, never>
        Returns: string
      }
      get_user_role_for_email: {
        Args: { user_email: string }
        Returns: string
      }
      get_user_role_secure: {
        Args: Record<PropertyKey, never>
        Returns: string
      }
      is_admin_secure: {
        Args: Record<PropertyKey, never>
        Returns: boolean
      }
      is_admin_user: {
        Args: Record<PropertyKey, never>
        Returns: boolean
      }
      is_moderator_or_admin_secure: {
        Args: Record<PropertyKey, never>
        Returns: boolean
      }
      is_user_admin: {
        Args: Record<PropertyKey, never>
        Returns: boolean
      }
      is_user_moderator_or_admin: {
        Args: Record<PropertyKey, never>
        Returns: boolean
      }
      log_rls_violation: {
        Args: { table_name: string; operation: string; user_context?: string }
        Returns: undefined
      }
      log_security_event: {
        Args: { event_type: string; details?: Json; severity?: string }
        Returns: undefined
      }
      log_security_event_enhanced: {
        Args: {
          event_type: string
          details?: Json
          severity?: string
          user_context?: string
        }
        Returns: undefined
      }
      log_security_policy_violation: {
        Args: {
          table_name: string
          operation: string
          user_context?: string
          violation_details?: Json
        }
        Returns: undefined
      }
      secure_gossip_submission: {
        Args: {
          p_content: string
          p_category?: string
          p_anonymous_token?: string
        }
        Returns: Json
      }
      secure_gossip_submission_ultimate: {
        Args: {
          p_content: string
          p_anonymous_token: string
          p_category?: string
        }
        Returns: Json
      }
      secure_rate_limit_advanced: {
        Args: {
          p_token: string
          p_action: string
          p_max_actions?: number
          p_window_minutes?: number
        }
        Returns: Json
      }
      secure_rate_limit_check: {
        Args: {
          p_token: string
          p_action: string
          p_max_actions?: number
          p_window_minutes?: number
        }
        Returns: Json
      }
      secure_rate_limit_ultimate: {
        Args: {
          p_token: string
          p_action: string
          p_max_actions?: number
          p_window_minutes?: number
        }
        Returns: Json
      }
      secure_rate_limit_with_monitoring: {
        Args: {
          p_token: string
          p_action: string
          p_max_actions?: number
          p_window_minutes?: number
        }
        Returns: Json
      }
      security_health_check: {
        Args: Record<PropertyKey, never>
        Returns: Json
      }
      test_rls_enforcement: {
        Args: Record<PropertyKey, never>
        Returns: Json
      }
      validate_admin_access: {
        Args: Record<PropertyKey, never>
        Returns: Json
      }
      validate_admin_session_enhanced: {
        Args: Record<PropertyKey, never>
        Returns: Json
      }
      validate_admin_session_secure: {
        Args: Record<PropertyKey, never>
        Returns: Json
      }
      validate_admin_session_ultimate: {
        Args: Record<PropertyKey, never>
        Returns: Json
      }
      validate_admin_session_with_timeout: {
        Args: Record<PropertyKey, never>
        Returns: Json
      }
      validate_anonymous_token: {
        Args: { token: string }
        Returns: boolean
      }
      validate_anonymous_token_enhanced: {
        Args: { token: string }
        Returns: boolean
      }
      validate_content: {
        Args: { content: string }
        Returns: boolean
      }
      validate_content_comprehensive: {
        Args: { content: string; max_length?: number }
        Returns: Json
      }
      validate_content_enhanced: {
        Args: { content: string; max_length?: number }
        Returns: Json
      }
      validate_content_secure: {
        Args: { content: string; max_length?: number }
        Returns: Json
      }
      validate_content_ultimate: {
        Args: { content: string; max_length?: number }
        Returns: Json
      }
      validate_token_enhanced: {
        Args: { token: string }
        Returns: Json
      }
      validate_unified_security: {
        Args: Record<PropertyKey, never>
        Returns: Json
      }
    }
    Enums: {
      user_role: "user" | "moderator" | "admin" | "super_admin"
    }
    CompositeTypes: {
      [_ in never]: never
    }
  }
}

type DefaultSchema = Database[Extract<keyof Database, "public">]

export type Tables<
  DefaultSchemaTableNameOrOptions extends
    | keyof (DefaultSchema["Tables"] & DefaultSchema["Views"])
    | { schema: keyof Database },
  TableName extends DefaultSchemaTableNameOrOptions extends {
    schema: keyof Database
  }
    ? keyof (Database[DefaultSchemaTableNameOrOptions["schema"]]["Tables"] &
        Database[DefaultSchemaTableNameOrOptions["schema"]]["Views"])
    : never = never,
> = DefaultSchemaTableNameOrOptions extends { schema: keyof Database }
  ? (Database[DefaultSchemaTableNameOrOptions["schema"]]["Tables"] &
      Database[DefaultSchemaTableNameOrOptions["schema"]]["Views"])[TableName] extends {
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
    | { schema: keyof Database },
  TableName extends DefaultSchemaTableNameOrOptions extends {
    schema: keyof Database
  }
    ? keyof Database[DefaultSchemaTableNameOrOptions["schema"]]["Tables"]
    : never = never,
> = DefaultSchemaTableNameOrOptions extends { schema: keyof Database }
  ? Database[DefaultSchemaTableNameOrOptions["schema"]]["Tables"][TableName] extends {
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
    | { schema: keyof Database },
  TableName extends DefaultSchemaTableNameOrOptions extends {
    schema: keyof Database
  }
    ? keyof Database[DefaultSchemaTableNameOrOptions["schema"]]["Tables"]
    : never = never,
> = DefaultSchemaTableNameOrOptions extends { schema: keyof Database }
  ? Database[DefaultSchemaTableNameOrOptions["schema"]]["Tables"][TableName] extends {
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
    | { schema: keyof Database },
  EnumName extends DefaultSchemaEnumNameOrOptions extends {
    schema: keyof Database
  }
    ? keyof Database[DefaultSchemaEnumNameOrOptions["schema"]]["Enums"]
    : never = never,
> = DefaultSchemaEnumNameOrOptions extends { schema: keyof Database }
  ? Database[DefaultSchemaEnumNameOrOptions["schema"]]["Enums"][EnumName]
  : DefaultSchemaEnumNameOrOptions extends keyof DefaultSchema["Enums"]
    ? DefaultSchema["Enums"][DefaultSchemaEnumNameOrOptions]
    : never

export type CompositeTypes<
  PublicCompositeTypeNameOrOptions extends
    | keyof DefaultSchema["CompositeTypes"]
    | { schema: keyof Database },
  CompositeTypeName extends PublicCompositeTypeNameOrOptions extends {
    schema: keyof Database
  }
    ? keyof Database[PublicCompositeTypeNameOrOptions["schema"]]["CompositeTypes"]
    : never = never,
> = PublicCompositeTypeNameOrOptions extends { schema: keyof Database }
  ? Database[PublicCompositeTypeNameOrOptions["schema"]]["CompositeTypes"][CompositeTypeName]
  : PublicCompositeTypeNameOrOptions extends keyof DefaultSchema["CompositeTypes"]
    ? DefaultSchema["CompositeTypes"][PublicCompositeTypeNameOrOptions]
    : never

export const Constants = {
  public: {
    Enums: {
      user_role: ["user", "moderator", "admin", "super_admin"],
    },
  },
} as const
