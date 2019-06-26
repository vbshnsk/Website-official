document.addEventListener('DOMContentLoaded', function() {

	// circle rotation
    $(".big").rotate(-45);
    $(".small").rotate(-45);

    var big = $(".big");
    var offset_big = big.offset();
    var width_big = big.outerWidth();
    var height_big = big.outerHeight();
    var centerX_big = offset_big.left + width_big / 2;
    var centerY_big = offset_big.top + height_big / 2;

    var small = $(".small");
    var offset_small = big.offset();
    var width_small = big.outerWidth();
    var height_small = big.outerHeight();
    var centerX_small = offset_small.left + width_small / 2;
    var centerY_small = offset_small.top + height_small / 2;


    $('#slider').mousemove(function(event) {
        var angle_big = Math.atan2(event.pageY - centerY_big, event.pageX - centerX_big) * 180 / Math.PI;
        var angle_small = Math.atan2(event.pageY - centerY_small, event.pageX - centerX_small) * 180 / Math.PI;


        $(".big").rotate(angle_big);
        $(".small").rotate(angle_small);
    });

    // scroll fullscreen
    $(".main").onepage_scroll({
       sectionContainer: "section",     // sectionContainer accepts any kind of selector in case you don't want to use section
       easing: "ease",                  // Easing options accepts the CSS3 easing animation such "ease", "linear", "ease-in",
                                        // "ease-out", "ease-in-out", or even cubic bezier value such as "cubic-bezier(0.175, 0.885, 0.420, 1.310)"
       animationTime: 1000,             // AnimationTime let you define how long each section takes to animate
       pagination: true,                // You can either show or hide the pagination. Toggle true for show, false for hide.
       updateURL: false,                // Toggle this true if you want the URL to be updated automatically when the user scroll to each page.
       beforeMove: function(index) {
            // change circles position on slide change
            var cls = "c" + index
            $(".big").removeClass("c1 c2 c3 c4").addClass(cls);
            $(".small").removeClass("c1 c2 c3 c4").addClass(cls);
            $(".digisol_header").removeClass("header_step3 header_step2 header_step1");
            $(".menuitem").addClass("hide");

       },  // This option accepts a callback function. The function will be called before the page moves.
       afterMove: function(index) {


       },   // This option accepts a callback function. The function will be called after the page moves.
       loop: true,                     // You can have the page loop back to the top/bottom when the user navigates at up/down on the first/last page.
       keyboard: true,                  // You can activate the keyboard controls
       responsiveFallback: false,        // You can fallback to normal page scroll by defining the width of the browser in which
                                        // you want the responsive fallback to be triggered. For example, set this to 600 and whenever
                                        // the browser's width is less than 600, the fallback will kick in.
       direction: "horizontal"            // You can now define the direction of the One Page Scroll animation. Options available are "vertical" and "horizontal". The default value is "vertical".
    });

    // digisol menu click
    $(".layer1").on( "click", function() {
        $(".layer3").toggleClass("header_step3");
        $(".layer2").toggleClass("header_step2");
        $(".layer1").toggleClass("header_step1");
        $(".menuitem").toggleClass("hide");
        $("#logo").addClass("clicked");
        setTimeout( function(){ $("#logo").removeClass("clicked"); }, 100 );
    });


}, false);
