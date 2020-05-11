const burgerBtn = document.getElementById("burger-btn");
const mainContainer = document.querySelector(".mainContainer");
const section1 = document.querySelector(".section1");
const section2 = document.querySelector(".section2");
const section3 = document.querySelector(".section3");
const section5 = document.querySelector(".section5");
const section6 = document.querySelector(".section6");
const carouselUL = document.querySelector(".carousel-track");
const slides = Array.from(carouselUL.children);
const carouselIndicator = document.querySelectorAll(".carousel-indicator")
const carouselUpBtn = document.querySelector(".carousel-up-btn");
const carouselDownBtn = document.querySelector(".carousel-down-btn");
const sec2UpperRight = document.querySelector(".sec-2-upper-right");
const sec2Btn = document.querySelector(".sec2Img2");
const tl = gsap.timeline();
const tl2 = gsap.timeline({paused: true});
const tl3 = gsap.timeline();
const tl4 = gsap.timeline({paused: true});
const tl5 = gsap.timeline({paused: true});
const tl6 = gsap.timeline({paused: true});
const TLsection6 = gsap.timeline({paused: true});

let section2OffsetTop = 0;
let section2OffsetHeight = 0;

// function offset(el) {
//     var rect = el.getBoundingClientRect(),
//     scrollLeft = window.pageXOffset || document.documentElement.scrollLeft,
//     scrollTop = window.pageYOffset || document.documentElement.scrollTop;
//     return { top: rect.top + scrollTop, left: rect.left + scrollLeft }
// }

burgerBtn.addEventListener("click",()=>{
    gsap.to("#phoneNavBar",{x:"-100%"})
    section1.addEventListener("click",()=>{
        gsap.to("#phoneNavBar",{x:"100%"})
    })
})

const userScroll = () =>{
    mainContainer.removeAttribute("onscroll")
    mainContainer.removeAttribute("onclick")
    console.log("scrolled")
    tl.play("skip")
    setTimeout(()=>{
        mainContainer.scrollTop = 0;
        let imgHeight = slides[0].getBoundingClientRect().height;
        slides.forEach((slide,index)=>{
            slide.style.top = `${imgHeight*index}px`
        })
        section2OffsetTop = sec2UpperRight.offsetTop
        section2OffsetHeight = sec2UpperRight.offsetHeight
        section3OffsetTop = section3.offsetTop
        section3OffsetHeight = section3.offsetHeight
        section5OffsetTop = section5.offsetTop
        section5OffsetHeight = section5.offsetHeight
        console.log(section2OffsetHeight) 
    },1500)
}

tl.fromTo(".video-bg",1,{height:"0%",width:"100%"},{height:"80%",ease:Power2})
  .to(".video-bg",1,{width:"80%",ease:Power2})
  .to(".slider",1,{x:"100%"},"-=1")
  .fromTo("#landing-logo",.5,{opacity:0,x:200},{opacity:1,x:0})
  .fromTo(".landing-info",.5,{opacity:0},{opacity:1},"-=.5")
  .fromTo("#line",{opacity:0},{opacity:1},"+=3")
  .fromTo(".landing-header",{opacity:0,x:"-100%"},{opacity:1,x:"10%"},"+=1")
  .to(".landing-header",{x:"-100%",opacity:0},"+=2")
  .to(".landing-header",{x:"100%",opacity:0},"+=999")

tl.addLabel("skip")
  .fromTo(".slider2",{scaleY:0},{display:"block",scaleY:1})
  .to(".landing-section",{display:"none"})
  .to(".mainContainer",{display:"block"})
  .to(".slider2",{y:"-100%"})
  


tl2.to(".sec2-heading-hide",.3,{top:0})
.to(".hide1",.3,{top:0},"-=.1")
.to(".hide2",.3,{top:0},"-=.1")
.to(".hide3",.3,{top:0},"-=.1")
.to(".hide4",.3,{top:0},"-=.1")
.to("#sec-2-btn",{opacity:1},"-=.4")
.fromTo(".sec2Img1",.5,{opacity:0,y:200},{opacity:1,y:0},"-=.8")
.fromTo(".sec2Img2",.5,{opacity:0,y:-200},{opacity:1,y:0},"-=.8")
.fromTo(".sec2Img3",.5,{opacity:0,y:200},{opacity:1,y:0},"-=.8")
.fromTo(".sec2Img4",.5,{opacity:0,y:-200},{opacity:1,y:0},"-=.8")

tl3.fromTo(".sec-2-track",{x:"0%", y:0},{x: "-83%",y:0});

tl4.fromTo("#counter-container",1,{opacity:0,y:200},{opacity:1,y:0,ease:"back"})
   .fromTo("#tag-line-1",1,{opacity:0,y:200},{opacity:1,y:0,ease:"back"},"-=.8");

tl5.fromTo(".sec-3-img",1,{x:"0%"},{x:"-85%"})
   .fromTo(".sec-3-review",1,{right:"-30%"},{right:"50%"},"-.01");
tl6.fromTo(".sec-5-img",1,{x:"0%"},{x:"85%"})
   .fromTo(".sec-5-review",1,{left:"-30%"},{left:"50%"},"-.01");

TLsection6.fromTo("#sec-6-counter",1,{opacity:0,y:200},{opacity:1,y:0,ease:"back"})
          .fromTo(".sec-6-tagline",1,{opacity:0,y:200},{opacity:1,y:0,ease:"back"},"-=.8");

