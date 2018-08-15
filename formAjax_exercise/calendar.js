var month_name = ["January", "February", "March", "April", "May", "June", "July", "August", "September", "October", "November", "December"];
var day_name = ["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"];

var d = new Date(); // return current date
var month = d.getMonth();
var year = d.getFullYear();

function click_input() {
    document.getElementById("calendar-tools").style.visibility = "visible";
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
}

function changeSelectElement(month_select, year_select) {
    var month_select = document.getElementById("month-select").options.selectedIndex = month;
    var length = document.getElementById("year-select").options.length;
    var position;
    var year_select;
    for (var i = 0; i < length; i++) {
        var num = document.getElementById("year-select").options[i].text;
        if (parseInt(num) == year) {
            position = i;
            break;
        }
    }
    year_select = document.getElementById("year-select").options.selectedIndex = position;
}

function get_calendar(day_num, days, current_date) {
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
        if (td.innerHTML == current_date) {
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
            if (td.innerHTML == current_date) {
                td.style.background = "#00B2BF";
            }
            count++;
            tr.appendChild(td);
        }
        table.appendChild(tr);
    }

}

function modifyDate(month_modify, year_modify, current_date) {
    var table = document.getElementById("myId");
    table.parentNode.removeChild(table);
    var first_date = month_name[month] + " " + 1 + " " + year; // August 1 2018
    var temp = new Date(first_date).toString(); // Wed, Aug 1 2018
    var first_day = temp.substring(0, 3); // return Wed

    var day_num = day_name.indexOf(first_day); // return 3
    //Get the last day
    var days = new Date(year, month + 1, 0).getDate(); //31
    var calendar = get_calendar(day_num, days, current_date);
    // document.getElementById("calendar-month-year").innerHTML = month_name[month] + " " + year;
    document.getElementById("calendar-dates").appendChild(calendar);
}

function getNextMonth() {
    if (month == 11) {
        month = 0;
        year += 1;
    } else {
        month += 1;
    }
    modifyDate(month, year, d.getDate());
    changeSelectElement(month, year);
}

function getNextYear() {
    year += 1;
    modifyDate(month, year, d.getDate());
    changeSelectElement(month, year);
}

function getPrevMonth() {
    if (month == 0) {
        month = 11;
        year -= 1;
    } else {
        month -= 1;
    }
    modifyDate(month, year, d.getDate());
    changeSelectElement(month, year);
}

function getPrevYear() {
    year -= 1;
    modifyDate(month, year, d.getDate());
    changeSelectElement(month, year);
}

function update_month() {
    var month_selected = document.getElementById("month-select").value;
    var position;
    for (var i = 0; i < month_name.length; i++) {
        if (month_name[i] == month_selected) {
            position = i;
            break;
        }
    }
    month = position;
    modifyDate(month, year, d.getDate());
}

function update_year() {
    var year_selected = document.getElementById("year-select").value;
    year = parseInt(year_selected);
    modifyDate(month, year, d.getDate());
}

function getDesiredDate() {
    var text = document.getElementById("text-input").value;
    var month_text = text.substring(0, 2);
    var day_text = text.substring(3, 5);
    var year_text = text.substring(6);
    month = parseInt(month_text - 1);
    year = parseInt(year_text);
    day = parseInt(day_text);
    modifyDate(month, year, day);
    changeSelectElement(month, year);
}