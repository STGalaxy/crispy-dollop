/* =========================================================
   VIỆT NAM — WEBSITE GIỚI THIỆU
   script.js
========================================================= */

"use strict";


/* =========================================================
   DOM
========================================================= */

const body = document.body;
const header = document.getElementById("header");
const loader = document.getElementById("loader");

const menuBtn = document.getElementById("menuBtn");
const navbar = document.getElementById("navbar");

const themeBtn = document.getElementById("themeBtn");
const backTop = document.getElementById("backTop");

const provinceSearch = document.getElementById("provinceSearch");
const provinceGrid = document.getElementById("provinceGrid");

const currentYear = document.getElementById("currentYear");


/* =========================================================
   LOADING
========================================================= */

window.addEventListener("load", () => {

    setTimeout(() => {

        if (loader) {
            loader.classList.add("hide");
        }

    }, 900);

});


/* =========================================================
   HEADER SCROLL
========================================================= */

function handleHeaderScroll() {

    if (!header) return;

    if (window.scrollY > 60) {
        header.classList.add("scrolled");
    } else {
        header.classList.remove("scrolled");
    }

}


window.addEventListener("scroll", handleHeaderScroll);

handleHeaderScroll();


/* =========================================================
   MOBILE MENU
========================================================= */

if (menuBtn && navbar) {

    menuBtn.addEventListener("click", () => {

        navbar.classList.toggle("open");

        menuBtn.classList.toggle("active");

    });


    /* Đóng menu khi click link */

    const navLinks = navbar.querySelectorAll(".nav-link");

    navLinks.forEach(link => {

        link.addEventListener("click", () => {

            navbar.classList.remove("open");

            menuBtn.classList.remove("active");

        });

    });


    /* Đóng menu khi click ra ngoài */

    document.addEventListener("click", event => {

        const clickedInsideMenu =
            navbar.contains(event.target);

        const clickedMenuButton =
            menuBtn.contains(event.target);

        if (
            !clickedInsideMenu &&
            !clickedMenuButton
        ) {

            navbar.classList.remove("open");

            menuBtn.classList.remove("active");

        }

    });

}


/* =========================================================
   DARK MODE
========================================================= */

function updateThemeIcon() {

    if (!themeBtn) return;

    if (body.classList.contains("dark-mode")) {

        themeBtn.textContent = "☀️";

        themeBtn.setAttribute(
            "aria-label",
            "Chuyển sang giao diện sáng"
        );

    } else {

        themeBtn.textContent = "🌙";

        themeBtn.setAttribute(
            "aria-label",
            "Chuyển sang giao diện tối"
        );

    }

}


/* Đọc theme đã lưu */

const savedTheme =
    localStorage.getItem("vietnam-theme");


if (savedTheme === "dark") {

    body.classList.add("dark-mode");

}


updateThemeIcon();


/* Nút đổi theme */

if (themeBtn) {

    themeBtn.addEventListener("click", () => {

        body.classList.toggle("dark-mode");

        const isDark =
            body.classList.contains("dark-mode");

        localStorage.setItem(
            "vietnam-theme",
            isDark ? "dark" : "light"
        );

        updateThemeIcon();

    });

}


/* =========================================================
   BACK TO TOP
========================================================= */

function handleBackTop() {

    if (!backTop) return;

    if (window.scrollY > 500) {

        backTop.classList.add("show");

    } else {

        backTop.classList.remove("show");

    }

}


window.addEventListener(
    "scroll",
    handleBackTop
);

handleBackTop();


if (backTop) {

    backTop.addEventListener("click", () => {

        window.scrollTo({
            top: 0,
            behavior: "smooth"
        });

    });

}


/* =========================================================
   SCROLL REVEAL
========================================================= */

const revealElements =
    document.querySelectorAll(".reveal");


const revealObserver =
    new IntersectionObserver(
        (entries, observer) => {

            entries.forEach(entry => {

                if (entry.isIntersecting) {

                    entry.target.classList.add("show");

                    observer.unobserve(
                        entry.target
                    );

                }

            });

        },
        {
            threshold: 0.12
        }
    );


