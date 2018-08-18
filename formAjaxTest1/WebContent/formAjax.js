window.onload = function() {
    changeSelectElement(month, year);
    //Get a day 
    var first_date = month_name[month] + " " + 1 + " " + year; // August 1 2018
    var temp = new Date(first_date).toString(); // Wed, Aug 1 2018
    var first_day = temp.substring(0, 3); // return Wed

    var day_num = day_name.indexOf(first_day); // return 3
    //Get the last day
    var days = new Date(year, month + 1, 0).getDate(); //31
    var calendar = get_calendar(day_num, days, d.getDate());
    initYearSelect();

    // document.getElementById("calendar-month-year").innerHTML = month_name[month] + " " + year;
    document.getElementById("calendar-dates").appendChild(calendar);
    document.getElementById("myId").style.visibility = "hidden";
    document.getElementById("calendar-tools").style.visibility = "hidden";
}

function checkValidate() {
    var count = 0;
    var username = document.getElementById("username").value;
    var text;
    if (username.length < 8) {
        text = "Username length min 8 letters";
    } else {
        text = "OK!";
        count++;
    }
    document.getElementById("username-notify").innerHTML = text;
    var password = document.getElementById("password").value;
    var text;
    if (password.length < 8) {
        text = "Password length min 8 letters";
    } else {
        text = "OK!";
        count++;
    }
    document.getElementById("password-notify").innerHTML = text;
    var email = document.getElementById("email").value;
    var mailformat = /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/;
    if (email.match(mailformat)) {
        text = "OK!";
        count++;
    } else {
        text = "Wrong Email Format";
    }
    document.getElementById("email-notify").innerHTML = text;
    var date_string = document.getElementById("birthday-input").value;
    var date_input = new Date(date_string);
    var current_date = new Date();
    if (date_input.getTime() < current_date.getTime()) {
        count++;
    } else {
        alert("illegal date (Your bitrhday > current date) ");
    }

    if (count == 4) {
        var xhttp = new XMLHttpRequest();
        xhttp.onreadystatechange = function() {
            if (xhttp.readyState == 4 && xhttp.status == 200) {
                document.getElementById("username-notify").innerHTML = xhttp.responseText;
            }
        };
        xhttp.open("GET", "checkInfo1?username=" + username + "&password=" + password + "&email=" + email + "&birthday=" + date_string, true);
        xhttp.send();
    }
}