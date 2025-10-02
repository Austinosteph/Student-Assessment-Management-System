import { useState } from 'react';
import { FileText, Download, ChevronDown } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { ExamCard } from '@/components/exam-card';
import { ExamFilters } from '@/components/exam-filters';
import { UserProfile } from '@/components/user-profile';
import { ExamModal } from '@/components/exam-modal';
import { useExamStore, type Exam } from '@/lib/store';
import { useExport } from '@/hooks/use-export';
import {
	DropdownMenu,
	DropdownMenuContent,
	DropdownMenuItem,
	DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu';

export default function ExamListPage() {
	const { getFilteredExams, deleteExam } = useExamStore();
	const { exportAsJSON, exportAsCSV } = useExport();
	const filteredExams = getFilteredExams();

	const [isModalOpen, setIsModalOpen] = useState(false);
	const [selectedExam, setSelectedExam] = useState<Exam | null>(null);

	const handleEdit = (id: string) => {
		const exam = filteredExams.find((e) => e.id === id);
		if (exam) {
			setSelectedExam(exam);
			setIsModalOpen(true);
		}
	};

	const handleDelete = (id: string) => {
		if (confirm('Are you sure you want to delete this exam?')) {
			deleteExam(id);
		}
	};

	const handleGrade = (id: string) => {
		console.log('[v0] Grade exam:', id);
	};

	const handleCreateExam = () => {
		setSelectedExam(null);
		setIsModalOpen(true);
	};

	const handleCloseModal = () => {
		setIsModalOpen(false);
		setSelectedExam(null);
	};

	return (
		<div className="min-h-screen bg-background transition-colors duration-300">
			<div className="container mx-auto px-6 py-8 max-w-7xl">
				<div className="flex justify-between items-center mb-8">
					<h1 className="text-3xl font-bold text-foreground">Exam Dashboard</h1>
					<UserProfile />
				</div>

				{/* Filters */}
				<ExamFilters />

				{filteredExams.length === 0 ? (
					<div className="text-center py-12 animate-in fade-in-50">
						<p className="text-muted-foreground text-lg">
							No exams found matching your filters.
						</p>
						<p className="text-muted-foreground text-sm mt-2">
							Try adjusting your search or filter criteria.
						</p>
					</div>
				) : (
					<div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mb-8">
						{filteredExams.map((exam, index) => (
							<div
								key={exam.id}
								className="animate-in fade-in-50 slide-in-from-bottom-4"
								style={{
									animationDelay: `${index * 50}ms`,
									animationFillMode: 'backwards',
								}}
							>
								<ExamCard
									exam={exam}
									onEdit={handleEdit}
									onDelete={handleDelete}
									onGrade={handleGrade}
								/>
							</div>
						))}
					</div>
				)}

				{/* Action Buttons */}
				<div className="flex justify-end gap-4">
					<Button
						variant="outline"
						className="gap-2 bg-accent text-accent-foreground hover:bg-accent border-border rounded-full px-8 py-6 hover:scale-105 transition-transform"
						onClick={handleCreateExam}
					>
						<FileText className="h-4 w-4" />
						Create New Exam
					</Button>
					<DropdownMenu>
						<DropdownMenuTrigger asChild>
							<Button className="gap-2 bg-primary text-primary-foreground hover:bg-primary/90 rounded-full px-8 py-6 hover:scale-105 transition-transform">
								<Download className="h-4 w-4" />
								Export
								<ChevronDown className="h-4 w-4 ml-1" />
							</Button>
						</DropdownMenuTrigger>
						<DropdownMenuContent
							align="end"
							className="animate-in fade-in-50 slide-in-from-top-1"
						>
							<DropdownMenuItem onClick={exportAsJSON}>
								Export as JSON
							</DropdownMenuItem>
							<DropdownMenuItem onClick={exportAsCSV}>
								Export as CSV
							</DropdownMenuItem>
						</DropdownMenuContent>
					</DropdownMenu>
				</div>
			</div>

			<ExamModal
				isOpen={isModalOpen}
				onClose={handleCloseModal}
				exam={selectedExam}
			/>
		</div>
	);
}
