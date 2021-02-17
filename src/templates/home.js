import React from 'react'
import CountUp from 'react-countup';
import { Link } from 'react-router-dom';

function Home() {
return (
<div className="tm-page-wrap mx-auto">
	<div className="position-relative">
		<div className="position-absolute tm-site-header">
			<div className="container-fluid position-relative">
				<div className="row">
					<div className="col-7 col-md-4">
						<a href="/" className="tm-bg-black text-center tm-logo-container">
							<h1 className="tm-site-name logocolor">Freelance <span style={{color:'white'}}>Typers</span></h1>
						</a>
					</div>

					<div className="col-5 col-md-8 ml-auto mr-0">
						<div className="tm-site-nav">
							<nav className="navbar navbar-expand-lg mr-0 ml-auto" id="tm-main-nav">
								<button className="navbar-toggler tm-bg-black py-2 px-3 mr-0 ml-auto collapsed" type="button"
								data-toggle="collapse" data-target="#navbar-nav" aria-controls="navbar-nav"
								aria-expanded="false" aria-label="Toggle navigation">
								<span>
									<i className="fas fa-bars tm-menu-closed-icon"></i>
									<i className="fas fa-times tm-menu-opened-icon"></i>
								</span>
							</button>
							<div className="collapse navbar-collapse tm-nav" id="navbar-nav">
								<ul className="navbar-nav text-uppercase">
									<li className="nav-item active">
										<a className="nav-link tm-nav-link" href="#">Home <span className="sr-only">(current)</span></a>
									</li>
									<li className="nav-item">
										<a className="nav-link tm-nav-link" href="about.html">About</a>
									</li>
									<li className="nav-item">
										<a className="nav-link tm-nav-link" href="contact.html">Contact</a>
									</li>
								</ul>
							</div>
						</nav>
					</div>
				</div>
			</div>
		</div>
	</div>
	<div className="tm-welcome-container text-center text-white">
		<div className="tm-welcome-container-inner">
			<p className="tm-welcome-text mb-1 text-white">You must complete the 1-minute typing test</p>
			<p className="tm-welcome-text mb-5 text-white">to qualify for the typing job</p>
			<Link to="/Typing" className="tm-btn-cta btn1"  style={{padding: '1.375rem 2.75rem', fontSize:'1.6rem'}}>
				<span>Start Test</span>
			</Link>
			<br />
			<br />
			<div className="row">
			<div className="col-12 col-md-6">
			<h3>Registered Users</h3>
			<h1><CountUp end={1000} duration={3} /></h1>
			</div>
			<div className="col-12 col-md-6">
			<h3>Total Job Posts</h3>
			<h1><CountUp end={1000} duration={3} /></h1>
			</div>
			</div>
		</div>
	</div>

	<div id="tm-video-container">
		<video autoPlay muted loop id="tm-video">
			<source src="video/wheat-field.mp4" type="video/mp4" />
		</video>    
	</div>

	<i id="tm-video-control-button" className="fas fa-pause"></i>
</div>

</div>
)
}
export default Home; 