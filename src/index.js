import React from 'react'; 
import './app.css' ;
import Reactable from 'reactable'; 
import ReactDom from 'react-dom';
import { Router, Route, Link, browserHistory } from 'react-router';
import {lock} from 'auth0-lock';
import AllTeams from './data.js';

var Table = Reactable.Table,  
Thead = Reactable.Thead,
Th = Reactable.Th; //used for table sorting. Will be using this rather than the default table for easy sorting and searching using reactable

var bplTeams=[
	];
	
var loopControl =0; //To stop re-rendering
	

var MasterPage = React.createClass({
	componentWillMount: function() {
		this.lock = new Auth0Lock('QdtemUG2ohlYsPEfBBYRDLBwitPHGTSl', 'dannyoleary1.eu.auth0.com');
		this.setState({idToken: this.getIdToken()})
  },
  createLock: function() {
    this.lock = new Auth0Lock(this.props.clientId, this.props.domain);
  },
  getIdToken: function() {
    // First, check if there is already a JWT in local storage
    var idToken = localStorage.getItem('id_token');
    var authHash = this.lock.parseHash(window.location.hash);
    // If there is no JWT in local storage and there is one in the URL hash,
    // save it in local storage
    if (!idToken && authHash) {
      if (authHash.id_token) {
        idToken = authHash.id_token
        localStorage.setItem('id_token', authHash.id_token);
      }
      if (authHash.error) {
        // Handle any error conditions
        console.log("Error signing in", authHash);
      }
    }
    return idToken;
  },
  render: function() {
	
    if (this.state.idToken) {
      return (	<div>
	  <Links />
	  <LoggedIn lock={this.lock} idToken={this.state.idToken} />
	  </div>
	  );
    } else {
      return (<div>
	  <Links />
	  <Home lock={this.lock} />
	  </div>);
    }
  }
});

var LoggedIn = React.createClass({
  getInitialState: function() {
    return {
      profile: null
    }
  },

  componentDidMount: function() {
    // The token is passed down from the App component 
    // and used to retrieve the profile
    this.props.lock.getProfile(this.props.idToken, function (err, profile) {
      if (err) {
        console.log("Error loading the Profile", err);
        return;
      }
      this.setState({profile: profile});
    }.bind(this));
  },

  render: function() {
    if (this.state.profile) {
      return ( <div>
        <h2>Welcome {this.state.profile.nickname}</h2>
		</div>
      );
    } else {
      return ( <div>
        <div className="logout">Please logout</div>
		</div>
      );
    }
  }
});

var Home = React.createClass({
	showLock: function() {
		// Show the Auth0Lock widget
		this.props.lock.show();
	},

	render: function() {
		
		return ( <div>
					<div className="login-box">
					<h1>Welcome to Danny's Premier League App</h1>
					<p>Click on the button below to sign in or sign up to unlock features</p>
					<button onClick={this.showLock}>Sign In</button>
					</div>
				</div>)
	}
});

class HomePage extends React.Component{	//This code is responsible for being able to display a up-to-date table for the English Premier League 
	componentDidMount() {
		if (loopControl==0){
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
			loopControl++;
			this.setState({ bplTeams: bplTeams })
		}); 
	}
	}

	render(){
		if (localStorage.getItem('id_token')){
		return <div className="Premier League Clubs">
		<Links />
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
	else{
		return <div>
				<Links />
				<h1> Log in to see the table </h1>
				</div>
	}
	}
};

export default HomePage;