revealElements.forEach(element => {

    revealObserver.observe(element);

});


/* =========================================================
   ACTIVE NAVIGATION
========================================================= */

const sections =
    document.querySelectorAll("main section[id]");

const navLinks =
    document.querySelectorAll(".nav-link");


function updateActiveNavigation() {

    let currentSection = "";

    sections.forEach(section => {

        const sectionTop =
            section.offsetTop - 150;

        const sectionHeight =
            section.offsetHeight;

        if (
            window.scrollY >= sectionTop &&
            window.scrollY < sectionTop + sectionHeight
        ) {

            currentSection =
                section.getAttribute("id");

        }

    });


    navLinks.forEach(link => {

        link.classList.remove("active");

        const href =
            link.getAttribute("href");

        if (
            href === "#" + currentSection
        ) {

            link.classList.add("active");

        }

    });

}


window.addEventListener(
    "scroll",
    updateActiveNavigation
);

updateActiveNavigation();


/* =========================================================
   PROVINCE SEARCH
========================================================= */

if (provinceSearch && provinceGrid) {

    const provinceCards =
        provinceGrid.querySelectorAll(
            ".province-card"
        );


    provinceSearch.addEventListener(
        "input",
        () => {

            const keyword =
                provinceSearch.value
                    .trim()
                    .toLowerCase();


            provinceCards.forEach(card => {

                const text =
                    card.textContent
                        .toLowerCase();


                if (
                    text.includes(keyword)
                ) {

                    card.classList.remove(
                        "hidden"
                    );

                } else {

                    card.classList.add(
                        "hidden"
                    );

                }

            });

        }
    );

}


/* =========================================================
   SMOOTH SCROLL
========================================================= */

document
    .querySelectorAll('a[href^="#"]')
    .forEach(link => {

        link.addEventListener(
            "click",
            event => {

                const targetId =
                    link.getAttribute("href");

                if (
                    !targetId ||
                    targetId === "#"
                ) {

                    event.preventDefault();

                    return;

                }


                const target =
                    document.querySelector(
                        targetId
                    );


                if (target) {

                    event.preventDefault();

                    target.scrollIntoView({
                        behavior: "smooth",
                        block: "start"
                    });

                }

            }
        );

    });


/* =========================================================
   PARALLAX HERO
========================================================= */

const hero =
    document.querySelector(".hero");


window.addEventListener(
    "scroll",
    () => {

        if (!hero) return;

        const scroll =
            window.scrollY;

        if (scroll < window.innerHeight) {

            hero.style.backgroundPosition =
                `center calc(50% + ${scroll * 0.18}px)`;

        }

    }
);


/* =========================================================
   CARD TILT EFFECT
========================================================= */

const tiltCards =
    document.querySelectorAll(
        ".region-card, .food-card"
    );


tiltCards.forEach(card => {

    card.addEventListener(
        "mousemove",
        event => {

            if (window.innerWidth < 900) {
                return;
            }


            const rect =
                card.getBoundingClientRect();


            const x =
                event.clientX - rect.left;

            const y =
                event.clientY - rect.top;


            const centerX =
                rect.width / 2;

            const centerY =
                rect.height / 2;


            const rotateX =
                ((y - centerY) / centerY) * -2;


            const rotateY =
                ((x - centerX) / centerX) * 2;


            card.style.transform =
                `translateY(-8px)
                 perspective(800px)
                 rotateX(${rotateX}deg)
                 rotateY(${rotateY}deg)`;

        }
    );


    card.addEventListener(
        "mouseleave",
        () => {

            card.style.transform = "";

        }
    );

});


/* =========================================================
   IMAGE LAZY LOAD EFFECT
========================================================= */

const lazyImages =
    document.querySelectorAll(
        'img[loading="lazy"]'
    );


