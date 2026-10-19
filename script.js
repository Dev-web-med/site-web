
/* =========================================
   PORTFOLIO BILAL HAMMOUTI
   JavaScript
========================================= */

document.addEventListener("DOMContentLoaded", () => {

    // Récupération des éléments HTML
    const themeToggle = document.getElementById("themeToggle");
    const menuToggle = document.getElementById("menuToggle");
    const mainNav = document.getElementById("mainNav");
    const contactForm = document.getElementById("contactForm");
    const formNote = document.getElementById("formNote");
    const yearElement = document.getElementById("year");


    // =====================================
    // 1. THÈME JOUR / NUIT
    // =====================================

    if (themeToggle) {
        themeToggle.addEventListener("click", () => {

            const isDayTheme = document.body.classList.toggle("day-theme");

            themeToggle.setAttribute(
                "aria-label",
                isDayTheme
                    ? "Passer au thème jour"
                    : "Passer au thème nuit "
            );

            themeToggle.setAttribute(
                "aria-pressed",
                String(isDayTheme)
            );
        });
    }


    // =====================================
    // 2. MENU RESPONSIVE
    // =====================================

    if (menuToggle && mainNav) {

        menuToggle.addEventListener("click", () => {

            const isOpen = mainNav.classList.toggle("open");

            menuToggle.setAttribute(
                "aria-expanded",
                String(isOpen)
            );

            menuToggle.setAttribute(
                "aria-label",
                isOpen ? "Fermer le menu" : "Ouvrir le menu"
            );
        });


        // Fermer le menu après le clic sur un lien
        const navLinks = mainNav.querySelectorAll("a");

        navLinks.forEach((link) => {

            link.addEventListener("click", () => {

                mainNav.classList.remove("open");

                menuToggle.setAttribute("aria-expanded", "false");
                menuToggle.setAttribute(
                    "aria-label",
                    "Ouvrir le menu"
                );

                // Mise à jour du lien actif
                navLinks.forEach((item) => {
                    item.classList.remove("active");
                });

                link.classList.add("active");
            });
        });


        // Fermer le menu avec la touche Échap
        document.addEventListener("keydown", (event) => {

            if (event.key === "Escape") {

                mainNav.classList.remove("open");

                menuToggle.setAttribute("aria-expanded", "false");
                menuToggle.setAttribute(
                    "aria-label",
                    "Ouvrir le menu"
                );
            }
        });


        // Fermer le menu si l'utilisateur revient sur grand écran
        window.addEventListener("resize", () => {

            if (window.innerWidth > 760) {

                mainNav.classList.remove("open");

                menuToggle.setAttribute("aria-expanded", "false");
                menuToggle.setAttribute(
                    "aria-label",
                    "Ouvrir le menu"
                );
            }
        });
    }


    // =====================================
    // 3. ANNÉE AUTOMATIQUE DU FOOTER
    // =====================================

    if (yearElement) {
        yearElement.textContent = new Date().getFullYear();
    }


    // =====================================
    // 4. FORMULAIRE DE CONTACT
    // =====================================

    if (contactForm) {

        contactForm.addEventListener("submit", (event) => {

            // Empêche l'envoi classique du formulaire
            event.preventDefault();

            const formData = new FormData(contactForm);

            const name = String(
                formData.get("name") || ""
            ).trim();

            const email = String(
                formData.get("email") || ""
            ).trim();

            const subject = String(
                formData.get("subject") || ""
            ).trim();

            const message = String(
                formData.get("message") || ""
            ).trim();


            // Vérification des champs obligatoires
            if (!name || !email || !subject || !message) {

                if (formNote) {
                    formNote.textContent =
                        "Veuillez remplir tous les champs du formulaire.";
                }

                return;
            }


            // Vérification simple de l'adresse e-mail
            const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

            if (!emailPattern.test(email)) {

                if (formNote) {
                    formNote.textContent =
                        "Veuillez saisir une adresse e-mail valide.";
                }

                return;
            }


            // Préparation du message e-mail
            const emailBody =
                "Bonjour Bilal,\n\n" +
                message +
                "\n\nNom : " + name +
                "\nE-mail : " + email;


            const recipient = "bilal.hammoutii.05@gmail.com";

            const mailtoLink =
                "mailto:" + recipient +
                "?subject=" + encodeURIComponent(subject) +
                "&body=" + encodeURIComponent(emailBody);


            if (formNote) {
                formNote.textContent =
                    "Votre application e-mail va s'ouvrir. " +
                    "Vérifiez le message puis envoyez-le.";
            }


            // Ouvre l'application e-mail configurée
            window.location.href = mailtoLink;
        });
    }

});

