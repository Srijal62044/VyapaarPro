import React, { createContext, useContext, useEffect, useState } from 'react';
import { UserProfile, UserRole } from '../types';
import { supabase, isSupabaseConfigured } from '../lib/supabase';

// Single authorized administrator email for VyapaarPro
export const AUTHORIZED_ADMIN_EMAIL = (
  import.meta.env.VITE_ADMIN_EMAIL || 'kumarsrijal732@gmail.com'
).toLowerCase().trim();

export const isAuthorizedAdminEmail = (email?: string | null): boolean => {
  if (!email) return false;
  return email.toLowerCase().trim() === AUTHORIZED_ADMIN_EMAIL;
};

interface AuthContextType {
  user: { id: string; email: string } | null;
  profile: UserProfile | null;
  role: UserRole | null;
  isAdmin: boolean;
  isSuperAdmin: boolean;
  isLoading: boolean;
  authorizedAdminEmail: string;
  login: (email: string, password?: string) => Promise<{ success: boolean; error?: string }>;
  register: (
    email: string,
    password?: string,
    fullName?: string,
    phone?: string,
    companyName?: string
  ) => Promise<{ success: boolean; error?: string }>;
  logout: () => Promise<void>;
  updateProfile: (data: Partial<UserProfile>) => Promise<boolean>;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

const AUTH_STORAGE_KEY = 'vp_current_user_v1';

export const AuthProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [profile, setProfile] = useState<UserProfile | null>(null);
  const [isLoading, setIsLoading] = useState(true);

  // Helper to ensure profile role is synchronized with email authorization
  const sanitizeProfile = (rawProfile: UserProfile): UserProfile => {
    const isAuthAdmin = isAuthorizedAdminEmail(rawProfile.email);
    if (isAuthAdmin) {
      return {
        ...rawProfile,
        role: 'super_admin',
      };
    }
    // Any other email cannot hold an admin role
    return {
      ...rawProfile,
      role: 'customer',
    };
  };

  useEffect(() => {
    async function initAuth() {
      setIsLoading(true);
      // If Supabase is configured, check real session
      if (isSupabaseConfigured && supabase) {
        try {
          const { data: { session } } = await supabase.auth.getSession();
          if (session?.user && session.user.email) {
            const { data: userProfile } = await supabase
              .from('profiles')
              .select('*')
              .eq('id', session.user.id)
              .single();

            const isAuthAdmin = isAuthorizedAdminEmail(session.user.email);
            const resolvedRole: UserRole = isAuthAdmin ? 'super_admin' : 'customer';

            const finalProfile: UserProfile = sanitizeProfile(
              userProfile || {
                id: session.user.id,
                email: session.user.email,
                full_name: session.user.user_metadata?.full_name || session.user.email.split('@')[0],
                role: resolvedRole,
                created_at: new Date().toISOString(),
              }
            );

            // If Supabase user is the authorized admin, ensure DB profile role is synchronized
            if (isAuthAdmin && userProfile?.role !== 'super_admin') {
              await supabase
                .from('profiles')
                .update({ role: 'super_admin' })
                .eq('id', session.user.id);
            }

            setProfile(finalProfile);
            localStorage.setItem(AUTH_STORAGE_KEY, JSON.stringify(finalProfile));
            setIsLoading(false);
            return;
          }
        } catch (err) {
          console.warn('Supabase auth init notice:', err);
        }
      }

      // Check local storage session
      try {
        const stored = localStorage.getItem(AUTH_STORAGE_KEY);
        if (stored) {
          const parsed = JSON.parse(stored);
          setProfile(sanitizeProfile(parsed));
        } else {
          setProfile(null);
        }
      } catch (err) {
        console.error('Failed to parse auth from storage:', err);
        setProfile(null);
      } finally {
        setIsLoading(false);
      }
    }

    initAuth();
  }, []);

  const login = async (email: string, password?: string): Promise<{ success: boolean; error?: string }> => {
    setIsLoading(true);
    const cleanEmail = email.toLowerCase().trim();
    const isAuthAdmin = isAuthorizedAdminEmail(cleanEmail);

    try {
      if (isSupabaseConfigured && supabase && password) {
        const { data, error } = await supabase.auth.signInWithPassword({ email: cleanEmail, password });
        if (error) {
          setIsLoading(false);
          return { success: false, error: error.message };
        }
        if (data.user) {
          const { data: prof } = await supabase.from('profiles').select('*').eq('id', data.user.id).single();
          const resolvedRole: UserRole = isAuthAdmin ? 'super_admin' : 'customer';

          const userProf: UserProfile = sanitizeProfile(
            prof || {
              id: data.user.id,
              email: data.user.email || cleanEmail,
              full_name: data.user.user_metadata?.full_name || cleanEmail.split('@')[0],
              role: resolvedRole,
              created_at: new Date().toISOString(),
            }
          );

          if (isAuthAdmin && prof?.role !== 'super_admin') {
            await supabase.from('profiles').update({ role: 'super_admin' }).eq('id', data.user.id);
          }

          setProfile(userProf);
          localStorage.setItem(AUTH_STORAGE_KEY, JSON.stringify(userProf));
          setIsLoading(false);
          return { success: true };
        }
      }

      // Local / Offline authentication handling
      let role: UserRole = isAuthAdmin ? 'super_admin' : 'customer';
      let name = isAuthAdmin ? 'Srijal Kumar (Agency Admin)' : cleanEmail.split('@')[0].replace('.', ' ');
      name = name.charAt(0).toUpperCase() + name.slice(1);

      const resolvedProfile: UserProfile = {
        id: isAuthAdmin ? 'admin-super-srijal' : 'u-' + Math.random().toString(36).substring(2, 9),
        email: cleanEmail,
        full_name: name,
        company_name: isAuthAdmin ? 'VyapaarPro Operations' : 'Client Ventures',
        role,
        phone: isAuthAdmin ? '+91 98765 43210' : '+91 98765 00000',
        created_at: new Date().toISOString(),
      };

      setProfile(resolvedProfile);
      localStorage.setItem(AUTH_STORAGE_KEY, JSON.stringify(resolvedProfile));
      setIsLoading(false);
      return { success: true };
    } catch (err: any) {
      setIsLoading(false);
      return { success: false, error: err?.message || 'Login failed' };
    }
  };

