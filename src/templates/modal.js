import React from 'react'
import { Modal, ModalHeader,ModalBody,ModalFooter,Button } from 'reactstrap'

class AppModal extends React.Component {
	constructor(props) {
		super(props);
		this.state={
			modalOpen: this.props.open
		}
	}

	render()
	{		
		let modal= (
			<div>
			<Modal isOpen={this.state.modalOpen} size={this.props.size?this.props.size:"md"}>
			<ModalHeader className="App text-center" style={{display:'block'}}><span style={{fontSize:'24px',fontWeight:'bold'}}> {this.props.modalheader}</span></ModalHeader>
			<ModalBody  style={{'max-height': 'calc(100vh - 210px)', 'overflow-y': 'auto'}}>
			<div className="row">      
			<div className="col-12 text-center">
			{this.props.modalbody}
			</div>
			</div>
			</ModalBody>
			<ModalFooter style={{textAlign:'center',display:'block'}}>
			{(this.props.button1!==undefined && this.props.button1!=='')?<Button style={{color:'yellow',padding: '20px 25px !important'}} color="primary" className="btn hero-btn1" onClick={this.props.clickButton1}>{this.props.button1}</Button>:''}
			&nbsp;&nbsp;
			{(this.props.button2!==undefined && this.props.button2!=='')?<Button style={{padding: '20px 25px !important'}} color="secondary" className="btn hero-btn1" onClick={this.props.clickButton2}>{this.props.button2}</Button>:''}
			</ModalFooter>

			</Modal>
			</div>
			)

			return modal
		}

	}

	export default AppModal;
