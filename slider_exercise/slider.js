var images = document.getElementsByTagName("img");
var title = document.getElementById("slider-title");
var button = document.getElementsByTagName("button");

function initSlider() {
    images[indexCurrent].style.opacity = 1;
    title.innerText = images[indexCurrent].getAttribute("title");
    if (loop) {
        setInterval(getNextImage, duration);
        document.getElementById("item" + indexCurrent).style.background = "#52D017";
    }
}

function getNextImage() {
    if (indexCurrent == images.length - 1) {
        indexCurrent = 0;
        setImage(images.length - 1, 0.02, 0.02, 300);
    } else {
        indexCurrent++;
        setImage(indexCurrent - 1, 0.02, 0.02, 300);
    }
}

function getPrevImage() {
    if (indexCurrent == 0) {
        indexCurrent = images.length - 1;
        setImage(0, 0.02, 0.02, 300);
    } else {
        indexCurrent--;
        setImage(indexCurrent + 1, 0.02, 0.02, 300);
    }
}

function setImage(index, opacity_period, opacityImageOld_period, duration_period) {
    for (i = 0; i < images.length; i++) {
        if (i != index)
            images[i].style.opacity = 0;
    }
    var opacity = 0;
    var opacityImageOld = 1;
    document.getElementById("item" + index).style.background = "#FFFFFF";
    document.getElementById("item" + indexCurrent).style.background = "#52D017";
    var setOpacity = setInterval(function() {
        images[indexCurrent].style.opacity = opacity;
        images[index].style.opacity = opacityImageOld;
        title.innerText = images[indexCurrent].getAttribute("title");
        if (opacity >= 1 && opacityImageOld <= 0) {
            clearInterval(setOpacity);
            return;
        }
        opacity += opacity_period;
        opacityImageOld -= opacityImageOld_period;
    }, duration / duration_period);
}

function changeImage(index) {
    for (var i = 0; i < images.length; i++) {
        if (i != index) {
            document.getElementById("item" + i).style.background = "#FFFFFF";
        }
    }
    indexCurrent = index;
    setImage(indexCurrent, 0.1, 0.1, 10);
}