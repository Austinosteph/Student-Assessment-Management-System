'use client';

import { useExamStore } from '@/lib/store';
import { useCallback } from 'react';

export function useExport() {
	const exportExams = useExamStore((state) => state.exportExams);

	const exportAsJSON = useCallback(() => {
		exportExams('json');
	}, [exportExams]);

	const exportAsCSV = useCallback(() => {
		exportExams('csv');
	}, [exportExams]);

	return { exportAsJSON, exportAsCSV };
}
