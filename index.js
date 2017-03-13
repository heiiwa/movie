var React = require('react');
var ReactDom = require('react-dom');

var Router = require('react-router').Router;
var Route = require('react-router').Route;
var hashHistory = require('react-router').hashHistory;
var IndexRoute = require('react-router').IndexRoute;
 
var App = require('./modules/App');
var About = require('./modules/About');
var Contact = require('./modules/Contact');
var Home = require('./modules/Home');
var Details = require('./modules/Details');
var List = require('./modules/List');

var Index = React.createClass({
	render:function () {
		return(
			<Router history = { hashHistory }>
				<Route path = '/' component = { App }>            
					<IndexRoute component = { Home }/>
					<Route path = '/list/:type' component={List}/>
					<Route path = '/About' component = { About } />
					<Route path = '/Contact' component = {Contact} />
					<Route path = '/details/:id/:type' component = {Details} />
				</Route>
			</Router>
		)
	}
})
ReactDom.render(<Index/>,document.getElementById('app'));