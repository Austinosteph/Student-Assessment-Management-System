import { create } from 'zustand';
import { persist } from 'zustand/middleware';

export interface Exam {
	id: string;
	title: string;
	year: string;
	dateCreated: string;
	dateDue: string;
	weight: string;
	maxPoints: number;
	passingThreshold: number;
	status: string;
	course: string;
	description: string;
	visible: boolean;
	subject: string;
	category: string;
}

interface ExamFilters {
	search: string;
	dateRange: string;
	subject: string;
	category: string;
}

interface ExamStore {
	exams: Exam[];
	filters: ExamFilters;
	theme: 'light' | 'dark';
	setFilters: (filters: Partial<ExamFilters>) => void;
	deleteExam: (id: string) => void;
	addExam: (exam: Exam) => void;
	updateExam: (id: string, exam: Partial<Exam>) => void;
	getFilteredExams: () => Exam[];
	toggleTheme: () => void;
	exportExams: (format: 'json' | 'csv') => void;
	logout: () => void;
}

const mockExams: Exam[] = [
	{
		id: '1',
		title: 'Mat 202 | Actuarial Vector Analysis',
		year: 'YR 2',
		dateCreated: 'November 21, 2025',
		dateDue: 'November 25, 2025',
		weight: '35%',
		maxPoints: 100,
		passingThreshold: 80,
		status: 'Not Attempted',
		course: 'Actuarial Vector Analysis',
		description:
			'Lorem ipsum dolor sit amet consectetur adipiscing elit sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.',
		visible: true,
		subject: 'Mathematics',
		category: 'Theatre Art',
	},
	{
		id: '2',
		title: 'Mat 202 | Actuarial Vector Analysis',
		year: 'YR 2',
		dateCreated: 'November 21, 2025',
		dateDue: 'November 25, 2025',
		weight: '35%',
		maxPoints: 100,
		passingThreshold: 90,
		status: 'Not Attempted',
		course: 'Actuarial Vector Analysis',
		description:
			'Lorem ipsum dolor sit amet consectetur adipiscing elit sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.',
		visible: true,
		subject: 'Mathematics',
		category: 'Theatre Art',
	},
	{
		id: '3',
		title: 'Mat 202 | Actuarial Vector Analysis',
		year: 'YR 2',
		dateCreated: 'November 21, 2025',
		dateDue: 'November 25, 2025',
		weight: '35%',
		maxPoints: 100,
		passingThreshold: 40,
		status: 'Not Attempted',
		course: 'Actuarial Vector Analysis',
		description:
			'Lorem ipsum dolor sit amet consectetur adipiscing elit sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.',
		visible: true,
		subject: 'Mathematics',
		category: 'Theatre Art',
	},
	{
		id: '4',
		title: 'PHY 301 | Quantum Mechanics',
		year: 'YR 3',
		dateCreated: 'November 22, 2025',
		dateDue: 'November 26, 2025',
		weight: '40%',
		maxPoints: 100,
		passingThreshold: 30,
		status: 'In Progress',
		course: 'Quantum Mechanics',
		description:
			'Advanced quantum mechanics covering wave functions, operators, and quantum states.',
		visible: true,
		subject: 'Physics',
		category: 'Science',
	},
	{
		id: '5',
		title: 'CHE 205 | Organic Chemistry',
		year: 'YR 2',
		dateCreated: 'November 23, 2025',
		dateDue: 'November 27, 2025',
		weight: '30%',
		maxPoints: 100,
		passingThreshold: 79,
		status: 'Completed',
		course: 'Organic Chemistry',
		description:
			'Study of organic compounds, reactions, and synthesis mechanisms.',
		visible: true,
		subject: 'Chemistry',
		category: 'Science',
	},
	{
		id: '6',
		title: 'MAT 305 | Linear Algebra',
		year: 'YR 3',
		dateCreated: 'November 21, 2025',
		dateDue: 'November 24, 2025',
		weight: '35%',
		maxPoints: 100,
		passingThreshold: 56,
		status: 'Not Attempted',
		course: 'Linear Algebra',
		description:
			'Vector spaces, matrices, eigenvalues, and linear transformations.',
		visible: true,
		subject: 'Mathematics',
		category: 'Engineering',
	},
	{
		id: '7',
		title: 'ENG 401 | Structural Analysis',
		year: 'YR 4',
		dateCreated: 'November 25, 2025',
		dateDue: 'November 28, 2025',
		weight: '45%',
		maxPoints: 100,
		passingThreshold: 43,
		status: 'Not Attempted',
		course: 'Structural Analysis',
		description:
			'Analysis of structures, stress, strain, and load distribution.',
		visible: true,
		subject: 'Engineering',
		category: 'Engineering',
	},
	{
		id: '8',
		title: 'MAT 101 | Calculus I',
		year: 'YR 1',
		dateCreated: 'December 1, 2025',
		dateDue: 'December 5, 2025',
		weight: '30%',
		maxPoints: 100,
		passingThreshold: 30,
		status: 'Not Attempted',
		course: 'Calculus I',
		description: 'Introduction to differential and integral calculus.',
		visible: true,
		subject: 'Mathematics',
		category: 'Science',
	},
	{
		id: '9',
		title: 'PHY 201 | Classical Mechanics',
		year: 'YR 2',
		dateCreated: 'November 26, 2025',
		dateDue: 'November 29, 2025',
		weight: '35%',
		maxPoints: 100,
		passingThreshold: 50,
		status: 'Not Attempted',
		course: 'Classical Mechanics',
		description:
			'Newtonian mechanics, energy, momentum, and rotational dynamics.',
		visible: true,
		subject: 'Physics',
		category: 'Theatre Art',
	},
];

