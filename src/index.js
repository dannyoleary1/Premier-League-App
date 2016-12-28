import React from 'react'; 
import './app.css' ;
import Reactable from 'reactable'; 
import ReactDom from 'react-dom';
import { Router, Route, Link, browserHistory } from 'react-router';
import {lock} from 'auth0-lock';
import request from 'superagent' ; 

var Table = Reactable.Table,  
Thead = Reactable.Thead,
Th = Reactable.Th; //used for table sorting. Will be using this rather than the default table for easy sorting and searching using reactable

var bplTeams=[];
var json=[];
var data=[];
var loopControl =0; //To stop re-rendering
var name, nickname, stadium, manager, latestnews, stats, description="";
var founded, capacity=0;

//The page responsible for displaying the home page
var MasterPage = React.createClass({
	
	//responsible for reading in the new data set implemented from a web api
	 componentDidMount : function() {
       request.get('http://127.0.0.1:4000/api/teams')
          .end(function(error, res){
            if (res) {
              json = JSON.parse(res.text);
              localStorage.setItem('teams', JSON.stringify(json)) ;
              this.setState( {}) ; 
            } else {
              console.log(error );
            }
          }.bind(this)); 
      },
	  
	  
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
		} 
		else {
			return (	<div>
							<Links />
							<Home lock={this.lock} />
						</div>);
		}
	}
});

//Checks if the log in is ok
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
		getInitialState() {
				return { showResults: false };
			},
		onClick() {
			this.setState({ showResults: true });
		},
		getInitialStatePost(){
			return {post: false};
		},
		postClick(){
			this.setState({post: true});
		},
		getInitialStatePut(){
			return {put: false};
		},
		putClick(){
			this.setState({put: true});
		},
	render: function() {		
		
		
		if (this.state.profile) {
			if(this.state.profile.nickname=="dannyoleary1"){
				localStorage.setItem("nickname", "dannyoleary1");
				return ( <div>
							<h2> Welcome Admin </h2>
							<br/>
							<div>
								<input type="submit" value="Show JSON" onClick={this.onClick} />
								{ this.state.showResults ? <Get /> : null }
							</div>
							<br />
							<div>
								<input type="submit" value="Add Entry" onClick={this.postClick} />
								{this.state.post ? <Post /> : null}
							</div>
							<br />
							<div>
								<input type="submit" value="Change entry by id" onClick={this.putClick} />
								{this.state.put ? <Put /> : null}
							</div>
						</div> )
			}
			else return (	<div>
							<h2>Welcome {this.state.profile.nickname}</h2>
						</div>
			);
		} 
		else {
			return (	<div>
							<div className="logout">Please logout</div>
						</div>
			);
		}
	}
	
});

//This is for the submission on posts
var BasicInputBox = React.createClass ({
  render: function (){
    return (
     <div>
       <label>{this.props.label}</label>
       <br/>
       <input type="text" onChange={this.props.valChange} value= {this.props.val} />
       <br/> 
     </div>
    );
  }
 });
 
var Post = React.createClass({
	
	getInitialState: function(){
      return {}
    },	  
			    submit: function(e){

				var data = {
					name: this.state.name,
					logo: this.state.logo,
					Nickname: this.state.nickname,
					Founded: this.state.founded, 
					Stadium: this.state.stadium,
					Capacity: this.state.capacity,
					Manager: this.state.manager,
					latestNews: this.state.latestNews,
					stats: this.state.stats,
					Description: this.state.description
				}
				
			//this is just an example of how you would submit a form
			//you would have to implement something separately on the server
			$.ajax({
			type: 'POST',
			datatype: 'json',
			url: 'http://localhost:4000/api/teams',
			data: data
			})
			.done(function(data) {
			self.clearForm()
			})
			.fail(function(jqXhr) {
			console.log('failed to register');
			});
			},
	
	clearForm: function() {
      this.setState({
        name: "",
        logo: "",
        nickname: "",
		founded: 0,
		stadium: "",
		capacity: 0,
		manager: "",
		latestNews: "",
		stats: "",
		description: "",
      });
    },
	
	nameChange: function(e){
      this.setState({name: e.target.value})
    },
    
    logoChange: function(e){
     this.setState({logo: e.target.value})
    },

    nicknameChange: function(e){
      this.setState({Nickname: e.target.value})
    },
	
	foundedChange: function(e){
		this.setState({Founded: e.target.value})
	},
	
	stadiumChange: function(e){
		this.setState({Stadium: e.target.value})
	},
	
	capacityChange: function(e){
		this.setState({Capacity: e.target.value})
	},
	
	managerChange: function(e){
		this.setState({Manager: e.target.value})
	},
	
	latestnewsChange: function(e){
		this.setState({latestNews: e.target.value})
	},
	
	statsChange: function(e){
		this.setState({stats: e.target.value})
	},
	
	descriptionChange: function(e){
		this.setState({Description: e.target.value})
	},
	
	render: function(){

		return (	
					<div>
					<form onSubmit={this.submit} >
						<BasicInputBox label="Name:" valChange={this.nameChange} val={this.state.name}/>
						<BasicInputBox label="Logo:" valChange={this.logoChange} val={this.state.logo}/>
						<BasicInputBox label="Nickname:" valChange={this.nicknameChange} val={this.state.nickname}/>
						<BasicInputBox label="Founded:" valChange={this.foundedChange} val={this.state.founded}/>
						<BasicInputBox label="Stadium:" valChange={this.stadiumChange} val={this.state.stadium}/>
						<BasicInputBox label="Capacity:" valChange={this.capacityChange} val={this.state.capacity}/>
						<BasicInputBox label="Manager:" valChange={this.managerChange} val={this.state.manager}/>
						<BasicInputBox label="Latest News:" valChange={this.latestnewsChange} val={this.state.latestnews}/>
						<BasicInputBox label="Stats:" valChange={this.statsChange} val={this.state.stats}/>
						<BasicInputBox label="Description:" valChange={this.descriptionChange} val={this.state.description}/>
					<button type="submit">Post</button>
					</form>
					</div> )
	}
});

