const ScorePage = ({ nick, score, onReset }) => {
	const handleGameRetry = () => {
		onReset();
	};

	const handleGameReset = () => {
		window.location.reload(false);
	};
	return (
		<div className="score">
			<h3 className="score__heading">
				{score >= 0 ? `Congratulations, ${nick} !` : `Try again, ${nick}`}
			</h3>
			<p className="score__paragraph">
				Your score:
				<br />
				<span className="score__points">{score} points</span>
			</p>
			<button className="score__try-again-button" onClick={handleGameRetry}>
				Play Again
			</button>
			<button onClick={handleGameReset}>Reset Game</button>
		</div>
	);
};

export default ScorePage;
