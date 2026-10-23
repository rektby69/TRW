import type { LucideIcon } from 'lucide-react';
import {
  MessageSquare, Compass, ClipboardCheck,
  Hammer, Ruler, ShieldCheck, Layers,
  PencilRuler, HandCoins, CalendarCheck,
} from 'lucide-react';

import type { Lang } from '@/hooks/usePreferences';

/* ---------- NAVIGATION ---------- */

export const NAV_LINKS: Record<Lang, { label: string; href: string }[]> = {
  es: [
    { label: 'Servicios', href: '#servicios' },
    { label: 'Proyectos', href: '#proyectos' },
    { label: 'Proceso', href: '#proceso' },
    { label: 'Preguntas', href: '#faq' },
    { label: 'Contacto', href: '#contacto' },
  ],
  en: [
    { label: 'Services', href: '#servicios' },
    { label: 'Projects', href: '#proyectos' },
    { label: 'Process', href: '#proceso' },
    { label: 'FAQ', href: '#faq' },
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
    eyebrow: 'Reformas de cocinas y baños',
    title: 'Una cocina o un baño que',
    titleAccent: 'encaja contigo',
    subtitle: 'Te acompañamos en las decisiones importantes para crear un espacio funcional, cuidado y pensado para tu hogar.',
    primaryCta: 'Solicita un presupuesto',
    secondaryCta: 'Ver proyectos',
    stat1Value: '15+',
    stat1Label: 'años de oficio',
    stat2Value: '200+',
    stat2Label: 'reformas completadas',
    stat3Value: '100%',
    stat3Label: 'presupuesto sin compromiso',
  },
  en: {
    eyebrow: 'Kitchen & bathroom renovations',
    title: 'A kitchen or bathroom that',
    titleAccent: 'fits you',
    subtitle: 'We guide you through the important decisions to create a functional, well-crafted space designed for your home.',
    primaryCta: 'Request a quote',
    secondaryCta: 'View projects',
    stat1Value: '15+',
    stat1Label: 'years of craft',
    stat2Value: '200+',
    stat2Label: 'renovations completed',
    stat3Value: '100%',
    stat3Label: 'obligation-free quotes',
  },
};

/* ---------- SERVICES ---------- */

export type ServiceItem = {
  title: string;
  description: string;
  image: string;
  featured: boolean;
  features: string[];
};

