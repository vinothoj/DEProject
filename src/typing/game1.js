import React from 'react';
import Modal from '../templates/modal';
import { Table } from 'reactstrap';

const data = require('./../blurbs.json');

class TextExcerpt extends React.Component {
	constructor(props) {
		super(props)
		this.state = {
			data: data.blurbs,
			timeElapsed: 0,
			wpm: "",
			minutes: 0,
			seconds: 60,
			timeDisplayed: "60s",
			acc: 0, modalopen: false
		}
		this.startStopwatch = false;
		this.pressedBackspace = false;
		this.random = Math.floor(Math.random() * this.state.data.length);
		this.text = this.state.data[this.random].text;
		this.textArray = this.text.split(" ");
		this.totalWords = this.textArray.length;
		this.index = 0;
		this.wordCount = 0;
		this.stopwatch = false;
		this.letterWrong = 0;
		this.letterCount = 0;

		this.handleChange = this.handleChange.bind(this);
		this.displayTimeElapsed = this.displayTimeElapsed.bind(this);
	}

	displayTimeElapsed() {
		this.setState({
			timeElapsed: this.state.timeElapsed + 1,
			seconds: --this.state.seconds,
			timeDisplayed: this.state.seconds + 's'
		});
		if (this.wordCount > 0) {
			this.setState({
				wpm: Math.floor(this.wordCount * (60 / this.state.timeElapsed)),
				acc: (100 - ((this.letterWrong * 100) / this.letterCount)).toFixed(2)
			});

		}

		if (this.state.seconds === 0) {
			clearInterval(this.stopwatch);
			this.setState({
				modalopen: true
			})
		}
	}

	handleChange() {
		if (document.getElementById('btn-countdown')) {
			document.getElementById('typing-field').value = "";
			return;
		}

		if (!this.stopwatch) {
			var shw = document.getElementById("show");
			shw.innerHTML = ""
			this.stopwatch = setInterval(this.displayTimeElapsed, 1000);
		}

		var currentWord = this.textArray[this.index];
		var typingFieldValue = document.getElementById('typing-field').value;
		var currentLetter = typingFieldValue.slice(-1);
		var lastWord = this.index >= this.textArray.length - 1;

		if (typingFieldValue == (lastWord ? currentWord : currentWord + " ")) {
			this.letterIndex = 0;
			this.index++;
			this.wordCount++;
			document.getElementById('typing-field').value = "";

			if (lastWord) {
				clearInterval(this.stopwatch);
			}
		}
		else if (!currentWord.includes(typingFieldValue)) {
			this.letterWrong++;
		}
		if (currentWord !== " ")
			this.letterCount++;

		this.setState({});
	}
	clickRestart = () => {
		this.setState({ modalopen: !this.state.modalopen })
		window.location.reload()
	}
	clickRegister = () => {
		this.props.history.push('/Register')
	}


	render() {

		var paragraph = this.textArray;
		var correct = paragraph.slice(0, this.index).join(" ");
		if (this.index < this.textArray.length)
			correct += " ";
		var rest = this.index <= paragraph.length ? " " + paragraph.slice(this.index + 1).join(" ") : "";


		var word = paragraph[this.index];

		var letterCorrect = "";
		var letterIncorrect = "";
		var Incorrectcnt = 0;
		var letterRest = "";

		var typingField = document.getElementById('typing-field');
		var input = typingField ? typingField.value : "";

		var incorrect = false;
		for (var i = 0; word && i < word.length; i++) {
			if (input[i] == undefined) {
				letterRest += word[i];
			}
			else if (!incorrect && word[i] == input[i]) {
				letterCorrect += word[i];
			}
			else {
				letterIncorrect += word[i];
				incorrect = true;
			}
		}

		//Preview Modal
		const typingfailed = (
			<div>
				<Table bordered>
					<thead>
						<tr>
							<th style={{ background: 'gainsboro' }}>WPM :</th>
							<th>{this.state.wpm}</th>
							<th style={{ background: 'gainsboro' }}>Accuracy :</th>
							<th>{this.state.acc}</th>
						</tr>
					</thead>
				</Table>
				<img src="https://img.icons8.com/emoji/96/000000/downcast-face-with-sweat.png" />
				<h5 style={{ color: 'crimson' }}>Ohhhh...!! Your WPM is under 10...!!</h5>
				<p>Don't Worry..!! Just Press <strong>Restrat Test</strong> to Typify...!!</p>
			</div>
		)

		const typingsuccess = (
			<div>
				<Table bordered>
					<thead>
						<tr>
							<th style={{ background: 'gainsboro' }}>WPM :</th>
							<th>{this.state.wpm}</th>
							<th style={{ background: 'gainsboro' }}>Accuracy :</th>
							<th>{this.state.acc}</th>
						</tr>
					</thead>
				</Table>
				<img src="https://img.icons8.com/color/96/000000/party-baloons.png" />
				<h3 style={{ color: 'crimson' }}>Congratulations...!!</h3>
				<h4><p>You are qualified for Freelance Typers..!!</p></h4>
			</div>
		)


		return (
			<div className="App" id="text-excerpt">
				<header className="App-header">
					<h1>Welcome to the Freelance Typers</h1>
					<div id="show" style={{ color: 'yellow' }}>Just Press Key To Start Test...!!</div>
					<div className="book">
						<p id="paragraph">
							<span className="right-char">{correct}</span>
							<span className="current-word">
								<span className="right-char">{letterCorrect}</span>
								<span className="wrong-char">{letterIncorrect}</span>
								{letterRest}
							</span>
							{rest}
						</p>
					</div>

					<input id="typing-field" type="text" placeholder="Type here" autoFocus onChange={this.handleChange} />
					<br />
					<div className="row">
						<div className="col-12"><h2 id="time-elapsed">Time Remaining: {this.state.timeDisplayed}</h2></div>
						<div className="col-6"><h3>WPM: {this.state.wpm}</h3></div>
						<div className="col-6"><h3>Accuracy: {this.state.acc}</h3></div>
					</div>

				</header>
				{this.state.modalopen ? (this.state.wpm > 10 ? <Modal open={true} button1='Enter Freelancetypers' clickButton1={this.clickRegister} modalheader="Test Result" modalbody={typingsuccess} /> : <Modal open={true} button2='Restart Test' clickButton2={this.clickRestart} modalheader="Test Result" modalbody={typingfailed} />) : ''}
			</div>
		)
	}
}

export default TextExcerpt;