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
		// uncomment below for on-scroll animations to played only once
		once: true,
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
			"300"
		);
	});

	// Progress Bar on Scroll
	function progressBarScroll() {
		let winScroll = document.body.scrollTop || document.documentElement.scrollTop,
			height = document.documentElement.scrollHeight - document.documentElement.clientHeight,
			scrolled = (winScroll / height) * 100;
		document.getElementById("progressBar").style.width = scrolled + "%";
	}

	window.onscroll = function () {
		progressBarScroll();
	};

	// Hide navbar on mobile view, every time an option is clicked
	const liElements = document.querySelectorAll(".nav-link.smooth-scroll");
	const button = document.querySelector("#navbarTogglerButton");
	liElements.forEach((li) => {
		li.addEventListener("click", () => {
			// Only close the navbar on mobile/tablet devices (below lg breakpoint)
			if (window.innerWidth < 992) {
				button.click();
			}
		});
	});
});

// Smooth scroll for links with hashes
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
			$("html, body").animate(
				{
					scrollTop: target.offset().top,
				},
				1000,
				function () {
					// Callback after animation
					// Must change focus!
					var $target = $(target);
					$target.focus();
					if ($target.is(":focus")) {
						// Checking if the target was focused
						return false;
					} else {
						$target.attr("tabindex", "-1"); // Adding tabindex for elements not focusable
						$target.focus(); // Set focus again
					}
				}
			);
		}
	}
});
