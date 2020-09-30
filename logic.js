function login(){
    var username = document.getElementById("tfUsernameLog").value;
    var password = document.getElementById("tfPasswordLog").value;
    var eM = document.getElementById("errMsgLog");
    var valid = false;

    if(username == ""){
        eM.innerHTML = "Username field must be filled";
    }else if(password == ""){
        eM.innerHTML = "Password field must be filled";
    }else{
        for(var i = 1; i <= localStorage.length; i++){
            var idx = "1111" + i;
            let temp = localStorage.getItem(idx.toString());
            try {
                var un = temp.split(";");
            } catch (error) {
                continue;
            }
            if(username == un[1] && password == un[2]){
                var uAc = un[0]+";"+un[1]+";"+un[2]+";"+un[3]+";"+un[4]+";"+un[5];
                localStorage.setItem("userActiveUn", un[1]);
                localStorage.setItem("userActiveNow", uAc);
                valid = true;
                break;
            }
        }

        // check user auth valid
        if(valid){
            window.location.href = "DashboardPage.html";
        }else{
            eM.innerHTML = "Username and Password Invalid";
        }
    }
}

function val_insertUser(){
    var name = document.getElementById("tfName").value;
    var username = document.getElementById("tfUsername").value;
    var password = document.getElementById("tfPassword").value;
    var email = document.getElementById("tfEmail").value;
    var gender = document.getElementsByName("gender");
    var dob = document.getElementById("dobPicker").value;
    var eM = document.getElementById("errMsg");
    if(name == ""){ // Name field Must be filled
        eM.innerHTML = "Name field must be filled!";
    }else if(name.length < 3){ // Name Length must be greater than 2 characters
        eM.innerHTML = "Name Length must be greater than 2 characters (min. 3 characters)!";
    }else if(username == ""){ // Username field must be filled
        eM.innerHTML = "Username field must be filled!";
    }else if(username.length < 5){ // Name Length must be greater than 4 characters
        eM.innerHTML = "Username Length must be greater than 4 characters (min. 5 characters)!";
    }else if(checkSpace(username) == false){ // username Cannot contain space character (' ')
        eM.innerHTML = "Username cannot contain space character (' ')!";
    }else if(password == ""){ // Password field must be filled
        eM.innerHTML = "Password field must be filled!";
    }else if(password.length < 6){ // Name Length must be greater than 5 characters
        eM.innerHTML = "Password Length must be greater than 5 characters (min. 6 characters)!";
    }else if(alphaNumeric(password) == false){ // Password field Must be alphanumeric (contain letter and digit)
        eM.innerHTML = "Password must be alphanumeric (contain letter and digit)!";
    }else if(email == ""){ // Email field must be filled
        eM.innerHTML = "Email field must be filled!";
    }else if((!email.includes('.')) || (!email.includes('@'))){ // Email field Must contain ‘@’ and ‘.’
        eM.innerHTML = "Email must contains '.' and '@' (Invalid Email)!";
    }else if(gender[0].checked == false && gender[1].checked == false){ // Gender must be choosen
        eM.innerHTML = "Gender must be choosen!"
    }else if(dob == ""){ // Date of Birth field must be picked
        eM.innerHTML = "Date of Birth field must be picked!"
    }else{
        var gen = "";
        if(gender[0].checked == true){
            gen = "Male";
        }else{
            gen = "Female";
        }
        var users = name+";"+username+";"+password+";"+email+";"+gen+";"+dob;
        // insert user register to database
        localStorage.setItem("1111"+(localStorage.length+1).toString(), users);
        alert("Your Account Created. :)");
        window.location.href = "LoginPage.html";
    }
}

//function to check space for username field
function checkSpace(Username){
    var sp = 0;
    for(var i = 0; i < Username.length; i++){
        if(Username.charCodeAt(i) == 32) sp++;
    }
    if(sp == 0){
        return true;
    }else{
        return false;
    }
}

//function to check alphanumeric for password field
function alphaNumeric(Password){
    var alpha = 0;
    var num = 0;
    for(var i = 0; i < Password.length; i++){
        var ps = + Password.charCodeAt(i);
        if(ps >= 65 && ps <= 90) alpha++;
        if(ps >= 97 && ps <= 122) alpha++;
        if(ps >= 48 && ps <= 57) num++;
    }
    if(alpha == 0 || num == 0){
        return false;
    }else{
        return true;
    }
}

function logout(){
    // remove the current user active
    localStorage.removeItem("userActiveUn");
    localStorage.removeItem("userActiveNow");
    // redirect to login page
    window.location.href = "LoginPage.html";
}

