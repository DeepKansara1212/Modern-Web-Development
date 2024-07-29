const scroll = new LocomotiveScroll({
    el: document.querySelector('#main'),
    smooth: true
});

function firstPageAnimation() {
    let timeline = gsap.timeline()

    timeline.from('#nav', {
        y: '-10',
        opacity: 0,
        duration: 1.5,
        ease: Expo.easeInOut
    })
        .to('.bounding-elem', {
            y: 0,
            ease: Expo.easeInOut,
            duration: 2,
            delay: -1,
            stagger: 0.2
        })
        .from('#hero-footer', {
            y: -10,
            opacity: 0,
            duration: 1.5,
            delay: -1,
            ease: Expo.easeInOut
        })

}
firstPageAnimation()

// Jab mouse move ho to hum log skew kar paye aur maximum skew & minimum skew define kar paaye, jab mouse move ho to chapta ki value badhe aur jab mouse chalna bandh ho jaaye to chapta hata lo

var timeout;
function circleChaptaKaro() {
    // define default scale value
    let xScale = 1
    let yScale = 1

    // define previous scale value
    let xPrev = 0
    let yPrev = 0

    window.addEventListener('mousemove', function (dets) {
        clearTimeout(timeout);

        xScale = gsap.utils.clamp(0.8, 1.2, dets.clientX - xPrev)
        yScale = gsap.utils.clamp(0.8, 1.2, dets.clientY - yPrev)

        xPrev = dets.clientX;
        yPrev = dets.clientY;

        circleMouseFollower(xScale, yScale)

        timeout = setTimeout(() => {
            document.querySelector('#mini-circle').style.transform = `translate(${dets.clientX}px, ${dets.clientY}px) scale(1, 1)`
        }, 100) 
    })
} 
circleChaptaKaro()

function circleMouseFollower(xScale, yScale) {
    window.addEventListener('mousemove', function (dets) {
        document.querySelector('#mini-circle').style.transform = `translate(${dets.clientX}px, ${dets.clientY}px) scale(${xScale}, ${yScale})`
    });
};
circleMouseFollower() 


// Teeno element ko select karo, uske baad teeno par ek mousemove lagao, Jab mousemove ho to ye pata karo ki mouse kaha par hai, jiska matlab hai mouse ki x & y position pata karo,ab mouse ki x, y position ke badle us image ko show karo and us image ko move karo, move karte waqt rotate karo, and jaise jaise mouse tez chale waise waise rotation bhi tez ho jaye.

document.querySelectorAll('.elem').forEach((elem) => {
    let rotate = 0;
    let diffrot = 0;

    elem.addEventListener("mouseleave", () => {
        gsap.to(elem.querySelector("img"), {
            opacity: 0,
            ease: Power3,
            duration: 0.5,
        });
    });

    elem.addEventListener("mousemove", (dets) => {
        const image = elem.querySelector("img");
        const h1 = elem.querySelector("h1");
        const elemRect = elem.getBoundingClientRect();
        const h1Rect = h1.getBoundingClientRect();

        // Calculate the center point between the top of h1 and the bottom of the elem
        const centerY = h1Rect.top + (elemRect.bottom - h1Rect.top) / 2;

        // Add an offset to move the image slightly upwards
        const offset = elemRect.height * 0.1; // Adjust this value as needed

        diffrot = dets.clientX - rotate;
        rotate = dets.clientX;
        
        gsap.to(image, {
            opacity: 1,
            ease: Power3,
            top: centerY - elemRect.top - image.offsetHeight / 2 - offset,
            left: dets.clientX - elemRect.left,
            rotate: gsap.utils.clamp(-20, 20, diffrot * 0.5),
        });
    });
});