var Put = React.createClass({
	
	getInitialState: function(){
      return {}
    },	  
			    submit: function(e){
				var data = {
					id: this.state.id,
					name: this.state.name,
					logo: this.state.logo,
					Nickname: this.state.nickname,
					Founded: this.state.founded, 
					Stadium: this.state.stadium,
					Capacity: this.state.capacity,
					Manager: this.state.manager,
					latestNews: this.state.latestNews,
					stats: this.state.stats,
					Description: this.state.description
				}
			
			
				//you would have to implement something separately on the server
			$.ajax({
			type: 'PUT',
			url: 'http://localhost:4000/api/teams/'+this.state.id,
			data: data
			})
			.done(function(data) {
			self.clearForm()
			})
			.fail(function(jqXhr) {
			console.log('failed to register');
			});
},
clearForm: function() {
      this.setState({
		id: 0, 
        name: "",
        logo: "",
        nickname: "",
		founded: 0,
		stadium: "",
		capacity: 0,
		manager: "",
		latestNews: "",
		stats: "",
		description: "",
      });
    },
	
	idChange: function(e){
		this.setState({id: e.target.value})
	},
	
	nameChange: function(e){
      this.setState({name: e.target.value})
    },
    
    logoChange: function(e){
     this.setState({logo: e.target.value})
    },

    nicknameChange: function(e){
      this.setState({Nickname: e.target.value})
    },
	
	foundedChange: function(e){
		this.setState({Founded: e.target.value})
	},
	
	stadiumChange: function(e){
		this.setState({Stadium: e.target.value})
	},
	
	capacityChange: function(e){
		this.setState({Capacity: e.target.value})
	},
	
	managerChange: function(e){
		this.setState({Manager: e.target.value})
	},
	
	latestnewsChange: function(e){
		this.setState({latestNews: e.target.value})
	},
	
	statsChange: function(e){
		this.setState({stats: e.target.value})
	},
	
	descriptionChange: function(e){
		this.setState({Description: e.target.value})
	},
	
	render: function(){

		return (	
					<div>
					<form onSubmit={this.submit} >
						<BasicInputBox label="Id:" valChange={this.idChange} val={this.state.id}/>
						<BasicInputBox label="Name:" valChange={this.nameChange} val={this.state.name}/>
						<BasicInputBox label="Logo:" valChange={this.logoChange} val={this.state.logo}/>
						<BasicInputBox label="Nickname:" valChange={this.nicknameChange} val={this.state.nickname}/>
						<BasicInputBox label="Founded:" valChange={this.foundedChange} val={this.state.founded}/>
						<BasicInputBox label="Stadium:" valChange={this.stadiumChange} val={this.state.stadium}/>
						<BasicInputBox label="Capacity:" valChange={this.capacityChange} val={this.state.capacity}/>
						<BasicInputBox label="Manager:" valChange={this.managerChange} val={this.state.manager}/>
						<BasicInputBox label="Latest News:" valChange={this.latestnewsChange} val={this.state.latestnews}/>
						<BasicInputBox label="Stats:" valChange={this.statsChange} val={this.state.stats}/>
						<BasicInputBox label="Description:" valChange={this.descriptionChange} val={this.state.description}/>
					<button type="submit">PUT</button>
					</form>
					</div> )
	}
});


