var React = require('react');
var NavLink = require('./NavLink');
var List = React.createClass({
    getInitialState:function(){
        return(
            {
                list:[]
            }
        )
    },

    componentWillMount:function(){
        var _this = this;
        var type = _this.props.params.type;
        switch(type){
            case 'jok' : var url='https://route.showapi.com/341-2?maxResult=30&page=&showapi_appid=29555&showapi_sign=581906fd3c4843b18da2fbba5e4f3f83';
            break;
            case 'movie':var url='http://localhost:3000/db';
            break;
            defult;
        }
        $.ajax({url:url,dataType:'json'}).then(function(res){
            switch(type){
                case 'jok' :
                    console.log('---'+type+'---');
                    _this.setState({
                        list:res.showapi_res_body.contentlist
                    })
                break;  
                case 'movie' :
                    console.log('---'+type+'---');
                    _this.setState({
                        list:res.subjects
                    })
                break;  
                defult;
            }
            
        })
    },
    render:function(){
        var lst = [];
		var data=this.state.list;
		var len=data.length;
		if(len>0){
			for(var i=0 ; i<len ; i++){
				var detailsurl='/details/'+data[i].id+'/'+this.props.params.type;
                var img = data[i].images ? data[i].images.medium : data[i].img;
                var title= data[i].original_title ? data[i].original_title : data[i].title;
				lst.push(
				  <div className="col-lg-4" key={i}>
		          <img className="img-circle" src={img} alt={title} width="140" height="140" />
		          <h2>{title}</h2>
		          <p>Donec sed odio dui. Etiam porta sem malesuada magna mollis euismod. Nullam id dolor id nibh ultricies vehicula ut id elit. Morbi leo risus, porta ac consectetur ac, vestibulum at eros. Praesent commodo cursus magna.</p>
		          <p><NavLink to={detailsurl} className="btn btn-default" role="button">View details »</NavLink></p>
		      </div>
				)
			}
		}
        return(
            <div className="container marketing textcenter">
                <h2 className='well'>列表<NavLink to={'/'} className='more'>返回>></NavLink></h2>
                <div className="row textcenter">
                    {lst}
                </div>
                <hr className="featurette-divider"/>
            </div>
        )
    }
})
module.exports = List;