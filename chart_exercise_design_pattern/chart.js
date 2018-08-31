var canvas;
var context;
var canvas2;
var context2;
var circleChart = (function() {

    var xScale = 1;
    var yScale = 0.5;
    var centerX = 200;
    var centerY = 200;
    var i;

    function draw() {
        for (i = 50; i > 0; i--) {
            drawSuccess();
            drawFail();
            drawText();
        }
    }

    function drawSuccess() {
        context.save();
        context.scale(xScale, yScale);
        context.beginPath();
        context.arc(centerX, centerY + i, 100, 0, 2 * Math.PI * 0.8);
        context.lineTo(centerX, centerY + i);
        context.restore();
        if (i == 1) {
            context.fillStyle = "#009ED5";
        } else {
            context.fillStyle = "#456AA4"
        }
        context.fill();
    }

    function drawFail() {
        context.save();
        context.scale(xScale, yScale);
        context.beginPath();
        context.arc(centerX + 7, centerY - 7 + i, 100, (2 * Math.PI * 0.8) + 0.01, -0.01);
        context.lineTo(centerX + 7, centerY - 7 + i);
        context.restore();
        if (i == 1) {
            context.fillStyle = "#E4322B";
        } else {
            context.fillStyle = "#FFB2B2";
        }
        context.fill();
    }

    function drawLine(firstX, firstY, secondX, secondY, width, color) {
        context.strokeStyle = color;
        context.lineWidth = 2;
        context.beginPath();
        context.fillStyle = color;
        context.moveTo(firstX, firstY);
        context.lineTo(firstX + width, firstY);
        context.lineTo(secondX, secondY);
        context.stroke();
    }

    function drawText() {
        drawLine(20, 50, 160, 100, 70, "#456AA4");
        drawLine(400, 30, 250, 80, -70, "#E4322B");
        context.fillStyle = "#A29FA1";
        context.fillText("80% ĐÃ ĐẠT", 20, 45);
        context.fillText("20% CHƯA ĐẠT", 330, 25);
        context.fillStyle = "#88D0DA";
        context.fillText("BIỂU ĐỒ TỔNG QUAN KHUNG NĂNG LỰC", 100, 200);
    }
    return {
        draw: draw
    };
})();

var sineChart = (function() {
    function drawChart() {
        // set value in Oy
        context2.beginPath();
        context2.fillStyle = "black"; //color of value
        context2.font = "18px Arial";
        var space = 50;
        for (scale = 4; scale >= 0; scale--) {
            context2.fillText(scale, 60, 30 + space);
            space += 50;
        }
        //draw Oy
        context2.beginPath();
        context2.strokeStyle = "#000000";
        context2.moveTo(80, 50);
        context2.lineTo(80, 280);
        context2.stroke();
        //draw Ox
        context2.beginPath();
        context2.strokeStyle = "#000000";
        context2.moveTo(80, 280);
        context2.lineTo(350, 280);
        context2.stroke();
        //draw sine 
        context2.beginPath();
        context2.lineWidth = 5;
        context2.strokeStyle = "#00AEEF";
        context2.moveTo(100, 200);
        context2.bezierCurveTo(135, 197, 111, 103, 151, 117);
        context2.moveTo(151, 117);
        context2.bezierCurveTo(178, 139, 161, 200, 195, 200);
        context2.moveTo(195, 200);
        context2.bezierCurveTo(230, 197, 217, 117, 251, 117);
        context2.moveTo(251, 117);
        context2.bezierCurveTo(272, 122, 283, 143, 300, 150);
        context2.moveTo(300, 150);
        context2.bezierCurveTo(306, 149, 324, 126, 340, 117);
        context2.stroke();
    }
    return {
        draw: drawChart
    };
})();
var pieChart = (function() {
    var datas = [10, 20, 10, 60];
    var colors = ["#4267B1", "#DB3D26", "#F8991D", "#189747"];

    function drawSlice(positionX, positionY, radius, startAngle, endAngle, color) {
        context3.fillStyle = color;
        context3.beginPath();
        context3.moveTo(positionX, positionY);
        context3.arc(positionX, positionY, radius, startAngle, endAngle);
        context3.closePath();
        context3.fill();
    }

    function drawChart() {
        var startAngle = -Math.PI / 2;
        for (var i = 0; i < datas.length; i++) {
            var sliceAngle = 2 * Math.PI * (datas[i] / 100);
            drawSlice(200, 150, 100, startAngle, startAngle + sliceAngle, colors[i]);
            startAngle += sliceAngle;
        }
        drawText("10%", 220, 80);
        drawText("20%", 260, 130);
        drawText("10%", 250, 200);
        drawText("60%", 130, 200);
        drawSlice(200, 150, 50, 0, Math.PI * 2, "#ffffff");
    }

    function drawText(data, posX, posY) {
        context3.fillStyle = "black";
        context3.font = "14px Arial";
        context3.fillText(data, posX, posY);
    }

    return {
        draw: drawChart
    };
})();
var barChart = (function() {
    function drawChart() {
        context4.beginPath();
        context4.strokeStyle = "#E5E3E3";
        context4.font = "14px Arial";
        var spaceY = 30;
        var spaceX = 30;
        //draw line behind column  
        for (var i = 4; i >= 1; i--) {
            context4.fillText(i, 70, 30 + spaceY);
            context4.moveTo(70 + spaceX, 30 + spaceY);
            context4.lineTo(400, 30 + spaceY);
            context4.stroke();
            spaceY += 50;
        }
        //draw Ox
        context4.beginPath();
        context4.strokeStyle = "black";
        context4.fillText("0", 70, 260);
        context4.moveTo(70 + spaceX, 260);
        context4.lineTo(400, 260);
        context4.stroke();
        //draw bar
        context4.fillStyle = "#3366CC";
        context4.fillRect(100, 160, 30, 100);
        context4.fillRect(150, 250, 30, 10);
        context4.fillRect(200, 110, 30, 150);
        context4.fillRect(250, 60, 30, 200);
        context4.fillRect(300, 60, 30, 200);
        //add text in Ox
        context4.fillStyle = "black";
        context4.fillText("A", 110, 280);
        context4.fillText("B", 160, 280);
        context4.fillText("C", 210, 280);
        context4.fillText("E", 260, 280);
        context4.fillText("F", 310, 280);
    }
    return {
        draw: drawChart
    };
})();
window.onload = function() {
    canvas = document.getElementById("canvas1");
    context = canvas.getContext("2d");
    canvas2 = document.getElementById("canvas2");
    context2 = canvas2.getContext("2d");
    canvas3 = document.getElementById("canvas3");
    context3 = canvas3.getContext("2d");
    canvas4 = document.getElementById("canvas4");
    context4 = canvas4.getContext("2d");
    circleChart.draw();
    sineChart.draw();
    pieChart.draw();
    barChart.draw();
};