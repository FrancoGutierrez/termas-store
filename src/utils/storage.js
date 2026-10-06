import { INITIAL_PRODUCTS } from '../data/initialProducts';

const PRODUCTS_KEY = 'termas_temu_products_v1';
const GAME_SETTINGS_KEY = 'termas_temu_game_settings_v1';

export const DEFAULT_GAME_SETTINGS = {
  storeName: "TERMASTORE PRO",
  currencySymbol: "S/",
  wheelGuaranteeText: "🎉 ¡EL CLIENTE SIEMPRE GANA! (Descuento Temu Garantizado 35% a 50%)",
  guaranteedDiscountPercent: 38, // Target discount % applied to base inflation price
  timerMinutes: 10,
  riggedSpinCount: 2, // Spin 1: "Casi...", Spin 2: "JACKPOT!"
  freeShippingThreshold: 500,
  whatsappNumber: "+51 987 654 321",
  adminPin: "1234"
};

export const getProducts = () => {
  try {
    const data = localStorage.getItem(PRODUCTS_KEY);
    if (data) return JSON.parse(data);
  } catch (e) {
    console.error("Error reading products from localStorage", e);
  }
  return INITIAL_PRODUCTS;
};

export const saveProducts = (products) => {
  try {
    localStorage.setItem(PRODUCTS_KEY, JSON.stringify(products));
  } catch (e) {
    console.error("Error saving products to localStorage", e);
  }
};

export const resetProductsToDefault = () => {
  localStorage.setItem(PRODUCTS_KEY, JSON.stringify(INITIAL_PRODUCTS));
  return INITIAL_PRODUCTS;
};

export const getGameSettings = () => {
  try {
    const data = localStorage.getItem(GAME_SETTINGS_KEY);
    if (data) return { ...DEFAULT_GAME_SETTINGS, ...JSON.parse(data) };
  } catch (e) {
    console.error("Error reading game settings", e);
  }
  return DEFAULT_GAME_SETTINGS;
};

export const saveGameSettings = (settings) => {
  try {
    localStorage.setItem(GAME_SETTINGS_KEY, JSON.stringify(settings));
  } catch (e) {
    console.error("Error saving game settings", e);
  }
};
