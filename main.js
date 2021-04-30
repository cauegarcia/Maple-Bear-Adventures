// fade effect initializer

const setFade = (() => {
  let fadeRight = document.querySelectorAll(".fade-right");
  let fadeLeft = document.querySelectorAll(".fade-left");
  if (window.innerWidth < 768) return;

  fadeRight.forEach((element) => {
    element.style.opacity = "0";
    element.style.transform = "translateX(20vw)";
    element.style.transition = "all 1s ease-in";
  });
  fadeLeft.forEach((element) => {
    element.style.opacity = "0";
    element.style.transform = "translateX(-20vw)";
    element.style.transition = "all 1s ease-in";
  });

  fadeRight = Array.from(fadeRight);
  fadeLeft = Array.from(fadeLeft);

  return { fadeRight, fadeLeft };
})();

//window scroll functions
const iconText = document.querySelector(".icon-text");
iconText.style.display = "none";
window.addEventListener("scroll", () => {
  //--------fixed nav
  const yoffset = window.pageYOffset;
  const header = document.querySelector(".header");
  if (yoffset === 0) {
    header.classList.remove("sticky");
    iconText.style.display = "none";
  } else {
    header.classList.add("sticky", window.scrollY > 0);
    iconText.style.display = "block";
  }

  //-------fade effects
  const fadeSetters = document.querySelectorAll(".fade-setter");

  fadeSetters.forEach((setter, index) => {
    if (window.innerWidth < 768) return;

    const distanceElement = setter.getBoundingClientRect();

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
    /* if (
      distanceElement.top < 0 - 50 ||
      distanceElement.top > window.innerHeight
    ) {
      setFade.fadeLeft[index].style.opacity = "0";
      setFade.fadeLeft[index].style.transform = "translateX(-20vw)";
      setFade.fadeRight[index].style.opacity = "0";
      setFade.fadeRight[index].style.transform = "translateX(20vw)";
    } */
  });
});

