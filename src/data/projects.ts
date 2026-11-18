export const projectStatus = {
	ongoing: {
		label: "Ongoing",
		className: "bg-[#5865F2]/15 text-[#5865F2] border-[#5865F2]/30",
	},
	onHold: {
		label: "On Hold",
		className: "bg-yellow-500/15 text-yellow-500 border-yellow-500/30",
	},
	ended: {
		label: "Ended",
		className: "bg-red-500/15 text-red-500 border-red-500/30",
	},
	online: {
		label: "Online",
		className: "bg-green-500/15 text-green-500 border-green-500/30",
	},
} as const;

export type ProjectStatus = keyof typeof projectStatus;

export type Project = {
	name: string;
	description: string;
	location: string;
	status: ProjectStatus;
	features: string[];
	technologies: string[];
};

export const projects: Project[] = [
	{
		name: "Xylo",
		description:
			"A Discord bot ecosystem focused on community management and automation. It is connected to a dedicated web dashboard for managing and configuring the bot.",
		location: "/projects/xylo",
		status: "onHold",
		features: ["Tickets", "Verification", "Suggestions", "Web Dashboard"],
		technologies: ["TypeScript", "Next.js", "pnpm", "Docker", "PostgreSQL", "Prisma"],
	},
	{
		name: "Coming soon...",
		description: "There will be more things in the near future, stay tuned...",
		location: "/",
		status: "onHold",
		features: ["???"],
		technologies: ["???"],
	},
];
