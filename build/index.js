"use strict";

//loading page
var loading = function loading() {
  var loadingDiv = document.createElement("div");
  var container = document.querySelector(".container");
  loadingDiv.classList.add("loading");
  loadingDiv.innerHTML = "<div class=\"loading-div\"></div>";
  container.appendChild(loadingDiv);
  setTimeout(function () {
    loadingDiv.classList.remove("loading");
  }, 2000);
};
window.addEventListener("DOMContentLoaded", loading);

// fade effect initializer

var setFade = function () {
  var fadeRight = document.querySelectorAll(".fade-right");
  var fadeLeft = document.querySelectorAll(".fade-left");
  if (window.innerWidth < 768) {
    return { fadeLeft: fadeLeft, fadeRight: fadeRight };
  }

  fadeRight.forEach(function (element) {
    element.style.opacity = "0";
    element.style.transform = "translateX(20vw)";
    element.style.transition = "all 1s ease-in";
  });
  fadeLeft.forEach(function (element) {
    element.style.opacity = "0";
    element.style.transform = "translateX(-20vw)";
    element.style.transition = "all 1s ease-in";
  });

  fadeRight = Array.from(fadeRight);
  fadeLeft = Array.from(fadeLeft);

  return { fadeRight: fadeRight, fadeLeft: fadeLeft };
}();

//window scroll functions
var iconText = document.querySelector(".icon-text");
iconText.style.display = "none";
window.addEventListener("scroll", function () {
  //--------fixed nav
  var yoffset = window.pageYOffset;
  var header = document.querySelector(".header");
  if (yoffset === 0) {
    header.classList.remove("sticky");
    iconText.style.display = "none";
  } else {
    header.classList.add("sticky", window.scrollY > 0);
    iconText.style.display = "block";
  }

  //-------fade effects
  var fadeSetters = document.querySelectorAll(".fade-setter");

  fadeSetters.forEach(function (setter, index) {
    if (window.innerWidth < 768) return;
    var distanceElement = setter.getBoundingClientRect();
    if (distanceElement.top < window.innerHeight - 150) {
      setFade.fadeLeft[index].style.opacity = "1";
      setFade.fadeLeft[index].style.transform = "translateX(0)";
      if (index === 0) {
        setFade.fadeRight[0].style.opacity = "1";
        setFade.fadeRight[0].style.transform = "translateX(0)";
      }
      if (index === 1) {
        setFade.fadeRight[1].style.opacity = "1";
        setFade.fadeRight[2].style.opacity = "1";
        setFade.fadeRight[1].style.transform = "translateX(0)";
        setFade.fadeRight[2].style.transform = "translateX(0)";
      }
      if (index === 2) {
        setFade.fadeRight[3].style.opacity = "1";
        setFade.fadeRight[3].style.transform = "translateX(0)";
      }
    }
  });
});

//Carousel activities
var carousel = function () {
  var leftBtn = document.querySelector(".arrow-left");
  var rightBtn = document.querySelector(".arrow-right");
  var cards = document.querySelectorAll(".activity-card");

  leftBtn.addEventListener("click", function (e) {
    goLeft();
  }, { once: true });
  rightBtn.addEventListener("click", function (e) {
    goRight();
  }, { once: true });
  cards.forEach(function (card) {
    card.addEventListener("click", function (e) {
      changeCardPlace(e);
    });
  });

  var states = ["activity1", "activity2", "activity3", "activity4", "activity5"];
  var positions = {
    0: { x: "-50%", z: "0", o: "1" },
    1: { x: "0", z: "-2.5rem", o: "0.8" },
    2: { x: "40%", z: "-4rem", o: "0.6" },
    3: { x: "-140%", z: "-4rem", o: "0.6" },
    4: { x: "-100%", z: "-2.5rem", o: "0.8" }
  };

  var changeCardPlace = function changeCardPlace(e) {
    var cardPosition = states.indexOf(e.target.parentElement.id);
    if (cardPosition === 1 || cardPosition === 2) {
      do {
        goLeft();
      } while (states[0] !== e.target.parentElement.id);
    }
    if (cardPosition === 3 || cardPosition === 4) {
      do {
        goRight();
      } while (states[0] !== e.target.parentElement.id);
    }
  };

  var goRight = function goRight() {
    var tempState = [];
    states.forEach(function (position, index) {
      index !== 0 ? tempState.push(states[index - 1]) : tempState.push(states[4]);
    });
    tempState.forEach(function (position, index) {
      states[index] = position;
    });
    render();
    setTimeout(function () {
      rightBtn.addEventListener("click", goRight, { once: true });
    }, 1000);
  };
  var goLeft = function goLeft() {
    var tempState = [];
    states.forEach(function (position, index) {
      index !== 4 ? tempState.push(states[index + 1]) : tempState.push(states[0]);
    });
    tempState.forEach(function (position, index) {
      states[index] = position;
    });
    render();
    setTimeout(function () {
      leftBtn.addEventListener("click", goLeft, { once: true });
    }, 1000);
  };
  var render = function render() {
    states.forEach(function (state, index) {
      var card = document.querySelector("#" + state);
      card.style.transform = "translate3d(" + positions[index].x + ", 0, " + positions[index].z + ")";
      card.style.opacity = "" + positions[index].o;
    });
  };
}();