export const SERVICES: Record<Lang, ServiceItem[]> = {
  es: [
    {
      title: 'Reforma de cocinas',
      description: 'Diseño y renovación completa de cocinas: distribución, carpintería a medida, encimeras, iluminación y acabados pensados para el uso diario.',
      image: 'https://images.pexels.com/photos/4800175/pexels-photo-4800175.jpeg?auto=compress&cs=tinysrgb&w=1200',
      featured: true,
      features: ['Diseño y distribución', 'Carpintería a medida', 'Encimeras de granito y mármol', 'Iluminación integrada'],
    },
    {
      title: 'Reforma de baños',
      description: 'Renovación integral de baños con soluciones de fontanería, revestimientos impermeables, mamparas y materiales de fácil mantenimiento.',
      image: 'https://images.pexels.com/photos/8146211/pexels-photo-8146211.jpeg?auto=compress&cs=tinysrgb&w=1200',
      featured: true,
      features: ['Fontanería completa', 'Revestimientos y mamparas', 'Ducha o bañera a medida', 'Ventilación e impermeabilización'],
    },
    {
      title: 'Carpintería y encimeras',
      description: 'Muebles a medida, frentes de cocina y encimeras en distintos materiales, adaptados al espacio y al presupuesto.',
      image: 'https://images.pexels.com/photos/8583696/pexels-photo-8583696.jpeg?auto=compress&cs=tinysrgb&w=940',
      featured: false,
      features: ['Muebles a medida', 'Frentes de cocina', 'Encimeras de cuarzo y madera'],
    },
    {
      title: 'Suelos y revestimientos',
      description: 'Colocación de cerámica, porcelánico y otros acabados para suelos y paredes, con preparación previa y rejuntado cuidado.',
      image: 'https://images.pexels.com/photos/6175107/pexels-photo-6175107.jpeg?auto=compress&cs=tinysrgb&w=940',
      featured: false,
      features: ['Cerámica y porcelánico', 'Preparación de superficies', 'Rejuntado y acabados'],
    },
  ],
  en: [
    {
      title: 'Kitchen renovations',
      description: 'Complete kitchen design and renovation: layout, custom cabinetry, countertops, lighting, and finishes built for daily use.',
      image: 'https://images.pexels.com/photos/4800175/pexels-photo-4800175.jpeg?auto=compress&cs=tinysrgb&w=1200',
      featured: true,
      features: ['Design & layout', 'Custom cabinetry', 'Granite & marble countertops', 'Integrated lighting'],
    },
    {
      title: 'Bathroom renovations',
      description: 'Complete bathroom renovation with plumbing solutions, waterproof finishes, glass enclosures, and low-maintenance materials.',
      image: 'https://images.pexels.com/photos/8146211/pexels-photo-8146211.jpeg?auto=compress&cs=tinysrgb&w=1200',
      featured: true,
      features: ['Full plumbing', 'Tiling & enclosures', 'Custom shower or tub', 'Ventilation & waterproofing'],
    },
    {
      title: 'Cabinetry & countertops',
      description: 'Custom furniture, kitchen fronts, and countertops in various materials, adapted to your space and budget.',
      image: 'https://images.pexels.com/photos/8583696/pexels-photo-8583696.jpeg?auto=compress&cs=tinysrgb&w=940',
      featured: false,
      features: ['Bespoke furniture', 'Kitchen fronts', 'Quartz & wood countertops'],
    },
    {
      title: 'Flooring & tiling',
      description: 'Ceramic, porcelain, and other floor and wall finishes, with proper surface preparation and careful grouting.',
      image: 'https://images.pexels.com/photos/6175107/pexels-photo-6175107.jpeg?auto=compress&cs=tinysrgb&w=940',
      featured: false,
      features: ['Ceramic & porcelain', 'Surface preparation', 'Grouting & finishing'],
    },
  ],
};

export const SERVICES_HEADING: Record<Lang, { eyebrow: string; title: string; description: string }> = {
  es: {
    eyebrow: 'Qué hacemos',
    title: 'Servicios de reforma, de principio a fin',
    description: 'Nos ocupamos de cada fase para que no tengas que coordinar varios proveedores ni preocuparte por los detalles.',
  },
  en: {
    eyebrow: 'What we do',
    title: 'Renovation services from start to finish',
    description: 'We handle every phase so you don\'t have to coordinate multiple contractors or worry about the details.',
  },
};

/* ---------- GUIDANCE ---------- */

export type GuidanceStep = { icon: LucideIcon; title: string; text: string };

export const GUIDANCE_STEPS: Record<Lang, GuidanceStep[]> = {
  es: [
    {
      icon: MessageSquare,
      title: 'Habla de tus ideas',
      text: 'Cuéntanos qué quieres cambiar, tus necesidades y lo que te preocupa. No hace falta tener todo decidido.',
    },
    {
      icon: Compass,
      title: 'Orientación práctica',
      text: 'Te guiamos sobre distribuciones, materiales y opciones realistas que se ajustan a tu vivienda y tu presupuesto.',
    },
    {
      icon: ClipboardCheck,
      title: 'Entiende los pasos',
      text: 'Sabrás qué trabajos se proponen y qué ocurre después antes de comprometerte a nada.',
    },
  ],
  en: [
    {
      icon: MessageSquare,
      title: 'Share your ideas',
      text: 'Tell us what you want to change, your needs, and what worries you. You don\'t need to have everything decided.',
    },
    {
      icon: Compass,
      title: 'Practical guidance',
      text: 'We advise on layouts, materials, and realistic options that fit your home and your budget.',
    },
    {
      icon: ClipboardCheck,
      title: 'Understand the steps',
      text: 'You\'ll know what work is proposed and what happens next before committing to anything.',
    },
  ],
};

