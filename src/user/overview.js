import React, { useState } from 'react'
import Nav from '../templates/header'
import TableCell from '@material-ui/core/TableCell';
import TableContainer from '@material-ui/core/TableContainer';
import TableHead from '@material-ui/core/TableHead';
import TablePagination from '@material-ui/core/TablePagination';
import TableRow from '@material-ui/core/TableRow';
import TableSortLabel from '@material-ui/core/TableSortLabel';
import Cookies from 'universal-cookie'
import moment from 'moment'
import Modal from '../templates/modal';

import Pagination from './statustable'
import axios from '../API.js'
const cookies = new Cookies();

export default class CollapsibleTable extends React.Component {
	constructor(props) {
		super(props);
		this.state = {
			rows: [],
			availableearnings: '0', approved: 0, approvalrate: 0, pending: 0, approvedhits: 0, bonuses: 0, totalearnings: 0, year1: 0, year2: 0,rejected:0,
			todate: '', modalopen: false
		}
	}
	createData = (name, title, hits, reward, created, action, actionbutton, requesterid) => {
		return { name, title, hits, reward, created, action, actionbutton, requesterid };
	}
	componentDidMount() {
		var rowss = this.state
		this.setState({ todate: moment().format("MMM DD, YYYY") })
		console.log('sd')
		axios.get("/overview", { params: { email: cookies.get('email') } }).then(res => {
			console.log(res)
			var data = res.data.data
			for (var i in data) {
				rowss.rows.push(this.createData(data[i].date1, data[i].isPending + data[i].isAccept + data[i].isReject, data[i].isAccept, data[i].isReject, data[i].isPending, data[i].earnings.toFixed(2)))
			}
			this.setState({ rowss })
		}).catch(err => { console.log(err) })

		axios.get("/hitsoverview", { params: { email: cookies.get('email') } }).then(res => {
			var data = res.data.data[0]
			console.log(data)
			this.setState({ approved: data ? data.approved : 0,rejected: data ? data.rejected : 0, pending: data ? data.pending : 0, approvalrate: data ? data.approvalrate : 0, approvedhits: data ? data.reward : 0, bonuses: data ? data.bonus : 0, totalearnings: data ? data.totearnings : 0, availableearnings: data ? data.totearnings : 0 })
		})
		// axios.get("/hitsyearwise", { params: { email: cookies.get('email') } }).then(res => {
		// 	var data = res.data.data[0]
		// 	this.setState({ year1: data ? data.amount2 : 0, year2: data ? data.amount1 : 0 })
		// })
	}
	clickRestart = () => {
		let email = cookies.get('email')
		axios.get("/Users", { params: { email: email } }).then(res => {
			let items = res.data.data[0]
			if (items.Address1 === '') this.setState({ modalopen: !this.state.modalopen })
			else if (items.accno === '') this.props.history.push({ pathname: '/Bank', state: cookies.get('id') })
			else this.props.history.push({ pathname: '/AddsmallAmount', state: cookies.get('id') })
		})
	}
	clickButton1 = () => {
		this.props.history.push({ pathname: '/workerregister', state: cookies.get('id') })
	}
	Status = () => {
		const headCells = [
			{ id: 'name', numeric: false, disablePadding: true, label: 'Requester', width: '30%' },
			{ id: 'title', numeric: false, disablePadding: false, label: 'Title', width: '20%' },
			{ id: 'hits', numeric: true, disablePadding: false, label: 'Hits', width: '10%' },
			{ id: 'reward', numeric: true, disablePadding: false, label: 'Reward', width: '10%' },
			{ id: 'created', numeric: true, disablePadding: false, label: 'Created', width: '10%' },
			{ id: 'action', numeric: true, disablePadding: false, label: 'Action', width: '15%' },
		];

		return (
			<TableHead>
				<TableRow>
					<TableCell padding="checkbox">

					</TableCell>
					{headCells.map((headCell) => (
						<TableCell
							width={headCell.width}
							key={headCell.id}
							align={headCell.numeric ? 'center' : 'left'}
							padding={headCell.disablePadding ? 'none' : 'default'}
						>
							<TableSortLabel
							>
								{headCell.label}

							</TableSortLabel>
						</TableCell>
					))}
				</TableRow>
			</TableHead>
		);
	}

