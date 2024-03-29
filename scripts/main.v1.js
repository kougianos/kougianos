// @ts-nocheck
$(document).ready(function () {

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

	// View CV button only if ?viewCv param is present
	if (window.location.search == "?viewCv") {
		var btnViewCv = $("#viewCv");
		btnViewCv.removeClass("d-none");
	}

	// Hide navbar on mobile view, every time an option is clicked
	const liElements = document.querySelectorAll(".nav-link.smooth-scroll");
	const button = document.querySelector("#navbarTogglerButton");
	liElements.forEach((li) => {
		li.addEventListener("click", () => {
			button.click();
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
