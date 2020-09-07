$(function($){ 
    function openNav(){
    $('#header').toggleClass('on')
        if($('#header').hasClass('on')){
            $('.nav').css({
            display:'block'
            }).animate({
                right:'0px'
            },500)
        } else {
            $('.nav').animate({
                right:'-320px'
            },500, function(){
                $(this).css({  
                    display:'none'
                })
            })
        }
        // $('.outlayer').toggleClass('on')
    }

    $('.open-gnb').on('click', openNav)
    $('.outlayer').on('click', openNav)

    $(window).resize(function(){
        var winWidth = $(this).innerWidth ()
        if (winWidth > 800) {
            $('#header').removeClass('on')
            $('.nav').css({
                display:'block',
                right:'0px',
                
            })
        }else if (winWidth<=800){
            $('#header').removeClass('on')
            $('.nav').css({
                display:'none',
                right:'-320px',
            })
        }
    })
      //메인슬라이드 연결 
      $('.slide-inner').slick({
        autoplay:true, // 자동재생
        dots:true, //동그라미 버튼
        autoplaySpeed:4500, // 슬라이드 재생 시간
        slidesToShow:1, //보여질 슬라이드 수(생략가능)
        slldesToScroll:1, //이동 슬라이드 수(생략가능)
        pauseOnHover:true, // 마우스오버시 멈춤여부(생략가능)
        pauseOnDotHover:false, //동그라미 버튼에 호버시 자동실행 멈춤여부
        pauseOnFocus:true, //동그라미 버튼에 클릭시 자동실행 멈춤여부
        cssEase:'ease', //속도함수 (생략가능)
        draggdle:true, //마우스 드래그시 슬라이드 교체가능 (생략가능)
        fade:false, //슬라이드 수평으로 이동하지 않고 제자리에서 사라지고 나타남
        arrows:true, // 좌우 화살표 사용여부
        prevArrow:'<button class="marrow prevArrow"><i class="fas fa-angle-left"></i></button> ',
        nextArrow:'<button class="marrow nextArrow"><i class="fas fa-angle-right"></i></button>',
        responsive: [{
            breakpoint: 801,
            settings: {
                arrows: false,
                fade: true,
            }
        }]

    })
    $('.plpa').toggle( 
        function(){
        $(this).find('i').removeClass('fa-pause')
        .addClass('fa-play')
        $('.slide-inner').slick('slickPause')
    },
    function(){
        $(this).find('i').removeClass('fa-play')
        .addClass('fa-pause')
        $('.slide-inner').slick('slickPlay')
    })
    
    var href, src, alt, lieq;
  $('.gellary > li > a').on('click', function(e){
    e.preventDefault();//기본 이벤틀 막아줌
    lieq = $(this).parent().index()
    $('.gellaryPopup').addClass('on')
    href = $(this).attr('href')
    src = $(this).find('img').attr('src')
    alt = $(this).find('img').attr('alt')
    //console.log(alt)
    $('.popuplist > div > a').attr('href',href)
    $('.popuplist > div > a > img').attr({
        'src':src,
        'alt':alt
    })
 
  })

  $('.gellaryPopup .close, .gellaryPopup').on('click',function(){
      $('.gellaryPopup').removeClass('on')
  })
  $('.popuplist').on('click',function(e){
      e.stopPropagation(); //부모한테 이벤트 전파를 막음
  }) 
  function changeList(ind){
    href = $('.gellary > li').eq(ind).find('a').attr('href')
    src = $('.gellary > li').eq(ind).find('img').attr('src')
    alt = $('.gellary > li').eq(ind).find('img').attr('alt')
    $('.popuplist > div > a').attr('href',href)
    $('.popuplist > div > a > img').attr({
        'src':src,
        'alt':alt
  }).css({
      opacity:'0.5'
  }).stop().animate({
      opacity:'1'
  }, 500)
}

  $('.popuplist .prev').on('click',function(){
    --lieq;
    if (lieq < 0){
        lieq = 7;
    }
    changeList(lieq)
  })

  $('.popuplist .next').on('click',function(){
    ++lieq;
    if (lieq > 7){
        lieq = 0;
    }
    changeList(lieq)
    })
    
    var sct=0;
    var winHeight; 
	$(window).scroll(function(){
        sct=$(this).scrollTop();
        winHeight = $(this).height()
		if(sct>=winHeight){
            $(".header-outer").css({
                background:'rgba(0,0,0,1)'
            });
            
		} else {
            $(".header-outer").css({
                background:'rgba(0,0,0,1)'
            });
        }

        // 스크롤탑값이 100이상이 되면 맨위로 버튼이 보이고 100미만이면 숨기기
        if(sct>=100){
            $(".gotop").addClass("on").stop().animate({
                opacity:"1"
            },500)
        }else{
            $(".gotop").removeClass("on").stop().animate({
                opacity:"0"
            },500)
        }
        // sct 값이 # 
        if(sct >= $("#Abilitys").offset().top) {
            $(".skilcontainer").stop().fadeIn(300)
        }else{
            $(".skilcontainer").hide()
        }
    });
    $(".gotop").on("click",function(){
        $("html,body").stop().animate({
            scrollTop:"0"
        },800,"linear")
    })
    
    $('.nav .depth1 > li > a').on('click', function(e){
        e.preventDefault();
        $(this).parent().addClass('on')
        $(this).parent().siblings().removeClass('on')
        var index = $(this).parent().index()
        $('body, html').stop().animate({
            scrollTop:index*winHeight
        }, 800)
        //return false
 
    })

    $(".section").on("mousewheel",function(e, wh){    
        var index = $(this).index()
		//마우스 휠을 올렸을때	
          if (wh > 0) {  
			//변수 prev에 현재 휠을 움직인 section에서 이전 section의 offset().top위치 저장
             var prev = $(this).prev().offset().top;
             $('.depth1 li').eq(index-1).addClass('on')
             $('.depth1 li').eq(index-1).siblings().removeClass('on')
			 //문서 전체를 prev에 저장된 위치로 이동
			 $("html,body").stop().animate({
                 scrollTop:prev
                },800,"linear");
		//마우스 휠을 내렸을때	 
          }else if (wh < 0) {  
			//변수 next에 현재 휠을 움직인 section에서 다음 section의 offset().top위치 저장
             var next = $(this).next().offset().top;
             $('.depth1 li').eq(index+1).addClass('on')
            $('.depth1 li').eq(index+1).siblings().removeClass('on')
			 //문서 전체를 next에 저장된 위치로 이동
			 $("html,body").stop().animate({
                 scrollTop:next
                },800,"linear");                                         
          }
        
     });


 
})(jQuery)