	render() {
		let avearnings = parseFloat(this.state.availableearnings).toFixed(2)
		const typingsuccess = (
			<div>
				<p style={{ fontSize: '14px' }}>Dear, Freelance Typer your minimum transfer limit is $5.00. You are not allowed to transfer this amount now. You must work a minimum of $5.00 to transfer your earnings to your bank account.</p>
				<h2>Thank you!</h2>
			</div>
		)
		const typingsuccess1 = (
			<div>
				<h2>Congratulations!</h2>
				<p style={{ fontSize: '14px' }}>You're earn $5.00 now. You eligible to transfer your earnings directly to your bank account. Click the transfer earnings and add your bank details.</p>
			</div>
		)

		return (<>
			<Nav mainactive="dashboard" subactive="allhits" />
			{this.state.modalopen ? this.state.availableearnings >= 5 ? <Modal open={true} button1='Transfer earnings' clickButton1={this.clickButton1} button2='Close' clickButton2={this.clickRestart} modalheader="Alert Message" modalbody={typingsuccess1} /> : <Modal open={true} button2='Close' clickButton2={this.clickRestart} modalheader="Alert Message" modalbody={typingsuccess} /> : ''}

			<div className="p-4">
				<div className="row" style={{ padding: '1em' }}>
					<div className="col-12">
						<h3 className="text-orange f-normal mb-4" style={{ fontSize: '1.5em' }}>Overview</h3>
					</div>

					<div className="col-8">
						<h3 className="text-orange f-normal mb-4" style={{ fontSize: '1.2em' }}>Work Status (Works Submitted Within the Last 10 Days)</h3>
						<Pagination rows={this.state.rows} {...this.props} />
					</div>
					<div className="col-4">
						<h3 className="text-orange f-normal mb-2" style={{ fontSize: '1.2em' }}>Available Earnings</h3>
						<div className="row available-earnings mb-4">
							<div className="col-6">Available for Transfer</div>
							<div className="col-6 text-right">${avearnings}</div>
							<div className="col-12 text-center"><button className="amazonbutton" onClick={this.clickRestart}>Transfer earnings</button></div>
							<div className="col-12 text-center" style={{ fontSize: '0.7em' }}>Earnings available for transfer as of {this.state.todate}</div>
						</div>

						<h3 className="text-orange f-normal mb-2" style={{ fontSize: '1.2em' }}>Works Overview</h3>
						{/* <div className="row available-earnings mb-4">
							<div className="col-6">Approved</div>
							<div className="col-6 text-right">{this.state.approved}</div>
							
							<div className="col-6">Pending</div>
							<div className="col-6 text-right">{this.state.pending}</div>
						</div> */}

						{/* <h3 className="text-orange f-normal mb-2" style={{ fontSize: '1.2em' }}>Earnings to Date</h3> */}
						<div className="row available-earnings mb-4">
							<div className="col-6 available-header">Type</div>
							<div className="col-6 text-right available-header">Amount</div>
							<div className="col-6">Approval Rate</div>
							<div className="col-6 text-right">{this.state.approvalrate}%</div>
							<div className="col-6">Approved Works</div>
							<div className="col-6 text-right">{this.state.approved}</div>
							{/* <div className="col-6">Total Rejects</div>
							<div className="col-6 text-right">{this.state.rejected}</div> */}
							<div className="col-6">Approved Earnings</div>
							<div className="col-6 text-right">${this.state.approvedhits.toFixed(2)}</div>
							<div className="col-6">Bonuses</div>
							<div className="col-6 text-right">${this.state.bonuses.toFixed(2)}</div>
							<div className="col-6">Total Earnings</div>
							<div className="col-6 text-right">${this.state.totalearnings.toFixed(2)}</div>
						</div>

						{/* <h3 className="text-orange f-normal mb-2" style={{ fontSize: '1.2em' }}>Total Earnings by Period</h3>
						<div className="row available-earnings mb-4">
							<div className="col-6 available-header">Year</div>
							<div className="col-6 text-right available-header">Amount</div>
							<div className="col-6">2019</div>
							<div className="col-6 text-right">${this.state.year1.toFixed(2)}</div>
							<div className="col-6">2020</div>
							<div className="col-6 text-right">${this.state.year2.toFixed(2)}</div>
						</div> */}
					</div>

				</div>

			</div>
		</>)

	}
}

