import Vue from 'vue'
let api = {}

api.getAllInfo = function (page){
  if (process.env.NODE_ENV === 'production') {
    return Vue.http.get('http://' + document.domain + '/MultiDimenWebEvalSys/homePage?status=getAllInfo&page=' + page).then(res => {
      return res.body
    })
  } else {
    return Promise.resolve(
      {
        info: { // info包含类别个数，总页数，每页展示数量
          "classNum" : 17,
          "totalPage" : 500, // 跳转页数超过totalPage的就跳到最后一页，小于1的就跳到第一页
          "numPerPage" : 15
        },
        classes: [
          "行业企业",
          "生活服务",
          "休闲娱乐",
          "教育科学",
          "网络科技",
          "社交综合",
          "购物电商",
          "新闻媒体",
          "金融财经",
          "政府组织",
          "医疗健康",
          "地方门户",
          "交通旅游",
          "科学文化",
          "法律法规",
          "体育健身",
          "搜索导航"
        ],
        results: [
          {
            rank: 1,
            domain: 'www.qq.com',
            website: 'tencent'
          },
          {
            rank: 2,
            domain: 'www.baidu.com',
            website: 'baidu'
          },
          {
            rank: 3,
            domain: 'www.baidu.com',
            website: '百度'
          },
          {
            rank: 4,
            domain: 'www.sogou.com',
            website: 'sougou'
          }
        ]
      }
    )
  }
}

api.getClassesDetail = function (c, page){
  if (process.env.NODE_ENV === 'production') {
    return Vue.http.get('http://' + document.domain + '/MultiDimenWebEvalSys/homePage?status=selectClass&class='+c + 'page=1').then(res => {
      return res.body
    })
  } else {
    return Promise.resolve(
      {
        "info" : { // info包含总页数，每页展示数量
          "totalPage" : 100, // 跳转页数超过totalPage的就跳到最后一页，小于1的就跳到第一页
          "numPerPage" : 15
        },
        classes: [
          "行业企业",
          "生活服务",
          "休闲娱乐",
          "教育科学",
          "网络科技",
          "社交综合",
          "购物电商",
          "新闻媒体",
          "金融财经",
          "政府组织",
          "医疗健康",
          "地方门户",
          "交通旅游",
          "科学文化",
          "法律法规",
          "体育健身",
          "搜索导航"
        ],
        "class" : "搜索导航",
        "classResults" : [
          {
            "rank" : 1,
            "domain" : "www.baidu.com",
            "website" : "百度"
          },
          {
            "rank" : 2,
            "domain" : "www.qq.com",
            "website" : "腾讯"
          }
        ]
      }
    )
  }
}


api.getWebsiteDetail = function (website){
  if (process.env.NODE_ENV === 'production') {
    return Vue.http.get('http://' + document.domain + '/MultiDimenWebEvalSys/detailPage?status=websiteDetail&website='+website).then(res => {
      return res.body
    })
  } else {
    return Promise.resolve(
      {
        "status" : "latest", // "latest" 代表已是最新数据，按钮显示为“更新”且可点击，"updating"代表正在更新中，不可点击
        // 在更新状态下进行轮询
        "results" : {
          "domain"        : "www.baidu.com",
          "website"       : "百度",
          "rank"          : 1,
          "class"         : "搜索导航",
          mapping: {
            "google_pr": '',
            "dns": 'DNS',
            "tcp": 'TCP',
            "starttransfer": "骑士时间",
            "total": "骑士时间",
            "rtt": "骑士时间",
            "mdev": "骑士时间",
            "packloss": "骑士时间",
            "iscdn": "骑士时间",
            "Alexa_global": "骑士时间",
            "Alexa_china": "骑士时间",
            "ip": "骑士时间",
            "pv": "pv",
            "backline": "骑士时间",
            "baidu": "百度指数",
            "baidu_mobile": "百度手机指数",
            "sll": "你猜这是啥",
            "sll_mobile": "我也不知道是啥",
            "shenma": "神马指数",
            "sougou_pr": "搜狗的某个指标",
          },
          name: ["google_pr", "dns", "tcp", "starttransfer", "total","rtt", "mdev", "packloss", "iscdn",  "Alexa_global", "Alexa_china", "ip", "pv", "backline", "baidu", "baidu_mobile", "sll", "sll_mobile", "shenma", "sougou_pr"],
          value:["123", "123123", "123123", "1", "213","inValid", "updating", "12", "12", "12", "12", "12","12", "12", "12", "12", "12","123", "123", "123",],
          weight:["12", "12", "12", "12", "12","12", "12", "12", "12", "12", "12", "12", "12", "12", "12","12", "12", "12", "12", "12",],

        }
      }
    )
  }
}

