const burgerBtn = document.getElementById("burger-btn");
const mainContainer = document.querySelector(".mainContainer");
const section1 = document.querySelector(".section1");
const section2 = document.querySelector(".section2");
const carouselUL = document.querySelector(".carousel-track");
const slides = Array.from(carouselUL.children);
const carouselIndicator = document.querySelectorAll(".carousel-indicator")
const carouselUpBtn = document.querySelector(".carousel-up-btn");
const carouselDownBtn = document.querySelector(".carousel-down-btn");
const tl = gsap.timeline();
const tl2 = gsap.timeline({paused: true});
const tl3 = gsap.timeline();

let section2OffsetTop = 0;
let section2OffsetHeight = 0;

function offset(el) {
    var rect = el.getBoundingClientRect(),
    scrollLeft = window.pageXOffset || document.documentElement.scrollLeft,
    scrollTop = window.pageYOffset || document.documentElement.scrollTop;
    return { top: rect.top + scrollTop, left: rect.left + scrollLeft }
}




burgerBtn.addEventListener("click",()=>{
    gsap.to("#phoneNavBar",{x:"-100%"})
    section1.addEventListener("click",()=>{
        gsap.to("#phoneNavBar",{x:"100%"})
    })
})

tl.fromTo(".video-bg",1,{height:"0%",width:"100%"},{height:"80%",ease: Power2})
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
        section2OffsetTop = section2.offsetTop
        section2OffsetHeight = section2.offsetHeight
        
        
    },1500)
}


const progressTween = () =>{
    const scrollPosition = (mainContainer.scrollTop + window.innerHeight);
    const elPosition = (scrollPosition - 962);
    const durationDistance = (window.innerHeight + 722);
    const currentProgress = (elPosition / durationDistance);
    tl3.progress(currentProgress)
    
}
tl2.to(".sec2-heading-hide",.3,{top:0})
.to(".hide1",.3,{top:0},"-=.1")
.to(".hide2",.3,{top:0},"-=.1")
.to(".hide3",.3,{top:0},"-=.1")
.to(".hide4",.3,{top:0},"-=.1")
.to("#sec-2-btn",{opacity:1},"-=.4")
.fromTo(".sec2Img1",.5,{opacity:0,y:200},{opacity:1,y:0},"-=.6")
.fromTo(".sec2Img2",.5,{opacity:0,y:-200},{opacity:1,y:0})
.fromTo(".sec2Img3",.5,{opacity:0,y:200},{opacity:1,y:0})
.fromTo(".sec2Img4",.5,{opacity:0,y:-200},{opacity:1,y:0});

tl3.fromTo(".sec-2-track",{x:"100%", y:0},{x: "-100%",y:0});

let options = {
    root: null,
    rootMargin: '0px 0px 0px 0px',
    threshold: 0
  };

const dol = document.querySelector(".sec-2-upper");
  
let callBack = (entries, observer) => {
    entries.forEach(entry =>{
        if (entry.intersectionRatio > 0){
            gsap.ticker.add(progressTween);
            console.log("is intersecting")
            tl2.play();
            dol.classList.add("fixed")
        }else{
            console.log("not intersecting");
            gsap.ticker.remove(progressTween);
            tl2.reverse();
        }
    });
};
let observer = new IntersectionObserver(callBack, options);

observer.observe(section2);



  














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







