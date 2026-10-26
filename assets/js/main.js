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
       CONTACT FORM — submit to the configured company inbox
       -------------------------------------------------------- */

    if (contactForm) {
        contactForm.addEventListener("submit", async function (event) {
            event.preventDefault();

            if (!contactForm.reportValidity()) return;

            const submitButton = contactForm.querySelector('button[type="submit"]');
            const originalButtonText = submitButton ? submitButton.textContent : "";

            if (submitButton) {
                submitButton.disabled = true;
                submitButton.setAttribute("aria-busy", "true");
                submitButton.textContent = "Sending enquiry…";
            }
            if (formStatus) formStatus.textContent = "Sending your enquiry to Maathavam Innovation Labs…";

            try {
                const response = await fetch(contactForm.action, {
                    method: "POST",
                    body: new FormData(contactForm),
                    headers: { "Accept": "application/json" }
                });
                let result = {};
                try { result = await response.json(); } catch (_) {}

                // FormSubmit can return HTTP 200 even when it rejects a submission.
                // Treat only an explicit true success value as accepted.
                const accepted = result.success === true || result.success === "true";
                if (!response.ok || !accepted) {
                    const serviceMessage = typeof result.message === "string" ? result.message.trim() : "";
                    throw new Error(serviceMessage || "The form service did not confirm receipt.");
                }

                if (formStatus) {
                    formStatus.textContent = "Thank you. The form service accepted your enquiry. If you do not receive a response, please contact founders@maathavaminnovationlabs.com.";
                }
                contactForm.reset();
            } catch (error) {
                if (formStatus) {
                    const detail = error && error.message ? error.message : "";
                    if (detail && detail !== "Failed to fetch" && detail !== "The form service did not confirm receipt.") {
                        formStatus.textContent = "Your enquiry was not accepted: " + detail + " Please check the recipient activation email or contact founders@maathavaminnovationlabs.com.";
                    } else {
                        formStatus.textContent = "We couldn't confirm submission because the form service could not be reached. Please check your connection and try again, or contact founders@maathavaminnovationlabs.com.";
                    }
                }
            } finally {
                if (submitButton) {
                    submitButton.disabled = false;
                    submitButton.removeAttribute("aria-busy");
                    submitButton.textContent = originalButtonText || "Explore a partnership";
                }
            }
        });
    }


    /* --------------------------------------------------------
       ENGAGEMENT CARD -> CONTACT FORM
       -------------------------------------------------------- */
    document.querySelectorAll("[data-opportunity]").forEach(function (card) {
        card.addEventListener("click", function () {
            const select = document.getElementById("opportunitySelect");
            if (select) select.value = card.getAttribute("data-opportunity") || "";
        });
    });

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