api.getSearchDetail = function (website){
  if (process.env.NODE_ENV === 'production') {
    return Vue.http.get('http://' + document.domain + '/MultiDimenWebEvalSys/detailPage?status=findWebsite&website='+website).then(res => {
      return res.body
    })
  } else {
    return Promise.resolve(
      {
        status: true, // True代表有数据，跳转到网站详情页，并会带上网站详情页所需数据
        // False代表没有数据
        results:  {
          domain: "www.baidu.com",
          website: "百度",
          rank: 1,
          class: "搜索导航",
          mapping: {
            "google_pr": '',
            "dns": 'DNS',
            "tcp": 'TCP',
            "starttransfer": "骑士时间",
            "total": "骑士时间",
            "rtt": "骑士时间",
            "mdev": "骑士时间",
            "packloss": "骑士时间",
            "iscdn": "骑士时间",
            "Alexa_global": "骑士时间",
            "Alexa_china": "骑士时间",
            "ip": "骑士时间",
            "pv": "pv",
            "backline": "骑士时间",
            "baidu": "百度指数",
            "baidu_mobile": "百度手机指数",
            "sll": "你猜这是啥",
            "sll_mobile": "我也不知道是啥",
            "shenma": "神马指数",
            "sougou_pr": "搜狗的某个指标",
          },
          name: ["google_pr", "dns", "tcp", "starttransfer", "total","rtt", "mdev", "packloss", "iscdn",  "Alexa_global", "Alexa_china", "ip", "pv", "backline", "baidu", "baidu_mobile", "sll", "sll_mobile", "shenma", "sougou_pr"],
          value:["123", "123123", "123123", "1", "213","inValid", "updating", "12", "12", "12", "12", "12","12", "12", "12", "12", "12","123", "123", "123",],
          weight:["12", "12", "12", "12", "12","12", "12", "12", "12", "12", "12", "12", "12", "12", "12","12", "12", "12", "12", "12",],
        } // 网站详情页所需数据，若status为False时result为空
      }
    )
  }
}

api.changePage = function (page){
  if (process.env.NODE_ENV === 'production') {
    return Vue.http.get('http://' + document.domain + '/MultiDimenWebEvalSys/homePage?status=getAllInfo&page='+page).then(res => {
      return res.body
    })
  } else {
    return Promise.resolve(
      {
        "info" : { // info包含类别个数，总页数，每页展示数量
          "classNum" : 17,
          "totalPage" : 500, // 跳转页数超过totalPage的就跳到最后一页，小于1的就跳到第一页
          "numPerPage" : 15
        },
        "calsses" : [
          "行业企业",
          "生活服务",
          "休闲娱乐",
          "教育教学",
          "网络科技",
          "社交综合",
          "购物电商",
          "新闻媒体",
          "金融财经",
          "政府组织",
          "医疗健康",
          "地方门户",
          "交通旅游",
          "科学文化",
          "法律法规",
          "体育健身",
          "搜索导航"
        ],
        "results" : [
          {
            "rank" : 1,
            "domain" : "www.baidu.com",
            "website" : "百度"
          },
          {
            "rank" : 2,
            "domain" : "www.qq.com",
            "website" : "腾讯"
          }
        ]
      }
    )
  }
}


