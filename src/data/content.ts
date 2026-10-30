import type { LucideIcon } from 'lucide-react';
import {
  Flower2, Wind, Sparkles, CircleDot, Dumbbell, HeartPulse, HandHeart,
  Users, HeartHandshake, Sprout,
} from 'lucide-react';

import type { Lang } from '@/hooks/usePreferences';

/* ---------- NAVIGATION ---------- */

export const NAV_LINKS: Record<Lang, { label: string; href: string }[]> = {
  es: [
    { label: 'Clases', href: '#clases' },
    { label: 'Horarios', href: '#horarios' },
    { label: 'El centro', href: '#centro' },
    { label: 'Contacto', href: '#contacto' },
  ],
  en: [
    { label: 'Classes', href: '#clases' },
    { label: 'Schedule', href: '#horarios' },
    { label: 'The studio', href: '#centro' },
    { label: 'Contact', href: '#contacto' },
  ],
};

/* ---------- HERO ---------- */

export const HERO: Record<Lang, {
  eyebrow: string;
  title: string;
  titleAccent: string;
  subtitle: string;
  primaryCta: string;
  secondaryCta: string;
  stat1Value: string;
  stat1Label: string;
  stat2Value: string;
  stat2Label: string;
  stat3Value: string;
  stat3Label: string;
}> = {
  es: {
    eyebrow: 'Yoga · Pilates · Movimiento consciente',
    title: 'Encuentra tu espacio para',
    titleAccent: 'moverte, respirar y sentirte mejor',
    subtitle: 'Yoga, Pilates y movimiento consciente en Córdoba. Encuentra la clase que encaja contigo y consulta los próximos horarios.',
    primaryCta: 'Ver horarios',
    secondaryCta: 'Descubrir las clases',
    stat1Value: '8',
    stat1Label: 'disciplinas distintas',
    stat2Value: '10',
    stat2Label: 'plazas máx. por grupo',
    stat3Value: '1',
    stat3Label: 'estudio en el centro de Córdoba',
  },
  en: {
    eyebrow: 'Yoga · Pilates · Mindful movement',
    title: 'Find your space to',
    titleAccent: 'move, breathe and feel better',
    subtitle: 'Yoga, Pilates and mindful movement in Córdoba. Find the class that fits you and check the upcoming schedule.',
    primaryCta: 'View schedule',
    secondaryCta: 'Discover the classes',
    stat1Value: '8',
    stat1Label: 'different disciplines',
    stat2Value: '10',
    stat2Label: 'max. places per group',
    stat3Value: '1',
    stat3Label: 'studio in central Córdoba',
  },
};

/* ---------- DISCIPLINES (Class Categories) ---------- */

export type Discipline = {
  id: string;
  name: string;
  short: string;
  description: string;
  level: string;
  duration: string;
  capacity: number;
  image: string;
  icon: LucideIcon;
  accent: string;
};

