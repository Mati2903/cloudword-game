import { useState } from "react";
import wordsdb from "../words.json";

const WordCloud = ({ onFinish }) => {
	//================ states ==========================
	//set random index from wordsdb array depend on array length
	const [index, setIndex] = useState(
		Math.floor(Math.random() * wordsdb.length)
	);
	//state for storing words selected by user after clicking on it
	const [selectedWords, setSelectedWords] = useState([]);
	//state for storing true for right answers and false for wrong in an array
	const [checkedAnswers, setCheckedAnswers] = useState([]);
	//state for handle show answers button functionality
	const [showAnswers, setShowAnswers] = useState(false);

	//============= function for handle clicking on words ==================
	const handleWordClick = (e, word) => {
		const clickedWord = e.target;
		//if statement for toggle check/uncheck and change style through add/remove class .selected
		if (selectedWords.includes(word)) {
			//filtering selectedWords array when some word is unchecked
			setSelectedWords(selectedWords.filter((wrd) => wrd !== word));
			clickedWord.classList.remove("selected");
		} else {
			//spreading selectedWords array with all previous words + newly checked word
			setSelectedWords([...selectedWords, word]);
			clickedWord.classList.add("selected");
		}
	};

	//=========== function for handle className change after click on a specific word with its index =============
	const handleClassNameChange = (word, i) => {
		//check if user clicked show answer button
		if (showAnswers) {
			return selectedWords.includes(word) //if selectedWords includes specific word
				? checkedAnswers[i] //check if this word (based on its index) is right (true) or wrong (false)
					? "correct" //if yes then add class .correct
					: "incorrect" //if no then add class .incorrect
				: ""; //if the word is not in checkedAnswers state, then do not add any class
			//else if user didn't click show answer button yet
		} else {
			//if the word is included in selectedWords state then add class .selected, otherwise add nothing
			return selectedWords.includes(word) ? "selected" : ""; //
		}
	};

	//============ function for handle checking answer after button click ===============
	const handleCheckAnswers = () => {
		//if user selected at least one word
		if (selectedWords.length > 0) {
			//store currently selected question from wordsdb in a variable
			const currentQuestion = wordsdb[index];
			//check if word is included in good_words (return true) or if it's not (return false)
			const rightWords = currentQuestion.all_words.map((word) =>
				currentQuestion.good_words.includes(word)
			);
			setCheckedAnswers(rightWords);
			setShowAnswers(true);
			//if user selected no word
		} else {
			alert("Please choose at least one word");
		}
	};

	//============ function for handle calculating scores ================
	const calculateScore = () => {
		const currentQuestion = wordsdb[index];
		//check the length of words correctly marked by the user
		const numSelectedCorrect = selectedWords.filter((word) =>
			currentQuestion.good_words.includes(word)
		).length;
		//check the length of words incorrectly marked by the user
		const numSelectedIncorrect = selectedWords.filter(
			(word) => !currentQuestion.good_words.includes(word)
		).length;
		//check the length of correct words but not marked by the user
		const numNotSelectedCorrect = currentQuestion.good_words.filter(
			(word) => !selectedWords.includes(word)
		).length;
		return (
			//result = (number of correctly marked words * 2) - (number of incorrectly marked words + number of correct words but not marked)
			numSelectedCorrect * 2 - (numSelectedIncorrect + numNotSelectedCorrect)
		);
	};

	//============ function for handle finish game button click ================
	const handleFinishGame = () => {
		const score = calculateScore();
		onFinish(score);
	};

	return (
		<div className="wordcloud-container">
			<h3 className="wordcloud-container__heading">
				{wordsdb[index].question}
			</h3>
			<div className="wordcloud-container__words-container">
				{wordsdb[index].all_words.map((word, i) => {
					return (
						<span
							key={i}
							className={`word ${handleClassNameChange(word, i)}`}
							onClick={(e) => handleWordClick(e, word)}
						>
							{word}
						</span>
					);
				})}
			</div>
			{showAnswers ? (
				<button onClick={handleFinishGame}>Finish game</button>
			) : (
				<button onClick={handleCheckAnswers}>Check answers</button>
			)}
		</div>
	);
};

export default WordCloud;
