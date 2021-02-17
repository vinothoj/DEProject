import React from 'react'
import Cookies from 'universal-cookie'
import { Card, Button, CardHeader, CardBody } from 'reactstrap';

import { connect } from 'react-redux'

import axios from '../API.js'
import { validateEmail, clear, validateFields, customValidation } from '../common.js'

import Header from '../templates/landing/commonheader'
import Footer from '../templates/landing/commonfooter'

const cookies = new Cookies();

class App extends React.Component {
	constructor(props) {
		super(props);
		this.state = {
			id: '1', name: '', email: '', message: '', isError: false,
			error: { name: '', email: '', message: '' },
			successMsg: '',
			likes: 8637
		}
	}
	onChange = (e) => {
		let data = this.state
		data[e.target.name] = e.target.value
		this.setState({ data })
		if (this.state.isError) {
			this.onValidation(data)
		}
	}
	onValidation = (datas) => {
		const emptyFields = [
			{ key: 'name', errVal: 'Enter Name' },
			{ key: 'email', errVal: 'Enter Email ID' },
			{ key: 'message', errVal: 'Enter Message' },
		]
		const emailFields = [
			{ key: 'email', errVal: 'Enter proper Email ID' },
		]

		let input = datas === undefined ? this.state : datas
		const data = validateFields(input, emptyFields, emailFields)
		this.setState({ data })
		return data.isError
	}
	onSubmit = () => {
		const data = this.state
		if (!this.onValidation()) {
			axios.post("/contactus", data).then(res => {
				if (res.data.data && res.data.status === "success") {
					this.setState({ successMsg: 'Thanks for contacting us! We will reach you soon!' })
					setTimeout(() => {
						window.location.reload()
					}, 3000);
				}
				else {
					this.setState({ successMsg: 'Something went wrong!' })
				}
			})
			//this.props.history.push('/allhits')
		}
	}

	render() {
		let listReview = []
		var i = 1;
		for (; i < 46; i++) {
			let random = Math.floor(Math.random() * 1854);
			var count = parseInt(this.state.likes) + parseInt(random);
			
			let path = "assets/img/reviews/" + i + ".png"
			listReview.push(<>
				<Card className="mb-4">
					<CardBody className="text-center padding-20 font-weight-bold">
						<br />
						<img src={path} alt="" className="reviewimg1 mb-4" />

						<div className="row ml-2 mb-4 text-center">
						<div className="col-2" style={{ cursor: 'default' }}><i className="fa fa-thumbs-o-up" aria-hidden="true"></i>{' '}{count} Like</div>
							<div className="col-2" style={{ cursor: 'default' }}><i className="fa fa-share-alt" aria-hidden="true"></i>{' '}{count - 8849} Share</div>
							<div className="col-2" style={{ cursor: 'default' }}><i className="fa fa-television" aria-hidden="true"></i>{' '}{count + 7464} Views</div>
							<div className="col-6">
								<div className="a2a_kit a2a_kit_size_32 a2a_default_style text-right" data-a2a-url="http://www.freelancetypers.com" data-a2a-title="FreelanceTypers - Work from home">
									<a className="a2a_dd" href="https://www.addtoany.com/share"></a>
									<a className="a2a_button_facebook"></a>
									<a className="a2a_button_twitter"></a>
									<a className="a2a_button_email"></a>
									<a className="a2a_button_whatsapp"></a>
									<a className="a2a_button_linkedin"></a>
									<a className="a2a_button_telegram"></a>
									<a className="a2a_button_skype"></a>
									<a className="a2a_button_google_gmail"></a>
								</div>
							</div>
						</div>
					</CardBody>
				</Card>
			</>)
		}
		let res;
		res = (
			<>
				<Header />

				<div id="review" className="row rowfit">
					{/* <h1 className="tm-site-name logocolor" style={{zIndex:'1'}}>Freelance <span style={{ color: 'white' }}>Typers</span></h1> */}
					<div className="col-1"></div>
					<div className="col-10">
						<div className="row mb-4">
							<div className="col-6 text-right"> <a href="/ourcommunity" className="btn hero-btn3">Top 10 workers of the week</a></div>
							<div className="col-6 text-left"><a href="/reviews" className="btn hero-btn3">Millions of workers review</a></div>
						</div>
						<h1 className="text-center" style={{color:'crimson'}}>Millions of Workers Review</h1> 

						{listReview}
					</div> 
					<div className="col-1"></div>
					<div className="col-6"></div>
					<div className="col-6"><div className="btn hero-btn3">Next</div></div>
				
					{/* <div className="col-3" style={{ paddingLeft: '0px' }}>
						<Card className="mb-2">
							<CardBody className="text-left font-weight-bold">
								<img className="lazy aligncenter wp-image-11703 size-medium lazy-loaded" src="https://tradebrains.in/wp-content/uploads/2020/09/trade-brains-portal-poster.jpg" data-lazy-type="image" data-lazy-src="https://tradebrains.in/wp-content/uploads/2020/09/trade-brains-portal-poster.jpg" alt="trade brains portal" width="300" />
							</CardBody>
						</Card>
						<Card>
							<CardBody className="text-left font-weight-bold">
								<img src="https://static.clmbtech.com/ctn/2296/images/2/0f487fb794832c7eb8b6b27b24907508_1605167446401_0.webp" />
							</CardBody>
						</Card>
					</div> */}
				</div>

				<Footer />
			</>
		)
		return res;
	}
}

const mapStateToProps = (state) => ({ common: state.common })

export default connect(mapStateToProps)(App);