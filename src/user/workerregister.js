import React from 'react'
import { Card, Button, CardHeader, CardBody } from 'reactstrap';
import { connect } from 'react-redux'

import Header from '../templates/landing/commonheader'
import Footer from '../templates/landing/commonfooter'
import axios from '../API.js'
import Modal from '../templates/modal';
import { validateEmail, clear, validateFields, customValidation } from '../common.js'

class App extends React.Component {
	constructor(props) {
		super(props);
		this.courtries = "Afghanistan,Aland Islands,Albania,Algeria,American Samoa,Andorra,Angola,Anguilla,Antarctica,Antigua And Barbuda,Argentina,Armenia,Aruba,Australia,Austria,Azerbaijan,Bahamas,Bahrain,Bangladesh,Barbados,Belarus,Belgium,Belize,Benin,Bermuda,Bhutan,Bolivia,Bosnia and Herzegovina,Botswana,Bouvet Island,Brazil,British Indian Ocean Territory,Brunei Darussalam,Bulgaria,Burkina Faso,Burundi,Cambodia,Cameroon,Canada,Cape Verde,Cayman Islands,Central African Republic,Chad,Chile,China,Christmas Island,Cocos (Keeling) Islands,Colombia,Comoros,Congo,Congo, the Democratic Republic of the,Cook Islands,Costa Rica,Cote d'Ivoire,Croatia,Cyprus,Czech Republic,Denmark,Djibouti,Dominica,Dominican Republic,East Timor,Ecuador,Egypt,El Salvador,Equatorial Guinea,Eritrea,Estonia,Ethiopia,Falkland Islands,Faroe Islands,Fiji,Finland,France,French Guiana,French Polynesia,French Southern Territories,Gabon,Gambia,Georgia,Germany,Ghana,Gibraltar,Greece,Greenland,Grenada,Guadeloupe,Guam,Guatemala,Guernsey,Guinea,Guinea-Bissau,Guyana,Haiti,Heard and Mc Donald Islands,Honduras,Hong Kong,Hungary,Iceland,India,Indonesia,Ireland,Isle Of Man,Israel,Italy,Jamaica,Japan,Jersey,Jordan,Kazakhstan,Kenya,Kiribati,Korea, Republic of,Kuwait,Kyrgyzstan,Lao People's Democratic Republic,Latvia,Lebanon,Lesotho,Liberia,Libyan Arab Jamahiriya,Liechtenstein,Lithuania,Luxembourg,Macau,Macedonia,Madagascar,Malawi,Malaysia,Maldives,Mali,Malta,Marshall Islands,Martinique,Mauritania,Mauritius,Mayotte,Mexico,Micronesia, Federated States of,Moldova, Republic of,Monaco,Mongolia,Montenegro,Montserrat,Morocco,Mozambique,Myanmar,Namibia,Nauru,Nepal,Netherlands,Netherlands Antilles,New Caledonia,New Zealand,Nicaragua,Niger,Nigeria,Niue,Norfolk Island,Northern Mariana Islands,Norway,Oman,Pakistan,Palau,Palestinian Territory, Occupied,Panama,Papua New Guinea,Paraguay,Peru,Philippines,Pitcairn,Poland,Portugal,Puerto Rico,Qatar,Reunion,Romania,Russian Federation,Rwanda,Saint Kitts and Nevis,Saint Lucia,Saint Vincent and the Grenadines,Samoa (Independent),San Marino,Sao Tome and Principe,Saudi Arabia,Senegal,Serbia,Serbia and Montenegro,Seychelles,Sierra Leone,Singapore,Slovakia,Slovenia,Solomon Islands,Somalia,South Africa,South Georgia and the South Sandwich Islands,Spain,Sri Lanka,St. Helena,St. Pierre and Miquelon,Suriname,Svalbard and Jan Mayen Islands,Swaziland,Sweden,Switzerland,Taiwan,Tajikistan,Tanzania,Thailand,Timor-Leste,Togo,Tokelau,Tonga,Trinidad and Tobago,Tunisia,Turkey,Turkmenistan,Turks and Caicos Islands,Tuvalu,Uganda,Ukraine,United Arab Emirates,United Kingdom,United States,United States Minor Outlying Islands,Uruguay,Uzbekistan,Vanuatu,Vatican City State (Holy See),Venezuela,Viet Nam,Virgin Islands (British),Virgin Islands (U.S.),Wallis and Futuna Islands,Western Sahara,Yemen,Yugoslavia,Zambia,Zimbabwe"
		this.hearabouts = "News or magazine article,Online search,Social media,Blog,Family or Friends,Other"
		this.reasons = "I want to earn rewards,I like that I can work from anywhere or at any time,I'm looking for an interesting way to pass time,I want to learn new skills,Others"
		this.state = {
			country: 'India', fullname: '', address1: '', address2: '', address3: '', city: '', state: '', zipcode: '', hearabout: 'Select', primaryreason: 'Select', isError: false, isModal: false,
			error: { country: '', fullname: '', address1: '', address2: '', address3: '', city: '', state: '', zipcode: '', mobile: '', hearabout: '', primaryreason: '' }
		}
	}
	clickButton2 = () => {
		this.props.history.push('/Register')
	}
	onChange = (e) => {
		this.setState({ [e.target.name]: e.target.value })
	}
	onValidation = () => {
		const emptyFields = [
			{ key: 'fullname', errVal: 'Enter fullname' },
			{ key: 'address1', errVal: 'Enter address1' },
			{ key: 'city', errVal: 'Enter city' },
			{ key: 'state', errVal: 'Enter state' },
			{ key: 'zipcode', errVal: 'Enter zipcode' },
		]
		const data = validateFields(this.state, emptyFields)

		if (data.hearabout === 'Select') customValidation(data, 'hearabout', 'Select any one')
		if (data.primaryreason === 'Select') customValidation(data, 'primaryreason', 'Select any one')
		this.setState({ data })

		return data.isError
	}
	onSubmit = () => {
		if (!this.onValidation()) {
			const data = this.state
			data.userid = 1
			data.action = "worker"
			data.id = this.props.location.state

			axios.post("/Users/Update", data).then(res => {
				if (res.data.status === 'success') {
					this.props.history.push({ pathname: '/addsmallamount', state: this.props.location.state })
				}
			}).catch(err => {
				console.log(err)
			})
		}
	}
	componentDidMount = () => {
		if (this.props.location.state === undefined) {
			this.setState({ isModal: true })
		}
	}

