var React = require('react');
var NavLink = require('./NavLink');

var Home = React.createClass({
	getDefaultProps:function(){
		return{
			movieurl:'http://localhost:3000/db',
			jokurl:'https://route.showapi.com/341-2?maxResult=3&page=&showapi_appid=29555&showapi_sign=581906fd3c4843b18da2fbba5e4f3f83'
		}
	},
	getInitialState:function(){
		return{
			movielist:[],
			joklist:[]
		}
	},
	componentWillMount:function(){
		var _this=this;
		$.ajax({url:_this.props.movieurl}).then(function(res){
			_this.setState({
				movielist:res.subjects
			})
		});
		$.ajax({url:_this.props.jokurl,dataType:'json'}).then(function(res){
			_this.setState({
				joklist:res.showapi_res_body.contentlist
			})
		});
		
	},
	render:function(){
		var movielst = [];
		var moviedata=this.state.movielist;
		var len=moviedata.length;
		if(len>0){
			for(var i=0 ; i<3 ; i++){
				var detailsurl='/details/'+moviedata[i].id+'/movie';
				movielst.push(
					<div className="col-lg-4" key={i}>
		          <img className="img-circle" src={moviedata[i].images.large} alt={moviedata[i].original_title} width="140" height="140" />
		          <h2>{moviedata[i].title}</h2>
		          <p>Donec sed odio dui. Etiam porta sem malesuada magna mollis euismod. Nullam id dolor id nibh ultricies vehicula ut id elit. Morbi leo risus, porta ac consectetur ac, vestibulum at eros. Praesent commodo cursus magna.</p>
		          <p>
				<NavLink to={detailsurl} className="btn btn-default" role="button">View details »</NavLink>
				</p>
		      </div>
				)
			}
		}
		var joklst = [];
		var jokdata=this.state.joklist;
		var joklen=jokdata.length;
		if(joklen>0){
			for(var i=0 ; i<3 ; i++){
				var detailsurl='/details/'+jokdata[i].id+'/jok';
				joklst.push(
					<div className="col-lg-4" key={i}>
		          <img className="img-circle" src={jokdata[i].img} alt={jokdata[i].title} width="140" height="140" />
		          <h2>{jokdata[i].title}</h2>
		          <p>Donec sed odio dui. Etiam porta sem malesuada magna mollis euismod. Nullam id dolor id nibh ultricies vehicula ut id elit. Morbi leo risus, porta ac consectetur ac, vestibulum at eros. Praesent commodo cursus magna.</p>
		          <p>
					<NavLink to={detailsurl} className="btn btn-default" role="button">View details »</NavLink>
					</p>
		      </div>
				)
			}
		}
		var style={"textAlign":"center"}
		return(
			<div className="container marketing textcenter">
					<h2 className='h2'>电影<NavLink to={'/list/movie'} className='more'>More>></NavLink></h2>
		      <div className="row textcenter">
		        {movielst}
		      </div>
		      <hr className="featurette-divider"/>
					<h2 className='h2'>笑话<NavLink to={'/list/jok'} className='more'>More>></NavLink></h2>
		      <div className="row textcenter">
		        {joklst}
		      </div>
		      <hr className="featurette-divider"/>
			</div>
		)
	}
});
module.exports = Home;