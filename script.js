var button_audio=new Audio("https://monoame.com/awi_class/ballsound/click14.wav");
var screen_audio=new Audio("https://monoame.com/awi_class/ballsound/click18.wav");
var home_audio=new Audio("https://monoame.com/awi_class/ballsound/click23.wav");
var wiggle_audio=new Audio("https://monoame.com/awi_class/ballsound/phonevi.mp3");

$(".i5").click(function(){
    $(".phone").css("width","");
    $(".screen").css("height","");
    $(".phone_name").text($(this).text());
    $("#addbtn").css("right","")
                .css("font-size","");    
    button_audio.play();
  });
$(".i5s").click(function(){
    $(".phone").css("width","250px");
    $(".screen").css("height","420px");
    $(".phone_name").text($(this).text());
    $("#addbtn").css("right","")
                .css("font-size","");    
    button_audio.play();
  }); 
$(".i6").click(function(){
    $(".phone").css("width","270px");
    $(".screen").css("height","440px");
    $(".phone_name").text($(this).text());
    $("#addbtn").css("right","7px")
                .css("font-size","25px");
    button_audio.play();
  });
$(".i6s").click(function(){
    $(".phone").css("width","300px");
    $(".screen").css("height","480px");
    $(".phone_name").text($(this).text());
    $("#addbtn").css("right","10px")
                .css("font-size","32px");
    button_audio.play();
  });

let page = 0;
$(".button").click(()=>{
    page+=1;
    if(page > 1){
        page = 0;
    }
    $(".pages").css("left",`-${page*100}%`);
    home_audio.play();
})
let rotate = 0;
$(".turn").click(()=>{
    rotate = rotate + 360;
    if(rotate > 360){
        rotate = 0;
    }
    $(".phone").css("transform",`rotate(${rotate}deg)`)
})
$(".wiggle").click(()=>{
    wiggle_time = 0;
    wiggle_audio.play();
})
var wiggle_time = 21;
setInterval(()=>{
    if (wiggle_time <= 20){
        wiggle_time+=1;
        if (wiggle_time%2 == 0){
            $(".phone").css("left","30px")
        }else{
            $(".phone").css("left","-30px")
        }
    }
    if (wiggle_time == 21){
        $(".phone").css("left","");
    }
},60)

// ????????????
var shoplist={};
shoplist.name="MyBuylist ????????????";
shoplist.time="2020/12/10";
shoplist.list=[
  {name: "??????",price: 300},
  {name: "?????????",price: 9000},
  {name: "????????????",price: 54555},
  {name: "Iphone 12",price: 32000},
  {name: "PS5",price: 50000}
];

//??????????????????html?????????{{??????}}????????????????????????
var item_html="<li id={{id}} class='buy_item'>{{num}}.{{item}}<div class='price'>{{price}}</div><div id={{del_id}} data-delid={{del_item_id}} class='del_btn'>X</div></li>";

var total_html="<li class='buy_item total'>??????<div class='price price2'>{{price}}</div></li>";


var show_list = ()=>{
    $("#items_list").html("");
    var id = 0;
    shoplist.list.forEach(($$)=>{
        var total_price = 0;
        id = id + 1;
        var item = $$.price;
        total_price+=item;
        // console.log(total_price);
        var now_item_html = item_html.replace("{{num}}", id)
                                     .replace("{{item}}", $$.name)
                                     .replace("{{price}}", $$.price)
                                     .replace("{{id}}", `buyitem_${id-1}`)
        $("#items_list").append(now_item_html);
        
    })
}
show_list();//??????????????????????????????????????????
function showlist(){
  $("#items_list").html("");
  var total_price=0;
  //????????????????????????
  for(var i=0;i<shoplist.list.length;i++){
    var item=shoplist.list[i];
    var item_id="buyitem_"+i;
    var del_item_id="del_buyitem_"+i;
    
    //??????????????????(????????????????????????)
    total_price+=parseInt(item.price);
    
    //???????????????????????????replace(????????????,?????????...)
    var current_item_html=
        item_html.replace("{{num}}",i+1)
                 .replace("{{item}}",item.name)
                 .replace("{{id}}",item_id)
                 .replace("{{del_id}}",del_item_id)
                 .replace("{{price}}",item.price)
                 .replace("{{del_item_id}}",i);
    
    //???????????????????????????jquery??????
    $("#items_list").append(current_item_html);
    $("#"+del_item_id).click(
      function(){
        remove_item(parseInt($(this).attr("data-delid")));
      }
    );
  }
  //?????????????????????
  var current_total_html=
      total_html.replace("{{price}}",total_price);
  $("#items_list").append(current_total_html);
}
//??????????????????????????????????????????function ???????????????
showlist();

$("#addbtn").click(()=>{
    if ($("#input_name").val() == "" || $("#input_price").val() == ""){
        alert("???????????????????????????????????????")
    }else{
        shoplist.list.push({
            name : $("#input_name").val(),
            price : $("#input_price").val()
        });
        $("#input_name").val("");
        $("#input_price").val("");
        showlist();
    }
});

//???????????? ??????.splice(??????,??????) 
//????????????->??????????????????????????????
function remove_item(id){
    shoplist.list.splice(id,1);
    showlist();
  }