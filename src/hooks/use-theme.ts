'use client';

import { useExamStore } from '@/lib/store';
import { useEffect } from 'react';

export function useTheme() {
	const theme = useExamStore((state) => state.theme);
	const toggleTheme = useExamStore((state) => state.toggleTheme);

	useEffect(() => {
		if (typeof document !== 'undefined') {
			document.documentElement.classList.toggle('dark', theme === 'dark');
		}
	}, [theme]);

	return { theme, toggleTheme };
}
