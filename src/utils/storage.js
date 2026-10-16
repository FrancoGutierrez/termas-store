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

const PRIZE_SESSION_KEY = 'termas_temu_prize_session_v1';
const LEADS_KEY = 'termas_temu_leads_v1';

export const getActivePrizeSession = () => {
  try {
    const raw = localStorage.getItem(PRIZE_SESSION_KEY);
    if (!raw) return null;
    const session = JSON.parse(raw);
    if (session.expiresAt && Date.now() > session.expiresAt) {
      localStorage.removeItem(PRIZE_SESSION_KEY);
      return null;
    }
    return session;
  } catch (e) {
    console.error("Error reading prize session", e);
    return null;
  }
};

export const saveActivePrizeSession = (session) => {
  try {
    localStorage.setItem(PRIZE_SESSION_KEY, JSON.stringify(session));
  } catch (e) {
    console.error("Error saving prize session", e);
  }
};

export const clearActivePrizeSession = () => {
  try {
    localStorage.removeItem(PRIZE_SESSION_KEY);
  } catch (e) {
    console.error("Error clearing prize session", e);
  }
};

export const getLeads = () => {
  try {
    const raw = localStorage.getItem(LEADS_KEY);
    if (raw) return JSON.parse(raw);
  } catch (e) {
    console.error("Error reading leads", e);
  }
  return [];
};

export const saveLead = (lead) => {
  try {
    const current = getLeads();
    const newLead = {
      id: `lead-${Date.now()}`,
      createdAt: new Date().toISOString(),
      ...lead
    };
    const updated = [newLead, ...current];
    localStorage.setItem(LEADS_KEY, JSON.stringify(updated));
    return newLead;
  } catch (e) {
    console.error("Error saving lead", e);
    return null;
  }
};

