export type MockProduct = {
  id: string;
  name: string;
  category: string;
  brand: string;
  price: number;
  rating: number;
  reviewCount: number;
  unitOfMeasure: string;
  stockTier: 'AVAILABLE' | 'LOW' | 'OUT';
  description: string;
  featured?: boolean;
};

export const MOCK_CATEGORIES = [
  { slug: 'repuestos', name: 'Repuestos', count: 12 },
  { slug: 'lubricantes', name: 'Lubricantes', count: 8 },
  { slug: 'accesorios', name: 'Accesorios', count: 15 },
  { slug: 'herramientas', name: 'Herramientas', count: 6 },
];

export const MOCK_BRANDS = ['KM CERO', 'NexoParts', 'ViajeSeguro', 'CubAuto'];

export const MOCK_PRODUCTS: MockProduct[] = [
  {
    id: '1',
    name: 'Filtro de aceite premium',
    category: 'Repuestos',
    brand: 'KM CERO',
    price: 12.5,
    rating: 4.6,
    reviewCount: 28,
    unitOfMeasure: 'u',
    stockTier: 'AVAILABLE',
    description: 'Filtro de aceite de alto rendimiento para mantenimiento preventivo.',
    featured: true,
  },
  {
    id: '2',
    name: 'Aceite sintético 5W-30',
    category: 'Lubricantes',
    brand: 'NexoParts',
    price: 28.9,
    rating: 4.8,
    reviewCount: 64,
    unitOfMeasure: 'L',
    stockTier: 'LOW',
    description: 'Aceite sintético para motores modernos. Protección térmica avanzada.',
    featured: true,
  },
  {
    id: '3',
    name: 'Kit de pastillas de freno',
    category: 'Repuestos',
    brand: 'ViajeSeguro',
    price: 45.0,
    rating: 4.4,
    reviewCount: 19,
    unitOfMeasure: 'kit',
    stockTier: 'AVAILABLE',
    description: 'Pastillas cerámicas con bajo ruido y mayor durabilidad.',
    featured: true,
  },
  {
    id: '4',
    name: 'Cubre volante ergonómico',
    category: 'Accesorios',
    brand: 'CubAuto',
    price: 9.75,
    rating: 4.1,
    reviewCount: 11,
    unitOfMeasure: 'u',
    stockTier: 'AVAILABLE',
    description: 'Accesorio antideslizante con agarre cómodo para el día a día.',
  },
  {
    id: '5',
    name: 'Llave dinamométrica 1/2"',
    category: 'Herramientas',
    brand: 'NexoParts',
    price: 62.0,
    rating: 4.9,
    reviewCount: 7,
    unitOfMeasure: 'u',
    stockTier: 'LOW',
    description: 'Herramienta de precisión con escala clara y trinquete reversible.',
  },
  {
    id: '6',
    name: 'Bujías iridio (juego x4)',
    category: 'Repuestos',
    brand: 'KM CERO',
    price: 34.2,
    rating: 4.7,
    reviewCount: 41,
    unitOfMeasure: 'juego',
    stockTier: 'OUT',
    description: 'Juego de bujías de iridio para arranque más limpio y eficiente.',
  },
  {
    id: '7',
    name: 'Ambientador premium',
    category: 'Accesorios',
    brand: 'CubAuto',
    price: 4.5,
    rating: 3.9,
    reviewCount: 22,
    unitOfMeasure: 'u',
    stockTier: 'AVAILABLE',
    description: 'Fragancia suave de larga duración para el habitáculo.',
  },
  {
    id: '8',
    name: 'Grasa multipropósito',
    category: 'Lubricantes',
    brand: 'ViajeSeguro',
    price: 7.25,
    rating: 4.3,
    reviewCount: 15,
    unitOfMeasure: 'kg',
    stockTier: 'AVAILABLE',
    description: 'Lubricante resistente al agua para rodamientos y juntas.',
  },
];
