import React, { useState } from 'react'
import Nav from '../templates/header'
import Cookies from 'universal-cookie'

import axios from '../API.js'
import Modal from '../templates/modal';
import { validateEmail, clear, validateFields, customValidation } from '../common.js'
const cookies = new Cookies();

class Work extends React.Component {
	constructor(props) {
		super(props);
		this.myRef = React.createRef();
		this.state = {
			id: '1', email: '', requesterid: '', reward: '0', filename: '', filepath: '', entertext: '', isError: false, isLoad: false,
			error: { entertext: '' },
			successMsg: '', errorMsg: '', imgWidth: null,
			works: cookies.get('works'),
			limit: 10,
			timelimit: 10,
			time: 0,
			start: 0,
			min: 0,
			isOn: false, totearnings: 0, modalopen: false,
			worktype: ''
		}
	}
	generateImage = (data) => {
		let random = Math.floor(Math.random() * 51);
		cookies.set('works', this.state.works - random)
		data.filepath = "http://freelancetypers.com/images/works/" + random + ".jpg"
		data.filename = random + ".jpg"
		data.requesterid = this.props.location.state.id
		data.reward = this.props.location.state.reward
		data.email = cookies.get('email')
		data.worktype = "Regular"

		this.setState({ data })
	}
	generateHandImage = (data, cnt) => {
		data.filepath = "http://freelancetypers.com/images/handworks/" + cnt + ".jpg"
		data.filename = cnt + ".jpg"
		data.requesterid = this.props.location.state.id
		data.reward = this.props.location.state.reward
		data.email = cookies.get('email')
		data.worktype = "Hand"

		this.setState({ data })
	}
	startTimer = () => {
		this.setState({
			time: this.state.time,
			start: this.state.time++,
			isOn: true
		})

		this.timer = setInterval(() => this.setState({
			time: this.state.start++
		}), 1000);

	}
	stopTimer = () => {
		this.setState({ isOn: false })
		clearInterval(this.timer)
	}
	resetTimer = () => {
		this.setState({ time: 0 })
	}
	checkEarnings = () => {
		let email = cookies.get('email')
		axios.get("/hitsoverview", { params: { email: email } }).then(res => {
			var data = res.data.data[0]
			axios.get("/Users", { params: { email: email } }).then(res => {
				let items = res.data.data[0]
				if (items.isPayment === 1 && items.survey1 !== '')
					this.props.history.push({ pathname: '/allhits', state: cookies.get('id') })
				else if (data && data.isPayment === 0 && parseFloat(data.totearnings) >= 5.0) {
					if (items.Address1 === '') this.setState({ modalopen: !this.state.modalopen })
					else if (items.accno === '') this.props.history.push({ pathname: '/Bank', state: cookies.get('id') })
					else this.props.history.push({ pathname: '/AddsmallAmount', state: cookies.get('id') })
				}
			})
		})
	}
	shouldComponentUpdate = () => {
		if (this.state.time > 58) {
			let tlimit = this.state.timelimit--;
			this.setState({ min: this.state.min++, time: 0, start: 1, timelimit: tlimit })
			if (tlimit === 0) this.stopTimer()
		}
		return true
	}
	componentDidMount() {
		this.checkEarnings()
		if (this.props.location.state !== undefined) {
			let emailid = cookies.get('email')
			axios.get("/userWorkslimit", { params: { email: emailid } }).then(result => {
				const data = this.state
				let count = result.data.data[0].workserial
				let ispayment = result.data.data[0].isPayment
				if (ispayment === 1 && Number.isInteger(count / 4))
					this.generateHandImage(data, count / 4)
				else {
					this.generateImage(data)
					axios.get("/userWorks", { params: { email: data.email, filepath: data.filepath } }).then(res => {
						if (res.data.data.length > 0) {
							this.generateImage(data)
						}
					})
				}
			})
		}
		this.startTimer()
	}

	zoomin = () => {
		var myImg = document.getElementById("map");
		var currWidth = myImg.clientWidth;
		const data = this.state
		data.imgWidth = data.imgWidth === null ? currWidth : data.imgWidth
		if (currWidth == 2500) return false;
		else data.imgWidth = (data.imgWidth + 100)

		this.setState({ data })
	}