lazyImages.forEach(image => {

    image.addEventListener(
        "load",
        () => {

            image.classList.add(
                "image-loaded"
            );

        }
    );

});


/* =========================================================
   CURRENT YEAR
========================================================= */

if (currentYear) {

    currentYear.textContent =
        new Date().getFullYear();

}


/* =========================================================
   ESC KEY
========================================================= */

document.addEventListener(
    "keydown",
    event => {

        if (event.key === "Escape") {

            if (navbar) {
                navbar.classList.remove("open");
            }

            if (menuBtn) {
                menuBtn.classList.remove("active");
            }

        }

    }
);


/* =========================================================
   BUTTON RIPPLE EFFECT
========================================================= */

const buttons =
    document.querySelectorAll(
        ".btn, .theme-btn, .back-top"
    );


buttons.forEach(button => {

    button.addEventListener(
        "click",
        event => {

            const ripple =
                document.createElement("span");


            const rect =
                button.getBoundingClientRect();


            const size =
                Math.max(
                    rect.width,
                    rect.height
                );


            ripple.style.width =
                `${size}px`;

            ripple.style.height =
                `${size}px`;

            ripple.style.position =
                "absolute";

            ripple.style.left =
                `${event.clientX - rect.left - size / 2}px`;

            ripple.style.top =
                `${event.clientY - rect.top - size / 2}px`;

            ripple.style.borderRadius =
                "50%";

            ripple.style.background =
                "rgba(255,255,255,0.25)";

            ripple.style.transform =
                "scale(0)";

            ripple.style.pointerEvents =
                "none";

            ripple.style.animation =
                "rippleEffect .6s ease-out";


            const computed =
                window.getComputedStyle(button);

            if (computed.position === "static") {
                button.style.position =
                    "relative";
            }

            button.style.overflow =
                "hidden";


            button.appendChild(ripple);


            setTimeout(() => {

                ripple.remove();

            }, 650);

        }
    );

});


/* =========================================================
   CONSOLE
========================================================= */

console.log(
    "%c🇻🇳 VIỆT NAM — ĐẤT NƯỚC TÔI YÊU",
    "font-size:18px;font-weight:bold;color:#d71920;"
);

console.log(
    "Website đang hoạt động ❤️"
);
/* =====================================================
   TỈNH, THÀNH PHỐ - SEARCH + FILTER
===================================================== */

