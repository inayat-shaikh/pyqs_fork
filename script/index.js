window.addEventListener('DOMContentLoaded', function () {
    var alertElement = document.getElementById('alert-border-3');
    alertElement.classList.add('fade-in', 'show');

    setTimeout(function () {
        alertElement.classList.remove('fade-in');
        alertElement.classList.add('fade-out');
        setTimeout(function () {
            alertElement.remove();
        }, 500);
    }, 6300);
});
