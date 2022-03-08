document.addEventListener('DOMContentLoaded', () => {
    if (window.innerWidth > 768) {
        const message = document.querySelector('.message-aria');

        message.style.display = 'flex';
    } else {

        // Resize window

        window.addEventListener('resize', () => {
            let vh = window.innerHeight * 0.01;
            document.documentElement.style.setProperty('--vh', `${vh}px`);
        });

        let vh = window.innerHeight * 0.01;
        document.documentElement.style.setProperty('--vh', `${vh}px`);

        // Buttons

        const button = document.querySelector('.game-button');
        const changeButton = document.querySelector('.button-change');
        const startButton = document.querySelector('.button-start');

        const botle = document.querySelector('.botle');
        const face = document.querySelector('.face');
        const faceSecond = document.querySelector('.face-2');
        const arrPhrase = ['Нужно было взболтать', 'Раскройте пожалуйста', 'Ногти подстригли?', 'Затянуть все гайки!', 'Полный вперед!', 'Будет покорн!', 'Ай! Иголки!'];
        const quote = document.querySelector('.quote--unit');
        const quoteVideo = document.querySelector('.quote--video');
        const startWindow = document.querySelector('.game-start');
        const gameWindow = document.querySelector('.game-window');
        const audio = document.querySelector('.audio');
        const mute = document.querySelector('.mute');
        const closeModalButton = document.querySelector('.close');

        console.dir(audio);

        // Слайдер------------------------------

        const swiper = new Swiper('.swiper', {
            // Optional parameters
            loop: true,
            slidesPerView: 5,
            centeredSlides: true,
            initialSlide: 2,
            spaceBetween: 10,
            noSwipingClass: 'swiper-no-swiping',
        });

        // Выбор снаряда--------------------

        changeButton.addEventListener('click', () => {
            let slideChange = setTimeout(toLastSlide, 10);
            let counter = 0;

            // Убираем возможность нажатия на кнопку
            changeButton.style.pointerEvents = 'none';
            button.style.cssText = 'opacity: 0; pointer-events: none;';

            function toLastSlide() {
                let random = Math.floor(Math.random() * 7);
                let randomSecond = Math.floor(Math.random() * 7);
                if (counter !== 3) {
                    swiper.slideToLoop(random, 700);
                    setTimeout(() => {
                        swiper.slideToLoop(randomSecond, 700);
                    }, 800);
                    counter++;
                    slideChange = setTimeout(toLastSlide, 1800);
                } else {
                    clearInterval(slideChange);

                    // Востанавливаем возможность нажатия на кнопку
                    changeButton.style.pointerEvents = 'auto';
                    button.style.cssText = 'opacity: 1; pointer-events: auto;';
                }
            }
        });

        // Запуск--------------------------------

        button.addEventListener('click', () => {
            const activeIndex = document.querySelector('.swiper-slide-active .slider__box').getAttribute('data-index');
            const activeImage = document.querySelector('.botle img');

            activeImage.setAttribute('src', `image/img-${activeIndex}.png`);

            botle.classList.add('botle--animate');
            quote.textContent = '';
            const seatAnimate = setTimeout(() => {
                botle.classList.remove('botle--animate');
                face.style.opacity = '1';
                faceSecond.style.opacity = '0';
                quote.style.opacity = '0';
            }, 7000);

            const faceStertAnimate = setTimeout(() => {
                face.style.opacity = '0';
                faceSecond.style.opacity = '1';
                quote.style.opacity = '1';
                quote.textContent = arrPhrase[+activeIndex - 1];
            }, 3600);
        });

        button.addEventListener('mousemove', (e) => {
            x = e.offsetX;
            y = e.offsetY;
            button.style.setProperty('--mouse-x', x + "px");
            button.style.setProperty('--mouse-y', y + "px");
        });

        startButton.addEventListener('click', () => {
            startWindow.classList.add('hidden');
            gameWindow.classList.add('active');
            audio.play();

            video();
        });

        function video() {
            setTimeout(() => {
                quoteVideo.style.opacity = '1';
            }, 2000);

            setTimeout(() => {
                face.style.opacity = '0';
                faceSecond.style.opacity = '1';
                quote.style.opacity = '1';
                quoteVideo.style.opacity = '0';
                quote.innerText = 'Атакуем!';
            }, 5000);

            setTimeout(() => {
                face.style.opacity = '1';
                faceSecond.style.opacity = '0';
                quote.style.opacity = '0';
                quoteVideo.style.opacity = '1';
                quoteVideo.innerText = 'Так точно, мистер Президент!';
            }, 7000);

            setTimeout(() => {
                quoteVideo.style.opacity = '0';
                changeButton.style.opacity = '1';
            }, 9000);
        }

        mute.addEventListener('click', () => {
            if (mute.classList.contains('active')) {
                audio.play();
            } else {
                audio.pause();
            }
            mute.classList.toggle('active');
        });

        setInterval(() => {
            document.querySelector('.modal').classList.add('active');
        }, 50000);

        closeModalButton.addEventListener('click', () => {
            document.querySelector('.modal').classList.remove('active');
        });
    }
});