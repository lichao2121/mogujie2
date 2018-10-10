let purchase = (function () {
    let $bannerSwiper = $('#banner-swiper');
    let $swiper = $('.swiper');
    let $left = $('.leftBtn');
    let $right = $('.rightBtn');
    let step = 0;
    let timer = null;
    let data = null;

    $.ajax({
        url: 'data/data-purchase.json',
        method: 'get',
        async: false,
        dataType: 'json',
        success: function (n) {
            data = n;
            bindHtml();
        }
    });



    function bindHtml() {
        let imgStr = ``;
        $.each(data, function (item) {
            imgStr += `<img data-src="img/${this.img}" alt="">`;
        });
        $swiper.html(imgStr);
        lazyImg();
    }


    function lazyImg() {
        $('.swiper img').each(function (index) {
            let that = this;
            let newImg = new Image;
            let url = $(this).attr('data-src');
            newImg.src = url;
            $(newImg).load(function () {
                $(that).attr('src', this.src);
                newImg = null;
                index === 0 ? $(that).fadeIn(500) : null;
            })
        })
    }


    timer = setInterval(autoMove, 2000);
    function autoMove() {
        step++;
        if (step >= data.length) {
            step = 0;
        }
        $('#swiper img').eq(step).fadeIn(500).siblings().fadeOut();
    }

    $('.banner-swiper').hover(function () {
        clearInterval(timer);
        $('.banner-swiper .leftBtn,.banner-swiper .rightBtn').fadeIn();
    }, function () {
        timer = setInterval(autoMove, 2000);
        $('.banner-swiper .leftBtn,.banner-swiper .rightBtn').fadeOut();
    });

    $right.click(function () {
        autoMove();
    });
    $left.click(function () {
        step -= 2;
        if (step < -1) {
            step = data.length - 2;
        }
        autoMove();
    });
})();

