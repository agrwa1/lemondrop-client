import WordLogo from "./WordLogo";

export default function Header() {
	return (
		<nav className="flex justify-between">
			<WordLogo />
			<div>
				<h2>Sign in</h2>
			</div>
		</nav>
	)
}