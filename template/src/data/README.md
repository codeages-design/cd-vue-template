# 侧边栏配置选项

约定index.js为侧边栏的配置文件

* 代码示例

		const sideMenu = [
		  {
		    title: '首页',
		    icon: 'cvp-icon cvp-icon-home',
		    routeName: 'homepage',
		  },
		  {
		    title: '课程',
		    icon: 'cvp-icon cvp-icon-course',
		    isShowSub: false,
		    children: [
		      {
		        title: '所有课程',
		        // icon: 'cvp-icon cvp-icon-home',
		        routeName: 'courseList'
		      }
		    ]
		  }
		]
		export {
		  sideMenu,
		}


* 参数对应

参数名 | 描述 | 示例 | 参数类型
---|---|---|---
title | 显示名称 | title: '课程' | string
icon | 图标class名(含两个class须全写) | icon: 'cvp-icon cvp-icon-course' | string
isShowSub | 是否显示子标题，在有children时生效 | isShowSub: false | boolean
children | 子标题集合，子标题所需参数和外界一致 | children: [{title: '所有课程',icon: 'cvp-icon cvp-icon-home',routeName: 'courseList'}] | array
routeName | 路由名称，当前路由所对应的routerName会让其在sidebar中名称对应的标题高亮 | routeName: 'courseList' | string