class Get extends React.Component{
		componentDidMount() {
				$.ajax({ //This is jquery to make the api call to the specific url
				url: 'http://localhost:4000/api/teams',
				dataType: 'json',
				type: 'GET',
			}).done((response) =>{
				for(var i=0; i<response.length; i++){
				  data.push({
					  "NAME": response[i].name,
					  "LOGO": response[i].logo,
					  "NICKNAME": response[i].Nickname,
					  "FOUNDED": response[i].Founded,
					  "STADIUM": response[i].Stadium,
					  "CAPACITY": response[i].Capacity,
					  "MANAGER": response[i].Manager,
					  "LATESTNEWS": response[i].latestNews,
					  "STATS": response[i].stats,
					  "DESCRIPTION": response[i].description
					})
			}
			this.setState({data: data})
		});
		}
		render() 
		{
			var namesList = data.map(team =>{
				return ( <li key={team.NAME} className="data"> 
							<p>Team Name: {team.NAME} 	Logo: {team.LOGO} 	Nickname: {team.NICKNAME} 	Founded: {team.FOUNDED} 	Stadium: {team.STADIUM} 	Capacity: {team.CAPACITY} 	Manager: {team.MANAGER} 	Latest News: {team.LATESTNEWS}
								Stats: {team.STATS} 	Description: {team.DESCRIPTION}</p> 
							<br></br>
							 <code> {'{'}"name": {'{'}team.NAME{'}'}, "logo": {'{'}team.LOGO{'}'}, "Nickname:" {'{'}team.NICKNAME{'}'}, "Founded": {'{'}team.FOUNDED{'}'}, 
							 "Stadium": {'{'}team.STADIUM{'}'}, "Capacity": {'{'}team.CAPACITY{'}'}, "Manager": {'{'}team.MANAGER{'}'}, "latestNews": {'{'}team.LATESTNEWS{'}'}, "stats": {'{'}team.STATS{'}'}, 
							 "Description": {'{'}team.DESCRIPTION{'}'}{'}'}</code>
							 <br></br>
							 <br></br>
							 <br></br>
						</li>)
			})
			return <div>
				<div id="data">
						<ul>
						{namesList}
						</ul>
					</div>	
				</div>
		}
};

export default Get;

//Displays the homepage itself
var Home = React.createClass({
	showLock: function() {
		// Show the Auth0Lock widget
		this.props.lock.show();
	},

	render: function() {
		return (	<div>
						<div className="login-box">
							<h1>Welcome to Danny's Premier League App</h1>
							<p>Click on the button below to sign in or sign up to unlock features</p>
							<button onClick={this.showLock}>Sign In</button>
						</div>
					</div>)
	}
});

//This is responsible for an API call to an external API and displays a table
class TablePage extends React.Component{	//This code is responsible for being able to display a up-to-date table for the English Premier League 
	componentDidMount() {
		if (loopControl==0){
			$.ajax({ //This is jquery to make the api call to the specific url
				url: 'http://soccer.sportsopendata.net/v1/leagues/premier-league/seasons/16-17/standings',
				dataType: 'json',
				type: 'GET',
			}).done((response) => {
				for(var i =0; i<response.data.standings.length; i++){
					bplTeams.push({ //this adds the data from the json
						"TEAM": response.data.standings[i].team,
						"GP": response.data.standings[i].overall.matches_played,
						"W": response.data.standings[i].overall.wins, 
						"D": response.data.standings[i].overall.draws,
						"L": response.data.standings[i].overall.losts,
						"GF": response.data.standings[i].overall.scores,
						"GA": response.data.standings[i].overall.conceded,
						"GD": response.data.standings[i].overall.goal_difference,
						"PTS": response.data.standings[i].overall.points
					})
				}
				loopControl++;
				this.setState({ bplTeams: bplTeams }) //updates bplTeams
			}); 
		}
	}
	render(){
		if (localStorage.getItem('id_token')){
			return	<div className="Premier League Clubs">
						<Links />
						<h1>Premier League Table</h1>
							<Table className="table" 
							filterable={['TEAM', 'GP', 'W', 'D', 'L', 'GF', 'GA', 'GD', 'PTS']} //the tags it can be filtered by
							noDataText="No matching records found" //if no results are found display this when searching
							sortable={true}
							data={bplTeams}>
								<Thead>
									<Th column="TEAM">TEAM</Th>
									<Th column="GP">GP</Th>
									<Th column="W">W</Th>
									<Th column="D">D</Th>
									<Th column="L">L</Th>
									<Th column="GF">GF</Th>
									<Th column="GA">GA</Th>
									<Th column="GD">GD</Th>
									<Th column="PTS">PTS</Th>
								</Thead>
							</Table>
					</div>
		}
		else{
			return	<div>
						<Links />
						<h1> Log in to see the table </h1>
					</div>
		}
	}
};

