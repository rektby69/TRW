"use client";

import { useEffect, useState, useRef } from 'react';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import { Menu, X, Sun, Moon, Globe, User, LogOut, LayoutDashboard, ChevronDown } from 'lucide-react';
import { NAV_LINKS, UI } from '@/data/content';
import { usePref } from '@/context/PrefContext';
import { useAuth } from '@/context/AuthContext';
import { cn } from '@/utils/cn';

export function Header() {
  const router = useRouter();
  const { lang, theme, toggleLang, toggleTheme } = usePref();
  const { user, profile, role, signOut } = useAuth();
  const [scrolled, setScrolled] = useState(false);
  const [open, setOpen] = useState(false);
  const [dropdownOpen, setDropdownOpen] = useState(false);
  const dropdownRef = useRef<HTMLDivElement>(null);
  const links = NAV_LINKS[lang];
  const t = UI[lang];

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 24);
    onScroll();
    window.addEventListener('scroll', onScroll, { passive: true });
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  // Close dropdown on outside click
  useEffect(() => {
    function handleClickOutside(event: MouseEvent) {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target as Node)) {
        setDropdownOpen(false);
      }
    }
    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  const handleSignOut = async () => {
    setDropdownOpen(false);
    setOpen(false);
    await signOut();
    router.push('/');
  };

  const getInitials = () => {
    if (profile?.first_name && profile?.last_name) {
      return `${profile.first_name[0]}${profile.last_name[0]}`.toUpperCase();
    }
    if (profile?.full_name) {
      return profile.full_name.substring(0, 2).toUpperCase();
    }
    return user?.email?.substring(0, 2).toUpperCase() || 'U';
  };

  return (
    <header
      className={cn(
        'fixed inset-x-0 top-0 z-50 transition-all duration-500',
        scrolled
          ? 'bg-ivory-50/90 dark:bg-ink-900/90 backdrop-blur-xl border-b border-sage-200/60 dark:border-ink-800/80 shadow-sm shadow-ink-900/5'
          : 'bg-transparent border-b border-transparent',
      )}
    >
      <nav className="mx-auto flex max-w-8xl items-center justify-between px-6 py-3.5 lg:px-10">
        <a href="#inicio" aria-label="Yoga Córdoba" className="group flex items-center transition-transform duration-300 hover:scale-[1.02]">
          <img src="/logo.svg" alt="Yoga Córdoba" className="h-11 w-auto" />
        </a>

        <ul className="hidden items-center gap-8 md:flex">
          {links.map((l) => (
            <li key={l.href}>
              <a
                href={l.href}
                className={cn(
                  'relative text-sm font-medium transition-colors after:absolute after:-bottom-1.5 after:left-0 after:h-0.5 after:w-0 after:rounded-full after:bg-clay-300 after:transition-all after:duration-300 hover:after:w-full',
                  scrolled ? 'text-ink-600 hover:text-sage-700 dark:text-ivory-300 dark:hover:text-ivory-50' : 'text-ivory-50/90 hover:text-ivory-50',
                )}
              >
                {l.label}
              </a>
            </li>
          ))}
        </ul>

        <div className="flex items-center gap-1.5">
          <button
            type="button"
            onClick={toggleLang}
            aria-label="Toggle language"
            className={cn(
            'grid h-9 w-9 place-items-center rounded-lg transition-colors',
            scrolled ? 'text-sage-800 hover:bg-sage-100 dark:text-ivory-200 dark:hover:bg-ink-800' : 'text-ivory-50 hover:bg-ink-950/20',
          )}
          >
            <Globe className="h-4.5 w-4.5" />
          </button>
          <button
            type="button"
            onClick={toggleTheme}
            aria-label={theme === 'dark' ? t.lightMode : t.darkMode}
            className={cn(
            'grid h-9 w-9 place-items-center rounded-lg transition-colors',
            scrolled ? 'text-sage-800 hover:bg-sage-100 dark:text-ivory-200 dark:hover:bg-ink-800' : 'text-ivory-50 hover:bg-ink-950/20',
          )}
          >
            {theme === 'dark' ? <Sun className="h-4.5 w-4.5" /> : <Moon className="h-4.5 w-4.5" />}
          </button>
          <a
            href="#horarios"
            className={cn(
            'hidden rounded-full px-5 py-2.5 text-sm font-semibold shadow-sm transition-all active:scale-[0.97] md:inline-flex',
            scrolled
              ? 'bg-sage-600 text-white shadow-sage-900/20 hover:bg-sage-700 hover:shadow-md'
              : 'bg-ivory-50/15 text-white ring-1 ring-ivory-100/40 backdrop-blur-sm hover:bg-ivory-50/25',
          )}
          >
            {lang === 'es' ? 'Ver horarios' : 'View schedule'}
          </a>

          {user ? (
            <div className="relative hidden md:block" ref={dropdownRef}>
              <button
                type="button"
                onClick={() => setDropdownOpen((v) => !v)}
                className={cn(
                  'flex items-center gap-2 rounded-full p-1 pl-1.5 pr-3 text-xs font-semibold transition-all active:scale-[0.97]',
                  scrolled
                    ? 'border border-sage-300 bg-white/80 text-ink-800 hover:bg-sage-50 dark:border-ink-700 dark:bg-ink-800 dark:text-ivory-100 dark:hover:bg-ink-700'
                    : 'border border-ivory-100/40 bg-ink-950/40 text-ivory-50 backdrop-blur-sm hover:bg-ink-950/60',
                )}
              >
                {/* Profile Picture or Placeholder */}
                {profile?.avatar_url ? (
                  <img
                    src={profile.avatar_url}
                    alt={profile.full_name || 'Profile'}
                    className="h-7 w-7 rounded-full object-cover border border-sage-400"
                  />
                ) : (
                  <div className="flex h-7 w-7 items-center justify-center rounded-full bg-sage-600 text-[11px] font-bold text-white shadow-xs">
                    {getInitials()}
                  </div>
                )}
                <span className="max-w-[100px] truncate">
                  {profile?.first_name || profile?.full_name?.split(' ')[0] || user.email?.split('@')[0]}
                </span>
                <ChevronDown className={cn('h-3.5 w-3.5 opacity-60 transition-transform duration-200', dropdownOpen && 'rotate-180')} />
              </button>

              {/* Dropdown Menu */}
              {dropdownOpen && (
                <div className="absolute right-0 mt-2 w-56 rounded-2xl border border-sage-200/80 dark:border-ink-800 bg-ivory-50/98 dark:bg-ink-900/98 p-1.5 shadow-xl shadow-ink-950/10 backdrop-blur-xl animate-in fade-in zoom-in-95 duration-150 z-50">
                  <div className="px-3 py-2 border-b border-sage-200/60 dark:border-ink-800/80 mb-1">
                    <p className="text-xs font-semibold text-ink-900 dark:text-white truncate">
                      {profile?.full_name || user.email?.split('@')[0]}
                    </p>
                    <p className="text-[10px] text-ink-500 dark:text-zinc-400 truncate">{user.email}</p>
                    <span className="mt-1 inline-block px-2 py-0.5 rounded text-[10px] font-semibold bg-sage-500/15 text-sage-700 dark:text-sage-300 capitalize">
                      {role || 'user'}
                    </span>
                  </div>

                  <Link
                    href="/profile"
                    onClick={() => setDropdownOpen(false)}
                    className="flex w-full items-center gap-2.5 rounded-xl px-3 py-2 text-xs font-medium text-ink-700 hover:bg-sage-100/80 dark:text-ivory-200 dark:hover:bg-ink-800 transition-colors"
                  >
                    <User className="h-4 w-4 text-sage-600 dark:text-sage-400" />
                    <span>{lang === 'es' ? 'Mi Perfil' : 'Profile'}</span>
                  </Link>

                  <Link
                    href={role === 'admin' ? '/admin/dashboard' : '/client/dashboard'}
                    onClick={() => setDropdownOpen(false)}
                    className="flex w-full items-center gap-2.5 rounded-xl px-3 py-2 text-xs font-medium text-ink-700 hover:bg-sage-100/80 dark:text-ivory-200 dark:hover:bg-ink-800 transition-colors"
                  >
                    <LayoutDashboard className="h-4 w-4 text-sage-600 dark:text-sage-400" />
                    <span>{role === 'admin' ? 'Panel Admin' : lang === 'es' ? 'Mi Panel' : 'Dashboard'}</span>
                  </Link>

                  <div className="my-1 border-t border-sage-200/60 dark:border-ink-800/80" />

                  <button
                    type="button"
                    onClick={handleSignOut}
                    className="flex w-full items-center gap-2.5 rounded-xl px-3 py-2 text-xs font-medium text-red-600 hover:bg-red-500/10 dark:text-red-400 dark:hover:bg-red-500/10 transition-colors"
                  >
                    <LogOut className="h-4 w-4" />
                    <span>{lang === 'es' ? 'Cerrar Sesión' : 'Log Out'}</span>
                  </button>
                </div>
              )}
            </div>
          ) : (
            <Link
              href="/auth/login"
              className={cn(
                'hidden items-center gap-1.5 rounded-full px-4 py-2.5 text-sm font-semibold transition-all active:scale-[0.97] md:inline-flex',
                scrolled
                  ? 'border border-sage-300 text-ink-700 hover:bg-sage-50 dark:border-ink-700 dark:text-ivory-200 dark:hover:bg-ink-800'
                  : 'border border-ivory-100/30 text-white backdrop-blur-sm hover:bg-ivory-50/15',
              )}
            >
              <User className="h-4 w-4" />
              <span>{lang === 'es' ? 'Iniciar sesión' : 'Log in'}</span>
            </Link>
          )}
          <button
            type="button"
            aria-label="Open menu"
            aria-expanded={open}
            onClick={() => setOpen((v) => !v)}
            className={cn(
            'grid h-10 w-10 place-items-center rounded-lg transition-colors md:hidden',
            scrolled ? 'text-sage-800 hover:bg-sage-100 dark:text-ivory-100 dark:hover:bg-ink-800' : 'text-ivory-50 hover:bg-ink-950/20',
          )}
          >
            {open ? <X className="h-5 w-5" /> : <Menu className="h-5 w-5" />}
          </button>
        </div>
      </nav>

      <div
        className={cn(
          'overflow-hidden bg-ivory-50/98 dark:bg-ink-900/98 backdrop-blur-xl border-b border-sage-200/60 dark:border-ink-800/80 transition-[max-height,opacity] duration-300 md:hidden',
          open ? 'max-h-[32rem] opacity-100' : 'max-h-0 opacity-0',
        )}
      >
        <ul className="px-6 py-4">
          {links.map((l) => (
            <li key={l.href}>
              <a
                href={l.href}
                onClick={() => setOpen(false)}
                className="block py-3 text-base font-medium text-ink-700 dark:text-ivory-200 border-b border-sage-200/40 dark:border-ink-800/60 last:border-0"
              >
                {l.label}
              </a>
            </li>
          ))}
          <li className="pt-4 flex flex-col gap-2.5">
            <a
              href="#horarios"
              onClick={() => setOpen(false)}
              className="block rounded-full bg-sage-600 px-6 py-3 text-center text-sm font-semibold text-white"
            >
              {lang === 'es' ? 'Ver horarios' : 'View schedule'}
            </a>
            {user ? (
              <>
                <Link
                  href="/profile"
                  onClick={() => setOpen(false)}
                  className="flex items-center justify-center gap-2 rounded-full border border-sage-300 dark:border-ink-700 bg-sage-50 dark:bg-ink-800 px-6 py-3 text-center text-sm font-semibold text-ink-800 dark:text-ivory-100"
                >
                  <User className="h-4 w-4" />
                  <span>{lang === 'es' ? 'Mi Perfil' : 'Profile'}</span>
                </Link>
                <Link
                  href={role === 'admin' ? '/admin/dashboard' : '/client/dashboard'}
                  onClick={() => setOpen(false)}
                  className="flex items-center justify-center gap-2 rounded-full border border-sage-200 dark:border-ink-700 px-6 py-2.5 text-center text-xs font-medium text-ink-700 dark:text-ivory-200"
                >
                  <LayoutDashboard className="h-4 w-4" />
                  <span>{role === 'admin' ? 'Panel Admin' : lang === 'es' ? 'Mi Panel' : 'Dashboard'}</span>
                </Link>
                <button
                  type="button"
                  onClick={handleSignOut}
                  className="flex items-center justify-center gap-2 rounded-full px-6 py-2.5 text-center text-xs font-semibold text-red-600 dark:text-red-400 hover:bg-red-500/10 transition-colors"
                >
                  <LogOut className="h-4 w-4" />
                  <span>{lang === 'es' ? 'Cerrar Sesión' : 'Log Out'}</span>
                </button>
              </>
            ) : (
              <Link
                href="/auth/login"
                onClick={() => setOpen(false)}
                className="flex items-center justify-center gap-2 rounded-full border border-sage-300 dark:border-ink-700 px-6 py-3 text-center text-sm font-semibold text-ink-700 dark:text-ivory-200 hover:bg-sage-50 dark:hover:bg-ink-800"
              >
                <User className="h-4 w-4" />
                <span>{lang === 'es' ? 'Iniciar sesión' : 'Log in'}</span>
              </Link>
            )}
          </li>
        </ul>
      </div>
    </header>
  );
}