//Carousel activities
const carousel = (() => {
  const leftBtn = document.querySelector(".arrow-left");
  const rightBtn = document.querySelector(".arrow-right");
  const cards = document.querySelectorAll(".activity-card");

  leftBtn.addEventListener(
    "click",
    (e) => {
      goLeft();
    },
    { once: true }
  );
  rightBtn.addEventListener(
    "click",
    (e) => {
      goRight();
    },
    { once: true }
  );
  cards.forEach((card) => {
    card.addEventListener("click", (e) => {
      changeCardPlace(e);
    });
  });

  const states = [
    "activity1",
    "activity2",
    "activity3",
    "activity4",
    "activity5",
  ];
  const positions = {
    0: { x: "-50%", z: "0", o: "1" },
    1: { x: "0", z: "-2.5rem", o: "0.8" },
    2: { x: "40%", z: "-4rem", o: "0.6" },
    3: { x: "-140%", z: "-4rem", o: "0.6" },
    4: { x: "-100%", z: "-2.5rem", o: "0.8" },
  };

  const changeCardPlace = (e) => {
    const cardPosition = states.indexOf(e.target.parentElement.id);
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

  const goRight = () => {
    const tempState = [];
    states.forEach((position, index) => {
      index !== 0
        ? tempState.push(states[index - 1])
        : tempState.push(states[4]);
    });
    tempState.forEach((position, index) => {
      states[index] = position;
    });
    render();
    setTimeout(() => {
      rightBtn.addEventListener("click", goRight, { once: true });
    }, 1000);
  };
  const goLeft = () => {
    const tempState = [];
    states.forEach((position, index) => {
      index !== 4
        ? tempState.push(states[index + 1])
        : tempState.push(states[0]);
    });
    tempState.forEach((position, index) => {
      states[index] = position;
    });
    render();
    setTimeout(() => {
      leftBtn.addEventListener("click", goLeft, { once: true });
    }, 1000);
  };
  const render = () => {
    states.forEach((state, index) => {
      const card = document.querySelector(`#${state}`);
      card.style.transform = `translate3d(${positions[index].x}, 0, ${positions[index].z})`;
      card.style.opacity = `${positions[index].o}`;
    });
  };
})();

//FAQ interactions
const divQuestions = document.querySelectorAll(".faq-question");
divQuestions.forEach((div) => {
  div.addEventListener("click", (e) => {
    const answer = e.target.querySelector(".faq-answer");
    const icon = e.target.querySelector("span");
    divQuestions.forEach((div) => {
      if (div !== e.target) {
        div.querySelector(".faq-answer").style.height = "0";
        div.querySelector("span").innerHTML = `<i class="fas fa-plus"></i>`;
      }
    });
    console.log(e.target.querySelector(".faq-answer"));
    if (answer.style.height === "0px" || answer.style.height === "") {
      answer.style.height = "20vh";
      icon.innerHTML = `<i class="fas fa-minus"></i>`;
    } else {
      answer.style.height = "0";
      icon.innerHTML = `<i class="fas fa-plus"></i>`;
    }
  });
});

//get year ---- footer

const setYear = (() => {
  const element = document.querySelector("#footer-year");
  const date = new Date();
  const year = date.getFullYear();

  element.innerText = year;
})();

//gallery 3d effect

const setGalleryEffect = (() => {
  const divs = document.querySelectorAll(".gallery3d");

  const translate = (div) => {
    div = div.target;
    /*check if effect is already running*/
    if (div.classList.contains("control3d")) {
      return;
    } else {
      div.classList.add("control3d");
    }
    const divDistance = div.getBoundingClientRect();
    const wrapper = document.querySelector(".gallery-wrapper");
    const wrapperDistance = wrapper.getBoundingClientRect();
    const wrapperX = (wrapperDistance.right - wrapperDistance.left) / 2;
    const wrapperY = (wrapperDistance.bottom - wrapperDistance.top) / 2;
    const divX = div.offsetLeft;
    let distanceX = 0;
    if (divX < 0) {
      distanceX = wrapperX + divX - (divDistance.right - divDistance.left) / 2;
    } else {
      distanceX = wrapperX - divX - (divDistance.right - divDistance.left) / 2;
    }
    const divY = div.offsetTop;
    let distanceY = 0;
    if (divY < 0) {
      distanceY = wrapperY + divY - (divDistance.bottom - divDistance.top) / 2;
    } else {
      distanceY = wrapperY - divY - (divDistance.bottom - divDistance.top) / 2;
    }
    div.style.transform = `translate3d(${distanceX}px, ${distanceY}px, 300px)`;

    setTimeout(() => {
      div.addEventListener("mouseenter", translate, { once: true });
    }, 2000);
  };
  divs.forEach((div) =>
    div.addEventListener(
      "mouseenter",
      (div) => {
        return translate(div);
      },
      { once: true }
    )
  );

  divs.forEach((div) =>
    div.addEventListener("mouseleave", () => {
      div.style.transform = `translate3d(0, 0, 0)`;
      div.classList.remove("control3d");
    })
  );
})();

// Bars menu
const setBarsMenu = (() => {
  const menuBar = document.querySelector(".menu-bar");
  const showMenu = document.querySelector(".show-menu");
  const links = document.querySelectorAll(".menu-link-header");
  menuBar.addEventListener("click", () => {
    console.log(showMenu.style);
    if (showMenu.style.opacity === "0" || showMenu.style.opacity == "") {
      showMenu.style.opacity = "1";
      showMenu.style.height = "35vh";
      menuBar.innerHTML = `<i class="fas fa-times"></i>`;
    } else {
      showMenu.style.opacity = "0";
      showMenu.style.height = "0";
      menuBar.innerHTML = `<i class="fas fa-bars"></i>`;
    }
  });
  links.forEach((link) => {
    link.addEventListener("click", () => {
      if (showMenu.style.opacity === "1") {
        showMenu.style.opacity = "0";
        showMenu.style.height = "0";
        menuBar.innerHTML = `<i class="fas fa-bars"></i>`;
      }
    });
  });
})();
