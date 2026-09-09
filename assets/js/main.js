/* ============================================================
   MAATHAVAM INNOVATION LABS
   Enterprise Deep-Tech IP Platform
   ============================================================ */

(function () {
    "use strict";

    /* --------------------------------------------------------
       DOM REFERENCES
       -------------------------------------------------------- */

    const siteHeader = document.getElementById("siteHeader");
    const scrollProgress = document.getElementById("scrollProgress");

    const navToggle = document.getElementById("navToggle");
    const navLinks = document.getElementById("navLinks");

    const contactForm = document.getElementById("contactForm");
    const formStatus = document.getElementById("formStatus");

    const currentYear = document.getElementById("currentYear");


    /* --------------------------------------------------------
       CURRENT YEAR
       -------------------------------------------------------- */

    if (currentYear) {
        currentYear.textContent = new Date().getFullYear();
    }


    /* --------------------------------------------------------
       HEADER + SCROLL PROGRESS
       -------------------------------------------------------- */

    function updateScrollState() {

        const scrollTop =
            window.scrollY ||
            document.documentElement.scrollTop ||
            0;

        const documentHeight =
            document.documentElement.scrollHeight -
            window.innerHeight;

        const progress =
            documentHeight > 0
                ? (scrollTop / documentHeight) * 100
                : 0;

        if (scrollProgress) {
            scrollProgress.style.width = progress + "%";
        }

        if (siteHeader) {
            if (scrollTop > 20) {
                siteHeader.classList.add("scrolled");
            } else {
                siteHeader.classList.remove("scrolled");
            }
        }
    }

    window.addEventListener(
        "scroll",
        updateScrollState,
        { passive: true }
    );

    updateScrollState();


    /* --------------------------------------------------------
       MOBILE NAVIGATION
       -------------------------------------------------------- */

    function closeNavigation() {

        if (!navLinks || !navToggle) {
            return;
        }

        navLinks.classList.remove("open");

        navToggle.setAttribute(
            "aria-expanded",
            "false"
        );

        navToggle.setAttribute(
            "aria-label",
            "Open navigation"
        );
    }


    if (navToggle && navLinks) {

        navToggle.addEventListener(
            "click",
            function () {

                const isOpen =
                    navLinks.classList.toggle("open");

                navToggle.setAttribute(
                    "aria-expanded",
                    String(isOpen)
                );

                navToggle.setAttribute(
                    "aria-label",
                    isOpen
                        ? "Close navigation"
                        : "Open navigation"
                );
            }
        );


        navLinks
            .querySelectorAll("a")
            .forEach(function (link) {

                link.addEventListener(
                    "click",
                    closeNavigation
                );

            });
    }


    /* --------------------------------------------------------
       ESCAPE KEY
       -------------------------------------------------------- */

    document.addEventListener(
        "keydown",
        function (event) {

            if (event.key === "Escape") {
                closeNavigation();
            }

        }
    );


    /* --------------------------------------------------------
       REVEAL ON SCROLL
       -------------------------------------------------------- */

    const revealElements =
        document.querySelectorAll(".reveal");

    if (
        "IntersectionObserver" in window &&
        revealElements.length > 0
    ) {

        const observer =
            new IntersectionObserver(
                function (entries, observerInstance) {

                    entries.forEach(
                        function (entry) {

                            if (entry.isIntersecting) {

                                entry.target.classList.add(
                                    "visible"
                                );

                                observerInstance.unobserve(
                                    entry.target
                                );
                            }

                        }
                    );

                },
                {
                    threshold: 0.12,
                    rootMargin: "0px 0px -30px 0px"
                }
            );


        revealElements.forEach(
            function (element) {
                observer.observe(element);
            }
        );

    } else {

        revealElements.forEach(
            function (element) {
                element.classList.add("visible");
            }
        );

    }


    /* --------------------------------------------------------
       CONTACT FORM
       --------------------------------------------------------

       The form intentionally uses a mailto fallback so the
       website works immediately without exposing or requiring
       a third-party form endpoint.

       A production form provider can be connected later.
       -------------------------------------------------------- */

    if (contactForm) {

        contactForm.addEventListener(
            "submit",
            function (event) {

                event.preventDefault();

                const formData =
                    new FormData(contactForm);

                const name =
                    String(
                        formData.get("name") || ""
                    ).trim();

                const organisation =
                    String(
                        formData.get("organisation") || ""
                    ).trim();

                const email =
                    String(
                        formData.get("email") || ""
                    ).trim();

                const opportunity =
                    String(
                        formData.get("opportunity") || ""
                    ).trim();

                const message =
                    String(
                        formData.get("message") || ""
                    ).trim();


                if (!name || !email || !opportunity || !message) {

                    if (formStatus) {
                        formStatus.textContent =
                            "Please complete the required fields.";
                    }

                    return;
                }


                const subject =
                    "Innovation Opportunity — Maathavam Innovation Labs";


                const body =
                    [
                        "Name: " + name,
                        "Organisation: " + organisation,
                        "Email: " + email,
                        "Opportunity Type: " + opportunity,
                        "",
                        "Opportunity Description:",
                        message,
                        "",
                        "Please note: detailed confidential technical information should not be included in this initial enquiry."
                    ].join("\n");


                const mailto =
                    "mailto:partnerships@maathavam.com" +
                    "?subject=" +
                    encodeURIComponent(subject) +
                    "&body=" +
                    encodeURIComponent(body);


                if (formStatus) {
                    formStatus.textContent =
                        "Opening your email client...";
                }


                window.location.href = mailto;

            }
        );

    }


    /* --------------------------------------------------------
       SMOOTH ANCHOR HANDLING
       -------------------------------------------------------- */

    document
        .querySelectorAll('a[href^="#"]')
        .forEach(function (link) {

            link.addEventListener(
                "click",
                function (event) {

                    const targetId =
                        link.getAttribute("href");

                    if (
                        !targetId ||
                        targetId === "#"
                    ) {
                        return;
                    }

                    const target =
                        document.querySelector(targetId);

                    if (!target) {
                        return;
                    }

                    event.preventDefault();

                    const headerOffset = 82;

                    const targetPosition =
                        target.getBoundingClientRect().top +
                        window.scrollY -
                        headerOffset;

                    window.scrollTo({
                        top: targetPosition,
                        behavior: "smooth"
                    });

                }
            );

        });

})();