export const GUIDANCE_HEADING: Record<Lang, { eyebrow: string; title: string; description: string }> = {
  es: {
    eyebrow: '¿No sabes por dónde empezar?',
    title: 'No necesitas tener todo decidido para hablar con nosotros',
    description: 'Una reforma empieza por entender qué necesitas y resolver las dudas importantes antes de la obra.',
  },
  en: {
    eyebrow: 'Don\'t know where to start?',
    title: 'You don\'t need everything figured out to talk to us',
    description: 'A renovation starts with understanding what you need and resolving the important questions before construction begins.',
  },
};

/* ---------- PORTFOLIO ---------- */

export type PortfolioItem = { title: string; category: string; image: string; tall?: boolean };

export const PORTFOLIO_ITEMS: Record<Lang, PortfolioItem[]> = {
  es: [
    { title: 'Cocina con isla de mármol', category: 'Cocinas', image: 'https://images.pexels.com/photos/4800175/pexels-photo-4800175.jpeg?auto=compress&cs=tinysrgb&w=900', tall: true },
    { title: 'Baño de mármol con ducha', category: 'Baños', image: 'https://images.pexels.com/photos/8146211/pexels-photo-8146211.jpeg?auto=compress&cs=tinysrgb&w=900' },
    { title: 'Cocina blanca y madera', category: 'Cocinas', image: 'https://images.pexels.com/photos/8583696/pexels-photo-8583696.jpeg?auto=compress&cs=tinysrgb&w=900' },
    { title: 'Baño contemporáneo con mampara', category: 'Baños', image: 'https://images.pexels.com/photos/8082223/pexels-photo-8082223.jpeg?auto=compress&cs=tinysrgb&w=900' },
    { title: 'Cocina con encimera de cuarzo', category: 'Cocinas', image: 'https://images.pexels.com/photos/38071645/pexels-photo-38071645.jpeg?auto=compress&cs=tinysrgb&w=900' },
    { title: 'Baño minimalista con bañera', category: 'Baños', image: 'https://images.pexels.com/photos/7195883/pexels-photo-7195883.jpeg?auto=compress&cs=tinysrgb&w=900', tall: true },
    { title: 'Cocina abierta con penachos', category: 'Cocinas', image: 'https://images.pexels.com/photos/5502219/pexels-photo-5502219.jpeg?auto=compress&cs=tinysrgb&w=900' },
    { title: 'Baño de invitados elegante', category: 'Baños', image: 'https://images.pexels.com/photos/35868666/pexels-photo-35868666.jpeg?auto=compress&cs=tinysrgb&w=900' },
  ],
  en: [
    { title: 'Kitchen with marble island', category: 'Kitchens', image: 'https://images.pexels.com/photos/4800175/pexels-photo-4800175.jpeg?auto=compress&cs=tinysrgb&w=900', tall: true },
    { title: 'Marble bathroom with shower', category: 'Bathrooms', image: 'https://images.pexels.com/photos/8146211/pexels-photo-8146211.jpeg?auto=compress&cs=tinysrgb&w=900' },
    { title: 'White and wood kitchen', category: 'Kitchens', image: 'https://images.pexels.com/photos/8583696/pexels-photo-8583696.jpeg?auto=compress&cs=tinysrgb&w=900' },
    { title: 'Contemporary bathroom with enclosure', category: 'Bathrooms', image: 'https://images.pexels.com/photos/8082223/pexels-photo-8082223.jpeg?auto=compress&cs=tinysrgb&w=900' },
    { title: 'Kitchen with quartz countertop', category: 'Kitchens', image: 'https://images.pexels.com/photos/38071645/pexels-photo-38071645.jpeg?auto=compress&cs=tinysrgb&w=900' },
    { title: 'Minimalist bathroom with tub', category: 'Bathrooms', image: 'https://images.pexels.com/photos/7195883/pexels-photo-7195883.jpeg?auto=compress&cs=tinysrgb&w=900', tall: true },
    { title: 'Open kitchen with pendant lights', category: 'Kitchens', image: 'https://images.pexels.com/photos/5502219/pexels-photo-5502219.jpeg?auto=compress&cs=tinysrgb&w=900' },
    { title: 'Elegant guest bathroom', category: 'Bathrooms', image: 'https://images.pexels.com/photos/35868666/pexels-photo-35868666.jpeg?auto=compress&cs=tinysrgb&w=900' },
  ],
};

