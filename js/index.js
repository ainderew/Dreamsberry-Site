const burgerBtn = document.getElementById("burger-btn");

const mainContainer = document.querySelector(".mainContainer");
const section1 = document.querySelector(".section1");
const carouselUL = document.querySelector(".carousel-track");
const slides = Array.from(carouselUL.children);
const carouselIndicator = document.querySelectorAll(".carousel-indicator")
const carouselUpBtn = document.querySelector(".carousel-up-btn");
const carouselDownBtn = document.querySelector(".carousel-down-btn");
const tl = gsap.timeline();
let imgHeight = slides[0].getBoundingClientRect().height;

burgerBtn.addEventListener("click",()=>{
    gsap.to("#phoneNavBar",{x:"-100%"})
    section1.addEventListener("click",()=>{
        gsap.to("#phoneNavBar",{x:"100%"})
    })
})

tl.fromTo(".section1-carousel",1,{height: 0,width:"100%"},{height:"70%"})  
  .fromTo(".section1-carousel",1.2,{width:"100vw"},{width: "75vw", ease: "Power2.easeInOut"})
  .to(".slider",1.2,{x:"200%", ease: "Power2.easeInOut"}, "-=1.2")
  .from(".carousel-1-left",{opacity:0, x: 100}, "-=.7")
  .from(".section-1-info",{display:"none",opacity: 0})
  .fromTo(".slider2",{scale:0},{display:"block", scale:1},"+=200")
  tl.addLabel("skip")
  .fromTo(".slider2",{x:2000},{display:"block", x:0})
  .from(".section1",.1,{display: "flex",alignItems:"center",justifyContent:"center"})
  .from(".scroller",.1,{display:"none"})
  .from(".siteNavBar",.1,{display:"none"})
  .to(".section1-carousel",.5,{width:"100%",height:"80%"})
  .to(".slider2",{x:-2000,display: "none"})

const userScroll = () =>{
    mainContainer.removeAttribute("onscroll")
    mainContainer.removeAttribute("onclick")
    console.log("scrolled")
    tl.play("skip")
    setTimeout(()=>{
        mainContainer.scrollTop = 0;
    },500)
    
  
}
  






slides.forEach((slide,index)=>{
    slide.style.top = `${imgHeight*index}px`
})
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