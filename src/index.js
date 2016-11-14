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
					<a onClick={this.showLock}>Sign In</a>
					</div>
				</div>)
	}
});

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
		return <Links />
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
            <div>
               <ul className="nav navbar-nav">
                 <li><Link to="/">Home</Link></li>
                 <li><Link to="/teams">Teams</Link></li>
                 <li><Link to="/table">Table</Link></li>
				 <li><Link to="/logout">Logout</Link></li>
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
			<h1>{currentTeam[0].name}</h1>
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
		<Route path="teams" component={Teams}/>
		<Route path="teams/:name" component={TeamInformation} data={AllTeams}/>
		<Route path="table" component={HomePage}/>
		<Route path="logout" component={Logout} />
		<Route path="test" component={TeamInformation} />
		</Router>	
), document.getElementById('root'))