export const PORTFOLIO_CATEGORIES: Record<Lang, readonly string[]> = {
  es: ['Todos', 'Cocinas', 'Baños'] as const,
  en: ['All', 'Kitchens', 'Bathrooms'] as const,
};

export const PORTFOLIO_HEADING: Record<Lang, { eyebrow: string; title: string; description: string; disclaimer: string }> = {
  es: {
    eyebrow: 'Proyectos',
    title: 'Ejemplos de reformas realizadas',
    description: 'Una selección para ayudarte a imaginar lo que es posible en tu vivienda.',
    disclaimer: 'Imágenes de muestra para la demostración. No corresponden a proyectos reales de la empresa.',
  },
  en: {
    eyebrow: 'Projects',
    title: 'Examples of completed renovations',
    description: 'A selection to help you imagine what\'s possible in your home.',
    disclaimer: 'Sample images for demonstration. They do not represent actual company projects.',
  },
};

/* ---------- TRUST ---------- */

export type TrustPoint = { icon: LucideIcon; title: string; text: string };

export const TRUST_POINTS: Record<Lang, TrustPoint[]> = {
  es: [
    { icon: Hammer, title: 'Trabajo bien hecho', text: 'Cuidamos los detalles que se ven y los que no. Cada fase se ejecuta con esmero y materiales adecuados.' },
    { icon: ShieldCheck, title: 'Comunicación clara', text: 'Explicamos lo que vamos a hacer y por qué. Recomendaciones honestas, sin sorpresas ni cambios a última hora.' },
    { icon: Compass, title: 'Acompañamiento', text: 'Te orientamos durante todo el proceso, desde la primera conversación hasta la entrega de la reforma.' },
    { icon: Ruler, title: 'Enfoque profesional', text: 'Planificamos cada fase con método. Trabajos secuenciales, tiempos realistas y limpieza de la obra.' },
  ],
  en: [
    { icon: Hammer, title: 'Well-crafted work', text: 'We care for the details you see and the ones you don\'t. Every phase is executed with care and proper materials.' },
    { icon: ShieldCheck, title: 'Clear communication', text: 'We explain what we\'ll do and why. Honest recommendations, no surprises or last-minute changes.' },
    { icon: Compass, title: 'Guidance throughout', text: 'We support you through the entire process, from the first conversation to the final handover.' },
    { icon: Ruler, title: 'Professional approach', text: 'We plan every phase methodically. Sequential work, realistic timelines, and a clean work site.' },
  ],
};

export const TRUST_HEADING: Record<Lang, { eyebrow: string; title: string; description: string }> = {
  es: {
    eyebrow: 'Por qué confiar en nosotros',
    title: 'Una reforma bien planificada empieza con confianza',
    description: 'Elegir a quien va a reformar tu casa no es una decisión menor. Por eso nos tomamos el tiempo de explicarte todo lo que necesitas saber.',
  },
  en: {
    eyebrow: 'Why trust us',
    title: 'A well-planned renovation starts with trust',
    description: 'Choosing who will renovate your home is no small decision. That\'s why we take the time to explain everything you need to know.',
  },
};