export const useExamStore = create<ExamStore>()(
	persist(
		(set, get) => ({
			exams: [],
			filters: {
				search: '',
				dateRange: 'All Dates',
				subject: 'All Subjects',
				category: 'All Categories',
			},
			theme: 'light',
			setFilters: (newFilters) =>
				set((state) => ({ filters: { ...state.filters, ...newFilters } })),
			deleteExam: (id) =>
				set((state) => ({
					exams: state.exams.filter((exam) => exam.id !== id),
				})),
			addExam: (exam) => set((state) => ({ exams: [...state.exams, exam] })),
			updateExam: (id, updatedExam) =>
				set((state) => ({
					exams: state.exams.map((exam) =>
						exam.id === id ? { ...exam, ...updatedExam } : exam
					),
				})),
			getFilteredExams: () => {
				const { exams, filters } = get();
				return exams.filter((exam) => {
					if (!exam.visible) return false;

					const matchesSearch =
						filters.search === '' ||
						exam.title.toLowerCase().includes(filters.search.toLowerCase()) ||
						exam.year.toLowerCase().includes(filters.search.toLowerCase()) ||
						exam.course.toLowerCase().includes(filters.search.toLowerCase());

					const matchesDate =
						filters.dateRange === 'All Dates' ||
						(filters.dateRange === '21-24 November' &&
							['November 21', '22', '23', '24'].some((d) =>
								exam.dateDue.includes(d)
							)) ||
						(filters.dateRange === '25-28 November' &&
							['November 25', '26', '27', '28'].some((d) =>
								exam.dateDue.includes(d)
							)) ||
						(filters.dateRange === 'December' &&
							exam.dateDue.includes('December'));

					const matchesSubject =
						filters.subject === 'All Subjects' ||
						exam.subject === filters.subject;
					const matchesCategory =
						filters.category === 'All Categories' ||
						exam.category === filters.category;

					return (
						matchesSearch && matchesDate && matchesSubject && matchesCategory
					);
				});
			},
			toggleTheme: () =>
				set((state) => {
					const newTheme = state.theme === 'light' ? 'dark' : 'light';
					if (typeof document !== 'undefined') {
						document.documentElement.classList.toggle(
							'dark',
							newTheme === 'dark'
						);
					}
					return { theme: newTheme };
				}),
			exportExams: (format: 'json' | 'csv') => {
				const { exams } = get();
				if (format === 'json') {
					const dataStr = JSON.stringify(exams, null, 2);
					const dataUri =
						'data:application/json;charset=utf-8,' +
						encodeURIComponent(dataStr);
					const fileName = `exams-${
						new Date().toISOString().split('T')[0]
					}.json`;
					const link = document.createElement('a');
					link.href = dataUri;
					link.download = fileName;
					link.click();
				} else {
					const headers = [
						'ID',
						'Title',
						'Year',
						'Date Created',
						'Date Due',
						'Weight',
						'Max Points',
						'Passing Threshold',
						'Status',
						'Course',
						'Subject',
						'Category',
					];
					const csvContent = [
						headers.join(','),
						...exams.map((exam) =>
							[
								exam.id,
								`"${exam.title}"`,
								exam.year,
								exam.dateCreated,
								exam.dateDue,
								exam.weight,
								exam.maxPoints,
								exam.passingThreshold,
								exam.status,
								`"${exam.course}"`,
								exam.subject,
								exam.category,
							].join(',')
						),
					].join('\n');
					const dataUri =
						'data:text/csv;charset=utf-8,' + encodeURIComponent(csvContent);
					const fileName = `exams-${
						new Date().toISOString().split('T')[0]
					}.csv`;
					const link = document.createElement('a');
					link.href = dataUri;
					link.download = fileName;
					link.click();
				}
			},
			logout: () => {
				set({
					exams: [],
					filters: {
						search: '',
						dateRange: 'All Dates',
						subject: 'All Subjects',
						category: 'All Categories',
					},
					theme: 'light',
				});

				localStorage.removeItem('exam-storage');
				window.location.reload();
			},
		}),
		{
			name: 'exam-storage',
			partialize: (state) => ({ exams: state.exams, theme: state.theme }),
			version: 1,
		}
	)
);

// Initialize with mock data if empty
if (typeof window !== 'undefined') {
	const store = useExamStore.getState();
	if (store.exams.length === 0) {
		mockExams.forEach((exam) => store.addExam(exam));
	}
}