api.updateNow = function (website){
  if (process.env.NODE_ENV === 'production') {
    return Vue.http.get('http://' + document.domain + '/MultiDimenWebEvalSys/detailPage?status=updateNow&website='+website).then(res => {
      return res.body
    })
  } else {
    return Promise.resolve(
      {
        "status" : true, // True代表"正在更新"，网站详情页页面状态变为正在更新
        // False代表"已是最新结果"
        results:  {
          domain: "www.baidu.com",
          website: "百度",
          rank: 1,
          class: "搜索导航",
          mapping: {
            "google_pr": '',
            "dns": 'DNS',
            "tcp": 'TCP',
            "starttransfer": "骑士时间",
            "total": "骑士时间",
            "rtt": "骑士时间",
            "mdev": "骑士时间",
            "packloss": "骑士时间",
            "iscdn": "骑士时间",
            "Alexa_global": "骑士时间",
            "Alexa_china": "骑士时间",
            "ip": "骑士时间",
            "pv": "pv",
            "backline": "骑士时间",
            "baidu": "百度指数",
            "baidu_mobile": "百度手机指数",
            "sll": "你猜这是啥",
            "sll_mobile": "我也不知道是啥",
            "shenma": "神马指数",
            "sougou_pr": "搜狗的某个指标",
          },
          name: ["google_pr", "dns", "tcp", "starttransfer", "total","rtt", "mdev", "packloss", "iscdn",  "Alexa_global", "Alexa_china", "ip", "pv", "backline", "baidu", "baidu_mobile", "sll", "sll_mobile", "shenma", "sougou_pr"],
          value:["123", "123123", "123123", "1", "213","inValid", "updating", "12", "12", "12", "12", "12","12", "12", "12", "12", "12","123", "123", "123",],
          weight:["12", "12", "12", "12", "12","12", "12", "12", "12", "12", "12", "12", "12", "12", "12","12", "12", "12", "12", "12",],
        } // 网站详情页所需数据，若status为False时result为空
      }
    )
  }
}

api.evaluateNow = function (website){
  if (process.env.NODE_ENV === 'production') {
    return Vue.http.get('http://' + document.domain + '/MultiDimenWebEvalSys/detailPage?status=evalNow&website='+website).then(res => {
      return res.body
    })
  } else {
    return Promise.resolve(
      {
        status: 'updating', // True代表有数据，跳转到网站详情页，并会带上网站详情页所需数据
        // False代表没有数据
        results:  {
          domain: "www.baidu.com",
          website: "百度",
          rank: 1,
          class: "搜索导航",
          mapping: {
            "google_pr": '',
            "dns": 'DNS',
            "tcp": 'TCP',
            "starttransfer": "骑士时间",
            "total": "骑士时间",
            "rtt": "骑士时间",
            "mdev": "骑士时间",
            "packloss": "骑士时间",
            "iscdn": "骑士时间",
            "Alexa_global": "骑士时间",
            "Alexa_china": "骑士时间",
            "ip": "骑士时间",
            "pv": "pv",
            "backline": "骑士时间",
            "baidu": "百度指数",
            "baidu_mobile": "百度手机指数",
            "sll": "你猜这是啥",
            "sll_mobile": "我也不知道是啥",
            "shenma": "神马指数",
            "sougou_pr": "搜狗的某个指标",
          },
          name: ["google_pr"],
          value:["123", "123123", "123123", "1", "213","inValid", "updating", "12", "12", "12", "12", "12","12", "12", "12", "12", "12","123", "123", "123",],
          weight:["12", "12", "12", "12", "12","12", "12", "12", "12", "12", "12", "12", "12", "12", "12","12", "12", "12", "12", "12",],
        } // 网站详情页所需数据，若status为False时result为空
      }
    )
  }
}

export default api
