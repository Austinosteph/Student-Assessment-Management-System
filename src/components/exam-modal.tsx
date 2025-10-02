import type React from 'react';

import { useState, useEffect } from 'react';
import { X, Upload } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { Label } from '@/components/ui/label';
import {
	Select,
	SelectContent,
	SelectItem,
	SelectTrigger,
	SelectValue,
} from '@/components/ui/select';
import { Switch } from '@/components/ui/switch';
import { useExamStore, type Exam } from '@/lib/store';

interface ExamModalProps {
	isOpen: boolean;
	onClose: () => void;
	exam?: Exam | null;
}

export function ExamModal({ isOpen, onClose, exam }: ExamModalProps) {
	const { addExam, updateExam } = useExamStore();
	const [formData, setFormData] = useState({
		title: '',
		description: '',
		dateDue: '',
		course: '',
		maxPoints: 100,
		weight: '35%',
		passingThreshold: 50,
		visible: true,
	});

	useEffect(() => {
		if (exam) {
			setFormData({
				title: exam.title,
				description: exam.description,
				dateDue: exam.dateDue,
				course: exam.course,
				maxPoints: exam.maxPoints,
				weight: exam.weight,
				passingThreshold: exam.passingThreshold,
				visible: exam.visible,
			});
		} else {
			setFormData({
				title: '',
				description: '',
				dateDue: '',
				course: '',
				maxPoints: 100,
				weight: '35%',
				passingThreshold: 50,
				visible: true,
			});
		}
	}, [exam, isOpen]);

	const handleSubmit = (e: React.FormEvent) => {
		e.preventDefault();

		const examData: Exam = {
			id: exam?.id || Date.now().toString(),
			title: formData.title,
			year: exam?.year || 'YR 2',
			dateCreated:
				exam?.dateCreated ||
				new Date().toLocaleDateString('en-US', {
					month: 'long',
					day: 'numeric',
					year: 'numeric',
				}),
			dateDue: formData.dateDue,
			weight: formData.weight,
			maxPoints: formData.maxPoints,
			passingThreshold: formData.passingThreshold,
			status: exam?.status || 'Not Attempted',
			course: formData.course,
			description: formData.description,
			visible: formData.visible,
			subject: exam?.subject || 'Mathematics',
			category: exam?.category || 'Theatre Art',
		};

		if (exam) {
			updateExam(exam.id, examData);
		} else {
			addExam(examData);
		}

		onClose();
	};

	if (!isOpen) return null;

	return (
		<div className="fixed inset-0 z-50 flex items-center justify-center animate-in fade-in-0 duration-200">
			{/* Backdrop */}
			<div
				className="absolute inset-0 bg-black/50 backdrop-blur-sm"
				onClick={onClose}
			/>

			{/* Modal */}
			<div className="relative bg-background rounded-2xl shadow-2xl w-full max-w-md mx-4 animate-in zoom-in-95 slide-in-from-bottom-4 duration-200">
				{/* Header */}
				<div className="flex items-center justify-between p-6 border-b border-border">
					<h2 className="text-xl font-semibold text-foreground">
						{exam ? 'Edit Exam' : 'Create Exam'}
					</h2>
					<button
						onClick={onClose}
						className="text-muted-foreground hover:text-foreground transition-colors"
					>
						<X className="h-5 w-5" />
					</button>
				</div>

				{/* Form */}
				<form onSubmit={handleSubmit} className="p-6 space-y-5">
					{/* Exam Title */}
					<div className="space-y-2">
						<Label
							htmlFor="title"
							className="text-sm font-medium text-foreground"
						>
							Exam Title
						</Label>
						<Input
							id="title"
							value={formData.title}
							onChange={(e) =>
								setFormData({ ...formData, title: e.target.value })
							}
							placeholder="Mat 201 Exam"
							required
							className="bg-card border-border text-foreground placeholder:text-muted-foreground"
						/>
					</div>

					{/* Exam Description */}
					<div className="space-y-2">
						<Label
							htmlFor="description"
							className="text-sm font-medium text-foreground"
						>
							Exam Description
						</Label>
						<Textarea
							id="description"
							value={formData.description}
							onChange={(e) =>
								setFormData({ ...formData, description: e.target.value })
							}
							placeholder="Lorem ipsum dolor sit amet consectetur. Ornare verus es sed lacus pharetra mauris tempus tincidunt. A ac orci pretium sem aliquet integer. Placerat convallis urna risus"
							rows={4}
							required
							className="bg-card border-border text-foreground placeholder:text-muted-foreground resize-none"
						/>
					</div>

					{/* Date and Course */}
					<div className="grid grid-cols-2 gap-4">
						<div className="space-y-2">
							<Label
								htmlFor="date"
								className="text-sm font-medium text-foreground"
							>
								Date
							</Label>
							<Select
								value={formData.dateDue}
								onValueChange={(value) =>
									setFormData({ ...formData, dateDue: value })
								}
							>
								<SelectTrigger className="bg-card border-border text-foreground">
									<SelectValue placeholder="Select date" />
								</SelectTrigger>
								<SelectContent>
									<SelectItem value="November 21, 2025">
										November 21, 2025
									</SelectItem>
									<SelectItem value="November 22, 2025">
										November 22, 2025
									</SelectItem>
									<SelectItem value="November 23, 2025">
										November 23, 2025
									</SelectItem>
									<SelectItem value="November 24, 2025">
										November 24, 2025
									</SelectItem>
									<SelectItem value="November 25, 2025">
										November 25, 2025
									</SelectItem>
									<SelectItem value="November 26, 2025">
										November 26, 2025
									</SelectItem>
									<SelectItem value="November 27, 2025">
										November 27, 2025
									</SelectItem>
									<SelectItem value="November 28, 2025">
										November 28, 2025
									</SelectItem>
								</SelectContent>
							</Select>
						</div>

						<div className="space-y-2">
							<Label
								htmlFor="course"
								className="text-sm font-medium text-foreground"
							>
								Course
							</Label>
							<Input
								id="course"
								value={formData.course}
								onChange={(e) =>
									setFormData({ ...formData, course: e.target.value })
								}
								placeholder="Actuarial Vector Analysis"
								required
								className="bg-card border-border text-foreground placeholder:text-muted-foreground"
							/>
						</div>
					</div>

					{/* Maximum Point, Weighted, Passing Threshold */}
					<div className="grid grid-cols-3 gap-3">
						<div className="space-y-2">
							<Label
								htmlFor="maxPoints"
								className="text-sm font-medium text-foreground"
							>
								Maximum Point
							</Label>
							<Input
								id="maxPoints"
								type="number"
								value={formData.maxPoints}
								onChange={(e) =>
									setFormData({
										...formData,
										maxPoints: Number.parseInt(e.target.value),
									})
								}
								required
								className="bg-card border-border text-foreground"
							/>
						</div>

						<div className="space-y-2">
							<Label
								htmlFor="weight"
								className="text-sm font-medium text-foreground"
							>
								Weighted
							</Label>
							<Input
								id="weight"
								value={formData.weight}
								onChange={(e) =>
									setFormData({ ...formData, weight: e.target.value })
								}
								placeholder="35%"
								required
								className="bg-card border-border text-foreground"
							/>
						</div>

						<div className="space-y-2">
							<Label
								htmlFor="passingThreshold"
								className="text-sm font-medium text-foreground"
							>
								Passing Threshold
							</Label>
							<Input
								id="passingThreshold"
								type="number"
								value={formData.passingThreshold}
								onChange={(e) =>
									setFormData({
										...formData,
										passingThreshold: Number.parseInt(e.target.value),
									})
								}
								required
								className="bg-card border-border text-foreground"
							/>
						</div>
					</div>

					{/* Visible to all Students */}
					<div className="flex items-center justify-between py-2">
						<Label
							htmlFor="visible"
							className="text-sm font-medium text-foreground"
						>
							Visible to all Students
						</Label>
						<div className="flex items-center gap-3">
							<span
								className={`text-sm ${
									formData.visible
										? 'text-foreground font-medium'
										: 'text-muted-foreground'
								}`}
							>
								Yes
							</span>
							<Switch
								id="visible"
								checked={formData.visible}
								onCheckedChange={(checked) =>
									setFormData({ ...formData, visible: checked })
								}
								className="data-[state=checked]:bg-amber-500"
							/>
							<span
								className={`text-sm ${
									!formData.visible
										? 'text-foreground font-medium'
										: 'text-muted-foreground'
								}`}
							>
								No
							</span>
						</div>
					</div>

					{/* Action Buttons */}
					<div className="flex gap-3 pt-4">
						<Button
							type="button"
							variant="outline"
							onClick={onClose}
							className="flex-1 bg-accent text-accent-foreground border-border hover:bg-accent/80 rounded-full"
						>
							Cancel
						</Button>
						<Button
							type="submit"
							className="flex-1 bg-primary text-primary-foreground hover:bg-primary/90 rounded-full gap-2"
						>
							<Upload className="h-4 w-4" />
							{exam ? 'Update' : 'Create'}
						</Button>
					</div>
				</form>
			</div>
		</div>
	);
}
