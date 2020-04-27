const burgerBtn = document.getElementById("burger-btn");
const mainContainer = document.querySelector(".mainContainer");
const section1 = document.querySelector(".section1");
// const filter = document.querySelector(".filter");

burgerBtn.addEventListener("click",()=>{
    gsap.to("#phoneNavBar",{x:"-100%"})
    gsap.to(".filter",{opacity:0,display:"none"})
    section1.addEventListener("click",()=>{
        gsap.to("#phoneNavBar",{x:"100%"})
        gsap.to(".filter",{opacity:1,display:"block"})
    })
})