export const TRUST_PROFILE: Record<Lang, { name: string; role: string; bio: string; note: string }> = {
  es: {
    name: 'Marcos Fernández',
    role: 'Carpintería y reformas integrales',
    bio: 'Más de 15 años transformando cocinas y baños en la zona de Madrid. Empecé como carpintero y poco a poco fui ampliando el equipo para ofrecer reformas completas. Me gusta visitar la vivienda, entender cómo vive cada familia y proponer soluciones que realmente mejoren el día a día. Antes de empezar cualquier obra, nos sentamos a revisar juntos el presupuesto y el calendario.',
    note: 'Verifica que cualquier titulación o experiencia mencionada se pueda acreditar antes de publicar la página.',
  },
  en: {
    name: 'Marcos Fernández',
    role: 'Carpentry & full renovations',
    bio: 'Over 15 years transforming kitchens and bathrooms in the Madrid area. I started as a carpenter and gradually built a team to offer complete renovations. I like visiting the home, understanding how each family lives, and proposing solutions that genuinely improve daily life. Before starting any work, we sit down together to review the budget and timeline.',
    note: 'Verify that any qualifications or experience mentioned can be accredited before publishing.',
  },
};

/* ---------- PROCESS ---------- */

export type ProcessStep = { icon: LucideIcon; n: number; title: string; text: string };

export const PROCESS_STEPS: Record<Lang, ProcessStep[]> = {
  es: [
    { icon: MessageSquare, n: 1, title: 'Cuéntanos tu proyecto', text: 'Comparte qué quieres cambiar y qué es lo más importante para ti.' },
    { icon: Compass, n: 2, title: 'Definimos el enfoque', text: 'Aclaramos tus necesidades, dudas y los trabajos que se están valorando.' },
    { icon: PencilRuler, n: 3, title: 'Revisas la propuesta', text: 'Entiendes el alcance y el presupuesto antes de decidir cómo seguir.' },
    { icon: CalendarCheck, n: 4, title: 'Planificamos la reforma', text: 'Acordamos los próximos pasos con la empresa antes de iniciar la obra.' },
  ],
  en: [
    { icon: MessageSquare, n: 1, title: 'Tell us about your project', text: 'Share what you want to change and what matters most to you.' },
    { icon: Compass, n: 2, title: 'Define the approach', text: 'We clarify your needs, questions, and the work being considered.' },
    { icon: PencilRuler, n: 3, title: 'Review the proposal', text: 'You understand the scope and estimate before deciding how to proceed.' },
    { icon: CalendarCheck, n: 4, title: 'Plan the renovation', text: 'We agree on the next steps before construction begins.' },
  ],
};

export const PROCESS_HEADING: Record<Lang, { eyebrow: string; title: string; description: string }> = {
  es: {
    eyebrow: 'El proceso',
    title: 'Qué pasa después de escribirnos',
    description: 'Cuatro pasos sencillos. No te pediremos que decidas nada sin tener toda la información primero.',
  },
  en: {
    eyebrow: 'The process',
    title: 'What happens after you reach out',
    description: 'Four simple steps. We won\'t ask you to decide anything without having all the information first.',
  },
};

/* ---------- REVIEWS ---------- */

export const REVIEWS_HEADING: Record<Lang, { eyebrow: string; title: string; description: string; disclaimer: string }> = {
  es: {
    eyebrow: 'Opiniones',
    title: 'Lo que dicen quienes han reformado con nosotros',
    description: 'Reservamos este espacio para reseñas reales de clientes.',
    disclaimer: 'Las reseñas reales de clientes se mostrarán aquí una vez disponibles. No se han inventado testimonios.',
  },
  en: {
    eyebrow: 'Reviews',
    title: 'What our clients say after renovating with us',
    description: 'This space is reserved for genuine client reviews.',
    disclaimer: 'Genuine client reviews will be displayed here once available. No testimonials have been fabricated.',
  },
};

export const REVIEWS: Record<Lang, { name: string; project: string }[]> = {
  es: [
    { name: 'Cliente verificado', project: 'Cocina' },
    { name: 'Cliente verificado', project: 'Baño' },
    { name: 'Cliente verificado', project: 'Ambos' },
  ],
  en: [
    { name: 'Verified client', project: 'Kitchen' },
    { name: 'Verified client', project: 'Bathroom' },
    { name: 'Verified client', project: 'Both' },
  ],
};

/* ---------- CONTACT ---------- */

