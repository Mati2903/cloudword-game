import WordCloud from "./WordCloud";
import ScorePage from "./ScorePage";
import { useState } from "react";

const GamePage = ({ nick }) => {
	const [finishGame, setFinishGame] = useState(false);
	const [score, setScore] = useState(null);

	//function for handle click on finish game button (callback from WordCloud component)
	const handleFinish = (score) => {
		setFinishGame(true);
		setScore(score);
	};

	//function for handle reset game (callback from ScorePage component)
	const handleReset = () => {
		setFinishGame(false);
		setScore(null);
	};

	return (
		<div>
			{finishGame ? (
				<ScorePage nick={nick} score={score} onReset={handleReset} />
			) : (
				<>
					<h3>Welcome to the game, {nick}!</h3>
					<WordCloud onFinish={handleFinish} />
				</>
			)}
		</div>
	);
};

export default GamePage;
