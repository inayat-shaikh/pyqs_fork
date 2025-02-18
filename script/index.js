//Alert function activated when whatsapp close button is clicked
window.addEventListener("DOMContentLoaded", function () {
  const alertElement = document.getElementById("alert-border-3");
  const dismissButton = alertElement.querySelector(
    '[data-dismiss-target="#alert-border-3"]'
  );
  let timerStarted = false;
  let autoCloseTimer = null;

  // Function to check if element is visible
  function isElementVisible(el) {
    const style = window.getComputedStyle(el);
    return style.display !== "none" && style.visibility !== "hidden";
  }

  // Function to start the auto-close timer and animations
  function startAlertTimer() {
    if (timerStarted) return; // Prevent multiple timers
    timerStarted = true;

    // Add fade-in animation
    alertElement.classList.add("fade-in", "show");
    alertElement.classList.remove("fade-out");

    // Start the timer for fade-out and removal
    autoCloseTimer = setTimeout(function () {
      closeAlert();
    }, 6300); // Display duration before starting fade-out
  }

  // Function to close the alert
  function closeAlert() {
    // Clear any existing timer
    if (autoCloseTimer) {
      clearTimeout(autoCloseTimer);
    }

    // Start fade-out animation
    alertElement.classList.remove("fade-in");
    alertElement.classList.add("fade-out");

    // Remove element after animation completes
    setTimeout(function () {
      alertElement.remove();
    }, 500); // Matches the fade-out animation duration
  }

  // Create a MutationObserver to watch for style/display changes
  const observer = new MutationObserver(function (mutations) {
    mutations.forEach(function (mutation) {
      if (
        mutation.attributeName === "style" ||
        mutation.attributeName === "class"
      ) {
        if (isElementVisible(alertElement) && !timerStarted) {
          startAlertTimer();
        }
      }
    });
  });

  // Add click event listener to dismiss button
  dismissButton.addEventListener("click", function () {
    closeAlert();
  });

  // Start observing the alert element for style and class changes
  observer.observe(alertElement, {
    attributes: true,
    attributeFilter: ["style", "class"],
  });

  // Check initial state
  if (isElementVisible(alertElement) && !timerStarted) {
    startAlertTimer();
  }
});
//Ordinary alert function when whatsapp modal is removed
// window.addEventListener('DOMContentLoaded', function () {
//     var alertElement = document.getElementById('alert-border-3');
//     alertElement.classList.add('fade-in', 'show');

//     setTimeout(function () {
//         alertElement.classList.remove('fade-in');
//         alertElement.classList.add('fade-out');
//         setTimeout(function () {
//             alertElement.remove();
//         }, 500);
//     }, 6300);
// });

///WhatsApp Group Join does not required checkbox code in html///
document.addEventListener("DOMContentLoaded", () => {
  const contactModal = document.getElementById("contactModal");
  const closeModalBtn = document.getElementById("closeModal");
  const whatsappLink = document.getElementById("whatsappLink");
  const alertElement = document.getElementById("alert-border-3");

  // Function to show the modal
  function showModal() {
    // Always display the modal
    contactModal.style.display = "flex";
  }

  // Function to close the modal
  function closeModal() {
    // Simply hide the modal
    contactModal.style.display = "none";
    alertElement.style.display = "flex";
    scrollToTop();
  }

  // Function to scroll to modal
  function scrollToModal() {
    // Check if modal is visible
    if (contactModal.style.display === "flex") {
      // Calculate the scroll position to center the modal vertically
      const modalRect = contactModal.getBoundingClientRect();
      const viewportHeight = window.innerHeight;
      const modalHeight = modalRect.height;

      // Calculate the scroll position to center the modal
      const scrollPosition =
        modalRect.top + window.pageYOffset - (viewportHeight - modalHeight) / 2;

      // Smooth scroll to the calculated position
      window.scrollTo({
        top: scrollPosition,
        behavior: "smooth",
      });
    }
  }

  //Scroll to top
  function scrollToTop() {
    window.scrollTo({
      top: 0,
      behavior: "smooth",
    });
  }

  // Ensure WhatsApp link opens in new tab
  whatsappLink.setAttribute("target", "_blank");
  whatsappLink.setAttribute("rel", "noopener noreferrer");

  // Event listener for close button
  closeModalBtn.addEventListener("click", closeModal);

  // Show modal on page load
  showModal();

  // Window onload to handle scrolling after all content is loaded
  window.onload = () => {
    setTimeout(scrollToModal, 500);
  };
});

