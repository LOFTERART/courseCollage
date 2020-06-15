// components/banner/banner.js
Component({

    properties: {
        // 这里定义了innerText属性，属性值可以在组件使用时指定
        banners: Array,
        autoplay:{
            type: Boolean,
            value: true, //不存在此属性时
        },
        interval:{
            type: Number,
            value: 3000, //不存在此属性时
        },
        duration:{
            type: Number,
            value: 1000, //不存在此属性时
        },
        swiperCurrent:{
            type: Number,
            value: 0, //不存在此属性时
        }
    },

    attached:function(){

    },
    methods:{
        //滑动banner事件处理函数
        swiperchange: function (e) {
          
            this.setData({
                swiperCurrent: e.detail.current
            })
        },

    //    ad 点击
        tapBanner: function (e) {

            wx.navigateTo({
                url: '/homeSub/pages/web/web?url='+encodeURIComponent(e.currentTarget.dataset.url)
            })

        }



    },





})