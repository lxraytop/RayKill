'use strict';
decadeModule.import(function (lib, game, ui, get, ai, _status) {

decadeUI.dynamicSkin = {
    
    caochun:{
            长坂败备: {
                name: "skin_Mobile_CaoChun_ChangBanBaiBei",
                x: [0, 0.75],
                y: [0, 0.1],
                scale: 0.5,
                angle: -5,
                speed: 1,
                action: "DaiJi",
                background: "skin_Mobile_CaoChun_ChangBanBaiBei_bg.png",
                skinName: "长坂败备"
            },
			虎啸龙渊: {
				name: "caochun/daiji/daiji2",
				x: [0,0.28],
				y: [0,0.52],
				scale: 0.58,
				shizhounian: true,
				beijing: {
					name: "caochun/daiji/beijing",
					x: [0,0.73],
					y: [0,0.41],
					scale: 0.35,
				},
				chuchang: {
					name: "caochun/daiji/chuchang",
					scale: 0.55,
				},
				gongji: {
					name: "caochun/daiji/chuchang2",
					scale: 0.63,
				},
				teshu: {
					name: "caochun/daiji/chuchang2",
					scale: 0.63,
				},
				zhishixian: {
					name: "caochun/daiji/shouji2",
					scale: 0.7,
					delay: 0.3,
					speed: 0.8,
					effect: {
						name: "caochun/daiji/shouji",
						scale: 0.7,
						delay: 0.3,
						speed: 0.8,
					},
				},
				special: {
					// 此处可以添加另外一个血量的变身条件
					// 变身1: {
					// 	hp: 3,  // 如果血量低于3, 则会触发变身效果, 当血量恢复到2以上, 那么
					// 	name: 'caochun/虎年曹纯', // 不同骨骼, 不填写表示同一个骨骼, 填写的话格式为 'hetaihou/战场绝版'  角色名+皮肤名称
					// 	effect: 'shaohui', // 预留, 选择更换骨骼的特效 , 目前只有曹纯一个, 全部默认播放曹纯的换肤骨骼
					// },
					变身2: {
						hp: 2,  // 如果血量低于2, 则会触发变身效果, 当血量恢复到2以上, 那么
						name: 'caochun/虎啸龙渊2', // 不同骨骼, 不填写表示同一个骨骼, 填写的话格式为 'hetaihou/战场绝版'  角色名+皮肤名称
						audio: 'caochun/audio/XingXiang', // 触发变身, 可以播放语音
					},
					play: {
						name: "caochun/daiji2/chuchang",
						scale: 0.65,
						x: [0,0.9],
						y: [0,0.4],
						audio: 'caochun/audio/XingXiang', // 触发限定技时候播放的语音
					},
					condition: {
						lowhp: {
							// transform: ['变身1', '变身2'],  // 设置血量需要变换的骨骼
							transform: ['变身2'],  // 设置血量需要变换的骨骼
							recover: false,  // 恢复血量是否变回原来的骨骼,
							effect: 'shaohui', // 不想用这个特效, 就注释掉这行就行, 或者手动指定其他变身特效
							// effect: {
							// 	delay: 0,
							// 	name: 'posui',
							// 	json: true,
							// 	x: [0, 0.5],
							// 	y: [0, 0.5],
							// 	scale: 0.6
							// },
							play: 'play',  // 设置触发低血量触发的动画
						},
					}
				}
			},
			虎啸龙渊2: {
				name: "caochun/daiji2/daiji2",
				x: [0,0.55],
				y: [0,0.61],
				scale: 0.46,
				shizhounian: true,
				background: "caochun/daiji2/static_bg.png",
				beijing: {
					name: "caochun/daiji2/beijing",
					x: [0,0.41],
					y: [0,0.51],
					scale: 0.35,
				},
				chuchang: {
					name: "caochun/daiji2/chuchang",
					scale: 0.6,
				},
				gongji: {
					name: "caochun/daiji2/chuchang2",
					x: [0,0.87],
					y: [0,0.21],
					scale: 0.63,
				},
				teshu: {
					name: "caochun/daiji2/chuchang2",
					scale: 0.55,
				},
				zhishixian: {
					name: "caochun/daiji2/shouji2",
					scale: 0.7,
					delay: 0.3,
					speed: 0.8,
					effect: {
						name: "caochun/daiji2/shouji",
						scale: 0.7,
						delay: 0.3,
						speed: 0.8,
					},
				},
			},
		    /*狗子: {
				x: [0,0.5],
				y: [0,0.44],
				scale: 0.1,
                name: "曹纯/狗子/anim_daoqi",
                version: "3.8",
                ss_jinchang: 'Enter',  // 手杀进场效果的标签
                action: 'Stand',
                gongji: {
                    x: [0, 0.78],
                    y: [0, 0.3],
				    scale: 0.33,
                    action: 'Attack',
                    version: "3.8",
                    speed: 0.9
                }
            },*/
    },
    
    wenyang:{
        紫电清霜:{//十周年38
		name: 'skin_wenyang_ZhiDianQingShuang',
		x: [0, 0.56],
		y: [0, 0.47],
		scale: 0.83,
		angle:10,
		background: 'skin_wenyang_ZhiDianQingShuang_bg.png',
		},
	},

    re_sunyi: {
      腾龙翻江: {//十周年34
        name: 'skin_sunyi_TLFJ',
        x: [0, 0.4],
        y: [0, 0.51],
        scale: 0.81,
        background: 'skin_sunyi_TLFJ_bg.png',
      },
    },
    
    puyuan: {//十周年27
      百炼神器: {
        name: 'skin_puyuan_BaiLianShenQi',
        x: [0, 0.4],
        y: [0, 0.51],
        scale: 0.81,
        background: 'skin_puyuan_BaiLianShenQi_bg.png',
      },
    },
    re_liru: {
       鸩杀少帝: {//十周年19
        name: 'skin_liru_ZhenShaShaoDi',
        x: [0, 0.2],
        y: [0, 0.13],
        scale: 0.5,
        angle: 10,
        background: 'skin_liru_ZhenShaShaoDi_bg.png',
        action: 'DaiJi',
      },
    },
      
    fazheng:{//十周年12
        恩怨如火: {
        name: 'skin_fazheng_EnYuanRuHuo',
        x: [0, 0.46],
        y: [0, 0.45],
        scale: 0.75,
        background: 'skin_fazheng_EnYuanRuHuo_bg.png',
      },
    },
      
    re_zuoci:{
    役使鬼神: {//梦终150
        name: 'skin_zuoci_YiShiGuiShen',
        x: [0, 0.78],
        y: [5, 0.05],
        scale: 0.65,
        action: 'DaiJi',
        pos: {
        x: [0,0.8],         
        y: [0,0.4]  },
        background: 'skin_zuoci_YiShiGuiShen_bg.png',
        angle: 10,
        skinName: "役使鬼神"
       },
    },
    
    zhurong: {
    飞刀烈火一: {//梦终149
        name: 'skin_zhurong_FeiDaoLieHuo1',
        x: [0, 0.75],
        y: [0, 0.38],
        scale: 0.5,
        angle: -10,
        background: 'skin_zhurong_FeiDaoLieHuo_bg.png',
        skinName: "飞刀烈火"
       },
    },
    
    zhuran: {
    镇守江陵: {//梦终148
        name: 'skin_zhuran_ZhenShouJiangLing2',
        x: [0, 0.5],
        y: [0, 0.55],
        scale: 0.6,
        background: 'skin_zhuran_ZhenShouJiangLing_bg.png',
        skinName: "镇守江陵"
       },
    },
    
    zhuhuan: {
    率军袭敌: {//梦终147
        name: 'skin_zhuhuan_ShuaiJunXiDi2',
        x: [0, 0.52],
        y: [0, 0.5],
        scale: 0.8,
        background: 'skin_zhuhuan_ShuaiJunXiDi_bg.png',
        skinName: "率军袭敌"
       },
    },
    
    zhugezhan: {
    明智春馨: {//梦终146
        name: 'skin_zhugezhan_MingZhiChunXin2',
        x: [0, 0.35],
        y: [0, 0.43],
        scale: 0.74,
        background: 'skin_zhugezhan_MingZhiChunXin_bg.png',
        skinName: "明智春馨"
      },
    },

    zhugeliang: {
    新: {//新5
        name: 'skin_zhugeliang_xin',
        x: [0, 0.48],
        y: [0, 0.12],
        scale: 0.8,
        action: 'DaiJi',
        background: 'skin_zhugeliang_MingLiangQianGu_bg.png',
        skinName: "新"
       },
    },
    
    re_zhugeliang: {
    明良千古: {//梦终145+
        name: 'skin_zhugeliang_MingLiangQianGu',
        x: [0, -0.3],
        y: [0, 0.2],
        scale: 0.42,
        angle: -12,
        action: 'DaiJi',
        pos: {
        x: [0,0.8],         
        y: [0,0.4]  },
        background: 'skin_zhugeliang_MingLiangQianGu_bg.png',
        skinName: "明良千古"
      },
    },
    
    snjs_ex_zhugeliang: {
    明良千古: {//梦终145
        name: 'skin_zhugeliang_MingLiangQianGu',
        x: [0, -0.3],
        y: [0, 0.2],
        scale: 0.42,
        angle: -12,
        action: 'DaiJi',
        pos: {
        x: [0,0.8],         
        y: [0,0.4]  },
        background: 'skin_zhugeliang_MingLiangQianGu_bg.png',
        skinName: "明良千古"
      },
    },
    
    ol_sp_zhugeliang: {
    新: {//新6
        name: 'skin_ol_sp_zhugeliang_xin',
        x: [0, 0.70],
        y: [0, 0.14],
        scale: 0.50,
        //action: 'DaiJi',
        angle:10,
        background: 'skin_ol_sp_zhugeliang_xin_bg.png',
        skinName: "新"
       },
    },
    
    shen_zhugeliang: {
    孟章诛邪: {//梦终144+
        name: 'skin_shenzhugeliang_MengZhangZhuXie',
        x: [0, 0.33],
        y: [0, -0.33],
        scale: 0.83,
        background: 'skin_shenzhugeliang_MengZhangZhuXie_bg.png',
        skinName: "孟章诛邪"
      },
    },
    
    snjs_re_shen_zhugeliang: {
    孟章诛邪: {//梦终144
        name: 'skin_shenzhugeliang_MengZhangZhuXie',
        x: [0, 0.33],
        y: [0, -0.33],
        scale: 0.83,
        background: 'skin_shenzhugeliang_MengZhangZhuXie_bg.png',
        skinName: "孟章诛邪"
      },
    },
    
    zhugeke:{
    手杀: {//梦终143
        name: 'skin_zhugeke_ShouSha',
        x: [0, 0.95],
        y: [0, 0.0],
        scale: 0.46,
//        action: 'DaiJi',
        pos: {
        x: [0,0.8],
        y: [0,0.4]  },
        background: 'skin_zhugeke_ShouSha_bg.png',
        skinName: "手杀"
      },
    },
    
    zhugejin: {
    风雅神逸: {//梦终142
        name: 'skin_zhugejin_FengYaShenYi2',
        x: [0, 0.47],
        y: [0, 0.5],
        scale: 0.75,
        angle: -10,
        background: 'skin_zhugejin_FengYaShenYi_bg.png',
        skinName: "风雅神逸"
       },
    },
    
    zq_shenzhugeguo: {
    仙池起舞:{//梦终141+
        name: 'skin_zhugeguo_XianChiQiWu',
        x: [0, -0.1],
        y: [0, 0.3],
        scale: 0.4,
        //angle:-9,
        action: 'DaiJi',
        pos: {
        x: [0,0.8],         
        y: [0,0.4]  },
        background: 'skin_zhugeguo_XianChiQiWu_bg.png',
        skinName: "仙池起舞"
      },
    },
    
    zhugeguo: {
    兰荷艾莲:{//十周年53
				name: 'skin_zhugeguo_LanHeAiLian',
				x: [-30, 0.5],
				y: [8, 0.3],
				scale: 0.5,
				background: 'skin_zhugeguo_LanHeAiLian_bg.png',
			},
    仙池起舞:{//梦终141
        name: 'skin_zhugeguo_XianChiQiWu',
        x: [0, -0.1],
        y: [0, 0.3],
        scale: 0.4,
        //angle:-9,
        action: 'DaiJi',
        pos: {
        x: [0,0.8],         
        y: [0,0.4]  },
        background: 'skin_zhugeguo_XianChiQiWu_bg.png',
        skinName: "仙池起舞"
      },
    },
    
    re_zhouyu: {
    谋定天下一:{//梦终140+
		name: 'skin_zhouyu_MouDingTianXia1',
		x: [0, 0.78],
		y: [0, 0.56],
		scale: 0.36,
		background: 'skin_zhouyu_MouDingTianXia_bg.png',	
      },
    },
    
    snjs_ex_zhouyu: {
    谋定天下一:{//梦终140
		name: 'skin_zhouyu_MouDingTianXia1',
		x: [0, 0.78],
		y: [0, 0.56],
		scale: 0.36,
		background: 'skin_zhouyu_MouDingTianXia_bg.png',	
      },
    },
    
    zhouyi: {
    剑舞浏漓:{//十周年52
				name: 'skin_zhouyi_JianWuLiuLi',
				x: [0, 0.4],
				y: [0, 0.5],
				scale: 0.8,
				background: 'skin_zhouyi_JianWuLiuLi_bg.png',
			}
    },
    
    zhoufei: {
    鹊星夕情:{//十周年30
				name: 'skin_sundengzhoufei_QueXingXiQing',
				x: [0, 0.5],
				y: [15, 0.2],
				scale: 0.7,
				background: 'skin_sundengzhoufei_QueXingXiQing_bg.png',
			},
    笼中箜响: {//梦终139
        name: 'skin_zhoufei_LongZhongKongXiang',
        x: [0, -0.2],
        y: [0, 0.4],
        scale: 0.5,
        action: 'DaiJi',
        pos: {
        x: [0,0.8],         
        y: [0,0.4]  },
        //angle:-10,
        background: 'skin_zhoufei_LongZhongKongXiang_bg.png',
        skinName: "笼中箜响"
       },
    },
    
    zhongyao: {
    挥毫代诏: {//梦终138
        name: 'skin_zhongyao_HuiHaoDaiZhao2',
        x: [0, 0.5],
        y: [0, 0.52],
        scale: 0.79,
        background: 'skin_zhongyao_HuiHaoDaiZhao_bg.png',
        skinName: "挥毫代诏"
      },
    },
    
    zhonghui: {
    谋谟之勋: {//梦终137
        name: 'skin_zhonghui_MouMoZhiXun',
        x: [0, 0.46],
        y: [0, 0.73],
        scale: 0.58,
        action: 'DaiJi',
        pos: {
        x: [0,0.8],         
        y: [0,0.4]  },
        background: 'skin_zhonghui_MouMoZhiXun_bg.png',
        skinName: "谋谟之勋"
      },
    },
    
    zhenji: {
    才颜双绝:{//十周年51
				name: 'skin_zhenji_CaiYanShuangJue',
				x: [20, 0.5],
				y: [0, 0.3],
				scale: 0.45,
				background: 'skin_zhenji_CaiYanShuangJue_bg.png',
			},
    牛年清明: {//梦终136+
        name: 'skin_zhenji_NiuNianQingMing',
        x: [0, 0.5],
        y: [0, 0.3],
        scale: 0.55,
        angle:9,
        background: 'skin_zhenji_NiuNianQingMing_bg.png',
        skinName: "牛年清明"
      },
    },
    
    snjs_ex_zhenji: {
    牛年清明: {//梦终136
        name: 'skin_zhenji_NiuNianQingMing',
        x: [0, 0.5],
        y: [0, 0.3],
        scale: 0.55,
        angle:9,
        background: 'skin_zhenji_NiuNianQingMing_bg.png',
        skinName: "牛年清明"
      },
    },
    
    sp_zhaoyun: {
    单骑救主: {//梦终135
        name: 'skin_zhaoyun_DanJiJiuZhu',
        x: [0, 0.53],
        y: [0, 0.53],
        scale: 0.49,
        angle: -10,
        action: 'DaiJi',
        pos: {
        x: [0,0.8],         
        y: [0,0.4]  },
        background: 'skin_zhaoyun_DanJiJiuZhu_bg.png',
        skinName: "单骑救主"
       }, 
    },
    
    zhaoyan:{
    彩绘芳菲: {//梦终134
        name: 'skin_zhaoyan_CaiHuiFangFei2',
        x: [0, 0.5],
        y: [0, 0.5],
        scale: 0.74,
        background: 'skin_zhaoyan_CaiHuiFangFei_bg.png',
        skinName: "彩绘芳菲"
      },
    },
    
    zhaoxiang: {
    芳芷飒敌: {//十周年50
        name: 'skin_zhaoxiang_FangZhiSaDi',
        x: [0, 0.45],
        y: [0, 0.48],
        scale: 0.85,
        background: 'skin_zhaoxiang_FangZhiSaDi_bg.png',
      },
    },
    
    zhangxiu: {
    逐鹿天下: {//梦终133
        name: 'skin_zhangxiu_ZhuLuTianXia2',
        x: [0, 0.52],
        y: [0, 0.5],
        scale: 0.78,
        background: 'skin_zhangxiu_ZhuLuTianXia_bg.png',
        skinName: "逐鹿天下"
      },
    },
    
    zhangxingcai: {
    凯旋星花:{//十周年49
				name: 'skin_zhangxingcai_KaiXuanXingHua',
				x: [-15, 0.5],
				y: [15, 0.2],
				scale: 0.6,
				background: 'skin_zhangxingcai_KaiXuanXingHua_bg.png',
			},
    星花柔矛: {//梦终132
        name: 'skin_zhangxingcai_XingHuaRouMao2',
        x: [0, 0.4],
        y: [0, 0.55],
        scale: 0.74,
        angle:-5,
        background: 'skin_zhangxingcai_XingHuaRouMao_bg.png',
        skinName: "星花柔矛"
      },
    },
    
    zhangrang: {
    窃政聚敛: {//梦终131
        name: 'skin_zhangrang_QieZhengJuLian2',
        x: [0, 0.5],
        y: [0, 0.5],
        scale: 0.88,
        background: 'skin_zhangrang_QieZhengJuLian_bg.png',
        skinName: "窃政聚敛"
       },
    },
    
    zhangqiying: {
    岁稔年丰:{//十周年48
				name: 'skin_zhangqiying_SuiRenNianFeng',
				x: [5, 0.5],
				y: [15, 0.4],
				scale: 0.42,
				background: 'skin_zhangqiying_SuiRenNianFeng_bg.png',
			},
    },
    
    zhanglu: {
    逐鹿天下: {//梦终130
        name: 'skin_zhanglu_ZhuLuTianXia2',
        x: [0, 0.4],
        y: [0, 0.5],
        scale: 0.78,
        angle: -10,
        background: 'skin_zhanglu_ZhuLuTianXia_bg.png',
        skinName: "逐鹿天下"
       },
    },
    
    re_zhangjiao: {
    迅雷风烈: {//梦终129+
        name: 'skin_zhangjiao_XunLeiFengLie',
        x: [0, 0.3],
        y: [0, 0.09],
        scale: 0.6,
        action: 'DaiJi',
        pos: {
        x: [0,0.8],         
        y: [0,0.4]  },
        background: 'skin_zhangjiao_XunLeiFengLie_bg.png',
        skinName: "迅雷风烈"
       },
    },
    
    snjs_sp_zhangjiao: {
    迅雷风烈: {//梦终129
        name: 'skin_zhangjiao_XunLeiFengLie',
        x: [0, 0.3],
        y: [0, 0.09],
        scale: 0.6,
        action: 'DaiJi',
        pos: {
        x: [0,0.8],         
        y: [0,0.4]  },
        background: 'skin_zhangjiao_XunLeiFengLie_bg.png',
        skinName: "迅雷风烈"
       },
    },
    
    re_zhangfei: {
    据水断桥: {//梦终128++
        name: 'skin_zhangfei_JuShuiDuanQiao',
        x: [0, 0],
        y: [0, 0.14],
        scale: 0.58,
        angle: 5,
        action: 'DaiJi',
        pos: {
        x: [0,0.8],         
        y: [0,0.4]  },
        background: 'skin_zhangfei_JuShuiDuanQiao_bg.png',
        skinName: "据水断桥"
      },
    },
    
    snjs_shen_zhangfei: {
    据水断桥: {//梦终128+
        name: 'skin_zhangfei_JuShuiDuanQiao',
        x: [0, 0],
        y: [0, 0.14],
        scale: 0.58,
        angle: 5,
        action: 'DaiJi',
        pos: {
        x: [0,0.8],         
        y: [0,0.4]  },
        background: 'skin_zhangfei_JuShuiDuanQiao_bg.png',
        skinName: "据水断桥"
      },
    },
    
    snjs_ex_zhangfei: {
    据水断桥: {//梦终128
        name: 'skin_zhangfei_JuShuiDuanQiao',
        x: [0, 0],
        y: [0, 0.14],
        scale: 0.58,
        angle: 5,
        action: 'DaiJi',
        pos: {
        x: [0,0.8],         
        y: [0,0.4]  },
        background: 'skin_zhangfei_JuShuiDuanQiao_bg.png',
        skinName: "据水断桥"
      },
    },
    
    zhangchunhua: {
    战场绝版: {//梦终127
        name: 'skin_zhangchunhua_ZhanChang2',
        x: [0, 0.54],
        y: [0, 0.55],
        scale: 0.75,
        angle: 10,
        background: 'skin_zhangchunhua_ZhanChang_bg.png',
        skinName: "战场绝版"
      },
    },
    
    re_zhangchunhua: {
    宣穆夜袭: {//梦终126
        name: 'skin_zhangchunhua_XuanMuYeXi',
        x: [0, 0.3],
        y: [0, 0.25],
        scale: 0.5,
        action: 'DaiJi',
        pos: {
        x: [0,0.8],         
        y: [0,0.4]  },
        //angle:5,
        
        background: 'skin_zhangchunhua_XuanMuYeXi_bg.png',
        skinName: "宣穆夜袭"
      },
    },
    
    zhangchangpu: {
    钟桂香蒲:{//十周年47
				name: 'skin_zhangchangpu_ZhongGuiXiangPu',
				x: [-5, 0.5],
				y: [5, 0.3],
				scale: 0.43,
				background: 'skin_zhangchangpu_ZhongGuiXiangPu_bg.png',
			},
    战场绝版: {//梦终125
        name: 'skin_zhangchangpu_ZhanChang2',
        x: [0, 0.4],
        y: [0, 0.5],
        scale: 0.75,
        background: 'skin_zhangchangpu_ZhanChang_bg.png',
        skinName: "战场绝版"
      },
    },
    
    ol_yujin: {
    威严毅重: {//梦终124
        name: 'skin_yujin_WeiYanYiZhong',
        x: [0, 0.15],
        y: [0, 0.29],
        scale: 0.43,
        action: 'DaiJi',
        pos: {
        x: [0,0.8],         
        y: [0,0.4]  },
        background: 'skin_yujin_WeiYanYiZhong_bg.png',
        
        skinName: "威严毅重"
      },
    },
    
    re_yuanshao: {
    一往无前: {//梦终123
        name: 'skin_yuanshao_YiWangWuQian',
        x: [0, 0.3],
        y: [0, -0.05],
        scale: 0.65,
        angle: -25,
        action: 'DaiJi',
        pos: {
        x: [0,0.8],         
        y: [0,0.4]  },
        background: 'skin_yuanshao_YiWangWuQian_bg.png',
        skinName: "一往无前"
      },
    },
    
    yangzhi: {
    妍芷艳质: {//梦终122
        name: 'skin_yangzhi_YanZhiYanZhi',
        x: [5, 0.4],
        y: [0, 0.42],
        scale: 0.73,
        hideSlots: ['yangzhi_qunzi3'],
        background: 'skin_yangyan_YanZhiYanZhi_bg.png',
        skinName: "妍芷艳质"
        },
    },
    
    yangyan: {
    妍芷艳质: {//梦终121
        name: 'skin_yangyan_YanZhiYanZhi',
        x: [5, 0.4],
        y: [0, 0.38],
        scale: 0.73,
        background: 'skin_yangyan_YanZhiYanZhi_bg.png',
        skinName: "妍芷艳质"
        },
    },
    
    yangwan: {
    星光淑婉:{//十周年46
				name: 'skin_yangwan_XingGuangShuWan',
				x: [5, 0.5],
				y: [0, 0.3],
				scale: 0.42,
				background: 'skin_yangwan_XingGuangShuWan_bg.png',
			},
    },
    
    yanghuiyu: {
    牛年中秋: {//梦终120
        name: 'skin_yanghuiyu_NiuNianZhongQiu',
        x: [0, -0.17],
        y: [0, 0.45],
        scale: 0.5,
        angle: 25,
        background: 'skin_yanghuiyu_NiuNianZhongQiu_bg.png',
        
        skinName: "牛年中秋"
       },
    },
    
    xuyou: {
    盛气凌人: {//梦终109
        name: 'skin_xuyou_ShengQiLingRen',
        x: [0, 0.47],
        y: [0, -0.18],
        scale: 0.75,
        action: 'DaiJi',
        pos: {
        x: [0,0.8],         
        y: [0,0.4]  },
        background: 'skin_xuyou_ShengQiLingRen_bg.png',
        skinName: "盛气凌人"
      },
    },
    
    xushi: {
    为夫弑敌:{//十周年45
				name: 'skin_xushi_WeiFuShiDi',
				x: [28, 0.5],
				y: [0, 0.3],
				scale: 0.42,
				background: 'skin_xushi_WeiFuShiDi_bg.png',
				hideSlots: ['xushi_piaodai2', 'xushi_piaodai8'],
			},
    },
    
    zq_shenxusheng: {
    新: {//新1
        name: 'skin_xusheng_xin',
        x: [0, 0.35],
        y: [0, 0.25],
        action: 'DaiJi',
        scale: 0.4,
        background: 'skin_xusheng_xin_bg.png',
        skinName: "新"
       },
    },
    
    xin_xusheng: {
    百里疑城: {//梦终108
        name: 'skin_xusheng_BaiLiYiCheng2',
        x: [0, 0.46],
        y: [0, 0.48],
        scale: 0.8,
        background: 'skin_xusheng_BaiLiYiCheng_bg.png',
        skinName: "百里疑城"
       },
    },
    
    xushao: {
    声名鹊起: {//梦终107
        name: 'skin_xushao_ShengMingQueQi2',
        x: [0, 0.55],
        y: [0, 0.51],
        scale: 0.7,
        background: 'skin_xushao_ShengMingQueQi_bg.png',
        skinName: "声名鹊起"
       },
    },
    
    xurong: {
    烬灭神骇: {//梦终106
        name: 'skin_xurong_JinMieShenHai',
        x: [0, 0.54],
        y: [0, 0.35],
        scale: 0.4,
        angle: -25,
        action: 'DaiJi',
        pos: {
        x: [0,0.75],
        y: [0,0.4]  },
        background: 'skin_xurong_JinMieShenHai_bg.png',
        skinName: "烬灭神骇"
       },
    },
    
    xunyu: {
    谋定天下: {//梦终105
        name: 'skin_xunyu_MouDingTianXia2',
        x: [0, 0.45],
        y: [0, 0.53],
        scale: 0.75,
        background: 'skin_xunyu_MouDingTianXia_bg.png',
        skinName: "谋定天下"
      },
    },
    
    xuhuang: {
    挥器扫敌: {//梦终104
        name: 'skin_xuhuang_HuiQiSaoDi2',
        x: [0, 0.57],
        y: [0, 0.55],
        scale: 0.82,
        angle: 10,
        background: 'skin_xuhuang_HuiQiSaoDi_bg.png',
        skinName: "挥器扫敌"
      },
    },
    
    xizhicai: {
    举棋若定: {//梦终103
        name: 'skin_xizhicai_JuQiRuoDing',
        x: [0, 0.50],
        y: [0, 0.3],
        scale: 0.5,
        angle: -28,
        
        action: 'DaiJi',
        pos: {
        x: [0,0.8],
        y: [0,0.4]  },
        background: 'skin_xizhicai_JuQiRuoDing_bg.png',
        skinName: "举棋若定"
      },
    },
    
    xinxianying: {
    英装素果:{//十周年44
				name: 'skin_xinxianying_YingZhuangSuGuo',
				x: [38, 0.5],
				y: 0,
				scale: 0.7,
				background: 'skin_xinxianying_YingZhuangSuGuo_bg.png',
			},
    },
    
    yj_ganning: {
    手杀: {//梦终102
        name: 'skin_xingganning_ShouSha',
        x: [0, 1.05],
        y: [0, 0.36],
        scale: 0.38,
        action: 'DaiJi',
        pos: {
        x: [0,0.8],
        y: [0,0.4]  },
        angle: -20,
        background: 'skin_xingganning_ShouSha_bg.png',
        skinName: "手杀"
      },
    },
    
    re_xiaoqiao: {
    花好月圆:{//十周年43
				name: 'skin_xiaoqiao_HuaHaoYueYuan',
				x: [-40, 0.5],
				y: [5, 0.1],
				scale: 0.5,
				background: 'skin_xiaoqiao_HuaHaoYueYuan_bg.png',
			},
    采莲江南:{//十周年42
				name: 'skin_xiaoqiao_CaiLianJiangNan',
				action: 'DaiJi',
				x: [105, 0.5],
				y: [15, 0.1],
				scale: 0.48,
				background: 'skin_xiaoqiao_HuaHaoYueYuan_bg.png',
				clipSlots: ['san', 'guang3_30'],
				hideSlots: ['guang3_30', 'bghua1', 'bgshitou1', 'bgshitou2', 'hehua1', 
					'hehua2', 'hehua3', 'hehua4', 'shuchong1', 'shuchong2', 'shugan',
					'shui1', 'shui2', 'shuimian', 'shuiwen1', 'shuiwen2', 'shuiwen3', 'qjhehua', 'heye2'],
			},
    如花似朵: {//梦终101
        name: 'skin_xiaoqiao_RuoHuaShiDuo',
        x: [0, 0.5],
        y: [0, 0.2],
        scale: 0.5,
        action: 'DaiJi',
        pos: {
        x: [0,0.8],
        y: [0,0.4]  },
        
        background: 'skin_xiaoqiao_RuoHuaShiDuo_bg.png',
        skinName: "如花似朵"
      },
    },
    
    ol_xiaoqiao: {
    矫情之花一: {//梦终100
        name: 'skin_xiaoqiao_JiaoQingZhiHua1',
        x: [0, 0.6],
        y: [0, 0.4],
        scale: 0.5,
        background: 'skin_xiaoqiao_JiaoQingZhiHua_bg.png',
        skinName: "矫情之花"
       },
    },
    
    xiahoushi: {
    战场绝版:{//十周年41
				name: 'skin_xiahoushi_ZhanChang',
				x: [-8, 0.5],
				y: [-5, 0.4],
				scale: 0.45,
				angle: -20,
				background: 'skin_xiahoushi_ZhanChang_bg.png',
			},
    星春侯福一: {//梦终99
        name: 'skin_xiahoushi_XingChunHouFu1',
        x: [0, 1.2],
        y: [0, 0.35],
        scale: 0.46,
        angle:-5,
        background: 'skin_xiahoushi_XingChunHouFu_bg.png',
        skinName: "星春侯福"
       },
    },
    
    xiahouba: {
    玄弓上阵: {//梦终98
        name: 'skin_xiahouba_XuanGongShangZhen2',
        x: [0, 0.55],
        y: [0, 0.55],
        scale: 0.7,
        angle: 5,
        background: 'skin_xiahouba_XuanGongShangZhen_bg.png',
        skinName: "玄弓上阵"
       },
    },
    
    wuxian: {    
    金玉满堂: {//十周年39
        name: 'skin_wuxian_JinYuManTang',
        x: [0, 0.5],
        y: [0, 0.48],
        scale: 0.72,
        background: 'skin_wuxian_JinYuManTang_bg.png',
        skinName: "金玉满堂"
        },
    金玉: {//十周年40
        name: 'skin_wuxian_JinYunFuMian',
        x: [0, 0.2],
        y: [0, 0.53],
        scale: 0.32,
        background: 'skin_wuxian_JinYunFuMian_bg.png',
        skinName: "金玉"
        },
    },
    
    wutugu: {
    鼠年春节: {//梦终97
        name: 'skin_wutugu_ShuNianChunJie',
        x: [0, 0.63],
        y: [0, 0.03],
        scale: 0.54,
        angle: -30,
        background: 'skin_wutugu_ShuNianChunJie_bg.png',
        
        skinName: "鼠年春节"
      },
    },
    
    wuguotai: {
    雍容雅步一: {//梦终96+
        name: 'skin_wuguotai_YongRongYaBu1',
        x: [0, 0.42],
        y: [0, 0.35],
        scale: 0.4,
        background: 'skin_wuguotai_YongRongYaBu_bg.png',
        skinName: "雍容雅步"
        },
    },
    
    re_wuguotai: {
    雍容雅步一: {//梦终96
        name: 'skin_wuguotai_YongRongYaBu1',
        x: [0, 0.42],
        y: [0, 0.35],
        scale: 0.4,
        background: 'skin_wuguotai_YongRongYaBu_bg.png',
        skinName: "雍容雅步"
        },
    },
    
    wangyue:{
    春悦桃秾: {//梦终95+
        name: 'skin_wangyue_ChunYueTaoNong2',
        x: [0, 0.5],
        y: [0, 0.5],
        scale: 0.77,
        background: 'skin_wangyue_ChunYueTaoNong_bg.png',
        skinName: "春悦桃秾"
       },
    },
    
    snjs_wangyue:{
    春悦桃秾: {//梦终95
        name: 'skin_wangyue_ChunYueTaoNong2',
        x: [0, 0.5],
        y: [0, 0.5],
        scale: 0.77,
        background: 'skin_wangyue_ChunYueTaoNong_bg.png',
        skinName: "春悦桃秾"
       },
    },
    
    wangyuanji: {
    鼠年冬至:{//十周年37
				name: 'skin_wangyuanji_ShuNianDongZhi',
				action: 'DaiJi',
				x: [-24, 0.5],
				y: [8, 0.5],
				scale: 0.6,
				background: 'skin_wangyuanji_ShuNianDongZhi_bg.png',
			},
    },
    
    re_wangyi: {
    绝色异彩:{//十周年36
				name: 'skin_wangyi_JueSeYiCai',
				x: [16, 0.5],
				y: [10, 0.3],
				scale: 0.42,
				background: 'skin_wangyi_JueSeYiCai_bg.png',
			},
    },
    
    wangtao:{
    春悦桃秾: {//梦终94+
        name: 'skin_wangtao_ChunYueTaoNong2',
        x: [0, 0.55],
        y: [0, 0.48],
        scale: 0.9,
        background: 'skin_wangtao_ChunYueTaoNong_bg.png',
        skinName: "春悦桃秾"
       },
    },
    
    snjs_wangtao:{
    春悦桃秾: {//梦终94
        name: 'skin_wangtao_ChunYueTaoNong2',
        x: [0, 0.55],
        y: [0, 0.48],
        scale: 0.9,
        background: 'skin_wangtao_ChunYueTaoNong_bg.png',
        skinName: "春悦桃秾"
       },
    },
    
    wangrong: {
    云裳花容:{//十周年35
				name: 'skin_wangrong_YunShangHuaRong',
				x: [0, 0.5],
				y: [0, 0.5],
				scale: 0.8,
				background: 'skin_wangrong_YunShangHuaRong_bg.png',
			},
    },
    
    wanglang: {
    龙袭星落: {//梦终93
        name: 'skin_wanglang_LongXingLuo',
        x: [0, 0.05],
        y: [5, 0.29],
        scale: 0.45,
        background: 'skin_wanglang_LongXingLuo_bg.png',
        
        skinName: "龙袭星落"
      },
    },
    
    tangji:{
    福泽金蕊:{//梦终92
		name: 'skin_tangji_FuZeJinRui2',
		x: [0, 0.5],
		y: [0, 0.45],
		scale: 0.9,
		background: 'skin_tangji_FuZeJinRui_bg.png',
		},
    },
    
    sunxiu: {
    君临即位: {//梦终91
        name: 'skin_sunxiu_JunLinJiWei2',
        x: [0, 0.4],
        y: [0, 0.5],
        scale: 0.75,
        background: 'skin_sunxiu_JunLinJiWei_bg.png',
        skinName: "君临即位"
       },
    },
    
    sunru: {
    鱼游濠水: {//梦终90
        name: 'skin_sunru_YuYouHaoShui',
        x: [0, 0.66],
        y: [0, 0.09],
        scale: 0.58,
        
        angle: -10,
        action: 'DaiJi',
        pos: {
        x: [0,0.8],
        y: [0,0.4]  },
        background: 'skin_sunru_YuYouHaoShui_bg.png',
        skinName: "鱼游濠水"
      },
    },
    
    re_sunquan: {
    吴王六剑: {//梦终89+
        name: 'skin_sunquan_WuWangLiuJian',
        x: [0, 0.53],
        y: [0, 0.3],
        scale: 0.4,
        
        action: 'DaiJi',
        pos: {
        x: [0,0.8],
        y: [0,0.4]  },
        background: 'skin_sunquan_WuWangLiuJian_bg.png',
        skinName: "吴王六剑"
      },
    },
    
    snjs_shen_sunquan: {
    吴王六剑: {//梦终89
        name: 'skin_sunquan_WuWangLiuJian',
        x: [0, 0.53],
        y: [0, 0.3],
        scale: 0.4,
        
        action: 'DaiJi',
        pos: {
        x: [0,0.8],
        y: [0,0.4]  },
        background: 'skin_sunquan_WuWangLiuJian_bg.png',
        skinName: "吴王六剑"
      },
    },
    
    re_sunluyu: {
    娇俏伶俐: {//梦终88
        name: 'skin_sunluyu_JiaoQiaoLingLi2',
        x: [-10, 0.58],
        y: [20, 0.38],
        scale: 0.8,
        background: 'skin_sunluyu_JiaoQiaoLingLi_bg.png',
        skinName: "娇俏伶俐"
      },
    },
    
    hl_sunluyu: {
    牛年端午: {//梦终87
        name: 'skin_sunluyu_NiuNianDuanWu',
        x: [0, 0.15],
        y: [0, 0.25],
        scale: 0.45,
        //angle:-15,
        
        background: 'skin_sunluyu_NiuNianDuanWu_bg.png',
        skinName: "牛年端午"
      },
    },
    
    sunluyu: {
    沅茞香兰: {//梦终86
        name: 'skin_sunluyu_YuanChaiXianglan2',
        x: [0, 0.5],
        y: [0, 0.51],
        scale: 0.8,
        background: 'skin_sunluyu_YuanChaiXianglan_bg.png',
        skinName: "沅茞香兰"
      },
    },
    
    sunluban: {
    沅茝香兰:{//十周年32
				name: 'skin_sunluban_YuanChaiXiangLan',
				x: [10, 0.5],
				y: [12, 0.1],
				scale: 0.55,
				background: 'skin_sunluban_YuanChaiXiangLan_bg.png',
			},
    宵靥谜君: {//梦终85
        name: 'skin_sunluban_XiaoYeMiJun2',
        x: [0, 0.5],
        y: [0, 0.5],
        scale: 0.8,
        background: 'skin_sunluban_XiaoYeMiJun_bg.png',
        skinName: "宵靥谜君"
      },
    },
        
    re_sunluban: {
    沅茝香兰:{//十周年32+
				name: 'skin_sunluban_YuanChaiXiangLan',
				x: [10, 0.5],
				y: [12, 0.1],
				scale: 0.55,
				background: 'skin_sunluban_YuanChaiXiangLan_bg.png',
			},
    倚虎弄权一: {//梦终84+
        name: 'skin_sunluban_YiHuNongQuan1',
        x: [0, 0.22],
        y: [0, 0.23],
        scale: 0.4,
        background: 'skin_sunluban_YiHuNongQuan_bg.png',
        skinName: "倚虎弄权"
        },
    },
    
    xin_sunluban: {
    沅茝香兰:{//十周年32++
				name: 'skin_sunluban_YuanChaiXiangLan',
				x: [10, 0.5],
				y: [12, 0.1],
				scale: 0.55,
				background: 'skin_sunluban_YuanChaiXiangLan_bg.png',
			},
    倚虎弄权一: {//梦终84
        name: 'skin_sunluban_YiHuNongQuan1',
        x: [0, 0.22],
        y: [0, 0.23],
        scale: 0.4,
        background: 'skin_sunluban_YiHuNongQuan_bg.png',
        skinName: "倚虎弄权"
        },
    },
        
    sunliang: {
    诡谲困玺: {//梦终83
        name: 'skin_sunliang_GuiJueKunXi2',
        x: [0, 0.36],
        y: [0, 0.5],
        scale: 0.8,
        background: 'skin_sunliang_GuiJueKunXi_bg.png',
        skinName: "诡谲困玺"
       },
    },
    
    sunhao: {
	翠流金阙:{//十周年31
        name: 'skin_sunhao_CuiLiuJinQue',
        x: [0, 0.55],
        y: [0, 0.55],
        scale: 0.68,
        background: 'skin_sunhao_CuiLiuJinQue_bg.png',
       },
    },
    
    sundeng: {
    鹊星夕情: {//梦终82
        name: 'skin_sundeng_QueXingXiQing2',
        x: [0, 0.53],
        y: [0, 0.52],
        scale: 0.7,
        background: 'skin_sundeng_QueXingXiQing_bg.png',  
        skinName: "鹊星夕情"
       },
    },
    
    sunce: {
    猪年七夕: {//梦终81
        name: 'skin_sunce_ZhuNianQiXi',
        x: [0, 0.8],
        y: [0, 0.15],
        scale: 0.55,
        //angle:25,
        
        background: 'skin_sunce_ZhuNianQiXi_bg.png',
        skinName: "猪年七夕"
       },
    },
    
    snjs_ex_sunce: {
    猪年七夕: {//梦终80
        name: 'skin_sunce_ZhuNianQiXi',
        x: [0, 0.8],
        y: [0, 0.15],
        scale: 0.55,
        //angle:25,
        
        background: 'skin_sunce_ZhuNianQiXi_bg.png',
        skinName: "猪年七夕"
       },
    },
    
    sp_sufei: {
    肝胆相照: {//梦终79
        name: 'skin_sufei_GanDanXiangZhao',
        x: [0, 0.91],
        y: [0, 0],
        scale: 0.7,
        
        background: 'skin_sufei_GanDanXiangZhao_bg.png',
        skinName: "肝胆相照"
      },
    },
    
    re_simayi: {
    鹰视狼顾: {//梦终78+
        name: 'skin_simayi_YingShiLangGu',
        x: [0, 0.45],
        y: [0, 0.15],
        scale: 0.55,
        
        action: 'DaiJi',
        pos: {
        x: [0,0.8],
        y: [0,0.4]  },
        background: 'skin_simayi_YingShiLangGu_bg.png',
        skinName: "鹰视狼顾"
       },
    },
    
    snjs_ex_simayi: {
    鹰视狼顾: {//梦终78
        name: 'skin_simayi_YingShiLangGu',
        x: [0, 0.45],
        y: [0, 0.15],
        scale: 0.55,
        
        action: 'DaiJi',
        pos: {
        x: [0,0.8],
        y: [0,0.4]  },
        background: 'skin_simayi_YingShiLangGu_bg.png',
        skinName: "鹰视狼顾"
       },
    },
    
    simashi: {
    牛年中秋: {//梦终77
        name: 'skin_simashi_NiuNianZhongQiu',
        x: [0, -0.05],
        y: [0, 0.23],
        scale: 0.5,
        background: 'skin_simashi_NiuNianZhongQiu_bg.png',
        
        skinName: "牛年中秋"
       },
    },
    
    simahui: {
    教诲不倦: {//梦终76
        name: 'skin_simahui_JiaoHuiBuJuan2',
        x: [0, 0.475],
        y: [0, 0.55],
        scale: 0.77,
        background: 'skin_simahui_JiaoHuiBuJuan_bg.png',
        skinName: "教诲不倦"
       },
    },
    
    sunshangxiang: {
    魅影剑舞:{//十周年33
				name: 'skin_sunshangxiang_MeiYingJianWu',
				x: [-5, 0.5],
				y: [10, 0.2],
				scale: 0.42,
				background: 'skin_sunshangxiang_MeiYingJianWu_bg.png',
			},
    },
    
    re_sunshangxiang: {
    星流霆击: {//梦终75
        name: 'skin_sunshangxiang_XingLiuTingJi',
        x: [0, -0.45],
        y: [0, 0.42],
        scale: 0.45,        
        action: 'DaiJi',
        pos: {
        x: [0,0.8],
        y: [0,0.4]  },
        
        background: 'skin_sunshangxiang_XingLiuTingJi_bg.png',
        skinName: "星流霆击"
      },
    },
    
    sp_sunshangxiang: {
			花曳心牵:{//十周年29
				name: 'skin_shuxiangxiang_HuaYeXinQian',
				x: [0, 0.5],
				y: [0, 0.5],
				scale: 0.8,
				background: 'skin_shuxiangxiang_HuaYeXinQian_bg.png',
			},
    明良千古: {//梦终74
        name: 'skin_shuxiangxiang_MingLiangQianGu',
        x: [15, -0.2],
        y: [0, 0.2],
        scale: 0.4,
        //angle:6.5,
        action: 'DaiJi',
        pos: {
        x: [0,0.8],
        y: [0,0.4]  },
        
        background: 'skin_shuxiangxiang_MingLiangQianGu_bg.png',
        skinName: "明良千古"
      },
    },
    
    shen_zhouyu: {
    焰腾麒麟: {//梦终73+
        name: 'skin_shenzhouyu_YanTengQiLin',
        x: [0, -0.2],
        y: [0, 0.42],
        scale: 0.63,
        angle: -10,
        background: 'skin_shenzhouyu_YanTengQiLin_bg.png',
        
        skinName: "焰腾麒麟"
      },
    },
    
    snjs_re_shen_zhouyu: {
    焰腾麒麟: {//梦终73
        name: 'skin_shenzhouyu_YanTengQiLin',
        x: [0, -0.2],
        y: [0, 0.42],
        scale: 0.63,
        angle: -10,
        background: 'skin_shenzhouyu_YanTengQiLin_bg.png',
        
        skinName: "焰腾麒麟"
      },
    },
    
    shen_zhaoyun: {
    战龙在野: {//梦终72
        name: 'skin_shenzhaoyun_ZhanLongZaiYe',
        x: [0, 0.7],
        y: [0, 0.3],
        scale: 0.77,
        action: 'DaiJi',
        pos: {
        x: [0,0.8],
        y: [0,0.4]  },
        background: 'skin_shenzhaoyun_ZhanLongZaiYe_bg.png',
        
        skinName: "战龙在野"
       },
    },
    
    shen_xunyu: {
    虎年清明: {//梦终71
        name: 'skin_shenxunyu_HuNianQingMing',
        x: [0, 0.53],
        y: [0, 0.28],
        scale: 0.46,
        
        background: 'skin_shenxunyu_HuNianQingMing_bg.png',
        skinName: "虎年清明"
      },
    },
    
    shen_simayi: {
    鉴往知来: {//梦终70+
        name: 'skin_shensimayi_JianWangZhiLai',
        x: [0, 0.53],
        y: [0, 0.12],
        scale: 0.55,
        
        action: 'DaiJi',
        pos: {
        x: [0,0.8],
        y: [0,0.4]  },
        background: 'skin_shensimayi_JianWangZhiLai_bg.png',
        skinName: "鉴往知来"
      },
    },
    
    snjs_re_shen_simayi: {
    鉴往知来: {//梦终70
        name: 'skin_shensimayi_JianWangZhiLai',
        x: [0, 0.53],
        y: [0, 0.12],
        scale: 0.55,
        
        action: 'DaiJi',
        pos: {
        x: [0,0.8],
        y: [0,0.4]  },
        background: 'skin_shensimayi_JianWangZhiLai_bg.png',
        skinName: "鉴往知来"
      },
    },
    
    shen_lvmeng: {
    兼资文武: {//梦终69+
        name: 'skin_shenlvmeng_JianZiWenWu',
        x: [0, 0.11],
        y: [0, 0.33],
        scale: 0.4,
        
        action: 'DaiJi',
        pos: {
        x: [0,0.8],
        y: [0,0.4]  },
        background: 'skin_shenlvmeng_JianZiWenWu_bg.png',
        skinName: "兼资文武"
       },
    },
    
    snjs_re_shen_lvmeng: {
    兼资文武: {//梦终69
        name: 'skin_shenlvmeng_JianZiWenWu',
        x: [0, 0.11],
        y: [0, 0.33],
        scale: 0.4,
        
        action: 'DaiJi',
        pos: {
        x: [0,0.8],
        y: [0,0.4]  },
        background: 'skin_shenlvmeng_JianZiWenWu_bg.png',
        skinName: "兼资文武"
       },
    },
    
    shen_lvbu: {
    冠绝天下: {//梦终68+
        name: 'skin_shenlvbu_GuanJueTianXia',
        x: [0, 0.8],
        y: [0, 0.3],
        scale: 0.42,
        
        angle:5,
        action: 'DaiJi',
        pos: {
        x: [0,0.8],
        y: [0,0.4]  },
        background: 'skin_shenlvbu_GuanJueTianXia_bg.png',
        skinName: "冠绝天下"
      },
    },
    
    snjs_re_shen_lvbu: {
    冠绝天下: {//梦终68
        name: 'skin_shenlvbu_GuanJueTianXia',
        x: [0, 0.8],
        y: [0, 0.3],
        scale: 0.42,
        
        angle:5,
        action: 'DaiJi',
        pos: {
        x: [0,0.8],
        y: [0,0.4]  },
        background: 'skin_shenlvbu_GuanJueTianXia_bg.png',
        skinName: "冠绝天下"
      },
    },
    
    shen_luxun: {
    绽焰摧枯: {//梦终67+
        name: 'skin_shenluxun_ZhanYanCuiKu',
        x: [0, 0.53],
        y: [5, 0.45],
        scale: 0.55,
        
        action: 'DaiJi',
        pos: {
        x: [0,0.8],
        y: [0,0.4]  },
        background: 'skin_shenluxun_ZhanYanCuiKu_bg.png',
        skinName: "绽焰摧枯"
      },
    },
    
    snjs_re_shen_luxun: {
    绽焰摧枯: {//梦终67
        name: 'skin_shenluxun_ZhanYanCuiKu',
        x: [0, 0.53],
        y: [5, 0.45],
        scale: 0.55,
        
        action: 'DaiJi',
        pos: {
        x: [0,0.8],
        y: [0,0.4]  },
        background: 'skin_shenluxun_ZhanYanCuiKu_bg.png',
        skinName: "绽焰摧枯"
      },
    },
    
    shen_liubei: {
    昭烈怒火: {//梦终66+
        name: 'skin_shenliubei_ZhaoLieNuHuo2',
        x: [0, 0.5],
        y: [0, 0.62],
        scale: 0.66,
        background: 'skin_shenliubei_ZhaoLieNuHuo_bg.png',
        skinName: "昭烈怒火"
      },
    },
    
    snjs_re_shen_liubei: {
    昭烈怒火: {//梦终66
        name: 'skin_shenliubei_ZhaoLieNuHuo2',
        x: [0, 0.5],
        y: [0, 0.62],
        scale: 0.66,
        background: 'skin_shenliubei_ZhaoLieNuHuo_bg.png',
        skinName: "昭烈怒火"
      },
    },
    
    shen_guojia: {
    虎年清明: {//梦终65
        name: 'skin_shenguojia_HuNianQingMing',
        x: [110, 0.5],
        y: [0, 0.6],
        scale: 0.5,
        
        background: 'skin_shenguojia_HuNianQingMing_bg.png',
        skinName: "虎年清明"
    },
			倚星折月: {
				name: "shen_guojia/XingXiang/XingXiang",
				x: [0,-0.21],
				y: [0,0.42],
				scale: 0.43,
				gongji: {
					x: [0, 0.7],
					y: [0, 0.45]
				},
				beijing: {
					"name":"shen_guojia/XingXiang/BeiJing",
					"scale":0.43
				},
				audio: {  // 语音
					skill: 'shen_guojia/audio/skill',  // 填写技能语音的路径
					card: 'shen_guojia/audio/card',   // 填写专属卡牌语音的路径
				},
				special: {
					变身: {
						name: 'shen_guojia/倚星折月1', // 不同骨骼, 不填写表示同一个骨骼, 填写的话格式为 'hetaihou/战场绝版'  角色名+皮肤名称
					},
					playxiandingji: {
						name: 'shen_guojia/XingXiang/XingXiang',
						action: 'GongJi',
						x: [0, 0.8],
						y: [0, 0.4],
						scale: 0.6,
						speed: 1.05,
					},
					此处可以任意名字: {
						name: 'shen_guojia/teshu/LR_eff_gongming',  // 特效name
						x: [0, 0.5],
						y: [0, 0.5],
						scale: 2,
						speed: 0.8,
						json: true,
					},
					condition: {
						// 觉醒变身
						juexingji: {
							transform: "变身",  // 设置血量需要变换的骨骼
							// audio: 'shen_guojia/audio/victory', // 触发限定技时候播放的语音
						},
						xiandingji: {
							// transform: "变身",  // 设置血量需要变换的骨骼
							play: 'playxiandingji',
							audio: 'shen_guojia/audio/其他/zhugeliang_WuHouCi', // 触发限定技时候播放的语音
						},
						// 每种条件都可以播放一段动画或者播放语音或者变身, 例如下面就是添加击杀后只播放一段胜利语音
						jisha: {
							play: '此处可以任意名字',  // 和上面定义的对应就行
							audio: 'shen_guojia/audio/skill/victory'
						},
						// 受伤时机
						// damage: {
						// 	// transform: '变身',
						// 	audio: 'shen_guojia/audio/其他/zhugeguo_XianChiQiWu'
						// }
					}
				}
			},
			倚星折月1: {
				name: "shen_guojia/XingXiang1/XingXiang1",
				x: [0,-0.21],
				y: [0,0.42],
				scale: 0.43,
				gongji: {
					"x":[0,0.7],
					"y":[0,0.45]
				},
				beijing: {
					"name":"shen_guojia/XingXiang1/BeiJing1",
					"scale":0.43
				},
				audio: {  // 语音
					skill: 'shen_guojia/audio/skill',  // 填写技能的路径
					card: 'shen_guojia/audio/card',   // 填写基本牌的路径
				},
			},
    },
    
    shen_guanyu: {
    链狱鬼神: {//梦终64
        name: 'skin_shenguanyu_LianYuGuiShen2',
        x: [0, 0.46],
        y: [0, 0.57],
        scale: 0.7,
        background: 'skin_shenguanyu_LianYuGuiShen_bg.png',
        skinName: "链狱鬼神"
      },
    },
    
    snjs_re_shen_guanyu: {
    链狱鬼神: {//梦终63
        name: 'skin_shenguanyu_LianYuGuiShen2',
        x: [0, 0.46],
        y: [0, 0.57],
        scale: 0.7,
        background: 'skin_shenguanyu_LianYuGuiShen_bg.png',
        skinName: "链狱鬼神"
      },
    },
    
    shen_ganning: {
    万人辟易: {//梦终62+
        name: 'skin_shenganning_WanRenPiYi',
        x: [0, 0.35],
        y: [0, 0.25],
        angle: 23,
        action: 'DaiJi',
        pos: {
        x: [0,0.8],
        y: [0,0.4]  },
        scale: 0.40,
        
        background: 'skin_shenganning_WanRenPiYi_bg.png',
        },
    万人辟易笑脸: {//十周年54
        name: 'skin_shenganning_WanRenPiYi_xiao',
        x: [0, 0.35],
        y: [0, 0.25],
        angle: 23,
        scale: 0.40,
        action: 'DaiJi',
        background: 'skin_shenganning_WanRenPiYi_bg.png',
        },
    },
    
    snjs_re_shen_ganning: {
    万人辟易: {//梦终62
        name: 'skin_shenganning_WanRenPiYi',
        x: [0, 0.35],
        y: [0, 0.25],
        angle: 23,
        action: 'DaiJi',
        pos: {
        x: [0,0.8],
        y: [0,0.4]  },
        scale: 0.40,
        
        background: 'skin_shenganning_WanRenPiYi_bg.png',
      },
    },
    
    shen_caocao: {
    玄天通冥: {//梦终61+
        name: 'skin_shencaocao_XuanTianTongMing',
        x: [0, 0.6],
        y: [0, -0.2],
        scale: 0.75,
        
        background: 'skin_shencaocao_XuanTianTongMing_bg.png',
        skinName: "玄天通冥"		
       },
    },
    
    snjs_re_shen_caocao: {
    玄天通冥: {//梦终61
        name: 'skin_shencaocao_XuanTianTongMing',
        x: [0, 0.6],
        y: [0, -0.2],
        scale: 0.75,
        
        background: 'skin_shencaocao_XuanTianTongMing_bg.png',
        skinName: "玄天通冥"		
       },
    },
    
    shamoke: {
    狂喜胜战: {//梦终60
        name: 'skin_shamoke_KuangXiShengZhan2',
        x: [0, 0.55],
        y: [0, 0.5],
        scale: 0.8,
        angle: 0,
        background: 'skin_shamoke_KuangXiShengZhan_bg.png',
        skinName: "狂喜胜战"
       },
    },
    
    ruanyu: {
    墨卷浩瀚: {//十周年28
        name: 'skin_ruanyu_MoJuanHaoHan',
        x: [0, 0.43],
        y: [0, 0.54],
        scale: 0.84,
        angle: -10,
        background: 'skin_ruanyu_MoJuanHaoHan_bg.png',
      },
    },
    
    qinmi :{
    冠绝天下:{//梦终59
		name: 'skin_qinmi_GuanJueTianXia',
	    x: [0, 0.5],
		y: [0, 0.52],
		scale: 0.4,
        action: 'DaiJi',
        pos: {
        x: [0,0.8],
        y: [0,0.4]  },
		
	    angle:-5,
		background: 'skin_qinmi_GuanJueTianXia_bg.png',
       },
    },
    
    panshu: {
    繁囿引芳:{//十周年26
				name: 'skin_panshu_FanYouYinFang',
				x: [100, 0.5],
				y: [10, 0.3],
				scale: 0.52,
				background: 'skin_panshu_FanYouYinFang_bg.png',
			},
    },
    
    pangtong: {
    谋定天下: {//梦终58+
        name: 'skin_pangtong_MouDingTianXia2',
        x: [0, 0.3],
        y: [0, 0.6],
        scale: 0.85,
        background: 'skin_pangtong_MouDingTianXia_bg.png',
        skinName: "谋定天下"
       },
    },
    
    re_pangtong: {
    新: {//新2
        name: 'skin_pangtong_xin',
        x: [0, 0.3],
        y: [0, 0.6],
        scale: 0.85,
        action: 'DaiJi',
        background: 'skin_pangtong_xin_bg.png',
        skinName: "谋定天下"
       },
    },
    
    ol_pangtong: {
    谋定天下: {//梦终58
        name: 'skin_pangtong_MouDingTianXia2',
        x: [0, 0.3],
        y: [0, 0.6],
        scale: 0.85,
        background: 'skin_pangtong_MouDingTianXia_bg.png',
        skinName: "谋定天下"
       },
    },
    
    pangdegong: {
    超脱于世: {//梦终57
        name: 'skin_pangdegong_ChaoTuoYuShi',
        x: [0, 0.5],
        y: [5, 0.12],
        scale: 0.6,
        action: 'DaiJi',
        pos: {
        x: [0,0.8],
        y: [0,0.4]  },
        
        angle: 10,
        background: 'skin_pangdegong_ChaoTuoYuShi_bg.png',
        skinName: "超脱于世"
      },
    },
    
    miheng: {
    击鼓骂曹: {//梦终56
        name: 'skin_miheng_JiGuMaCao',
        x: [0, 0.26],
        y: [5, 0.2],
        scale: 0.65,
        action: 'DaiJi',
        pos: {
        x: [0,0.8],
        y: [0,0.4]  },
        
        background: 'skin_miheng_JiGuMaCao_bg.png',
        skinName: "击鼓骂曹"
      },
    },
    
    sp_mifuren: {
    香消玉殒一: {//梦终55
        name: 'skin_mifuren_XiangXiaoYuYun1',
        x: [0, 0.7],
        y: [0, 0.35],
        scale: 0.37,
        angle: -30,
        background: 'skin_mifuren_XiangXiaoYuYun_bg.png',
        skinName: "香消玉殒"
      },
    },
    
    mayunlu: {
    战场绝版:{//十周年25
				name: 'skin_mayunlu_ZhanChang',
				x: [88, 0.5],
				y: [0, 0.1],
				scale: 0.65,
				background: 'skin_mayunlu_ZhanChang_bg.png',
			},
    },
    
    snjs_re_mayunlu: {
    战场绝版:{//十周年25+
				name: 'skin_mayunlu_ZhanChang',
				x: [88, 0.5],
				y: [0, 0.1],
				scale: 0.65,
				background: 'skin_mayunlu_ZhanChang_bg.png',
			},
    },
    
    maliang: {
    千计卷来: {//梦终54
        name: 'skin_maliang_QianJiJuanLai',
        x: [0, 0.7],
        y: [5, 0.23],
        scale: 0.6,
        background: 'skin_miheng_JiGuMaCao_bg.png',
        skinName: "千计卷来"
      },
    },
    
    re_machao: {
    虚拟天团: {//十周年24
                name: 'skin_machao_XuNiTianTuan',
                x: [0, 0.5],
                y: [0, 0.52],
                scale: 0.68,
                background: 'skin_machao_XuNiTianTuan_bg.png',
            },
    西凉雄狮: {//十周年23
        name: 'skin_machao_XiLiangXiongShi',
        x: [0, 0.5],
        y: [0, 0.3],
        scale: 0.52,
        action: 'DaiJi',
        pos: {
        x: [0,0.8],
        y: [0,0.4]  },
        background: 'skin_machao_XiLiangXiongShi_bg.png',
        skinName: "西凉雄狮"
        },
    },
    
    snjs_ex_machao: {
    西凉雄狮: {//十周年23+
        name: 'skin_machao_XiLiangXiongShi',
        
        x: [0, 0.5],
        y: [0, 0.3],
        scale: 0.52,
        action: 'DaiJi',
        pos: {
        x: [0,0.8],
        y: [0,0.4]  },
        background: 'skin_machao_XiLiangXiongShi_bg.png',
        skinName: "西凉雄狮"
      },
    },
    
    lvmeng: {
    清雨踏春: {//梦终53
        name: 'skin_lvmeng_QingYuTaChun2',
        x: [0, 0.5],
        y: [0, 0.42],
        scale: 0.95,
        angle: -5,
        background: 'skin_lvmeng_QingYuTaChun_bg.png',
        skinName: "清雨踏春"
      },
    },
    
    lvlingqi:{
    赤焱流金:{//梦终52+
		name: 'skin_lvlingqi_ChiYanLiuJin2',
		x: [0 , 0.5],
		y: [0 , 0.45],
		scale: 0.8,
		background: 'skin_lvlingqi_ChiYanLiuJin_bg.png',
		},
    },
    
    snjs_sp_lvlingqi:{
    赤焱流金:{//梦终52
		name: 'skin_lvlingqi_ChiYanLiuJin2',
		x: [0 , 0.5],
		y: [0 , 0.45],
		scale: 0.8,
		background: 'skin_lvlingqi_ChiYanLiuJin_bg.png',
		},
    },
    
    luyusheng: {
    玉桂月满:{//十周年22
				name: 'skin_luyusheng_YuGuiYueMan',
				x: [-25, 0.5],
				y: [16, 0.3],
				scale: 0.5,
				background: 'skin_luyusheng_YuGuiYueMan_bg.png',
			},
    },
    
    re_luxun: {
    谋定天下一: {//梦终51+
        name: 'skin_luxun_MouDingTianXia1',
        x: [0, 0.25],
        y: [0, 0.15],
        scale: 0.6,
        background: 'skin_luxun_MouDingTianXia_bg.png',
        skinName: "谋定天下"
       },
    },
    
    snjs_ex_luxun: {
    谋定天下一: {//梦终51
        name: 'skin_luxun_MouDingTianXia1',
        x: [0, 0.25],
        y: [0, 0.15],
        scale: 0.6,
        background: 'skin_luxun_MouDingTianXia_bg.png',
        skinName: "谋定天下"
       },
    },
    
    lusu: {
    缔造联盟: {//梦终50+
        name: 'skin_lusu_DiZhaoLianMeng2',
        x: [0, 0.44],
        y: [0, 0.54],
        scale: 0.8,
        background: 'skin_lusu_DiZhaoLianMeng_bg.png',
        skinName: "缔造联盟"
       },
    },
    
    snjs_sp_lusu: {
    缔造联盟: {//梦终50
        name: 'skin_lusu_DiZhaoLianMeng2',
        x: [0, 0.44],
        y: [0, 0.54],
        scale: 0.8,
        background: 'skin_lusu_DiZhaoLianMeng_bg.png',
        skinName: "缔造联盟"
       },
    },
    
    lukang: {
    毁堰破晋: {//梦终49
        name: 'skin_lukang_HuiYanPoJin2',
        x: [10, 0.4],
        y: [5, 0.5],
        scale: 0.68,
        background: 'skin_lukang_HuiYanPoJin_bg.png',
        skinName: "毁堰破晋"
        },
    },
    
    luji: {
    星熠心移: {//梦终48
        name: 'skin_luji_XinYiXinYi2',
        x: [0, 0.3],
        y: [0, 0.43],
        scale: 0.92,
        angle: -20,
        background: 'skin_luji_XinYiXinYi_bg.png',
        skinName: "星熠心移"
      },
    },
    
    liuzan: {
    灵魂歌王: {//十周年21
        name: 'skin_liuzan_LinɡHunGeWang',
        x: [0, -0.3],
        y: [0, 0.13],
        scale: 0.45,
        angle: 10,
        background: 'skin_liuzan_LinɡHunGeWang_bg.png',
        action: 'DaiJi',
      },
    抗音而歌: {//梦终47+
        name: 'skin_liuzan_KanɡYinErGe',
        x: [0, 0.53],
        y: [0, 0.02],
        scale: 0.55,
        angle: -5,
        action: 'DaiJi',
        pos: {
        x: [0,0.8],
        y: [0,0.4]  },
        background: 'skin_liuzan_KanɡYinErGe_bg.png',
        
        skinName: "抗音而歌"
      },
    },
    
    re_liuzan: {
    灵魂歌王: {//十周年21+
        name: 'skin_liuzan_LinɡHunGeWang',
        x: [0, -0.3],
        y: [0, 0.13],
        scale: 0.45,
        angle: 10,
        background: 'skin_liuzan_LinɡHunGeWang_bg.png',
        action: 'DaiJi',
      },
    抗音而歌: {//梦终47
        name: 'skin_liuzan_KanɡYinErGe',
        x: [0, 0.53],
        y: [0, 0.02],
        scale: 0.55,
        angle: -5,
        action: 'DaiJi',
        pos: {
        x: [0,0.8],
        y: [0,0.4]  },
        background: 'skin_liuzan_KanɡYinErGe_bg.png',
        
        skinName: "抗音而歌"
      },
    },
    
    liuyan: {
    雄踞益州: {//梦终46+
        name: 'skin_liuyan_XiongJuYiZhou',
        x: [0, 0.55],
        y: [0, 0.1],
        
        speed: 1,
        action: 'DaiJi',
        pos: {
        x: [0,0.7],
        y: [0,0.45]  },
        scale: 0.55,
        background: 'skin_liuyan_XiongJuYiZhou_bg.png',
        skinName: "雄踞益州"
       },
    },
    
    snjs_shen_liuyan: {
    雄踞益州: {//梦终46
        name: 'skin_liuyan_XiongJuYiZhou',
        x: [0, 0.55],
        y: [0, 0.1],
        
        speed: 1,
        action: 'DaiJi',
        pos: {
        x: [0,0.7],
        y: [0,0.45]  },
        scale: 0.55,
        background: 'skin_liuyan_XiongJuYiZhou_bg.png',
        skinName: "雄踞益州"
       },
    },
    
    liuxie: {
    龙困于渊: {//梦终45
        name: 'skin_liuxie_LongKunYuYuan',
        x: [0, 0.28],
        y: [0, 0.35],
        scale: 0.5,
        action: 'DaiJi',
        pos: {
        x: [0,0.8],
        y: [0,0.4]  },
        
        background: 'skin_liuxie_LongKunYuYuan_bg.png',
        skinName: "龙困于渊"
      },
    },
    
    ol_liushan: {
    虚拟天团: {//梦终44+
        name: 'skin_liushan_XuNiTianTuan2',
        x: [0, 0.52],
        y: [0, 0.5],
        scale: 0.75,
        //angle: -10,
        background: 'skin_liushan_XuNiTianTuan_bg.png',
        skinName: "虚拟天团"
       },
    },
    
    snjs_ex_liushan: {
    虚拟天团: {//梦终44
        name: 'skin_liushan_XuNiTianTuan2',
        x: [0, 0.52],
        y: [0, 0.5],
        scale: 0.75,
        //angle: -10,
        background: 'skin_liushan_XuNiTianTuan_bg.png',
        skinName: "虚拟天团"
       },
    },
    
    liufeng: {
    立嗣陷危: {//梦终43
        name: 'skin_liufeng_LiSiXianWei2',
        x: [0, 0.58],
        y: [0, 0.6],
        scale: 0.85,
        background: 'skin_liufeng_LiSiXianWei_bg.png',
        skinName: "立嗣陷危"
       },
    },
    
    liubian: {
    少帝龙威: {//十周年20
        name: 'skin_liubian_ShaoDiLongWei',
        x: [0, 0.45],
        y: [0, 0.53],
        scale: 0.75,
        background: 'skin_liubian_ShaoDiLongWei_bg.png',
      },
    },
    
    liubei: {
    英杰汇聚一: {//梦终42+
        name: 'skin_liubei_YingJieHuiJu1',
        x: [0, 1.35],
        y: [0, 0.58],
        scale: 0.55,
        background: 'skin_liubei_YingJieHuiJu_bg.png',
        skinName: "英杰汇聚"
      },
    },
    
    snjs_ex_liubei: {
    英杰汇聚一: {//梦终42
        name: 'skin_liubei_YingJieHuiJu1',
        x: [0, 1.35],
        y: [0, 0.58],
        scale: 0.55,
        background: 'skin_liubei_YingJieHuiJu_bg.png',
        skinName: "英杰汇聚"
      },
    },
    
    lingtong: {
    乘风破浪: {//十周年18
        name: 'skin_lingtong_ChengFengPoLang',
        x: [0, 0.48],
        y: [0, 0.5],
        scale: 0.7,
        background: 'skin_lingtong_ChengFengPoLang_bg.png',
       },
    手杀: {//梦终41
        name: 'skin_lingtong_ShouSha',
        x: [10, -0.35],
        y: [-5, 0.2],
        scale: 0.47,
        action: 'DaiJi',
        pos: {
        x: [0,0.8],
        y: [0,0.4]  },
        
        background: 'skin_lingtong_ShouSha_bg.png',
        skinName: "手杀"
      },
    },
    
    lingju: {
    舞魅蛊心: {//梦终40
        name: 'skin_lingju_JinZhiYuYe2',
        x: [0, 0.55],
        y: [0, 0.5],
        scale: 0.75,
        angle:10,
        background: 'skin_lingju_JinZhiYuYe_bg.png',
        skinName: "舞魅蛊心"
       },
    },
    
    lingcao: {
    破贼校尉: {//梦终39
        name: 'skin_lingcao_PoZeiXiaoWei',
        x: [0, 0.35],
        y: [0, 0.35],
        scale: 0.52,
        angle: -30,
        action: 'DaiJi',
        pos: {
        x: [0,0.8],
        y: [0,0.4]  },
        
        background: 'skin_lingcao_PoZeiXiaoWei_bg.png',
        skinName: "破贼校尉"
      },
    },
    
    lijue: {
    文和乱武: {//梦终38
        name: 'skin_lijue_WenHeLuanWu2',
        x: [0, 0.46],
        y: [0, 0.5],
        scale: 0.78,
        background: 'skin_lijue_WenHeLuanWu_bg.png',
        skinName: "文和乱武"
       },
    },
    
    jiaxu: {
    控魂驱魄: {//梦终37
        name: 'skin_jiaxu_KongHunQuPo2',
        x: [0, 0.52],
        y: [0, 0.5],
        scale: 0.67,
        background: 'skin_jiaxu_KongHunQuPo_bg.png',
        skinName: "控魂驱魄"
       },
    },
    
    ol_jiangwei: {
    烽火乱世: {//梦终36
        name: 'skin_jiangwei_FengHuoLuanShi2',
        x: [0, 0.5],
        y: [0, 0.5],
        scale: 0.75,
        background: 'skin_jiangwei_FengHuoLuanShi_bg.png',
        skinName: "烽火乱世"
       },
    },
    
    huatuo: {
    仙山游医: {//梦终35
        name: 'skin_huatuo_XianShanYouYi2',
        x: [0, 0.49],
        y: [0, 0.5],
        scale: 0.8,
        background: 'skin_huatuo_XianShanYouYi_bg.png',
        skinName: "仙山游医"
      },
    },
    
    huangzhong: {
    没金饮羽: {//梦终34+
        name: 'skin_huangzhong_MoJinYinYu2',
        x: [0, 0.47],
        y: [0, 0.53],
        scale: 0.7,
        background: 'skin_huangzhong_MoJinYinYu_bg.png',
        skinName: "没金饮羽"
      },
    },
    
    snjs_ex_huangzhong: {
    没金饮羽: {//梦终34
        name: 'skin_huangzhong_MoJinYinYu2',
        x: [0, 0.47],
        y: [0, 0.53],
        scale: 0.7,
        background: 'skin_huangzhong_MoJinYinYu_bg.png',
        skinName: "没金饮羽"
      },
    },
    
    huangyueying: {
    新: {//新3
        name: 'skin_huangyueying_xin',
        x: [0, 0.48],
        y: [0, 0.25],
        scale: 0.65,
        action:'daiji',
        background: 'skin_huangyueying_MingLiangQianGu_bg.png',
        skinName: "新"
       },
    },
    
    re_huangyueying: {
    木牛流马: {//十周年17
        name: 'skin_huangyueying_MuNiuLiuMa',
        x: [-20, 0.5],
        y: [0, 0.3],
        scale: 0.53,
        action: 'DaiJi',
        pos: {
        x: [0,0.8],
        y: [0,0.4]  },
        background: 'skin_huangyueying_MuNiuLiuMa_bg.png',
        skinName: "木牛流马"
      },
    },
    
    jsp_huangyueying: {
    明良千古: {//梦终33
        name: 'skin_huangyueying_MingLiangQianGu',
        x: [5, -0.35],
        y: [0, 0.2],
        scale: 0.45,
        action: 'DaiJi',
        pos: {
        x: [0,0.45],
        y: [0,0.45]  },
        background: 'skin_huangyueying_MingLiangQianGu_bg.png',
        skinName: "明良千古"
      },
    },
    
    huanggai: {
    鏖战赤壁: {//梦终32+
        name: 'skin_huanggai_AoZhanChiBi',
        x: [0, 0.55],
        y: [0, 0.45],
        scale: 0.44,
        angle:-15,
        action: 'DaiJi',
        pos: {
        x: [0,0.8],
        y: [0,0.4]  },
        
        background: 'skin_huanggai_AoZhanChiBi_bg.png',
        skinName: "鏖战赤壁"
      },
    },
    
    snjs_ex_huanggai: {
    鏖战赤壁: {//梦终32
        name: 'skin_huanggai_AoZhanChiBi',
        x: [0, 0.55],
        y: [0, 0.45],
        scale: 0.44,
        angle:-15,
        action: 'DaiJi',
        pos: {
        x: [0,0.8],
        y: [0,0.4]  },
        
        background: 'skin_huanggai_AoZhanChiBi_bg.png',
        skinName: "鏖战赤壁"
      },
    },
    
    huaman: {
    花俏蛮娇:{//十周年16
				name: 'skin_huaman_HuaQiaoManJiao',
				x: [65, 0.5],
				y: [10, 0.3],
				scale: 0.4,
				background: 'skin_huaman_HuaQiaoManJiao_bg.png',
			}
    },
    
    sp_huaman: {
    花俏蛮娇:{//十周年16+
				name: 'skin_huaman_HuaQiaoManJiao',
				x: [65, 0.5],
				y: [10, 0.3],
				scale: 0.4,
				background: 'skin_huaman_HuaQiaoManJiao_bg.png',
			}
    },
    
    hetaihou: {
    蛇蝎为心:{//十周年15
		name: 'skin_hetaihou_SheXieWeiXin',
		x: [-50, 0.2],
		y: [10, 0.18],
		scale: 0.46,
		angle: 8,
        action: 'DaiJi',
        pos: {
        x: [0,0.8],
        y: [0,0.4]  },
		
		clipSlots: ['wangzuo', 'bu2', 'bu3'],
		background: 'skin_hetaihou_SheXieWeiXin_bg.png',
        skinName: "蛇蝎为心"
        },
    },
    
    guozhao: {
    雍容尊雅:{//十周年14
				name: 'skin_guozhao_YongRongZunYa',
				x: [-80, 0.5],
				y: [8, 0.3],
				scale: 0.6,
				background: 'skin_guozhao_YongRongZunYa_bg.png',
			},
    },
    
    guojia: { 
    暗香疏影: {//梦终31++
        name: 'skin_guojia_AnXiangShuYing',
        x: [0, 0.9],
        y: [0, 0.4],
        scale: 0.38,
        //angle:10,
        
        background: 'skin_guojia_AnXiangShuYing_bg.png',
       },
    },
    
    snjs_ex_guojia: { 
    暗香疏影: {//梦终31+
        name: 'skin_guojia_AnXiangShuYing',
        x: [0, 0.9],
        y: [0, 0.4],
        scale: 0.38,
        //angle:10,
        
        background: 'skin_guojia_AnXiangShuYing_bg.png',
       },
    },
    
    snjs_sp_shen_guojia: { 
    暗香疏影: {//梦终31
        name: 'skin_guojia_AnXiangShuYing',
        x: [0, 0.9],
        y: [0, 0.4],
        scale: 0.38,
        //angle:10,
        
        background: 'skin_guojia_AnXiangShuYing_bg.png',
       },
    },
    
    guohuanghou: {
    心系君魂一: {//梦终30
        name: 'skin_guohuanghou_XinXiJunHun1',
        x: [0, 0.4],
        y: [0, 0.3],
        scale: 0.45,
        background: 'skin_guohuanghou_XinXiJunHun_bg.png',
        skinName: "心系君魂"
      },
    },
    
    guanyu: {
    飞龙在天: {//梦终29+
        name: 'skin_guanyu_FeiLongZaiTian2',
        x: [0, 0.48],
        y: [0, 0.5],
        scale: 0.75,
        background: 'skin_guanyu_FeiLongZaiTian_bg.png',
        skinName: "飞龙在天"
      },
    },
    
    snjs_ex_guanyu: {
    飞龙在天: {//梦终29
        name: 'skin_guanyu_FeiLongZaiTian2',
        x: [0, 0.48],
        y: [0, 0.5],
        scale: 0.75,
        background: 'skin_guanyu_FeiLongZaiTian_bg.png',
        skinName: "飞龙在天"
      },
    },
    
    guanyinping: {
    虎年端午: {//梦终28
        name: 'skin_guanyinping_HuNianDuanWu',
        x: [0, 0.43],
        y: [5, 0.4],
        scale: 0.36,
        
        background: 'skin_guanyinping_HuNianDuanWu_bg.png',
        skinName: "虎年端午"
      },
    },
    
    guansuo: {
    万花簇威: {//十周年13
        name: 'skin_guansuo_WanHuaCuWei',
        x: [0, 0.48],
        y: [0, 0.54],
        scale: 0.7,
        background: 'skin_guansuo_WanHuaCuWei_bg.png',
      },
    },
    
    ganning: {
    披星踏浪: {//梦终27+
        name: 'skin_ganning_PiXingTaLang2',
        x: [0, 0.5],
        y: [0, 0.5],
        scale: 0.75,
        background: 'skin_ganning_PiXingTaLang_bg.png',
        skinName: "披星踏浪"
      },
    },
    
    snjs_ex_ganning: {
    披星踏浪: {//梦终27
        name: 'skin_ganning_PiXingTaLang2',
        x: [0, 0.5],
        y: [0, 0.5],
        scale: 0.75,
        background: 'skin_ganning_PiXingTaLang_bg.png',
        skinName: "披星踏浪"
      },
    },
    
    fuhuanghou: {
    万福千灯: {//梦终26
        name: 'skin_fuhuanghou_WanFuQianDeng2',
        x: [0, 0.5],
        y: [0, 0.5],
        scale: 0.8,
        background: 'skin_fuhuanghou_WanFuQianDeng_bg.png',
        skinName: "万福千灯"
      },
    },
    
    re_fuhuanghou: {
    战场绝版: {//梦终25
        name: 'skin_fuhuanghou_ZhanChang2',
        x: [0, 0.45],
        y: [0, 0.5],
        scale: 0.75,
        background: 'skin_fuhuanghou_ZhanChang_bg.png',
        skinName: "战场绝版"
      },
    },
    
    re_fengfangnv:{
    原皮一: {//梦终24
        name: 'skin_fengyu_1',
        x: [150, 0.84],
        y: [0, 0.22],
        scale: 0.55,
        background: 'skin_fengyu_bg.png',
        skinName: "原皮"
      },
    },
    
    fanyufeng: {
    斟酒入情: {//梦终23+
        name: 'skin_fanyufeng_ZhenJiuRuQing2',
        x: [0, 0.45],
        y: [0, 0.55],
        scale: 0.7,
        background: 'skin_fanyufeng_ZhenJiuRuQing_bg.png',
        skinName: "斟酒入情"
      },
    },
    
    snjs_sp_fanyufeng: {
    斟酒入情: {//梦终23
        name: 'skin_fanyufeng_ZhenJiuRuQing2',
        x: [0, 0.45],
        y: [0, 0.55],
        scale: 0.7,
        background: 'skin_fanyufeng_ZhenJiuRuQing_bg.png',
        skinName: "斟酒入情"
      },
    },
    
    dongzhuo: {
    文和乱武: {//梦终22
        name: 'skin_dongzhuo_WenHeLuanWu2',
        x: [0, 0.5],
        y: [0, 0.5],
        scale: 0.8,
        background: 'skin_dongzhuo_WenHeLuanWu_bg.png',
        skinName: "文和乱武"
      },
    },
    
    dongbai: {
    娇俏伶俐: {//十周年11
                name: 'skin_dongbai_JiaoQiaoLingLi',
                x: [0, 0.45],
                y: [0, 0.5],
                scale: 0.8,
                background: 'skin_dongbai_JiaoQiaoLingLi_bg.png',
            },
    },
    
    snjs_sp_dongbai: {
    娇俏伶俐: {//十周年11+
                name: 'skin_dongbai_JiaoQiaoLingLi',
                x: [0, 0.45],
                y: [0, 0.5],
                scale: 0.8,
                background: 'skin_dongbai_JiaoQiaoLingLi_bg.png',
            },
    },
    
    dingyuan:{
    长乐未央: {//梦终21
        name: 'skin_dingyuan_ChangLeWeiYang2',
        x: [0, 0.44],
        y: [0, 0.48],
        scale: 0.85,
        background: 'skin_dingyuan_ChangLeWeiYang_bg.png',
        skinName: "长乐未央"
      },
    },
    
    sp_diaochan: {
    驭魂千机: {//梦终20
        name: 'skin_diaochan_YuHunQianJi',
        x: [0, 0.49],
        y: [0, 0.13],
        angle: 10,
        action: 'DaiJi',
        pos: {
        x: [0,0.8],
        y: [0,0.4]  },
        scale: 0.62,
        
        background: 'skin_diaochan_YuHunQianJi_bg.png',
        skinName: "驭魂千机"
       },
    },
       
    diaochan: {
    战场绝版:{//十周年9
				name: 'skin_diaochan_ZhanChang',
				x: [0, 0.5],
				y: [0, 0.5],
				scale: 0.8,
				background: 'skin_diaochan_ZhanChang_bg.png',
			},
			玉婵仙子:{//十周年10
				name: 'skin_diaochan_YuChanXianZi',
				x: [5, 0.5],
				y: [0, 0],
				scale: 0.6,
				background: 'skin_diaochan_YuChanXianZi_bg.png',
			},
    绝世倾城: {//梦终19
        name: 'skin_diaochan_JueShiQingCheng',
        x: [0, 0.55],
        y: [0, 0.35],
        scale: 0.4,
        action: 'DaiJi',
        pos: {
        x: [0,0.8],
        y: [0,0.4]  },
        
        background: 'skin_diaochan_JueShiQingCheng_bg.png',
        skinName: "绝世倾城"
      },
    },
    
    daqiao:{
    清萧清丽:{//十周年6
				name: 'skin_daqiao_QingXiaoQingLi',
				x: [16, 0.5],
				y: [15, 0.1],
				scale: 0.55,
				background: 'skin_daqiao_QingXiaoQingLi_bg.png',
			},
    衣垂绿川:{//十周年7
				name: 'skin_daqiao_YiChuiLvChuan',
				action: 'DaiJi',
				x: [60, 0.5],
				y: [0, 0.2],
				scale: 0.5,
				clipSlots: ['san'],
				hideSlots: ['qjhua1', 'qjhua2', 'qjhua3', 'qjhua4', 'qjhua5', 'guangxian', 'yun1', 'yun3', 'effect/guang2_00', 'effect/yan'],
				background: 'skin_daqiao_QingXiaoQingLi_bg.png',
			},
    },
    
    re_daqiao:{
    绝世之姿:{//梦终18+
        name: 'skin_daqiao_JueShiZhiZi',
        x: [5, 0.4],
        y: [2, 0.22],
        scale: 0.48,
        angle:12,
        action: 'DaiJi',
        pos: {
        x: [0,0.8],
        y: [0,0.4]  },
        
        background: 'skin_daqiao_JueShiZhiZi_bg.png',
        skinName: "绝世之姿"
      },
    },
    
    snjs_ex_daqiao:{
    绝世之姿:{//梦终18
        name: 'skin_daqiao_JueShiZhiZi',
        x: [5, 0.4],
        y: [2, 0.22],
        scale: 0.48,
        angle:12,
        action: 'DaiJi',
        pos: {
        x: [0,0.8],
        y: [0,0.4]  },
        
        background: 'skin_daqiao_JueShiZhiZi_bg.png',
        skinName: "绝世之姿"
      },
    },
    
    daxiaoqiao: {
    战场绝版:{//十周年8
				name: 'skin_daqiaoxiaoqiao_ZhanChang',
				x: [0, 0.5],
				y: [10, 0.3],
				scale: 0.5,
				background: 'skin_daqiaoxiaoqiao_ZhanChang_bg.png',
			},
    },
    
    chengong: {
    一战而就: {//梦终17+
        name: 'skin_chengong_YiZhanErJiu2',
        x: [0, 0.6],
        y: [0, 0.5],
        scale: 0.75,
        background: 'skin_chengong_YiZhanErJiu_bg.png',
        skinName: "一战而就"
       },
    },
    
    snjs_re_chengong: {
    一战而就: {//梦终17
        name: 'skin_chengong_YiZhanErJiu2',
        x: [0, 0.6],
        y: [0, 0.5],
        scale: 0.75,
        background: 'skin_chengong_YiZhanErJiu_bg.png',
        skinName: "一战而就"
       },
    },    
    
    caozhi: {
    虚拟天团: {//梦终16+
        name: 'skin_caozhi_XuNiTianTuan2',
        x: [0, 0.4],
        y: [0, 0.5],
        scale: 0.7,
        background: 'skin_caozhi_XuNiTianTuan_bg.png',
        skinName: "虚拟天团"
      },
    },
    
    snjs_shen_caozhi: {
    虚拟天团: {//梦终16
        name: 'skin_caozhi_XuNiTianTuan2',
        x: [0, 0.5],
        y: [0, 0.5],
        scale: 0.7,
        background: 'skin_caozhi_XuNiTianTuan_bg.png',
        skinName: "虚拟天团"
      },
    },
    
    caoying: {
	巾帼花舞:{//十周年2
				name: 'skin_caoying_JinGuoHuaWu',
				x: [0, 0.5],
				y: [0, 0.5],
				scale: 0.8,
				background: 'skin_caoying_JinGuoHuaWu_bg.png',
			},
    锋芒毕露: {//梦终15
        name: 'skin_caoying_FengMangBiLou',
        x: [0, 0.3],
        y: [0, -0.06],
        scale: 0.65,
        action: 'DaiJi',
        pos: {
        x: [0,0.7],
        y: [0,0.45]  },
        
        background: 'skin_caoying_FengMangBiLou_bg.png',
        loop: false,
        skinName: "锋芒毕露"
      },
    },
    
    caorui: {
    玺握天下: {//十周年5
        name: 'skin_caorui_XiWoTianXia',
        x: [0, 0.45],
        y: [0, 0.5],
        scale: 0.8,
        background: 'skin_caorui_XiWoTianXia_bg.png',
      },
    战场绝版一: {//梦终14
        name: 'skin_caorui_XinJunJiWei1',
        x: [0, 0.35],
        y: [0, 0.05],
        scale: 0.65,
        background: 'skin_caorui_XinJunJiWei_bg.png',
        skinName: "战场绝版"
      },
    },
    
    caopi: {
    月夜情满: {//梦终13+
        name: 'skin_caopi_YueYeQingMan2',
        x: [0, 0.5],
        y: [0, 0.5],
        scale: 0.7,
        background: 'skin_caopi_YueYeQingMan_bg.png',
        skinName: "月夜情满"
      },
    },
    
    snjs_ex_caopi: {
    月夜情满: {//梦终13
        name: 'skin_caopi_YueYeQingMan2',
        x: [0, 0.5],
        y: [0, 0.5],
        scale: 0.7,
        background: 'skin_caopi_YueYeQingMan_bg.png',
        skinName: "月夜情满"
      },
    },
    
    caojinyu:{
    惊鸿倩影: {//十周年4
        name: 'skin_caojinyu_JHQY2',
        x: [0, 0.32],
        y: [0, 0.45],
        scale: 0.85,
        background: 'skin_caojinyu_JHQY_bg.png',
       },
    },
    
    caojie:{
    凤历迎春:{//十周年3
				name: 'skin_caojie_FengLiYingChun',
				x: [0, 0.4],
				y: [0, 0.5],
				scale: 0.8,
				background: 'skin_caojie_FengLiYingChun_bg.png',
			},
    },
    
    caochong: {
    五陵英少: {//梦终12+
        name: 'skin_caochong_WuLingYingShao',
        x: [0, 0.59],
        y: [0, 0.25],
        scale: 0.45,
        action: 'DaiJi',
        pos: {
        x: [0,0.8],
        y: [0,0.4]  },
        background: 'skin_caochong_WuLingYingShao_bg.png',
        
        skinName: "五陵英少"
      },
    },
    
    snjs_re_caochong: {
    五陵英少: {//梦终12
        name: 'skin_caochong_WuLingYingShao',
        x: [0, 0.59],
        y: [0, 0.25],
        scale: 0.45,
        action: 'DaiJi',
        pos: {
        x: [0,0.8],
        y: [0,0.4]  },
        background: 'skin_caochong_WuLingYingShao_bg.png',
        
        skinName: "五陵英少"
      },
    },
    
    caocao: {
    英杰汇聚: {//梦终11+
        name: 'skin_caocao_YingJieHuiJu2',
        x: [0, 0.5],
        y: [0, 0.48],
        scale: 0.77,
        background: 'skin_caocao_YingJieHuiJu_bg.png',
        skinName: "英杰汇聚"
      },
    },
    
    snjs_ex_caocao: {
    英杰汇聚: {//梦终11
        name: 'skin_caocao_YingJieHuiJu2',
        x: [0, 0.5],
        y: [0, 0.48],
        scale: 0.77,
        background: 'skin_caocao_YingJieHuiJu_bg.png',
        skinName: "英杰汇聚"
      },
    },
    
    caoang: {
    竭战鳞伤: {//梦终10+
        name: 'skin_caoang_JieZhanLinShang',
        x: [0, -0.11],
        y: [0, 0.37],
        scale: 0.4,
        action: 'DaiJi',
        pos: {
        x: [0,0.8],
        y: [0,0.4]  },
        background: 'skin_caoang_JieZhanLinShang_bg.png',
        
        skinName: "竭战鳞伤"
      },
    },
    
    snjs_re_caoang: {
    竭战鳞伤: {//梦终10
        name: 'skin_caoang_JieZhanLinShang',
        x: [0, -0.11],
        y: [0, 0.37],
        scale: 0.4,
        action: 'DaiJi',
        pos: {
        x: [0,0.8],
        y: [0,0.4]  },
        background: 'skin_caoang_JieZhanLinShang_bg.png',
        
        skinName: "竭战鳞伤"
      },
    },
    
    caiwenji: {
    花好月圆: {//梦终9
        name: 'skin_caiwenji_HuaHaoYueYuan2',
        x: [0, 0.45],
        y: [0, 0.5],
        scale: 0.75,
        background: 'skin_caiwenji_HuaHaoYueYuan_bg.png',
        skinName: "花好月圆"
      },
    },
    
    sp_caiwenji: {
    婉娩流逸一: {//梦终8
        name: 'skin_caiwenji_WanMianLiuYi1',
        x: [0, 0.5],
        y: [0, 0.4],
        scale: 0.45,
        background: 'skin_caiwenji_WanMianLiuYi_bg.png',
        skinName: "婉娩流逸"
      },
    },
    
    re_caiwenji: {
    泪捻琵琶: {//梦终7
        name: 'skin_caiwenji_LeiNianPiPa',
        x: [0, 0.6],
        y: [0, 0.3],
        scale: 0.5,
        action: 'DaiJi',
        pos: {
        x: [0,0.8],
        y: [0,0.4]  },        
        background: 'skin_caiwenji_LeiNianPiPa_bg.png',
        skinName: "泪捻琵琶"
        },
    },
    
    ol_caiwenji: {
    新: {//新4
        name: 'caiwenji_xin',
        x: [0, 0.4],
        y: [0, 0.3],
        action: 'DaiJi',
        scale: 0.4,
        angle:-15,
        background: 'skin_caiwenji_Xin_bg.png',
        skinName: "新"
      },
    },
    
    caifuren: {
    柔情钰露: {//梦终6+
        name: 'skin_caifuren_RouQingYuLu2',
        x: [0, 0.5],
        y: [0, 0.45],
        scale: 0.95,
        background: 'skin_caifuren_RouQingYuLu_bg.png',
        skinName: "柔情钰露"
        },
    },
    
    re_caifuren: {
    柔情钰露: {//梦终6
        name: 'skin_caifuren_RouQingYuLu2',
        x: [0, 0.5],
        y: [0, 0.45],
        scale: 0.95,
        background: 'skin_caifuren_RouQingYuLu_bg.png',
        skinName: "柔情钰露"
        },
    },
    
    xin_caifuren: {
    名门妖媛: {//梦终5
        name: 'skin_caifuren_MingMenYaoYuan2',
        x: [0, 0.5],
        y: [0, 0.54],
        scale: 0.78,
        background: 'skin_caifuren_MingMenYaoYuan_bg.png',
        skinName: "名门妖媛"
      },
    },
    
    buzhi: {
    踏海拓疆: {//梦终4
        name: 'skin_buzhi_TaHaiTuoJiang2',
        x: [0, 0.46],
        y: [0, 0.55],
        scale: 0.7,
        background: 'skin_buzhi_TaHaiTuoJiang_bg.png',
        skinName: "踏海拓疆"
        },
    },
    
    bulianshi: {
    战场绝版一: {//梦终3+
        name: 'skin_bulianshi_ZhanChang1',
        x: [0, 0.4],
        y: [5, 0.33],
        scale: 0.44,
        background: 'skin_bulianshi_ZhanChang_bg.png',
        skinName: "战场绝版"
        },
    },
    
    dc_bulianshi: {
    战场绝版一: {//梦终3
        name: 'skin_bulianshi_ZhanChang1',
        x: [0, 0.4],
        y: [5, 0.33],
        scale: 0.44,
        background: 'skin_bulianshi_ZhanChang_bg.png',
        skinName: "战场绝版"
        },
    },
    
    re_bulianshi: {
    缘后雅志一: {//梦终2
        name: 'skin_bulianshi_YuanHouYaZhi1',
        x: [0, 0.8],
        y: [5, 0.4],
        scale: 0.4,
        background: 'skin_bulianshi_YuanHouYaZhi_bg.png',
        skinName: "缘后雅志"
        },
    },
    
    beimihu: {
    逐鹿天下一: {//梦终1+
        name: 'skin_beimihu_ZhuLuTianXia1',
        x: [0, 0.05],
        y: [0, 0.22],
        scale: 0.5,
        background: 'skin_beimihu_ZhuLuTianXia_bg.png',
        skinName: "逐鹿天下"
        },
    },
    
    snjs_re_beimihu: {//梦终1
    逐鹿天下一: {
        name: 'skin_beimihu_ZhuLuTianXia1',
        x: [0, 0.05],
        y: [0, 0.22],
        scale: 0.5,
        background: 'skin_beimihu_ZhuLuTianXia_bg.png',
        skinName: "逐鹿天下"
        },
    },
    
    baosanniang: {
    漫花剑俏:{//十周年1
				name: 'skin_baosanniang_ManHuaJianQiao',
				x: [96, 0.5],
				y: [10, 0.4],
				scale: 0.38,
				background: 'skin_baosanniang_ManHuaJianQiao_bg.png',
			},
    },
    
};
    
    var skins = decadeUI.dynamicSkin;
    for (var name in skins) {
        for (var nameKey in skins[name]) {
            var skinss = skins[name][nameKey];
            if (!skinss.skinName) skinss.skinName = nameKey;
        }
    }

    var extend = {
    
       re_baosanniang: decadeUI.dynamicSkin.baosanniang,
       xin_baosanniang: decadeUI.dynamicSkin.baosanniang,
       //re_daqiao: decadeUI.dynamicSkin.daqiao,
       re_diaochan: decadeUI.dynamicSkin.diaochan,
       //huangyueying: decadeUI.dynamicSkin.re_huangyueying,
       re_panshu: decadeUI.dynamicSkin.panshu,
       //re_sunluban: decadeUI.dynamicSkin.sunluban,
       //hl_sunluyu: decadeUI.dynamicSkin.sunluyu,
       //re_sunshangxiang: decadeUI.dynamicSkin.sunshangxiang,
       old_wangyi: decadeUI.dynamicSkin.re_wangyi,
       //ol_xiaoqiao: decadeUI.dynamicSkin.re_xiaoqiao,
       re_xinxianying: decadeUI.dynamicSkin.xinxianying,
       ol_xinxianying: decadeUI.dynamicSkin.xinxianying,
       ol_zhangchangpu: decadeUI.dynamicSkin.zhangchangpu,
       re_zhenji: decadeUI.dynamicSkin.zhenji,
       re_zhonghui: decadeUI.dynamicSkin.zhonghui,
       xin_zhonghui: decadeUI.dynamicSkin.zhonghui,
       xin_yuanshao: decadeUI.dynamicSkin.re_yuanshao,
       ol_yuanshao: decadeUI.dynamicSkin.re_yuanshao,
       re_caopi: decadeUI.dynamicSkin.caopi,
       re_guanyu: decadeUI.dynamicSkin.guanyu,
       //re_bulianshi: decadeUI.dynamicSkin.bulianshi,//re使用标的
       old_bulianshi: decadeUI.dynamicSkin.bulianshi,
       re_liubei: decadeUI.dynamicSkin.liubei,
       re_caocao: decadeUI.dynamicSkin.caocao,
       re_jiaxu: decadeUI.dynamicSkin.jiaxu,
       ol_zhurong: decadeUI.dynamicSkin.zhurong,
       re_zhurong: decadeUI.dynamicSkin.zhurong,
       re_sp_zhugeliang: decadeUI.dynamicSkin.ol_sp_zhugeliang,
       //zhugeliang: decadeUI.dynamicSkin.re_zhugeliang,
       ol_dongzhuo: decadeUI.dynamicSkin.dongzhuo,
       re_dongzhuo: decadeUI.dynamicSkin.dongzhuo,
       re_sunce: decadeUI.dynamicSkin.sunce,
       re_sunben: decadeUI.dynamicSkin.sunce,       
       yujin_yujin: decadeUI.dynamicSkin.ol_yujin,
       //re_fuhuanghou: decadeUI.dynamicSkin.fuhuanghou,
       re_caozhi: decadeUI.dynamicSkin.caozhi,
       re_ganning: decadeUI.dynamicSkin.ganning,
       re_gongsunyuan: decadeUI.dynamicSkin.gongsunyuan,
       re_guojia: decadeUI.dynamicSkin.guojia,
       re_huatuo: decadeUI.dynamicSkin.huatuo,
       re_huaxiong: decadeUI.dynamicSkin.huaxiong,
       re_huanggai: decadeUI.dynamicSkin.huanggai,
       re_huangzhong: decadeUI.dynamicSkin.huangzhong,
       re_lvdai: decadeUI.dynamicSkin.lvdai,
       re_lvmeng: decadeUI.dynamicSkin.lvmeng,
       old_madai: decadeUI.dynamicSkin.madai,
       re_xuhuang: decadeUI.dynamicSkin.xuhuang,
       re_xunyu: decadeUI.dynamicSkin.xunyu,
       luxun: decadeUI.dynamicSkin.re_luxun,
       re_dongbai: decadeUI.dynamicSkin.dongbai,
       re_lusu: decadeUI.dynamicSkin.lusu,
       ol_lusu: decadeUI.dynamicSkin.lusu,
       //xusheng: decadeUI.dynamicSkin.xin_xusheng,
       //re_xusheng: decadeUI.dynamicSkin.xin_xusheng,
       jlsgsoul_zhugeliang: decadeUI.dynamicSkin.jlsgsoul_sp_zhugeliang,
       ol_wangrong: decadeUI.dynamicSkin.wangrong,
       re_lingtong: decadeUI.dynamicSkin.lingtong,
       xin_lingtong: decadeUI.dynamicSkin.lingtong,
       xin_sunxiu: decadeUI.dynamicSkin.sunxiu,
       re_sunxiu: decadeUI.dynamicSkin.sunxiu,
       ol_dingyuan: decadeUI.dynamicSkin.dingyuan,
       xin_zhuran: decadeUI.dynamicSkin.zhuran,
       re_zhuran: decadeUI.dynamicSkin.zhuran,
       re_guanping: decadeUI.dynamicSkin.guanping,
       sp_xiahoushi: decadeUI.dynamicSkin.xiahoushi,
       re_liushan: decadeUI.dynamicSkin.ol_liushan,
       xin_liushan: decadeUI.dynamicSkin.ol_liushan,
       xin_zhangfei: decadeUI.dynamicSkin.re_zhangfei,
       re_wangyun: decadeUI.dynamicSkin.wangyun,
       re_jiangwei: decadeUI.dynamicSkin.ol_jiangwei,
       old_caochong: decadeUI.dynamicSkin.caochong,
       old_caochun: decadeUI.dynamicSkin.caochun,
       re_xiahoushi: decadeUI.dynamicSkin.xiahoushi,
       //caiwenji: decadeUI.dynamicSkin.re_caiwenji,
       //ol_caiwenji: decadeUI.dynamicSkin.re_caiwenji,
       tw_zhaoxiang: decadeUI.dynamicSkin.zhaoxiang,
       tw_beimihu: decadeUI.dynamicSkin.beimihu,
    };
    decadeUI.get.extend(decadeUI.dynamicSkin, extend);
    
});        