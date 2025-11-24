$(function () {
    // 데스크탑 (1366px 초과)
    $('#main_header .gnb').on('mouseenter', function () {
        if ($(window).width() > 1366) {
            $(this).find('.sub').stop().slideDown(300);
            $('.sub_bg').stop().slideDown(300);
        }
    });
    $('#main_header .gnb').on('mouseleave', function () {
        if ($(window).width() > 1366) {
            $(this).find('.sub').stop().slideUp(300);
            $('.sub_bg').stop().slideUp(300);
        }
    });
    $('#main_header .toggle').on('click', function () {
        let w = $(window).width();
        if (w <= 1366 && w > 640) {
            // GNB 전체 토글 (서브는 항상 보임)
            $('#main_header .gnb').stop().slideToggle(250);
            $('#main_header .sub_bg').fadeToggle(200);
            // 태블릿에서는 서브 메뉴 항상 보이므로 hide 제거
        } 
        else if (w <= 640) {
            // 모바일
            $('#main_header .gnb').stop().slideToggle(250);
            $('#main_header .sub_bg').fadeToggle(200);
            $('.sub').hide(); // 모바일 초기화
        }
    });
    // 모바일 (≤640px)
    $('#main_header .gnb>ul>li>a').on('click', function (e) {
        if ($(window).width() <= 640) {
            e.preventDefault();
            let subMenu = $(this).next('.sub');
            if (subMenu.is(':visible')) {
                subMenu.stop().slideUp(200);
            } else {
                $('.sub').stop().slideUp(200);
                subMenu.stop().slideDown(200);
            }
        }
    });

    // 화면 크기 초기화
    function resetGnb() {
        let w = $(window).width();
        if (w > 1366) {
            // 데스크탑
            $('.gnb').show();
            $('.sub').hide();
            $('.sub_bg').hide();
        } else if (w <= 1366 && w > 640) {
            // 태블릿
            $('.gnb, .sub_bg').hide(); // GNB, 배경만 hide, 서브는 CSS로 항상 보임
            $('.sub').show(); // 태블릿에서는 항상 보이도록
        } else {
            // 모바일
            $('.gnb, .sub, .sub_bg').hide();
        }
    }
    resetGnb();
    $(window).on('resize', function () {
        resetGnb();
    });



  //searchbox
    const $searchBtn = $('#searchbtn');
    const $searchBox = $('#search_box');
    const $closeBtn = $('#closeBtn');
  // 검색 버튼 클릭 시 검색 박스 표시
    $searchBtn.on('click', function(e) {
        e.preventDefault();
        $searchBox.addClass('active');
    });
  // 닫기 버튼 클릭 시 검색 박스 숨김
    $closeBtn.on('click', function() {
        $searchBox.removeClass('active');
    });
    
});




//main_visual
var swiper = new Swiper("#swiper1", {
    spaceBetween: 30,
    loop: true,
    centeredSlides: true,
    autoplay: {
    delay: 2500,
    disableOnInteraction: false
    },
    pagination: {
    el: ".swiper-pagination",
    },
    navigation: {
        nextEl: ".swiper-button-next",
        prevEl: ".swiper-button-prev",
        }
});




// NEW_content_1 - 자연스러운 확대
const img1 = document.querySelector('#new_content1 .earphone_img1 img');
const img2 = document.querySelector('#new_content1 .earphone_img2 img');
window.addEventListener('scroll', () => {
    const scrollY = window.scrollY;
    const windowH = window.innerHeight;

    // --- content_box_1 ---
    const box1 = img1.closest('.content_box_1');
    const boxTop1 = box1.getBoundingClientRect().top;
    let visible1 = 1 - boxTop1 / windowH;
    visible1 = Math.min(Math.max(visible1, 0), 1); // 0~1 제한

    const minScale1 = 1.2; // 초기 scale
    const maxScale1 = 1.7; // 최대 확대
    const scale1 = minScale1 + visible1 * (maxScale1 - minScale1);

        img1.style.transform = `translate(-50%, -50%) scale(${scale1})`;

        // --- content_box_2 ---
        const box2 = img2.closest('.content_box_2');
        const boxTop2 = box2.getBoundingClientRect().top;
        let visible2 = 1 - boxTop2 / windowH;
        visible2 = Math.min(Math.max(visible2, 0), 1);

    const minScale2 = 1.0; // 초기 scale 조금 작게 시작
    const maxScale2 = 1.3; // 최대 확대 제한 낮게
    const scale2 = minScale2 + visible2 * (maxScale2 - minScale2);

        img2.style.transform = `translate(-50%, -50%) scale(${scale2})`;
});




