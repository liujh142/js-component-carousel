function Carousel($ct){
    this.init($ct);
}
Carousel.prototype = {
    init : function($ct){
        this.$ct = $ct;
        this.$imgCt = this.$ct.find('.img-ct')
        this.$imgs = this.$ct.find('.img-ct>li')
        this.$preBtn = this.$ct.find('.pre')
        this.$nextBtn = this.$ct.find('.next')
        this.$bullets = this.$ct.find('.bullet li')
        this.imgWidth = this.$imgs.width();
        this.imgCount = this.$imgs.length
        this.isAnimation = false;
        this.index = 0;

        this.$imgCt.append(this.$imgs.first().clone())
        this.$imgCt.prepend(this.$imgs.last().clone())

        this.$imgCt.width((this.imgCount + 2) * this.imgWidth)
        this.$imgCt.css('position','absolute')
        this.$imgCt.css('left',-this.imgWidth)

        this.bind();
        this.autoPlay();
    },
    bind : function(){
        let _this = this
        this.$preBtn.on('click',function(){
            console.log('pre')
            _this.playPre(1);
            _this.stopAuto();
            _this.autoPlay();
        });
        this.$nextBtn.on('click',function(){
            console.log('next')
            _this.playNext(1);
            _this.stopAuto();
            _this.autoPlay();
        })
        this.$bullets.on('click',function(){
            let index = $(this).index();
            _this.stopAuto();
            _this.autoPlay();
            if(index > _this.index){
                _this.playNext(index - _this.index)
            }else{
                _this.playPre(_this.index - index)
            }
        });
    },
    playNext : function(len){
        if(this.isAnimation)return;
        this.isAnimation = true;
        let _this = this;
        this.$imgCt.animate({
            left : '-=' + this.imgWidth * len
        },function(){
            _this.index += len
            if(_this.index == _this.imgCount ){
                _this.$imgCt.css('left',-_this.imgWidth);
                _this.index = 0;
            }
            _this.setBullet();
            _this.isAnimation = false;
        })
    },
    playPre : function(len){
        if(this.isAnimation)return;
        this.isAnimation = true; 
        let _this = this;
        this.$imgCt.animate({
            left : '+=' + this.imgWidth * len
        },function(){
            _this.index -= len
            if(_this.index == -1){
                _this.$imgCt.css('left', -_this.imgWidth * _this.imgCount)
                _this.index = _this.imgCount - 1
            }
            _this.setBullet();
            _this.isAnimation = false;
        })
    },
    setBullet : function(){
        this.$bullets.eq(this.index).addClass('active')
        this.$bullets.eq(this.index).siblings().removeClass('active');
    },
    autoPlay :function(){
        let _this = this;
        this.clock = setTimeout(function(){
            _this.playNext(1);
            _this.autoPlay();
        },4000)
    },
    stopAuto : function(){
        clearTimeout(this.clock)
    },
}


let carousel = new Carousel($('.carousel-box')); 
