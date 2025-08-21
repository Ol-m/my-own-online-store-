$(window).on('load pageshow', function () {
    $('body').fadeIn();
});
$("a:not([href*='javascript:void(0)']):not([href*='accountRegistration.html']):not([href*='accountLogin.html'])").click(function() {
    if (!$(this).attr('target')) {
        $('body').fadeOut();
        let url = $(this).attr('href');
        window.setTimeout(function() {
            window.location.href = url;
        }, 420);
        return false;
    }
});