	render() {
		const loadcountries = this.courtries.split(",").map((m, index) => {
			return (<option key={index} value={m}>{m}</option>)
		})
		const loadhearabout = this.hearabouts.split(",").map((m, index) => {
			return (<option key={index} value={m}>{m}</option>)
		})
		const loadreason = this.reasons.split(",").map((m, index) => {
			return (<option key={index} value={m}>{m}</option>)
		})

		let res;
		res = (
			<>
			<div className="background-image1"></div>
				<Header />
				
				<div className="row centerscreen" style={{ minHeight:'74vh', marginRight: '0px', marginLeft: '0px' }}>
					{/* <h1 className="logocolor">Freelance <span style={{ color: 'black' }}>Typers</span></h1> */}
					<div className="col-4"></div>
					<div className="col-4">
						<Card>
							<CardBody className="padding-20 font-weight-bold">

								<h3>Worker Information</h3>
								<br />
								<div className="form-group">
									<label>Country</label>
									<select name="country" type="text" className="form-control" onChange={this.onChange} value={this.state.country} >
										{loadcountries}
									</select>
									{this.state.error.country}
								</div>
								<div className="form-group">
									<label>Fullname</label>
									<input name="fullname" type="fullname" className="form-control" onChange={this.onChange} value={this.state.fullname} />
									{this.state.error.fullname}
								</div>
								<div className="form-group">
									<label>Address</label>
									<div className="mb-2"><input name="address1" type="text" className="form-control" onChange={this.onChange} value={this.state.address1} /></div>
									<div className="mb-2"><input name="address2" type="text" className="form-control" onChange={this.onChange} value={this.state.address2} /></div>
									<div className="mb-2"><input name="address3" type="text" className="form-control" onChange={this.onChange} value={this.state.address3} /></div>
									{this.state.error.address1}
								</div>
								<div className="form-group">
									<label>City</label>
									<input name="city" type="text" className="form-control" onChange={this.onChange} value={this.state.city} />
									{this.state.error.city}
								</div>
								<div className="form-group">
									<label>State, province or region</label>
									<input name="state" type="text" className="form-control" onChange={this.onChange} value={this.state.state} />
									{this.state.error.state}
								</div>
								<div className="form-group">
									<label>ZIP or postal code</label>
									<input name="zipcode" type="text" className="form-control" onChange={this.onChange} value={this.state.zipcode} maxLength="6" />
									{this.state.error.zipcode}
								</div>

								{/* <div className="form-group">
			<label>Phone number</label>
			<input name="mobile" type="text" className="form-control" onChange={this.onChange} value={this.state.mobile} maxLength="10" />
			{this.state.error.mobile}			
			</div> */}

								<h3 className="mt-4">Other Information</h3>
								<div className="form-group">
									<label>How did you hear about FreelanceTypers?</label>
									<select name="hearabout" className="form-control" onChange={this.onChange} value={this.state.hearabout}>
										<option key="1" value="Select">Select</option>
										{loadhearabout}
									</select>
									{this.state.error.hearabout}
								</div>
								<div className="form-group">
									<label>What is the primary reason you are interested in completing tasks on FreelanceTypers?</label>
									<select name="primaryreason" className="form-control" onChange={this.onChange} value={this.state.primaryreason}>
										<option key="1" value="Select">Select</option>
										{loadreason}
									</select>
									{this.state.error.primaryreason}
								</div>

								<div className="text-right">
									<button className="button col-12" onClick={this.onSubmit}>Next</button>
								</div>
								<br />
							</CardBody>
						</Card>
					</div>
					<div className="col-4"></div>
				</div>
				{this.state.isModal ? <Modal open={true} button2='Close' clickButton2={this.clickButton2} modalheader="User Validation" modalbody="You are not authenticated user...!! Please Register..!!" /> : ''}
				<Footer />

			</>
		)

		return res;
	}
}

const mapStateToProps = (state) => ({ common: state.common })

const mapActionToProps = {
}

export default connect(mapStateToProps, mapActionToProps)(App);
