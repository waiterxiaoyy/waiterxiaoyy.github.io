
import storage from "@/utils/storage";
import { create } from "zustand";

export const useStore = create<
	{
		isDark: boolean;
		updateTheme: (isDark: boolean) => void;
	}
>((set) => ({
	isDark: storage.get('isDark') || false,
	updateTheme: (isDark: boolean) => set({ isDark })
}));
