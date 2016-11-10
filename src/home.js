 import React from 'react'; 
	var home = React.createClass({
		render: function(){
			return <div className="shopping-list">
						<h1>Shopping List for {this.props.name}</h1>
							<ul>
								<li>Instagram</li>
								<li>WhatsApp</li>
								<li>Oculus</li>
							</ul>
						</div> 
		}
	});
	
export default home;