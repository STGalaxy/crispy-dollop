"use strict";

document.addEventListener("DOMContentLoaded", () => {

    /* =====================================================
       MENU MOBILE
    ===================================================== */

    const menuBtn = document.getElementById("menuBtn");
    const nav = document.getElementById("nav");

    if (menuBtn && nav) {

        menuBtn.addEventListener("click", () => {

            nav.classList.toggle("active");

            const isOpen = nav.classList.contains("active");

            menuBtn.innerHTML = isOpen ? "✕" : "☰";
            menuBtn.setAttribute(
                "aria-label",
                isOpen ? "Đóng menu" : "Mở menu"
            );
        });

        nav.querySelectorAll("a").forEach(link => {

            link.addEventListener("click", () => {

                nav.classList.remove("active");

                menuBtn.innerHTML = "☰";

                menuBtn.setAttribute(
                    "aria-label",
                    "Mở menu"
                );
            });

        });
    }


    /* =====================================================
       HEADER SCROLL
    ===================================================== */

    const header = document.getElementById("header");

    function updateHeader() {

        if (!header) return;

        if (window.scrollY > 50) {
            header.classList.add("scrolled");
        } else {
            header.classList.remove("scrolled");
        }
    }

    updateHeader();

    window.addEventListener(
        "scroll",
        updateHeader,
        { passive: true }
    );


    /* =====================================================
       SCROLL REVEAL
       QUAN TRỌNG:
       JS dùng .visible
    ===================================================== */

    const revealElements = document.querySelectorAll(
        ".section-title, " +
        ".about-text, " +
        ".about-box, " +
        ".card, " +
        ".nature-item, " +
        ".timeline-item, " +
        ".food-card, " +
        ".culture-item"
    );

    revealElements.forEach((element, index) => {

        element.classList.add("reveal");

        element.style.transitionDelay =
            `${Math.min(index * 0.06, 0.35)}s`;
    });


    if ("IntersectionObserver" in window) {

        const observer = new IntersectionObserver(
            entries => {

                entries.forEach(entry => {

                    if (entry.isIntersecting) {

                        entry.target.classList.add("visible");

                        observer.unobserve(
                            entry.target
                        );
                    }

                });

            },
            {
                threshold: 0.12,
                rootMargin: "0px 0px -40px 0px"
            }
        );

        revealElements.forEach(element => {
            observer.observe(element);
        });

    } else {

        /* Trình duyệt cũ */
        revealElements.forEach(element => {
            element.classList.add("visible");
        });

    }


    /* =====================================================
       BACK TO TOP
    ===================================================== */

    const topButton = document.createElement("button");

    topButton.innerHTML = "↑";

    topButton.className = "back-top";

    topButton.type = "button";

    topButton.setAttribute(
        "aria-label",
        "Lên đầu trang"
    );

    document.body.appendChild(topButton);


    function updateTopButton() {

        topButton.classList.toggle(
            "show",
            window.scrollY > 500
        );
    }

    window.addEventListener(
        "scroll",
        updateTopButton,
        { passive: true }
    );

    updateTopButton();


    topButton.addEventListener("click", () => {

        window.scrollTo({
            top: 0,
            behavior: "smooth"
        });

    });


    /* =====================================================
       3D CARD HOVER
    ===================================================== */

    document.querySelectorAll(".card").forEach(card => {

        card.addEventListener("mousemove", event => {

            const rect =
                card.getBoundingClientRect();

            const x =
                event.clientX - rect.left;

            const y =
                event.clientY - rect.top;

            const rotateY =
                ((x / rect.width) - 0.5) * 5;

            const rotateX =
                ((y / rect.height) - 0.5) * -5;

            card.style.transform =
                `translateY(-10px)
                 rotateX(${rotateX}deg)
                 rotateY(${rotateY}deg)`;

        });

        card.addEventListener("mouseleave", () => {

            card.style.transform =
                "translateY(0) rotateX(0) rotateY(0)";

        });

    });


    /* =====================================================
       SMOOTH ANCHOR
    ===================================================== */

    document.querySelectorAll(
        'a[href^="#"]'
    ).forEach(link => {

        link.addEventListener("click", event => {

            const href =
                link.getAttribute("href");

            if (!href || href === "#") return;

            const target =
                document.querySelector(href);

            if (!target) return;

            event.preventDefault();

            target.scrollIntoView({
                behavior: "smooth",
                block: "start"
            });

        });

    });


    /* =====================================================
       ESC ĐÓNG MENU
    ===================================================== */

    document.addEventListener("keydown", event => {

        if (event.key !== "Escape") return;

        if (!nav || !menuBtn) return;

        nav.classList.remove("active");

        menuBtn.innerHTML = "☰";

        menuBtn.setAttribute(
            "aria-label",
            "Mở menu"
        );
    });


    /* =====================================================
       CARD IMAGE LOAD EFFECT
    ===================================================== */

    document.querySelectorAll(".card-image").forEach(image => {

        image.addEventListener("mouseenter", () => {
            image.style.transition =
                "background-size .6s ease";
        });

    });


    /* =====================================================
       HERO PARALLAX NHẸ
    ===================================================== */

    const hero = document.querySelector(".hero");

    if (hero) {

        window.addEventListener(
            "scroll",
            () => {

                const scroll =
                    window.scrollY;

                if (scroll <= window.innerHeight) {

                    hero.style.backgroundPosition =
                        `center calc(50% + ${scroll * 0.15}px)`;
                }

            },
            { passive: true }
        );
    }


    /* =====================================================
       PREVENT ACCIDENTAL DOUBLE CLICK EFFECT
    ===================================================== */

    document.querySelectorAll(
        ".hero-btn, .back-home, footer > a"
    ).forEach(link => {

        link.addEventListener("click", () => {

            link.style.transform =
                "scale(.98)";

            setTimeout(() => {

                link.style.transform = "";

            }, 120);

        });

    });

});