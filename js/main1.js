const c = console.log.bind(document);

function add_on(e){
  $(e).toggleClass("on")
}

function sib_class(e) {
  $(e).siblings().removeClass("dis_none")
  $(e).addClass("dis_none")
}

/* 첫번째 이미지 액티브 */
$(function () {
  $(".img_wrap li").eq(0).attr("class", "this_page");
  $(".img_wrap li").eq(1).attr("class", "next_page");
  $(".pager li").eq(0).addClass("on")
})

/* btn 비활성화 */
function btn() {
  $(function () {
    let li_fir = $("li:first-child").hasClass("this_page");
    let li_last = $("li:last-child").hasClass("next_page") || $("li:last-child").hasClass("this_page");

  
      if (li_fir) {
        $(".prev_btn").addClass("btn_disable")
      } else if (li_last) {
        $(".prev_btn").removeClass("btn_disable")
        $(".next_btn").addClass("btn_disable")
      } else {
        $(".prev_btn,.next_btn").removeClass("btn_disable")
      }
  })
}
btn();

/* 이전, 다음장 */
function btn_click(target, num1, num2){
    let i; 
    let img_idx = $(".img_wrap li.this_page").index() / 2 + 1
    if($("#wrap").hasClass("double")){
      i = $("li.this_page").index() + num1;
      $("li").removeClass("this_page").removeClass("next_page");
      $("li").eq(i).addClass("this_page");
      $("li").eq(i).next().addClass("next_page");
      btn();
      page_list();
      page_active();
      $(".pager li").removeClass().eq(img_idx).addClass("on")
      list_num()
    }else{
      i = $("li.this_page").index() + num2;
      $("li").removeClass("this_page").removeClass("next_page");
      $("li").eq(i).addClass("this_page");
      btn();
      page_list();
      page_active();
      img_idx = $(".img_wrap li.this_page").index()
      $(".pager li").removeClass().eq(img_idx).addClass("on")
      list_num()
    }
}


/* 두장씩보기, 한장씩보기 */
$(".pair_wrap li").click(function () {
  let this_page = $("li.this_page")
  if($(this).hasClass("double")){
    $("#wrap").removeClass("single");
    $("#wrap").addClass("double");
    btn();  
    if(this_page.index() % 2 == 1){
      this_page.addClass("next_page")
      this_page.removeClass("this_page").prev().addClass("this_page")
    }else{
      this_page.next().addClass("next_page")
    }
    page_list();
    page_active();
    list_num()
    $(".pager li").removeClass().eq(Math.floor(this_page.index()/2)).addClass("on")
  }else{
    $("#wrap").addClass("single");
    $("#wrap").removeClass("double");
    $("li").removeClass("next_page"); 
    btn();
    page_list();
    page_active();
    $(".pager li").removeClass().eq(this_page.index()).addClass("on")
    list_num()
  }
})

/* 목차보기 */
$(".bg, .list_view").click(function(){
  $(".img_thums_wrap").toggleClass("on")
  $(".bg").toggleClass("on")
})

function list_num(){
  $(function(){
  let img_idx =  $(".img_wrap li").length;
  let this_idx =  $(".img_wrap li.this_page").index() +1;
  let this_page
  if($("#wrap").hasClass("double")){
    this_page = this_idx+"-"+(this_idx+1)
  }else{
    this_page = this_idx
  }
  $(".list_view li").hover(function(){
    $(this).text("목차보기")
  }, function(){
      $(this).text(this_page+"/"+img_idx)
  })
  .text(this_page+"/"+img_idx)
})
}
list_num()

$(".img_thums li").click(function(){
  let i = $(this).index();
  $(".img_wrap li").removeClass();
  $(".img_thums_wrap").toggleClass("on")
  $(".bg").toggleClass("on")
  btn()

  if($("#wrap").hasClass("double")){
    if(i % 2 == 1){
      $(".img_wrap li").eq(i).addClass("next_page").prev().addClass("this_page")
    }else{
      $(".img_wrap li").eq(i).addClass("this_page").next().addClass("next_page")
    }
    let img_idx = $(".img_wrap li.this_page").index() / 2 
    $(".pager li").removeClass().eq(img_idx).addClass("on")
  }else{
    $(".img_wrap li").eq(i).addClass("this_page")
    img_idx = $(".img_wrap li.this_page").index() 
    $(".pager li").removeClass().eq(img_idx).addClass("on")
  }
  page_active()
  list_num()
})