export const DISCIPLINES: Record<Lang, Discipline[]> = {
  es: [
    {
      id: 'yoga',
      name: 'Yoga',
      short: 'Posturas, respiración y movimiento consciente.',
      description: 'Práctica de posturas, respiración y movimiento consciente, adaptada a diferentes niveles.',
      level: 'Todos los niveles',
      duration: '60 min',
      capacity: 10,
      image: 'https://images.pexels.com/photos/3822672/pexels-photo-3822672.jpeg?auto=compress&cs=tinysrgb&w=1200',
      icon: Flower2,
      accent: 'sage',
    },
    {
      id: 'yoga-aereo',
      name: 'Yoga Aéreo',
      short: 'Yoga con telas suspendidas.',
      description: 'Una práctica de yoga con telas suspendidas que combina movimiento, equilibrio y flexibilidad.',
      level: 'Iniciación e intermedio',
      duration: '60 min',
      capacity: 6,
      image: 'https://images.pexels.com/photos/4999488/pexels-photo-4999488.jpeg?auto=compress&cs=tinysrgb&w=1200',
      icon: Wind,
      accent: 'clay',
    },
    {
      id: 'meditacion',
      name: 'Meditación',
      short: 'Respiración, atención plena y relajación.',
      description: 'Sesiones centradas en la respiración, la atención plena y la relajación.',
      level: 'Todos los niveles',
      duration: '45 min',
      capacity: 10,
      image: 'https://images.pexels.com/photos/6648595/pexels-photo-6648595.jpeg?auto=compress&cs=tinysrgb&w=1200',
      icon: Sparkles,
      accent: 'sage',
    },
    {
      id: 'pilates-suelo',
      name: 'Pilates Suelo',
      short: 'Pilates sobre colchoneta.',
      description: 'Ejercicios controlados sobre colchoneta para trabajar la fuerza, la estabilidad y el control corporal.',
      level: 'Todos los niveles',
      duration: '55 min',
      capacity: 10,
      image: 'https://images.pexels.com/photos/25596885/pexels-photo-25596885.jpeg?auto=compress&cs=tinysrgb&w=1200',
      icon: CircleDot,
      accent: 'sage',
    },
    {
      id: 'pilates-reformer',
      name: 'Pilates Reformer',
      short: 'Pilates con máquina Reformer.',
      description: 'Pilates con máquina Reformer y resistencia mediante muelles, para trabajar la fuerza y el control del movimiento.',
      level: 'Iniciación e intermedio',
      duration: '55 min',
      capacity: 5,
      image: 'https://images.pexels.com/photos/33360222/pexels-photo-33360222.jpeg?auto=compress&cs=tinysrgb&w=1200',
      icon: CircleDot,
      accent: 'clay',
    },
    {
      id: 'pilates-terapeutico',
      name: 'Pilates Terapéutico',
      short: 'Pilates adaptado a cada persona.',
      description: 'Sesiones de Pilates adaptadas a las necesidades y capacidades individuales. Consulta con el centro para conocer las opciones disponibles.',
      level: 'Todos los niveles',
      duration: '55 min',
      capacity: 8,
      image: 'https://images.pexels.com/photos/6111612/pexels-photo-6111612.jpeg?auto=compress&cs=tinysrgb&w=1200',
      icon: HeartPulse,
      accent: 'clay',
    },
    {
      id: 'yoga-terapeutico',
      name: 'Yoga Terapéutico',
      short: 'Yoga adaptado y consciente.',
      description: 'Práctica adaptada que prioriza el movimiento consciente, la respiración y las necesidades individuales.',
      level: 'Todos los niveles',
      duration: '60 min',
      capacity: 8,
      image: 'https://images.pexels.com/photos/6998214/pexels-photo-6998214.jpeg?auto=compress&cs=tinysrgb&w=1200',
      icon: HandHeart,
      accent: 'sage',
    },
    {
      id: 'fuerza',
      name: 'Entrenamiento de Fuerza',
      short: 'Sesiones orientadas a la fuerza.',
      description: 'Sesiones de ejercicio orientadas a desarrollar la fuerza y mejorar el control corporal.',
      level: 'Intermedio',
      duration: '50 min',
      capacity: 10,
      image: 'https://images.pexels.com/photos/38755281/pexels-photo-38755281.jpeg?auto=compress&cs=tinysrgb&w=1200',
      icon: Dumbbell,
      accent: 'clay',
    },
  ],
  en: [
    {
      id: 'yoga',
      name: 'Yoga',
      short: 'Postures, breath and mindful movement.',
      description: 'A practice of postures, breath and mindful movement, adapted to different levels.',
      level: 'All levels',
      duration: '60 min',
      capacity: 10,
      image: 'https://images.pexels.com/photos/3822672/pexels-photo-3822672.jpeg?auto=compress&cs=tinysrgb&w=1200',
      icon: Flower2,
      accent: 'sage',
    },
    {
      id: 'yoga-aereo',
      name: 'Aerial Yoga',
      short: 'Yoga with suspended fabric.',
      description: 'A yoga practice with suspended fabric that combines movement, balance and flexibility.',
      level: 'Beginner & intermediate',
      duration: '60 min',
      capacity: 6,
      image: 'https://images.pexels.com/photos/4999488/pexels-photo-4999488.jpeg?auto=compress&cs=tinysrgb&w=1200',
      icon: Wind,
      accent: 'clay',
    },
    {
      id: 'meditacion',
      name: 'Meditation',
      short: 'Breath, mindfulness and relaxation.',
      description: 'Sessions focused on breathing, mindfulness and relaxation.',
      level: 'All levels',
      duration: '45 min',
      capacity: 10,
      image: 'https://images.pexels.com/photos/6648595/pexels-photo-6648595.jpeg?auto=compress&cs=tinysrgb&w=1200',
      icon: Sparkles,
      accent: 'sage',
    },
    {
      id: 'pilates-suelo',
      name: 'Pilates Mat',
      short: 'Mat-based Pilates.',
      description: 'Controlled exercises on a mat to work on strength, stability and body control.',
      level: 'All levels',
      duration: '55 min',
      capacity: 10,
      image: 'https://images.pexels.com/photos/25596885/pexels-photo-25596885.jpeg?auto=compress&cs=tinysrgb&w=1200',
      icon: CircleDot,
      accent: 'sage',
    },
    {
      id: 'pilates-reformer',
      name: 'Pilates Reformer',
      short: 'Reformer machine Pilates.',
      description: 'Pilates with a Reformer machine and spring resistance, to work on strength and movement control.',
      level: 'Beginner & intermediate',
      duration: '55 min',
      capacity: 5,
      image: 'https://images.pexels.com/photos/33360222/pexels-photo-33360222.jpeg?auto=compress&cs=tinysrgb&w=1200',
      icon: CircleDot,
      accent: 'clay',
    },
    {
      id: 'pilates-terapeutico',
      name: 'Therapeutic Pilates',
      short: 'Pilates adapted to each person.',
      description: 'Pilates sessions adapted to individual needs and abilities. Contact the studio to learn about available options.',
      level: 'All levels',
      duration: '55 min',
      capacity: 8,
      image: 'https://images.pexels.com/photos/6111612/pexels-photo-6111612.jpeg?auto=compress&cs=tinysrgb&w=1200',
      icon: HeartPulse,
      accent: 'clay',
    },
    {
      id: 'yoga-terapeutico',
      name: 'Therapeutic Yoga',
      short: 'Adapted and mindful yoga.',
      description: 'An adapted practice that prioritizes mindful movement, breath and individual needs.',
      level: 'All levels',
      duration: '60 min',
      capacity: 8,
      image: 'https://images.pexels.com/photos/6998214/pexels-photo-6998214.jpeg?auto=compress&cs=tinysrgb&w=1200',
      icon: HandHeart,
      accent: 'sage',
    },
    {
      id: 'fuerza',
      name: 'Strength Training',
      short: 'Strength-focused sessions.',
      description: 'Exercise sessions aimed at developing strength and improving body control.',
      level: 'Intermediate',
      duration: '50 min',
      capacity: 10,
      image: 'https://images.pexels.com/photos/38755281/pexels-photo-38755281.jpeg?auto=compress&cs=tinysrgb&w=1200',
      icon: Dumbbell,
      accent: 'clay',
    },
  ],
};

