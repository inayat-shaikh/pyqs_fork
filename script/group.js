document.addEventListener('DOMContentLoaded', function () {
    var loadingOverlay = document.getElementById('loading');
    var successOverlay = document.getElementById('success');
    var okButton = document.getElementById('okButton');

    var links = document.querySelectorAll('#card a');
    links.forEach(function (link) {
        link.addEventListener('click', function (event) {
            event.preventDefault();
            showLoadingOverlay();

            // Simulate a 3-second delay
            setTimeout(function () {
                hideLoadingOverlay();
                window.location.href = event.target.getAttribute('href');
                showSuccessOverlay();
            }, 3000);
        });
    });

    okButton.addEventListener('click', function () {
        hideSuccessOverlay();
    });

    function showLoadingOverlay() {
        loadingOverlay.style.display = 'flex';
    }

    function hideLoadingOverlay() {
        loadingOverlay.style.display = 'none';
    }

    function showSuccessOverlay() {
        successOverlay.style.display = 'flex';
    }

    function hideSuccessOverlay() {
        successOverlay.style.display = 'none';
    }
});
