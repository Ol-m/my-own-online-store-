function applyFocus() {
    var button = document.querySelector('.positionAccountLogin2');
    button.focus();

    setTimeout(function() {
        button.blur();
    }, 100);
}

function setFocusBlur(button) {
    button.focus();

    setTimeout(function() {
        button.blur();
    }, 680);

    var href = button.getAttribute('data-href');
    var target = document.querySelector(href);

    if (target) {
        var headerOffset = 50;
        var elementPosition = target.getBoundingClientRect().top;
        var offsetPosition = elementPosition - headerOffset;

        window.scrollBy({
            top: offsetPosition,
            behavior: 'smooth'
        });
    }

    return false;
}

function setFocusAndBlur() {
    var button = document.querySelector('.positionAccountLogin1');
    button.focus();

    setTimeout(function() {
        button.blur();
    }, 100);
}

function setFocusAndBlur() {
    var button = document.querySelector('.positionAccountLogin1');
    button.focus();

    setTimeout(function() {
        button.blur();
    }, 100);
}