export const CONTACT: Record<Lang, {
  eyebrow: string;
  title: string;
  description: string;
  phoneLabel: string;
  emailLabel: string;
  areaLabel: string;
  hoursLabel: string;
  phoneValue: string;
  emailValue: string;
  areaValue: string;
  hoursValue: string;
}> = {
  es: {
    eyebrow: 'Solicita un presupuesto',
    title: 'Cuéntanos qué reforma tienes en mente',
    description: 'Comparte algunos detalles de tu proyecto y nos pondremos en contacto contigo. No necesitas tener todo definido: unas pocas líneas son suficientes para empezar a orientarte.',
    phoneLabel: 'Teléfono',
    emailLabel: 'Email',
    areaLabel: 'Zona de trabajo',
    hoursLabel: 'Horario',
    phoneValue: '+34 600 123 456',
    emailValue: 'hola@reformacasa.es',
    areaValue: 'Madrid y alrededores',
    hoursValue: 'Lun–Vie · 9:00–18:00',
  },
  en: {
    eyebrow: 'Request a quote',
    title: 'Tell us about the renovation you have in mind',
    description: 'Share some details about your project and we\'ll get back to you. You don\'t need everything figured out: a few lines are enough to start guiding you.',
    phoneLabel: 'Phone',
    emailLabel: 'Email',
    areaLabel: 'Service area',
    hoursLabel: 'Hours',
    phoneValue: '+34 600 123 456',
    emailValue: 'hola@reformacasa.es',
    areaValue: 'Madrid and surrounding areas',
    hoursValue: 'Mon–Fri · 9:00–18:00',
  },
};

/* ---------- FORM ---------- */

export const FORM: Record<Lang, {
  nameLabel: string;
  phoneLabel: string;
  emailLabel: string;
  projectTypeLabel: string;
  locationLabel: string;
  locationHint: string;
  timingLabel: string;
  timingHint: string;
  budgetLabel: string;
  budgetHint: string;
  descriptionLabel: string;
  descriptionHint: string;
  descriptionPlaceholder: string;
  consentText: string;
  submitBtn: string;
  submitting: string;
  successTitle: string;
  successText: string;
  errorNotice: string;
  nameError: string;
  contactError: string;
  emailError: string;
  projectTypeError: string;
  consentError: string;
  nameRequired: string;
  projectTypeRequired: string;
  contactHint: string;
  selectOption: string;
  budgetOptions: string[];
  timingOptions: string[];
  projectTypes: string[];
}> = {
  es: {
    nameLabel: 'Nombre',
    phoneLabel: 'Teléfono',
    emailLabel: 'Email',
    projectTypeLabel: 'Tipo de proyecto',
    locationLabel: 'Ubicación o código postal',
    locationHint: 'Opcional',
    timingLabel: 'Plazo aproximado',
    timingHint: 'Opcional',
    budgetLabel: 'Presupuesto aproximado',
    budgetHint: 'Opcional y orientativo',
    descriptionLabel: 'Cuéntanos tu proyecto',
    descriptionHint: 'Opcional — unas líneas son suficientes',
    descriptionPlaceholder: 'Qué quieres cambiar, qué es lo más importante para ti, cualquier duda que tengas…',
    consentText: 'Acepto que mis datos se utilicen para responder a esta solicitud. Puedes consultar nuestra política de privacidad para más información.',
    submitBtn: 'Solicitar presupuesto',
    submitting: 'Enviando…',
    successTitle: '¡Gracias!',
    successText: 'Hemos recibido tu solicitud. Nos pondremos en contacto contigo lo antes posible.',
    errorNotice: 'Esta es una demostración: el formulario no está conectado a un servidor todavía. Introduce los datos y pulsa para ver la validación, pero el envío no se procesará hasta que se configure el backend.',
    nameError: 'Introduce tu nombre.',
    contactError: 'Necesitamos un teléfono o un email para contactarte.',
    emailError: 'El email no parece válido.',
    projectTypeError: 'Selecciona un tipo de proyecto.',
    consentError: 'Necesitamos que aceptes la política de privacidad.',
    nameRequired: 'Requerido',
    projectTypeRequired: 'Requerido',
    contactHint: 'Indica teléfono o email',
    selectOption: 'Selecciona una opción…',
    budgetOptions: ['Hasta 5.000 €', '5.000 – 15.000 €', '15.000 – 30.000 €', 'Más de 30.000 €', 'Todavía no lo sé'],
    timingOptions: ['Lo antes posible', 'En unos meses', 'Solo estoy valorando opciones'],
    projectTypes: ['Cocina', 'Baño', 'Ambos', 'Otro'],
  },
  en: {
    nameLabel: 'Name',
    phoneLabel: 'Phone',
    emailLabel: 'Email',
    projectTypeLabel: 'Project type',
    locationLabel: 'Location or postcode',
    locationHint: 'Optional',
    timingLabel: 'Approximate timeline',
    timingHint: 'Optional',
    budgetLabel: 'Approximate budget',
    budgetHint: 'Optional & indicative',
    descriptionLabel: 'Tell us about your project',
    descriptionHint: 'Optional — a few lines are enough',
    descriptionPlaceholder: 'What you want to change, what matters most to you, any questions you have…',
    consentText: 'I agree that my data may be used to respond to this request. See our privacy policy for more information.',
    submitBtn: 'Request quote',
    submitting: 'Sending…',
    successTitle: 'Thank you!',
    successText: 'We\'ve received your request. We\'ll get back to you as soon as possible.',
    errorNotice: 'This is a demo: the form is not connected to a server yet. Enter data and submit to see validation, but the submission won\'t be processed until the backend is configured.',
    nameError: 'Please enter your name.',
    contactError: 'We need a phone number or email to contact you.',
    emailError: 'The email doesn\'t seem valid.',
    projectTypeError: 'Please select a project type.',
    consentError: 'We need you to accept the privacy policy.',
    nameRequired: 'Required',
    projectTypeRequired: 'Required',
    contactHint: 'Provide phone or email',
    selectOption: 'Select an option…',
    budgetOptions: ['Up to €5,000', '€5,000 – €15,000', '€15,000 – €30,000', 'Over €30,000', 'Not sure yet'],
    timingOptions: ['As soon as possible', 'In a few months', 'Just exploring options'],
    projectTypes: ['Kitchen', 'Bathroom', 'Both', 'Other'],
  },
};

