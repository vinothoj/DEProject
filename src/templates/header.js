import React from 'react'
import { Link } from 'react-router-dom';
import { InputGroup, InputGroupText, InputGroupAddon, Input } from 'reactstrap';
import Cookies from 'universal-cookie'

import axios from '../API.js';
import { Auth } from 'aws-amplify';
const cookies = new Cookies();

class Nav extends React.Component {
	constructor(props) {
		super(props);
		this.state = {
			copySuccess: '',
			name: '', workerid: '',totearnings:0
		}
	}

	copyToClipboard = (e) => {
		navigator.clipboard.writeText(this.state.workerid)
		this.setState({ copySuccess: 'Copied!' });
	};
	componentDidMount = () => {
		axios.get("/hitsoverview", { params: { email: cookies.get('email') } }).then(res => {
			var data = res.data.data[0]
			this.setState({ totearnings:data?data.totearnings:0 })
		})
		
		this.setState({ name: cookies.get('name'), workerid: cookies.get('workerid') })
	}
	render() {
		return (
			<>
				<div className="row" style={{ margin: '5px 0px 5px 1px' }} style={{background:'white'}}>

					<div className="col-6" style={{background:'white'}}>
						{/* <span className="ml-2">Worker ID: </span>
						<span><a href="#" onClick={this.copyToClipboard}>{this.state.workerid}</a></span>
						{'  ' + this.state.copySuccess} */}
					</div>

					<div className="col-6" style={{background:'white'}}><span className="mr-2 float-right">Hello, {this.state.name} | <a href="/" onClick={()=>{
						cookies.remove('email');
						cookies.remove('userPassword');
						Auth.signOut();
					}}>Sign Out</a></span></div>
				</div>
				<nav className="navbar navbar-expand-lg navbar-dark ftco_navbar bg-dark ftco-navbar-light" id="ftco-navbar">
					<div className="container">
						<a className="navbar-bran mb-2 logoheading" href="/">Freelance<span>{' '}Typers</span></a>
						<button className="navbar-toggler" type="button" data-toggle="collapse" data-target="#ftco-nav" aria-controls="ftco-nav" aria-expanded="false" aria-label="Toggle navigation">
							<span className="oi oi-menu"></span> Menu
			</button>

						<div className="collapse navbar-collapse" id="ftco-nav">
							<ul className="navbar-nav ml-auto">
								<li className={this.props.mainactive === 'hits' ? "nav-item active mr-3" : "nav-item mr-3"}><a href="/allhits" className="nav-link">Works</a></li>
								<li className={this.props.mainactive === 'dashboard' ? "nav-item active mr-3" : "nav-item mr-3"}><a href="/overview" className="nav-link">Dashboard</a></li>
								<li className="nav-item mr-3"><a href="/ourcommunity" className="nav-link">Our&nbsp;community</a></li>
								<InputGroup className="col-12">
									<Input placeholder="Search All HITs" />
									<InputGroupAddon addonType="append" style={{ height: '2.1em' }}>
										<InputGroupText><i className="fa fa-search" aria-hidden="true"></i></InputGroupText>
									</InputGroupAddon>
								</InputGroup>
							</ul>
						</div>
					</div>
					<div ><a href="/overview" style={{color:'gainsboro'}} > Your Account - $ {this.state.totearnings.toFixed(2)}</a></div>
				</nav>

				<ul className="list-group list-group-horizontal">
					{/* <li className={this.props.subactive === 'allhits' ? "list-group-item active" : "list-group-item"}>All Hits</li>
					<li className={this.props.subactive === 'yourhits' ? "list-group-item active" : "list-group-item"}>Your HITs Queue</li> */}
				</ul>

			</>
		)
	}
}

export default Nav;