  const register = async (
    email: string,
    password?: string,
    fullName?: string,
    phone?: string,
    companyName?: string
  ): Promise<{ success: boolean; error?: string }> => {
    setIsLoading(true);
    const cleanEmail = email.toLowerCase().trim();
    const isAuthAdmin = isAuthorizedAdminEmail(cleanEmail);
    const assignedRole: UserRole = isAuthAdmin ? 'super_admin' : 'customer';

    try {
      if (isSupabaseConfigured && supabase && password) {
        const { data, error } = await supabase.auth.signUp({
          email: cleanEmail,
          password,
          options: {
            data: {
              full_name: fullName || cleanEmail.split('@')[0],
              phone: phone || '',
              company_name: companyName || '',
              role: assignedRole,
            },
          },
        });
        if (error) {
          setIsLoading(false);
          return { success: false, error: error.message };
        }
        if (data.user) {
          const newProfile: UserProfile = {
            id: data.user.id,
            email: data.user.email || cleanEmail,
            full_name: fullName || cleanEmail.split('@')[0],
            phone: phone || '',
            company_name: companyName || '',
            role: assignedRole,
            created_at: new Date().toISOString(),
          };
          setProfile(newProfile);
          localStorage.setItem(AUTH_STORAGE_KEY, JSON.stringify(newProfile));
          setIsLoading(false);
          return { success: true };
        }
      }

      // Local fallback registration
      const newProfile: UserProfile = {
        id: isAuthAdmin ? 'admin-super-srijal' : 'u-' + Math.random().toString(36).substring(2, 9),
        email: cleanEmail,
        full_name: fullName || cleanEmail.split('@')[0],
        phone: phone || '',
        company_name: companyName || '',
        role: assignedRole,
        created_at: new Date().toISOString(),
      };

      setProfile(newProfile);
      localStorage.setItem(AUTH_STORAGE_KEY, JSON.stringify(newProfile));
      setIsLoading(false);
      return { success: true };
    } catch (err: any) {
      setIsLoading(false);
      return { success: false, error: err?.message || 'Registration failed' };
    }
  };

  const logout = async () => {
    if (isSupabaseConfigured && supabase) {
      try {
        await supabase.auth.signOut();
      } catch (err) {
        console.error('Supabase signOut error:', err);
      }
    }
    setProfile(null);
    localStorage.removeItem(AUTH_STORAGE_KEY);
  };

  const updateProfile = async (data: Partial<UserProfile>): Promise<boolean> => {
    if (!profile) return false;
    // Disallow role modification by user
    const safeData = { ...data };
    delete safeData.role;

    const updated: UserProfile = sanitizeProfile({
      ...profile,
      ...safeData,
      updated_at: new Date().toISOString(),
    });

    setProfile(updated);
    localStorage.setItem(AUTH_STORAGE_KEY, JSON.stringify(updated));

    if (isSupabaseConfigured && supabase) {
      try {
        await supabase.from('profiles').update(safeData).eq('id', profile.id);
      } catch (err) {
        console.error('Supabase profile update error:', err);
      }
    }
    return true;
  };

  // Strict authorization enforcement:
  // isAdmin is ONLY true if:
  // 1. User profile exists
  // 2. Profile's email EXACTLY matches AUTHORIZED_ADMIN_EMAIL
  // 3. Role is 'admin' or 'super_admin'
  const isEmailAdmin = isAuthorizedAdminEmail(profile?.email);
  const isAdmin = Boolean(profile && isEmailAdmin && (profile.role === 'admin' || profile.role === 'super_admin'));
  const isSuperAdmin = Boolean(profile && isEmailAdmin && profile.role === 'super_admin');
  const role: UserRole | null = profile ? (isAdmin ? profile.role : 'customer') : null;

  return (
    <AuthContext.Provider
      value={{
        user: profile ? { id: profile.id, email: profile.email } : null,
        profile,
        role,
        isAdmin,
        isSuperAdmin,
        isLoading,
        authorizedAdminEmail: AUTHORIZED_ADMIN_EMAIL,
        login,
        register,
        logout,
        updateProfile,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
};
