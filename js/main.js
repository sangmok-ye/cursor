const c = console.log.bind(document);
const wrap = $("#wrap");
const img_list = $(".img_wrap .img_list");
const img_li = $(".img_wrap li");
const li_first = $(".img_wrap li:first-child");
const li_last = $(".img_wrap li:last-child"); 
li_first.addClass("this_page");
const prev = $(".prev_btn");
const next = $(".next_btn");
let li_this,i;

function add_on(e){
  $(e).toggleClass("on")
}

function sib_class(e) {
  $(e).siblings().removeClass("dis_none")
  $(e).addClass("dis_none")
}

/* 버튼 클릭 */
let show = true;  
function next_btn(){
  li_this = $(".img_wrap li.this_page");
  i = li_this.index() + 1
  img_li.removeClass()
  if(wrap.hasClass("double")){
    if(show){
      show = false
    }else{
      i=i+1
    }
      img_li.eq(i).addClass("this_page").next().addClass("this_page")
  }else{
    img_li.eq(i).addClass("this_page")
    show=true
  }
  btn_able();
  list();
  mini_map()
  return false;
}

function prev_btn(){
  li_this = $(".img_wrap li.this_page");
  i = li_this.index() - 2
  img_li.removeClass()
  if(wrap.hasClass("double")){
    if(show){
      show = false
    }else{
      i=i+1
    }
    img_li.eq(i).addClass("this_page").prev().addClass("this_page")
  }else{
    img_li.eq(i+1).addClass("this_page")
    show=true
  }
  btn_able();
  list();
  mini_map()
  return false;

}

/* 버튼 비활성화 */
function btn_able(){
  if(li_first.hasClass("this_page")){
    prev.addClass("disable");
    show=true;
  }else if(li_last.hasClass("this_page")){
    next.addClass("disable")
  }else{
    prev.removeClass("disable")
    next.removeClass("disable")
  }
}

/* 한장씩 보기 */
$(".pair").click(function(){
  li_this = $(".img_wrap li.this_page");
  i = li_this.index()
  if(wrap.hasClass("double")){
    wrap.removeClass().addClass("single")
    img_li.removeClass().eq(i).addClass("this_page")
  }else{
    wrap.removeClass().addClass("double")
    if(!li_first.hasClass("this_page")){
      if(i%2==1){
        img_li.eq(i).next().addClass("this_page")
      }else{
        img_li.eq(i).prev().addClass("this_page")
      }
      show=false
    }
  }
  btn_able();
  list();
  mini_map()
})

/* 목차 */
function list(){
  let len = img_li.length;
  let list = $(".list li")
  li_this = $(".img_wrap li.this_page");
  i = li_this.index() + 1 
  let txt = i+" / "+len

  if(wrap.hasClass("double")){
    if(!li_first.hasClass("this_page")&&!li_last.hasClass("this_page")){
      txt = i+"-"+(i+1)+" / "+len
    }
  }
  
  list.hover(function(){
    $(this).text("목차 보기")
  }, function(){
    list.text(txt)
  })
  list.text(txt)
  list.click(function(){
    $(".bg, .img_thums_wrap").toggleClass("on")
  })
 }
list()

$(".bg").click(function(){
  $(".bg, .img_thums_wrap").toggleClass("on")
})

$(".img_thums_wrap li").click(function(){
  i = $(this).index()
  img_li.removeClass().eq(i).addClass("this_page")
  if(wrap.hasClass("double")){
    if(i != 0){
      if(i % 2 == 1){
        i=i+1
        img_li.eq(i).addClass("this_page")
      }else{
        i=i-1
        img_li.eq(i).addClass("this_page")
      }
    }

  }
  $(".bg, .img_thums_wrap").toggleClass("on")
  list()
  mini_map()
}).each(function(){
  let this_idx = $(this).index() +1;
  let this_len = $(".img_thums li").length; 

  $(this).append("<span>"+this_idx+"/"+this_len+"</span>")
})



/* 마우스 휠 감지 */
$(window).on('mousewheel DOMMouseScroll', function(e){
  let wheel = e.originalEvent.wheelDelta;
  let zoom = img_list.hasClass("zoom") || $(".img_thums_wrap").hasClass("on")
  
  if(!zoom){
    if(wheel>0&&!li_first.hasClass("this_page")){
        prev_btn()
    }else if(wheel<0&&!li_last.hasClass("this_page") && !li_last.hasClass("next_page")){
        next_btn(); 
    } 
  }
})

/* 드래그 이벤트 */
let drag = false;
let x,y,x1=0,y1=0;
let drag_chk = false;

$(window).mousemove(function(e){
  if(drag){
    drag_chk = true;
    x=x1 - e.pageX / 10
    y=y1- e.pageY / 10
    let st = $(this).scrollTop(); 
    let sl = $(this).scrollLeft();
      
    $(this).scrollTop(st+y);
    $(this).scrollLeft(sl+x);
  }else{
    drag_chk=false;
  }
  return false;
})
$(window).mousedown(function(e) {
    drag=true;
    x1=e.pageX / 10;
    y1=e.pageY / 10;
    return false;
});
$(window).mouseup(function() {
    drag = false;
    return false;
}); 

/* 줌 이벤트 */
$(".img_wrap .img_list,.zoom li").click(function(){
  let has_zoom = img_list.hasClass("zoom")
  
  if(!drag_chk){
    img_list.toggleClass("zoom")
    $(".mini_view_wrap").toggleClass("on")
    $(".zoom li.dis_none").removeClass().siblings().addClass("dis_none")
    if(!has_zoom){
      $(".toast_m").fadeIn(500)
      setTimeout(()=>{$(".toast_m").fadeOut(500)},1000)
    }
  }
})


/* esc 키프레스 */
$(window).keydown(function(e){
  if(e.which==27) {
    if(img_list.hasClass("zoom")){
      img_list.removeClass("zoom")
      $(".mini_view_wrap").removeClass("on")
      $(".zoom li.dis_none").removeClass().siblings().addClass("dis_none")
    }
  }
})

function mini_map(){
  let len = $(".img_wrap li.this_page").length+1;
  let this_idx=$(".img_wrap li.this_page").index(); 

  $(".mini_view_wrap ul").empty(); 
  for(let i=1; i<len;i++){
    // $(".mini_view_wrap").clear(); 
    $(".mini_view_wrap ul").append("<li><img src='img/page/ebook_"+(this_idx+i)+".jpg'></li>")
  }
  $(".mini_view_wrap").css({
    "width":$(".img_wrap").width()*.1,
    "height":$(".img_wrap").height()*.1
  })
  $(".mini_view_wrap .view").css({
    "width":$(document).width()*.05,
    "height":$(document).height()*.05,
  })
}
mini_map()

// 
$(document).mousemove(function(){
  let st = $(window).scrollTop() / ( $(document).height() - $(window).height());  
  let sl = $(window).scrollLeft() / ( $(document).width() - $(window).width());  
  let mini_w = $(".mini_view_wrap").width() - $(".mini_view_wrap .view").width()
  let mini_h = $(".mini_view_wrap").height() - $(".mini_view_wrap .view").height()

  if($(".mini_view_wrap").hasClass("on")){
    $(".mini_view_wrap .view").css({
      "top":mini_h*st,
      "left":mini_w*sl
    })
  }
})