document.addEventListener("DOMContentLoaded", () => {

    const searchInput = document.getElementById("provinceSearch");
    const provinceGrid = document.getElementById("provinceGrid");

    if (!searchInput || !provinceGrid) return;

    const provinceCards = Array.from(
        provinceGrid.querySelectorAll(".province-card")
    );

    // Chuyển tiếng Việt có dấu thành không dấu
    function removeVietnameseTones(str) {
        return String(str)
            .normalize("NFD")
            .replace(/[\u0300-\u036f]/g, "")
            .replace(/đ/g, "d")
            .replace(/Đ/g, "D")
            .toLowerCase()
            .trim();
    }

    // Lưu tên tỉnh thành
    provinceCards.forEach(card => {

        const title = card.querySelector("h3");

        if (title) {
            card.dataset.searchName = removeVietnameseTones(
                title.textContent
            );
        }

        // Hiệu ứng ban đầu
        card.style.opacity = "0";
        card.style.transform = "translateY(20px)";
    });

    // Hiện từng card
    provinceCards.forEach((card, index) => {

        setTimeout(() => {

            card.style.transition =
                "opacity 0.5s ease, transform 0.5s ease";

            card.style.opacity = "1";
            card.style.transform = "translateY(0)";

        }, index * 50);

    });


    /* =================================================
       TẠO THANH KẾT QUẢ
    ================================================= */

    let resultText = document.getElementById("provinceResult");

    if (!resultText) {

        resultText = document.createElement("div");

        resultText.id = "provinceResult";

        resultText.style.textAlign = "center";
        resultText.style.marginTop = "18px";
        resultText.style.fontSize = "14px";
        resultText.style.opacity = "0.75";

        searchInput.parentElement.appendChild(resultText);
    }

    resultText.textContent =
        `Đang hiển thị ${provinceCards.length} tỉnh, thành`;


    /* =================================================
       TÌM KIẾM
    ================================================= */

    searchInput.addEventListener("input", function () {

        const keyword = removeVietnameseTones(this.value);

        let count = 0;

        provinceCards.forEach((card, index) => {

            const name =
                card.dataset.searchName ||
                removeVietnameseTones(
                    card.textContent
                );

            const code =
                removeVietnameseTones(
                    card.querySelector(".province-code")
                    ?.textContent || ""
                );

            const description =
                removeVietnameseTones(
                    card.querySelector("p")
                    ?.textContent || ""
                );

            const match =
                name.includes(keyword) ||
                code.includes(keyword) ||
                description.includes(keyword);

            if (match) {

                count++;

                card.style.display = "";

                setTimeout(() => {

                    card.style.opacity = "1";
                    card.style.transform =
                        "translateY(0) scale(1)";

                }, index * 30);

            } else {

                card.style.opacity = "0";
                card.style.transform =
                    "translateY(15px) scale(0.96)";

                setTimeout(() => {

                    if (
                        card.style.opacity === "0"
                    ) {
                        card.style.display = "none";
                    }

                }, 300);
            }

        });


        /* ===============================
           KẾT QUẢ
        =============================== */

        if (keyword === "") {

            resultText.textContent =
                `Đang hiển thị ${provinceCards.length} tỉnh, thành`;

        } else if (count === 0) {

            resultText.textContent =
                "❌ Không tìm thấy tỉnh, thành phù hợp";

        } else {

            resultText.textContent =
                `🔎 Tìm thấy ${count} tỉnh, thành`;

        }

    });


    /* =================================================
       ENTER → TỰ ĐỘNG CUỘN TỚI KẾT QUẢ
    ================================================= */

    searchInput.addEventListener("keydown", function (event) {

        if (event.key === "Enter") {

            const firstVisible =
                provinceCards.find(
                    card => card.style.display !== "none"
                );

            if (firstVisible) {

                firstVisible.scrollIntoView({
                    behavior: "smooth",
                    block: "center"
                });

            }

        }

    });


    /* =================================================
       HOVER EFFECT
    ================================================= */

    provinceCards.forEach(card => {

        card.addEventListener("mouseenter", () => {

            card.style.transform =
                "translateY(-8px) scale(1.02)";

        });

        card.addEventListener("mouseleave", () => {

            card.style.transform =
                "translateY(0) scale(1)";

        });

    });


    /* =================================================
       XÓA TÌM KIẾM BẰNG ESC
    ================================================= */

    searchInput.addEventListener("keydown", function (event) {

        if (event.key === "Escape") {

            this.value = "";

            this.dispatchEvent(
                new Event("input")
            );

            this.blur();
        }

    });

});
/* =====================================================
   CLICK TỈNH THÀNH → HIỆN CHI TIẾT
===================================================== */