export const DISCIPLINES_HEADING: Record<Lang, { eyebrow: string; title: string; description: string }> = {
  es: {
    eyebrow: 'Las clases',
    title: 'Ocho disciplinas bajo el mismo techo',
    description: 'Desde el yoga tradicional al Pilates Reformer. Explora las prácticas que ofrecemos y encuentra la que mejor encaje contigo.',
  },
  en: {
    eyebrow: 'The classes',
    title: 'Eight disciplines under one roof',
    description: 'From traditional yoga to Pilates Reformer. Explore the practices we offer and find the one that fits you best.',
  },
};

/* ---------- SCHEDULE ---------- */

export type ScheduleSession = {
  id: string;
  day: number;
  start: string;
  duration: number;
  disciplineId: string;
  disciplineName: string;
  instructor: string;
  level: string;
  capacity: number;
  booked: number;
};

export const DAYS: Record<Lang, string[]> = {
  es: ['Lunes', 'Martes', 'Miércoles', 'Jueves', 'Viernes', 'Sábado'],
  en: ['Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday'],
};

const SCHEDULE_INSTRUCTORS = ['Equipo docente', 'Profesora de yoga', 'Equipo de Pilates'];

function S(d: number, start: string, dur: number, discId: string, discName: string, level: string, cap: number, booked: number, instr = 0): ScheduleSession {
  return {
    id: `${discId}-${d}-${start}`,
    day: d,
    start,
    duration: dur,
    disciplineId: discId,
    disciplineName: discName,
    instructor: SCHEDULE_INSTRUCTORS[instr],
    level,
    capacity: cap,
    booked,
  };
}

export const SCHEDULE: ScheduleSession[] = [
  S(0, '09:00', 60, 'yoga', 'Yoga Suave', 'Todos los niveles', 10, 6),
  S(0, '10:30', 55, 'pilates-suelo', 'Pilates Mat', 'Todos los niveles', 10, 4),
  S(0, '18:00', 60, 'yoga-aereo', 'Yoga Aéreo', 'Iniciación', 6, 5),
  S(0, '19:30', 55, 'pilates-reformer', 'Pilates Reformer', 'Intermedio', 5, 3, 1),
  S(1, '09:00', 45, 'meditacion', 'Meditación', 'Todos los niveles', 10, 2),
  S(1, '10:15', 60, 'yoga', 'Yoga Vinyasa', 'Intermedio', 10, 7),
  S(1, '18:00', 50, 'fuerza', 'Fuerza funcional', 'Intermedio', 10, 5),
  S(1, '19:15', 55, 'pilates-reformer', 'Pilates Reformer', 'Iniciación', 5, 4),
  S(2, '09:30', 60, 'yoga', 'Yoga Suave', 'Todos los niveles', 10, 3),
  S(2, '11:00', 55, 'pilates-suelo', 'Pilates Mat', 'Intermedio', 10, 6),
  S(2, '18:30', 60, 'yoga-aereo', 'Yoga Aéreo', 'Intermedio', 6, 6, 2),
  S(2, '20:00', 45, 'meditacion', 'Meditación', 'Todos los niveles', 10, 1),
  S(3, '09:00', 60, 'yoga', 'Yoga Vinyasa', 'Intermedio', 10, 8),
  S(3, '10:30', 55, 'pilates-reformer', 'Pilates Reformer', 'Intermedio', 5, 5, 1),
  S(3, '18:00', 55, 'pilates-suelo', 'Pilates Mat', 'Todos los niveles', 10, 5),
  S(3, '19:30', 50, 'fuerza', 'Fuerza funcional', 'Intermedio', 10, 4),
  S(4, '09:30', 45, 'meditacion', 'Meditación', 'Todos los niveles', 10, 3),
  S(4, '10:30', 60, 'yoga-aereo', 'Yoga Aéreo', 'Iniciación', 6, 2),
  S(4, '18:00', 55, 'pilates-reformer', 'Pilates Reformer', 'Iniciación', 5, 3),
  S(4, '19:30', 60, 'yoga', 'Yoga Restaurativo', 'Todos los niveles', 10, 6),
  S(5, '10:00', 60, 'yoga', 'Yoga Suave', 'Todos los niveles', 10, 9),
  S(5, '11:30', 55, 'pilates-suelo', 'Pilates Mat', 'Todos los niveles', 10, 7),
  S(5, '12:30', 60, 'yoga-aereo', 'Yoga Aéreo', 'Iniciación', 6, 4),
];

