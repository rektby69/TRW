export type Json =
  | string
  | number
  | boolean
  | null
  | { [key: string]: Json | undefined }
  | Json[];

export type UserRole = 'user' | 'client' | 'admin';
export type UserStatus = 'active' | 'banned' | 'rejected';
export type BookingStatus = 'confirmed' | 'cancelled' | 'attended' | 'no_show' | 'waitlisted';
export type PaymentStatus = 'pending_on_premise' | 'paid_on_premise' | 'waived' | 'refunded';
export type SessionStatus = 'scheduled' | 'in_progress' | 'completed' | 'cancelled';
export type RecurrenceType = 'weekly' | 'biweekly' | 'custom_dates';

export interface Database {
  public: {
    Tables: {
      profiles: {
        Row: {
          id: string;
          role: UserRole;
          status: UserStatus;
          first_name: string | null;
          last_name: string | null;
          full_name: string | null;
          phone_prefix: string | null;
          phone_number: string | null;
          phone: string | null;
          address_line1: string | null;
          address_line2: string | null;
          post_code: string | null;
          city: string | null;
          county: string | null;
          country: string | null;
          avatar_url: string | null;
          preferred_lang: string | null;
          emergency_contact_name: string | null;
          emergency_contact_phone: string | null;
          health_notes: string | null;
          notes: string | null;
          first_booking_at: string | null;
          created_at: string;
          updated_at: string;
        };
        Insert: {
          id: string;
          role?: UserRole;
          status?: UserStatus;
          first_name?: string | null;
          last_name?: string | null;
          full_name?: string | null;
          phone_prefix?: string | null;
          phone_number?: string | null;
          phone?: string | null;
          address_line1?: string | null;
          address_line2?: string | null;
          post_code?: string | null;
          city?: string | null;
          county?: string | null;
          country?: string | null;
          avatar_url?: string | null;
          preferred_lang?: string | null;
          emergency_contact_name?: string | null;
          emergency_contact_phone?: string | null;
          health_notes?: string | null;
          notes?: string | null;
          first_booking_at?: string | null;
          created_at?: string;
          updated_at?: string;
        };
        Update: {
          id?: string;
          role?: UserRole;
          status?: UserStatus;
          first_name?: string | null;
          last_name?: string | null;
          full_name?: string | null;
          phone_prefix?: string | null;
          phone_number?: string | null;
          phone?: string | null;
          address_line1?: string | null;
          address_line2?: string | null;
          post_code?: string | null;
          city?: string | null;
          county?: string | null;
          country?: string | null;
          avatar_url?: string | null;
          preferred_lang?: string | null;
          emergency_contact_name?: string | null;
          emergency_contact_phone?: string | null;
          health_notes?: string | null;
          notes?: string | null;
          first_booking_at?: string | null;
          created_at?: string;
          updated_at?: string;
        };
      };
      instructors: {
        Row: {
          id: string;
          name: string;
          bio_es: string | null;
          bio_en: string | null;
          photo_url: string | null;
          specialties: string[];
          is_active: boolean;
          created_at: string;
        };
        Insert: {
          id?: string;
          name: string;
          bio_es?: string | null;
          bio_en?: string | null;
          photo_url?: string | null;
          specialties?: string[];
          is_active?: boolean;
          created_at?: string;
        };
        Update: {
          id?: string;
          name?: string;
          bio_es?: string | null;
          bio_en?: string | null;
          photo_url?: string | null;
          specialties?: string[];
          is_active?: boolean;
          created_at?: string;
        };
      };
      session_types: {
        Row: {
          id: string;
          name: string;
          name_es: string;
          name_en: string | null;
          slug: string;
          description: string | null;
          description_es: string | null;
          description_en: string | null;
          default_duration: number;
          default_capacity: number;
          intensity_level: string | null;
          accent_color: string | null;
          image_url: string | null;
          is_active: boolean;
          created_at: string;
          updated_at: string;
        };
        Insert: {
          id?: string;
          name: string;
          name_es: string;
          name_en?: string | null;
          slug: string;
          description?: string | null;
          description_es?: string | null;
          description_en?: string | null;
          default_duration?: number;
          default_capacity?: number;
          intensity_level?: string | null;
          accent_color?: string | null;
          image_url?: string | null;
          is_active?: boolean;
          created_at?: string;
          updated_at?: string;
        };
        Update: {
          id?: string;
          name?: string;
          name_es?: string;
          name_en?: string | null;
          slug?: string;
          description?: string | null;
          description_es?: string | null;
          description_en?: string | null;
          default_duration?: number;
          default_capacity?: number;
          intensity_level?: string | null;
          accent_color?: string | null;
          image_url?: string | null;
          is_active?: boolean;
          created_at?: string;
          updated_at?: string;
        };
      };
      session_templates: {
        Row: {
          id: string;
          session_type_id: string;
          instructor_id: string;
          day_of_week: number;
          start_time: string;
          duration_minutes: number;
          max_slots: number;
          price: number;
          is_ongoing: boolean;
          valid_from: string;
          valid_until: string | null;
          recurrence_rule: Json | null;
          is_active: boolean;
          created_at: string;
          updated_at: string;
        };
        Insert: {
          id?: string;
          session_type_id: string;
          instructor_id: string;
          day_of_week: number;
          start_time: string;
          duration_minutes?: number;
          max_slots?: number;
          price?: number;
          is_ongoing?: boolean;
          valid_from?: string;
          valid_until?: string | null;
          recurrence_rule?: Json | null;
          is_active?: boolean;
          created_at?: string;
          updated_at?: string;
        };
        Update: {
          id?: string;
          session_type_id?: string;
          instructor_id?: string;
          day_of_week?: number;
          start_time?: string;
          duration_minutes?: number;
          max_slots?: number;
          price?: number;
          is_ongoing?: boolean;
          valid_from?: string;
          valid_until?: string | null;
          recurrence_rule?: Json | null;
          is_active?: boolean;
          created_at?: string;
          updated_at?: string;
        };
      };
      session_instances: {
        Row: {
          id: string;
          session_template_id: string | null;
          session_type_id: string;
          instructor_id: string;
          session_date: string;
          start_time: string;
          end_time: string;
          title: string;
          description: string | null;
          max_slots: number;
          booked_count: number;
          price: number;
          status: SessionStatus;
          cancel_reason: string | null;
          cancelled_at: string | null;
          created_at: string;
          updated_at: string;
        };
        Insert: {
          id?: string;
          session_template_id?: string | null;
          session_type_id: string;
          instructor_id: string;
          session_date: string;
          start_time: string;
          end_time: string;
          title: string;
          description?: string | null;
          max_slots: number;
          booked_count?: number;
          price: number;
          status?: SessionStatus;
          cancel_reason?: string | null;
          cancelled_at?: string | null;
          created_at?: string;
          updated_at?: string;
        };
        Update: {
          id?: string;
          session_template_id?: string | null;
          session_type_id?: string;
          instructor_id?: string;
          session_date?: string;
          start_time?: string;
          end_time?: string;
          title?: string;
          description?: string | null;
          max_slots?: number;
          booked_count?: number;
          price?: number;
          status?: SessionStatus;
          cancel_reason?: string | null;
          cancelled_at?: string | null;
          created_at?: string;
          updated_at?: string;
        };
      };
      bookings: {
        Row: {
          id: string;
          booking_reference: string;
          session_instance_id: string;
          user_id: string;
          booking_status: BookingStatus;
          payment_status: PaymentStatus;
          price_at_booking: number;
          payment_notes: string | null;
          cancelled_at: string | null;
          cancel_reason: string | null;
          cancelled_by: string | null;
          attended_at: string | null;
          marked_attended_by: string | null;
          created_at: string;
          updated_at: string;
        };
        Insert: {
          id?: string;
          booking_reference: string;
          session_instance_id: string;
          user_id: string;
          booking_status?: BookingStatus;
          payment_status?: PaymentStatus;
          price_at_booking: number;
          payment_notes?: string | null;
          cancelled_at?: string | null;
          cancel_reason?: string | null;
          cancelled_by?: string | null;
          attended_at?: string | null;
          marked_attended_by?: string | null;
          created_at?: string;
          updated_at?: string;
        };
        Update: {
          id?: string;
          booking_reference?: string;
          session_instance_id?: string;
          user_id?: string;
          booking_status?: BookingStatus;
          payment_status?: PaymentStatus;
          price_at_booking?: number;
          payment_notes?: string | null;
          cancelled_at?: string | null;
          cancel_reason?: string | null;
          cancelled_by?: string | null;
          attended_at?: string | null;
          marked_attended_by?: string | null;
          created_at?: string;
          updated_at?: string;
        };
      };
      studio_settings: {
        Row: {
          key: string;
          value: Json;
          description: string | null;
          updated_at: string;
        };
        Insert: {
          key: string;
          value: Json;
          description?: string | null;
          updated_at?: string;
        };
        Update: {
          key?: string;
          value?: Json;
          description?: string | null;
          updated_at?: string;
        };
      };
    };
    Views: {
      [_ in never]: never;
    };
    Functions: {
      [_ in never]: never;
    };
    Enums: {
      user_role: UserRole;
      user_status: UserStatus;
      booking_status: BookingStatus;
      payment_status: PaymentStatus;
      session_status: SessionStatus;
      recurrence_type: RecurrenceType;
    };
  };
}