/* ---------- FAQ ---------- */

export const FAQS: Record<Lang, { q: string; a: string }[]> = {
  es: [
    {
      q: '¿Necesito saber exactamente lo que quiero antes de contactaros?',
      a: 'No. Muchas personas nos escriben con una idea general y preguntas abiertas. El primer contacto sirve para entender tu situación y orientarte, no para cerrar decisiones.',
    },
    {
      q: '¿Puedo pedir un presupuesto antes de decidir seguir adelante?',
      a: 'Sí. La solicitud de presupuesto no implica compromiso. Te enviamos una propuesta detallada y tú decides si quieres seguir adelante, sin presión ni obligación.',
    },
    {
      q: '¿Qué información debería preparar para la primera conversación?',
      a: 'Conviene tener una idea del espacio a reformar, tu objetivo principal y, si lo tienes, un rango de presupuesto orientativo. Fotografías del estado actual ayudan, pero no son imprescindibles.',
    },
    {
      q: '¿En qué zonas trabajáis?',
      a: 'Trabajamos principalmente en Madrid y alrededores: Pozuelo, Majadahonda, Las Rozas, Alcobendas, San Sebastián de los Reyes y Tres Cantos. Si estás en otra zona cercana, escríbenos y valoramos si podemos atenderte.',
    },
    {
      q: '¿Cómo empieza el proceso de reforma?',
      a: 'Empieza con una conversación sobre lo que necesitas. A partir de ahí valoramos el enfoque, te enviamos una propuesta y, si todo encaja, planificamos el inicio de la obra.',
    },
  ],
  en: [
    {
      q: 'Do I need to know exactly what I want before contacting you?',
      a: 'No. Many people reach out with a general idea and open questions. The first contact is about understanding your situation and guiding you, not closing decisions.',
    },
    {
      q: 'Can I request a quote before deciding to proceed?',
      a: 'Yes. Requesting a quote implies no commitment. We send you a detailed proposal and you decide whether to proceed, with no pressure or obligation.',
    },
    {
      q: 'What information should I prepare for the first conversation?',
      a: 'It helps to have an idea of the space to renovate, your main goal, and — if you have one — an approximate budget range. Photos of the current state are helpful but not essential.',
    },
    {
      q: 'What areas do you work in?',
      a: 'We work mainly in Madrid and surrounding areas: Pozuelo, Majadahonda, Las Rozas, Alcobendas, San Sebastián de los Reyes, and Tres Cantos. If you are in a nearby area, write to us and we will assess whether we can help.',
    },
    {
      q: 'How does the renovation process start?',
      a: 'It starts with a conversation about what you need. From there we assess the approach, send you a proposal, and if everything fits, we plan the start of construction.',
    },
  ],
};

