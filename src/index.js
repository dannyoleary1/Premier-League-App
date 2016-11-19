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
	var teams = this.props.route.data;
	var link="/teams/";
	var teamName="";
	const namesList = teams.map(team =>{
		teamName=link+team.name;
		return ( <li key={team.name} className="Teamsss"> 
				<img src={require(team.logo)}/>
				<h3><Link to={teamName}>{team.name}</Link></h3>
				<p>{team.Description}</p>
				</li>)
		
	})
	return <div>
					
					<Links />		
					<div id="Teams">	
						<ul>
							{namesList}					
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
			<ul>
				<li>{currentTeam[0].Nickname}</li>
				<li>{currentTeam[0].Founded}</li>
				<li>{currentTeam[0].Stadium}</li>
				<li>{currentTeam[0].Capacity}</li>
				<li>{currentTeam[0].Manager}</li>
				<iframe src={currentTeam[0].latestNews} width="300" height="250" scrolling="no"></iframe>
				<iframe src={currentTeam[0].stats} scrolling="no" marginwidth="0" marginheight="0" frameborder="0" width="590px" height="540px"></iframe>
			</ul>
			</div>
	}
};

export default TeamInformation;

class AboutPage extends React.Component{
	render(){
	return <div className="About">
				<Links />
				<h1>About</h1>
				<p>Lorem ipsum dolor sit amet, consectetur adipisicing elit, 
				sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.</p>
				<h2>Lorem Ipsum</h2>
				<p>Lorem ipsum dolor sit amet, consectetur adipisicing elit, 
				sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.</p>
				<h3>Lorem Ipsum</h3>
				<p>Lorem ipsum dolor sit amet, consectetur adipisicing elit, 
				sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.</p>
			</div>
	}
};

export default AboutPage;

ReactDOM.render((
		<Router history={browserHistory}>
		<Route path="/" component={MasterPage}>
		<Route path="index" component={MasterPage} />
		</Route>
		<Route path="home" component={MasterPage} />
		<Route path="about" component={AboutPage} />
		<Route path="teams" component={Teams} data={AllTeams}/>
		<Route path="teams/:name" component={TeamInformation} data={AllTeams}/>
		<Route path="table" component={HomePage}/>
		<Route path="logout" component={Logout} />
		</Router>	
), document.getElementById('root'))

