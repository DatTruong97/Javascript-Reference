var canvas;
var context;
var pieChart = (function() {

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
window.onload = function() {
    canvas = document.getElementById("canvas1");
    context = canvas.getContext("2d");
    pieChart.draw();
};