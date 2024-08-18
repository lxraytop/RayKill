'use strict';
decadeModule.import(function (lib, game, ui, get, ai, _status) {
    decadeUI.skill={
			wumou:{
				audio:"wumou",
				trigger:{player:'useCard'},
				forced:true,
				filter:function(event){
					return get.type(event.card)=='trick';
				},
				content:function(){
					'step 0'
					if(player.hasMark('baonu')){
						player.chooseControlList([
							'移去1枚【暴怒】标记',
							'受到1点无来源的伤害'
						],true).set('ai',function(event,player){
							if(player.getDamagedHp()>Math.ceil(player.maxHp/2)) return 0;
							if(player.hp>Math.ceil(player.maxHp/2)) return 1;
							return 0;
						});
					}
					else{
						player.damage(1,'nosource');
						event.finish();
					}
					'step 1'
					if(result.index==0){
						player.removeMark('baonu',1);
					}
					else{
						player.damage(1,'nosource');
					}
				},
				ai:{
			        skillTagFilter:function(player){
				        return player.hp>=Math.ceil(player.maxHp/2);
			        },				
					effect:{
						player_use:function(card,player){
							if(get.type(card)=='trick'&&get.value(card)<6){
								return [0,-2];
							}
						}
					}
				}
			},			
            ol_wuqian:{
				derivation:'wushuang',
				audio:'wuqian',
				trigger:{player:'useCardToPlayered'},
				filter:function(event,player){
				if(player.countMark('baonu')>=player.countCards('h')) return false;
				if(!_status.currentPhase||player!=_status.currentPhase) return false;
				if(!['sha','juedou'].contains(event.card.name)||!event.isFirstTarget) return false;
				return player.getHistory('useCard',function(evt){
				return (evt.card.name=='sha'||evt.card.name=='juedou');
				}).indexOf(event.getParent())==0;
				},
				forced:true,
				logTarget:'targets',
				content:function(){
				for(var target of trigger.targets){
				target.addTempSkill('qinggang2');
				target.storage.qinggang2.add(trigger.card);
				player.logSkill("wushuang",target);
				if(trigger.card.name=='sha'){
				var id=target.playerid;
				var map=trigger.getParent().customArgs;
				if(!map[id]) map[id]={};
				if(typeof map[id].shanRequired=='number') map[id].shanRequired++;
				else map[id].shanRequired=2;
				}
				else{
				var id=target.playerid;
				var idt=target.playerid;
				var map=trigger.getParent().customArgs;
				if(!map[idt]) map[idt]={};
				if(!map[idt].shaReq) map[idt].shaReq={};
				if(!map[idt].shaReq[id]) map[idt].shaReq[id]=1;
				map[idt].shaReq[id]++;
				}
				}
				},
				ai:{
				unequip_ai:true,
				skillTagFilter:function(player,tag,arg){
				if(arg&&arg.card&&!player.getHistory('useCard',function(evt){
				return (evt.card.name=='sha'||evt.card.name=='juedou');
				}).length&&['sha','juedou'].contains(arg.card.name)) return true;
				return false;
				},
				effect:{
				player_use:function(card,player){
				if(player.hasSkill('baonu')&&player.countMark('baonu')<player.countCards('h')){
				if(get.name(card)=='sha'||get.name(card)=='juedou') return [0,1];
				}
				},
				},
				},
		    },			
			qinyin:{
				audio:"qinyin",
				trigger:{global:'phaseDiscardEnd'},
				direct:true,
				filter:function(event,player){
					var cards=[];
					event.player.getHistory('lose',function(evt){
						if(evt.type=='discard'&&evt.getParent('phaseDiscard')==event) cards.addArray(evt.cards2);
					});
					if(event.player==player) return cards.length>1;
					return cards.length>player.countCards('h');
				},
				content:function(){
					"step 0"
					event.forceDie=true;
					if(typeof event.count!='number'){
						// event.count=trigger.cards.length-1;
						event.count=1;
					}
					var recover=0,lose=0,players=game.filterPlayer();
					for(var i=0;i<players.length;i++){
						if(players[i].hp<players[i].maxHp){
							if(get.attitude(player,players[i])>0){
								if(players[i].hp<Math.ceil(players[i].maxHp/2)){
									lose--;
									recover+=0.5;
								}
								lose--;
								recover++;
							}
							else if(get.attitude(player,players[i])<0){
								if(players[i].hp<(Math.floor(players[i].maxHp/2)+0.5)){
									lose++;
									recover-=0.5;
								}
								lose++;
								recover--;
							}
						}
						else{
							if(get.attitude(player,players[i])>0){
								lose--;
							}
							else if(get.attitude(player,players[i])<0){
								lose++;
							}
						}
					}
					var prompt=get.prompt('qinyin')+'（剩余'+get.cnNumber(event.count)+'次）';
					player.chooseControl('失去体力','回复体力','cancel2',
					ui.create.dialog(get.prompt('qinyin'),'hidden')).ai=function(){
						if(lose>recover&&lose>0) return 1;
						if(lose<recover&&recover>0) return 1;
						return 0;
					}
					"step 1"
					if(result.control=='cancel2'){
						event.finish();
					}
					else{
						event.bool=(result.control=='回复体力');
						event.num=0;
						event.players=game.filterPlayer();
						player.logSkill('qinyin',event.players);
					}
					"step 2"
					if(event.num<event.players.length){
						var target=event.players[event.num];
						if(event.bool){
							target.recover();
						}
						else{
							target.loseHp();
						}
						event.num++;
						event.redo();
					}
					"step 3"
					if(event.count>1){
						event.count--;
						event.goto(0);
					}
				},	
				ai:{
					expose:0.1,
					threaten:1.5,
				},
			  
			},
    	      shelie:{
				audio:"shelie",
				trigger:{player:'phaseDrawBegin1'},
				locked:false,
				filter:function(event,player){
					return !event.numFixed;
				},
			    init:function(player){
					player.storage.shelie_mark=0;
				},
				content:function(){
					"step 0"
					trigger.finish();
					event.cards=get.cards(5);
					game.cardsGotoOrdering(event.cards);
					event.videoId=lib.status.videoId++;
					game.broadcastAll(function(player,id,cards){
						var str;
						if(player==game.me&&!_status.auto){
							str='涉猎：获取花色各不相同的牌';
						}
						else{
							str='涉猎';
						}
						var dialog=ui.create.dialog(str,cards);
						dialog.videoId=id;
					},player,event.videoId,event.cards);
					event.time=get.utc();
					game.addVideo('showCards',player,['涉猎',get.cardsInfo(event.cards)]);
					game.addVideo('delay',null,2);
					"step 1"
					var list=[];
					for(var i of cards) list.add(get.suit(i,false));
					var next=player.chooseButton(list.length,true);
					next.set('dialog',event.videoId);
					next.set('filterButton',function(button){
						for(var i=0;i<ui.selected.buttons.length;i++){
							if(get.suit(ui.selected.buttons[i].link)==get.suit(button.link)) return false;
						}
						return true;
					});
					next.set('ai',function(button){
						return 7.5-get.useful(button.link,_status.event.player);
					});
					"step 2"
					if(result.bool&&result.links){
						event.cards2=result.links;
					}
					else{
						event.finish();
					}
					var time=1000-(get.utc()-event.time);
					if(time>0){
						game.delay(0,time);
					}
					"step 3"
					game.broadcastAll('closeDialog',event.videoId);
					var cards2=event.cards2;
					var num2=Math.floor(cards2.length/2);
					player.gain(cards2,'log','gain2');
					if(_status.currentPhase==player&&num2>0){	
					   player.storage.shelie_mark+=num2;
					   if(player.hasSkill("shelie")) player.markSkill('shelie_mark');
				    }
				},
			    mod:{
					maxHandcard:function(player,num){
						return num+player.storage.shelie_mark;
					}
				},
				group:"shelie_clear",		
			    subSkill:{
			        mark:{
			            mark:true,
			            charlotte:true,
			            marktext:"猎",
			            intro:{
			            name:"涉猎",
			            content:"本回合手牌上限+#",
			            },
			        },
					clear:{
						trigger:{player:'phaseDiscardAfter'},
						silent:true,
						content:function(){
							player.storage.shelie_mark=0;
							player.unmarkSkill('shelie_mark');
						}
					}
				},
				ai:{
					threaten:1.2,
					skillTagFilter:function(player){
					return player.countCards('h')>=Math.ceil(player.maxHp/2);
			      },
			   },
			},
					gongxin:{
						audio:"gongxin",
						enable:'phaseUse',
						usable:1,
						filterTarget:function(card,player,target){
							return target!=player&&target.countCards('h');
						},
						content:function(){
							'step 0'
							target.showCards('攻心',target.get('h'));
							event.cards=target.get('h',function(card){
								return get.color(card)=='red';
							});
							'step 1'
							if(event.cards.length>0){
							    player.chooseCardButton('选择一张获得之',event.cards,true).ai=function(button){
							         return 7.5-get.useful(button.link,_status.event.player);
								}							
							}
							else{
								target.loseHp(1);
								event.finish();
								return;
							}
							'step 2'
							if(result.bool){
						        player.gain(result.links[0],target,'give');			
						        if(player.hasSkill("gongxin")) player.useSkill("gongxin_buff");			
							}
						},
						subSkill:{
		        			 buff:{
                             direct:true,
                            content:function(){
                               'step 0'
                               player.chooseCard('将一张牌置于牌堆顶',1,'he').set('ai',function(card){
                               var player=_status.event.player,js=player.next.getCards('j');
                               if(js.length){
                               var judge=get.judge(js[0]);
                               if(judge&&(judge(card)+0.05)*get.attitude(player,player.next)>0) return get.value(card);
                               if(judge&&(judge(card)+0.01)*get.attitude(player,player.next)<0) return -get.value(card);
                               }
                              return false;
                              });
                              'step 1'
                             if(result.bool){
		    				   game.log(player,'将一张牌置于了牌堆顶');
			    		       player.lose(result.cards,ui.cardPile,'insert');
				    		   player.$throw(1,1000);
			     		     }
		                  }
		                 },						
						},
						ai:{
							threaten:1.5,
							skillTagFilter:function(player){
				            	return player.hp>=Math.ceil(player.maxHp/2);
			                },
							result:{
								target:function(player,target){
							        if(target.countCards('h')>Math.floor(player.maxHp/2)) return -target.countCards('h');
							        return -target.countCards('h');
								}
							},
							order:1,
							expose:0.4,
						}
					},
             juanjia:{
				audio:2,
				trigger:{
        			player:"enterGame",
        			global:"phaseBefore",
    			},
    			forced:true,
    			filter:function(event,player){
					if(event.name=='phase'&&game.phaseNumber!=0) return false;
					return !player.isDisabled(2)||!player.storage.juanjia;
				},
				content:function(){
					player.disableEquip(2);
					player.storage.juanjia=true;
				},
				group:'juanjia_1',
				subSkill:{
					1:{
						trigger:{
                    		player:"equipBegin",
                		},
                		forced:true,
                		silent:true,
                		filter:function(event,player){
        					return player.storage.juanjia&&get.subtype(event.card)=="equip1"
    					},
                		content:function (){
                    		"step 0"
                    		trigger.untrigger();
                    		trigger.finish();
                    		player.$equip(trigger.card);
							if(player.countCards('e',{subtype:"equip1"})>1){
								//trigger.card.style.left = 'calc(0%)';
    							trigger.card.style.top = 'calc('+-(player.countCards('e',{subtype:"equip1"})-2)*20+'% )';
							}
							else player.storage.juanjia_style=trigger.card.style.top;
                    		game.addVideo('equip',player,get.cardInfo(trigger.card));
                    		game.log(player,'装备了',trigger.card);
                    		"step 1"
                    		var info=get.info(trigger.card);
                    		if(info.onEquip&&(!info.filterEquip||info.filterEquip(trigger.card,player))){
                        		var next=game.createEvent('equip_'+trigger.card.name);
                        		next.setContent(info.onEquip);
                        		next.player=player;
                        		next.trigger.card=trigger.card;
                        		game.delayx();
                    		}
                    		delete player.equiping;
                    		"step 2"
                    		if(player.countCards('e',{subtype:"equip1"})>2) player.chooseButton(['选择一张武器牌弃置', player.getCards('e',{subtype:"equip1"})], 1,true);
                    		"step 3"
                    		if(result.bool){
								player.discard(result.links);
							}
							"step 4"
							for(var i=player.countCards('e',{subtype:"equip1"})-1;i>=0;i--){
								var card=player.getCards('e',{subtype:"equip1"})[i];
								if(i==player.countCards('e',{subtype:"equip1"})-1) card.style.top = player.storage.juanjia_style;
								else card.style.top = 'calc('+(i)*20+'% )';
							}
                    		"step 5"
                    		if(player.countCards('e',{subtype:"equip1"})>2) event.goto(2);
                		},
                        popup:false,
						sub:true,
					},
				},
            },
            qiexie:{
				audio:2,
				trigger:{
        			player:"phaseZhunbeiBegin",
    			},
				init:function(){
					lib.translate['shencai_info']='出牌阶段限一次，你可以令一名其他角色进行判定。你获得此判定牌，然后若此判定牌：包含以下要素中的任意一个，则其失去已有的下列效果，并获得对应的效果：{⒈体力：当其受到伤害后，其失去等量的体力、⒉武器：其不能使用牌响应【杀】、⒊打出：当其失去手牌后，其再随机弃置一张手牌（不嵌套触发）、⒋距离：其的结束阶段开始时，其翻面}；若均不包含，你获得其区域里的一张牌，其获得一枚“死”并获得如下效果：其的角色手牌上限-X、其的回合结束时，若X大于场上存活人数，则其死亡（X为其“死”标记数）。';
				},
				filter:function(event,player){
					return player.countEmptySlot(1)>0;
				},
    			forced:true,
				content:function(){
					'step 0'
					if(!_status.characterlist){
						lib.skill.pingjian.initList();
					}
					_status.characterlist.randomSort();
					var list=[];
					for(var name of _status.characterlist){
						var info=lib.character[name];
						if(info[3].some(function(skill){
							var info=get.skillInfoTranslation(skill);
							if(!info.includes('【杀】')) return false;
							var list=get.skillCategoriesOf(skill);
							list.remove('锁定技');
							return list.length==0;
						})){
							list.push(name);
							if(list.length>=5) break;
						}
					}
					if(!list.length) event.finish();
					else event.list=list.randomRemove(5);
					'step 1'
					player.chooseButton([0,5],true).set('filterButton',function(button){
						var list=[];
						for(var i of lib.character[button.link][3]){
							var info=get.info(i);
							var translate=lib.translate[i+'_info'];
							if(info&&!info.juexingji&&!info.hiddenSkill&&!info.zhuSkill&&!info.limited&&!info.dutySkill&&!info.zhuanhuanji&&!info.groupSkill&&!info.clanSkill&&translate&&translate.indexOf('【杀】')!=-1) list.add(i);
						}
						if(typeof lib.character[button.link][2]=='number') rangeNum=lib.character[button.link][2];
						else rangeNum=lib.character[button.link][2][2];
						if(lib.config.extensions&&lib.config.extensions.contains('UIPro')&&lib.config['extension_UIPro_enable']){
							button.childNodes[2].innerHTML='范围'+rangeNum;
							if(list.length) button.childNodes[0].innerHTML=get.translation(list);
						}
						else{
							button.childNodes[1].innerHTML='范围'+rangeNum;
							button.childNodes[2].innerHTML=get.translation(list);
						}
						return true;
					}).set('ai',function(button){
						if(ui.selected.buttons.length>1) return false;
						var num=0;
						for(var i of lib.character[button.link][3]){
							var info=get.info(i);
							var translate=lib.translate[i+'_info'];
							if(info&&!info.juexingji&&!info.hiddenSkill&&!info.zhuSkill&&!info.limited&&!info.dutySkill&&!info.zhuanhuanji&&!info.groupSkill&&!info.clanSkill&&translate&&translate.indexOf('【杀】')!=-1) num++;
						}
						if(typeof lib.character[button.link][2]=='number') rangeNum=lib.character[button.link][2];
						else rangeNum=lib.character[button.link][2][2];
            			return get.rank(button.link,true)+rangeNum+num;
        			}).set('createDialog',['挈挟','<div class="text center">将任意张武将牌当武器牌置于你的装备区中</div>',[event.list,'character']]);
					'step 2'
					if(result.bool){
						event.list.removeArray(result.links);
						_status.characterlist.addArray(event.list);
						var SerialNumber=function(num){
							if(num==Infinity) return '∞';
							if(isNaN(num)) return '';
							if(typeof num=='number'){
								var str=""+num+"";
								return str.replace("1", "①").replace("2", "②").replace("3", "③").replace("4","④").replace("5", "⑤").replace("6", "⑥").replace("7", "⑦").replace("8", "⑧").replace("9", "⑨");
							}
							else return num;
						};
						for(var i=0;i<result.links.length;i++){
							var skills=[],str='';
							for(var j of lib.character[result.links[i]][3]){
								var info=get.info(j),translate=lib.translate[j+'_info'];
								if(info&&!info.juexingji&&!info.hiddenSkill&&!info.zhuSkill&&!info.limited&&!info.dutySkill&&!info.zhuanhuanji&&!info.groupSkill&&!info.clanSkill&&translate&&translate.indexOf('【杀】')!=-1) skills.add(j);
							}
							for(var j=0;j<skills.length;j++){
								if(j>0) str+=SerialNumber(j+1);
								else if(skills.length>1) str+='①';
								str+='<span class=thundertext>'+lib.translate[skills[j]]+'</span>：'+lib.translate[skills[j]+'_info'];
								if(j<skills.length) str+='<br>';
							}
							if(!str.length) str='无效果。';
							var name='qiexie_'+result.links[i];
							if(typeof lib.character[result.links[i]][2]=='number') rangeNum=lib.character[result.links[i]][2];
							else rangeNum=lib.character[result.links[i]][2][2];
							lib.card[name]={
								fullskin:true,
								enable:true,
								type:'equip',
								subtype:'equip1',
								distance:{attackFrom:-rangeNum+1},
								vanish:true,
								filterTarget:function(card,player,target){
                                	return target==player;
                            	},
                            	selectTarget:-1,
                            	modTarget:true,
                            	toself:true,
                            	content:lib.element.content.equipCard,
								skills:skills,
								//clearLose:true,
								onLose:function(){
									game.log(card,'被销毁了');
									game.cardsGotoSpecial(card);
									card.fix();
									card.remove();
									card.destroyed=true;
									for(var i=player.countCards('e',{subtype:"equip1"})-1;i>=0;i--){
										var he=player.getCards('e',{subtype:"equip1"})[i];
										if(i==player.countCards('e',{subtype:"equip1"})-1) he.style.top = player.storage.juanjia_style;
										else he.style.top = 'calc('+(i)*20+'% )';
									}
								},
								ai:{
									basic:{
										equipValue:(rangeNum+skills.length)*10,
									}
								},
							},
							lib.translate[name]=lib.translate[result.links[i]];
							lib.translate[name+'_info']=str;
							var card=game.createCard(name,'none',NaN);
							card.setBackground(result.links[i],'character');
							player.$gain2(card);
            				game.delayx();
            				player.equip(card);
						}
					}
				},
            },
            cuijue:{
				audio:2,
				enable:'phaseUse',
				filterTarget:function(card,player,target){
					if(target==player||!player.inRange(target)) return false;
					var targets=game.filterPlayer(function(current){
						return player.inRange(current);
					});
					for(var i of targets) if(get.distance(player,i)>get.distance(player,target)) return false;
					return !player.storage.cuijue||!player.storage.cuijue.contains(target);
				},
				filterCard:true,
				content:function (){
        			"step 0"
					if(!player.storage.cuijue) player.storage.cuijue=[];
					player.storage.cuijue.add(target);
        			target.damage('nocard');
    			},
    			check:function(card){
        			return 10-get.value(card);
    			},
				ai:{
        			order:8.5,
        			result:{
            			target:function (player,target){
                			return get.damageEffect(target,player);
            			},
        			},
    			},
				group:'cuijue_init',
				subSkill:{
					init:{
						trigger:{
							global:'phaseAfter',
						},
						filter:function(event,player){
							player.storage.cuijue=[];
						},
						direct:true,
						charlotte:true,
					},
				},
    			position:"he",
            },
		dcjincui:{
			audio:2,
			trigger:{player:'phaseZhunbeiBegin'},
			forced:true,
			content:function(){
				'step 0'
				var num=0;
				for(var i=0;i<ui.cardPile.childNodes.length;i++){
					var card=ui.cardPile.childNodes[i];
					if(get.number(card)==7){
						num++;
						if(num>=player.maxHp) break;
					}
				}
				if(num<1) num=1;
				if(num>player.hp) player.recover(num-player.hp);
				else if(num<player.hp) player.loseHp(player.hp-num);
				'step 1'
                if (player.isUnderControl()) game.modeSwapPlayer(player);
                var player = event.player;
                if (player.isUnderControl()) game.modeSwapPlayer(player);
				var num = player.hp;
                var cards = get.cards(num);
                var guanXing = decadeUI.content.chooseGuanXing(player, cards, cards.length, null, cards.length);
                game.broadcast(function (player, cards) {
                    if (!window.decadeUI) return;
                    decadeUI.content.chooseGuanXing(player, cards, cards.length, null, cards.length);
                }, player, cards);
                event.switchToAuto = function () {
                    var cards = guanXing.cards[0].concat();
                    var cheats = [];
                    var judges = player.node.judges.childNodes;
                    
                    if (judges.length) {
                        cheats = decadeUI.get.cheatJudgeCards(cards, judges, true);
                    }
                    
                    if (cards.length && cheats.length == judges.length) {
                        for (var i = 0; i >= 0 && i < cards.length; i++) {
                            if (get.value(cards[i], player) >= 5) {
                                cheats.push(cards[i]);
                                cards.splice(i, 1);
                            }
                        }
                    }
                    var time = 500;
                    for (var i = 0; i < cheats.length; i++) {
                        setTimeout(function (card, index, finished) {
                            guanXing.move(card, index, 0);
                            if (finished) guanXing.finishTime(1000);
                        }, time, cheats[i], i, (i >= cheats.length - 1) && cards.length == 0);
                        time += 500;
                    }
                    for (var i = 0; i < cards.length; i++) {
                        setTimeout(function (card, index, finished) {
                            guanXing.move(card, index, 1);
                            if (finished) guanXing.finishTime(1000);
                        }, time, cards[i], i, (i >= cards.length - 1));
                        time += 500;
                    }
                };
                if (event.isOnline()) {
                    event.player.send(function () {
                        if (!window.decadeUI && decadeUI.eventDialog) _status.event.finish();
                    }, event.player);
                    
                    event.player.wait();
                    decadeUI.game.wait();
                } else if (!event.isMine()) {
                    event.switchToAuto();
                }
                'step 2';
                player.popup(get.cnNumber(event.num1) + '上' + get.cnNumber(event.num2) + '下');
                game.log(player, '将' + get.cnNumber(event.num1) + '张牌置于牌堆顶，' + get.cnNumber(event.num2) + '张牌置于牌堆底');
                game.updateRoundNumber();
			},
			ai:{
				effect:{
					target:function(card,player,target){
						if(!get.tag(card,'damage')) return;
						var num=0,bool=false;
						for(var i=0;i<ui.cardPile.childNodes.length;i++){
							var card=ui.cardPile.childNodes[i];
							if(get.number(card)==7){
								num++;
								if(num>=target.hp){
									bool=true;
									break;
								}
							}
						}
						if(bool) return 0.2;
					}
				},
				threaten:0.6,
			},
			group:'dcjincui_advent',
			subSkill:{
				advent:{
					audio:'dcjincui',
					trigger:{global:'phaseBefore',player:'enterGame'},
					filter:function(event,player){
						return (event.name!='phase'||game.phaseNumber==0)&&player.countCards('h')<7;
					},
					forced:true,
					content:function(){
						player.drawTo(7);
					},
				},
			},
		},
        guanxing: {
            audio: 2,
            audioname: ['jiangwei', 're_jiangwei', 're_zhugeliang', 'ol_jiangwei'],
            trigger: {
                player: 'phaseZhunbeiBegin'
            },
            frequent: true,
            content: function () {
                'step 0';
                if (player.isUnderControl()) {
                    game.modeSwapPlayer(player);
                }
                
                var num = Math.min(5, game.countPlayer());
                if (player.hasSkill('yizhi') && player.hasSkill('guanxing')) {
                    num = 5;
                }
                var player = event.player;
                if (player.isUnderControl()) game.modeSwapPlayer(player);
                
                var cards = get.cards(num);
                var guanXing = decadeUI.content.chooseGuanXing(player, cards, cards.length, null, cards.length);
                game.broadcast(function (player, cards) {
                    if (!window.decadeUI) return;
                    decadeUI.content.chooseGuanXing(player, cards, cards.length, null, cards.length);
                }, player, cards);
                
                event.switchToAuto = function () {
                    var cards = guanXing.cards[0].concat();
                    var cheats = [];
                    var judges = player.node.judges.childNodes;
                    
                    if (judges.length) {
                        cheats = decadeUI.get.cheatJudgeCards(cards, judges, true);
                    }
                    
                    if (cards.length && cheats.length == judges.length) {
                        for (var i = 0; i >= 0 && i < cards.length; i++) {
                            if (get.value(cards[i], player) >= 5) {
                                cheats.push(cards[i]);
                                cards.splice(i, 1);
                            }
                        }
                    }
                    
                    var time = 500;
                    for (var i = 0; i < cheats.length; i++) {
                        setTimeout(function (card, index, finished) {
                            guanXing.move(card, index, 0);
                            if (finished) guanXing.finishTime(1000);
                        }, time, cheats[i], i, (i >= cheats.length - 1) && cards.length == 0);
                        time += 500;
                    }
                    
                    for (var i = 0; i < cards.length; i++) {
                        setTimeout(function (card, index, finished) {
                            guanXing.move(card, index, 1);
                            if (finished) guanXing.finishTime(1000);
                        }, time, cards[i], i, (i >= cards.length - 1));
                        time += 500;
                    }
                };
                
                if (event.isOnline()) {
                    event.player.send(function () {
                        if (!window.decadeUI && decadeUI.eventDialog) _status.event.finish();
                    }, event.player);
                    
                    event.player.wait();
                    decadeUI.game.wait();
                } else if (!event.isMine()) {
                    event.switchToAuto();
                }
                'step 1';
                player.popup(get.cnNumber(event.num1) + '上' + get.cnNumber(event.num2) + '下');
                game.log(player, '将' + get.cnNumber(event.num1) + '张牌置于牌堆顶，' + get.cnNumber(event.num2) + '张牌置于牌堆底');
                game.updateRoundNumber();
            },
            ai: {
                threaten: 1.2
            }
        },
        reguanxing: {
            audio: 'guanxing',
            audioname: ['jiangwei', 're_jiangwei', 're_zhugeliang', 'gexuan', 'ol_jiangwei'],
            frequent: true,
            trigger: {
                player: ['phaseZhunbeiBegin', 'phaseJieshuBegin']
            },
            filter: function (event, player, name) {
                if (name == 'phaseJieshuBegin') {
                    return player.hasSkill('reguanxing_on');
                }
                return true;
            },
            content: function () {
                'step 0';
                var player = event.player;
                if (player.isUnderControl()) game.modeSwapPlayer(player);
                
                var cards = get.cards(game.countPlayer() < 4 ? 3 : 5);
                var guanXing = decadeUI.content.chooseGuanXing(player, cards, cards.length, null, cards.length);
                game.broadcast(function (player, cards) {
                    if (!window.decadeUI) return;
                    decadeUI.content.chooseGuanXing(player, cards, cards.length, null, cards.length);
                }, player, cards);
                
                event.switchToAuto = function () {
                    var cheats = [];
                    var cards = guanXing.cards[0].concat();
                    var judges;
                    
                    var next = player.getNext();
                    var friend = player;
                    if (event.triggername == 'phaseJieshuBegin') {
                        friend = next;
                        judges = friend.node.judges.childNodes;
                        if (get.attitude(player, friend) < 0) friend = null;
                    } else {
                        judges = player.node.judges.childNodes;
                    }
                    
                    if (judges.length) {
                        cheats = decadeUI.get.cheatJudgeCards(cards, judges, friend != null);
                    }
                    
                    if (cards.length && cheats.length == judges.length) {
                        for (var i = 0; i >= 0 && i < cards.length; i++) {
                            if (friend) {
                                if (get.value(cards[i], friend) >= 5) {
                                    cheats.push(cards[i]);
                                    cards.splice(i, 1);
                                }
                            } else {
                                if (get.value(cards[i], next) < 4) {
                                    cheats.push(cards[i]);
                                    cards.splice(i, 1);
                                }
                            }
                        }
                    }
                    
                    var time = 500;
                    for (var i = 0; i < cheats.length; i++) {
                        setTimeout(function (card, index, finished) {
                            guanXing.move(card, index, 0);
                            if (finished) guanXing.finishTime(1000);
                        }, time, cheats[i], i, (i >= cheats.length - 1) && cards.length == 0);
                        time += 500;
                    }
                    
                    for (var i = 0; i < cards.length; i++) {
                        setTimeout(function (card, index, finished) {
                            guanXing.move(card, index, 1);
                            if (finished) guanXing.finishTime(1000);
                        }, time, cards[i], i, (i >= cards.length - 1));
                        time += 500;
                    }
                };
                
                if (event.isOnline()) {
                    // 判断其他玩家是否有UIPro，否则直接给他结束，不知道有没有效果
                    event.player.send(function () {
                        if (!window.decadeUI && decadeUI.eventDialog) _status.event.finish();
                    }, event.player);
                    
                    // 等待其他玩家操作
                    event.player.wait();
                    // 暂停主机端游戏
                    decadeUI.game.wait();
                } else if (!event.isMine()) {
                    event.switchToAuto();
                    /*
                    注释说明
                    var guanXing = decadeUI.content.chooseGuanXing(
                        控制观星的玩家,            	  	// 必选
                        [顶部初始化的牌],            	// 必选，可为null，但底部不能为null
                        顶部允许控制的牌数范围,        	// 可选，不填根据初始化的牌数量
                        [底部初始化的牌],            	// 必选，可为null，但顶部不能为null
                        底部允许控制的牌数范围,        	// 可选，不填根据初始化的牌数量
                        第一个参数的玩家是否可见);      	// 可选，不设置则根据控制观星的玩家来显示
                    
                    // undefined 均为可设置，其他为只读或调用
                    var properties = {
                        caption: undefined,        	// 设置标题
                        header1: undefined,			// 牌堆顶的文字
                        header2: undefined,			// 牌堆底的文字
                        cards: [[],[]],            	// 获取当前观星的牌，不要瞎改
                        callback: undefined,    	// 回调函数，返回 true 表示可以点击【确认】按钮，例：guanXing.callback = function(){ return guanXing.cards[1].length == 1; }
                                                    // 注意：此值一旦设置，观星finish后不会自己置顶牌堆顶和牌堆底，需要自行实现
                        infohide: undefined,    	// 设置上面第1个参数的玩家是否可见观星的牌
                        confirmed: undefined,		// 是否按下确认按钮
                        doubleSwitch: undefined,	// 双击切换牌
                        finishTime:function(time),	// 指定的毫秒数后完成观星
                        finish:function(),        	// 观星完成，在下一个step 中，可以通过 event.cards1 与 event.cards2 访问观星后的牌
                        swap:function(s, t),    	// 交换观星中的两个牌
                        switch:function(card),   	// 将观星中的牌切换到另一方
                        move:function(card, index, moveDown)	// 移动观星的牌到指定的一方位置
                    }
                    */
                }
                'step 1';
                if (event.triggername == 'phaseZhunbeiBegin' && event.num1 == 0) player.addTempSkill('reguanxing_on');
                player.popup(get.cnNumber(event.num1) + '上' + get.cnNumber(event.num2) + '下');
                game.log(player, '将' + get.cnNumber(event.num1) + '张牌置于牌堆顶，' + get.cnNumber(event.num2) + '张牌置于牌堆底');
                game.updateRoundNumber();
            },
            subSkill: {
                on: {}
            }
        },
        xinfu_zuilun: {
            audio: 2,
            trigger: {
                player: 'phaseJieshuBegin'
            },
            check: function (event, player) {
                var num = 0;
                if (player.getHistory('lose', function (evt) {
                    return evt.type == 'discard';
                }).length) num++;
                if (!player.isMinHandcard()) num++;
                if (!player.getStat('damage')) num++;
                if (num == 3) return player.hp >= 2;
                return true;
            },
            prompt: function (event, player) {
                var num = 3;
                if (player.getHistory('lose', function (evt) {
                    return evt.type == 'discard';
                }).length) num--;
                if (!player.isMinHandcard()) num--;
                if (!player.getStat('damage')) num--;
                return get.prompt('xinfu_zuilun') + '（可获得' + get.cnNumber(num) + '张牌）';
            },
            content: function () {
                'step 0';
                event.num = 0;
                event.cards = get.cards(3);
                if (player.getHistory('lose', function (evt) {
                    return evt.type == 'discard';
                }).length) event.num++;
                if (!player.isMinHandcard()) event.num++;
                if (!player.getStat('damage')) event.num++;
                'step 1';
                if (event.num == 0) {
                    player.gain(event.cards, 'draw');
                    event.finish();
                    return;
                }
                
                var cards = event.cards;
                var gains = cards.length - event.num;
                
                var zuiLun = decadeUI.content.chooseGuanXing(player, cards, cards.length, null, gains);
                zuiLun.caption = '【罪论】';
                zuiLun.header2 = '获得的牌';
                zuiLun.tip = '可获得' + gains + '张牌<br>' + zuiLun.tip;
                zuiLun.callback = function () {
                    return this.cards[1].length == gains;
                };
                
                game.broadcast(function (player, cards, gains, callback) {
                    if (!window.decadeUI) return;
                    var zuiLun = decadeUI.content.chooseGuanXing(player, cards, cards.length, null, gains);
                    zuiLun.caption = '【罪论】';
                    zuiLun.header2 = '获得的牌';
                    zuiLun.tip = '可获得' + gains + '张牌<br>' + zuiLun.tip;
                    zuiLun.callback = callback;
                }, player, cards, gains, zuiLun.callback);
                
                var player = event.player;
                event.switchToAuto = function () {
                    var cheats = [];
                    var cards = zuiLun.cards[0].concat();
                    var stopped = false;
                    
                    var next = player.getNext();
                    var hasFriend = get.attitude(player, next) > 0;
                    
                    // 判断下家是不是队友，令其生效或者失效
                    var judges = next.node.judges.childNodes;
                    if (judges.length > 0) cheats = decadeUI.get.cheatJudgeCards(cards, judges, hasFriend);
                    
                    // 如果有【父荫】优先把好牌给队友
                    if (hasFriend && player.hasSkill('xinfu_fuyin')) {
                        cards = decadeUI.get.bestValueCards(cards, next);
                    } else {
                        cards.sort(function (a, b) {
                            return get.value(a, player) - get.value(b, player);
                        });
                    }
                    
                    cards = cheats.concat(cards);
                    var time = 500;
                    var gainNum = gains;
                    for (var i = cards.length - 1; i >= 0; i--) {
                        setTimeout(function (card, index, finished, moveDown) {
                            zuiLun.move(card, index, moveDown ? 1 : 0);
                            if (finished) zuiLun.finishTime(1000);
                        }, time, cards[i], i, i == 0, gainNum > 0);
                        time += 500;
                        gainNum--;
                    }
                };
                
                if (event.isOnline()) {
                    event.player.send(function () {
                        if (!window.decadeUI && decadeUI.eventDialog) _status.event.finish();
                    }, event.player);
                    
                    event.player.wait();
                    decadeUI.game.wait();
                } else if (!event.isMine()) {
                    event.switchToAuto();
                }
                'step 2';
                event.cards = event.cards2;
                if (event.result && event.result.bool) {
                    var cards = event.cards1;
                    var first = ui.cardPile.firstChild;
                    for (var i = 0; i < cards.length; i++) {
                        ui.cardPile.insertBefore(cards[i], first);
                    }
                }
                'step 3';
                game.updateRoundNumber();
                if (event.cards.length) {
                    player.gain(event.cards, 'draw');
                    event.finish();
                } else {
                    player.chooseTarget('请选择一名角色，与其一同失去1点体力', true, function (card, player, target) {
                        return target != player;
                    }).ai = function (target) {
                        return -get.attitude(_status.event.player, target);
                    };
                }
                'step 4';
                player.line(result.targets[0], 'fire');
                player.loseHp();
                result.targets[0].loseHp();
            }
        },
        xunxun: {
            audio: 2,
            trigger: {
                player: 'phaseDrawBegin1'
            },
            content: function () {
                'step 0';
                var cards = get.cards(4);
                var player = event.player;
                var xunxun = decadeUI.content.chooseGuanXing(player, cards, cards.length, null, 2);
                xunxun.caption = '【恂恂】';
                xunxun.header1 = '牌堆底';
                xunxun.header2 = '牌堆顶';
                xunxun.callback = function () {
                    return this.cards[0].length == 2 && this.cards[1].length == 2;
                };
                
                game.broadcast(function (player, cards, callback) {
                    if (!window.decadeUI) return;
                    var xunxun = decadeUI.content.chooseGuanXing(player, cards, cards.length, null, 2);
                    xunxun.caption = '【恂恂】';
                    xunxun.header1 = '牌堆底';
                    xunxun.header2 = '牌堆顶';
                    xunxun.callback = callback;
                }, player, cards, xunxun.callback);
                
                event.switchToAuto = function () {
                    var cards = decadeUI.get.bestValueCards(xunxun.cards[0].concat(), player);
                    var time = 500;
                    for (var i = 0; i < 2; i++) {
                        setTimeout(function (card, index, finished) {
                            xunxun.move(card, index, 1);
                            if (finished) xunxun.finishTime(1000);
                        }, time, cards[i], i, i >= 1);
                        time += 500;
                    }
                };
                
                if (event.isOnline()) {
                    event.player.send(function () {
                        if (!window.decadeUI && decadeUI.eventDialog) _status.event.finish();
                    }, event.player);
                    
                    event.player.wait();
                    decadeUI.game.wait();
                } else if (!event.isMine()) {
                    event.switchToAuto();
                }
                
                'step 1';
                var first = ui.cardPile.firstChild;
                var cards = event.cards2;
                for (var i = 0; i < cards.length; i++) {
                    ui.cardPile.insertBefore(cards[i], first);
                }
                
                cards = event.cards1;
                for (var i = 0; i < cards.length; i++) {
                    ui.cardPile.appendChild(cards[i]);
                }
            }
            
        },

        xinfu_dianhua: {
            audio: 2,
            frequent: true,
            trigger: {
                player: ["phaseZhunbeiBegin", "phaseJieshuBegin"]
            },
            filter: function (event, player) {
                for (var i = 0; i < lib.suit.length; i++) {
                    if (player.hasMark('xinfu_falu_' + lib.suit[i])) return true;
                }
                return false;
            },
            content: function () {
                'step 0';
                var num = 0;
                var player = event.player;
                for (var i = 0; i < lib.suit.length; i++) {
                    if (player.hasMark('xinfu_falu_' + lib.suit[i])) num++;
                }
                
                var cards = get.cards(num);
                var dialog = decadeUI.content.chooseGuanXing(player, cards, cards.length, null, cards.length);
                dialog.caption = '【点化】';
                game.broadcast(function (player, cards) {
                    if (!window.decadeUI) return;
                    decadeUI.content.chooseGuanXing(player, cards, cards.length, null, cards.length).caption = '【点化】';
                }, player, cards);
                
                event.switchToAuto = function () {
                    var cheats = [];
                    var cards = dialog.cards[0].concat();
                    var judges;
                    
                    var next = player.getNext();
                    var friend = player;
                    if (event.triggername == 'phaseJieshuBegin') {
                        friend = next;
                        judges = friend.node.judges.childNodes;
                        if (get.attitude(player, friend) < 0) friend = null;
                    } else {
                        judges = player.node.judges.childNodes;
                    }
                    
                    if (judges.length) {
                        cheats = decadeUI.get.cheatJudgeCards(cards, judges, friend != null);
                    }
                    
                    if (cards.length && cheats.length == judges.length) {
                        for (var i = 0; i >= 0 && i < cards.length; i++) {
                            if (friend) {
                                if (get.value(cards[i], friend) >= 5) {
                                    cheats.push(cards[i]);
                                    cards.splice(i, 1);
                                }
                            } else {
                                if (get.value(cards[i], next) < 4) {
                                    cheats.push(cards[i]);
                                    cards.splice(i, 1);
                                }
                            }
                        }
                    }
                    
                    var time = 500;
                    for (var i = 0; i < cheats.length; i++) {
                        setTimeout(function (card, index, finished) {
                            dialog.move(card, index, 0);
                            if (finished) dialog.finishTime(1000);
                        }, time, cheats[i], i, (i >= cheats.length - 1) && cards.length == 0);
                        time += 500;
                    }
                    
                    for (var i = 0; i < cards.length; i++) {
                        setTimeout(function (card, index, finished) {
                            dialog.move(card, index, 1);
                            if (finished) dialog.finishTime(1000);
                        }, time, cards[i], i, (i >= cards.length - 1));
                        time += 500;
                    }
                };
                // var dianhua = decadeUI.content.chooseGuanXing(player, cards, cards.length);
                // dianhua.caption = '【点化】';
                // game.broadcast(function(player, cards, callback){
                // if (!window.decadeUI) return;
                // var dianhua = decadeUI.content.chooseGuanXing(player, cards, cards.length);
                // dianhua.caption = '【点化】';
                // dianhua.callback = callback;
                // }, player, cards, dianhua.callback);
                
                // event.switchToAuto = function(){
                // var cards = dianhua.cards[0].concat();
                // var cheats = [];
                // var judges;
                
                // var next = player.getNext();
                // var friend = player;
                // if (event.triggername == 'phaseJieshuBegin') {
                // friend = next;
                // judges = friend.node.judges.childNodes;
                // if (get.attitude(player, friend) < 0) friend = null;
                // } else {
                // judges = player.node.judges.childNodes;
                // }
                
                // if (judges.length > 0) cheats = decadeUI.get.cheatJudgeCards(cards, judges, friend != null);
                
                // if (friend) {
                // cards = decadeUI.get.bestValueCards(cards, friend);
                // } else {
                // cards.sort(function(a, b){
                // return get.value(a, next) - get.value(b, next);
                // });
                // }
                
                // cards = cheats.concat(cards);
                // var time = 500;
                // for (var i = 0; i < cards.length; i++) {
                // setTimeout(function(card, index, finished){
                // dianhua.move(card, index, 0);
                // if (finished) dianhua.finishTime(1000);
                // }, time, cards[i], i, i >= cards.length - 1);
                // time += 500;
                // }
                // }
                
                if (event.isOnline()) {
                    event.player.send(function () {
                        if (!window.decadeUI && decadeUI.eventDialog) _status.event.finish();
                    }, event.player);
                    
                    event.player.wait();
                    decadeUI.game.wait();
                } else if (!event.isMine()) {
                    event.switchToAuto();
                }
                
                'step 1';
                player.popup(get.cnNumber(event.num1) + '上' + get.cnNumber(event.num2) + '下');
                game.log(player, '将' + get.cnNumber(event.num1) + '张牌置于牌堆顶，' + get.cnNumber(event.num2) + '张牌置于牌堆底');
                game.updateRoundNumber();
            }
            
        },
        zongxuan: {
            audio: 2,
            frequent: false,
            trigger: {
                player: 'loseAfter'
            },
            check: function (event) {
                var cards = [];
                for (var i = 0; i < event.cards2.length; i++) {
                    if (get.position(event.cards2[i]) == 'd') {
                        cards.push(event.cards2[i]);
                    }
                }
                
                var player = event.player;
                
                if (_status.currentPhase == player) {
                    for (var i = 0; i < cards.length; i++) {
                        if (get.value(cards[i], event.player) > 4) return true;
                    }
                } else if (_status.currentPhase) {
                    var next = _status.currentPhase.getNext();
                    var judges = next.node.judges.childNodes;
                    if (get.attitude(player, next) > 0) {
                        if (judges.length > 0) {
                            for (var j = 0; j < judges.length; j++) {
                                var judge = get.judge(judges[j]);
                                for (var i = 0; i < cards.length; i++) {
                                    if (judge(cards[i]) >= 0) return true;
                                }
                            }
                        } else {
                            for (var i = 0; i < cards.length; i++) if (get.value(cards[i], next) > 4) return true;
                        }
                    } else {
                        if (judges.length > 0) {
                            for (var j = 0; j < judges.length; j++) {
                                var judge = get.judge(judges[j]);
                                for (var i = 0; i < cards.length; i++) {
                                    if (judge(cards[i]) < 0) return true;
                                }
                            }
                        } else {
                            for (var i = 0; i < cards.length; i++) if (get.value(cards[i], next) < 4) return true;
                        }
                        
                    }
                }
                
                return false;
            },
            filter: function (event, player) {
                if (event.type != 'discard') return false;
                for (var i = 0; i < event.cards2.length; i++) {
                    if (get.position(event.cards2[i]) == 'd') {
                        return true;
                    }
                }
                return false;
            },
            content: function () {
                'step 0';
                var cards = [];
                for (var i = 0; i < trigger.cards2.length; i++) {
                    var card = trigger.cards2[i];
                    if (get.position(card, true) == 'd') {
                        cards.push(card);
                        clearTimeout(card.timeout);
                        card.classList.remove('removing');
                        // 防止因为限制结算速度，而导致牌提前进入弃牌堆
                    }
                }
                
                if (!cards.length) return;
                var dialog = decadeUI.content.chooseGuanXing(player, cards, cards.length, null, cards.length);
                dialog.caption = '【纵玄】';
                dialog.header1 = '弃牌堆';
                dialog.header2 = '牌堆顶';
                dialog.lockCardsOrder(0);
                dialog.callback = function () {
                    return this.cards[1].length > 0;
                };
                game.broadcast(function (player, cards, callback) {
                    if (!window.decadeUI) return;
                    var zongxuan = decadeUI.content.chooseGuanXing(player, cards, cards.length);
                    dialog.caption = '【纵玄】';
                    dialog.header1 = '弃牌堆';
                    dialog.header2 = '牌堆顶';
                    dialog.lockCardsOrder(0);
                    dialog.callback = callback;
                }, player, cards, dialog.callback);
                
                event.switchToAuto = function () {
                    var parent = event.parent;
                    while (parent != null && parent.name != 'phaseDiscard') parent = parent.parent;
                    
                    var cards = dialog.cards[0].concat();
                    var cheats = [];
                    var next = player.getNext();
                    var hasFriend = get.attitude(player, next) > 0;
                    
                    if (parent) {
                        var hasZhiYan = player.hasSkill('zhiyan');	//如果有【直言】，AI 1000%肯定会用这个技能
                        var judges = next.node.judges.childNodes;
                        if (judges > 0 && hasZhiYan && cards.length > 1) {
                            cheats = decadeUI.get.cheatJudgeCards(cards, judges, hasFriend);
                        }
                    }
                    
                    if (cards.length > 0) {
                        cards.sort(function (a, b) {
                            return get.value(b, player) - get.value(a, player);
                        });
                        cheats.splice(0, 0, cards.shift());
                        
                        var cost;
                        for (var i = 0; i < cards.length; i++) {
                            if (hasFriend) {
                                if (get.value(cards[i], next) >= 5) cheats.push(cards[i]);
                            } else {
                                if (get.value(cards[i], next) < 5) cheats.push(cards[i]);
                            }
                        }
                    }
                    
                    var time = 500;
                    for (var i = 0; i < cheats.length; i++) {
                        setTimeout(function (card, index, finished) {
                            dialog.move(card, index, 1);
                            if (finished) dialog.finishTime(cards.length <= 1 ? 250 : 1000);
                            ;
                        }, time, cheats[i], i, (i >= cheats.length - 1));
                        time += 500;
                    }
                };
                
                if (event.isOnline()) {
                    event.player.send(function () {
                        if (!window.decadeUI && decadeUI.eventDialog) _status.event.finish();
                    }, event.player);
                    
                    event.player.wait();
                    decadeUI.game.wait();
                } else if (!event.isMine()) {
                    event.switchToAuto();
                }
                
                'step 1';
                var first = ui.cardPile.firstChild;
                var cards = event.cards2;
                for (var i = 0; i < cards.length; i++) {
                    ui.cardPile.insertBefore(cards[i], first);
                }
                
                cards = event.cards1;
                for (var i = 0; i < cards.length; i++) {
                    ui.discardPile.appendChild(cards[i]);
                }
                
                game.log(player, '将' + get.cnNumber(event.num2) + '张牌置于牌堆顶');
            }
        },
        identity_junshi: {
            name: '军师',
            mark: true,
            silent: true,
            intro: {content: '准备阶段开始时，可以观看牌堆顶的三张牌，然后将这些牌以任意顺序置于牌堆顶或牌堆底'},
            trigger: {
                player: 'phaseBegin'
            },
            content: function () {
                "step 0";
                if (player.isUnderControl()) {
                    game.modeSwapPlayer(player);
                }
                var num = 3;
                var cards = get.cards(num);
                var guanxing = decadeUI.content.chooseGuanXing(player, cards, cards.length, null, cards.length);
                guanxing.caption = '【军师】';
                game.broadcast(function (player, cards, callback) {
                    if (!window.decadeUI) return;
                    var guanxing = decadeUI.content.chooseGuanXing(player, cards, cards.length, null, cards.length);
                    guanxing.caption = '【军师】';
                    guanxing.callback = callback;
                }, player, cards, guanxing.callback);
                
                event.switchToAuto = function () {
                    var cards = guanxing.cards[0].concat();
                    var cheats = [];
                    var judges = player.node.judges.childNodes;
                    
                    if (judges.length) cheats = decadeUI.get.cheatJudgeCards(cards, judges, true);
                    if (cards.length) {
                        for (var i = 0; i >= 0 && i < cards.length; i++) {
                            if (get.value(cards[i], player) >= 5) {
                                cheats.push(cards[i]);
                                cards.splice(i, 1);
                            }
                        }
                    }
                    
                    var time = 500;
                    for (var i = 0; i < cheats.length; i++) {
                        setTimeout(function (card, index, finished) {
                            guanxing.move(card, index, 0);
                            if (finished) guanxing.finishTime(1000);
                        }, time, cheats[i], i, (i >= cheats.length - 1) && cards.length == 0);
                        time += 500;
                    }
                    
                    for (var i = 0; i < cards.length; i++) {
                        setTimeout(function (card, index, finished) {
                            guanxing.move(card, index, 1);
                            if (finished) guanxing.finishTime(1000);
                        }, time, cards[i], i, (i >= cards.length - 1));
                        time += 500;
                    }
                };
                
                if (event.isOnline()) {
                    event.player.send(function () {
                        if (!window.decadeUI && decadeUI.eventDialog) _status.event.finish();
                    }, event.player);
                    
                    event.player.wait();
                    decadeUI.game.wait();
                } else if (!event.isMine()) {
                    event.switchToAuto();
                }
                "step 1";
                player.popup(get.cnNumber(event.num1) + '上' + get.cnNumber(event.num2) + '下');
                game.log(player, '将' + get.cnNumber(event.num1) + '张牌置于牌堆顶，' + get.cnNumber(event.num2) + '张牌置于牌堆底');
                game.updateRoundNumber();
            }
        },
        wuxin: {
            audio: 2,
            trigger: {
                player: 'phaseDrawBegin1'
            },
            content: function () {
                var num = get.population('qun');
                if (player.hasSkill('huangjintianbingfu')) {
                    num += player.getExpansions('huangjintianbingfu').length;
                }
                
                var cards = get.cards(num);
                var dialog = decadeUI.content.chooseGuanXing(player, cards, cards.length);
                dialog.caption = '【悟心】';
                game.broadcast(function (player, cards, callback) {
                    if (!window.decadeUI) return;
                    var dialog = decadeUI.content.chooseGuanXing(player, cards, cards.length);
                    dialog.caption = '【悟心】';
                    dialog.callback = callback;
                }, player, cards, dialog.callback);
                
                event.switchToAuto = function () {
                    var cards = dialog.cards[0].concat();
                    var cheats = [];
                    
                    var next = player.getNext();
                    var friend = player;
                    var judges = friend.node.judges.childNodes;
                    if (judges.length > 0) cheats = decadeUI.get.cheatJudgeCards(cards, judges, friend != null);
                    
                    if (friend) {
                        cards = decadeUI.get.bestValueCards(cards, friend);
                    } else {
                        cards.sort(function (a, b) {
                            return get.value(a, next) - get.value(b, next);
                        });
                    }
                    
                    cards = cheats.concat(cards);
                    var time = 500;
                    for (var i = 0; i < cards.length; i++) {
                        setTimeout(function (card, index, finished) {
                            dialog.move(card, index, 0);
                            if (finished) dialog.finishTime(cards.length <= 1 ? 250 : 1000);
                            ;
                        }, time, cards[i], i, i >= cards.length - 1);
                        time += 500;
                    }
                };
                
                if (event.isOnline()) {
                    event.player.send(function () {
                        if (!window.decadeUI && decadeUI.eventDialog) _status.event.finish();
                    }, event.player);
                    
                    event.player.wait();
                    decadeUI.game.wait();
                } else if (!event.isMine()) {
                    event.switchToAuto();
                }
            }
        },
        luoying: {
            group: ['luoying_discard', 'luoying_judge'],
            subfrequent: ['judge'],
            subSkill: {
                discard: {
                    audio: 2,
                    trigger: {
                        global: 'loseAfter'
                    },
                    filter: function (event, player) {
                        if (event.type != 'discard') return false;
                        if (event.player == player) return false;
                        for (var i = 0; i < event.cards2.length; i++) {
                            if (get.suit(event.cards2[i], event.player) == 'club' && get.position(event.cards2[i], true) == 'd') {
                                return true;
                            }
                        }
                        return false;
                    },
                    // direct: true,
                    content: function () {
                        "step 0";
                        if (trigger.delay == false) game.delay();
                        "step 1";
                        var cards = [];
                        for (var i = 0; i < trigger.cards2.length; i++) {
                            var card = trigger.cards2[i];
                            if (get.suit(card, trigger.player) == 'club' && get.position(card, true) == 'd') {
                                cards.push(card);
                                clearTimeout(card.timeout);
                                card.classList.remove('removing');
                                // 防止因为限制结算速度，而导致牌提前进入弃牌堆
                            }
                        }
                        
                        var dialog = decadeUI.content.chooseGuanXing(player, cards, cards.length, null, cards.length, false);
                        dialog.caption = '【落英】';
                        dialog.header1 = '弃牌堆';
                        dialog.header2 = '获得牌';
                        dialog.tip = '请选择要获得的牌';
                        dialog.lockCardsOrder(0);
                        dialog.cards[1] = dialog.cards[0];
                        dialog.cards[0] = [];
                        dialog.update();
                        dialog.onMoved();
                        dialog.callback = function () {
                            return true;
                        };
                        game.broadcast(function (player, cards, callback) {
                            if (!window.decadeUI) return;
                            var dialog = decadeUI.content.chooseGuanXing(player, cards, cards.length, null, cards.length, false);
                            dialog.caption = '【落英】';
                            dialog.header1 = '弃牌堆';
                            dialog.header2 = '获得牌';
                            dialog.tip = '请选择要获得的牌';
                            dialog.lockCardsOrder(0);
                            dialog.cards[1] = dialog.cards[0];
                            dialog.cards[0] = [];
                            dialog.update();
                            dialog.onMoved();
                            dialog.callback = callback;
                        }, player, cards, dialog.callback);
                        
                        event.switchToAuto = function () {
                            var cards = dialog.cards[1].concat();
                            var time = 500;
                            
                            if (cards.length) {
                                var discards = [];
                                for (var i = 0; i < cards.length; i++) {
                                    if (get.value(cards[i]) < 0) {
                                        discards.push(cards[i]);
                                    }
                                }
                                
                                if (discards.length) {
                                    for (var i = 0; i < discards.length; i++) {
                                        setTimeout(function (card, index, finished) {
                                            dialog.move(card, index, 0);
                                            if (finished) dialog.finishTime(1000);
                                        }, time, discards[i], i, i >= discards.length - 1);
                                        time += 500;
                                    }
                                } else {
                                    dialog.finishTime(1000);
                                }
                                
                            } else {
                                dialog.finishTime(1000);
                            }
                        };
                        
                        if (event.isOnline()) {
                            event.player.send(function () {
                                if (!window.decadeUI && decadeUI.eventDialog) _status.event.finish();
                            }, event.player);
                            
                            event.player.wait();
                            decadeUI.game.wait();
                        } else if (!event.isMine()) {
                            event.switchToAuto();
                        }
                        "step 2";
                        game.cardsDiscard(event.cards1);
                        if (event.cards2) {
                            // player.logSkill(event.name);
                            player.gain(event.cards2, 'gain2', 'log');
                        }
                    }
                },
                judge: {
                    audio: 2,
                    trigger: {
                        global: 'cardsDiscardAfter'
                    },
                    // direct: true,
                    check: function (event, player) {
                        return event.cards[0].name != 'du';
                    },
                    filter: function (event, player) {
                        var evt = event.getParent().relatedEvent;
                        if (!evt || evt.name != 'judge') return;
                        if (evt.player == player) return false;
                        if (get.position(event.cards[0], true) != 'd') return false;
                        return (get.suit(event.cards[0]) == 'club');
                    },
                    content: function () {
                        "step 0";
                        var cards = trigger.cards;
                        
                        var dialog = decadeUI.content.chooseGuanXing(player, cards, cards.length, null, cards.length, false);
                        dialog.caption = '【落英】';
                        dialog.header1 = '弃牌堆';
                        dialog.header2 = '获得牌';
                        dialog.tip = '请选择要获得的牌';
                        dialog.lockCardsOrder(0);
                        dialog.callback = function () {
                            return true;
                        };
                        game.broadcast(function (player, cards, callback) {
                            if (!window.decadeUI) return;
                            var dialog = decadeUI.content.chooseGuanXing(player, cards, cards.length, null, cards.length, false);
                            dialog.caption = '【落英】';
                            dialog.header1 = '弃牌堆';
                            dialog.header2 = '获得牌';
                            dialog.tip = '请选择要获得的牌';
                            dialog.lockCardsOrder(0);
                            dialog.callback = callback;
                        }, player, cards, dialog.callback);
                        
                        event.switchToAuto = function () {
                            var cards = dialog.cards[0].concat();
                            var time = 500;
                            for (var i = 0; i < cards.length; i++) {
                                if (get.value(cards[i], player) < 0) continue;
                                setTimeout(function (card, index, finished) {
                                    dialog.move(card, index, 1);
                                    if (finished) dialog.finishTime(cards.length <= 1 ? 250 : 1000);
                                    ;
                                }, time, cards[i], i, i >= cards.length - 1);
                                time += 500;
                            }
                        };
                        
                        if (event.isOnline()) {
                            event.player.send(function () {
                                if (!window.decadeUI && decadeUI.eventDialog) _status.event.finish();
                            }, event.player);
                            
                            event.player.wait();
                            decadeUI.game.wait();
                        } else if (!event.isMine()) {
                            event.switchToAuto();
                        }
                        "step 1";
                        game.cardsDiscard(event.cards1);
                        if (event.cards2) {
                            // player.logSkill(event.name);
                            player.gain(event.cards2, 'gain2', 'log');
                        }
                    }
                }
            }
        }
    };
    
    decadeUI.inheritSkill = {
        xz_xunxun: {
            audio: 2,
            trigger: {
                player: 'phaseDrawBegin1'
            },
            filter: function (event, player) {
                var num = game.countPlayer(function (current) {
                    return current.isDamaged();
                });
                return num >= 1 && !player.hasSkill('xunxun');
            },
            content: decadeUI.skill.xunxun.content
        },
        reluoying: {
            subSkill: {
                discard: {
                    audio: 'reluoying',
                    trigger: {
                        global: 'loseAfter'
                    },
                    filter: decadeUI.skill.luoying.subSkill.discard.filter,
                    // direct: true,
                    content: decadeUI.skill.luoying.subSkill.discard.content
                },
                judge: {
                    audio: 'reluoying',
                    trigger: {
                        global: 'cardsDiscardAfter'
                    },
                    // direct: true,
                    check: decadeUI.skill.luoying.subSkill.judge.check,
                    filter: decadeUI.skill.luoying.subSkill.judge.filter,
                    content: decadeUI.skill.luoying.subSkill.judge.content
                }
            }
        },
        nk_shekong: {
            content: function () {
                'step 0';
                event.cardsx = cards.slice(0);
                var num = get.cnNumber(cards.length);
                var trans = get.translation(player);
                var prompt = ('弃置' + num + '张牌，然后' + trans + '摸一张牌');
                if (cards.length > 1) prompt += ('；或弃置一张牌，然后' + trans + '摸' + num + '张牌');
                var next = target.chooseToDiscard(prompt, 'he', true);
                next.numx = cards.length;
                next.selectCard = function () {
                    if (ui.selected.cards.length > 1) return _status.event.numx;
                    return [1, _status.event.numx];
                };
                next.complexCard = true;
                next.ai = function (card) {
                    if (ui.selected.cards.length == 0 || (_status.event.player.countCards('he',
                        function (cardxq) {
                            return get.value(cardxq) < 7;
                        }) >= _status.event.numx)) return 7 - get.value(card);
                    return -1;
                };
                'step 1';
                if (result.bool) {
                    if (result.cards.length == cards.length) player.draw();
                    else player.draw(cards.length);
                    event.cardsx.addArray(result.cards);
                    for (var i = 0; i < event.cardsx.length; i++) {
                        if (get.position(event.cardsx[i]) != 'd') event.cardsx.splice(i--, 1);
                    }
                } else event.finish();
                'step 2';
                if (event.cardsx.length) {
                    var cards = event.cardsx;
                    var dialog = decadeUI.content.chooseGuanXing(player, cards, cards.length);
                    dialog.caption = '【设控】';
                    game.broadcast(function (player, cards, callback) {
                        if (!window.decadeUI) return;
                        var dialog = decadeUI.content.chooseGuanXing(player, cards, cards.length);
                        dialog.caption = '【设控】';
                        dialog.callback = callback;
                    }, player, cards, dialog.callback);
                    
                    event.switchToAuto = function () {
                        var cards = dialog.cards[0].concat();
                        var cheats = [];
                        var judges;
                        
                        var next = player.getNext();
                        var friend = (get.attitude(player, next) < 0) ? null : next;
                        judges = next.node.judges.childNodes;
                        
                        if (judges.length > 0) cheats = decadeUI.get.cheatJudgeCards(cards, judges, friend != null);
                        
                        if (friend) {
                            cards = decadeUI.get.bestValueCards(cards, friend);
                        } else {
                            cards.sort(function (a, b) {
                                return get.value(a, next) - get.value(b, next);
                            });
                        }
                        
                        cards = cheats.concat(cards);
                        var time = 500;
                        for (var i = 0; i < cards.length; i++) {
                            setTimeout(function (card, index, finished) {
                                dialog.move(card, index, 0);
                                if (finished) dialog.finishTime(cards.length <= 1 ? 250 : 1000);
                                ;
                            }, time, cards[i], i, i >= cards.length - 1);
                            time += 500;
                        }
                    };
                    
                    if (event.isOnline()) {
                        event.player.send(function () {
                            if (!window.decadeUI && decadeUI.eventDialog) _status.event.finish();
                        }, event.player);
                        
                        event.player.wait();
                        decadeUI.game.wait();
                    } else if (!event.isMine()) {
                        event.switchToAuto();
                    }
                } else event.finish();
            }
        },
        kamome_huanmeng: {
            content: function () {
                "step 0";
                if (player.isUnderControl()) {
                    game.modeSwapPlayer(player);
                }
                var num = 1 + player.countCards('e');
                ;
                var cards = get.cards(num);
                var guanxing = decadeUI.content.chooseGuanXing(player, cards, cards.length, null, cards.length);
                guanxing.caption = '【幻梦】';
                game.broadcast(function (player, cards, callback) {
                    if (!window.decadeUI) return;
                    var guanxing = decadeUI.content.chooseGuanXing(player, cards, cards.length, null, cards.length);
                    guanxing.caption = '【幻梦】';
                    guanxing.callback = callback;
                }, player, cards, guanxing.callback);
                
                event.switchToAuto = function () {
                    var cards = guanxing.cards[0].concat();
                    var cheats = [];
                    var judges = player.node.judges.childNodes;
                    
                    if (judges.length) cheats = decadeUI.get.cheatJudgeCards(cards, judges, true);
                    if (cards.length) {
                        for (var i = 0; i >= 0 && i < cards.length; i++) {
                            if (get.value(cards[i], player) >= 5) {
                                cheats.push(cards[i]);
                                cards.splice(i, 1);
                            }
                        }
                    }
                    
                    var time = 500;
                    for (var i = 0; i < cheats.length; i++) {
                        setTimeout(function (card, index, finished) {
                            guanxing.move(card, index, 0);
                            if (finished) guanxing.finishTime(1000);
                        }, time, cheats[i], i, (i >= cheats.length - 1) && cards.length == 0);
                        time += 500;
                    }
                    
                    for (var i = 0; i < cards.length; i++) {
                        setTimeout(function (card, index, finished) {
                            guanxing.move(card, index, 1);
                            if (finished) guanxing.finishTime(1000);
                        }, time, cards[i], i, (i >= cards.length - 1));
                        time += 500;
                    }
                };
                
                if (event.isOnline()) {
                    event.player.send(function () {
                        if (!window.decadeUI && decadeUI.eventDialog) _status.event.finish();
                    }, event.player);
                    
                    event.player.wait();
                    decadeUI.game.wait();
                } else if (!event.isMine()) {
                    event.switchToAuto();
                }
                "step 1";
                player.popup(get.cnNumber(event.num1) + '上' + get.cnNumber(event.num2) + '下');
                game.log(player, '将' + get.cnNumber(event.num1) + '张牌置于牌堆顶，' + get.cnNumber(event.num2) + '张牌置于牌堆底');
                game.updateRoundNumber();
            }
        },
        nsanruo: {
            unique: true,
            init: function (player) {
                if (!player.node.handcards1.cardMod) {
                    player.node.handcards1.cardMod = {};
                }
                if (!player.node.handcards2.cardMod) {
                    player.node.handcards2.cardMod = {};
                }
                var cardMod = function (card) {
                    if (get.info(card).multitarget) return;
                    if (card.name == 'sha' || get.type(card) == 'trick') return ['暗弱', '杀或普通锦囊牌对你不可见'];
                };
                player.node.handcards1.cardMod.nsanruo = cardMod;
                player.node.handcards2.cardMod.nsanruo = cardMod;
                player.node.handcards1.classList.add('nsanruo');
                player.node.handcards2.classList.add('nsanruo');
                if (!ui.css.nsanruo) {
                    ui.css.nsanruo = lib.init.sheet(
                        '.handcards.nsanruo>.card[data-card-type="trick"]:not(*[data-card-multitarget="1"])>*,' +
                        '.handcards.nsanruo>.card[data-card-name="sha"]>*{visibility:hidden !important;}',
                        '.handcards.nsanruo>.card[data-card-type="trick"]:not(*[data-card-multitarget="1"]),' +
                        '.handcards.nsanruo>.card[data-card-name="sha"]{background-size:0 0 !important;box-shadow:inset 0 0 0 2px white;}'
                    );
                }
            },
            onremove: function (player) {
                player.node.handcards1.classList.remove('nsanruo');
                player.node.handcards2.classList.remove('nsanruo');
                delete player.node.handcards1.cardMod.nsanruo;
                delete player.node.handcards2.cardMod.nsanruo;
            },
            ai: {
                neg: true
            }
        },
        xinfu_pingcai: {
			subSkill: { backup: {} },
			wolong_card: function () {
				'step 0'
				var ingame = game.hasPlayer(function (current) {
					return ['sp_zhugeliang', 're_sp_zhugeliang', 'ol_sp_zhugeliang', 'prp_zhugeliang'].contains(current.name) || ['sp_zhugeliang', 're_sp_zhugeliang', 'ol_sp_zhugeliang', 'prp_zhugeliang'].contains(current.name2);
				}) ? true : false;
				var prompt = '请选择';
				prompt += ingame ? '至多两名' : '一名';
				prompt += '角色，对其造成1点火焰伤害';
				var range = ingame ? [1, 2] : [1, 1]
				player.chooseTarget(prompt, range).set('ai', function (target) {
					var player = _status.event.player;
					return get.damageEffect(target, player, player, 'fire');
				});
				'step 1'
				if (result.bool && result.targets.length) {
					player.line(result.targets, 'fire');
					result.targets.sortBySeat();
					for (var i = 0; i < result.targets.length; i++) {
						result.targets[i].damage('fire');
					}
				}
			},
			fengchu_card: function () {
				'step 0'
				var ingame = game.hasPlayer(function (current) {
					return ['re_pangtong', 'pangtong', 'ol_pangtong'].contains(current.name) || ['re_pangtong', 'pangtong', 'ol_pangtong'].contains(current.name2);
				}) ? true : false;
				var prompt = '请选择';
				prompt += ingame ? '至多四名' : '至多三名';
				prompt += '要横置的角色';
				var range = ingame ? [1, 4] : [1, 3]
				player.chooseTarget(prompt, range).set('ai', function (target) {
					var player = _status.event.player;
					return get.effect(target, { name: 'tiesuo' }, player, player)
				});
				'step 1'
				if (result.bool && result.targets.length) {
					player.line(result.targets, 'green');
					result.targets.sortBySeat();
					for (var i = 0; i < result.targets.length; i++) {
						result.targets[i].link();
					}
				}
			},
			xuanjian_card: function () {
				'step 0'
				event.ingame = game.hasPlayer(function (current) {
					return ['re_xushu', 'xin_xushu', 'xushu', 'dc_xushu'].contains(current.name) || ['re_xushu', 'xin_xushu', 'xushu', 'dc_xushu'].contains(current.name2);
				}) ? true : false;
				var prompt = '请选择一名角色，令其回复一点体力并摸一张牌';
				prompt += event.ingame ? '，然后你摸一张牌。' : '。';
				player.chooseTarget(prompt).set('ai', function (target) {
					var player = _status.event.player;
					return get.attitude(player, target) * (target.isDamaged() ? 2 : 1);
				});
				'step 1'
				if (result.bool && result.targets.length) {
					var target = result.targets[0];
					player.line(target, 'thunder');
					target.draw();
					target.recover();
					if (event.ingame) player.draw();
				}
			},
			shuijing_card: function () {
				'step 0'
				event.ingame = game.hasPlayer(function (current) {
					return current.name == 'simahui' || current.name2 == 'simahui';
				}) ? true : false;
				var prompt = '将一名角色装备区中的';
				prompt += event.ingame ? '一张牌' : '防具牌';
				prompt += '移动到另一名角色的装备区中';
				var next = player.chooseTarget(2, function (card, player, target) {
					if (ui.selected.targets.length) {
						if (!_status.event.ingame) {
							return target.isEmpty(2) ? true : false;
						}
						var from = ui.selected.targets[0];
						if (target.isMin()) return false;
						var es = from.getCards('e');
						for (var i = 0; i < es.length; i++) {
							if (['equip3', 'equip4'].contains(get.subtype(es[i])) && target.getEquip('liulongcanjia')) continue;
							if (es[i].name == 'liulongcanjia' && target.countCards('e', { subtype: ['equip3', 'equip4'] }) > 1) continue;
							if (target.isEmpty(get.subtype(es[i]))) return true;
						}
						return false;
					}
					else {
						if (!event.ingame) {
							if (target.getEquip(2)) return true;
							return false;
						}
						return target.countCards('e') > 0;
					}
				});
				next.set('ingame', event.ingame)
				next.set('ai', function (target) {
					var player = _status.event.player;
					var att = get.attitude(player, target);
					if (ui.selected.targets.length == 0) {
						if (att < 0) {
							if (game.hasPlayer(function (current) {
								if (get.attitude(player, current) > 0) {
									var es = target.getCards('e');
									for (var i = 0; i < es.length; i++) {
										if (['equip3', 'equip4'].contains(get.subtype(es[i])) && current.getEquip('liulongcanjia')) continue;
										else if (es[i].name == 'liulongcanjia' && target.countCards('e', { subtype: ['equip3', 'equip4'] }) > 1) continue;
										else if (current.isEmpty(get.subtype(es[i]))) return true;
									}
									return false;
								}
							})) return -att;
						}
						return 0;
					}
					if (att > 0) {
						var es = ui.selected.targets[0].getCards('e');
						var i;
						for (i = 0; i < es.length; i++) {
							if (['equip3', 'equip4'].contains(get.subtype(es[i])) && target.getEquip('liulongcanjia')) continue;
							if (es[i].name == 'liulongcanjia' && target.countCards('e', { subtype: ['equip3', 'equip4'] }) > 1) continue;
							if (target.isEmpty(get.subtype(es[i]))) break;
						}
						if (i == es.length) return 0;
					}
					return -att * get.attitude(player, ui.selected.targets[0]);
				});
				next.set('multitarget', true);
				next.set('targetprompt', ['被移走', '移动目标']);
				next.set('prompt', prompt);
				'step 1'
				if (result.bool) {
					player.line2(result.targets, 'green');
					event.targets = result.targets;
				}
				else event.finish();
				'step 2'
				game.delay();
				'step 3'
				if (targets.length == 2) {
					if (!event.ingame) {
						event._result = {
							bool: true,
							links: [targets[0].getEquip(2)],
						};
					}
					else {
						player.choosePlayerCard('e', true, function (button) {
							return get.equipValue(button.link);
						}, targets[0]).set('targets0', targets[0]).set('targets1', targets[1]).set('filterButton', function (button) {
							var targets1 = _status.event.targets1;
							if (['equip3', 'equip4'].contains(get.subtype(button.link)) && targets1.getEquip('liulongcanjia')) return false;
							if (button.link.name == 'liulongcanjia' && targets1.countCards('e', { subtype: ['equip3', 'equip4'] }) > 1) return false;
							return !targets1.countCards('e', { subtype: get.subtype(button.link) });

						});
					}
				}
				else event.finish();
				'step 4'
				if (result.bool && result.links.length) {
					var link = result.links[0];
					if (get.position(link) == 'e') event.targets[1].equip(link);
					else if (link.viewAs) event.targets[1].addJudge({ name: link.viewAs }, [link]);
					else event.targets[1].addJudge(link);
					event.targets[0].$give(link, event.targets[1], false)
					game.delay();
				}
			},
			audio: true,
			enable: "phaseUse",
			usable: 1,
			chooseButton: {
				dialog: function () {
					var list = ["wolong", "fengchu", "xuanjian", "shuijing"];
					for (var i = 0; i < list.length; i++) {
						list[i] = ['', '', list[i] + '_card'];
					}
					return ui.create.dialog('评才', [list, 'vcard']);
				},
				check: function (button) {
					var name = button.link[2];
					var player = _status.event.player;
					if (name == 'xuanjian_card') {
						if (game.hasPlayer(function (current) {
							return current.isDamaged() && current.hp < 3 && get.attitude(player, current) > 1;
						})) return 1 + Math.random();
						else return 1;
					}
					else if (name == 'wolong_card') {
						if (game.hasPlayer(function (current) {
							return get.damageEffect(current, player, player, 'fire') > 0;
						})) return 1.2 + Math.random();
						else return 0.5;
					}
					else return 0.6;
				},
				backup: function (links, player) {
					return {
						audio: 'xinfu_pingcai',
						filterCard: () => false,
						selectCard: -1,
						takara: links[0][2],
						content: lib.skill.xinfu_pingcai.contentx,
					}
				},
			},
			contentx: function () {
				"step 0"
				event.pingcai_delayed = true;
				var name = lib.skill.xinfu_pingcai_backup.takara;
				event.cardname = name;
				event.videoId = lib.status.videoId++;
				if (player.isUnderControl()) {
					game.swapPlayerAuto(player);
				}
				var switchToAuto = function () {
					game.pause();
					game.countChoose();
					setTimeout(function () {
						_status.imchoosing = false;
						event._result = {
							bool: true,
						};
						game.resume();
					}, 9000);
				};
				var createDialog = function (player, id, name) {
					if (player == game.me) return;
					var dialog = ui.create.dialog('forcebutton', 'hidden');
					var str = get.translation(player) + '正在擦拭宝物上的灰尘…';
					var canSkip = (!_status.connectMode);
					if (canSkip) str += '<br>（点击宝物可以跳过等待AI操作）';
					dialog.textPrompt = dialog.add('<div class="text center">' + str + '</div>');
					dialog.classList.add('fixed');
					dialog.classList.add('scroll1');
					dialog.classList.add('scroll2');
					dialog.classList.add('fullwidth');
					dialog.classList.add('fullheight');
					dialog.classList.add('noupdate');
					dialog.videoId = id;

					var canvas2 = document.createElement('canvas');
					dialog.canvas_viewer = canvas2;
					dialog.appendChild(canvas2);
					canvas2.classList.add('grayscale');
					canvas2.style.position = "absolute";
					canvas2.style.width = '249px';
					canvas2.style.height = '249px';
					canvas2.style['border-radius'] = '6px';
					canvas2.style.left = "calc(50% - 125px)";
					canvas2.style.top = "calc(50% - 125px)";
					canvas2.width = 249;
					canvas2.height = 249;
					canvas2.style.border = '3px solid';

					var ctx2 = canvas2.getContext('2d');
					var img = new Image();
					img.src = lib.assetURL + 'image/card/' + name + '.png';
					img.onload = function () {
						ctx2.drawImage(this, 0, 0, this.width, this.height, 0, 0, canvas2.width, canvas2.height);
					}
					if (canSkip) {
						var skip = function () {
							if (event.pingcai_delayed) {
								delete event.pingcai_delayed;
								event._result = {
									bool: true,
								};
								game.resume();
								canvas2.removeEventListener(lib.config.touchscreen ? 'touchend' : 'click', skip);
							}
						};
						canvas2.addEventListener(lib.config.touchscreen ? 'touchend' : 'click', skip);
					}
					dialog.open();
				};
				var chooseButton = function (id, name) {
					var event = _status.event;
					_status.xinfu_pingcai_finished = false;

					var dialog = ui.create.dialog('forcebutton', 'hidden');
					dialog.textPrompt = dialog.add('<div class="text center">擦拭掉宝物上的灰尘吧！</div>');
					event.switchToAuto = function () {
						event._result = {
							bool: _status.xinfu_pingcai_finished,
						};
						game.resume();
						_status.imchoosing = false;
						_status.xinfu_pingcai_finished = true;
					};
					dialog.classList.add('fixed');
					dialog.classList.add('scroll1');
					dialog.classList.add('scroll2');
					dialog.classList.add('fullwidth');
					dialog.classList.add('fullheight');
					dialog.classList.add('noupdate');
					dialog.videoId = id;

					var canvas = document.createElement('canvas');
					var canvas2 = document.createElement('canvas');

					dialog.appendChild(canvas2);
					dialog.appendChild(canvas);

					canvas.style.position = "absolute";
					canvas.style.width = '249px';
					canvas.style.height = '249px';
					canvas.style['border-radius'] = '6px';
					canvas.style.left = "calc(50% - 125px)";
					canvas.style.top = "calc(50% - 125px)";
					canvas.width = 249;
					canvas.height = 249;
					canvas.style.border = '3px solid';

					canvas2.style.position = "absolute";
					canvas2.style.width = '249px';
					canvas2.style.height = '249px';
					canvas2.style['border-radius'] = '6px';
					canvas2.style.left = "calc(50% - 125px)";
					canvas2.style.top = "calc(50% - 125px)";
					canvas2.width = 249;
					canvas2.height = 249;
					canvas2.style.border = '3px solid';

					var ctx = canvas.getContext('2d');
					var ctx2 = canvas2.getContext('2d');

					var img = new Image();
					img.src = lib.assetURL + 'image/card/' + name + '.png';
					img.onload = function () {
						ctx2.drawImage(this, 0, 0, this.width, this.height, 0, 0, canvas2.width, canvas2.height);
					}

					ctx.fillStyle = 'lightgray';
					ctx.fillRect(0, 0, canvas.width, canvas.height);

					canvas.onmousedown = function (ev) {
						//if(_status.xinfu_pingcai_finished) return;
						canvas.onmousemove = function (e) {
							if (_status.xinfu_pingcai_finished) return;
							ctx.beginPath();
							ctx.clearRect(e.offsetX / game.documentZoom - 16, e.offsetY / game.documentZoom - 16, 32, 32);
							var data = ctx.getImageData(canvas.width * 0.1, canvas.height * 0.1, canvas.width * 0.8, canvas.height * 0.8).data;
							var sum = 0;
							for (var i = 3; i < data.length; i += 4) {
								if (data[i] == 0) {
									sum++;
								}
							}
							if (sum >= (canvas.width * canvas.height) * 0.6) {
								//ctx.clearRect(0,0,canvas.width,canvas.height);
								if (!_status.xinfu_pingcai_finished) {
									_status.xinfu_pingcai_finished = true;
									event.switchToAuto();
								}
							}
						}
					}
					canvas.ontouchstart = function (ev) {
						//if(_status.xinfu_pingcai_finished) return;
						canvas.ontouchmove = function (e) {
							if (_status.xinfu_pingcai_finished) return;
							ctx.beginPath();
							var rect = canvas.getBoundingClientRect();
							var X = ((e.touches[0].clientX / game.documentZoom - rect.left) / rect.width * canvas.width);
							var Y = ((e.touches[0].clientY / game.documentZoom - rect.top) / rect.height * canvas.height);
							ctx.clearRect(X - 16, Y - 16, 32, 32);
							var data = ctx.getImageData(canvas.width * 0.1, canvas.height * 0.1, canvas.width * 0.8, canvas.height * 0.8).data;
							var sum = 0;
							for (var i = 3; i < data.length; i += 4) {
								if (data[i] == 0) {
									sum++;
								}
							}
							if (sum >= (canvas.width * canvas.height) * 0.6) {
								if (!_status.xinfu_pingcai_finished) {
									_status.xinfu_pingcai_finished = true;
									event.switchToAuto();
								}
							}
						}
					}
					canvas.onmouseup = function (ev) {
						canvas.onmousemove = null;
					}
					canvas.ontouchend = function (ev) {
						canvas.ontouchmove = null;
					}

					dialog.open();

					game.pause();
					game.countChoose();
				};
				//event.switchToAuto=switchToAuto;
				game.broadcastAll(createDialog, player, event.videoId, name);
				if (event.isMine()) {
					chooseButton(event.videoId, name);
				}
				else if (event.isOnline()) {
					event.player.send(chooseButton, event.videoId, name);
					event.player.wait();
					game.pause();
				}
				else {
					switchToAuto();
				}
				"step 1"
				var result = event.result || result;
				if (!result) result = { bool: false };
				event._result = result;
				game.broadcastAll(function (id, result, player) {
					_status.xinfu_pingcai_finished = true;
					var dialog = get.idDialog(id);
					if (dialog) {
						dialog.textPrompt.innerHTML = '<div class="text center">' + (get.translation(player) + '擦拭宝物' + (result.bool ? '成功！' : '失败…')) + '</div>';
						if (result.bool && dialog.canvas_viewer) dialog.canvas_viewer.classList.remove('grayscale');
					}
					if (!_status.connectMode) delete event.pingcai_delayed;
				}, event.videoId, result, player);
				game.delay(2.5);
				"step 2"
				game.broadcastAll('closeDialog', event.videoId);
				if (result.bool) {
					player.logSkill('pcaudio_' + event.cardname);
					event.insert(lib.skill.xinfu_pingcai[event.cardname], {
						player: player,
					});
				}
			},
			ai: {
				order: 7,
				fireAttack: true,
				threaten: 1.7,
				result: {
					player: 1,
				},
			},
		},
        
        xinbenxi: {
            content: function () {
                "step 0";
                event.videoId = lib.status.videoId++;
                var func = function (card, id, bool) {
                    var list = ['为XXX多指定一个目标', '令XXX无视防具', '令XXX不可被抵消', '当XXX造成伤害时摸一张牌'];
                    var choiceList = ui.create.dialog('【奔袭】：请选择一至两项', 'forcebutton');
                    choiceList.videoId = id;
                    for (var i = 0; i < list.length; i++) {
                        list[i] = list[i].replace(/XXX/g, card);
                        var str = '<div class="popup text" style="width:calc(100% - 10px);display:inline-block">';
                        if (i == 0 && !bool) str += '<div style="opacity:0.5">';
                        str += list[i];
                        if (i == 0 && !bool) str += '</div>';
                        str += '</div>';
                        var next = choiceList.add(str);
                        next.firstChild.addEventListener(lib.config.touchscreen ? 'touchend' : 'click', ui.click.button);
                        next.firstChild.link = i;
                        for (var j in lib.element.button) {
                            next[j] = lib.element.button[j];
                        }
                        choiceList.buttons.add(next.firstChild);
                    }
                    return choiceList;
                };
                if (player.isOnline2()) {
                    player.send(func, get.translation(trigger.card), event.videoId, lib.skill.xinbenxi.filterx(trigger, player));
                }
                event.dialog = func(get.translation(trigger.card), event.videoId, lib.skill.xinbenxi.filterx(trigger, player));
                if (player != game.me || _status.auto) {
                    event.dialog.style.display = 'none';
                }
                var next = player.chooseButton();
                next.set('dialog', event.videoId);
                next.set('forced', true);
                next.set('selectButton', [1, 2]);
                next.set('filterButton',
                    function (button) {
                        if (button.link == 0) {
                            return _status.event.bool1;
                        }
                        ;
                        return true;
                    });
                next.set('bool1', lib.skill.xinbenxi.filterx(trigger, player));
                next.set('ai',
                    function (button) {
                        var player = _status.event.player;
                        var event = _status.event.getTrigger();
                        switch (button.link) {
                            case 0: {
                                if (game.hasPlayer(function (current) {
                                    return lib.filter.targetEnabled2(event.card, player, current) && !event.targets.contains(current) && get.effect(current, event.card, player, player) > 0;
                                })) return 1.6 + Math.random();
                                return 0;
                            }
                            case 1: {
                                if (event.targets.filter(function (current) {
                                    var eff1 = get.effect(current, event.card, player, player);
                                    player._xinbenxi_ai = true;
                                    var eff2 = get.effect(current, event.card, player, player);
                                    delete player._xinbenxi_ai;
                                    return eff1 > eff2;
                                }).length) return 1.9 + Math.random();
                                return Math.random();
                            }
                            case 2: {
                                var num = 1.3;
                                if (event.card.name == 'sha' && event.targets.filter(function (current) {
                                    if (current.mayHaveShan() && get.attitude(player, current) <= 0) {
                                        if (current.hasSkillTag('useShan')) num = 1.9;
                                        return true;
                                    }
                                    return false;
                                }).length) return num + Math.random();
                                return 0.5 + Math.random();
                            }
                            case 3: {
                                return (get.tag(event.card, 'damage') || 0) + Math.random();
                            }
                        }
                    });
                "step 1";
                if (player.isOnline2()) {
                    player.send('closeDialog', event.videoId);
                }
                event.dialog.close();
                var map = [function (trigger, player, event) {
                    player.chooseTarget('请选择' + get.translation(trigger.card) + '的额外目标', true,
                        function (card, player, target) {
                            var player = _status.event.player;
                            if (_status.event.targets.contains(target)) return false;
                            return lib.filter.targetEnabled2(_status.event.card, player, target);
                        }).set('targets', trigger.targets).set('card', trigger.card).set('ai',
                        function (target) {
                            var trigger = _status.event.getTrigger();
                            var player = _status.event.player;
                            return get.effect(target, trigger.card, player, player);
                        });
                },
                    function (trigger, player, event) {
                        player.storage.xinbenxi_unequip.add(trigger.card);
                    },
                    function (trigger, player, event) {
                        player.storage.xinbenxi_directHit.add(trigger.card);
                        trigger.nowuxie = true;
                        trigger.customArgs.default.directHit2 = true;
                    },
                    function (trigger, player, event) {
                        player.storage.xinbenxi_damage.add(trigger.card);
                    }];
                for (var i = 0; i < result.links.length; i++) {
                    game.log(player, '选择了', '#g【奔袭】', '的', '#y选项' + get.cnNumber(result.links[i] + 1, true));
                    map[result.links[i]](trigger, player, event);
                }
                if (!result.links.contains(0)) event.finish();
                "step 2";
                if (result.targets) {
                    player.line(result.targets);
                    trigger.targets.addArray(result.targets);
                }
            }
        },
        
			guhuo_guess:{
				audio:2,
				trigger:{
					player:['useCardBefore','respondBefore'],
				},
				forced:true,
				silent:true,
				popup:false,
				firstDo:true,
				filter:function(event,player){
					return event.skill&&(event.skill.indexOf('guhuo_')==0||event.skill.indexOf('xinfu_guhuo_')==0);
				},
				content:function(){
					'step 0'
					player.addTempSkill('guhuo_phase');
					event.fake=false;
					event.betrayer=null;
					var card=trigger.cards[0];
					if(card.name!=trigger.card.name||(card.name=='sha'&&(trigger.card.nature||card.nature)&&trigger.card.nature!=card.nature)) event.fake=true;
					player.popup(trigger.card.name,'metal');
					player.lose(card,ui.ordering).relatedEvent=trigger;
					trigger.throw=false;
					trigger.skill='xinfu_guhuo_backup';
					event.prompt=get.translation(player)+'声明'+(trigger.targets&&trigger.targets.length?'对'+get.translation(trigger.targets):'')+
						'使用'+(get.translation(trigger.card.nature)||'')+get.translation(trigger.card.name)+'，是否质疑？';
					event.targets=game.filterPlayer(function(current){
						return current!=player&&!current.hasSkill('chanyuan');
					}).sortBySeat(_status.currentPhase);
					if(!event.targets.length) event.goto(4);
					'step 1'
					event.target=event.targets.shift();
					event.target.chooseButton([event.prompt,[['reguhuo_ally','reguhuo_betray'],'vcard']],true).set('ai',function(button){
						var player=_status.event.player;
						var evt=_status.event.getParent('guhuo_guess'),evtx=evt.getTrigger();
						if(!evt) return Math.random();
						var card={name:evtx.card.name,nature:evtx.card.nature,isCard:true};
						var ally=button.link[2]=='reguhuo_ally';
						if(ally&&(player.hp<=1||get.attitude(player,evt.player)>=0)) return 1.1;
						if(!ally&&get.attitude(player,evt.player)<0&&evtx.name=='useCard'){
							var eff=0;
							var targetsx=evtx.targets||[];
							for(var target of targetsx){
								var isMe=target==evt.player;
								eff+=get.effect(target,card,evt.player,player)/(isMe?1.5:1);
							}
							eff/=(1.5*targetsx.length)||1;
							if(eff>0) return 0;
							if(eff<-7) return Math.random()+Math.pow(-(eff+7)/8,2);
							return Math.pow((get.value(card,evt.player,'raw')-4)/(eff==0?5:10),2);
						}
						return Math.random();
					});
					'step 2'
					if(result.links[0][2]=='reguhuo_betray'){
						target.addExpose(0.2);
						game.log(target,'#y质疑');
						target.popup('质疑！','fire');
						event.betrayer=target;
					}
					else{
						game.log(target,'#g不质疑');
						target.popup('不质疑','wood');
					}
					'step 3'
					game.delay();
					if(!event.betrayer&&targets.length) event.goto(1);
					'step 4'
					player.showCards(trigger.cards);
					if(!event.betrayer) event.finish();
					'step 5'
					if(event.fake){
						event.betrayer.popup('质疑正确','wood');
						game.log(player,'声明的',trigger.card,'作废了');
						trigger.cancel();
						trigger.getParent().goto(0);
						trigger.line=false;
					}
					else{
						event.betrayer.popup('质疑错误','fire');
						event.betrayer.addSkillLog('chanyuan');
					}
					'step 6'
					game.delayx();
				},
			},
        
			old_guhuo_guess:{
				audio:'old_guhuo',
				trigger:{
					player:['useCardBefore','respondBefore'],
				},
				forced:true,
				silent:true,
				popup:false,
				firstDo:true,
				filter:function(event,player){
					return event.skill&&event.skill.indexOf('old_guhuo_')==0;
				},
				content:function(){
					'step 0'
					event.fake=false;
					event.goon=true;
					event.betrayers=[];
					var card=trigger.cards[0];
					if(card.name!=trigger.card.name||(card.name=='sha'&&(trigger.card.nature||card.nature)&&trigger.card.nature!=card.nature)) event.fake=true;
					if(event.fake){
						player.addSkill('old_guhuo_cheated');
						player.markAuto('old_guhuo_cheated',[trigger.card.name+trigger.card.nature]);
					}
					player.popup(trigger.card.name,'metal');
					player.lose(card,ui.ordering).relatedEvent=trigger;
					trigger.throw=false;
					trigger.skill='old_guhuo_backup';
					game.log(player,'声明',trigger.targets&&trigger.targets.length?'对':'',trigger.targets,'使用',trigger.card);
					event.prompt=get.translation(player)+'声明'+(trigger.targets&&trigger.targets.length?'对'+get.translation(trigger.targets):'')+
						'使用'+(get.translation(trigger.card.nature)||'')+get.translation(trigger.card.name)+'，是否质疑？';
					event.targets=game.filterPlayer(i=>i!=player&&i.hp>0).sortBySeat(_status.currentPhase);
					if(!event.targets.length) event.goto(4);
					'step 1'
					event.target=event.targets.shift();
					event.target.chooseButton([event.prompt,[['reguhuo_ally','reguhuo_betray'],'vcard']],true).set('ai',function(button){
						var player=_status.event.player;
						var evt=_status.event.getParent('old_guhuo_guess'),evtx=evt.getTrigger();
						if(!evt) return Math.random();
						var card={name:evtx.card.name,nature:evtx.card.nature,isCard:true};
						var ally=button.link[2]=='reguhuo_ally';
						if(ally&&(player.hp<=1||get.attitude(player,evt.player)>=0)) return 1.1;
						if(!ally&&get.effect(player,{name:'losehp'},player,player)>=0) return 10;
						if(!ally&&get.attitude(player,evt.player)<0){
							if(evtx.name=='useCard'){
								var eff=0;
								var targetsx=evtx.targets||[];
								for(var target of targetsx){
									var isMe=target==evt.player;
									eff+=get.effect(target,card,evt.player,player)/(isMe?1.35:1);
								}
								eff/=(1.5*targetsx.length)||1;
								if(eff>0) return 0;
								if(eff<-7) return (Math.random()+Math.pow(-(eff+7)/8,2))/Math.sqrt(evt.betrayers.length+1)+(player.hp-3)*0.05+Math.max(0,4-evt.player.hp)*0.05-(player.hp==1&&!get.tag(card,'damage')?0.2:0);
								return Math.pow((get.value(card,evt.player,'raw')-4)/(eff==0?3.1:10),2)/Math.sqrt(evt.betrayers.length||1)+(player.hp-3)*0.05+Math.max(0,4-evt.player.hp)*0.05;
							}
							if(evt.player.getStorage('old_guhuo_cheated').contains(card.name+card.nature)) return Math.random()+0.3;
						}
						return Math.random();
					});
					'step 2'
					if(result.links[0][2]=='reguhuo_betray'){
						target.addExpose(0.2);
						game.log(target,'#y质疑');
						target.popup('质疑！','fire');
						event.betrayers.push(target);
					}
					else{
						game.log(target,'#g不质疑');
						target.popup('不质疑','wood');
					}
					'step 3'
					game.delay();
					if(targets.length) event.goto(1);
					'step 4'
					player.showCards(trigger.cards);
					if(!event.betrayers.length) event.finish();
					'step 5'
					if(event.fake){
						for(var target of event.betrayers){
							target.popup('质疑正确','wood');
						}
						event.goon=false;
					}
					else{
						for(var target of event.betrayers){
							target.popup('质疑错误','fire');
							target.loseHp();
						}
						if(get.suit(trigger.cards[0],player)!='heart'){
							event.goon=false;
						}
					}
					'step 6'
					if(!event.goon){
						game.log(player,'声明的',trigger.card,'作废了');
						trigger.cancel();
						trigger.getParent().goto(0);
						trigger.line=false;
					}
					'step 7'
					game.delayx();
				},
			},
    };
    
    if (!_status.connectMode) {
        for (var key in decadeUI.skill) {
            if (lib.skill[key]) lib.skill[key] = decadeUI.skill[key];
        }
        
        for (var key in decadeUI.inheritSkill) {
            if (lib.skill[key]) {
                for (var j in decadeUI.inheritSkill[key]) {
                    lib.skill[key][j] = decadeUI.inheritSkill[key][j];
                }
            }
        }
    }
    
});