//Animation on whatsapp texts
document.addEventListener("DOMContentLoaded", function () {
  const stackAnimation = document.querySelector(".stack-animation");
  const spans = stackAnimation.querySelectorAll("span");

  spans.forEach((span, index) => {
    span.style.setProperty("--index", index);
  });

  stackAnimation.classList.add("animate");
});

///WhatsApp Group Join required checkbox code in html///
// document.addEventListener('DOMContentLoaded', () => {
//     const contactModal = document.getElementById('contactModal');
//     const closeModalBtn = document.getElementById('closeModal');
//     const whatsappLink = document.getElementById('whatsappLink');
//     const disableModalCheckbox = document.getElementById('disableModalCheckbox');

//     // Function to check if modal should be shown
//     function shouldShowModal() {
//         // Check localStorage for hidden flag
//         return !localStorage.getItem('whatsappModalHidden');
//     }

//     // Function to show the modal
//     function showModal() {
//         if (shouldShowModal()) {
//             contactModal.style.display = 'flex';
//         } else {
//             contactModal.style.display = 'none';
//         }
//     }

//     // Function to close the modal
//     function closeModal() {
//         // Check if checkbox is checked to permanently hide
//         if (disableModalCheckbox.checked) {
//             localStorage.setItem('whatsappModalHidden', 'true');
//         }

//         // Hide the modal
//         contactModal.style.display = 'none';
//     }

//     // Function to scroll to modal
//     function scrollToModal() {
//         // Check if modal is visible
//         if (contactModal.style.display === 'flex') {
//             // Calculate the scroll position to center the modal vertically
//             const modalRect = contactModal.getBoundingClientRect();
//             const viewportHeight = window.innerHeight;
//             const modalHeight = modalRect.height;

//             // Calculate the scroll position to center the modal
//             const scrollPosition =
//                 modalRect.top +
//                 window.pageYOffset -
//                 (viewportHeight - modalHeight) / 2;

//             // Smooth scroll to the calculated position
//             window.scrollTo({
//                 top: scrollPosition,
//                 behavior: 'smooth'
//             });
//         }
//     }

//     // Ensure WhatsApp link opens in new tab
//     whatsappLink.setAttribute('target', '_blank');
//     whatsappLink.setAttribute('rel', 'noopener noreferrer');

//     // Event listener for close button
//     closeModalBtn.addEventListener('click', closeModal);

//     // Show modal on page load
//     showModal();

//     // Window onload to handle scrolling after all content is loaded
//     window.onload = () => {
//         setTimeout(scrollToModal, 500);
//     };
// });

//RCR
document.addEventListener('DOMContentLoaded', function () {
    document.addEventListener('contextmenu', function (event) {
        event.preventDefault();
    });
});

//DMR win&Max
document.addEventListener('keydown', function (e) {
    // Disable F12 key (developer tools)
    if (e.keyCode === 123) {
        e.preventDefault();
    }
    // Disable Ctrl+Shift+I and Ctrl+Shift+J (developer tools) for Windows
    if (e.ctrlKey && e.shiftKey && (e.keyCode === 73 || e.keyCode === 74)) {
        e.preventDefault();
    }
    // Disable Command+Option+I and Command+Option+J (developer tools) for macOS
    if (e.metaKey && e.altKey && (e.keyCode === 73 || e.keyCode === 74)) {
        e.preventDefault();
    }
    // Disable Ctrl+U (view source) for Windows
    if (e.ctrlKey && e.keyCode === 85) {
        e.preventDefault();
    }
    // Disable Command+Option+U (view source) for macOS
    if (e.metaKey && e.altKey && e.keyCode === 85) {
        e.preventDefault();
    }
});

//SSR
document.addEventListener('keyup', function (e) {
    if (e.key === 'PrintScreen') {
        navigator.clipboard.writeText('');
        alert('Screenshots are not allowed on this page.');
    }
});

//Ctr+P RES. win&Mac
document.addEventListener('keydown', function (e) {
    // Check for Ctrl+P on Windows and Command+P on macOS
    if ((e.ctrlKey && e.key === 'p') || (e.metaKey && e.key === 'p')) {
        e.preventDefault();
        alert('Printing is disabled on this page.');
    }
});