//new_content1 > split 
document.fonts.ready.then(() => {
    SplitText.create('.split_1', {
        type: 'words,lines',
        linesClass: 'line',
        mask: 'lines',
        autoSplit: true,
        onSplit(self) {
            gsap.set('.split_1', { opacity: 1 });

            const timeline = gsap.timeline({ paused: true });

            timeline.from(self.lines, {
                duration: 0.6,
                yPercent: 100,
                opacity: 0,
                stagger: 0.1,
                ease: 'expo.out'
            });

            ScrollTrigger.create({
                trigger: '.content_header',
                start: 'top bottom',
                onEnter: () => timeline.play(),
                onLeaveBack: () => timeline.reverse()
            });
        }
    });
    SplitText.create('.split_2', {
        type: 'words,lines',
        linesClass: 'line',
        mask: 'lines',
        autoSplit: true,
        onSplit(self) {
            gsap.set('.split_2', { opacity: 1 });

            const timeline = gsap.timeline({ paused: true });

            timeline.from(self.lines, {
                duration: 0.6,
                yPercent: 100,
                opacity: 0,
                stagger: 0.1,
                ease: 'expo.out'
            });

            ScrollTrigger.create({
                trigger: '.content_header',
                start: 'top bottom',
                onEnter: () => timeline.play(),
                onLeaveBack: () => timeline.reverse()
            });
        }
    });
});





//iconic_products
const swiper2 = new Swiper('#swiper2', {
    speed: 600,
    loop: false,
    breakpoints: {
        0: {       // 모바일
            slidesPerView: 1.2, // 카드 1.2개 보여주기
            spaceBetween: 15
        },
        768: {     // 태블릿
            slidesPerView: 1.5,
            spaceBetween: 25
        },
        1024: {    // 데스크탑
            slidesPerView: 1.5,
            spaceBetween: 35
        }
    }
});
// 이전 버튼
document.querySelector('#iconic_products #swiper2 .page a:first-child')
.addEventListener('click', function(e){
    e.preventDefault();
    swiper2.slidePrev();
});
// 다음 버튼
document.querySelector('#iconic_products #swiper2 .page a:last-child')
.addEventListener('click', function(e){
    e.preventDefault();
    swiper2.slideNext();
});





//event 
const slides = document.querySelectorAll('.slide ')
let current = 0;
const fadeSlide=()=>{
    slides[current].classList.remove('active');
    current = (current+1)%slides.length;
    slides[current].classList.add('active');
}
let timer = setInterval(fadeSlide, 4000);




//top 버튼
document.addEventListener('DOMContentLoaded', () => {
    const topButton = document.querySelector('.top');
    if(topButton){
        topButton.addEventListener('click', ()=>{
            window.scrollTo({ top: 0, behavior: 'smooth' });
        });
    }




//mouse tracking -> 속도감 조절하기
const mouseFllower = document.querySelector('.mouse_follwer');
    let targetX = 0;
    let targetY = 0;
    let currentX = 0;
    let currentY = 0;
    window.addEventListener('mousemove', ({clientX, clientY})=>{
        targetX = clientX;
        targetY = clientY;
    });
    (function tracking(){
        currentX += (targetX - currentX)*0.8;
        currentY += (targetY - currentY)*0.8;
        mouseFllower.style.left = `${currentX}px`;
        mouseFllower.style.top = `${currentY}px`;
        requestAnimationFrame(tracking);
    })();
})

