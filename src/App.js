import LoginPage from "./components/LoginPage";
import GamePage from "./components/GamePage";
import { useState } from "react";

function App() {
	const [isLoggedIn, setIsLoggedIn] = useState(false);
	const [nick, setNick] = useState("");

	const handleLogin = (nick) => {
		setIsLoggedIn(true);
		setNick(nick);
	};

	return (
		<div className="container">
			{!isLoggedIn ? (
				<LoginPage onLogin={handleLogin} />
			) : (
				<GamePage nick={nick} />
			)}
		</div>
	);
}

export default App;
