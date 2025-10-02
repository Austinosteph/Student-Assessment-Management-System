import {
	User,
	Settings,
	LogOut,
	Bell,
	HelpCircle,
	Moon,
	Sun,
} from 'lucide-react';
import { Button } from '@/components/ui/button';
import {
	DropdownMenu,
	DropdownMenuContent,
	DropdownMenuItem,
	DropdownMenuLabel,
	DropdownMenuSeparator,
	DropdownMenuTrigger,
} from '../components/ui/dropdown-menu';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { useTheme } from '@/hooks/use-theme';

export function UserProfile() {
	const { theme, toggleTheme } = useTheme();

	const handleProfile = () => {
		console.log('[v0] Navigate to profile');
	};

	const handleSettings = () => {
		console.log('[v0] Navigate to settings');
	};

	const handleNotifications = () => {
		console.log('[v0] Navigate to notifications');
	};

	const handleHelp = () => {
		console.log('[v0] Navigate to help');
	};

	const handleLogout = () => {
		console.log('[v0] Logout user');
	};

	return (
		<DropdownMenu>
			<DropdownMenuTrigger asChild>
				<Button
					variant="ghost"
					className="relative h-10 w-10 rounded-full hover:ring-2 hover:ring-ring transition-all"
				>
					<Avatar className="h-10 w-10">
						<AvatarImage src="/professional-avatar.png" alt="User" />
						<AvatarFallback className="bg-primary text-primary-foreground">
							JD
						</AvatarFallback>
					</Avatar>
				</Button>
			</DropdownMenuTrigger>
			<DropdownMenuContent
				className="w-56 animate-in fade-in-50 slide-in-from-top-1"
				align="end"
				forceMount
			>
				<DropdownMenuLabel className="font-normal">
					<div className="flex flex-col space-y-1">
						<p className="text-sm font-medium leading-none">John Doe</p>
						<p className="text-xs leading-none text-muted-foreground">
							john.doe@university.edu
						</p>
					</div>
				</DropdownMenuLabel>
				<DropdownMenuSeparator />
				<DropdownMenuItem onClick={handleProfile}>
					<User className="mr-2 h-4 w-4" />
					<span>Profile</span>
				</DropdownMenuItem>
				<DropdownMenuItem onClick={handleSettings}>
					<Settings className="mr-2 h-4 w-4" />
					<span>Settings</span>
				</DropdownMenuItem>
				<DropdownMenuItem onClick={toggleTheme}>
					{theme === 'light' ? (
						<Moon className="mr-2 h-4 w-4" />
					) : (
						<Sun className="mr-2 h-4 w-4" />
					)}
					<span>{theme === 'light' ? 'Dark Mode' : 'Light Mode'}</span>
				</DropdownMenuItem>
				<DropdownMenuItem onClick={handleNotifications}>
					<Bell className="mr-2 h-4 w-4" />
					<span>Notifications</span>
				</DropdownMenuItem>
				<DropdownMenuItem onClick={handleHelp}>
					<HelpCircle className="mr-2 h-4 w-4" />
					<span>Help & Support</span>
				</DropdownMenuItem>
				<DropdownMenuSeparator />
				<DropdownMenuItem
					onClick={handleLogout}
					className="text-destructive focus:text-destructive"
				>
					<LogOut className="mr-2 h-4 w-4" />
					<span>Log out</span>
				</DropdownMenuItem>
			</DropdownMenuContent>
		</DropdownMenu>
	);
}
