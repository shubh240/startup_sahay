// ---------sticy-header---------------------


// const header = document.querySelector(".page-header");
// const toggleClass = "is-sticky";
// console.log(header,"heder");
// window.addEventListener("scroll", () => {
//     const currentScroll = window.pageYOffset;
//     if (currentScroll > 150) {
//         header.classList.add(toggleClass);
//     } else {
//         header.classList.remove(toggleClass);
//     }
// });


// -----------------------slider-------------------
// $(".slider_card").slick({
//     infinite: true,
//     slidesToShow: 4,
//     slidesToScroll: 1,
//     arrows: false,
//     dots: false,
//     autoplaySpeed: 800,
//     infinite: true,
//     responsive: [
//         {
//             breakpoint: 1920,
//             settings: {
//                 slidesToShow: 4,
//             },
//         },
//         {
//             breakpoint: 767,
//             settings: {
//                 slidesToShow: 2,
//             },
//         },

//         {
//             breakpoint: 620,
//             settings: {
//                 slidesToShow: 1,

//             },
//         },
//     ],
// });
$('.slider_card').slick({
    infinite: false,
    arrows: false,
    dots: false,
    speed: 300,
    slidesToShow: 3,
    slidesToScroll: 1,
    // centerMode: true,
    variableWidth: true,
    responsive: [
        {
            breakpoint: 1024,
            settings: {
                slidesToShow: 3,

            }
        },
        {
            breakpoint: 600,
            settings: {
                slidesToShow: 2,
            }
        },
        {
            breakpoint: 480,
            settings: {
                slidesToShow: 1,

            }
        }

    ]
});
// ===================================

$(".place_slider").slick({
    infinite: true,
    slidesToShow: 1,
    slidesToScroll: 1,
    arrows: false,
    dots: true,
    infinite: true,
    autoplay: true,
    autoplayTimeout: 3000,
    smartSpeed: 800,

});



