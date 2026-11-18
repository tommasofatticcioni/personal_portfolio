import { useEffect, useState } from "react";
import { Home, Code, User, Sun, Moon } from "lucide-react";
import { motion } from "framer-motion";
import { setTheme, useResolvedTheme } from "@/lib/theme";

const navigationItems = [
	{ label: "HOMEPAGE", icon: Home },
	{ label: "PROJECTS", icon: Code },
	{ label: "ABOUT ME", icon: User },
];

const MOBILE_LABEL_WIDTH = 80;

type BottomNavbarProps = {
	className?: string;
	defaultIndex?: number;
	stickyBottom?: boolean;
};

export default function Header({ className, defaultIndex = 0, stickyBottom = false }: BottomNavbarProps) {
	const [activeIndex, setActiveIndex] = useState(defaultIndex);
	const resolvedTheme = useResolvedTheme();
	const [mounted, setMounted] = useState(false);

	useEffect(() => {
		setMounted(true);
	}, []);

	const isDark = resolvedTheme === "dark";

	const toggleTheme = () => {
		setTheme(isDark ? "light" : "dark");
	};

	return (
		<motion.nav
			initial={{ scale: 0.9, opacity: 0 }}
			animate={{ scale: 1, opacity: 1 }}
			transition={{
				type: "spring",
				stiffness: 300,
				damping: 26,
			}}
			className={`
				relative
				bg-card/75
				border border-border
				rounded-full
				flex items-center
				p-2
				shadow-xl
				min-w-[280px]
				w-[80vw]
				max-w-[1400px]
				h-[64px]
				mx-auto
				mt-4
				transition-colors duration-300
				${stickyBottom ? "fixed inset-x-0 bottom-4 z-20" : ""}
				${className ?? ""}
			`}
		>
			{/* LEFT — Profile */}
			<div className="flex items-center gap-3 shrink-0 font-nippo">
				{/* Profile picture */}
				<img
					src="https://cdn.discordapp.com/avatars/657881377559281666/1fab4daa1aed0cea77e32b72648b5c3b.png?size=256"
					alt="Profile picture"
					className="h-10 w-10 rounded-full object-cover hidden sm:block"
				/>

				{/* Name */}
				<p className="whitespace-nowrap text-xl lg:text-2xl hidden lg:block">tommasofatticcioni</p>
			</div>

			{/* CENTER — Navigation */}
			<div className="font-kola absolute left-1/2 -translate-x-1/2 flex items-center gap-1">
				{navigationItems.map((item, index) => {
					const Icon = item.icon;
					const isActive = activeIndex === index;

					return (
						<motion.button
							key={item.label}
							whileTap={{ scale: 0.95 }}
							className="
								flex
								items-center
								relative
								h-10
								min-h-[40px]
								px-1
								py-2
								rounded-full
								text-muted-foreground
								hover:text-foreground
								transition-colors
								duration-200
								focus:outline-none
							"
							onClick={() => setActiveIndex(index)}
							type="button"
							aria-label={item.label}
						>
							<Icon size={25} strokeWidth={2} className="shrink-0" />

							<motion.div
								initial={false}
								animate={{
									width: isActive ? `${MOBILE_LABEL_WIDTH}px` : "0px",
									opacity: isActive ? 1 : 0,
									marginLeft: isActive ? "4px" : "0px",
								}}
								transition={{
									width: {
										type: "spring",
										stiffness: 350,
										damping: 32,
									},
									opacity: { duration: 0.19 },
									marginLeft: { duration: 0.19 },
								}}
								className="flex items-center overflow-hidden max-w-[80px]"
							>
								<span className="font-medium text-sm whitespace-nowrap select-none">{item.label}</span>
							</motion.div>
						</motion.button>
					);
				})}
			</div>

			{/* RIGHT — Theme switch */}
			<div className="ml-auto flex items-center shrink-0">
				<motion.button
					type="button"
					onClick={toggleTheme}
					whileTap={{ scale: 0.9 }}
					aria-label="Toggle theme"
					className="
						flex
						h-10
						w-10
						items-center
						justify-center
						rounded-full
						text-muted-foreground
						hover:text-foreground
						hover:bg-muted
						transition-colors
						duration-200
					"
				>
					{mounted && (
						<motion.div
							initial={false}
							animate={{ rotate: isDark ? 180 : 0 }}
							transition={{
								type: "spring",
								stiffness: 300,
								damping: 20,
							}}
						>
							{isDark ? <Sun size={21} strokeWidth={2} /> : <Moon size={21} strokeWidth={2} />}
						</motion.div>
					)}
				</motion.button>
			</div>
		</motion.nav>
	);
}
