export const INITIAL_PRODUCTS = [
  {
    id: "terma-elec-smart-50",
    name: "Terma Eléctrica Smart Titanium 50L Digital",
    category: "electric",
    brand: "Veluxe Aura",
    originalPrice: 1399,
    normalPrice: 799,
    discountPercent: 43,
    rating: 4.9,
    reviewsCount: 184,
    image: "/images/terma_electrica_smart.jpg",
    badge: "⚡ MÁS VENDIDO",
    inStock: 3,
    specs: [
      "Capacidad: 50 Litros (ideal 3-4 personas)",
      "Potencia: 2000W con encendido ultra-rápido",
      "Panel Touch Digital LED con ajuste de 30°C a 75°C",
      "Tanque de Acero Titanium anti-corrosión con 7 años de garantía",
      "Calificación Energética: A+++ (Ahorro de luz)"
    ],
    description: "La terma eléctrica inteligente de nueva generación. Cuenta con aislamiento térmico ecológico de poliuretano de alta densidad para mantener el agua caliente durante 24 horas con mínimo consumo. Conexión Wi-Fi opcional y sistema de protección anti-descargas ELCB."
  },
  {
    id: "terma-gas-rapid-10",
    name: "Terma a Gas GLP/GN Instantánea AquaFlow 10L",
    category: "gas",
    brand: "AquaFlow Pro",
    originalPrice: 1199,
    normalPrice: 649,
    discountPercent: 46,
    rating: 4.8,
    reviewsCount: 129,
    image: "/images/terma_gas_rapid.jpg",
    badge: "🔥 OFERTA RELÁMPAGO",
    inStock: 5,
    specs: [
      "Flujo continuo: 10 Litros por minuto sin espera",
      "Funciona a baja presión de agua (0.02 MPa)",
      "Sensor de flama de alta precisión y corte automático",
      "Pantalla digital LCD de temperatura en tiempo real",
      "Intercambiador de cobre puro libre de oxígeno"
    ],
    description: "Disfruta de agua caliente ilimitada al instante. La terma a gas AquaFlow detecta la apertura del caño y enciende automáticamente en 1 segundo. Compatible con Gas Licuado (GLP) o Gas Natural (GN)."
  },
  {
    id: "terma-solar-pres-200",
    name: "Terma Solar Presurizada Solaris 200L High Heat",
    category: "solar",
    brand: "Solaris Tech",
    originalPrice: 2890,
    normalPrice: 1690,
    discountPercent: 41,
    rating: 5.0,
    reviewsCount: 96,
    image: "/images/terma_solar_presurizada.jpg",
    badge: "☀️ ECOLÓGICA A+++",
    inStock: 2,
    specs: [
      "Capacidad: 200 Litros con tanque de acero inoxidable SUS304",
      "Tubos de vacío tri-capa con tecnología Heat Pipe presurizada",
      "Resiste heladas hasta -15°C y alta presión hidroneumática",
      "Resistencia eléctrica de respaldo de 1500W integrada",
      "Garantía de fábrica: 10 Años en tubos y tanque"
    ],
    description: "Ahorra hasta un 90% en la cuenta de luz usando la energía del sol. Sistema presurizado de alto rendimiento apto para casas de 2 a 3 pisos. Funciona incluso en días nublados gracias a su tecnología de retención de radiación infrarroja."
  },
  {
    id: "termo-portatil-smart-1l",
    name: "Termo de Acero Inoxidable HydroSmart 1000ml LED Touch",
    category: "portable",
    brand: "HydroSmart",
    originalPrice: 240,
    normalPrice: 119,
    discountPercent: 50,
    rating: 4.7,
    reviewsCount: 310,
    image: "/images/termo_portatil_smart.jpg",
    badge: "🎁 REGALO POPULAR",
    inStock: 12,
    specs: [
      "Capacidad: 1000 ml con doble pared de vacío 316 Medical Grade",
      "Tapa inteligente con pantalla LED de temperatura táctil",
      "Mantiene bebidas calientes por 12 horas / frías por 24 horas",
      "Filtro de infusión de té/hierbas de acero inoxidable",
      "Libre de BPA y antiderrames 360°"
    ],
    description: "Lleva agua o bebidas calientes a donde vayas. Toca la tapa para ver la temperatura exacta en tiempo real sin abrirlo. Acabado mate antideslizante de alta resistencia a caídas."
  },
  {
    id: "ducha-elec-aethel-rapid",
    name: "Ducha Eléctrica Digital Aethel HydroFlow 5500W",
    category: "ducha",
    brand: "Aethel Tech",
    originalPrice: 380,
    normalPrice: 199,
    discountPercent: 48,
    rating: 4.8,
    reviewsCount: 215,
    image: "/images/terma_ducha_electrica.jpg",
    badge: "💧 INSTALACIÓN RÁPIDA",
    inStock: 8,
    specs: [
      "Potencia: 5500W multitemperatura de precisión",
      "Pantalla digital LCD integrada en la cabeza de ducha",
      "Protección contra choques eléctricos y sobrecalentamiento",
      "Regadera de gran cobertura con boquillas anticalcáreas",
      "Ahorra hasta 30% de agua con selector de chorro ecológico"
    ],
    description: "Agua caliente al instante sin necesidad de un tanque voluminoso. Se conecta directamente a la salida de la ducha con total seguridad y confort termostático."
  },
  {
    id: "terma-hibrida-duomax-300",
    name: "Terma Híbrida Inverter Hydra-Max 300L Bomba de Calor",
    category: "hybrid",
    brand: "Hydra-Max",
    originalPrice: 4900,
    normalPrice: 2890,
    discountPercent: 41,
    rating: 4.9,
    reviewsCount: 47,
    image: "/images/terma_hibrida_duomax.jpg",
    badge: "🏆 INDUSTRIAL PREMIUM",
    inStock: 1,
    specs: [
      "Capacidad: 300 Litros para casas grandes, hoteles o spas",
      "Tecnología Bomba de Calor Inverter: consume 75% menos energía",
      "Control por App Móvil Wi-Fi y pantalla táctil HD",
      "Compresor ultra silencioso < 42dB",
      "Garantía total de 8 Años"
    ],
    description: "El sistema de calefacción de agua más avanzado del mercado. Extrae el calor del aire ambiente para calentar el agua con la máxima eficiencia energética mundial."
  }
];

export const WINNER_LOCATIONS = [
  { name: "Juan M.", city: "Lima", prize: "35% OFF + Envío Gratis", time: "Hace 2 min" },
  { name: "Carolina R.", city: "Arequipa", prize: "Terma Solar con Instalación Gratis", time: "Hace 5 min" },
  { name: "Mateo V.", city: "Trujillo", prize: "Bono Especial de S/ 150.00", time: "Hace 8 min" },
  { name: "Sofía G.", city: "Cusco", prize: "Terma Eléctrica 50L al 45% OFF", time: "Hace 11 min" },
  { name: "Ricardo B.", city: "Chiclayo", prize: "Caja Sorpresa: Cupón VIP Temu", time: "Hace 14 min" },
  { name: "Elena P.", city: "Huancayo", prize: "Terma a Gas + Kit Conexión Gratis", time: "Hace 17 min" }
];