const provinceInfo = {
    "Hà Nội": {
        region: "Miền Bắc",
        icon: "🏛️",
        description: "Thủ đô của Việt Nam, trung tâm chính trị, văn hóa và lịch sử."
    },

    "Cao Bằng": {
        region: "Miền Bắc",
        icon: "⛰️",
        description: "Vùng đất miền núi nổi tiếng với thác Bản Giốc và Pác Bó."
    },

    "Tuyên Quang": {
        region: "Miền Bắc",
        icon: "🌿",
        description: "Vùng đất giàu truyền thống cách mạng và văn hóa các dân tộc."
    },

    "Điện Biên": {
        region: "Tây Bắc",
        icon: "🏔️",
        description: "Nơi ghi dấu chiến thắng Điện Biên Phủ lịch sử."
    },

    "Lai Châu": {
        region: "Tây Bắc",
        icon: "⛰️",
        description: "Vùng núi Tây Bắc với nhiều cảnh quan thiên nhiên hùng vĩ."
    },

    "Sơn La": {
        region: "Tây Bắc",
        icon: "🌄",
        description: "Nổi bật với cao nguyên Mộc Châu và cảnh sắc núi rừng."
    },

    "Lào Cai": {
        region: "Tây Bắc",
        icon: "🏔️",
        description: "Nổi tiếng với Sa Pa, Fansipan và những thửa ruộng bậc thang."
    },

    "Thái Nguyên": {
        region: "Miền Bắc",
        icon: "🍃",
        description: "Được biết đến với những vùng chè nổi tiếng."
    },

    "Lạng Sơn": {
        region: "Miền Bắc",
        icon: "🏞️",
        description: "Tỉnh biên giới với nhiều danh lam thắng cảnh và văn hóa đặc sắc."
    },

    "Quảng Ninh": {
        region: "Miền Bắc",
        icon: "🌊",
        description: "Nơi có Vịnh Hạ Long – một trong những thắng cảnh nổi tiếng của Việt Nam."
    },

    "Bắc Ninh": {
        region: "Miền Bắc",
        icon: "🎶",
        description: "Vùng đất nổi tiếng với dân ca Quan họ Bắc Ninh."
    },

    "Phú Thọ": {
        region: "Miền Bắc",
        icon: "🏯",
        description: "Đất Tổ Hùng Vương, nơi gắn với nguồn cội dân tộc Việt Nam."
    },

    "Hải Phòng": {
        region: "Miền Bắc",
        icon: "⚓",
        description: "Thành phố cảng lớn, năng động và phát triển."
    },

    "Hưng Yên": {
        region: "Miền Bắc",
        icon: "🌾",
        description: "Vùng đất đồng bằng Bắc Bộ giàu truyền thống văn hóa."
    },

    "Ninh Bình": {
        region: "Miền Bắc",
        icon: "🏞️",
        description: "Nổi tiếng với Tràng An, Tam Cốc và cảnh quan núi đá vôi."
    },

    "Thanh Hóa": {
        region: "Miền Trung",
        icon: "🏖️",
        description: "Vùng đất rộng lớn với biển Sầm Sơn và nhiều di tích lịch sử."
    },

    "Nghệ An": {
        region: "Miền Trung",
        icon: "🌳",
        description: "Quê hương Chủ tịch Hồ Chí Minh, giàu truyền thống lịch sử."
    },

    "Hà Tĩnh": {
        region: "Miền Trung",
        icon: "🌊",
        description: "Vùng đất giàu truyền thống văn hóa và lịch sử."
    },

    "Quảng Trị": {
        region: "Miền Trung",
        icon: "🏞️",
        description: "Vùng đất ghi dấu nhiều sự kiện quan trọng trong lịch sử Việt Nam."
    },

    "Huế": {
        region: "Miền Trung",
        icon: "🏯",
        description: "Cố đô với quần thể di tích và văn hóa cung đình đặc sắc."
    },

    "Đà Nẵng": {
        region: "Miền Trung",
        icon: "🌉",
        description: "Thành phố biển hiện đại với cầu Rồng, Mỹ Khê và Bà Nà Hills."
    },

    "Quảng Ngãi": {
        region: "Miền Trung",
        icon: "🌊",
        description: "Nổi bật với biển đảo, đặc biệt là đảo Lý Sơn."
    },

    "Gia Lai": {
        region: "Tây Nguyên",
        icon: "🌲",
        description: "Vùng đất cao nguyên với văn hóa cồng chiêng đặc sắc."
    },

    "Khánh Hòa": {
        region: "Miền Trung",
        icon: "🏝️",
        description: "Nổi tiếng với Nha Trang, biển xanh và nhiều hòn đảo đẹp."
    },

    "Đắk Lắk": {
        region: "Tây Nguyên",
        icon: "☕",
        description: "Vùng đất nổi tiếng với cà phê và văn hóa Tây Nguyên."
    },

    "Lâm Đồng": {
        region: "Tây Nguyên",
        icon: "🌲",
        description: "Nổi tiếng với Đà Lạt, khí hậu mát mẻ và cảnh quan thơ mộng."
    },

    "Đồng Nai": {
        region: "Đông Nam Bộ",
        icon: "🏙️",
        description: "Một trong những trung tâm công nghiệp và kinh tế quan trọng."
    },

    "Thành phố Hồ Chí Minh": {
        region: "Đông Nam Bộ",
        icon: "🏙️",
        description: "Đô thị lớn, trung tâm kinh tế, văn hóa và giao thương của Việt Nam."
    },

    "Tây Ninh": {
        region: "Đông Nam Bộ",
        icon: "⛰️",
        description: "Nổi bật với Núi Bà Đen và các giá trị văn hóa đặc sắc."
    },

    "Cần Thơ": {
        region: "Đồng bằng sông Cửu Long",
        icon: "🚤",
        description: "Thành phố trung tâm của vùng Tây Nam Bộ, nổi tiếng với chợ nổi."
    },

    "Vĩnh Long": {
        region: "Đồng bằng sông Cửu Long",
        icon: "🌴",
        description: "Vùng đất sông nước với nhiều vườn cây ăn trái."
    },

    "Đồng Tháp": {
        region: "Đồng bằng sông Cửu Long",
        icon: "🌾",
        description: "Đất Sen hồng, nổi tiếng với những cánh đồng sen và hệ sinh thái Đồng Tháp Mười."
    },

    "Cà Mau": {
        region: "Đồng bằng sông Cửu Long",
        icon: "🌅",
        description: "Vùng đất cực Nam của Tổ quốc, nổi tiếng với Mũi Cà Mau."
    },

    "An Giang": {
        region: "Đồng bằng sông Cửu Long",
        icon: "🌴",
        description: "Vùng đất biên giới Tây Nam với cảnh quan sông nước và núi non."
    }
};


