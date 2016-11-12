 import React from 'react'; 
 import './app.css' ;
 import Reactable from 'reactable'; 
 import ReactDom from 'react-dom';
 import { Router, Route, Link, browserHistory } from 'react-router' 
 
 var Table = Reactable.Table,  
    Thead = Reactable.Thead,
    Th = Reactable.Th; //used for table sorting. Will be using this rather than the default table for easy sorting and searching using reactable

	
	
var bplTeams = [  
  {TEAM: "Arsenal", GP: 11, W: 5, PTS: 15},
  {TEAM: "Liverpool", GP: 11, W: 11, PTS: 33},
  {TEAM: "Manchester City", GP: 9, W: 6, PTS: 18},
  {TEAM: "Manchester United", GP: 10, W: 1, PTS: 3},
  {TEAM: "Everton", GP: 7, W: 4, PTS: 12},
  {TEAM: "Chelsea", GP: 10, W: 7, PTS: 21},
  {TEAM: "Burnley", GP: 12, W: 6, PTS: 18},
  {TEAM: "West Ham United", GP: 8, W: 8, PTS: 24},
  {TEAM: "Swansea", GP: 12, W: 6, PTS: 18},
  {TEAM: "Watford", GP: 5, W: 1, PTS: 3}
]; //probably a temporary data set

	class HomePage extends React.Component{ //This code is responsible for being able to display a up-to-date table for the English Premier League
		render(){
			return <div className="Premier League Clubs">
						<h1>Premier League Table</h1>
							<Table className="table" 
							filterable={['TEAM', 'GP', 'W', 'PTS']} //the tags it can be filtered by
							noDataText="No matching records found" //if no results are found display this when searching
							sortable={true}
							data={bplTeams}>
							<Thead>
								<Th column="TEAM">TEAM</Th>
								<Th column="GP">GP</Th>
								<Th column="W">W</Th>
								<Th column="PTS">PTS</Th>
								</Thead>
							</Table>
					</div>
		}
	};
	
	export default HomePage;
	
	class Registration extends React.Component{
		render(){
			return <div className="registation">
			<h1>'Skeleton Class'</h1>
			</div>
			}
	};
	
	export default Registration;
	
	class Teams extends React.Component{
		render(){
			return 'Skeleton Class'
		}
	};
	
	export default Teams;
	
	class PremierLeagueTable extends React.Component{
		render(){
			return 'Skeleton Class'
		}
	};
	
	export default PremierLeagueTable;
		
	ReactDOM.render((
    <Router history = {browserHistory}>
      <Route path = "/" component = {HomePage}>
      <Route path = "home" component = {HomePage} />
	  </Route>
      <Route path = "registration" component = {Registration} />
	  <Route path = "teams" component={Teams}/>
	  <Route path = "table" component={PremierLeagueTable}/>
   </Router>
	
), document.getElementById('root'))

	