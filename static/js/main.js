document.addEventListener('DOMContentLoaded', function() {

    // detect screen size
    var isMobile = window.matchMedia("only screen and (max-width: 760px)").matches;

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
        if ( (!$("#title_main").hasClass("opened")) && !isMobile ){
            var trans = 0;
            xPercent = event.pageX / $( document ).width() * 100 * 4;
            trans = (xPercent - 50)/2;
            backtrans = (xPercent - 50)/6;
            var angle_big = Math.atan2(event.pageY - centerY_big, event.pageX - centerX_big) * 180 / Math.PI;
            var angle_small = Math.atan2(event.pageY - centerY_small, event.pageX - centerX_small) * 180 / Math.PI;

            var angle_big_full = angle_big <= 0 ? angle_big : -180 - (180 - angle_big);
            var angle_small_full = angle_small <= 0 ? angle_small : -180 - (180 - angle_small);

            $(".big").css({"-webkit-transform":"translate(" + backtrans + "px)" + "rotate(" + angle_big_full + "deg)"});
            $(".small").css({"-webkit-transform":"translate(" + trans + "px)" + "rotate(" + angle_small_full + "deg)"});
        }
    });

    // scroll fullscreen
    $(".main").onepage_scroll({
       sectionContainer: "section",     // sectionContainer accepts any kind of selector in case you don't want to use section
       easing: "ease",                  // Easing options accepts the CSS3 easing animation such "ease", "linear", "ease-in",
                                        // "ease-out", "ease-in-out", or even cubic bezier value such as "cubic-bezier(0.175, 0.885, 0.420, 1.310)"
       animationTime: 700,             // AnimationTime let you define how long each section takes to animate
       pagination: true,                // You can either show or hide the pagination. Toggle true for show, false for hide.
       updateURL: false,                // Toggle this true if you want the URL to be updated automatically when the user scroll to each page.
       beforeMove: function(index) {
            // change circles position on slide change
            var cls = "c" + index;
            $(".big").removeClass("c1 c2 c3 c4").addClass(cls);
            $(".small").removeClass("c1 c2 c3 c4").addClass(cls);
            $(".menuitem").hide(); // so menuitems dont mess with horizontal slide
            closeMenu();
       },  // This option accepts a callback function. The function will be called before the page moves.
       afterMove: function(index) {
            // reveal line slide from left
            if (index == 3){
                $(".gradline").removeClass("hidden").addClass("animated fadeInLeftline");
            }

       },   // This option accepts a callback function. The function will be called after the page moves.
       loop: true,                     // You can have the page loop back to the top/bottom when the user navigates at up/down on the first/last page.
       keyboard: true,                  // You can activate the keyboard controls
       responsiveFallback: 767,        // You can fallback to normal page scroll by defining the width of the browser in which
                                        // you want the responsive fallback to be triggered. For example, set this to 600 and whenever
                                        // the browser's width is less than 600, the fallback will kick in.
       direction: "horizontal"            // You can now define the direction of the One Page Scroll animation. Options available are "vertical" and "horizontal". The default value is "vertical".
    });

    // digisol menu click (open menu)
    $(".layer1, #logo").on( "click", function() {
        $("#title_main").toggleClass("opened");
        $(".layer3").toggleClass("header_step3");
        $(".layer2").toggleClass("header_step2");
        $(".layer1").toggleClass("header_step1 wiggle");
        $(".menuitem").show(); // if slides scrolled before
        $(".menuitem").toggleClass("hide");
        $("#logo").addClass("clicked");
        $(".circle").toggleClass("blur");
        $("#circles-bg").toggleClass("dark");
        setTimeout( function(){ $("#logo").removeClass("clicked"); }, 100 );
    });

    // close digisol menu when clicked somewhere on 1st slide
    $('html').click(function(e) {
       if($(e.target).is("#slider")){
            closeMenu();
       }
    });
    // close digisol menu when "escape" key pushed
    $(document).keyup(function(e) {
        if (e.key === "Escape") { // escape key maps to keycode `27`
            closeMenu();
        }
    });

    function closeMenu() {
        $(".layer3").removeClass("header_step3");
        $(".layer2").removeClass("header_step2");
        $(".layer1").removeClass("header_step1").addClass("wiggle");
        $(".menuitem").addClass("hide");
        $(".circle").removeClass("blur");
        $("#circles-bg").removeClass("dark");
        $("#title_main").removeClass("opened");
    }

    //popup contact form window
    $("#cont").click(function(){
        $("#popup-contact").removeClass("animated fadeInTopForm goback").addClass("animated fadeInDownForm");
      });
    $("#close-pop").click(function(){
        $("#popup-contact").removeClass("animated fadeInDownForm").addClass("animated fadeInTopForm");
        setTimeout( function(){ $("#popup-contact").addClass("goback"); }, 1000 );
      });

        // file upload
    const uploadButton = $("#attach-clip");
    const fileInfo = $("#attach-text");
    const realInput = $("#real-input");

    // click on image (clip, or cross on hover)
    uploadButton.click(function(e) {
        // if we pushing on clip (ading file)
        if ( $("#attach-clip img").hasClass( "addfile" ) )  {
            realInput.click();
        }
        // if we push on red cross (deleting file)
        else if ( $("#attach-clip img").hasClass( "deletefile" ) ){
            realInput.val("");
            $("#attach-text").removeClass("redcol delfileborder")
            $(".input-file-container").removeClass("delfileborder");
            $("#attach-clip img").removeClass("deletefile hasfile").attr("src","../static/img/file-clip.png").addClass("addfile");
            fileInfo.text("Attach file")
        }

    });
    // Attach file -> filename.ext
    $("#real-input").change(function() {
        if ($(this).val()){
            var truncated = $(this).val().split('/').pop().split('\\').pop();
            if(truncated.length > 10) truncated = truncated.substring(0,18) + "...";
            fileInfo.text(truncated).addClass("bluecol");
            $("#attach-clip img").attr("src","../static/img/blue-check.png").addClass("hasfile");
        }
    });
    // change blue check to red cross on hover (and add delete file functionality)
    $(".input-file-container").on({
            mouseenter: function () {
                var filename = $("#real-input").val();
                if (filename){
                    $("#attach-text").removeClass("bluecol").addClass("redcol");
                    $(this).addClass("delfileborder");
                    $("#attach-clip img").removeClass("addfile").addClass("deletefile").attr("src","../static/img/red-cross.png");
                }
            },
            mouseleave: function () {
                var filename = $("#real-input").val();
                if (filename){
                    $("#attach-text").removeClass("redcol delfileborder").addClass("bluecol");
                    $(this).removeClass("delfileborder");
                    $("#attach-clip img").removeClass("deletefile").attr("src","../static/img/blue-check.png");
                }
            }
    });

    // form validation

        // name
    $('#contact_name input').on('input', function() {
        var input = $(this);
        var is_name = input.val();

        if(is_name){
            $('#contact_name').removeClass("badborder").addClass("okborder");
        }
        else{
            $('#contact_name').removeClass("okborder").addClass("badborder");
        }
    });

        // email
    $('#contact_email input').on('input', function() {
        var input = $(this);
        var re = /^[a-zA-Z0-9.!#$%&'*+/=?^_`{|}~-]+@[a-zA-Z0-9-]+(?:\.[a-zA-Z0-9-]+)*$/;
        var is_email = re.test(input.val());
        if (is_email){
            $('#contact_email').removeClass("badborder").addClass("okborder");
        }
        else{
            $('#contact_email').removeClass("okborder").addClass("badborder");
        }
    });

        // mobile menu

    // toggle
    $("#mobile-menu-burger").on( "click", function() {
        if ($("#mobile-menu-burger img").hasClass("open")){
            closeMobileMenu()
        }
        else{
            openMobileMenu()
        }
    });

    // close mobile menu when clicked somewhere else
    // $('html').click(function(e) {
    //    if(!$(e.target).not("#mobile-menu")){
    //         closeMobileMenu()
    //    }
    // });


    function closeMobileMenu(){
        $("#mobile-menu-burger img").removeClass("open").attr("src","../static/img/burger.png")
        $("#mobile-menu").css({"-webkit-transform":"translate(-100%)"})
    }

    function openMobileMenu(){
        $("#mobile-menu-burger img").addClass("open").attr("src","../static/img/close-menu.png")
        $("#mobile-menu").css({"-webkit-transform":"translate(0%)"})
    }

}, false);








