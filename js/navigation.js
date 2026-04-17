document.addEventListener("DOMContentLoaded", () => {
  const MOBILE_BREAKPOINT = 880;
  const MOBILE_LOGO_SRC = "img/GWC_Logo_V2.png";
  const MOBILE_CLOSE_DELAY_MS = 150;

  const syncLogoForMenuState = (navbar, desktopLogoSrc) => {
    const logo = navbar.querySelector(".logo");
    if (!logo) {
      return;
    }

    const isMobile = window.innerWidth <= MOBILE_BREAKPOINT;
    const isOpen = navbar.classList.contains("is-open");
    logo.setAttribute(
      "src",
      isMobile && isOpen ? MOBILE_LOGO_SRC : desktopLogoSrc,
    );
  };

  const markActiveNavLink = (navLinks) => {
    const currentPath =
      window.location.pathname.split("/").pop() || "index.html";

    navLinks.querySelectorAll("a").forEach((link) => {
      const href = link.getAttribute("href") || "";
      const linkPath = href.split("#")[0].split("?")[0];

      if (linkPath && linkPath === currentPath) {
        link.setAttribute("aria-current", "page");
      } else {
        link.removeAttribute("aria-current");
      }
    });
  };

  const closeNav = (navbar, toggleButton, desktopLogoSrc) => {
    navbar.classList.remove("is-open");
    toggleButton.setAttribute("aria-expanded", "false");
    toggleButton.setAttribute("aria-label", "Open navigation menu");
    document.body.classList.remove("nav-open");
    syncLogoForMenuState(navbar, desktopLogoSrc);
  };

  document.querySelectorAll(".navbar").forEach((navbar) => {
    const toggleButton = navbar.querySelector(".nav-toggle");
    const navLinks = navbar.querySelector(".nav-links");
    const logo = navbar.querySelector(".logo");

    if (!toggleButton || !navLinks || !logo) {
      return;
    }

    const desktopLogoSrc = logo.getAttribute("src") || "img/GWC_Logo.png";
    markActiveNavLink(navLinks);
    syncLogoForMenuState(navbar, desktopLogoSrc);

    toggleButton.addEventListener("click", () => {
      const isOpen = navbar.classList.toggle("is-open");
      toggleButton.setAttribute("aria-expanded", String(isOpen));
      toggleButton.setAttribute(
        "aria-label",
        isOpen ? "Close navigation menu" : "Open navigation menu",
      );
      document.body.classList.toggle("nav-open", isOpen);
      syncLogoForMenuState(navbar, desktopLogoSrc);
    });

    navLinks.querySelectorAll("a").forEach((link) => {
      link.addEventListener("click", () => {
        window.setTimeout(() => {
          closeNav(navbar, toggleButton, desktopLogoSrc);
        }, MOBILE_CLOSE_DELAY_MS);
      });
    });

    document.addEventListener("keydown", (event) => {
      if (event.key === "Escape") {
        closeNav(navbar, toggleButton, desktopLogoSrc);
      }
    });

    window.addEventListener("resize", () => {
      if (window.innerWidth > MOBILE_BREAKPOINT) {
        closeNav(navbar, toggleButton, desktopLogoSrc);
      } else {
        syncLogoForMenuState(navbar, desktopLogoSrc);
      }
    });
  });
});
