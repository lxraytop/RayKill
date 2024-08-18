game.import("extension",function(lib,game,ui,get,ai,_status){return {name:"扩展导入",editable: false,content:function(config,pack){
	// 自动一键导入重启
	if (config.byzy_zdyjdrcq) {
		game.yjdrcqgn(true);
	}
	
	// 扩展导入完成后，再次重启时，检测扩展文件夹名是否正确，新增为防出现bug请修正的提示
	for(var i in lib.extensionPack){
		if(!lib.config.extensions.contains(i)){
			alert("检测到扩展文件夹名不正确！\r将会引起很多跟路径相关的bug，而且这样导入的扩展无法在游戏内删除。\n\r为防出现bug，请修正扩展文件夹名为:\n游戏目录/extension/" + i);
		}
	}
	
},precontent:function(){
	// 下面是一键导入的代码（搬运自特效测试扩展，删除原版导入助手的功能，已征得永远的萌新的修改许可）
	// 原理：根据extension目录下的扩展文件夹名写入游戏设置，完成后自动重启
	game.yjdrcqgn = function(bool) {
		var arr;
		game.getFileList("extension", function(fold, file) {
			arr = Array.from(fold);
			var f = function(array, ck) {
				if (!Array.isArray(array) || array.length == 0) return;
				var fail = [],
					rean = false;
				while (array.length) {
					var obj = array.shift();
					// 新增当扩展文件夹内缺少extension.js时报错提示
					if (!lib.device) {
						if (!lib.node.fs.existsSync('./resources/app/extension/' + obj + '/' + 'extension.js')) {
							alert("本层文件夹内缺少 extension.js 文件:\n游戏目录/extension/" + obj + "\n\r请检查扩展文件夹的文件结构是否正确！");
							continue;
						}
					} else {
						window.resolveLocalFileSystemURL(lib.assetURL + 'extension/' + obj + '/' + 'extension.js', function(entry) {
							// alert('导入成功');
						}, function() {
						   alert("本层文件夹内缺少 extension.js 文件:\n游戏目录/extension/" + obj + "\n\r请检查扩展文件夹的文件结构是否正确！");
						});
					}
					if (["coin", "boss", "wuxing", "cardpile"].contains(obj)) continue;
					if (ck.indexOf(obj) == -1) {
						fail.add(obj);
						continue;
					}
					if (lib.config.extensions.indexOf(obj) > -1) continue;
					rean = true;
					lib.config.extensions.add(obj);
					game.saveConfig('extension_' + obj + '_enable', true);
				}
				if (fail.length == 0 && rean) {
					game.saveConfig('extensions', lib.config.extensions);
					if (bool == true) game.reload();
				}
			};
			f(arr, Array.from(fold));
		});
	};

},config:{
	

	byzy_zdyjdrcq: {
		name: "自动一键导入重启",
		intro: "开启后每次重启自动执行一键导入重启功能：只需将一至多个解压好的扩展文件夹（注意检查文件夹名和内部文件结构是否正确）放入 <span style=\"color:#0086FF\">游戏目录</span>/extension/ 内，重启后即可自动完成扩展导入。",
		init: true,
	},

	"byzy_yjdrcqgn": {
		"name": "<span style='text-decoration: underline;'>一键导入重启功能</span>",
		"clear": true,
		onclick: function() {
			game.yjdrcqgn(true);
		},
	},
	
},help:{},package:{
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
	version:"1.02",
},files:{"character":[],"card":[],"skill":[]}}})