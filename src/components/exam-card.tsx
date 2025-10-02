'use client';

import { Pencil, Trash2 } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Card } from '@/components/ui/card';
import type { Exam } from '@/lib/store';

interface ExamCardProps {
	exam: Exam;
	onEdit: (id: string) => void;
	onDelete: (id: string) => void;
	onGrade: (id: string) => void;
}

export function ExamCard({ exam, onEdit, onDelete, onGrade }: ExamCardProps) {
	return (
		<Card className="p-6 bg-card border-border hover:shadow-lg transition-all duration-300 hover:-translate-y-1">
			<div className="space-y-4">
				{/* Header */}
				<div>
					<h3 className="font-semibold text-foreground text-base leading-tight">
						{exam.title}
					</h3>
					<p className="text-sm text-muted-foreground mt-1">{exam.year}</p>
				</div>

				{/* Details */}
				<div className="space-y-2 text-sm">
					<div className="flex justify-between">
						<span className="text-muted-foreground">Date Created:</span>
						<span className="text-foreground font-medium">
							{exam.dateCreated}
						</span>
					</div>
					<div className="flex justify-between">
						<span className="text-muted-foreground">Date Due:</span>
						<span className="text-foreground font-medium">{exam.dateDue}</span>
					</div>
					<div className="flex justify-between">
						<span className="text-muted-foreground">Weight:</span>
						<span className="text-foreground font-medium">
							{exam.weight} of final grade
						</span>
					</div>
					<div className="flex justify-between">
						<span className="text-muted-foreground">Student Attempted:</span>
						<span className="text-foreground font-medium">
							{exam.maxPoints - exam.passingThreshold}/{exam.maxPoints}
						</span>
					</div>
				</div>

				{/* Actions */}
				<div className="flex items-center justify-between pt-2">
					<div className="flex gap-2">
						<Button
							variant="ghost"
							size="icon"
							className="h-8 w-8 text-muted-foreground hover:text-foreground transition-colors"
							onClick={() => onEdit(exam.id)}
						>
							<Pencil className="h-4 w-4" />
						</Button>
						<Button
							variant="ghost"
							size="icon"
							className="h-8 w-8 text-muted-foreground hover:text-destructive transition-colors"
							onClick={() => onDelete(exam.id)}
						>
							<Trash2 className="h-4 w-4" />
						</Button>
					</div>
					<Button
						className="bg-primary text-primary-foreground hover:bg-primary/90 rounded-full px-6 transition-all duration-200 hover:scale-105"
						onClick={() => onGrade(exam.id)}
					>
						Grade Now
					</Button>
				</div>
			</div>
		</Card>
	);
}
