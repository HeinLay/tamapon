// UA settings
var _ua = (function(u){
  return {
    Tablet:(u.indexOf("windows") != -1 && u.indexOf("touch") != -1 && u.indexOf("tablet pc") == -1)
      || u.indexOf("ipad") != -1
      || (u.indexOf('ipad') > -1 || u.indexOf('macintosh') > -1 && 'ontouchend' in document)
      || (u.indexOf("android") != -1 && u.indexOf("mobile") == -1)
      || (u.indexOf("firefox") != -1 && u.indexOf("tablet") != -1)
      || u.indexOf("kindle") != -1
      || u.indexOf("silk") != -1
      || u.indexOf("playbook") != -1,
    Mobile:(u.indexOf("windows") != -1 && u.indexOf("phone") != -1)
      || u.indexOf("iphone") != -1
      || u.indexOf("ipod") != -1
      || (u.indexOf("android") != -1 && u.indexOf("mobile") != -1)
      || (u.indexOf("firefox") != -1 && u.indexOf("mobile") != -1)
      || u.indexOf("blackberry") != -1
  }
})(window.navigator.userAgent.toLowerCase());

// device
if(_ua.Mobile){
  $("meta[name='viewport']").attr('content', 'width=device-width, initial-scale=1,viewport-fit=cover');
  // change images with devices width
  $(document).ready(function(){
  	$(function(){
      var $setElem = $('img'),
      pcName = '_pc',
      spName = '_sp',
      replaceWidth = 767;

      $setElem.each(function(){
        var $this = $(this);
        function imgSize(){
          if(window.innerWidth > replaceWidth) {
            $this.attr('src',$this.attr('src').replace(spName,pcName)).css({visibility:'visible'});
          } else {
            $this.attr('src',$this.attr('src').replace(pcName,spName)).css({visibility:'visible'});
          }
        }
        $(window).resize(function(){imgSize();});
        imgSize();
      });
    });
  });
}else if(_ua.Tablet){
  $("meta[name='viewport']").attr('content', 'width=device-width,viewport-fit=cover,');
  $("body").attr('class', 'tablet');
}else{
  $("meta[name='viewport']").attr('content', 'width=device-width');
}

/**
 * internal linkスムーズスクロール
 */
 $(function () {
  $('a[href*="#"]:not([href="#"])').click(function () {
    if (
      location.pathname.replace(/^\//, "") ==
        this.pathname.replace(/^\//, "") &&
      location.hostname == this.hostname
    ) {
      var target = $(this.hash);
      target = target.length ? target : $("[name=" + this.hash.slice(1) + "]");
      if (target.length) {
        $("html, body").animate(
          {
            scrollTop: target.offset().top - 80,
          },
          1000
        );
        return false;
      }
    }
  });
});

/**
 * external linkスムーズスクロール
 */
$(function () {
  setTimeout(function () {
    if (location.hash) {
      window.scrollTo(0, 0);
      target = location.hash.split("#");
      smoothScrollTo($("#" + target[1]));
    }
  }, 1);

  /**
   * taken from: https://css-tricks.com/snippets/jquery/smooth-scrolling/
   */
  $('a[href*="#"]:not([href="#"])').click(function () {
    if (
      location.pathname.replace(/^\//, "") ==
        this.pathname.replace(/^\//, "") &&
      location.hostname == this.hostname
    ) {
      smoothScrollTo($(this.hash));
      return false;
    }
  });

  function smoothScrollTo(target) {
    target = target.length ? target : $("[name=" + this.hash.slice(1) + "]");

    if (target.length) {
      $("html,body").animate(
        {
          scrollTop: target.offset().top - 80,
        },
        1000
      );
    }
  }
});


/**
 * toggle
 */
 $(function () {
  $(".js-toggle").click(function (e) {
    e.preventDefault();
    $(this).toggleClass("active").next().slideToggle();
  });
});

//ページトップへ戻るボタンの処理
$(function () {
  var topBtn = $(".jsPageTop");
  topBtn.click(function () {
    $("body,html").animate(
      {
        scrollTop: 0,
      },
      1500
    );
    return false;
  });
});

// button bubble effect
$('.button--bubble').each(function() {
  var $circlesTopLeft = $(this).parent().find('.circle.top-left');
  var $circlesBottomRight = $(this).parent().find('.circle.bottom-right');

  var tl = new TimelineLite();
  var tl2 = new TimelineLite();

  var btTl = new TimelineLite({ paused: true });

  tl.to($circlesTopLeft, 1.2, { x: -25, y: -25, scaleY: 2, ease: SlowMo.ease.config(0.1, 0.7, false) });
  tl.to($circlesTopLeft.eq(0), 0.1, { scale: 0.2, x: '+=6', y: '-=2' });
  tl.to($circlesTopLeft.eq(1), 0.1, { scaleX: 1, scaleY: 0.8, x: '-=10', y: '-=7' }, '-=0.1');
  tl.to($circlesTopLeft.eq(2), 0.1, { scale: 0.2, x: '-=15', y: '+=6' }, '-=0.1');
  tl.to($circlesTopLeft.eq(0), 1, { scale: 0, x: '-=5', y: '-=15', opacity: 0 });
  tl.to($circlesTopLeft.eq(1), 1, { scaleX: 0.4, scaleY: 0.4, x: '-=10', y: '-=10', opacity: 0 }, '-=1');
  tl.to($circlesTopLeft.eq(2), 1, { scale: 0, x: '-=15', y: '+=5', opacity: 0 }, '-=1');

  var tlBt1 = new TimelineLite();
  var tlBt2 = new TimelineLite();
  
  tlBt1.set($circlesTopLeft, { x: 0, y: 0, rotation: -45 });
  tlBt1.add(tl);

  tl2.set($circlesBottomRight, { x: 0, y: 0 });
  tl2.to($circlesBottomRight, 1.1, { x: 30, y: 30, ease: SlowMo.ease.config(0.1, 0.7, false) });
  tl2.to($circlesBottomRight.eq(0), 0.1, { scale: 0.2, x: '-=6', y: '+=3' });
  tl2.to($circlesBottomRight.eq(1), 0.1, { scale: 0.8, x: '+=7', y: '+=3' }, '-=0.1');
  tl2.to($circlesBottomRight.eq(2), 0.1, { scale: 0.2, x: '+=15', y: '-=6' }, '-=0.2');
  tl2.to($circlesBottomRight.eq(0), 1, { scale: 0, x: '+=5', y: '+=15', opacity: 0 });
  tl2.to($circlesBottomRight.eq(1), 1, { scale: 0.4, x: '+=7', y: '+=7', opacity: 0 }, '-=1');
  tl2.to($circlesBottomRight.eq(2), 1, { scale: 0, x: '+=15', y: '-=5', opacity: 0 }, '-=1');
  
  tlBt2.set($circlesBottomRight, { x: 0, y: 0, rotation: 45 });
  tlBt2.add(tl2);

  btTl.add(tlBt1);
  btTl.to($(this).parent().find('.button.effect-button'), 0.8, { scaleY: 1.1 }, 0.1);
  btTl.add(tlBt2, 0.2);
  btTl.to($(this).parent().find('.button.effect-button'), 1.8, { scale: 1, ease: Elastic.easeOut.config(1.2, 0.4) }, 1.2);

  btTl.timeScale(2.6);

  $(this).on('mouseover', function() {
    btTl.restart();
  });
});

// Init AOS
function aos_init() {
  AOS.init({
    duration: 1000,
    once: false,
  });
}
$(window).on("load", function () {
  aos_init();
});