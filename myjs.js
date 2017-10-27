var img_top_coor = 0;
var img_left_coor = 0;
var center_img_ele = document.getElementById("center_img");

var thumb_count = 0;

var toggle_coor = "0px";
var untoggle_coor = "-300px";

var selected_thumb_id = "-1";

function reset_center_img(){
    center_img_ele.style.top = "0px";
    center_img_ele.style.left = "0px";
}

function move_center_img(user_input){
    
    if(user_input.keyCode == 38){
        img_top_coor = parseInt(get_style_val ("center_img", "top"));
        img_top_coor -= 10;
        center_img_ele.style.top = img_top_coor + "px";
    }
    else if(user_input.keyCode == 40){
        img_top_coor = parseInt(get_style_val ("center_img", "top"));
        img_top_coor += 10;
        center_img_ele.style.top = img_top_coor + "px";
    }
    else if(user_input.keyCode == 39){
        img_left_coor = parseInt(get_style_val ("center_img", "left"));
        img_left_coor += 10;
        center_img_ele.style.left = img_left_coor + "px";
    }
    else if(user_input.keyCode == 37){
        img_left_coor = parseInt(get_style_val ("center_img", "left"));
        img_left_coor -= 10;
        center_img_ele.style.left = img_left_coor + "px";
    }
}

function get_style_val (ID, attribute){
    var result = window.getComputedStyle(document.getElementById(ID)).getPropertyValue(attribute)
    return result;
}

function save_thumb (){
    img_source = center_img_ele.src;
    if (img_source != ''){
        var ndiv  = document.createElement("div");
        var nImg = document.createElement("img");

        ndiv.className = "thumbnail col-xm-6 col-sm-3 col-md-2 col-lg-1";
        nImg.className = "thumb_img";
        nImg.id = "thumb_img_" + thumb_count;

        document.getElementById("center_thumb").appendChild (ndiv);
        ndiv.appendChild(nImg);

        nImg.src = img_source;


        nImg.onclick = function(){change_thumbnail(nImg.id)};
        console.log(nImg.id);
    }
}

function change_thumbnail (thumb_id){
    center_img_ele.src = document.getElementById(thumb_id).src;
    selected_thumb_id = thumb_id;
    set_selection("Currntly selected: " + thumb_id)
}

function change_img_size(){
    var new_size = document.getElementById("ctrl_range").value;
    center_img_ele.style.height = new_size + "vh";
    center_img_ele.style.width = new_size + "vw";
}

function change_img_url (new_source){
    center_img_ele.src = new_source;
}

document.getElementById("control_toggle").addEventListener("click", function(){
    var ctrl_top_coor = window.getComputedStyle(document.getElementById("control")).getPropertyValue('top');
    
    if (ctrl_top_coor == untoggle_coor){
        document.getElementById("control").style.top = toggle_coor ;
    }
    else{
        document.getElementById("control").style.top = untoggle_coor ;
    }
});

document.getElementById("ctrl_butt_1").addEventListener("click", function(){
    if (selected_thumb_id != "-1"){
        document.getElementById(selected_thumb_id).src = "Img/img1.png";
    }else{
        document.getElementById("center_img").src = "Img/img1.png";
        reset_center_img();
    }
});

document.getElementById("ctrl_butt_2").addEventListener("click", function(){
    if (selected_thumb_id != "-1"){
        document.getElementById(selected_thumb_id).src = "Img/img2.png";
    }else{
        document.getElementById("center_img").src = "Img/img2.png";
        reset_center_img();
    }
});

document.getElementById("ctrl_butt_3").addEventListener("click", function(){
    if (selected_thumb_id != "-1"){
        document.getElementById(selected_thumb_id).src = "Img/img3.png";
    }else{
        document.getElementById("center_img").src = "Img/img3.png";
        reset_center_img();
    }
});

document.body.addEventListener("keyup", function(ev){
    move_center_img(ev);
});

document.getElementById("ctrl_button_plus").addEventListener("click", function(){
    if( thumb_count < 20 ){
        thumb_count += 1;
        save_thumb();
        
    }else{
        set_status("thumbnail exceeded 20");
    }
    
});

document.getElementById("ctrl_txt_field").addEventListener("keyup", function(ev){
    if (ev.keyCode == '13'){
        var new_src = document.getElementById("ctrl_txt_field").value;
        if (check_url(new_src)){
            if(selected_thumb_id != "-1"){
                document.getElementById(selected_thumb_id).src = new_src;
            }else{
                change_img_url(new_src);
                set_status("image loaded");
            }
            
        }
        
    }
});

function check_url (url_input){
    var result = true;
    var head_index = url_input.indexOf("http://");
    if(head_index == -1){
        head_index = url_input.indexOf("https://");
        if (head_index == -1){
            result = false;
            set_status("enter an actual link");
            return false;
        }
        
    }
    
    var check1 = url_input.indexOf("google");
    var check2 = url_input.indexOf("yahoo");
    var check3 = url_input.indexOf("printerest");
    var check4 = url_input.indexOf("twitter");
    var check5 = url_input.indexOf("wikipedia");
        
    console.log(check1);
    if(check1 != -1){
        result = false;
        set_status("google is banned");
    }
    else if(check2 != -1){
        result = false;
        set_status("yahoo is banned");
    }
    else if(check3 != -1){
        result = false;
        set_status("printerest is banned");
    }
    else if(check4 != -1){
        result = false;
        set_status("twitter is banned");
    }
    else if(check5 != -1){
        result = false;
        set_status("wikipedia is banned");
    }
    else{
        result = true;
    }
    
    return result;   
}

function set_status (message){
    document.getElementById("status").innerHTML = message;
}

function set_selection (message){
    document.getElementById("selection").innerHTML = message;
}

document.getElementById("ctrl_button_desel").addEventListener("click", function(){
    selected_thumb_id = "-1";
    set_selection("Currently selected: None");
});

