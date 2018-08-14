var month_name = ["January", "February", "March", "April", "May", "June", "July", "August", "September", "October", "November", "December"];
var day_name = ["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"];

var d = new Date(); // return current date
var month = d.getMonth();
var year = d.getFullYear();

window.onload = function() {

    //Get a day 
    var first_date = month_name[month] + " " + 1 + " " + year; // August 1 2018
    var temp = new Date(first_date).toString(); // Wed, Aug 1 2018
    var first_day = temp.substring(0, 3); // return Wed

    var day_num = day_name.indexOf(first_day); // return 3
    //Get the last day
    var days = new Date(year, month + 1, 0).getDate(); //31
    var calendar = get_calendar(day_num, days);
    // document.getElementById("calendar-month-year").innerHTML = month_name[month] + " " + year;
    document.getElementById("calendar-dates").appendChild(calendar);
}

function get_calendar(day_num, days) {
    var table = document.createElement("table");
    table.setAttribute("id", "myId");
    var tr = document.createElement("tr");
    //row for the day letters
    for (var i = 0; i <= 6; i++) {
        var td = document.createElement("td");
        td.innerHTML = day_name[i];
        td.style.background = "#B7B7B7";
        td.style.color = "red";
        td.style.fontWeight = "bold";
        td.style.fontSize = "16px";
        tr.appendChild(td);
    }
    table.appendChild(tr);
    //create second row
    tr = document.createElement("tr");
    for (var i = 0; i <= 6; i++) {
        if (i == day_num) {
            break;
        }
        var td = document.createElement("td");
        td.innerHTML = "";
        td.style.background = "black";
        tr.appendChild(td);
    }
    var count = 1;
    for (var j = day_num; j <= 6; j++) {
        var td = document.createElement("td");
        td.innerHTML = count;
        if (td.innerHTML == d.getDate()) {
            td.style.background = "#00B2BF";
        }
        count++;
        tr.appendChild(td);
    }
    table.appendChild(tr);
    //The rest of the date rows
    for (var r = 3; r <= 7; r++) {
        tr = document.createElement("tr");
        for (var i = 0; i <= 6; i++) {
            if (count > days) {
                table.appendChild(tr);
                return table;
            }
            var td = document.createElement("td");
            td.innerHTML = count;
            if (td.innerHTML == d.getDate()) {
                td.style.background = "#00B2BF";
            }
            count++;
            tr.appendChild(td);
        }
        table.appendChild(tr);
    }

}

function modifyDate() {
    var table = document.getElementById("myId");
    table.parentNode.removeChild(table);
    var first_date = month_name[month] + " " + 1 + " " + year; // August 1 2018
    var temp = new Date(first_date).toString(); // Wed, Aug 1 2018
    var first_day = temp.substring(0, 3); // return Wed

    var day_num = day_name.indexOf(first_day); // return 3
    //Get the last day
    var days = new Date(year, month + 1, 0).getDate(); //31
    var calendar = get_calendar(day_num, days);
    // document.getElementById("calendar-month-year").innerHTML = month_name[month] + " " + year;
    document.getElementById("calendar-dates").appendChild(calendar);
}

function getNextMonth() {
    month += 1;
    modifyDate()
}

function getNextYear() {
    year += 1;
    modifyDate();
}

function getPrevMonth() {
    month -= 1;
    modifyDate();
}

function getPrevYear() {
    year -= 1;
    modifyDate();
}