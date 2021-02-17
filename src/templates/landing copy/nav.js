import React from 'react'
import { Link } from 'react-router-dom';

class Nav extends React.Component {
	constructor() {
		super();
	}

	render() {
		let res=(
			<>

			<div id="preloader-active">
			<div className="preloader d-flex align-items-center justify-content-center">
			<div className="preloader-inner position-relative">
			<div className="preloader-circle"></div>
			<div className="preloader-img pere-text">
			<img src="assets/img/logo/loder.png" alt="" />
			</div>
			</div>
			</div>
			</div>

			<header>
			<div className="slider-area header-area header-transparent">
			<div className="main-header ">
			<div className="header-bottom  header-sticky">
			<div className="container-fluid">
			<div className="row align-items-center">
			
			<div className="col-xl-3 col-lg-3">
			<div className="logo">
			<a href="index.html">
			<h1 style={{fontWeight:'bold',color:'white'}}>Freelance Typers</h1>
			</a>
			</div>
			</div>

			<div className="col-xl-9 col-lg-9">
			<div className="header-right-btn d-none d-lg-block ml-65" style={{float:'right'}}>
			<Link to="/Typing" className="border-btn">Sign up</Link>{'  '}
			<Link to="/Login" className="border-btn">Log in</Link>
			</div>

			</div>
			</div>

			<div className="row align-items-center tempclass hideclass">
			<div className="col-xl-12 col-lg-12">
			<div className="menu-wrapper d-flex align-items-center justify-content-end" style={{float:'left',marginLeft:'10em'}} >
			
			<div className="main-menu d-none d-lg-block">
			<nav>
			<ul id="navigation">                                                                                          
			<li className="active" ><a href="index.html">Home</a></li>
			<li><a href="#ourservices">How it works</a></li>
			<li><a href="features.html">Our Community & Reviews</a></li>
			<li><a href="faq.html">Employers</a></li>			
			<li><a href="contact.html">Candidate</a></li>
			<li><a href="contact.html">Contact Us</a></li>
			</ul>
			</nav>			
			</div>
			

			</div>
			</div> 
			
			<div className="col-12">
			<div className="mobile_menu d-block d-lg-none"></div>
			</div>
			</div>
			</div>
			</div>
			</div>
			</div>
			
			</header>
			
			</>
			)

			return res;
		}	
	}

	export default Nav;

	//<li><a href="#">Blog</a></li>
// <ul className="submenu">
// 			<li><a href="blog.html">Blog</a></li>
// 			<li><a href="blog_details.html">Blog Details</a></li>
// 			<li><a href="elements.html">Element</a></li>
// 			</ul>