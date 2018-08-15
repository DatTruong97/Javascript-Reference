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
    // document.getElementById("calendar-month-year").innerHTML = month_name[month] + " " + year;
    document.getElementById("calendar-dates").appendChild(calendar);
    document.getElementById("myId").style.visibility = "hidden";
    document.getElementById("calendar-tools").style.visibility = "hidden";
}

function checkValidate() {
    var username = document.getElementById("username").value;
    var text;
    if (username.length < 8) {
        text = "Username length min 8 letters";
    } else {
        text = "OK!";
    }
    document.getElementById("username-notify").innerHTML = text;
    var password = document.getElementById("password").value;
    var text;
    if (password.length < 8) {
        text = "Password length min 8 letters";
    } else {
        text = "OK!";
    }
    document.getElementById("password-notify").innerHTML = text;
}