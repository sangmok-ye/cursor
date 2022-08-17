const c = console.log.bind(document);
const double = $("#wrap").hasClass("double")
const single = $("#wrap").hasClass("single")
const img_li = $(".img_wrap li")
const img_li_first = img_li.eq(0)
// const img_li_last = $(".img_wrap li:last-child")
const img_li_last = img_li.last()
const this_page = $(".img_wrap li.this_page")

function add_on(e){
  $(e).toggleClass("on")
}

function sib_class(e) {
  $(e).siblings().removeClass("dis_none")
  $(e).addClass("dis_none")
}

/* 첫번째 이미지 액티브 */
$(function () {
  img_li.eq(0).attr("class", "this_page");
  img_li.eq(1).attr("class", "next_page");
  $(".pager li").eq(0).addClass("on")
})

/* btn 비활성화 */
function btn_able(){
  $(function () {
    if (img_li_first.hasClass("this_page")) {
      $(".prev_btn").addClass("btn_disable")
    } else if (img_li_last.hasClass("next_page") || img_li_last.hasClass("this_page")) {
      $(".prev_btn").removeClass("btn_disable")
      $(".next_btn").addClass("btn_disable")
    } else {
      $(".prev_btn,.next_btn").removeClass("btn_disable")
    }
  })
}
btn_able()

/* 이전, 다음장 버튼 */
function btn_click(target, num1, num2){
  let i; 
  if(double){
    i = $(".img_wrap li.this_page").index() + num1
    img_li.removeClass().eq(i).addClass("this_page")
    img_li.eq(i).next().addClass("next_page")
  }else{
    i = $(".img_wrap li.this_page").index() + num2;
    $("li").removeClass();
    $("li").eq(i).addClass("this_page");
  }
  btn_able()
}


/* 두장씩보기, 한장씩보기 */
function pair(e){
  $("#wrap").removeClass()
  let img_this = $(".img_wrap li.this_page")

  if($(e).hasClass("two")){
    $("#wrap").removeClass().addClass("double");
    img_this.next().addClass("next_page")
  }else{
    $("#wrap").addClass("single");
    img_this.next().removeClass()
  }
  btn_able()
}