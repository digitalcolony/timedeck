import React from "react";
import { Container, Text, Group, Anchor, useMantineColorScheme } from "@mantine/core";

export default function Footer() {
	const { colorScheme } = useMantineColorScheme();
	const isDark = colorScheme === "dark";

	const currentYear = new Date().getFullYear();

	return (
		<footer
			style={{
				marginTop: "auto",
				padding: "2rem 0",
				borderTop: isDark ? "1px solid #475569" : "1px solid #e2e8f0",
				backgroundColor: isDark ? "rgba(15, 23, 42, 0.8)" : "rgba(248, 250, 252, 0.8)",
				backdropFilter: "blur(10px)",
			}}
		>
			<Container size="xl">
				<Text
					size="sm"
					ta="center"
					c="dimmed"
					style={{
						lineHeight: 1.6,
						maxWidth: "800px",
						margin: "0 auto",
					}}
				>
					⏰ 2025-{currentYear}. TimeDeck is a project created by{" "}
					<Anchor
						href="https://michaelallensmith.com"
						target="_blank"
						rel="noopener noreferrer"
						style={{ color: isDark ? "#60a5fa" : "#1e40af" }}
					>
						Michael Allen Smith
					</Anchor>
					. TimeDeck does not track users, require account signup, or display ads. No pop-up windows
					either. It is a non-commercial hobby project made in the spirit of the early web. Learn
					more about the{" "}
					<Anchor
						href="https://potatohack.com"
						target="_blank"
						rel="noopener noreferrer"
						style={{ color: isDark ? "#60a5fa" : "#1e40af" }}
					>
						Potato Hack
					</Anchor>
					.
					<br />
					<br />
					The code for this site is freely available on{" "}
					<Anchor
						href="https://github.com/digitalcolony/timedeck"
						target="_blank"
						rel="noopener noreferrer"
						style={{ color: isDark ? "#60a5fa" : "#1e40af" }}
					>
						GitHub
					</Anchor>
					. Use however you like.
				</Text>
			</Container>
		</footer>
	);
}