export const SCHEDULE_HEADING: Record<Lang, {
  eyebrow: string;
  title: string;
  description: string;
  disclaimer: string;
  gridLabel: string;
  calendarLabel: string;
  filterDiscipline: string;
  filterDay: string;
  filterLevel: string;
  filterAvailability: string;
  allOption: string;
  availableOnly: string;
  emptyTitle: string;
  emptyText: string;
  clearFilters: string;
  placesLabel: string;
  placesAvailable: string;
  full: string;
  viewClass: string;
  bookClass: string;
  minLabel: string;
  dayFilter: string;
  selectedDayLabel: string;
  sessionsLabel: string;
}> = {
  es: {
    eyebrow: 'Horarios',
    title: 'La semana en el estudio',
    description: 'Consulta algunas de las clases de la semana y encuentra la práctica que mejor encaja contigo.',
    disclaimer: 'Consulta el centro para confirmar plazas y reservas.',
    gridLabel: 'Cuadrícula',
    calendarLabel: 'Calendario',
    filterDiscipline: 'Disciplina',
    filterDay: 'Día',
    filterLevel: 'Nivel',
    filterAvailability: 'Disponibilidad',
    allOption: 'Todas',
    availableOnly: 'Solo con plazas',
    emptyTitle: 'No hay sesiones que coincidan',
    emptyText: 'Prueba a cambiar los filtros para ver otras opciones.',
    clearFilters: 'Limpiar filtros',
    placesLabel: 'plazas',
    placesAvailable: 'disponibles',
    full: 'Completo',
    viewClass: 'Ver clase',
    bookClass: 'Reservar clase',
    minLabel: 'min',
    dayFilter: 'Día',
    selectedDayLabel: 'Clases del día',
    sessionsLabel: 'clases',
  },
  en: {
    eyebrow: 'Schedule',
    title: 'The week at the studio',
    description: 'Explore some of the classes taking place during the week and find the practice that fits you best.',
    disclaimer: 'Contact the studio to confirm places and bookings.',
    gridLabel: 'Grid',
    calendarLabel: 'Calendar',
    filterDiscipline: 'Discipline',
    filterDay: 'Day',
    filterLevel: 'Level',
    filterAvailability: 'Availability',
    allOption: 'All',
    availableOnly: 'With places only',
    emptyTitle: 'No sessions match your filters',
    emptyText: 'Try adjusting the filters to see other options.',
    clearFilters: 'Clear filters',
    placesLabel: 'places',
    placesAvailable: 'available',
    full: 'Full',
    viewClass: 'View class',
    bookClass: 'Book class',
    minLabel: 'min',
    dayFilter: 'Day',
    selectedDayLabel: 'Classes for the day',
    sessionsLabel: 'classes',
  },
};

/* ---------- CLASS DETAIL / BOOKING ---------- */

export const BOOKING: Record<Lang, {
  duration: string;
  instructor: string;
  level: string;
  capacity: string;
  availability: string;
  expectTitle: string;
  expectText: string;
  bookBtn: string;
  closeBtn: string;
  previewTitle: string;
  previewText: string;
  previewNote: string;
  backBtn: string;
  contactBtn: string;
}> = {
  es: {
    duration: 'Duración',
    instructor: 'Instructor/a',
    level: 'Nivel',
    capacity: 'Capacidad',
    availability: 'Disponibilidad',
    expectTitle: 'Qué esperar',
    expectText: 'Una sesión de grupo reducido con atención individualizada. Llega unos minutos antes para preparar tu material y empezar a la hora.',
    bookBtn: 'Reservar clase',
    closeBtn: 'Cerrar',
    previewTitle: 'Reserva tu clase',
    previewText: 'Has seleccionado esta clase. Contacta con el centro para confirmar tu plaza y completar la reserva.',
    previewNote: 'Para reservar tu plaza, escríbenos o llámanos y confirmamos tu sitio en la clase.',
    backBtn: 'Volver',
    contactBtn: 'Contactar con el centro',
      },
  en: {
    duration: 'Duration',
    instructor: 'Instructor',
    level: 'Level',
    capacity: 'Capacity',
    availability: 'Availability',
    expectTitle: 'What to expect',
    expectText: 'A small-group session with individual attention. Arrive a few minutes early to set up and start on time.',
    bookBtn: 'Book class',
    closeBtn: 'Close',
    previewTitle: 'Book your class',
    previewText: 'You have selected this class. Contact the studio to confirm your place and complete your booking.',
    previewNote: 'To book for real, contact the studio directly or through their official website.',
    backBtn: 'Back',
    contactBtn: 'Contact the studio',
      },
};

