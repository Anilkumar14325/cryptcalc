import { create } from 'zustand';
import { persist } from 'zustand/middleware';

interface ThemeState {
  isDark: boolean;
  toggleTheme: () => void;
}

export const useThemeStore = create<ThemeState>()(
  persist(
    (set) => ({
      isDark: window.matchMedia('(prefers-color-scheme: dark)').matches,
      toggleTheme: () => set((state) => ({ isDark: !state.isDark })),
    }),
    {
      name: 'theme-storage',
      // Add custom storage handlers to safely parse JSON
      deserialize: (str) => {
        try {
          return JSON.parse(str);
        } catch (err) {
          // If parsing fails, return null to trigger fallback to initial state
          return null;
        }
      }
    }
  )
);