class Teams extends React.Component{
	render(){ 
	const teams = this.props.route.data;
	return <div>
					<Links />		
					<div id="Teams">					
						<ul>
							<li>
								<img src={require("./Images/Arsenal.jpg")} />
								<h3><Link to="/teams/Arsenal">Arsenal</Link></h3>
							</li>
							<li>
								<img src={require("./Images/Bournemouth.png")} />
								<h3><Link to="/teams/Bournemouth">Bournemouth</Link></h3>
							</li>
							<li>
								<img src={require("./Images/Burnley.png")} />
								<h3><Link to="/teams/Burnley">Burnley</Link></h3>
							</li>
							<li>
								<img src={require("./Images/Chelsea.png")} />
								<h3><Link to="/teams/Chelsea">Chelsea</Link></h3>
							</li>
							<li>
								<img src={require("./Images/CrystalPalace.jpg")} />
								<h3><Link to="/teams/Crystal Palace">Crystal Palace</Link></h3>
							</li>
							<li>
								<img src={require("./Images/Everton.jpg")} />
								<h3><Link to="/teams/Everton">Everton</Link></h3>
							</li>
							<li>
								<img src={require("./Images/Hull.png")} />
								<h3><Link to="/teams/Hull">Hull</Link></h3>
							</li>
							<li>
								<img src={require("./Images/Leicester.jpg")} />
								<h3><Link to="/teams/Leicester">Leicester</Link></h3>
							</li>
							<li>
								<img src={require("./Images/Liverpool.png")} />
								<h3><Link to="/teams/Liverpool">Liverpool</Link></h3>	
							</li>
							<li>
								<img src={require("./Images/ManCity.png")} />
								<h3><Link to="/teams/Man City">Man City</Link></h3>
							</li>
							<li>
								<img src={require("./Images/ManUnited.png")} />
								<h3><Link to="/teams/Man United">Man United</Link></h3>
							</li>
							<li>
								<img src={require("./Images/Middlesbrough.jpg")} />
								<h3><Link to="/teams/Middlesbrough">Middlesbrough</Link></h3>
							</li>
							<li>
								<img src={require("./Images/Southampton.png")} />
								<h3><Link to="/teams/Southampton">Southampton</Link></h3>
							</li>
							<li>
								<img src={require("./Images/StokeCity.jpg")} />
								<h3><Link to="/teams/Stoke City">Stoke City</Link></h3>
							</li>
							<li>
								<img src={require("./Images/Sunderland.jpg")} />
								<h3><Link to="/teams/Sunderland">Sunderland</Link></h3>
							</li>
							<li>
								<img src={require("./Images/SwanseaCity.png")} />
								<h3><Link to="/teams/Swansea City">Swansea City</Link></h3>
							</li>
							<li>
								<img src={require("./Images/Tottenham.jpg")} />
								<h3><Link to="/teams/Tottenham">Tottenham</Link></h3>
							</li>
							<li>
								<img src={require("./Images/Watford.png")} />
								<h3><Link to="/teams/Watford">Watford</Link></h3>
							</li>
							<li>
								<img src={require("./Images/WestBrom.png")} />
								<h3><Link to="/teams/West Brom">West Brom</Link></h3>
							</li>
							<li>
								<img src={require("./Images/WestHam.png")} />
								<h3><Link to="/teams/West Ham">West Ham</Link></h3>
							</li>					
						</ul>
						</div>
					}
			 </div>
	}
};

export default Teams;

class Logout extends React.Component{
		render(){
			localStorage.removeItem('id_token');
			return <div>
					<Links />
					<h1>You have succesfully logged out</h1>
				</div>
		}
}

class Links extends React.Component{
	 render(){
        return(
            <div id="Links">
               <ul>
                 <li><Link to="/" activeClassName="active">Home</Link></li>
				 <li><Link to="/about" activeClassName="active">About</Link></li>
                 <li><Link to="/teams" activeClassName="active">Teams</Link></li>
                 <li><Link to="/table" activeClassName="active">Table</Link></li>
				 <li><Link to="/logout" activeClassName="active">Logout</Link></li>
			   </ul>
            </div>
        );
    }
}

export default Links;

class TeamInformation extends React.Component{
	render(){	
	var teams = this.props.route.data; //All the team data
	var name = this.props.params.name; //The name entered
	var currentTeam = teams.filter(currentTeam =>{
		if (currentTeam.name == name){
			return currentTeam;
		}
	});
	
	return <div className="Current Team">
			<Links />
			<h1>{currentTeam[0].name}</h1>
			<img src={require(currentTeam[0].logo)} />
			</div>
	}
};

export default TeamInformation;

ReactDOM.render((
		<Router history={browserHistory}>
		<Route path="/" component={MasterPage}>
		<Route path="index" component={MasterPage} />
		</Route>
		<Route path="home" component={MasterPage} />
		<Route path="about" component={MasterPage} />
		<Route path="teams" component={Teams} data={AllTeams}/>
		<Route path="teams/:name" component={TeamInformation} data={AllTeams}/>
		<Route path="table" component={HomePage}/>
		<Route path="logout" component={Logout} />
		</Router>	
), document.getElementById('root'))