	zoomout = () => {
		var myImg = document.getElementById("map");
		var currWidth = myImg.clientWidth;
		const data = this.state
		data.imgWidth = data.imgWidth === null ? currWidth : data.imgWidth
		if (currWidth == 100) return false;
		else data.imgWidth = (data.imgWidth - 100)
		this.setState({ data })
	}
	onChange = (e) => {
		const data = this.state
		data[e.target.name] = e.target.value
		this.setState({ data })
		this.onValidation(data)
	}
	onValidation = (inp) => {
		const emptyFields = [
			{ key: 'entertext', errVal: 'Enter text properly' }
		]
		const data = validateFields(inp !== undefined ? inp : this.state, emptyFields)
		this.setState({ data })
		return data.isError
	}
	onSubmit = () => {
		const data = this.state
		data.userid = 1
		if (data.worktype === 'Hand')
			data.reject = 1
		else data.reject = 0
		if (this.state.email === null || this.state.email === '') {
			this.setState({ errorMsg: 'Your account will be suspended for invalid submission!' })
		}
		else if (!this.onValidation()) {
			if (this.myRef.current === null) {
				this.myRef.current = ''

				this.setState({ isLoad: true })
				axios.post("/userWorks/Add", data).then(res => {
					if (res.data.status === 'success')
						setTimeout(() => {
							this.setState({ isLoad: false })
							window.location.reload()
						}, 3000)
					this.setState({ successMsg: 'Thank You, Your work has been submitted Successfully! Your work is under Qualification Checking it will be approved or rejected within an hour.' })
					//this.checkEarnings()
				}).catch(err => {
					console.log(err)
				})
			}
		}
	}
	clickButton1 = () => {
		this.props.history.push({ pathname: '/workerregister', state: cookies.get('id') })
	}

	render() {
		let load = (<>
			<div className="loading-container">
				<div className="loading"></div>
				<div id="">loading</div>
			</div>
		</>)
		const typingsuccess1 = (
			<div>
				<h2>Congratulations!</h2>
				<p style={{ fontSize: '14px' }}>You're earn $5.00 now. You eligible to transfer your earnings directly to your bank account. Click the transfer earnings and add your bank details.</p>
			</div>
		)

		let res = (<>
			{this.state.isLoad ? load : ''}
			<Nav mainactive="hits" subactive="allhits" />

			{this.state.modalopen ? <Modal open={true} button1='Transfer earnings' clickButton1={this.clickButton1} modalheader="Alert Message" modalbody={typingsuccess1} /> : ''}

			<div className="p-4">
				<div className="row">
					<div className="col-6" style={{ color: 'red', fontSize: '12px' }}>
						(<strong>Warning:</strong> Given below image and data are All rights reserved. No part of this data or images maybe used in any manner without written permission of owner except for use, Don’t share, download or copy this data and images It is violation of participation agreement and copyright laws.)
				</div>
					<div className="col-6 text-right">
						<span style={{ marginRight: '24em' }}>Works: {this.state.works}</span>
						<span>Time elapsed:   {this.state.min}: {this.state.time} of {this.state.limit}min</span>
					</div>
				</div>

				<div className="row" style={{ padding: '1em' }}>
					<div className="col-6">
						<div className="container-outer mb-4">
							<img id="map" src={this.state.filepath} width={this.state.imgWidth === null ? "100%" : this.state.imgWidth} />
						</div>
						<div className="text-center">
							<button type="button" className="button-sm" onClick={this.zoomin}> Zoom In</button>{'  '}
							<button type="button" className="button-sm" onClick={this.zoomout}> Zoom Out</button>
						</div>
					</div>

					<div className="col-6">
						<h2>Extract Items for given scanned document</h2>
						<h5 className="mb-4">Work Reward</h5>

						<textarea name="entertext" className="col-12 mb-4" placeholder="Please type here" style={{ height: '24em' }} onChange={this.onChange} value={this.state.entertext}></textarea>
						{this.state.error.entertext}
						{this.state.errorMsg !== '' ? <div className="error"><i className="fa fa-exclamation-triangle" aria-hidden="true"></i> {this.state.errorMsg}</div> : ''}
						{this.state.successMsg !== '' ? <div className="success"><i className="fa fa-check" aria-hidden="true"></i> {this.state.successMsg}</div> : ''}

						<div className="mt-2 text-center">
							<button type="button" className="button-sm" onClick={this.onSubmit}> Submit</button>{'  '}
							<button type="button" className="button-sm" onClick={() => { this.props.history.push('/allhits') }}> {!this.state.isOn ? 'Resume' : 'Stop'} </button>
						</div>

					</div>

				</div>

			</div>
		</>)

		return res
	}
}

export default Work;
