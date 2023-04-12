import { useState } from "react";

const LoginPage = ({ onLogin }) => {
	//state for store nick name
	const [nick, setNick] = useState("");

	//function for handle submitting form
	const handleSubmit = (e) => {
		e.preventDefault();
		onLogin(nick);
	};

	//function for handle setting nick name to a state from input field
	const handleNickChange = (e) => {
		setNick(e.target.value);
	};

	return (
		<form onSubmit={handleSubmit} className="login-form">
			WordCloud Game
			<label htmlFor="nick"></label>
			<input
				type="text"
				id="nick"
				className="login-form__input"
				value={nick}
				required
				onChange={handleNickChange}
				placeholder="Enter your nick..."
			/>
			<button type="submit" className="login-form__button">
				Play
			</button>
		</form>
	);
};

export default LoginPage;
