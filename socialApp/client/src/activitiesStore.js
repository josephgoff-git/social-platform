import { create } from "zustand";

export const useActivitiesStore = create((set) => ({
    activities: [],
    setActivities: (newActivities) => set({ activities: newActivities }),
    clearActivities: () => {
      localStorage.removeItem("Latest Activity");
      set(() => ({ activities: [] }));
    },
  }));