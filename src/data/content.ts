import type { LucideIcon } from 'lucide-react';
import { MessageSquare, Compass, ClipboardCheck } from 'lucide-react';

export const NAV_LINKS = [
  { label: 'Servicios', href: '#servicios' },
  { label: 'Proyectos', href: '#proyectos' },
  { label: 'Proceso', href: '#proceso' },
  { label: 'Preguntas', href: '#faq' },
  { label: 'Contacto', href: '#contacto' },
] as const;

export const SERVICES = [
  {
    title: 'Reforma de cocinas',
    description:
      'Diseño y renovación completa de cocinas: distribución, carpintería, encimeras, iluminación y acabados pensados para el uso diario.',
    image:
      'https://images.pexels.com/photos/6510984/pexels-photo-6510984.jpeg?auto=compress&cs=tinysrgb&h=650&w=940',
    featured: true,
  },
  {
    title: 'Reforma de baños',
    description:
      'Renovación integral de baños con soluciones prácticas de fontanería, revestimientos, mamparas y materiales de fácil mantenimiento.',
    image:
      'https://images.pexels.com/photos/35868666/pexels-photo-35868666.jpeg?auto=compress&cs=tinysrgb&h=650&w=940',
    featured: true,
  },
  {
    title: 'Carpintería y encimeras',
    description:
      'Muebles a medida, frentes de cocina y encimeras en distintos materiales, adaptados al espacio y al presupuesto disponible.',
    image:
      'https://images.pexels.com/photos/10099294/pexels-photo-10099294.jpeg?auto=compress&cs=tinysrgb&h=650&w=940',
    featured: false,
  },
  {
    title: 'Suelos y revestimientos',
    description:
      'Colocación de cerámica, porcelánico y otros acabados para suelos y paredes, con preparación previa y rejuntado cuidado.',
    image:
      'https://images.pexels.com/photos/4258278/pexels-photo-4258278.jpeg?auto=compress&cs=tinysrgb&h=650&w=940',
    featured: false,
  },
] as const;

export const GUIDANCE_STEPS: { icon: LucideIcon; title: string; text: string }[] = [
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
];

export const PORTFOLIO_ITEMS = [
  {
    title: 'Cocina blanca con isla',
    category: 'Cocinas',
    image:
      'https://images.pexels.com/photos/7601088/pexels-photo-7601088.jpeg?auto=compress&cs=tinysrgb&h=650&w=940',
  },
  {
    title: 'Baño de mármol',
    category: 'Baños',
    image:
      'https://images.pexels.com/photos/35868664/pexels-photo-35868664.jpeg?auto=compress&cs=tinysrgb&h=650&w=940',
  },
  {
    title: 'Cocina en madera y granito',
    category: 'Cocinas',
    image:
      'https://images.pexels.com/photos/4119847/pexels-photo-4119847.jpeg?auto=compress&cs=tinysrgb&h=650&w=940',
  },
  {
    title: 'Baño minimalista con mampara',
    category: 'Baños',
    image:
      'https://images.pexels.com/photos/7005268/pexels-photo-7005268.jpeg?auto=compress&cs=tinysrgb&h=650&w=940',
  },
  {
    title: 'Cocina con encimera de mármol',
    category: 'Cocinas',
    image:
      'https://images.pexels.com/photos/10855206/pexels-photo-10855206.jpeg?auto=compress&cs=tinysrgb&h=650&w=940',
  },
  {
    title: 'Baño contemporáneo',
    category: 'Baños',
    image:
      'https://images.pexels.com/photos/7173665/pexels-photo-7173665.jpeg?auto=compress&cs=tinysrgb&h=650&w=940',
  },
] as const;

export const PORTFOLIO_CATEGORIES = ['Todos', 'Cocinas', 'Baños'] as const;

export const TRUST_POINTS = [
  {
    title: 'Trabajo bien hecho',
    text: 'Cuidamos los detalles que se ven y los que no. Cada fase se ejecuta con esmero y materiales adecuados.',
  },
  {
    title: 'Comunicación clara',
    text: 'Explicamos lo que vamos a hacer y por qué. Recomendaciones honestas, sin sorpresas ni cambios a última hora.',
  },
  {
    title: 'Acompañamiento',
    text: 'Te orientamos durante todo el proceso, desde la primera conversación hasta la entrega de la reforma.',
  },
] as const;

export const PROCESS_STEPS = [
  {
    n: 1,
    title: 'Cuéntanos tu proyecto',
    text: 'Comparte qué quieres cambiar y qué es lo más importante para ti.',
  },
  {
    n: 2,
    title: 'Definimos el enfoque',
    text: 'Aclaramos tus necesidades, dudas y los trabajos que se están valorando.',
  },
  {
    n: 3,
    title: 'Revisas la propuesta',
    text: 'Entiendes el alcance y el presupuesto antes de decidir cómo seguir.',
  },
  {
    n: 4,
    title: 'Planificamos la reforma',
    text: 'Acordamos los próximos pasos con la empresa antes de iniciar la obra.',
  },
] as const;

export const FAQS = [
  {
    q: '¿Necesito saber exactamente lo que quiero antes de contactaros?',
    a: 'No. Muchas personas nos escriben con una idea general y preguntas abiertas. El primer contacto sirve para entender tu situación y orientarte, no para cerrar decisiones.',
  },
  {
    q: '¿Puedo pedir un presupuesto antes de decidir seguir adelante?',
    a: 'Sí. La solicitud de presupuesto no implica compromiso. [Personaliza esta respuesta según la política real de tu empresa.]',
  },
  {
    q: '¿Qué información debería preparar para la primera conversación?',
    a: 'Conviene tener una idea del espacio a reformar, tu objetivo principal y, si lo tienes, un rango de presupuesto orientativo. Fotografías del estado actual ayudan, pero no son imprescindibles.',
  },
  {
    q: '¿En qué zonas trabajáis?',
    a: '[Indica aquí las zonas o ciudades en las que opera tu empresa. Esta plantilla está pensada para personalizarse según tu área de servicio.]',
  },
  {
    q: '¿Cómo empieza el proceso de reforma?',
    a: 'Empieza con una conversación sobre lo que necesitas. A partir de ahí valoramos el enfoque, te enviamos una propuesta y, si todo encaja, planificamos el inicio de la obra.',
  },
] as const;

export const FORM_PROJECT_TYPES = ['Cocina', 'Baño', 'Ambos', 'Otro'] as const;
export const FORM_TIMING = [
  'Lo antes posible',
  'En unos meses',
  'Solo estoy valorando opciones',
] as const;