const progressTween = () =>{
    const scrollPosition = (mainContainer.scrollTop + 200);
    const elPosition = (scrollPosition - section2OffsetTop);
    const durationDistance = (window.innerHeight + section2OffsetHeight);
    const currentProgress = (elPosition / durationDistance);
    tl3.progress(currentProgress)
    
}
const section3Progress = () =>{
    const scrollPosition = (mainContainer.scrollTop + 400);
    const elPosition = (scrollPosition - section3OffsetTop);
    const durationDistance = (window.innerHeight + section3OffsetHeight);
    const currentProgress = (elPosition / durationDistance);
    tl5.progress(currentProgress)
    
}
const section5Progress= () =>{
    let scrollPosition = (mainContainer.scrollTop + 600);
    const elPosition = (scrollPosition - section5OffsetTop);
    const durationDistance = (window.innerHeight + section5OffsetHeight);
    const currentProgress = (elPosition / durationDistance);
    tl6.progress(currentProgress)
    
}


//INTERSECTION OBSERVER
const intersectionObserver = (callbacking,target) =>{
    let options = {
        root: null,
        rootMargin: '0px 0px 0px 0px',
        threshold: 0
      };
      let observer = new IntersectionObserver(callbacking, options);

      observer.observe(target);
}


//CALLBACKS FOR INTERSECTION OBSERVER

let callBack = (entries, observer) => {
    entries.forEach(entry =>{
        if (entry.intersectionRatio > 0){
            console.log("is intersecting")
            tl2.play();
            
        }
    });
};
const dol = document.querySelector(".sec-2-upper");
let callBack2 = (entries,observer)=>{
    entries.forEach(entry =>{
        if (entry.intersectionRatio > 0){
            gsap.ticker.add(progressTween);
            dol.classList.add("fixed");
            console.log("button seen");
        }else{
            gsap.ticker.remove(progressTween);
            tl3.reverse();
        }
    });
}

//for counter
const counter = document.getElementById("counter");
const c = new CountUp("counter", 0,753)
const callBack3 = (entries,observer) =>{
    entries.forEach(entry=>{
        if (entry.intersectionRatio > 0){
            tl4.play();
            c.start();
        }
    })
}

let section3ImageCallback = (entries,observer)=>{
    entries.forEach(entry =>{
        if (entry.intersectionRatio > 0){
            gsap.ticker.add(section3Progress);
        }else{
            gsap.ticker.remove(section3Progress);
            tl5.reverse();
        }
    });
}
let section5ImageCallback = (entries,observer)=>{
    entries.forEach(entry =>{
        if (entry.intersectionRatio > 0){
            gsap.ticker.add(section5Progress);
        }else{
            gsap.ticker.remove(section5Progress);
            // tl5.reverse();
        }
    });
}

const section6CounterText = document.getElementById("sec-6-counter");
const section6Counter = new CountUp("sec-6-counter", 0,483)
let section6Callback = (entries,observer)=>{
    entries.forEach(entry =>{
        if (entry.intersectionRatio > 0){
            TLsection6.play()
            section6Counter.start();
        }
    });
}


intersectionObserver(callBack,section2)
intersectionObserver(callBack2,sec2UpperRight);
intersectionObserver(callBack3,counter);
intersectionObserver(section3ImageCallback,section3);
intersectionObserver(section5ImageCallback,section5);
intersectionObserver(section6Callback,section6CounterText);




//scroll progressbar
const scrollProgress = () =>{
    let winScroll = mainContainer.scrollTop;
    let height = mainContainer.scrollHeight - mainContainer.clientHeight;   
    var scrolled = (winScroll / height) * 100;
    document.getElementById("myBar").style.height = `${scrolled}%`
}
mainContainer.onscroll = ()=>{
    scrollProgress();
}














//for carousel
carouselIndicator.forEach((el,index)=>{
    el.addEventListener("click",e=>{
        carouselIndicator.forEach(el=>el.classList.remove("current-slide-indicator"))
        let amount = -parseInt(slides[index].style.top);
        let currentSlide = carouselUL.querySelector(".current-slide");
        let nextSlide = slides[index];
        // carouselUL.style.transform = `translateY( -${amount} )`;
        slider(currentSlide,nextSlide,amount)
        el.classList.add("current-slide-indicator")
        activeIndicator=index;
    })
})

const slider =(currentSlide,slide,amountToMove)=>{
    carouselUL.style.transform =`translateY( ${amountToMove}px )`
    currentSlide.classList.remove("current-slide")
    slide.classList.add("current-slide");
    (slide.nextElementSibling===null) ? gsap.to(".carousel-down-btn",{y:200, opacity: 0}) : gsap.to(".carousel-down-btn",{y:0, opacity: 1});
    (slide.previousElementSibling===null) ? gsap.to(".carousel-up-btn",{y:-200, opacity: 0}) : gsap.to(".carousel-up-btn",{y:0, opacity: 1});
    
}

let activeIndicator = 0;
carouselDownBtn.addEventListener("click",e=>{
    const currentSlide = carouselUL.querySelector(".current-slide");
    const nextSlide = currentSlide.nextElementSibling;
    let amountToMove = -parseInt(nextSlide.style.top);
    slider(currentSlide,nextSlide,amountToMove);

    carouselIndicator[activeIndicator].classList.remove("current-slide-indicator")
    carouselIndicator[activeIndicator+1].classList.add("current-slide-indicator")
    activeIndicator++;

})
carouselUpBtn.addEventListener("click",e=>{
    const currentSlide = carouselUL.querySelector(".current-slide");
    const previousSlide = currentSlide.previousElementSibling;
    const amountToMove = -parseInt(previousSlide.style.top);
    slider(currentSlide,previousSlide,amountToMove);
    carouselIndicator[activeIndicator].classList.remove("current-slide-indicator")
    carouselIndicator[activeIndicator-1].classList.add("current-slide-indicator")
    activeIndicator--;
})