function loadUsername(){
    var txtUn = document.getElementById("usernameActive");
    var txtdata = document.getElementById("forum_data");
    var un = localStorage.getItem("userActiveUn");
    txtUn.innerHTML = "Welcome, " + un +"! Have a nice day :)";
    // view thread forum data
    var a = "";
    for(var i = 1; i <= localStorage.length; i++){
        var idx = "2222" + i;
        let temp = localStorage.getItem(idx.toString());
        try {
            var th = temp.split(";");
        } catch (error) {
            continue;
        }
        var rslt = "<div class=\"forum_dataDetail\"><div style=\"text-align: right;\"><label>"+th[3]+"</label></div><label>From: </label> <span>"+th[0]+"</span><br><label>Title: </label> <span>"+th[1]+"</span><br><br><p>"+th[2]+"</p><div style=\"text-align: right;\"><br><input type=\"text\" id=\"tfReply\" placeholder=\"Your reply\"><input type=\"button\" value=\"REPLY\" onclick=\"val_insertReply()\"><div id=\"errMsgRp\" style=\"color: red;\">&nbsp;</div></div><div id=\"forum_reply\"></div></div>"
        a = a + rslt;
        txtdata.innerHTML = a;
    }
    // view reply forum data
    var txtdataR = document.getElementById("forum_reply");
    var b = "";
    for(var i = 1; i <= localStorage.length; i++){
        var idx = "3333" + i;
        let temp = localStorage.getItem(idx.toString());
        try {
            var rp = temp.split(";");
        } catch (error) {
            continue;
        }
        var rslt = "<div class=\"replyDetail\"><div style=\"text-align: right;\"><label>"+rp[2]+"</label></div><label>From: </label> <span>"+rp[0]+"</span><br><p>"+rp[1]+"</p></div>"
        b = b + rslt;
        txtdataR.innerHTML = b;
    } 
}

function val_insertThread(){
    var title = document.getElementById("tfForumTitle").value;
    var content = document.getElementById("taForumContent").value;
    var eM = document.getElementById("errMsgFr");
    if(title == ""){
        eM.innerHTML = "Title field must be filled";
    }else if(content == ""){
        eM.innerHTML = "Content field must be filled";
    }else{
        eM.innerHTML = "&nbsp;";
        var date = new Date();
        var dateTime = date.toLocaleDateString() + " " + date.toLocaleTimeString();
        // insert data thread to database
        var thread = localStorage.getItem("userActiveUn")+";"+title+";"+content+";"+dateTime;
        localStorage.setItem("2222"+(localStorage.length+1).toString(), thread);
        loadUsername();
    }
}

function val_insertReply(){
    var reply = document.getElementById("tfReply").value;
    var eM = document.getElementById("errMsgRp");
    if(reply == ""){
        eM.innerHTML = "Reply field must be filled";
    }else{
        eM.innerHTML = "&nbsp;";
        var dt = new Date();
        var dtTm = dt.toLocaleDateString() + " " + dt.toLocaleTimeString();
        // insert reply forum data to database
        let rep = localStorage.getItem("userActiveUn")+";"+reply+";"+dtTm;
        localStorage.setItem("3333"+(localStorage.length+1).toString(), rep);
        loadUsername();
    }
}

function val_insertFeed(){
    var feed = document.getElementById("tafeed").value;
    var eM = document.getElementById("errMsgFd");
    if(feed == ""){
        eM.innerHTML = "Feedback field must be filled";
    }else{
        eM.innerHTML = "&nbsp;";
        var dt = new Date();
        var dtTm = dt.toLocaleDateString() + " " + dt.toLocaleTimeString();
        // insert feedback data to database
        let fd = localStorage.getItem("userActiveUn")+";"+feed+";"+dtTm;
        localStorage.setItem("4444"+(localStorage.length+1).toString(), fd);
        loadDataFeed();
    }
}

function loadDataFeed(){
    var txtUs = document.getElementById("usernameActiveFd");
    var us = localStorage.getItem("userActiveUn");
    txtUs.innerHTML = "Welcome, " + us +"! Have a nice day :)";
    var txtFeed = document.getElementById("feed_data");
    var c = "";
    //insert dummy data feedback
    localStorage.setItem("44441","ivana;Friendly Waiter. ;5/8/2020 8:41:24 PM");
    localStorage.setItem("44442","karen;Fast Server. ;6/8/2020 9:42:54 PM");
    localStorage.setItem("44443","kessy;Good Service. ;7/8/2020 3:12:44 AM");
    // view feedback data
    for(var i = 1; i <= localStorage.length; i++){
        var idx = "4444" + i;
        let temp = localStorage.getItem(idx.toString());
        try {
            var fd = temp.split(";");
        } catch (error) {
            continue;
        }
        var rslt = "<div class=\"feed_dataDetail\"><div style=\"text-align: right;\"><label>"+fd[2]+"</label></div><label>From: </label> <span>"+fd[0]+"</span><br><p>"+fd[1]+"</p></div>"
        c = c + rslt;
        txtFeed.innerHTML = c;
    }
}