export default TablePage;

//This is responsible for displaying all the teams on the teams page
class Teams extends React.Component{
	render(){ 
		if (localStorage.getItem('id_token')){
			json = JSON.parse(localStorage.getItem('teams'));
		}
		var teams = json;
		var link="/teams/"; //The default start of a link
		var teamName=""; 
		var namesList = teams.map(team =>{
		teamName=link+team.name; //adds the link and the current team name
		return (	<li key={team.name} className="Teamsss"> 
						<img src={require(team.logo)}/>
						<h3><Link to={teamName}>{team.name}</Link></h3>
						<p>{team.Description}</p>
					</li>)

		})
		if (localStorage.getItem('id_token')){
		return	<div>
					<Links />		
					<div id="Teams">	
						<ul>
							{namesList}					
						</ul>
					</div>
				</div>
		}
		else{
			return	<div>
						<Links />
						<h1> Log in to see the teams </h1>
					</div>
		}
	}

};

export default Teams;

//Responsible for logging out a user
class Logout extends React.Component{
	render(){
		localStorage.clear();
		return	<div>
					<Links />
					<h1>You have succesfully logged out</h1>
				</div>
	}
}

//This displays the different links for a navigation bar.
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

//This displays the teams information
class TeamInformation extends React.Component{
	render(){	
		if (localStorage.getItem('id_token')){
			json = JSON.parse(localStorage.getItem('teams'));
		}
		var teams = json; //All the team data
		var name = this.props.params.name; //The name entered
		var currentTeam = teams.filter(currentTeam =>{
		if (currentTeam.name == name){
				return currentTeam;
			}
		});
		return	<div className="Current Team">
					<Links />
						<div id="TeamInfo">
							<h2>Team Information</h2>
							<ul>
								<li><b>Nickname:</b> {currentTeam[0].Nickname}</li>
								<li><b>Founded:</b> {currentTeam[0].Founded}</li>
								<li><b>Stadium:</b> {currentTeam[0].Stadium}</li>
								<li><b>Capacity:</b> {currentTeam[0].Capacity}</li>
								<li><b>Manager:</b> {currentTeam[0].Manager}</li>
							</ul>
						</div>
						<div id="stats">
							<iframe src={currentTeam[0].stats} scrolling="no" marginwidth="0" marginheight="0" frameborder="0" width="590px" 
							height="540px"></iframe>
						</div>
						<div id="Header">
							<img src={require(currentTeam[0].logo)} />
							<h1>{currentTeam[0].name}</h1>
							<iframe src={currentTeam[0].latestNews} width="300" height="250" scrolling="no"></iframe>
						</div>
				</div>
	}
};

export default TeamInformation;

//This is the page responsible for an about page
class AboutPage extends React.Component{
	render(){
		if (localStorage.getItem('id_token')){
				return	<div>
							<Links />
							<div id="About">
							
								<h1>About</h1>
								<p>The aim of this app is to give information on the different aspects of the Barclays Premier League.
								It is broken down into different sections: teams, individual teams, and also a table.
								This about page will also show the different technologies that I used to make this app.</p>
								
								<h1><Link to="teams">Teams</Link></h1>
								<p>Teams will be the section where it will contain all the different teams in the Premier League.
								It will have a hyperlink to their page which will have more information about the team. It will also give a brief description of 
								the club in question.</p>
								
								<h1>Teams Individual Pages</h1>
								<p>The individual page will contain more detailed information and give different stats on the teams.
								It will contain a a news feed for each team which will link to stories about that team. </p>
								
								<h1><Link to="table">Table</Link></h1>
								<p>The table will give a fully searchable and sortable table of the updated standings week by week.
								It uses an api from <a href="http://sportsopendata.net/">Sports Open Data</a> to give the updated standings.</p>
								
								<div id="Teams">
									<ul>
										<li>
											<h3>React</h3>
											<p>Lorem Ipsum</p>
										</li>
									</ul>
								</div>
							</div>
						</div>
		}
		else{
			return	<div>
						<Links />
						<h1> Log in to see the about section </h1>
					</div>
		}
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
			<Route path="teams" component={Teams} />
			<Route path="teams/:name" component={TeamInformation} />
			<Route path="table" component={TablePage}/>
			<Route path="logout" component={Logout} />
		</Router>	
), document.getElementById('root'))

