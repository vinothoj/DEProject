import React from 'react';
import { Route, Switch } from 'react-router-dom';

import Home from './landing/home'
import Header from './templates/header'
import Game from './typing/game1'

import Login from './user/login'
import BasicRegister from './user/basicregister'
import WorkerRegister from './user/workerregister'
import Bank from './user/bankdetails'
import AddsmallAmount from './user/addsmallamount'
import Payment from './user/payment'

import AllHits from './user/allhits'
import Work1 from './user/work1'
import Overview from './user/overview'
import Contactus from './user/contactus'
import Ourcommunity from './user/ourcommunity'
import Reviews from './user/reviews'
import Forgot from './user/forgot'
import Terms from './user/terms'
import Policy from './user/policy'

class App1 extends React.Component {
	constructor() {
		super()
	}
	
	render() {
		return (
			<Switch>
				<Route exact path='/' component={Home} />
				<Route exact path='/Typing' component={Game} />

				//User
				<Route path='/Login' component={Login} />
				<Route path='/Register' component={BasicRegister} />
				<Route path='/WorkerRegister' component={WorkerRegister} />
				<Route path='/Bank' component={Bank} />
				<Route path='/AddsmallAmount' component={AddsmallAmount} />
				<Route path='/Payment' component={Payment} />
				<Route path='/ForgotPassword' component={Forgot} />

				<Route path='/AllHits' component={AllHits} />
				<Route path='/work1' component={Work1} />
				<Route path='/overview' component={Overview} />
				<Route path='/Contactus' component={Contactus} />
				<Route path='/Ourcommunity' component={Ourcommunity} />
				<Route path='/Reviews' component={Reviews} />
				<Route exact path='/Terms' component={Terms} />
				<Route path='/Policy' component={Policy} />
				<Route path='/Participation' component={Terms} />

				<Route
					render={function () {
						return <h1>Page Not Found</h1>;
					}}
				/>
			</Switch>
		)
	}
}

export default App1;