function feedA(){
    var feed = document.getElementById("tafeed").value;
    var tm = feed + "Good Service. ";
    document.getElementById("tafeed").innerHTML = tm;
}

function feedB(){
    var feed = document.getElementById("tafeed").value;
    var tm = feed + "Friendly Waiter. ";
    document.getElementById("tafeed").innerHTML = tm;
}

function feedC(){
    var feed = document.getElementById("tafeed").value;
    var tm = feed + "Responsive Web. ";
    document.getElementById("tafeed").innerHTML = tm;
}

function feedD(){
    var feed = document.getElementById("tafeed").value;
    var tm = feed + "Fast Server. ";
    document.getElementById("tafeed").innerHTML = tm;
}

function feedE(){
    var feed = document.getElementById("tafeed").value;
    var tm = feed + "Affordable Prices. ";
    document.getElementById("tafeed").innerHTML = tm;
}

function val_insertRate(){
    var rt = document.getElementsByName("rate");
    var rtV = "";
    
    var eM = document.getElementById("errMsgFd");
    if(rt[0].checked == false && rt[1].checked == false && rt[2].checked == false && rt[3].checked == false && rt[4].checked == false){
        eM.innerHTML = "Rate field must be choosen!";
    }else{
        eM.innerHTML = "&nbsp;";
        var dt = new Date();
        var dtTm = dt.toLocaleDateString() + " " + dt.toLocaleTimeString();
        if(rt[0].checked == true){
            rtV = "1";
        }else if(rt[1].checked == true){
            rtV = "2";
        }else if(rt[2].checked == true){
            rtV = "3";
        }else if(rt[3].checked == true){
            rtV = "4";
        }else{
            rtV = "5";
        }
        let fd = localStorage.getItem("userActiveUn")+";"+rtV+";"+dtTm;
        localStorage.setItem("5555"+(localStorage.length+1).toString(), fd);
        loadDataRate();
    }
}

function loadDataRate(){
    var txtUs = document.getElementById("usernameActiveRt");
    var us = localStorage.getItem("userActiveUn");
    txtUs.innerHTML = "Welcome, " + us +"! Have a nice day :)";
    var txtRate = document.getElementById("rate_data");
    var c = "";
    localStorage.setItem("55551","ivana;3;5/8/2020 7:31:52 PM");
    localStorage.setItem("55552","karen;1;6/8/2020 6:02:26 PM");
    localStorage.setItem("55553","kessy;5;7/8/2020 1:12:19 AM");
    for(var i = 1; i <= localStorage.length; i++){
        var idx = "5555" + i;
        let temp = localStorage.getItem(idx.toString());
        try {
            var rt = temp.split(";");
        } catch (error) {
            continue;
        }
        var star = "";
        if(rt[1] == 1){
            star = "★";
        }else if(rt[1] == 2){
            star = "★★";
        }else if(rt[1] == 3){
            star = "★★★";
        }else if(rt[1] == 4){
            star = "★★★★";
        }else{
            star = "★★★★★";
        }
        var rslt = "<div class=\"feed_dataDetail\"><div style=\"text-align: right;\"><label>"+rt[2]+"</label></div><label>From: </label> <span>"+rt[0]+"</span><br><div class=\"strClr\">"+star+"</div></div>"
        c = c + rslt;
        txtRate.innerHTML = c;
    }
}

function loadDashboard(){
    var txtDb = document.getElementById("db_background");
    let temp = localStorage.getItem("userActiveNow");
    var db = temp.split(";");
    var rslt = "<table><tr><th style=\"width: 60%;\">Name</th><th>:</th><th> &nbsp; "+db[0]+" </th></tr><tr><th style=\"width: 60%;\">Username</th><th>:</th><th> &nbsp; "+db[1]+" </th></tr><tr><th style=\"width: 60%;\">Password</th><th> : </th> <th> &nbsp; ******** </th></tr><tr><th style=\"width: 60%;\">Gender</th><th> : </th> <th> &nbsp; "+db[4]+" </th></tr><tr><th style=\"width: 60%;\">Date of Birth</th><th> : </th><th> &nbsp; "+db[5]+" </th></tr><tr><th style=\"width: 60%;\">Email</th><th> : </th><th> &nbsp; "+db[3]+" </th></tr></table>"
    txtDb.innerHTML = rslt;
}

function loadUserDummy(){
    var users = "Admin;admin;admin;admin@viapark.id;Female;01-17-2000";
    localStorage.setItem("11111", users);
}