export const FAQ_HEADING: Record<Lang, { eyebrow: string; title: string; description: string }> = {
  es: {
    eyebrow: 'Preguntas frecuentes',
    title: 'Dudas habituales antes de empezar',
    description: 'Si no encuentras tu pregunta aquí, escríbenos y la resolvemos sin compromiso.',
  },
  en: {
    eyebrow: 'Frequently asked questions',
    title: 'Common questions before starting',
    description: 'If you don\'t find your question here, write to us and we\'ll answer it with no obligation.',
  },
};

/* ---------- FINAL CTA ---------- */

export const FINAL_CTA: Record<Lang, { title: string; description: string; button: string }> = {
  es: {
    title: '¿Hablamos de tu reforma?',
    description: 'Puedes empezar simplemente contándonos tus ideas y tus necesidades. No necesitas tener cada detalle decidido para dar el primer paso.',
    button: 'Solicita un presupuesto',
  },
  en: {
    title: 'Shall we talk about your renovation?',
    description: 'You can start by simply sharing your ideas and needs. You don\'t need every detail decided to take the first step.',
    button: 'Request a quote',
  },
};

/* ---------- FOOTER ---------- */

export const FOOTER: Record<Lang, {
  brand: string;
  tagline: string;
  servicesTitle: string;
  navTitle: string;
  contactTitle: string;
  legalTitle: string;
  privacy: string;
  terms: string;
  cookies: string;
  copyright: string;
  services: string[];
}> = {
  es: {
    brand: 'Reforma Casa',
    tagline: 'Reformas de cocinas y baños con acompañamiento profesional.',
    servicesTitle: 'Servicios',
    navTitle: 'Navegación',
    contactTitle: 'Contacto',
    legalTitle: 'Legal',
    privacy: 'Política de privacidad',
    terms: 'Aviso legal',
    cookies: 'Cookies',
    copyright: '© {year} Reforma Casa. Reformas de cocinas y baños en Madrid y alrededores.',
    services: ['Reforma de cocinas', 'Reforma de baños', 'Carpintería y encimeras', 'Suelos y revestimientos'],
  },
  en: {
    brand: 'Reforma Casa',
    tagline: 'Kitchen and bathroom renovations with professional guidance.',
    servicesTitle: 'Services',
    navTitle: 'Navigation',
    contactTitle: 'Contact',
    legalTitle: 'Legal',
    privacy: 'Privacy policy',
    terms: 'Legal notice',
    cookies: 'Cookies',
    copyright: '© {year} Reforma Casa. Kitchen and bathroom renovations in Madrid and surrounding areas.',
    services: ['Kitchen renovations', 'Bathroom renovations', 'Cabinetry & countertops', 'Flooring & tiling'],
  },
};

/* ---------- THEME / LANG TOGGLES ---------- */

export const UI: Record<Lang, { lightMode: string; darkMode: string; spanish: string; english: string }> = {
  es: { lightMode: 'Modo claro', darkMode: 'Modo oscuro', spanish: 'ES', english: 'EN' },
  en: { lightMode: 'Light mode', darkMode: 'Dark mode', spanish: 'ES', english: 'EN' },
};
