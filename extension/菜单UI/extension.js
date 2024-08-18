game.import("extension",function(lib,game,ui,get,ai,_status){
	let layoutPath = lib.assetURL + 'extension/菜单UI/';
		if (lib.config.extension_菜单UI_xindmenu == "4") {
		lib.init.css(layoutPath, 'menu4'); /*十周年小屏*/
	};
		/*-----------------分割线-----------------*/
	// 检测本体按钮背景选项
return {name:"菜单UI",content:function(config,pack){
window.nmimport = function(func) {
            func(lib, game, ui, get, ai, _status);
        };   
if (lib.config.extensions && lib.config.extensions.contains('菜单UI') && lib.config['extension_菜单UI_enable']) {      
console.time('菜单UI'); 
/*if(config.xindmenu){ //美化菜单           
lib.init.css(lib.assetURL + 'extension/菜单UI', 'menu');
};   */
if(config.xindmusic){   //菜单音效            
lib.init.js(lib.assetURL + 'extension/菜单UI', 'menu');}
}
   if(config.mvbeijing){
    lib.skill._nibeipianle={
        direct:true,
        trigger:{
            global:"gameStart",
        },
        filter:function(event,player){
            return player == game.me;
        },
        content:function(){
            'step 0'
            var div = ui.create.div();
            div.style.width = '100%';
            div.style.height = '100%';
            div.style.left = '0px';
            div.style.top = '0px';
            div.innerHTML = "<video width='320' height='240'  autoplay loop style='width:100%;height:100%;object-fit:fill;'><source src='"+lib.assetURL+"extension/菜单UI/背景视频.mp4' type='video/mp4'></video>";
            document.body.insertBefore(div,ui.window);}
            }
            };
    
},help:{},config:{
	xindmenu: {
				init: "4",
				intro: "开启后可以美化游戏的菜单，需要重启",
				name: "菜单UI",
				item: {
					"0": "关闭",
					"4": "十周年",
					
				},
			},

"xindmusic":{"name":"菜单音效美化","init":false,"intro":"为菜单按钮提供音效并添加返回键,此功能不稳定"},
/*"xindmenu":{"name":"菜单UI","init":true,"intro":"美化菜单样式为全屏，建议搭配美化音效使用"}*/},package:{
    character:{
        character:{
        },
        translate:{
        },
    },
    card:{
        card:{
        },
        translate:{
        },
        list:[],
    },
    skill:{
        skill:{
        },
        translate:{
        },
    },
    intro:"",
    author:"角完",
    diskURL:"",
    forumURL:"",
    version:"2.0",
},files:{"character":[],"card":[],"skill":[]}}})