/* ---------- STUDIO / TEACHING APPROACH ---------- */

export type StudioPoint = { icon: LucideIcon; title: string; text: string };

export const STUDIO_POINTS: Record<Lang, StudioPoint[]> = {
  es: [
    { icon: Users, title: 'Grupos reducidos', text: 'Clases con plazas limitadas para que cada persona reciba atención y corrección individual.' },
    { icon: Sparkles, title: 'Varias prácticas', text: 'Yoga, Pilates suelo y Reformer, meditación y fuerza. Diferentes disciplinas en un mismo espacio.' },
    { icon: HeartHandshake, title: 'Atención adaptada', text: 'Ajustamos las sesiones a distintas capacidades, limitaciones y momentos de cada persona.' },
    { icon: Sprout, title: 'Un lugar para progresar', text: 'Un entorno acogedor y constante donde construir una práctica sostenida a lo largo del tiempo.' },
  ],
  en: [
    { icon: Users, title: 'Small groups', text: 'Classes with limited places so each person receives individual attention and correction.' },
    { icon: Sparkles, title: 'Multiple practices', text: 'Yoga, mat and Reformer Pilates, meditation and strength. Different disciplines in one space.' },
    { icon: HeartHandshake, title: 'Adapted attention', text: 'We adjust sessions to different abilities, limitations and moments of each person.' },
    { icon: Sprout, title: 'A place to progress', text: 'A welcoming and consistent environment to build a sustained practice over time.' },
  ],
};

export const STUDIO_HEADING: Record<Lang, { eyebrow: string; title: string; description: string }> = {
  es: {
    eyebrow: 'El centro',
    title: 'Un espacio pensado para practicar a tu ritmo',
    description: 'Yoga Córdoba es un estudio dedicado al yoga, el Pilates y el movimiento consciente. Trabajamos en grupos pequeños para cuidar cada práctica.',
  },
  en: {
    eyebrow: 'The studio',
    title: 'A space designed to practise at your pace',
    description: 'Yoga Córdoba is a studio dedicated to yoga, Pilates and mindful movement. We work in small groups to care for every practice.',
  },
};

/* ---------- INSTRUCTORS ---------- */

export type Instructor = {
  name: string;
  role: string;
  bio: string;
  image: string;
  placeholder: boolean;
};

export const INSTRUCTORS: Record<Lang, Instructor[]> = {
  es: [
    {
      name: 'Equipo docente',
      role: 'Yoga y Pilates',
      bio: 'Un equipo cercano que acompaña cada práctica con atención, claridad y experiencia.',
      image: 'https://images.pexels.com/photos/8436555/pexels-photo-8436555.jpeg?auto=compress&cs=tinysrgb&w=800',
      placeholder: true,
    },
    {
      name: 'Perfil de ejemplo',
      role: 'Yoga aéreo',
      bio: 'Una práctica adaptada para explorar el movimiento, la respiración y la confianza en el cuerpo.',
      image: 'https://images.pexels.com/photos/6582867/pexels-photo-6582867.jpeg?auto=compress&cs=tinysrgb&w=800',
      placeholder: true,
    },
    {
      name: 'Perfil de ejemplo',
      role: 'Pilates Reformer',
      bio: 'Una práctica adaptada para explorar el movimiento, la respiración y la confianza en el cuerpo.',
      image: 'https://images.pexels.com/photos/8436399/pexels-photo-8436399.jpeg?auto=compress&cs=tinysrgb&w=800',
      placeholder: true,
    },
  ],
  en: [
    {
      name: 'Teaching team',
      role: 'Yoga & Pilates',
      bio: 'A welcoming team that guides each practice with care, clarity and experience.',
      image: 'https://images.pexels.com/photos/8436555/pexels-photo-8436555.jpeg?auto=compress&cs=tinysrgb&w=800',
      placeholder: true,
    },
    {
      name: 'Sample profile',
      role: 'Aerial yoga',
      bio: 'Instructor profile. Information for the corresponding instructor will appear here.',
      image: 'https://images.pexels.com/photos/6582867/pexels-photo-6582867.jpeg?auto=compress&cs=tinysrgb&w=800',
      placeholder: true,
    },
    {
      name: 'Sample profile',
      role: 'Pilates Reformer',
      bio: 'Instructor profile. Information for the corresponding instructor will appear here.',
      image: 'https://images.pexels.com/photos/8436399/pexels-photo-8436399.jpeg?auto=compress&cs=tinysrgb&w=800',
      placeholder: true,
    },
  ],
};

