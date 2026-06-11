// @ts-nocheck
$(document).ready(function () {
	const THEME_STORAGE_KEY = "preferred-theme";
	const themeToggleButtons = document.querySelectorAll(".theme-toggle-btn");

	function updateThemeButtons(theme) {
		themeToggleButtons.forEach((button) => {
			const isDark = theme === "dark";
			button.setAttribute("aria-pressed", isDark.toString());
			button.setAttribute("aria-label", isDark ? "Activate light mode" : "Activate dark mode");
			button.setAttribute("title", isDark ? "Activate light mode" : "Activate dark mode");
		});
	}

	function applyTheme(theme) {
		document.body.classList.toggle("dark-mode", theme === "dark");
		updateThemeButtons(theme);
	}

	function getPreferredTheme() {
		const storedTheme = localStorage.getItem(THEME_STORAGE_KEY);
		if (storedTheme === "light" || storedTheme === "dark") {
			return storedTheme;
		}

		return window.matchMedia("(prefers-color-scheme: dark)").matches ? "dark" : "light";
	}

	function initializeThemeToggle() {
		if (!themeToggleButtons.length) {
			return;
		}

		applyTheme(getPreferredTheme());

		themeToggleButtons.forEach((button) => {
			button.addEventListener("click", () => {
				const nextTheme = document.body.classList.contains("dark-mode") ? "light" : "dark";
				localStorage.setItem(THEME_STORAGE_KEY, nextTheme);
				applyTheme(nextTheme);
			});
		});

		const mediaQuery = window.matchMedia("(prefers-color-scheme: dark)");
		const onSystemThemeChanged = (event) => {
			if (localStorage.getItem(THEME_STORAGE_KEY)) {
				return;
			}
			applyTheme(event.matches ? "dark" : "light");
		};

		if (typeof mediaQuery.addEventListener === "function") {
			mediaQuery.addEventListener("change", onSystemThemeChanged);
		} else if (typeof mediaQuery.addListener === "function") {
			mediaQuery.addListener(onSystemThemeChanged);
		}
	}

	initializeThemeToggle();

	// Footer year
	document.getElementById("currentYear").textContent = new Date().getFullYear().toString();

	// Dynamically calculate years of professional experience
	document.getElementById('yearsExperience').textContent = `${Math.ceil(new Date().getFullYear() - 2018)} years`

	AOS.init({
		once: true,
		disable: window.matchMedia("(max-width: 991.98px)").matches,
	}); // initialize animate on scroll library

	// Scroll to top button
	var btn = $("#buttonScrollTop");

	if ($(window).scrollTop() > 300) {
		btn.addClass("show");
	} else {
		btn.removeClass("show");
	}

	$(window).scroll(function () {
		if ($(window).scrollTop() > 300) {
			btn.addClass("show");
		} else {
			btn.removeClass("show");
		}
	});

	btn.on("click", function (e) {
		e.preventDefault();
		$("html, body").animate(
			{
				scrollTop: 0,
			},
			"100"
		);
	});

	// Progress Bar on Scroll
	function progressBarScroll() {
		let winScroll = document.body.scrollTop || document.documentElement.scrollTop,
			height = document.documentElement.scrollHeight - document.documentElement.clientHeight,
			scrolled = (winScroll / height) * 100;
		document.getElementById("progressBar").style.width = scrolled + "%";
	}

	function initializeActiveSectionHighlight() {
		const navLinks = Array.from(document.querySelectorAll(".nav-link.smooth-scroll"));
		const sections = navLinks
			.map((link) => {
				const hash = link.getAttribute("href");
				if (!hash || !hash.startsWith("#")) {
					return null;
				}
				const target = document.querySelector(hash);
				if (!target) {
					return null;
				}
				return { link, target };
			})
			.filter(Boolean);

		if (!sections.length) {
			return;
		}

		const setActiveSection = () => {
			const scrollPosition = window.scrollY + 130;
			let active = sections[0];

			sections.forEach((item) => {
				if (item.target.offsetTop <= scrollPosition) {
					active = item;
				}
			});

			navLinks.forEach((link) => link.classList.remove("active-section"));
			active.link.classList.add("active-section");
		};

		window.addEventListener("scroll", setActiveSection);
		window.addEventListener("resize", setActiveSection);
		setActiveSection();
	}

	window.addEventListener("scroll", progressBarScroll);
	progressBarScroll();
	initializeActiveSectionHighlight();
});

// Smooth scroll for links with hashes
function getNavbarOffset() {
	var $navbar = $(".navbar");
	if (!$navbar.length) {
		return 0;
	}
	var navbarTop = parseInt($navbar.css("top"), 10) || 0;
	return  $navbar.outerHeight();
}

$("a.smooth-scroll").click(function (event) {
	// On-page links
	if (
		location.pathname.replace(/^\//, "") == this.pathname.replace(/^\//, "") &&
		location.hostname == this.hostname
	) {
		// Figure out element to scroll to
		var target = $(this.hash);
		target = target.length ? target : $("[name=" + this.hash.slice(1) + "]");
		// Does a scroll target exist?
		if (target.length) {
			// Only prevent default if animation is actually gonna happen
			event.preventDefault();

			var doScroll = function () {
				var scrollTo = Math.max(0, target.offset().top - getNavbarOffset());
				$("html, body").animate(
					{
						scrollTop: scrollTo,
					},
					200,
					function () {
						// Move focus without re-scrolling (native focus would undo the navbar offset).
						var $target = $(target);
						var el = $target.get(0);
						if (!$target.attr("tabindex")) {
							$target.attr("tabindex", "-1");
						}
						if (el && typeof el.focus === "function") {
							el.focus({ preventScroll: true });
						}
					}
				);
			};

			// Close the mobile menu first so the offset is computed against the collapsed navbar.
			var $navCollapse = $("#navigation");
			if ($navCollapse.hasClass("show")) {
				$navCollapse.one("hidden.bs.collapse", doScroll);
				$navCollapse.collapse("hide");
			} else {
				doScroll();
			}
		}
	}
});
