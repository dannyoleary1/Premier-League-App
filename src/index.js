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
var fixtures=[];
var data=[];
var loopControl =0; //To stop re-rendering
var name, nickname, stadium, manager, latestnews, stats, description="";
var founded, capacity=0;

//The page responsible for displaying the home page
var MasterPage = React.createClass({
	
	//responsible for reading in the new data set implemented from a web api
	 componentDidMount : function() {
       request.get('http://127.0.0.1:3001/api/teams?access_token=test')
          .end(function(error, res){
            if (res) {
              json = JSON.parse(res.text);
              localStorage.setItem('teams', JSON.stringify(json)) ;
              this.setState( {}) ; 
            } else {
              console.log(error );
            }
          }.bind(this)); 
		request.get('http://127.0.0.1:3001/api/fixtures?access_token=test')
          .end(function(error, res){
            if (res) {
              fixtures = JSON.parse(res.text);
              localStorage.setItem('fixtures', JSON.stringify(fixtures)) ;
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
		getInitialStateDelete(){
			return {delete: false};
		},
		deleteClick(){
			this.setState({delete: true});
		},
		
		getTable() {
				return { getTable: false };
			},
		getClickTable() {
			this.setState({ getTable: true });
		},
		postTable(){
			return { postTable: false};
		},
		postClickTable(){
			this.setState({postTable: true});
		},
		deleteTable(){
			return { deleteTable: false};
		},
		deleteClickTable(){
			this.setState({deleteTable: true});
		},
		putTable(){
			return {putTable: false};
		},
		putClickTable(){
			this.setState({putTable: true});
		},
		
		getFixture() {
				return { getFixture: false };
			},
		getClickFixture() {
			this.setState({ getFixture: true });
		},
		postFixture(){
			return { postFixture: false};
		},
		postClickFixture(){
			this.setState({postFixture: true});
		},
		deleteFixture(){
			return { deleteFixture: false};
		},
		deleteClickFixture(){
			this.setState({deleteFixture: true});
		},
		putFixture(){
			return {putFixture: false};
		},
		putClickFixture(){
			this.setState({putFixture: true});
		},
	render: function() {		
		
		
		if (this.state.profile) {
			if(this.state.profile.nickname=="dannyoleary1"){
				localStorage.setItem("nickname", "dannyoleary1");
				return ( <div>
							<h2> Welcome Admin </h2>
							<br/>
							<div>
								<input type="submit" value="Show JSON(TEAMS)" onClick={this.onClick} />
								{ this.state.showResults ? <Get /> : null }
							</div>
							<br />
							<div>
								<input type="submit" value="Add Entry(TEAMS)" onClick={this.postClick} />
								{this.state.post ? <Post /> : null}
							</div>
							<br />
							<div>
								<input type="submit" value="Change entry by id(TEAMS)" onClick={this.putClickTable} />
								{this.state.put ? <Put /> : null}
							</div>
							<br />
							<div>
								<input type="submit" value="Delete by ID(TEAMS)" onClick={this.deleteClick} />
								{this.state.delete ? <Delete /> : null}
							</div>
							<br />
							<br />
							<p>This next few buttons are for the table. This is a fail safe for if the sod api stops working</p>
							<br />
							<div>
								<input type="submit" value="Show JSON(table)" onClick={this.getClickTable} />
								{this.state.getTable ? <GetTable /> : null}
							</div>
							<br />
							<div>
								<input type="submit" value="Add Entry(tables)" onClick={this.postClickTable} />
								{this.state.postTable ? <PostTable /> : null}
							</div>
							<br />
							<div>
								<input type="submit" value="Update Entry(tables)" onClick={this.putClickTable} />
								{this.state.putTable ? <PutTable /> : null}
							</div>
							<br />
							<div>
								<input type="submit" value="Delete Entry(tables)" onClick={this.deleteClickTable} />
								{this.state.deleteTable ? <DeleteTable /> : null}
							</div>
							<br />
							<br />
							<p>Controls the fixtures page</p>
							<br />
							<div>
								<input type="submit" value="Show JSON(fixtures)" onClick={this.getClickFixture} />
								{this.state.getFixture ? <GetFixture /> : null}
							</div>
							<br />
							<div>
								<input type="submit" value="Add Entry(fixtures)" onClick={this.postClickFixture} />
								{this.state.postFixture ? <PostFixture /> : null}
							</div>
							<br />
							<div>
								<input type="submit" value="Update Entry(fixtures)" onClick={this.putClickFixture} />
								{this.state.putFixture ? <PutFixture /> : null}
							</div>
							<br />
							<div>
								<input type="submit" value="Delete Entry(fixtures)" onClick={this.deleteClickFixture} />
								{this.state.deleteFixture ? <DeleteFixture /> : null}
							</div>
							<br />
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
					id: this.state.id,
					name: this.state.name,
					logo: this.state.logo,
					Nickname: this.state.Nickname,
					Founded: this.state.Founded, 
					Stadium: this.state.Stadium,
					Capacity: this.state.Capacity,
					Manager: this.state.Manager,
					latestNews: this.state.latestNews,
					stats: this.state.stats,
					Description: this.state.Description
				}
				
			//this is just an example of how you would submit a form
			//you would have to implement something separately on the server
			$.ajax({
			type: 'POST',
			datatype: 'json',
			url: 'http://localhost:3001/api/teams?access_token=test',
			data: data,
			 success: function(data) { alert(JSON.stringify(data)) },
             error: function(data) { alert("eh") }
			})	
				},

	
	clearForm: function() {
      this.setState({
		id: 0,
        name: "",
        logo: "",
        Nickname: "",
		Founded: 0,
		Stadium: "",
		Capacity: 0,
		Manager: "",
		latestNews: "",
		stats: "",
		Description: "",
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
						<BasicInputBox label="ID:" valChange={this.idChange} val={this.state.id}/>
						<BasicInputBox label="Name:" valChange={this.nameChange} val={this.state.name}/>
						<BasicInputBox label="Logo:" valChange={this.logoChange} val={this.state.logo}/>
						<BasicInputBox label="Nickname:" valChange={this.nicknameChange} val={this.state.Nickname}/>
						<BasicInputBox label="Founded:" valChange={this.foundedChange} val={this.state.Founded}/>
						<BasicInputBox label="Stadium:" valChange={this.stadiumChange} val={this.state.Stadium}/>
						<BasicInputBox label="Capacity:" valChange={this.capacityChange} val={this.state.Capacity}/>
						<BasicInputBox label="Manager:" valChange={this.managerChange} val={this.state.Manager}/>
						<BasicInputBox label="Latest News:" valChange={this.latestnewsChange} val={this.state.latestnews}/>
						<BasicInputBox label="Stats:" valChange={this.statsChange} val={this.state.stats}/>
						<BasicInputBox label="Description:" valChange={this.descriptionChange} val={this.state.Description}/>
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
					Nickname: this.state.Nickname,
					Founded: this.state.Founded, 
					Stadium: this.state.Stadium,
					Capacity: this.state.Capacity,
					Manager: this.state.Manager,
					latestNews: this.state.latestNews,
					stats: this.state.stats,
					Description: this.state.Description
				}
			
			
				//you would have to implement something separately on the server
			$.ajax({
			type: 'PUT',
			url: 'http://localhost:3001/api/teams/'+this.state.id+'?access_token=test',
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
        Nickname: "",
		Founded: 0,
		Stadium: "",
		Capacity: 0,
		Manager: "",
		latestNews: "",
		stats: "",
		Description: "",
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
						<BasicInputBox label="Nickname:" valChange={this.nicknameChange} val={this.state.Nickname}/>
						<BasicInputBox label="Founded:" valChange={this.foundedChange} val={this.state.Founded}/>
						<BasicInputBox label="Stadium:" valChange={this.stadiumChange} val={this.state.Stadium}/>
						<BasicInputBox label="Capacity:" valChange={this.capacityChange} val={this.state.Capacity}/>
						<BasicInputBox label="Manager:" valChange={this.managerChange} val={this.state.Manager}/>
						<BasicInputBox label="Latest News:" valChange={this.latestnewsChange} val={this.state.latestnews}/>
						<BasicInputBox label="Stats:" valChange={this.statsChange} val={this.state.stats}/>
						<BasicInputBox label="Description:" valChange={this.descriptionChange} val={this.state.Description}/>
					<button type="submit">PUT</button>
					</form>
					</div> )
	}
});
var Delete = React.createClass({
	
	getInitialState: function(){
      return {}
    },	  
			    submit: function(e){
				var data = {
					id: this.state.id,
				}		
		    //you would have to implement something separately on the server
			$.ajax({
			type: 'DELETE',
			url: 'http://localhost:3001/api/teams/'+this.state.id+'?access_token=test',
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
        Nickname: "",
		Founded: 0,
		Stadium: "",
		Capacity: 0,
		Manager: "",
		latestNews: "",
		stats: "",
		Description: "",
      });
    },
	
	idChange: function(e){
		this.setState({id: e.target.value})
	},
	
	render: function(){
		return (	
					<div>
					<form onSubmit={this.submit} >
						<BasicInputBox label="Id:" valChange={this.idChange} val={this.state.id}/>
					<button type="submit">DELETE BY ID</button>
					</form>
					</div> )
	}
})
class Get extends React.Component{
		componentDidMount() {
				$.ajax({ //This is jquery to make the api call to the specific url
				url: 'http://localhost:3001/api/teams?access_token=test',
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

var PostTable = React.createClass({
	
	getInitialState: function(){
      return {}
    },	  
			    submit: function(e){

				var data = {
					TEAM: this.state.TEAM,
					GP: this.state.GP,
					W: this.state.W,
					D: this.state.D,
					L: this.state.L, 
					GF: this.state.GF,
					GA: this.state.GA,
					GD: this.state.GD,
					PTS: this.state.PTS,
					id: this.state.id,
				}
				
			//this is just an example of how you would submit a form
			//you would have to implement something separately on the server
			$.ajax({
			type: 'POST',
			datatype: 'json',
			url: 'http://localhost:3001/api/tables?access_token=test',
			data: data,
			 success: function(data) { alert(JSON.stringify(data)) },
             error: function(data) { alert("eh") }
			})	
				},

	
	clearForm: function() {
      this.setState({		
        TEAM: "",
        GP: 0,
        W: 0,
		D: 0,
		L: 0,
		GF: 0,
		GA: 0,
		GD: 0,
		PTS: 0,
		id: 0,
      });
    },
	
	idChange: function(e){
		this.setState({id: e.target.value})
	},
	
	teamChange: function(e){
      this.setState({TEAM: e.target.value})
    },
    
    gpChange: function(e){
     this.setState({GP: e.target.value})
    },

    wChange: function(e){
      this.setState({W: e.target.value})
    },
	
	dChange: function(e){
		this.setState({D: e.target.value})
	},
	
	lChange: function(e){
		this.setState({L: e.target.value})
	},
	
	gfChange: function(e){
		this.setState({GF: e.target.value})
	},
	
	gaChange: function(e){
		this.setState({GA: e.target.value})
	},
	
	gdChange: function(e){
		this.setState({GD: e.target.value})
	},
	
	ptsChange: function(e){
		this.setState({PTS: e.target.value})
	},

	
	render: function(){

		return (	
					<div>
					<form onSubmit={this.submit} >
						<BasicInputBox label="TEAM:" valChange={this.teamChange} val={this.state.TEAM}/>
						<BasicInputBox label="GP:" valChange={this.gpChange} val={this.state.GP}/>
						<BasicInputBox label="W:" valChange={this.wChange} val={this.state.W}/>
						<BasicInputBox label="D:" valChange={this.dChange} val={this.state.D}/>
						<BasicInputBox label="L:" valChange={this.lChange} val={this.state.L}/>
						<BasicInputBox label="GF:" valChange={this.gfChange} val={this.state.GF}/>
						<BasicInputBox label="GA:" valChange={this.gaChange} val={this.state.GA}/>
						<BasicInputBox label="GD:" valChange={this.gdChange} val={this.state.GD}/>
						<BasicInputBox label="PTS:" valChange={this.ptsChange} val={this.state.PTS}/>
						<BasicInputBox label="ID:" valChange={this.idChange} val={this.state.id}/>
					<button type="submit">Post</button>
					</form>
					</div> )
	}
});
class GetTable extends React.Component{
		componentDidMount() {
				$.ajax({ //This is jquery to make the api call to the specific url
				url: 'http://localhost:3001/api/tables?access_token=test',
				dataType: 'json',
				type: 'GET',
			}).done((response) =>{
				for(var i=0; i<response.length; i++){
				  data.push({
					  "TEAM": response[i].TEAM,
					  "GP": response[i].GP,
					  "W": response[i].W,
					  "D": response[i].D,
					  "L": response[i].L,
					  "GF": response[i].GF,
					  "GA": response[i].GA,
					  "GD": response[i].GD,
					  "PTS": response[i].PTS,
					  "ID": response[i].id
					})
			}
			this.setState({data: data})
		});
		}
		render() 
		{
			var namesList = data.map(team =>{
				return ( <li key={team.NAME} className="data"> 
							<p>Team Name: {team.TEAM} 	GP: {team.GP} 	W: {team.W} 	D: {team.D} 	L: {team.L} 	GF: {team.GF} 	GA: {team.GA} 	GD: {team.GD}
								PTS: {team.PTS} 	Id: {team.id}</p> 
							<br></br>
							 <code> {'{'}"TEAM": {'{'}team.TEAM{'}'}, "GP": {'{'}team.GP{'}'}, "W" {'{'}team.W{'}'}, "D": {'{'}team.D{'}'}, 
							 "L": {'{'}team.L{'}'}, "GF": {'{'}team.GF{'}'}, "GA": {'{'}team.GA{'}'}, "GD": {'{'}team.GD{'}'}, "PTS": {'{'}team.PTS{'}'}, 
							 "id": {'{'}team.ID{'}'}{'}'}</code>
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
var DeleteTable = React.createClass({
	
	getInitialState: function(){
      return {}
    },	  
			    submit: function(e){
				var data = {
					id: this.state.id,
				}		
		    //you would have to implement something separately on the server
			$.ajax({
			type: 'DELETE',
			url: 'http://localhost:3001/api/tables/'+this.state.id+'?access_token=test',
			data: data
			})
			.done(function(data) {
			self.clearForm()
			})
			.fail(function(jqXhr) {
			console.log('failed to register');
			});
},
	
	idChange: function(e){
		this.setState({id: e.target.value})
	},
	
	render: function(){
		return (	
					<div>
					<form onSubmit={this.submit} >
						<BasicInputBox label="Id:" valChange={this.idChange} val={this.state.id}/>
					<button type="submit">DELETE BY ID</button>
					</form>
					</div> )
	}
})
var PutTable = React.createClass({
	
	getInitialState: function(){
      return {}
    },	  
			    submit: function(e){

				var data = {
					TEAM: this.state.TEAM,
					GP: this.state.GP,
					W: this.state.W,
					D: this.state.D,
					L: this.state.L, 
					GF: this.state.GF,
					GA: this.state.GA,
					GD: this.state.GD,
					PTS: this.state.PTS,
					id: this.state.id,
				}
				
			//this is just an example of how you would submit a form
			//you would have to implement something separately on the server
			$.ajax({
			type: 'PUT',
			datatype: 'json',
			url: 'http://localhost:3001/api/tables/'+this.state.id+'?access_token=test',
			data: data,
			 success: function(data) { alert(JSON.stringify(data)) },
             error: function(data) { alert("eh") }
			})	
				},

	
	clearForm: function() {
      this.setState({		
        TEAM: "",
        GP: 0,
        W: 0,
		D: 0,
		L: 0,
		GF: 0,
		GA: 0,
		GD: 0,
		PTS: 0,
		id: 0,
      });
    },
	
	idChange: function(e){
		this.setState({id: e.target.value})
	},
	
	teamChange: function(e){
      this.setState({TEAM: e.target.value})
    },
    
    gpChange: function(e){
     this.setState({GP: e.target.value})
    },

    wChange: function(e){
      this.setState({W: e.target.value})
    },
	
	dChange: function(e){
		this.setState({D: e.target.value})
	},
	
	lChange: function(e){
		this.setState({L: e.target.value})
	},
	
	gfChange: function(e){
		this.setState({GF: e.target.value})
	},
	
	gaChange: function(e){
		this.setState({GA: e.target.value})
	},
	
	gdChange: function(e){
		this.setState({GD: e.target.value})
	},
	
	ptsChange: function(e){
		this.setState({PTS: e.target.value})
	},

	
	render: function(){

		return (	
					<div>
					<form onSubmit={this.submit} >
						<BasicInputBox label="TEAM:" valChange={this.teamChange} val={this.state.TEAM}/>
						<BasicInputBox label="GP:" valChange={this.gpChange} val={this.state.GP}/>
						<BasicInputBox label="W:" valChange={this.wChange} val={this.state.W}/>
						<BasicInputBox label="D:" valChange={this.dChange} val={this.state.D}/>
						<BasicInputBox label="L:" valChange={this.lChange} val={this.state.L}/>
						<BasicInputBox label="GF:" valChange={this.gfChange} val={this.state.GF}/>
						<BasicInputBox label="GA:" valChange={this.gaChange} val={this.state.GA}/>
						<BasicInputBox label="GD:" valChange={this.gdChange} val={this.state.GD}/>
						<BasicInputBox label="PTS:" valChange={this.ptsChange} val={this.state.PTS}/>
						<BasicInputBox label="ID:" valChange={this.idChange} val={this.state.id}/>
					<button type="submit">Post</button>
					</form>
					</div> )
	}
});

var PostFixture = React.createClass({
getInitialState: function(){
      return {}
    },	  
			    submit: function(e){

				var data = {
					id: this.state.id,
					HOMETEAM: this.state.HOMETEAM,
					HOMEPREVRES: this.state.HOMEPREVRES,
					AWAYTEAM: this.state.AWAYTEAM,
					AWAYPREVRES: this.state.AWAYPREVRES,
					DATE: this.state.DATE, 
					TIME: this.state.TIME,				
				}
				
			//this is just an example of how you would submit a form
			//you would have to implement something separately on the server
			$.ajax({
			type: 'POST',
			datatype: 'json',
			url: 'http://localhost:3001/api/fixtures?access_token=test',
			data: data,
			 success: function(data) { alert(JSON.stringify(data)) },
             error: function(data) { alert("eh") }
			})	
				},

	
	clearForm: function() {
      this.setState({		
        id: 0,
		HOMETEAM: "",
        HOMEPREVRES: "",
        AWAYTEAM: "",
		AWAYPREVRES: "",
		DATE: "",
		TIME: "",
      });
    },
	
	idChange: function(e){
		this.setState({id: e.target.value})
	},
	
	hometeamChange: function(e){
      this.setState({HOMETEAM: e.target.value})
    },
    
    homeprevresChange: function(e){
     this.setState({HOMEPREVRES: e.target.value})
    },

    awayteamChange: function(e){
      this.setState({AWAYTEAM: e.target.value})
    },
	
	awayprevresChange: function(e){
		this.setState({AWAYPREVRES: e.target.value})
	},
	
	dateChange: function(e){
		this.setState({DATE: e.target.value})
	},
	
	timeChange: function(e){
		this.setState({TIME: e.target.value})
	},
	
	render: function(){

		return (	
					<div>
					<form onSubmit={this.submit} >
						<BasicInputBox label="Id:" valChange={this.idChange} val={this.state.id}/>
						<BasicInputBox label="Home Team:" valChange={this.hometeamChange} val={this.state.HOMETEAM}/>
						<BasicInputBox label="Home Prev Results(WWDLW):" valChange={this.homeprevresChange} val={this.state.HOMEPREVRES}/>
						<BasicInputBox label="Away Team:" valChange={this.awayteamChange} val={this.state.AWAYTEAM}/>
						<BasicInputBox label="Away Prev Results(WWDLW):" valChange={this.awayprevresChange} val={this.state.AWAYPREVRES}/>
						<BasicInputBox label="Date:" valChange={this.dateChange} val={this.state.DATE}/>
						<BasicInputBox label="TIME:" valChange={this.timeChange} val={this.state.TIME}/>
					<button type="submit">Post</button>
					</form>
					</div> )
	}
});
class GetFixture extends React.Component{
	componentDidMount() {
				$.ajax({ //This is jquery to make the api call to the specific url
				url: 'http://localhost:3001/api/fixtures?access_token=test',
				dataType: 'json',
				type: 'GET',
			}).done((response) =>{
				for(var i=0; i<response.length; i++){
				  data.push({
					  "id": response[i].id,
					  "HOMETEAM": response[i].HOMETEAM,
					  "HOMEPREVRES": response[i].HOMEPREVRES,
					  "AWAYTEAM": response[i].AWAYTEAM,
					  "AWAYTEAMRES": response[i].AWAYTEAMRES,
					  "DATE": response[i].DATE,
					  "TIME": response[i].TIME
					})
			}
			this.setState({data: data})
		});
		}
		render() 
		{
			var namesList = data.map(team =>{
				return ( <li key={team.NAME} className="data"> 
							<p>Match No. : {team.id} 	Home Team: {team.HOMETEAM} 	Home Previous Results: {team.HOMEPREVRES} 	Away Team: {team.AWAYTEAM} 	Away Previous Team: {team.AWAYPREVRES} 	Date: {team.DATE} 	Time: {team.TIME}</p> 
							<br></br>
							 <code> {'{'}"id": {'{'}team.id{'}'}, "HOMETEAM": {'{'}team.HOMETEAM{'}'}, "HOMEPREVRES" {'{'}team.HOMEPREVRES{'}'}, "AWAYTEAM": {'{'}team.AWAYTEAM{'}'}, 
							 "DATE": {'{'}team.DATE{'}'}, "TIME": {'{'}team.TIME{'}'}</code>
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
var DeleteFixture = React.createClass({
getInitialState: function(){
      return {}
    },	  
			    submit: function(e){
				var data = {
					id: this.state.id,
				}		
		    //you would have to implement something separately on the server
			$.ajax({
			type: 'DELETE',
			url: 'http://localhost:3001/api/fixtures/'+this.state.id+'?access_token=test',
			data: data
			})
			.done(function(data) {
			self.clearForm()
			})
			.fail(function(jqXhr) {
			console.log('failed to register');
			});
},
	
	idChange: function(e){
		this.setState({id: e.target.value})
	},
	
	render: function(){
		return (	
					<div>
					<form onSubmit={this.submit} >
						<BasicInputBox label="Id:" valChange={this.idChange} val={this.state.id}/>
					<button type="submit">DELETE BY ID</button>
					</form>
					</div> )
	}
})
var PutFixture = React.createClass({
	getInitialState: function(){
      return {}
    },	  
			    submit: function(e){

				var data = {
					id: this.state.id,
					HOMETEAM: this.state.HOMETEAM,
					HOMEPREVRES: this.state.HOMEPREVRES,
					AWAYTEAM: this.state.AWAYTEAM,
					AWAYPREVRES: this.state.AWAYPREVRES,
					DATE: this.state.DATE, 
					TIME: this.state.TIME,				
				}
				
			//this is just an example of how you would submit a form
			//you would have to implement something separately on the server
			$.ajax({
			type: 'PUT',
			datatype: 'json',
			url: 'http://localhost:3001/api/fixtures/'+this.state.id+'?access_token=test',
			data: data,
			 success: function(data) { alert(JSON.stringify(data)) },
             error: function(data) { alert("eh") }
			})	
				},

	
	clearForm: function() {
      this.setState({		
        id: 0,
		HOMETEAM: "",
        HOMEPREVRES: "",
        AWAYTEAM: "",
		AWAYPREVRES: "",
		DATE: "",
		TIME: "",
      });
    },
	
	idChange: function(e){
		this.setState({id: e.target.value})
	},
	
	hometeamChange: function(e){
      this.setState({HOMETEAM: e.target.value})
    },
    
    homeprevresChange: function(e){
     this.setState({HOMEPREVRES: e.target.value})
    },

    awayteamChange: function(e){
      this.setState({AWAYTEAM: e.target.value})
    },
	
	awayprevresChange: function(e){
		this.setState({AWAYPREVRES: e.target.value})
	},
	
	dateChange: function(e){
		this.setState({DATE: e.target.value})
	},
	
	timeChange: function(e){
		this.setState({TIME: e.target.value})
	},
	
	render: function(){

		return (	
					<div>
					<form onSubmit={this.submit} >
						<BasicInputBox label="Id:" valChange={this.idChange} val={this.state.id}/>
						<BasicInputBox label="Home Team:" valChange={this.hometeamChange} val={this.state.HOMETEAM}/>
						<BasicInputBox label="Home Prev Results(WWDLW):" valChange={this.homeprevresChange} val={this.state.HOMEPREVRES}/>
						<BasicInputBox label="Away Team:" valChange={this.awayteamChange} val={this.state.AWAYTEAM}/>
						<BasicInputBox label="Away Prev Results(WWDLW):" valChange={this.awayprevresChange} val={this.state.AWAYPREVRES}/>
						<BasicInputBox label="Date:" valChange={this.dateChange} val={this.state.DATE}/>
						<BasicInputBox label="TIME:" valChange={this.timeChange} val={this.state.TIME}/>
					<button type="submit">Post</button>
					</form>
					</div> )
	}
});
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

//Responsible for displaying the fixtures page
class Fixtures extends React.Component{
	render(){ 
		if (localStorage.getItem('id_token')){
			fixtures = JSON.parse(localStorage.getItem('fixtures'));
		}
		var fixtures = fixtures;
		var namesList = fixtures.map(fixture =>{
		return (	<li key={fixture.id} className="Fixtures"> 
						<h1>Fixture: {fixture.id}</h1>
						<p>{fixture.HOMETEAM} ({fixture.HOMEPREVRES}) -  {fixture.AWAYTEAM} ({fixture.AWAYPREVRES})		{fixture.DATE} - {fixture.TIME}</p>
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
}

export default Fixtures;

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
						<li><Link to="/fixtures" activeClassName="active">Fixtures</Link></li>
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
			<Route path="fixtures" component={Fixtures} />
			<Route path="logout" component={Logout} />
		</Router>	
), document.getElementById('root'))