export const INSTRUCTORS_HEADING: Record<Lang, { eyebrow: string; title: string; description: string }> = {
  es: {
    eyebrow: 'Equipo',
    title: 'Quién guía las clases',
    description: 'Conoce a las personas que acompañan cada práctica con atención y cercanía.',
  },
  en: {
    eyebrow: 'Team',
    title: 'Who guides the classes',
    description: 'Meet the people who guide each practice with care and attention.',
  },
};

/* ---------- GALLERY ---------- */

export type GalleryItem = { alt: string; image: string; span?: boolean };

export const GALLERY: Record<Lang, GalleryItem[]> = {
  es: [
    { alt: 'Sesión de yoga en el estudio', image: 'https://images.pexels.com/photos/3822356/pexels-photo-3822356.jpeg?auto=compress&cs=tinysrgb&w=900', span: true },
    { alt: 'Yoga aéreo con hamacas suspendidas', image: 'https://images.pexels.com/photos/4999408/pexels-photo-4999408.jpeg?auto=compress&cs=tinysrgb&w=900' },
    { alt: 'Sala de Pilates Reformer', image: 'https://images.pexels.com/photos/18499500/pexels-photo-18499500.png?auto=compress&cs=tinysrgb&w=900' },
    { alt: 'Clase de Pilates suelo', image: 'https://images.pexels.com/photos/6339447/pexels-photo-6339447.jpeg?auto=compress&cs=tinysrgb&w=900' },
    { alt: 'Interior del estudio', image: 'https://images.pexels.com/photos/8146214/pexels-photo-8146214.jpeg?auto=compress&cs=tinysrgb&w=900' },
  ],
  en: [
    { alt: 'Yoga session at the studio', image: 'https://images.pexels.com/photos/3822356/pexels-photo-3822356.jpeg?auto=compress&cs=tinysrgb&w=900', span: true },
    { alt: 'Aerial yoga with suspended hammocks', image: 'https://images.pexels.com/photos/4999408/pexels-photo-4999408.jpeg?auto=compress&cs=tinysrgb&w=900' },
    { alt: 'Pilates Reformer room', image: 'https://images.pexels.com/photos/18499500/pexels-photo-18499500.png?auto=compress&cs=tinysrgb&w=900' },
    { alt: 'Pilates Mat class', image: 'https://images.pexels.com/photos/6339447/pexels-photo-6339447.jpeg?auto=compress&cs=tinysrgb&w=900' },
    { alt: 'Studio interior', image: 'https://images.pexels.com/photos/8146214/pexels-photo-8146214.jpeg?auto=compress&cs=tinysrgb&w=900' },
  ],
};

export const GALLERY_HEADING: Record<Lang, { eyebrow: string; title: string; description: string }> = {
  es: {
    eyebrow: 'Galería',
    title: 'El espacio y la práctica',
    description: 'Una mirada a las salas y las disciplinas del estudio. Las imágenes son de muestra y no corresponden necesariamente a las instalaciones reales.',
  },
  en: {
    eyebrow: 'Gallery',
    title: 'The space and the practice',
    description: 'A look at the rooms and disciplines of the studio. Images are samples and do not necessarily show the actual facilities.',
  },
};

/* ---------- GETTING STARTED ---------- */

export type Step = { n: number; title: string; text: string };

export const GETTING_STARTED: Record<Lang, { heading: { eyebrow: string; title: string; description: string }; steps: Step[]; cta: string }> = {
  es: {
    heading: {
      eyebrow: 'Primeros pasos',
      title: 'Cómo empezar',
      description: 'Cuatro pasos sencillos para dar el primero. No necesitas experiencia previa ni tener todo decidido.',
    },
    steps: [
      { n: 1, title: 'Explora las clases', text: 'Revisa las disciplinas que ofrecemos y descubre cuál despierta tu interés.' },
      { n: 2, title: 'Consulta los horarios', text: 'Mira la semana y filtra por día, disciplina o nivel para encontrar tu hueco.' },
      { n: 3, title: 'Elige tu sesión', text: 'Selecciona la clase que mejor encaje contigo y comprueba las plazas disponibles.' },
      { n: 4, title: 'Reserva o contacta', text: 'Sigue las indicaciones para reservar tu plaza o escribir al centro.' },
    ],
    cta: 'Encuentra tu clase',
  },
  en: {
    heading: {
      eyebrow: 'Getting started',
      title: 'How to begin',
      description: 'Four simple steps to take the first one. No previous experience needed and you don\'t need everything figured out.',
    },
    steps: [
      { n: 1, title: 'Explore the classes', text: 'Review the disciplines we offer and discover what sparks your interest.' },
      { n: 2, title: 'Check the schedule', text: 'Look at the week and filter by day, discipline or level to find your slot.' },
      { n: 3, title: 'Choose your session', text: 'Select the class that fits you best and check available places.' },
      { n: 4, title: 'Book or get in touch', text: 'Follow the steps to book your place or write to the studio.' },
    ],
    cta: 'Find your class',
  },
};

