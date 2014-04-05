


function info_mouse_over(td_obj) {
    if(td_obj.className == "hdr_info3") {
        td_obj.className = "hdr_info4";
    }
    else {
        td_obj.className = "hdr_info2";
    }
}

function info_mouse_out(td_obj) {
    if(td_obj.className == "hdr_info4") { td_obj.className = "hdr_info3";} else { td_obj.className = "hdr_info1";}
}

function info_mouse_click(td_obj) {
    if(td_obj.className == "hdr_info1") {n = "hdr_info3"; animatedcollapse.toggle('hdr2');}
    if(td_obj.className == "hdr_info2") {n = "hdr_info4"; animatedcollapse.toggle('hdr2');}
    if(td_obj.className == "hdr_info3") {n = "hdr_info1"; animatedcollapse.toggle('hdr2');}
    if(td_obj.className == "hdr_info4") {n = "hdr_info2"; animatedcollapse.toggle('hdr2');}
    td_obj.className = n;
}



function checkPic() {

    var chkPic = document.getElementById("chk_picture").checked;

    if(chkPic==true) { document.getElementById("ci_hdr_pic").innerHTML = document.getElementById("ci_pic").innerHTML;
    }

    else {
        document.getElementById("ci_hdr_pic").innerHTML = "";
    }

}


function checkQR() {
    var chkQR = document.getElementById("chk_qrcode").checked;
    if(chkQR==true) {
        var qrtag = new QRtag();
        qrtag.link("http://www.9res.com/bmclaugh-res1");
        qrtag.size(105);
        qrtag.border(0);
        qrtag.color("#95E2FF");
        qrtag.bgcolor("#ffffff");
        qrtag.target("ci_qrcode");
        qrtag.image();
    }
    else { document.getElementById("ci_qrcode").innerHTML ="";}
}


jQuery(function ($) {

    animatedcollapse.init();


    animatedcollapse.addDiv('hdr2', 'fade=0,speed=400,height=128px,hide=1');
    animatedcollapse.ontoggle = function ($, divobj, state) { //fires each time a DIV is expanded/contracted
        //$: Access to jQuery
        //divobj: DOM reference to DIV being expanded/ collapsed. Use "divobj.id" to get its ID
        //state: "block" or "none", depending on state
    }

    //                $("#phonenum1").mask("(9ZZ) ZZZ-ZZZZ", {translation:  {'Z': {pattern: /[0-9]/, optional: true}}});
    //                $("#phonenum2").mask("(999) 999-9999");


    $("#phonenum1").mask("(9?99) 999-9999");
    $("#phonenum2").mask("(9?99) 999-9999");

    $("#zipCode").mask("9?9999-9999");

});



