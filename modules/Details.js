var React = require('react');

var Details = React.createClass({
    
    getInitialState:function(){
        return(
            {
                title:'',
                img:'',
                comlist:[],
                id:'',
                username:'yige'
            }
        )
    },

    componentWillMount:function(){
        var _this=this;
        var id = this.props.params.id;
        this.setState({
            id:id
        })
        //详情页面
        var _res = [];
        var type = this.props.params.type;
        switch(type){
            case 'jok' : var url='https://route.showapi.com/341-2?maxResult=30&page=&showapi_appid=29555&showapi_sign=581906fd3c4843b18da2fbba5e4f3f83';

            break;
            case 'movie':var url='http://localhost:3000/db';

            break;
            defult;
        }
        $.ajax({url:url,dataType:'json',}).then(function(res){
            switch(type){
                case 'jok' :
                res.showapi_res_body.contentlist.map(function(item){
                    _res.push(item);
                })
                break;  
                case 'movie' :
                res.subjects.map(function(item){
                    _res.push(item);
                })
                break;  
                defult;
            }
            _res.map(function(item){
            if(item.id===id){
                    var img=item.images?item.images.large:item.img;
                    _this.setState({
                        title:item.title,
                        img:img
                    })
                    
                }
            });    
        })
        //评论列表
        var comurl = 'http://heiwawa.online/php/react_demo.php?table=tb_comment&id='+id;
        
        $.ajax({url:comurl,dataType:'json'}).then(function(res){
            _this.setState({
                comlist:res
            });
           
        })

    },

    subCom:function(){
        var _this = this;
        var insertcom='http://heiwawa.online/php/react_post.php';
        var comtext=this.refs.comtextarea.value;
        console.log('com:'+comtext,'id:'+this.state.id,'username:'+this.state.username);
        $.ajax({
            url:insertcom,
            type:'post',
            data:{
                action:'insert',
                comtext:comtext,
                id:_this.state.id,
                username:_this.state.username
            },
            success:function(data){
               window.location.reload(); 
            // console.log('asdas');
            }
        })
    },
    render:function(){
        var _comlist=[],
            len=this.state.comlist.length;
        
        for(var i=0;i<len;i++){
            _comlist.push(
                <div className='img-thumbnail' key={i}>
                    <p><span className='name'>{this.state.comlist[i].name}</span><span className='time'>{this.state.comlist[i].time}</span>：</p>
                    <p>{this.state.comlist[i].comment}</p>
                </div>
            )
        }
        return(
            <div>
                <div className="content">
                    <img src={this.state.img} alt=""/>
                    <h2 className='title'>{this.state.title}</h2>
                </div>
                <div className="comment">
                    <h3>评论花园</h3>
                    <div className="comtext">
                        <textarea name="" className='comtextarea' ref="comtextarea" ></textarea>
                        <button className='btn btn-success combtn' ref='combtn' onClick={this.subCom}>发表评论</button>
                    </div>
                    
                    <div className="well">
                        <h4>评论列表</h4>
                        {_comlist}
                    </div>
                </div>
            </div>
        )
    }
})
module.exports = Details;