/* ---------- CONTACT / LOCATION ---------- */

export const CONTACT: Record<Lang, {
  eyebrow: string;
  title: string;
  description: string;
  addressLabel: string;
  addressValue: string;
  cityValue: string;
  websiteLabel: string;
  websiteValue: string;
  websiteHref: string;
  hoursLabel: string;
  hoursValue: string;
  note: string;
  cta: string;
}> = {
  es: {
    eyebrow: 'Contacto y ubicación',
    title: 'Ven a conocer el estudio',
    description: 'Estamos en el centro histórico de Córdoba. Para horarios, reservas y dudas, puedes escribirnos o llamarnos y te atendemos encantados.',
    addressLabel: 'Dónde estamos',
    addressValue: 'En el centro de Córdoba',
    cityValue: 'Andalucía, España',
    websiteLabel: 'Reservas',
    websiteValue: 'hola@yogacordoba.es',
    websiteHref: 'mailto:hola@yogacordoba.es',
    hoursLabel: 'Información',
    hoursValue: 'Consulta horarios y disponibilidad en la sección de arriba o escríbenos para reservar tu plaza.',
    note: 'Indicativa de un estudio ficticio de muestra en Córdoba. Los datos de contacto son orientativos.',
    cta: 'Escríbenos',
  },
  en: {
    eyebrow: 'Contact & location',
    title: 'Come and visit the studio',
    description: 'We are in the historic centre of Córdoba. For schedules, bookings and questions, you can write to us or call us and we\'ll be happy to help.',
    addressLabel: 'Where to find us',
    addressValue: 'In central Córdoba',
    cityValue: 'Andalusia, Spain',
    websiteLabel: 'Bookings',
    websiteValue: 'hello@yogacordoba.es',
    websiteHref: 'mailto:hello@yogacordoba.es',
    hoursLabel: 'Information',
    hoursValue: 'Check schedules and availability in the section above, or write to us to book your place.',
    note: 'Indicative of a sample fictional studio in Córdoba. Contact details are for reference only.',
    cta: 'Get in touch',
  },
};

/* ---------- FOOTER ---------- */

export const FOOTER: Record<Lang, {
  brand: string;
  tagline: string;
  navTitle: string;
  contactTitle: string;
  legalTitle: string;
  privacy: string;
  terms: string;
  cookies: string;
  copyright: string;
  website: string;
  websiteHref: string;
  currentNote: string;
}> = {
  es: {
    brand: 'Yoga Córdoba',
    tagline: 'Yoga, Pilates y movimiento consciente en Córdoba.',
    navTitle: 'Navegación',
    contactTitle: 'Contacto',
    legalTitle: 'Legal',
    privacy: 'Política de privacidad',
    terms: 'Aviso legal',
    cookies: 'Cookies',
    copyright: '© {year} Yoga Córdoba.',
    website: 'Escríbenos',
    websiteHref: 'mailto:hola@yogacordoba.es',
    currentNote: ''
  },
  en: {
    brand: 'Yoga Córdoba',
    tagline: 'Yoga, Pilates and mindful movement in Córdoba.',
    navTitle: 'Navigation',
    contactTitle: 'Contact',
    legalTitle: 'Legal',
    privacy: 'Privacy policy',
    terms: 'Legal notice',
    cookies: 'Cookies',
    copyright: '© {year} Yoga Córdoba.',
    website: 'Get in touch',
    websiteHref: 'mailto:hello@yogacordoba.es',
    currentNote: ''
  },
};

/* ---------- THEME / LANG TOGGLES ---------- */

/* ---------- FAQ ---------- */