/* 줌 이벤트 */
$(".img_wrap .img_list, .zoom li").click(function () {
  if(!drag_chk){
    $(".img_list").toggleClass("zoom")
    $(".zoom li.dis_none").removeClass("dis_none").siblings().addClass("dis_none")
    let has_zoom = $(".img_list").hasClass("zoom")
    if(has_zoom){
      $(".toast_m").fadeIn(500)
      setTimeout(()=>{$(".toast_m").fadeOut(500)},1000)
    }
  }
})

/* esc 키프레스 */
$(window).keydown(function(e){
  if(e.which==27) {
    if($(".img_list").hasClass("zoom")){
        $(".img_list").removeClass("zoom")
        $(".zoom li.dis_none").removeClass("dis_none").siblings().addClass("dis_none")
    }
  }
})


/* 드래그 이벤트 */
let drag = false;
let x,y,x1=0,y1=0;
let drag_chk = false;

$(".img_wrap .img_list").mousemove(function(e){
  if(drag){
    drag_chk = true;
    x=x1 - e.pageX / 10
    y=y1- e.pageY / 10
    let st = $(window).scrollTop(); 
    let sl = $(window).scrollLeft();
      
    $(window).scrollTop(st+y);
    $(window).scrollLeft(sl+x);
  }else{
    drag_chk=false;
  }
  return false;
})


$(".img_wrap .img_list").mousedown(function(e) {
    drag=true;
    x1=e.pageX / 10;
    y1=e.pageY / 10;
    return false

});
$(".img_wrap .img_list").mouseup(function() {
    drag = false;
    return false;
}); 

/* 페이저 노출 */
function page_list(){
  let page = $(".pager");
  page.empty()
  let img_len = $(".img_wrap ul").children().length; 
    if($("#wrap").hasClass("double")){
      for(let i=1; i<img_len/2+1; i++){
        let num = i*2-1
        page.append(`<li onclick="pager_btn(this)">`+num+`-`+(num+1)+`</li>`)
      }
    }else{
      for(let i=1; i<img_len+1; i++){
        page.append(`<li onclick="pager_btn(this)" >`+i+`</li>`)
      }
    }
    return false;
  }
page_list(); 

function page_active(){
  let img_idx = $(".img_wrap li.this_page").index()  *2;
  if($("#wrap").hasClass("double")){
    $(".pager li ul").removeClass("on").eq(Math.round(img_idx)).addClass("on")
  }else{
    img_idx = $(".img_wrap li.this_page").index() ;
    $(".pager li ul").removeClass("on").eq(img_idx).addClass("on")
  }
}
page_active()

function pager_btn(e){
    let i = $(e).index()
    $(".pager li").removeClass()
    $(e).addClass("on")
    $(".img_wrap li").removeClass();
    btn()
    
    if($("#wrap").hasClass("double")){
      i = (i+1)*2 -1;
      if(i % 2 == 1){
        $(".img_wrap li").eq(i).addClass("next_page").prev().addClass("this_page")
      }else{
        $(".img_wrap li").eq(i).addClass("this_page").next().addClass("next_page")
      }
    }else{
      i= i
      $(".img_wrap li").eq(i).addClass("this_page")
    }
    page_active()
    return false;
  }


function pager_move_btn(num){
  let timer;
    if(!timer){
      timer = setTimeout(function(){
        timer = null;
        let p_st = $(".pager").scrollTop() + num
        $(".pager").stop().animate({
          scrollTop:p_st
        },300)
        return false;
      },300)
    }
}

  $(window).on('mousewheel DOMMouseScroll', function(e){
    let wheel = e.originalEvent.wheelDelta;
    let img_list1= $(".img_list li").eq(0).hasClass("this_page")
    let img_list_last = $(".img_list li:last-child").hasClass("this_page") || $(".img_list li:last-child").hasClass("next_page")
    let zoom = $(".img_wrap .img_list").hasClass("zoom") || $(".img_thums_wrap").hasClass("on")
    this_idx =  $(".img_thums_wrap li.this_page").index()+2;
    if(!zoom){
      if(wheel>0){
        if(!img_list1){
          btn_click(this,-2,-1)
        }else{
        }
      }else{
        if(!img_list_last){
          btn_click(this,2,1)
        }
      } 
    }
  })

$(".img_thums li").each(function(){
  let this_idx = $(this).index() +1;
  let this_len = $(".img_thums li").length; 

  $(this).append("<span></span>")
  $(this).find("span").text(this_idx+"/"+this_len); 
})
