import {
	Search,
	ChevronDown,
	Calendar,
	BookOpen,
	FolderOpen,
} from 'lucide-react';
import { Button } from '@/components/ui/button';
import {
	DropdownMenu,
	DropdownMenuContent,
	DropdownMenuItem,
	DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu';
import { Input } from '../components/ui/input';

//  Using custom hook for filter logic
import { useExamFilters } from '@/hooks/use-exam-filters';

export function ExamFilters() {
	const {
		filters,
		updateSearch,
		updateDateRange,
		updateSubject,
		updateCategory,
	} = useExamFilters();

	return (
		<div className="flex md:flex-row flex-col justify-between items-center gap-2 mb-8">
			{/* Search */}
			<div className="relative flex-1 md:min-w-[200px] min-w-[320px] max-w-[500px]">
				<Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 md:h-10 w-4 md:w-10 text-foreground" />
				<Input
					placeholder="Search"
					value={filters.search}
					onChange={(e) => updateSearch(e.target.value)}
					className="p-4 rounded-3xl md:py-7 py-5 placeholder:text-xl pl-14 bg-card border-border transition-all duration-200 focus:ring-2 focus:ring-ring"
				/>
			</div>

			{/* Date Range */}
			<DropdownMenu>
				<DropdownMenuTrigger asChild>
					<Button
						variant="outline"
						className="flex-1 min-w-[320px] md:min-w-[190px] lg:min-w-[100px] max-w-[200px] bg-card border-border hover:bg-accent transition-colors md:py-7 py-2 rounded-3xl"
					>
						<Calendar className="h-10 w-10" />
						<span className="text-xl">{filters.dateRange}</span>
						<ChevronDown className="h-10 w-10" />
					</Button>
				</DropdownMenuTrigger>
				<DropdownMenuContent
					align="start"
					className="animate-in fade-in-50 slide-in-from-top-1"
				>
					<DropdownMenuItem onClick={() => updateDateRange('All Dates')}>
						All Date
					</DropdownMenuItem>
					<DropdownMenuItem onClick={() => updateDateRange('21-24 November')}>
						21-24 November
					</DropdownMenuItem>
					<DropdownMenuItem onClick={() => updateDateRange('25-28 November')}>
						25-28 November
					</DropdownMenuItem>
					<DropdownMenuItem onClick={() => updateDateRange('December')}>
						December
					</DropdownMenuItem>
				</DropdownMenuContent>
			</DropdownMenu>

			{/* Subject */}
			<DropdownMenu>
				<DropdownMenuTrigger asChild>
					<Button
						variant="outline"
						className="gap-2 flex-1 min-w-[320px] md:min-w-[170px] lg:min-w-[70px] max-w-[200px] bg-card border-border hover:bg-accent transition-colors md:py-7 py-2 rounded-3xl md:space-x-0 space-x-2 lg:space-x-2"
					>
						<BookOpen className="h-10 w-10" />
						<span className="text-xl">{filters.subject}</span>
						<ChevronDown className="h-10 w-10" />
					</Button>
				</DropdownMenuTrigger>
				<DropdownMenuContent
					align="start"
					className="animate-in fade-in-50 slide-in-from-top-1"
				>
					<DropdownMenuItem onClick={() => updateSubject('All Subjects')}>
						All Subjects
					</DropdownMenuItem>
					<DropdownMenuItem onClick={() => updateSubject('Mathematics')}>
						Mathematics
					</DropdownMenuItem>
					<DropdownMenuItem onClick={() => updateSubject('Physics')}>
						Physics
					</DropdownMenuItem>
					<DropdownMenuItem onClick={() => updateSubject('Chemistry')}>
						Chemistry
					</DropdownMenuItem>
					<DropdownMenuItem onClick={() => updateSubject('Engineering')}>
						Engineering
					</DropdownMenuItem>
				</DropdownMenuContent>
			</DropdownMenu>

			{/* Category */}
			<DropdownMenu>
				<DropdownMenuTrigger asChild>
					<Button
						variant="outline"
						className="gap-2 bg-card border-border hover:bg-accent transition-colors md:py-7 py-5 md:min-w-[100px] min-w-[320px]  lg:min-w-[320px] rounded-3xl space-x-3"
					>
						<FolderOpen className="h-10 w-10" />
						<span className="text-xl"> {filters.category}</span>
						<ChevronDown className="h-10 w-10" />
					</Button>
				</DropdownMenuTrigger>
				<DropdownMenuContent
					align="start"
					className="animate-in fade-in-50 slide-in-from-top-1"
				>
					<DropdownMenuItem onClick={() => updateCategory('All Categories')}>
						All Categories
					</DropdownMenuItem>
					<DropdownMenuItem onClick={() => updateCategory('Theatre Art')}>
						Theatre Art
					</DropdownMenuItem>
					<DropdownMenuItem onClick={() => updateCategory('Science')}>
						Science
					</DropdownMenuItem>
					<DropdownMenuItem onClick={() => updateCategory('Engineering')}>
						Engineering
					</DropdownMenuItem>
				</DropdownMenuContent>
			</DropdownMenu>
		</div>
	);
}
