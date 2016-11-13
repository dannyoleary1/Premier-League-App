 import React from 'react'; 
 import './app.css' ;
 import Reactable from 'reactable'; 
 import ReactDom from 'react-dom';
 import { Router, Route, Link, browserHistory } from 'react-router' 

 
 var Table = Reactable.Table,  
    Thead = Reactable.Thead,
    Th = Reactable.Th; //used for table sorting. Will be using this rather than the default table for easy sorting and searching using reactable

	
	var bplTeams=[
		];


	class HomePage extends React.Component{ //This code is responsible for being able to display a up-to-date table for the English Premier League

    componentDidMount() {
        $.ajax({
            url: 'http://soccer.sportsopendata.net/v1/leagues/premier-league/seasons/16-17/standings',
            dataType: 'json',
            type: 'GET',
        }).done((response) => {

            for(var i =0; i<response.data.standings.length; i++){
                bplTeams.push({
                    "TEAM": response.data.standings[i].team,
                    "GP": response.data.standings[i].overall.matches_played,
                    "W": response.data.standings[i].overall.wins, 
                    "PTS": response.data.standings[i].overall.points
                })
            }
            this.setState({ bplTeams: bplTeams })
        }); 
    }
        
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
    <Router history={browserHistory}>
      <Route path="/" component={HomePage}>
      <Route path="home" component={HomePage} />
	  </Route>
      <Route path="registration" component={Registration} />
	  <Route path="teams" component={Teams}/>
	  <Route path="table" component={PremierLeagueTable}/>
   </Router>
	
), document.getElementById('root'))

	