export const FAQS: Record<Lang, { q: string; a: string }[]> = {
  es: [
    { q: '¿Necesito experiencia previa para empezar?', a: 'No. La mayoría de nuestras clases son para todos los niveles, incluidas personas que nunca han practicado. Las instructoras adaptan las posturas y opciones para que cada persona empiece a su ritmo.' },
    { q: '¿Qué debo llevar a la clase?', a: 'Ropa cómoda que permita moverte con libertad. Nosotros proporcionamos colchonetas y material para Pilates suelo. Para Reformer y yoga aéreo no necesitas nada extra.' },
    { q: '¿Cómo reservo una plaza?', a: 'Puedes consultar el horario semanal en esta página y ver la disponibilidad de cada sesión. Para reservar, escríbenos o llámanos y confirmamos tu plaza en la clase.' },
    { q: '¿Los grupos son reducidos?', a: 'Sí. Limitamos las plazas a un máximo de 10 personas por clase, y 5-6 en sesiones de Reformer y yoga aéreo. Así aseguramos atención individual y corrección.' },
    { q: '¿Puedo probar antes de apuntarme?', a: 'Por supuesto. Te recomendamos contactar con el centro para concertar una clase de prueba o una visita al estudio antes de decidir.' },
    { q: '¿Tienen política de cancelación?', a: 'Sí, se solicita avisar con antelación suficiente si no puedes asistir, especialmente en clases con plazas muy limitadas como Reformer o yoga aéreo. Consulta las condiciones con el centro.' },
  ],
  en: [
    { q: 'Do I need previous experience to start?', a: 'No. Most of our classes are for all levels, including complete beginners. Instructors adapt postures and offer options so everyone can start at their own pace.' },
    { q: 'What should I bring to class?', a: 'Comfortable clothing that lets you move freely. We provide mats and props for mat Pilates. For Reformer and aerial yoga you don\'t need anything extra.' },
    { q: 'How do I book a place?', a: 'You can check the weekly schedule on this page and see availability for each session. To book, write to us or call us and we\'ll confirm your place in the class.' },
    { q: 'Are the groups small?', a: 'Yes. We limit places to a maximum of 10 per class, and 5-6 in Reformer and aerial yoga sessions. This ensures individual attention and correction.' },
    { q: 'Can I try a class before signing up?', a: 'Of course. We recommend contacting the studio to arrange a trial class or a studio visit before you decide.' },
    { q: 'Is there a cancellation policy?', a: 'Yes, we ask that you give sufficient notice if you can\'t attend, especially for classes with very limited places like Reformer or aerial yoga. Check the conditions with the studio.' },
  ],
};

export const FAQ_HEADING: Record<Lang, { eyebrow: string; title: string; description: string }> = {
  es: {
    eyebrow: 'Preguntas frecuentes',
    title: 'Resolvemos tus dudas',
    description: 'Lo más habitual antes de empezar. Si tienes otra pregunta, escríbenos y te responderemos lo antes posible.',
  },
  en: {
    eyebrow: 'Frequently asked questions',
    title: 'We answer your questions',
    description: 'The most common questions before starting. If you have another one, write to us and we\'ll get back to you soon.',
  },
};

/* ---------- REVIEWS ---------- */

export type Review = { name: string; project: string };

export const REVIEWS: Record<Lang, Review[]> = {
  es: [
    { name: 'María G.', project: 'Yoga Suave' },
    { name: 'Carlos R.', project: 'Pilates Reformer' },
    { name: 'Lucía F.', project: 'Yoga Aéreo' },
  ],
  en: [
    { name: 'María G.', project: 'Gentle Yoga' },
    { name: 'Carlos R.', project: 'Pilates Reformer' },
    { name: 'Lucía F.', project: 'Aerial Yoga' },
  ],
};

export const REVIEWS_HEADING: Record<Lang, { eyebrow: string; title: string; description: string; disclaimer: string }> = {
  es: {
    eyebrow: 'Opiniones',
    title: 'Lo que dicen quienes practican con nosotros',
    description: 'Las reseñas reales de quienes ya forman parte del estudio aparecerán aquí. Mientras tanto, esto es lo que buscamos que cada persona viva en cada sesión.',
    disclaimer: 'Las opiniones verificadas de la comunidad aparecerán aquí próximamente.'
  },
  en: {
    eyebrow: 'Reviews',
    title: 'What people who practise with us say',
    description: 'Real reviews from those who are already part of the studio will appear here. In the meantime, this is what we aim for every person to experience in each session.',
    disclaimer: 'Verified community reviews will appear here soon.'
  },
};

/* ---------- FINAL CTA ---------- */

export const FINAL_CTA: Record<Lang, { title: string; description: string; button: string }> = {
  es: {
    title: 'Tu primera clase te espera',
    description: 'Da el primer paso hoy. Explora las disciplinas, elige tu horario y reserva tu plaza en el estudio.',
    button: 'Empezar ahora',
  },
  en: {
    title: 'Your first class is waiting',
    description: 'Take the first step today. Explore the disciplines, choose your time and book your place at the studio.',
    button: 'Get started',
  },
};

/* ---------- THEME / LANG TOGGLES ---------- */

export const UI: Record<Lang, { lightMode: string; darkMode: string; spanish: string; english: string }> = {
  es: { lightMode: 'Modo claro', darkMode: 'Modo oscuro', spanish: 'ES', english: 'EN' },
  en: { lightMode: 'Light mode', darkMode: 'Dark mode', spanish: 'ES', english: 'EN' },
};
