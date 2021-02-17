import React from 'react'
import { connect } from 'react-redux'

import Header from '../templates/landing/commonheader'
import Footer from '../templates/landing/commonfooter'

class App extends React.Component {
	constructor(props) {
		super(props);
	}
	render() {
		let res;
		res = (
			<>
				<Header />
				<div style={{ padding: '1em' }}>
					<h1>Policy</h1>
				<p>freelancetypers.com as a socially responsible website respects user  
privacy and the company vouches that it will do everything within its limits  
to safeguard user privacy. The below privacy policy may be revised as and when  
seen appropriate by the company without prior notice. The below privacy policy  
tells how and what information is gathered from the users and how the  
information gathered will be used by the Company. Kindly read carefully our  
privacy policy hereunder and by using this website you express your acceptance  
of the below privacy policy. In case you have any objections or in case you do  
not accept our privacy policy, kindly restrain yourself from using the  
services of our website.</p>

<p>* freelancetypers.com  in order to provide its users with complete range of  
its services collects certain information from the users. The information  
collected includes but not limited to contact information including, phone  
number, email address, postal address and other personal information such as  
data of birth, first name, surname, etc., required to verify the identity of  
the users.</p>

<p>* The personal data collected will be used only for internal purposes and the  
personal data will not be shared with any third parties or the personal data  
will not be sold to any third parties. Information such as contact information  
and postal address may be shared with service partners so as to fulfill the  
service as in the case of product shipping and delivery.
</p>
<p>* The personal data collected in this website may be used to understand the  
website demographics and the data may be used to devise future marketing  
plans.</p>

<p>* freelancetypers.com does not send spam mails to the users. However,  
service related communications and newsletters may be sent to the registered  
users from time to time to keep the users up to date with the website's  
services.</p>

<p>* freelancetypers.com uses cookies to collect user information such as the  
IP address of the users, location of the user based on the IP, date and time  
of visit and other data such as the browser type, etc., which may not be used  
to lead to individual's identity in any way. We use the information collected  
here to improve upon our own services by understanding the nature of our  
website visitors so that we can serve you better. Though you are free to  
switch off your browser cookies such an action may prevent you from accessing  
certain features of our services and our website. You may also face problems  
in logging into your user account when the browser cookies are switched off.</p>

<p>* You are free to update your account information anytime you like, though  
certain aspects of your account information such as your username may not be  
changed as this information is used to identify your account.</p>

<p>* freelancetypers.com has taken all the required security measures to  
provide you with a secure online platform. You are however required to keep  
your computer protected from viruses and other malware programs to prevent  
data loss and security issues. freelancetypers.com does not use or promote  
any malware programs.</p>

<p>* All the financial information including credit card, debit card information  
will be held confidential and no third parties will have access to such  
information.</p>

<p>* In case of the termination of the accounts you should contact the support  
team with your account termination request. Your request will be processed  
promptly and your account will be terminated within a reasonable time period.</p>

<p>* freelancetypers.com will not reveal the contact details and earnings of  
an user to other users or visitors on the site.</p>

<p>* If there is any Technical Problem, until we solve it you have to co-operate  
with us.</p>

<p>*You may use graphic and text links both on your website and in emails. The  
site may also be advertised "offline" in classified ads, magazines, and  
newpapers. You may use the graphics and text provided to you by us, or you may  
create your own as long as they are deemed appropriate according to the  
conditions.</p>

<p>* freelancetypers.com does not share any data collected from the users with  
the other users of the website what so ever. Also onlinedataentryjob.com does  
not send any emails or make phone calls asking for any other personal  
information. You are required to report such mails or communications to  
freelancetypers.com to protect your own interests.</p>

<p>* freelancetypers.com and its services are not meant for minors. By making  
use of this website you guarantee that you are aged 18+. Our website does not  
collect or store information of minors.</p>

<p>In case of any questions or doubts regarding to our privacy policy, feel free  
to contact us anytime. You are encouraged to visit this page regularly and  
keep yourself up to date with our latest privacy policy.</p>

				</div>
				<h2 className="tm-site-name text-center"><div className="col-6 text-left mt-3"><a href="/assets/policy.pdf" className="btn hero-btn3" >Click to view more...</a></div></h2>
				<Footer />
			</>
		)
		return res;
	}
}

export default App