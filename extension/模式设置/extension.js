game.import("extension",function(lib,game,ui,get,ai,_status){
	// 关闭扩展后自动将游戏人数恢复为八人，避免报错
	if(!game.getExtensionConfig('模式设置','enable') && lib.config.youxirenshu_identityguozhan!=false){
		game.saveConfig('player_number','8','identity');
		game.saveConfig('player_number','8','guozhan');
		game.saveConfig('youxirenshu_identityguozhan',false);
	}
	return {
	    name:"模式设置",
    	editable: false,
	content:function (config,pack){
		game.saveConfig('youxirenshu_identityguozhan',true);
			lib.arenaReady.push(function(){
				// 完善模式设置国战模式其他-控制界面座位号翻译
				lib.translate.unknown8 = "九号位";
				lib.translate.unknown9 = "十号位";
				lib.translate.unknown10 = "十一号位";
				lib.translate.unknown11 = "十二号位";
				lib.translate.unknown12 = "十三号位";
				lib.translate.unknown13 = "十四号位";
				lib.translate.unknown14 = "十五号位";
				lib.translate.unknown15 = "十六号位";
				lib.translate.unknown16 = "十七号位";
				// 界面缩放
				lib.configMenu.appearence.config.ui_zoom={
					name:'界面缩放',
					unfrequent:true,
					init:'normalc',
					item:{
						normalw:'170%',
						normalv:'165%',
						normalu:'160%',
						normalt:'155%',
						normals:'150%',
						normalr:'145%',
						normalq:'140%',
						normalp:'135%',
						normala:'130%',
						normalb:'125%',
						normalc:'120%',
						normald:'115%',
						normale:'110%',
						normalf:'105%',
						normal:'100%',
						normalg:'95%',
						normalh:'90%',
						normali:'85%',
						normalj:'80%',
						normalk:'75%',
						normall:'70%',
						normalm:'65%',
						normaln:'60%',
						normalo:'55%',
					},
					onclick:function(zoom){
						game.saveConfig('ui_zoom',zoom);
						// 扩展界面缩放设置与本体界面缩放设置保持一致
						game.saveConfig('extension_模式设置_kzjmsf',zoom);
						switch(zoom){
							case 'normalw':zoom=1.7;break;
							case 'normalv':zoom=1.65;break;
							case 'normalu':zoom=1.6;break;
							case 'normalt':zoom=1.55;break;
							case 'normals':zoom=1.5;break;
							case 'normalr':zoom=1.45;break;
							case 'normalq':zoom=1.4;break;
							case 'normalp':zoom=1.35;break;
							case 'normala':zoom=1.3;break;
							case 'normalb':zoom=1.25;break;
							case 'normalc':zoom=1.2;break;
							case 'normald':zoom=1.15;break;
							case 'normale':zoom=1.1;break;
							case 'normalf':zoom=1.05;break;
							case 'normalg':zoom=0.95;break;
							case 'normalh':zoom=0.9;break;
							case 'normali':zoom=0.85;break;
							case 'normalj':zoom=0.8;break;
							case 'normalk':zoom=0.75;break;
							case 'normall':zoom=0.7;break;
							case 'normalm':zoom=0.65;break;
							case 'normaln':zoom=0.6;break;
							case 'normalo':zoom=0.55;break;
							default:zoom=1;
						}
						game.documentZoom=game.deviceZoom*zoom;
						ui.updatez();
					}
				};
				
				var zoom;
				switch(lib.config.ui_zoom){
					case 'normalw':zoom=1.7;break;
					case 'normalv':zoom=1.65;break;
					case 'normalu':zoom=1.6;break;
					case 'normalt':zoom=1.55;break;
					case 'normals':zoom=1.5;break;
					case 'normalr':zoom=1.45;break;
					case 'normalq':zoom=1.4;break;
					case 'normalp':zoom=1.35;break;
					case 'normala':zoom=1.3;break;
					case 'normalb':zoom=1.25;break;
					case 'normalc':zoom=1.2;break;
					case 'normald':zoom=1.15;break;
					case 'normale':zoom=1.1;break;
					case 'normalf':zoom=1.05;break;
					case 'normalg':zoom=0.95;break;
					case 'normalh':zoom=0.9;break;
					case 'normali':zoom=0.85;break;
					case 'normalj':zoom=0.8;break;
					case 'normalk':zoom=0.75;break;
					case 'normall':zoom=0.7;break;
					case 'normalm':zoom=0.65;break;
					case 'normaln':zoom=0.6;break;
					case 'normalo':zoom=0.55;break;
					default:zoom=1;
				}
				game.documentZoom=game.deviceZoom*zoom;
				if(zoom!=1){
					ui.updatez();
				}
				
				// 触屏按钮位置调整
				if(lib.config.cpanwztz == 'shouji1'||lib.config.cpanwztz == 'shouji2'||lib.config.cpanwztz == 'shouji3'||lib.config.cpanwztz == 'shouji4'||lib.config.cpanwztz == 'diannao1'||lib.config.cpanwztz == 'diannao2'||lib.config.cpanwztz == 'diannao3'){
					if (lib.device) {
						// 手机端触屏按钮位置调整
						if(ui.roundmenu){
							if(lib.config.cpanwztz == 'shouji1'){
								ui.roundmenu.style.left = '211px';
								ui.roundmenu.style.top = '249px';
							}
							if(lib.config.cpanwztz == 'shouji2'){
								ui.roundmenu.style.left = '225px';
								ui.roundmenu.style.top = '264px';
							}
							if(lib.config.cpanwztz == 'shouji3'){
								ui.roundmenu.style.left = '237px';
								ui.roundmenu.style.top = '280px';
							}
							if(lib.config.cpanwztz == 'shouji4'){
								ui.roundmenu.style.left = '305px';
								ui.roundmenu.style.top = '465px';
							}
						}
					} else {
						// 电脑端触屏按钮位置调整
						if(ui.roundmenu){
							if(lib.config.cpanwztz == 'diannao1'){
								ui.roundmenu.style.left = '231px';
								ui.roundmenu.style.top = '345px';
							}
							if(lib.config.cpanwztz == 'diannao2'){
								ui.roundmenu.style.left = '253px';
								ui.roundmenu.style.top = '331px';
							}
							if(lib.config.cpanwztz == 'diannao3'){
								ui.roundmenu.style.left = '280px';
								ui.roundmenu.style.top = '544px';
							}
						}
					}
					// 关闭记住按钮位置设置开关
					lib.configMenu.view.config.remember_round_button.onclick(false);
				} else {
					// 本扩展接管了本体触屏按钮位置的设置（修改本体代码无效，若想调整触屏按钮位置要修改本扩展默认位置）
					// 若关闭本选项，则调整为默认位置
					if (lib.device) {
						// 手机端
						if(ui.roundmenu){
							ui.roundmenu.style.left = '211px';
							ui.roundmenu.style.top = '249px';
						}
					} else {
						// 电脑端
						if(ui.roundmenu){
							ui.roundmenu.style.left = '231px';
							ui.roundmenu.style.top = '345px';
						}
					}
					// 开启记住按钮位置设置开关
					lib.configMenu.view.config.remember_round_button.onclick(true);
				}
				
			});
			
			// 初始界面缩放比例设置
			if (lib.config.kzjmsf == undefined) {
				if (lib.device) {
					// 手机端
					var item = 'normalg';
					lib.extensionMenu['extension_模式设置'].kzjmsf.onclick(item);
					game.saveConfig('extension_模式设置_kzjmsf',item);
					game.saveConfig('kzjmsf',item);
				} else {
					// 电脑端
					var item = 'normalp';
					lib.extensionMenu['extension_模式设置'].kzjmsf.onclick(item);
					game.saveConfig('extension_模式设置_kzjmsf',item);
					game.saveConfig('kzjmsf',item);
				}
			}
			
			// 模式设置布局
			var style1=document.createElement('style');
			// 9人
			style1.innerHTML+="[data-number='9']>.player[data-position='1']{top:72px;left:auto;right:calc(2% - 30px);}";
			style1.innerHTML+="[data-number='9']>.player[data-position='2']{top:18px;left:auto;right:calc(14% - 18px);}";
			style1.innerHTML+="[data-number='9']>.player[data-position='3']{top:9px;left:auto;right:calc(27% - 19px);}";
			style1.innerHTML+="[data-number='9']>.player[data-position='4']{top:0px;left:auto;right:calc(40% - 16px);}";
			style1.innerHTML+="[data-number='9']>.player[data-position='5']{top:0px;left:calc(40% - 16px);}";
			style1.innerHTML+="[data-number='9']>.player[data-position='6']{top:9px;left:calc(27% - 19px);}";
			style1.innerHTML+="[data-number='9']>.player[data-position='7']{top:18px;left:calc(14% - 18px);}";
			style1.innerHTML+="[data-number='9']>.player[data-position='8']{top:72px;left:calc(2% - 30px);}";
			// 10人
			style1.innerHTML+="[data-number='10']>.player[data-position='1']{top:72px;left:auto;right:calc(2% - 30px);}";
			style1.innerHTML+="[data-number='10']>.player[data-position='2']{top:36px;left:auto;right:calc(14% - 38px);}";
			style1.innerHTML+="[data-number='10']>.player[data-position='3']{top:18px;left:auto;right:calc(25% - 32px);}";
			style1.innerHTML+="[data-number='10']>.player[data-position='4']{top:9px;left:auto;right:calc(36% - 28px);}";
			style1.innerHTML+="[data-number='10']>.player[data-position='5']{top:0px;left:calc(47% - 22.5px);}";
			style1.innerHTML+="[data-number='10']>.player[data-position='6']{top:9px;left:calc(36% - 28px);}";
			style1.innerHTML+="[data-number='10']>.player[data-position='7']{top:18px;left:calc(25% - 32px);}";
			style1.innerHTML+="[data-number='10']>.player[data-position='8']{top:36px;left:calc(14% - 38px);}";
			style1.innerHTML+="[data-number='10']>.player[data-position='9']{top:72px;left:calc(2% - 30px);}";
			// 11人
			style1.innerHTML+="[data-number='11']>.player[data-position='1']{top:72px;left:auto;right:calc(2% - 30px);}";
			style1.innerHTML+="[data-number='11']>.player[data-position='2']{top:36px;left:auto;right:calc(12% - 28px);}";
			style1.innerHTML+="[data-number='11']>.player[data-position='3']{top:18px;left:auto;right:calc(22% - 26px);}";
			style1.innerHTML+="[data-number='11']>.player[data-position='4']{top:9px;left:auto;right:calc(32% - 24px);}";
			style1.innerHTML+="[data-number='11']>.player[data-position='5']{top:0px;left:auto;right:calc(42% - 22.5px);}";
			style1.innerHTML+="[data-number='11']>.player[data-position='6']{top:0px;left:calc(42% - 22.5px);}";
			style1.innerHTML+="[data-number='11']>.player[data-position='7']{top:9px;left:calc(32% - 24px);}";
			style1.innerHTML+="[data-number='11']>.player[data-position='8']{top:18px;left:calc(22% - 26px);}";
			style1.innerHTML+="[data-number='11']>.player[data-position='9']{top:36px;left:calc(12% - 28px);}";
			style1.innerHTML+="[data-number='11']>.player[data-position='10']{top:72px;left:calc(2% - 30px);}";
			// 12人
			style1.innerHTML+="[data-number='12']>.player[data-position='1']{top:275px;left:auto;right:calc(2% - 30px);}";
			style1.innerHTML+="[data-number='12']>.player[data-position='2']{top:72px;left:auto;right:calc(2% - 30px);}";
			style1.innerHTML+="[data-number='12']>.player[data-position='3']{top:36px;left:auto;right:calc(14% - 38px);}";
			style1.innerHTML+="[data-number='12']>.player[data-position='4']{top:18px;left:auto;right:calc(25% - 32px);}";
			style1.innerHTML+="[data-number='12']>.player[data-position='5']{top:9px;left:auto;right:calc(36% - 28px);}";
			style1.innerHTML+="[data-number='12']>.player[data-position='6']{top:0px;left:calc(47% - 22.5px);}";
			style1.innerHTML+="[data-number='12']>.player[data-position='7']{top:9px;left:calc(36% - 28px);}";
			style1.innerHTML+="[data-number='12']>.player[data-position='8']{top:18px;left:calc(25% - 32px);}";
			style1.innerHTML+="[data-number='12']>.player[data-position='9']{top:36px;left:calc(14% - 38px);}";
			style1.innerHTML+="[data-number='12']>.player[data-position='10']{top:72px;left:calc(2% - 30px);}";
			style1.innerHTML+="[data-number='12']>.player[data-position='11']{top:275px;left:calc(2% - 30px);}";
			// 13人
			style1.innerHTML+="[data-number='13']>.player[data-position='1']{top:275px;left:auto;right:calc(2% - 30px);}";
			style1.innerHTML+="[data-number='13']>.player[data-position='2']{top:72px;left:auto;right:calc(2% - 30px);}";
			style1.innerHTML+="[data-number='13']>.player[data-position='3']{top:36px;left:auto;right:calc(12% - 28px);}";
			style1.innerHTML+="[data-number='13']>.player[data-position='4']{top:18px;left:auto;right:calc(22% - 26px);}";
			style1.innerHTML+="[data-number='13']>.player[data-position='5']{top:9px;left:auto;right:calc(32% - 24px);}";
			style1.innerHTML+="[data-number='13']>.player[data-position='6']{top:0px;left:auto;right:calc(42% - 22.5px);}";
			style1.innerHTML+="[data-number='13']>.player[data-position='7']{top:0px;left:calc(42% - 22.5px);}";
			style1.innerHTML+="[data-number='13']>.player[data-position='8']{top:9px;left:calc(32% - 24px);}";
			style1.innerHTML+="[data-number='13']>.player[data-position='9']{top:18px;left:calc(22% - 26px);}";
			style1.innerHTML+="[data-number='13']>.player[data-position='10']{top:36px;left:calc(12% - 28px);}";
			style1.innerHTML+="[data-number='13']>.player[data-position='11']{top:72px;left:calc(2% - 30px);}";
			style1.innerHTML+="[data-number='13']>.player[data-position='12']{top:275px;left:calc(2% - 30px);}";
			// 14人
			style1.innerHTML+="[data-number='14']>.player[data-position='1']{top:275px;left:auto;right:calc(12% - 28px);}";
			style1.innerHTML+="[data-number='14']>.player[data-position='2']{top:275px;left:auto;right:calc(2% - 30px);}";
			style1.innerHTML+="[data-number='14']>.player[data-position='3']{top:72px;left:auto;right:calc(2% - 30px);}";
			style1.innerHTML+="[data-number='14']>.player[data-position='4']{top:36px;left:auto;right:calc(14% - 38px);}";
			style1.innerHTML+="[data-number='14']>.player[data-position='5']{top:18px;left:auto;right:calc(25% - 32px);}";
			style1.innerHTML+="[data-number='14']>.player[data-position='6']{top:9px;left:auto;right:calc(36% - 28px);}";
			style1.innerHTML+="[data-number='14']>.player[data-position='7']{top:0px;left:calc(47% - 22.5px);}";
			style1.innerHTML+="[data-number='14']>.player[data-position='8']{top:9px;left:calc(36% - 28px);}";
			style1.innerHTML+="[data-number='14']>.player[data-position='9']{top:18px;left:calc(25% - 32px);}";
			style1.innerHTML+="[data-number='14']>.player[data-position='10']{top:36px;left:calc(14% - 38px);}";
			style1.innerHTML+="[data-number='14']>.player[data-position='11']{top:72px;left:calc(2% - 30px);}";
			style1.innerHTML+="[data-number='14']>.player[data-position='12']{top:275px;left:calc(2% - 30px);}";
			style1.innerHTML+="[data-number='14']>.player[data-position='13']{top:275px;left:calc(12% - 28px);}";
			// 15人
			style1.innerHTML+="[data-number='15']>.player[data-position='1']{top:275px;left:auto;right:calc(12% - 28px);}";
			style1.innerHTML+="[data-number='15']>.player[data-position='2']{top:275px;left:auto;right:calc(2% - 30px);}";
			style1.innerHTML+="[data-number='15']>.player[data-position='3']{top:72px;left:auto;right:calc(2% - 30px);}";
			style1.innerHTML+="[data-number='15']>.player[data-position='4']{top:36px;left:auto;right:calc(12% - 28px);}";
			style1.innerHTML+="[data-number='15']>.player[data-position='5']{top:18px;left:auto;right:calc(22% - 26px);}";
			style1.innerHTML+="[data-number='15']>.player[data-position='6']{top:9px;left:auto;right:calc(32% - 24px);}";
			style1.innerHTML+="[data-number='15']>.player[data-position='7']{top:0px;left:auto;right:calc(42% - 22.5px);}";
			style1.innerHTML+="[data-number='15']>.player[data-position='8']{top:0px;left:calc(42% - 22.5px);}";
			style1.innerHTML+="[data-number='15']>.player[data-position='9']{top:9px;left:calc(32% - 24px);}";
			style1.innerHTML+="[data-number='15']>.player[data-position='10']{top:18px;left:calc(22% - 26px);}";
			style1.innerHTML+="[data-number='15']>.player[data-position='11']{top:36px;left:calc(12% - 28px);}";
			style1.innerHTML+="[data-number='15']>.player[data-position='12']{top:72px;left:calc(2% - 30px);}";
			style1.innerHTML+="[data-number='15']>.player[data-position='13']{top:275px;left:calc(2% - 30px);}";
			style1.innerHTML+="[data-number='15']>.player[data-position='14']{top:275px;left:calc(12% - 28px);}";
			// 16人
			style1.innerHTML+="[data-number='16']>.player[data-position='1']{top:275px;left:auto;right:calc(22% - 26px);}";
			style1.innerHTML+="[data-number='16']>.player[data-position='2']{top:275px;left:auto;right:calc(12% - 28px);}";
			style1.innerHTML+="[data-number='16']>.player[data-position='3']{top:275px;left:auto;right:calc(2% - 30px);}";
			style1.innerHTML+="[data-number='16']>.player[data-position='4']{top:72px;left:auto;right:calc(2% - 30px);}";
			style1.innerHTML+="[data-number='16']>.player[data-position='5']{top:36px;left:auto;right:calc(14% - 38px);}";
			style1.innerHTML+="[data-number='16']>.player[data-position='6']{top:18px;left:auto;right:calc(25% - 32px);}";
			style1.innerHTML+="[data-number='16']>.player[data-position='7']{top:9px;left:auto;right:calc(36% - 28px);}";
			style1.innerHTML+="[data-number='16']>.player[data-position='8']{top:0px;left:calc(47% - 22.5px);}";
			style1.innerHTML+="[data-number='16']>.player[data-position='9']{top:9px;left:calc(36% - 28px);}";
			style1.innerHTML+="[data-number='16']>.player[data-position='10']{top:18px;left:calc(25% - 32px);}";
			style1.innerHTML+="[data-number='16']>.player[data-position='11']{top:36px;left:calc(14% - 38px);}";
			style1.innerHTML+="[data-number='16']>.player[data-position='12']{top:72px;left:calc(2% - 30px);}";
			style1.innerHTML+="[data-number='16']>.player[data-position='13']{top:275px;left:calc(2% - 30px);}";
			style1.innerHTML+="[data-number='16']>.player[data-position='14']{top:275px;left:calc(12% - 28px);}";
			style1.innerHTML+="[data-number='16']>.player[data-position='15']{top:275px;left:calc(22% - 26px);}";
			// 17人
			style1.innerHTML+="[data-number='17']>.player[data-position='1']{top:275px;left:auto;right:calc(22% - 26px);}";
			style1.innerHTML+="[data-number='17']>.player[data-position='2']{top:275px;left:auto;right:calc(12% - 28px);}";
			style1.innerHTML+="[data-number='17']>.player[data-position='3']{top:275px;left:auto;right:calc(2% - 30px);}";
			style1.innerHTML+="[data-number='17']>.player[data-position='4']{top:72px;left:auto;right:calc(2% - 30px);}";
			style1.innerHTML+="[data-number='17']>.player[data-position='5']{top:36px;left:auto;right:calc(12% - 28px);}";
			style1.innerHTML+="[data-number='17']>.player[data-position='6']{top:18px;left:auto;right:calc(22% - 26px);}";
			style1.innerHTML+="[data-number='17']>.player[data-position='7']{top:9px;left:auto;right:calc(32% - 24px);}";
			style1.innerHTML+="[data-number='17']>.player[data-position='8']{top:0px;left:auto;right:calc(42% - 22.5px);}";
			style1.innerHTML+="[data-number='17']>.player[data-position='9']{top:0px;left:calc(42% - 22.5px);}";
			style1.innerHTML+="[data-number='17']>.player[data-position='10']{top:9px;left:calc(32% - 24px);}";
			style1.innerHTML+="[data-number='17']>.player[data-position='11']{top:18px;left:calc(22% - 26px);}";
			style1.innerHTML+="[data-number='17']>.player[data-position='12']{top:36px;left:calc(12% - 28px);}";
			style1.innerHTML+="[data-number='17']>.player[data-position='13']{top:72px;left:calc(2% - 30px);}";
			style1.innerHTML+="[data-number='17']>.player[data-position='14']{top:275px;left:calc(2% - 30px);}";
			style1.innerHTML+="[data-number='17']>.player[data-position='15']{top:275px;left:calc(12% - 28px);}";
			style1.innerHTML+="[data-number='17']>.player[data-position='16']{top:275px;left:calc(22% - 26px);}";
			document.head.appendChild(style1);
			
			lib.mode.identity.config.player_number.item={
				'2':'两人',
				'3':'三人',
				'4':'四人',
				'5':'五人',
				'6':'六人',
				'7':'七人',
				'8':'八人',
				'9':'九人',
				'10':'十人',
				'11':'十一人',
				'12':'十二人',
				'13':'十三人',
				'14':'十四人',
				'15':'十五人',
				'16':'十六人',
				'17':'十七人',
			}
			lib.mode.guozhan.config.player_number.item={
				'2':'两人',
				'3':'三人',
				'4':'四人',
				'5':'五人',
				'6':'六人',
				'7':'七人',
				'8':'八人',
				'9':'九人',
				'10':'十人',
				'11':'十一人',
				'12':'十二人',
				'13':'十三人',
				'14':'十四人',
				'15':'十五人',
				'16':'十六人',
				'17':'十七人',
			};
			
			// 模式设置身份选项
			// 2人
			if(config.two2Man=='1'){
				lib.config.mode_config.identity.identity[0]=['zhu','fan'];
			}
			if(config.two2Man=='2'){
				lib.config.mode_config.identity.identity[0]=['zhu','nei'];
			}
			// 3人
			if(config.three3Man=='1'){
				lib.config.mode_config.identity.identity[1]=['zhu','nei','fan'];
			}
			if(config.three3Man=='2'){
				lib.config.mode_config.identity.identity[1]=['zhu','zhong','fan'];
			}
			if(config.three3Man=='3'){
				lib.config.mode_config.identity.identity[1]=['zhu','zhong','nei'];
			}
			if(config.three3Man=='4'){
				lib.config.mode_config.identity.identity[1]=['zhu','fan','fan'];
			}
			if(config.three3Man=='5'){
				lib.config.mode_config.identity.identity[1]=['zhu','nei','nei'];
			}
			// 4人
			if(config.four4Man=='1'){
				lib.config.mode_config.identity.identity[2]=['zhu','zhong','nei','fan'];
			}
			if(config.four4Man=='2'){
				lib.config.mode_config.identity.identity[2]=['zhu','zhong','fan','fan'];
			}
			if(config.four4Man=='3'){
				lib.config.mode_config.identity.identity[2]=['zhu','zhong','zhong','fan'];
			}
			if(config.four4Man=='4'){
				lib.config.mode_config.identity.identity[2]=['zhu','nei','nei','fan'];
			}
			if(config.four4Man=='5'){
				lib.config.mode_config.identity.identity[2]=['zhu','fan','fan','fan'];
			}
			if(config.four4Man=='6'){
				lib.config.mode_config.identity.identity[2]=['zhu','nei','nei','nei'];
			}
			// 5人
			if(config.five5Man=='1'){
				lib.config.mode_config.identity.identity[3]=['zhu','zhong','nei','fan','fan'];
			}
			if(config.five5Man=='2'){
				lib.config.mode_config.identity.identity[3]=['zhu','zhong','fan','fan','fan'];
			}
			if(config.five5Man=='3'){
				lib.config.mode_config.identity.identity[3]=['zhu','zhong','nei','nei','nei'];
			}
			if(config.five5Man=='4'){
				lib.config.mode_config.identity.identity[3]=['zhu','zhong','zhong','zhong','fan'];
			}
			if(config.five5Man=='5'){
				lib.config.mode_config.identity.identity[3]=['zhu','zhong','zhong','fan','fan'];
			}
			if(config.five5Man=='6'){
				lib.config.mode_config.identity.identity[3]=['zhu','zhong','zhong','nei','nei'];
			}
			if(config.five5Man=='7'){
				lib.config.mode_config.identity.identity[3]=['zhu','nei','nei','fan','fan'];
			}
			if(config.five5Man=='8'){
				lib.config.mode_config.identity.identity[3]=['zhu','fan','fan','fan','fan'];
			}
			if(config.five5Man=='9'){
				lib.config.mode_config.identity.identity[3]=['zhu','nei','nei','nei','nei'];
			}
			// 6人
			if(config.six6Man=='1'){
				lib.config.mode_config.identity.identity[4]=['zhu','zhong','nei','fan','fan','fan'];
			}
			if(config.six6Man=='2'){
				lib.config.mode_config.identity.identity[4]=['zhu','zhong','fan','fan','fan','fan'];
			}
			if(config.six6Man=='3'){
				lib.config.mode_config.identity.identity[4]=['zhu','zhong','nei','nei','nei','fan'];
			}
			if(config.six6Man=='4'){
				lib.config.mode_config.identity.identity[4]=['zhu','zhong','zhong','zhong','zhong','fan'];
			}
			if(config.six6Man=='5'){
				lib.config.mode_config.identity.identity[4]=['zhu','zhong','zhong','zhong','fan','fan'];
			}
			if(config.six6Man=='6'){
				lib.config.mode_config.identity.identity[4]=['zhu','zhong','zhong','zhong','nei','nei'];
			}
			if(config.six6Man=='7'){
				lib.config.mode_config.identity.identity[4]=['zhu','zhong','zhong','fan','fan','fan'];
			}
			if(config.six6Man=='8'){
				lib.config.mode_config.identity.identity[4]=['zhu','zhong','zhong','nei','nei','fan'];
			}
			if(config.six6Man=='9'){
				lib.config.mode_config.identity.identity[4]=['zhu','nei','nei','fan','fan','fan'];
			}
			if(config.six6Man=='10'){
				lib.config.mode_config.identity.identity[4]=['zhu','nei','nei','nei','nei','fan'];
			}
			if(config.six6Man=='11'){
				lib.config.mode_config.identity.identity[4]=['zhu','fan','fan','fan','fan','fan'];
			}
			if(config.six6Man=='12'){
				lib.config.mode_config.identity.identity[4]=['zhu','nei','nei','nei','nei','nei'];
			}
			// 7人
			if(config.seven7Man=='1'){
				lib.config.mode_config.identity.identity[5]=['zhu','zhong','zhong','nei','fan','fan','fan'];
			}
			if(config.seven7Man=='2'){
				lib.config.mode_config.identity.identity[5]=['zhu','zhong','zhong','fan','fan','fan','fan'];
			}
			if(config.seven7Man=='3'){
				lib.config.mode_config.identity.identity[5]=['zhu','zhong','zhong','nei','nei','nei','fan'];
			}
			if(config.seven7Man=='4'){
				lib.config.mode_config.identity.identity[5]=['zhu','zhong','zhong','zhong','zhong','zhong','fan'];
			}
			if(config.seven7Man=='5'){
				lib.config.mode_config.identity.identity[5]=['zhu','zhong','zhong','zhong','zhong','fan','fan'];
			}
			if(config.seven7Man=='6'){
				lib.config.mode_config.identity.identity[5]=['zhu','zhong','zhong','zhong','zhong','nei','nei'];
			}
			if(config.seven7Man=='7'){
				lib.config.mode_config.identity.identity[5]=['zhu','zhong','zhong','zhong','fan','fan','fan'];
			}
			if(config.seven7Man=='8'){
				lib.config.mode_config.identity.identity[5]=['zhu','zhong','zhong','zhong','nei','nei','fan'];
			}
			if(config.seven7Man=='9'){
				lib.config.mode_config.identity.identity[5]=['zhu','zhong','fan','fan','fan','fan','fan'];
			}
			if(config.seven7Man=='10'){
				lib.config.mode_config.identity.identity[5]=['zhu','zhong','nei','nei','fan','fan','fan'];
			}
			if(config.seven7Man=='11'){
				lib.config.mode_config.identity.identity[5]=['zhu','zhong','nei','nei','nei','nei','fan'];
			}
			if(config.seven7Man=='12'){
				lib.config.mode_config.identity.identity[5]=['zhu','nei','nei','fan','fan','fan','fan'];
			}
			if(config.seven7Man=='13'){
				lib.config.mode_config.identity.identity[5]=['zhu','nei','nei','nei','nei','fan','fan'];
			}
			if(config.seven7Man=='14'){
				lib.config.mode_config.identity.identity[5]=['zhu','fan','fan','fan','fan','fan','fan'];
			}
			if(config.seven7Man=='15'){
				lib.config.mode_config.identity.identity[5]=['zhu','nei','nei','nei','nei','nei','nei'];
			}
			// 8人
			if(config.eight8Man=='1'){
				lib.config.mode_config.identity.identity[6]=['zhu','zhong','zhong','nei','fan','fan','fan','fan'];
			}
			if(config.eight8Man=='2'){
				lib.config.mode_config.identity.identity[6]=['zhu','zhong','zhong','fan','fan','fan','fan','fan'];
			}
			if(config.eight8Man=='3'){
				lib.config.mode_config.identity.identity[6]=['zhu','zhong','zhong','nei','nei','nei','fan','fan'];
			}
			if(config.eight8Man=='4'){
				lib.config.mode_config.identity.identity[6]=['zhu','zhong','zhong','nei','nei','nei','nei','nei'];
			}
			if(config.eight8Man=='5'){
				lib.config.mode_config.identity.identity[6]=['zhu','zhong','zhong','zhong','zhong','zhong','zhong','fan'];
			}
			if(config.eight8Man=='6'){
				lib.config.mode_config.identity.identity[6]=['zhu','zhong','zhong','zhong','zhong','zhong','fan','fan'];
			}
			if(config.eight8Man=='7'){
				lib.config.mode_config.identity.identity[6]=['zhu','zhong','zhong','zhong','zhong','zhong','nei','nei'];
			}
			if(config.eight8Man=='8'){
				lib.config.mode_config.identity.identity[6]=['zhu','zhong','zhong','zhong','zhong','fan','fan','fan'];
			}
			if(config.eight8Man=='9'){
				lib.config.mode_config.identity.identity[6]=['zhu','zhong','zhong','zhong','zhong','nei','nei','fan'];
			}
			if(config.eight8Man=='10'){
				lib.config.mode_config.identity.identity[6]=['zhu','zhong','zhong','zhong','fan','fan','fan','fan'];
			}
			if(config.eight8Man=='11'){
				lib.config.mode_config.identity.identity[6]=['zhu','zhong','zhong','zhong','nei','nei','fan','fan'];
			}
			if(config.eight8Man=='12'){
				lib.config.mode_config.identity.identity[6]=['zhu','zhong','zhong','zhong','nei','nei','nei','nei'];
			}
			if(config.eight8Man=='13'){
				lib.config.mode_config.identity.identity[6]=['zhu','zhong','fan','fan','fan','fan','fan','fan'];
			}
			if(config.eight8Man=='14'){
				lib.config.mode_config.identity.identity[6]=['zhu','zhong','nei','nei','fan','fan','fan','fan'];
			}
			if(config.eight8Man=='15'){
				lib.config.mode_config.identity.identity[6]=['zhu','zhong','nei','nei','nei','nei','fan','fan'];
			}
			if(config.eight8Man=='16'){
				lib.config.mode_config.identity.identity[6]=['zhu','zhong','nei','nei','nei','nei','nei','nei'];
			}
			if(config.eight8Man=='17'){
				lib.config.mode_config.identity.identity[6]=['zhu','nei','nei','fan','fan','fan','fan','fan'];
			}
			if(config.eight8Man=='18'){
				lib.config.mode_config.identity.identity[6]=['zhu','nei','nei','nei','nei','fan','fan','fan'];
			}
			if(config.eight8Man=='19'){
				lib.config.mode_config.identity.identity[6]=['zhu','nei','nei','nei','nei','nei','nei','fan'];
			}
			if(config.eight8Man=='20'){
				lib.config.mode_config.identity.identity[6]=['zhu','fan','fan','fan','fan','fan','fan','fan'];
			}
			if(config.eight8Man=='21'){
				lib.config.mode_config.identity.identity[6]=['zhu','nei','nei','nei','nei','nei','nei','nei'];
			}
			// 9人
			if(config.nine9Man=='1'){
				lib.config.mode_config.identity.identity.push(['zhu','zhong','zhong','zhong','nei','fan','fan','fan','fan']);
			}
			if(config.nine9Man=='2'){
				lib.config.mode_config.identity.identity.push(['zhu','zhong','zhong','zhong','fan','fan','fan','fan','fan']);
			}
			if(config.nine9Man=='3'){
				lib.config.mode_config.identity.identity.push(['zhu','zhong','zhong','zhong','zhong','fan','fan','fan','fan']);
			}
			if(config.nine9Man=='4'){
				lib.config.mode_config.identity.identity.push(['zhu','zhong','zhong','nei','nei','fan','fan','fan','fan']);
			}
			if(config.nine9Man=='5'){
				lib.config.mode_config.identity.identity.push(['zhu','fan','fan','fan','fan','fan','fan','fan','fan']);
			}
			if(config.nine9Man=='6'){
				lib.config.mode_config.identity.identity.push(['zhu','nei','nei','nei','nei','nei','nei','nei','nei']);
			}
			// 10人
			if(config.ten10Man=='1'){
				lib.config.mode_config.identity.identity.push(['zhu','zhong','zhong','zhong','nei','nei','fan','fan','fan','fan']);
			}
			if(config.ten10Man=='2'){
				lib.config.mode_config.identity.identity.push(['zhu','zhong','zhong','zhong','nei','fan','fan','fan','fan','fan']);
			}
			if(config.ten10Man=='3'){
				lib.config.mode_config.identity.identity.push(['zhu','zhong','zhong','zhong','zhong','fan','fan','fan','fan','fan']);
			}
			if(config.ten10Man=='4'){
				lib.config.mode_config.identity.identity.push(['zhu','fan','fan','fan','fan','fan','fan','fan','fan','fan']);
			}
			if(config.ten10Man=='5'){
				lib.config.mode_config.identity.identity.push(['zhu','nei','nei','nei','nei','nei','nei','nei','nei','nei']);
			}
			// 11人
			if(config.eleven11Man=='1'){
				lib.config.mode_config.identity.identity.push(['zhu','zhong','zhong','zhong','zhong','nei','fan','fan','fan','fan','fan']);
			}
			if(config.eleven11Man=='2'){
				lib.config.mode_config.identity.identity.push(['zhu','zhong','zhong','zhong','zhong','fan','fan','fan','fan','fan','fan']);
			}
			if(config.eleven11Man=='3'){
				lib.config.mode_config.identity.identity.push(['zhu','zhong','zhong','zhong','zhong','zhong','fan','fan','fan','fan','fan']);
			}
			if(config.eleven11Man=='4'){
				lib.config.mode_config.identity.identity.push(['zhu','zhong','zhong','zhong','nei','nei','fan','fan','fan','fan','fan']);
			}
			if(config.eleven11Man=='5'){
				lib.config.mode_config.identity.identity.push(['zhu','fan','fan','fan','fan','fan','fan','fan','fan','fan','fan']);
			}
			if(config.eleven11Man=='6'){
				lib.config.mode_config.identity.identity.push(['zhu','nei','nei','nei','nei','nei','nei','nei','nei','nei','nei']);
			}
			// 12人
			if(config.twelve12Man=='1'){
				lib.config.mode_config.identity.identity.push(['zhu','zhong','zhong','zhong','zhong','nei','nei','fan','fan','fan','fan','fan']);
			}
			if(config.twelve12Man=='2'){
				lib.config.mode_config.identity.identity.push(['zhu','zhong','zhong','zhong','zhong','nei','fan','fan','fan','fan','fan','fan']);
			}
			if(config.twelve12Man=='3'){
				lib.config.mode_config.identity.identity.push(['zhu','zhong','zhong','zhong','zhong','zhong','fan','fan','fan','fan','fan','fan']);
			}
			if(config.twelve12Man=='4'){
				lib.config.mode_config.identity.identity.push(['zhu','fan','fan','fan','fan','fan','fan','fan','fan','fan','fan','fan']);
			}
			if(config.twelve12Man=='5'){
				lib.config.mode_config.identity.identity.push(['zhu','nei','nei','nei','nei','nei','nei','nei','nei','nei','nei','nei']);
			}
			// 13人
			if(config.thirteen13Man=='1'){
				lib.config.mode_config.identity.identity.push(['zhu','zhong','zhong','zhong','zhong','zhong','nei','fan','fan','fan','fan','fan','fan']);
			}
			if(config.thirteen13Man=='2'){
				lib.config.mode_config.identity.identity.push(['zhu','zhong','zhong','zhong','zhong','zhong','fan','fan','fan','fan','fan','fan','fan']);
			}
			if(config.thirteen13Man=='3'){
				lib.config.mode_config.identity.identity.push(['zhu','zhong','zhong','zhong','zhong','zhong','zhong','fan','fan','fan','fan','fan','fan']);
			}
			if(config.thirteen13Man=='4'){
				lib.config.mode_config.identity.identity.push(['zhu','zhong','zhong','zhong','zhong','nei','nei','fan','fan','fan','fan','fan','fan']);
			}
			if(config.thirteen13Man=='5'){
				lib.config.mode_config.identity.identity.push(['zhu','fan','fan','fan','fan','fan','fan','fan','fan','fan','fan','fan','fan']);
			}
			if(config.thirteen13Man=='6'){
				lib.config.mode_config.identity.identity.push(['zhu','nei','nei','nei','nei','nei','nei','nei','nei','nei','nei','nei','nei']);
			}
			// 14人
			if(config.fourteen14Man=='1'){
				lib.config.mode_config.identity.identity.push(['zhu','zhong','zhong','zhong','zhong','zhong','nei','nei','fan','fan','fan','fan','fan','fan']);
			}
			if(config.fourteen14Man=='2'){
				lib.config.mode_config.identity.identity.push(['zhu','zhong','zhong','zhong','zhong','zhong','nei','fan','fan','fan','fan','fan','fan','fan']);
			}
			if(config.fourteen14Man=='3'){
				lib.config.mode_config.identity.identity.push(['zhu','zhong','zhong','zhong','zhong','zhong','zhong','fan','fan','fan','fan','fan','fan','fan']); 
			}
			if(config.fourteen14Man=='4'){
				lib.config.mode_config.identity.identity.push(['zhu','fan','fan','fan','fan','fan','fan','fan','fan','fan','fan','fan','fan','fan']);
			}
			if(config.fourteen14Man=='5'){
				lib.config.mode_config.identity.identity.push(['zhu','nei','nei','nei','nei','nei','nei','nei','nei','nei','nei','nei','nei','nei']);
			}
			// 15人
			if(config.fifteen15Man=='1'){
				lib.config.mode_config.identity.identity.push(['zhu','zhong','zhong','zhong','zhong','zhong','zhong','nei','fan','fan','fan','fan','fan','fan','fan']);
			}
			if(config.fifteen15Man=='2'){
				lib.config.mode_config.identity.identity.push(['zhu','zhong','zhong','zhong','zhong','zhong','zhong','fan','fan','fan','fan','fan','fan','fan','fan']);
			}
			if(config.fifteen15Man=='3'){
				lib.config.mode_config.identity.identity.push(['zhu','zhong','zhong','zhong','zhong','zhong','zhong','zhong','fan','fan','fan','fan','fan','fan','fan']);
			}
			if(config.fifteen15Man=='4'){
				lib.config.mode_config.identity.identity.push(['zhu','zhong','zhong','zhong','zhong','zhong','nei','nei','fan','fan','fan','fan','fan','fan','fan']);
			}
			if(config.fifteen15Man=='5'){
				lib.config.mode_config.identity.identity.push(['zhu','fan','fan','fan','fan','fan','fan','fan','fan','fan','fan','fan','fan','fan','fan']);
			}
			if(config.fifteen15Man=='6'){
				lib.config.mode_config.identity.identity.push(['zhu','nei','nei','nei','nei','nei','nei','nei','nei','nei','nei','nei','nei','nei','nei']);
			}
			// 16人
			if(config.Sixteen16Man=='1'){
				lib.config.mode_config.identity.identity.push(['zhu','zhong','zhong','zhong','zhong','zhong','zhong','nei','nei','fan','fan','fan','fan','fan','fan','fan']);
			}
			if(config.Sixteen16Man=='2'){
				lib.config.mode_config.identity.identity.push(['zhu','zhong','zhong','zhong','zhong','zhong','zhong','nei','fan','fan','fan','fan','fan','fan','fan','fan']);
			}
			if(config.Sixteen16Man=='3'){
				lib.config.mode_config.identity.identity.push(['zhu','zhong','zhong','zhong','zhong','zhong','zhong','zhong','fan','fan','fan','fan','fan','fan','fan','fan']);
			}
			if(config.Sixteen16Man=='4'){
				lib.config.mode_config.identity.identity.push(['zhu','zhong','zhong','zhong','zhong','zhong','nei','nei','nei','fan','fan','fan','fan','fan','fan','fan']);
			}
			if(config.Sixteen16Man=='5'){
				lib.config.mode_config.identity.identity.push(['zhu','fan','fan','fan','fan','fan','fan','fan','fan','fan','fan','fan','fan','fan','fan','fan']);
			}
			if(config.Sixteen16Man=='6'){
				lib.config.mode_config.identity.identity.push(['zhu','nei','nei','nei','nei','nei','nei','nei','nei','nei','nei','nei','nei','nei','nei','nei']);
			}
			// 17人
			if(config.Seventeen17Man=='1'){
			lib.config.mode_config.identity.identity.push(['zhu','zhong','zhong','zhong','zhong','zhong','zhong','zhong','nei','fan','fan','fan','fan','fan','fan','fan','fan']);
			}
			if(config.Seventeen17Man=='2'){
			lib.config.mode_config.identity.identity.push(['zhu','zhong','zhong','zhong','zhong','zhong','zhong','zhong','fan','fan','fan','fan','fan','fan','fan','fan','fan']);
			}
			if(config.Seventeen17Man=='3'){
			lib.config.mode_config.identity.identity.push(['zhu','zhong','zhong','zhong','zhong','zhong','zhong','zhong','zhong','fan','fan','fan','fan','fan','fan','fan','fan']);
			}
			if(config.Seventeen17Man=='4'){
			lib.config.mode_config.identity.identity.push(['zhu','zhong','zhong','zhong','zhong','zhong','zhong','nei','nei','fan','fan','fan','fan','fan','fan','fan','fan']);
			}
			if(config.Seventeen17Man=='5'){
				lib.config.mode_config.identity.identity.push(['zhu','zhong','zhong','zhong','zhong','zhong','nei','nei','nei','fan','fan','fan','fan','fan','fan','fan','fan']);
			}
			if(config.Seventeen17Man=='6'){
				lib.config.mode_config.identity.identity.push(['zhu','zhong','zhong','zhong','zhong','nei','nei','nei','nei','fan','fan','fan','fan','fan','fan','fan','fan']);
			}
			if(config.Seventeen17Man=='7'){
				lib.config.mode_config.identity.identity.push(['zhu','fan','fan','fan','fan','fan','fan','fan','fan','fan','fan','fan','fan','fan','fan','fan','fan']);
			}
			if(config.Seventeen17Man=='8'){
				lib.config.mode_config.identity.identity.push(['zhu','nei','nei','nei','nei','nei','nei','nei','nei','nei','nei','nei','nei','nei','nei','nei','nei']);
			}
			
		},precontent:function (){
			
		},
		help:{
			
		},
		config:{
			kzjmsf:{
				name:'界面缩放(超过8人需缩小界面)',
				intro: "除本体界面缩放设置选项（点击触屏按钮，选项-选项-外观-界面缩放）外，还可通过本扩展此选项调节界面缩放（即时生效）。<br>重启后扩展界面缩放设置与本体界面缩放设置保持一致（界面缩放比例大小以重启前最后一次选择的选项为准）。",
				item:{
					normalw:'170%',
					normalv:'165%',
					normalu:'160%',
					normalt:'155%',
					normals:'150%',
					normalr:'145%',
					normalq:'140%',
					normalp:'135%',
					normala:'130%',
					normalb:'125%',
					normalc:'120%',
					normald:'115%',
					normale:'110%',
					normalf:'105%',
					normal:'100%',
					normalg:'95%',
					normalh:'90%',
					normali:'85%',
					normalj:'80%',
					normalk:'75%',
					normall:'70%',
					normalm:'65%',
					normaln:'60%',
					normalo:'55%',
				},
				onclick:function(item){
					// 扩展界面缩放设置与本体界面缩放设置保持一致
					lib.configMenu.appearence.config.ui_zoom.onclick(item);
				},
			},
			"cpanwztz":{
				"name":"触屏按钮位置",
				"intro":"自用设置，可调整触屏按钮位置，若开启本选项则自动关闭记住按钮位置设置开关，手动重启后生效。<br>①手机：界面缩放100%、界面缩放95%、界面缩放70%。<br>②电脑：全屏（界面缩放135%）、非全屏（最大化，界面缩放130%和95%）。<br>若关闭本选项，则调整触屏按钮位置为默认位置，开启记住按钮位置设置开关（重新开始后触屏按钮将保存的上一局的位置）。",
				"init":lib.config.cpanwztz === undefined ? "off" : lib.config.cpanwztz,
				"item": {
					"off":"关闭",
					"shouji1":"手机-缩放100%",
					"shouji2":"手机-缩放95%",
					"shouji3":"手机-缩放90%",
					"shouji4":"手机-缩放70%",
					"diannao1":"电脑-全屏135%",
					"diannao2":"电脑-非全屏130%",
					"diannao3":"电脑-非全屏95%",
				},
				onclick:function(item){
					game.saveConfig('extension_模式设置_cpanwztz',item);
					game.saveConfig('cpanwztz',item);
				},
			},
			"two2Man":{"name":"二人场身份","init":"1","item":{"1":"1主0忠1反0内","2":"1主0忠0反1内"}},
			"three3Man":{"name":"三人场身份","init":"1","item":{"1":"1主0忠1反1内","2":"1主1忠1反0内","3":"1主1忠0反1内","4":"1主0忠2反0内","5":"1主0忠0反2内"}},
			"four4Man":{"name":"四人场身份","init":"1","item":{"1":"1主1忠1反1内","2":"1主1忠2反0内","3":"1主2忠1反0内","4":"1主0忠1反2内","5":"1主0忠3反0内","6":"1主0忠0反3内"}},
			"five5Man":{"name":"五人场身份","init":"1","item":{"1":"1主1忠2反1内","2":"1主1忠3反0内","3":"1主1忠0反3内","4":"1主3忠1反0内","5":"1主2忠2反0内","6":"1主2忠0反2内","7":"1主0忠2反2内","8":"1主0忠4反0内","9":"1主0忠0反4内"}},
			"six6Man":{"name":"六人场身份","init":"1","item":{"1":"1主1忠3反1内","2":"1主1忠4反0内","3":"1主1忠1反3内","4":"1主4忠1反0内","5":"1主3忠2反0内","6":"1主3忠0反2内","7":"1主2忠3反0内","8":"1主2忠1反2内","9":"1主0忠3反2内","10":"1主0忠1反4内","11":"1主0忠5反0内","12":"1主0忠0反5内"}},
			"seven7Man":{"name":"七人场身份","init":"1","item":{"1":"1主2忠3反1内","2":"1主2忠4反0内","3":"1主2忠1反3内","4":"1主5忠1反0内","5":"1主4忠2反0内","6":"1主4忠0反2内","7":"1主3忠3反0内","8":"1主3忠1反2内","9":"1主1忠5反0内","10":"1主1忠3反2内","11":"1主1忠1反4内","12":"1主0忠4反2内","13":"1主0忠2反4内","14":"1主0忠6反0内","15":"1主0忠0反6内"}},
			"eight8Man":{"name":"八人场身份","init":"1","item":{"1":"1主2忠4反1内","2":"1主2忠5反0内","3":"1主2忠2反3内","4":"1主2忠0反5内","5":"1主6忠1反0内","6":"1主5忠2反0内","7":"1主5忠0反2内","8":"1主4忠3反0内","9":"1主4忠1反2内","10":"1主3忠4反0内","11":"1主3忠2反2内","12":"1主3忠0反4内","13":"1主1忠6反0内","14":"1主1忠4反2内","15":"1主1忠2反4内","16":"1主1忠0反6内","17":"1主0忠5反2内","18":"1主0忠3反4内","19":"1主0忠1反6内","20":"1主0忠7反0内","21":"1主0忠0反7内"}},
			"nine9Man":{"name":"九人场身份","init":"1","item":{"1":"1主3忠4反1内","2":"1主3忠5反0内","3":"1主4忠4反0内","4":"1主2忠4反2内","5":"1主0忠8反0内","6":"1主0忠0反8内"}},
			"ten10Man":{"name":"十人场身份","init":"1","item":{"1":"1主3忠4反2内","2":"1主3忠5反1内","3":"1主4忠5反0内","4":"1主0忠9反0内","5":"1主0忠0反9内"}},
			"eleven11Man":{"name":"十一人场身份","init":"1","item":{"1":"1主4忠5反1内","2":"1主4忠6反0内","3":"1主5忠5反0内","4":"1主3忠5反2内","5":"1主0忠10反0内","6":"1主0忠0反10内"}},
			"twelve12Man":{"name":"十二人场身份","init":"1","item":{"1":"1主4忠5反2内","2":"1主4忠6反1内","3":"1主5忠6反0内","4":"1主0忠11反0内","5":"1主0忠0反11内"}},
			"thirteen13Man":{"name":"十三人场身份","init":"1","item":{"1":"1主5忠6反1内","2":"1主5忠7反0内","3":"1主6忠6反0内","4":"1主4忠6反2内","5":"1主0忠12反0内","6":"1主0忠0反12内"}},
			"fourteen14Man":{"name":"十四人场身份","init":"1","item":{"1":"1主5忠6反2内","2":"1主5忠7反1内","3":"1主6忠7反0内","4":"1主0忠13反0内","5":"1主0忠0反13内"}},
			"fifteen15Man":{"name":"十五人场身份","init":"1","item":{"1":"1主6忠7反1内","2":"1主6忠8反0内","3":"1主7忠7反0内","4":"1主5忠7反2内","5":"1主0忠14反0内","6":"1主0忠0反14内"}},
			"Sixteen16Man":{"name":"十六人场身份","init":"1","item":{"1":"1主6忠7反2内","2":"1主6忠8反1内","3":"1主7忠8反0内","4":"1主5忠7反3内","5":"1主0忠15反0内","6":"1主0忠0反15内"}},
			"Seventeen17Man":{"name":"十七人场身份","init":"1","item":{"1":"1主7忠8反1内","2":"1主7忠9反0内","3":"1主8忠8反0内","4":"1主6忠8反2内","5":"1主5忠8反3内","6":"1主4忠8反4内","7":"1主0忠16反0内","8":"1主0忠0反16内"}},
			
		},
		package:{
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
				list:[
					
				],
			},
			skill:{
				skill:{
					
				},
				translate:{
					
				},
			},
			intro:"界面缩放比例：9人场推荐90%，10人场推荐85%，11-17人场推荐75%",
			author:"<font color=\"#96CAFF\">角完</font>",
			diskURL:"",
			forumURL:"",
			version:"3.0",
		},
		files:{
			character:[
				
			],
			card:[
				
			],
			skill:[
				
			]
		}
	}
})