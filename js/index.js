axios.defaults.baseURL = 'https://autumnfish.cn';
var app = new Vue({
    el: "#player",
    data: {
        //搜索关键字
        query: '',
        //播放列表
        musicList:[],
        //音乐链接
        musicUrl:'',
        //音乐图片
        musicCover: '',
        //热们评论
        hotComments: [],
        //碟片播放状态
        isPlaying:false,
        //播放mv
        isShow:false,
        mvUrl:''
    },
    methods: {
        searchMusic() {
            var that=this;
            if (this.query == 0) {
                return
            }
            axios.get('/search?keywords=' + this.query)
                .then(function (response) {
                    // console.log(response);
                    that.musicList=response.data.result.songs;
                }, function (err) {
                })
        },
        playMusic(musicId){
            var that=this;
            axios.get('/song/url?id='+musicId)
            .then(function(response){
                // console.log(response);
                that.musicUrl=response.data.data[0].url;
            },function(err){})
            axios.get("/song/detail?ids="+musicId)
            .then(function(response){
                // console.log(response.data.songs[0].al.picUrl);
                that.musicCover=response.data.songs[0].al.picUrl;
            },function(err){})
            axios.get("/comment/hot?type=0&id="+musicId)
            .then(function(response){
                // console.log(response.data.hotComments);
                that.hotComments=response.data.hotComments;
            },function(err){})
        },
        play(){
            this.isPlaying=true;
        },
        pause(){
            this.isPlaying=false;
            // console.log('pause');
        },
        playMove(mvid){
            var that=this;
            axios.get("/mv/url?id=" + mvid)
            .then(function(response) {
                // console.log(response.data.data.url);
                that.isShow=true;
                that.mvUrl=response.data.data.url;
            },function(err){})
        },
        hide(){
            this.isShow=false;
            this.mvUrl=''
        }

    }
})