/* =====================================================
   TẠO POPUP
===================================================== */

const provinceModal = document.createElement("div");

provinceModal.className = "province-modal";

provinceModal.innerHTML = `
    <div class="province-modal-overlay"></div>

    <div class="province-modal-box">

        <button class="province-modal-close">
            ×
        </button>

        <div class="modal-province-icon"></div>

        <span class="modal-province-region"></span>

        <h2 class="modal-province-name"></h2>

        <p class="modal-province-description"></p>

        <button class="modal-province-btn">
            🇻🇳 Khám phá Việt Nam
        </button>

    </div>
`;

document.body.appendChild(provinceModal);


/* =====================================================
   BẤM VÀO TỈNH
===================================================== */

document.querySelectorAll(".province-card").forEach(card => {

    card.addEventListener("click", () => {

        const name =
            card.dataset.name ||
            card.querySelector("h3")?.textContent.trim();

        const info = provinceInfo[name];

        if (!info) return;

        provinceModal.querySelector(
            ".modal-province-icon"
        ).textContent = info.icon;

        provinceModal.querySelector(
            ".modal-province-region"
        ).textContent = info.region;

        provinceModal.querySelector(
            ".modal-province-name"
        ).textContent = name;

        provinceModal.querySelector(
            ".modal-province-description"
        ).textContent = info.description;

        provinceModal.classList.add("show");

        document.body.style.overflow = "hidden";
    });

});


/* =====================================================
   ĐÓNG POPUP
===================================================== */

function closeProvinceModal() {

    provinceModal.classList.remove("show");

    document.body.style.overflow = "";

}

provinceModal
    .querySelector(".province-modal-close")
    .addEventListener("click", closeProvinceModal);

provinceModal
    .querySelector(".province-modal-overlay")
    .addEventListener("click", closeProvinceModal);


/* ESC */
document.addEventListener("keydown", event => {

    if (event.key === "Escape") {
        closeProvinceModal();
    }

});