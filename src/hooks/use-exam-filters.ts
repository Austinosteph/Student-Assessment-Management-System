'use client';

import { useExamStore } from '@/lib/store';
import { useCallback } from 'react';

export function useExamFilters() {
	const filters = useExamStore((state) => state.filters);
	const setFilters = useExamStore((state) => state.setFilters);
	const getFilteredExams = useExamStore((state) => state.getFilteredExams);

	const updateSearch = useCallback(
		(search: string) => {
			setFilters({ search });
		},
		[setFilters]
	);

	const updateDateRange = useCallback(
		(dateRange: string) => {
			setFilters({ dateRange });
		},
		[setFilters]
	);

	const updateSubject = useCallback(
		(subject: string) => {
			setFilters({ subject });
		},
		[setFilters]
	);

	const updateCategory = useCallback(
		(category: string) => {
			setFilters({ category });
		},
		[setFilters]
	);

	const resetFilters = useCallback(() => {
		setFilters({
			search: '',
			dateRange: 'All Dates',
			subject: 'All Subjects',
			category: 'All Categories',
		});
	}, [setFilters]);

	return {
		filters,
		updateSearch,
		updateDateRange,
		updateSubject,
		updateCategory,
		resetFilters,
		getFilteredExams,
	};
}
