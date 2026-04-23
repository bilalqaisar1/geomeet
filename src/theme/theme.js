export const SHADOWS = {
  light: {
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 3,
  },
  medium: {
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.15,
    shadowRadius: 8,
    elevation: 5,
  },
};

export const COLORS = {
  primary: '#FF8C4B', // Orange
  secondary: '#E65C7B', // Pink
  gradient: ['#FF8C4B', '#E65C7B'],
  background: '#FFFFFF',
  surface: '#F8F9FA',
  text: '#1A1A1A',
  textSecondary: '#666666',
  border: '#EAEAEA',
  white: '#FFFFFF',
  black: '#000000',
  success: '#4CAF50',
  error: '#F44336',
  gray: '#999999',
  lightGray: '#F0F0F0',
  blue: '#007AFF',
};

export const SPACING = {
  xs: 4,
  s: 8,
  m: 16,
  l: 24,
  xl: 32,
  xxl: 40,
};

export const BORDER_RADIUS = {
  s: 8,
  m: 16,
  l: 24,
  xl: 32,
  round: 100,
};

export default {
  COLORS,
  SPACING,
  BORDER_RADIUS,
  SHADOWS,
};