//FAQ interactions
var divQuestions = document.querySelectorAll(".faq-question");
divQuestions.forEach(function (div) {
  div.addEventListener("click", function (e) {
    var answer = e.target.querySelector(".faq-answer");
    var icon = e.target.querySelector("span");
    divQuestions.forEach(function (div) {
      if (div !== e.target) {
        div.querySelector(".faq-answer").style.height = "0";
        div.querySelector("span").innerHTML = "<i class=\"fas fa-plus\"></i>";
      }
    });
    if (answer.style.height === "0px" || answer.style.height === "") {
      answer.style.height = "20vh";
      icon.innerHTML = "<i class=\"fas fa-minus\"></i>";
    } else {
      answer.style.height = "0";
      icon.innerHTML = "<i class=\"fas fa-plus\"></i>";
    }
  });
});

//get year ---- footer

var setYear = function () {
  var element = document.querySelector("#footer-year");
  var date = new Date();
  var year = date.getFullYear();

  element.innerText = year;
}();

//gallery 3d effect

var setGalleryEffect = function () {
  var divs = document.querySelectorAll(".gallery3d");

  var translate = function translate(div) {
    divs.forEach(function (oldDiv) {
      return oldDiv.style.transform = "translate3d(0, 0, 0)";
    });
    div = div.target;

    var divDistance = div.getBoundingClientRect();
    var wrapper = document.querySelector(".gallery-wrapper");
    var wrapperDistance = wrapper.getBoundingClientRect();
    var wrapperX = (wrapperDistance.right - wrapperDistance.left) / 2;
    var wrapperY = (wrapperDistance.bottom - wrapperDistance.top) / 2;
    var divX = div.offsetLeft;
    var distanceX = 0;
    if (divX < 0) {
      distanceX = wrapperX + divX - (divDistance.right - divDistance.left) / 2;
    } else {
      distanceX = wrapperX - divX - (divDistance.right - divDistance.left) / 2;
    }
    var divY = div.offsetTop;
    var distanceY = 0;
    if (divY < 0) {
      distanceY = wrapperY + divY - (divDistance.bottom - divDistance.top) / 2;
    } else {
      distanceY = wrapperY - divY - (divDistance.bottom - divDistance.top) / 2;
    }
    div.style.transform = "translate3d(" + distanceX + "px, " + distanceY + "px, 300px)";
    div.addEventListener("click", function () {
      div.style.transform = "translate3d(0, 0, 0)";
      div.addEventListener("click", function (div) {
        return translate(div);
      });
    });
  };
  divs.forEach(function (div) {
    return div.addEventListener("click", function (div) {
      return translate(div);
    });
  });
}();

// Bars menu
var setBarsMenu = function () {
  var menuBar = document.querySelector(".menu-bar");
  var showMenu = document.querySelector(".show-menu");
  var links = document.querySelectorAll(".menu-link-header");
  menuBar.addEventListener("click", function () {
    if (showMenu.style.opacity === "0" || showMenu.style.opacity == "") {
      showMenu.style.opacity = "1";
      showMenu.style.height = "35vh";
      menuBar.innerHTML = "<i class=\"fas fa-times\"></i>";
    } else {
      showMenu.style.opacity = "0";
      showMenu.style.height = "0";
      menuBar.innerHTML = "<i class=\"fas fa-bars\"></i>";
    }
  });
  links.forEach(function (link) {
    link.addEventListener("click", function () {
      if (showMenu.style.opacity === "1") {
        showMenu.style.opacity = "0";
        showMenu.style.height = "0";
        menuBar.innerHTML = "<i class=\"fas fa-bars\"></i>";
      }
    });
  });
}();
