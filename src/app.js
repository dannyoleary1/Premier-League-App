 import React from 'react'; 
 import './app.css' ;

 
	var HomePage = React.createClass({
		render: function(){
			return <div className="Premier League Clubs">
						<h1>Premier League Table</h1>
							<table>
								<thead>
									<tr>
										<td>Team</td>
										<td>GP</td>
										<td>W</td>
										<td>D</td>
										<td>L</td>
										<td>GF</td>
										<td>GA</td>
										<td>GD</td>
										<td>PTS</td>
									</tr>
								</thead>
								<tbody>
										<td>Name</td>
								</tbody>
							</table>
					</div> 
		}
	});
	
	
	
export default HomePage;