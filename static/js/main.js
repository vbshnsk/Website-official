document.addEventListener('DOMContentLoaded', function() {

    // detect screen size
    var isMobile = window.matchMedia("only screen and (max-width: 812px)").matches;
	
    /*
    circle rotation
    */
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
            var angle_big = Math.atan2(event.pageY - centerY_big, event.pageX - centerX_big) * 180 / Math.PI;
            var angle_small = Math.atan2(event.pageY - centerY_small, event.pageX - centerX_small) * 180 / Math.PI;

            var angle_big_full = angle_big <= 0 ? angle_big : -180 - (180 - angle_big);
            var angle_small_full = angle_small <= 0 ? angle_small : -180 - (180 - angle_small);

            $(".big").css({"-webkit-transform":"rotate(" + angle_big_full + "deg)"});
            $(".small").css({"-webkit-transform":"rotate(" + angle_small_full + "deg)"});
        }
    });

    // digisol menu click (open menu)
    $(".layer1, #logo").on( "click", function() {
        // if (!isMobile ){
        //     $("#title_main").toggleClass("opened");
        //     $(".layer3").toggleClass("header_step3");
        //     $(".layer2").toggleClass("header_step2");
        //     $(".layer1").toggleClass("header_step1 wiggle");
        //     $(".menuitem").show(); // if slides scrolled before
        //     $(".menuitem").toggleClass("hide");
        //     $(".circle").toggleClass("blur");
        //     $("#circles-bg").toggleClass("dark");
        // }
        $("#logo").addClass("clicked");
        setTimeout( function(){ $("#logo").removeClass("clicked"); }, 100 );
    });

    // close digisol menu when clicked somewhere on 1st slide
    // $('html').click(function(e) {
    //    if($(e.target).is("#slider")){
    //         closeMenu();
    //    }
    // });
    // close digisol menu when "escape" key pushed
    // $(document).keyup(function(e) {
    //     if (e.key === "Escape") { // escape key maps to keycode `27`
    //         closeMenu();
    //     }
    // });

    // function closeMenu() {
    //     $(".layer3").removeClass("header_step3");
    //     $(".layer2").removeClass("header_step2");
    //     $(".layer1").removeClass("header_step1").addClass("wiggle");
    //     $(".menuitem").addClass("hide");
    //     $(".circle").removeClass("blur");
    //     $("#circles-bg").removeClass("dark");
    //     $("#title_main").removeClass("opened");
    // }

    /*
    POPUP contact form window
    */

    $("#cont, #cont-mobile").click(function(){
        $("#popup-contact").removeClass("animated fadeInTopForm goback").addClass("animated fadeInDownForm");
      });
    $("#close-pop").click(function(){
        $("#popup-contact").removeClass("animated fadeInDownForm").addClass("animated fadeInTopForm");
        if (isMobile){
            $("#mobile-menu-burger").show()
        }
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

    /*
    mobile menu
    */ 

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
    $('html').on( "click", function(e) {
       if( !$(e.target).is("#mobile-menu, #mobile-menu *") ){
            if( !$(e.target).parents("#mobile-menu-burger").is("#mobile-menu-burger") ){
                closeMobileMenu()
            }
       }
    });

    function closeMobileMenu(){
        $("#mobile-menu-burger img").removeClass("open").attr("src","../static/img/burger.png")
        $("#mobile-menu").css({"-webkit-transform":"translate(-100%)"})
    }

    function openMobileMenu(){
        $("#mobile-menu-burger img").addClass("open").attr("src","../static/img/close-menu.png")
        $("#mobile-menu").css({"-webkit-transform":"translate(0%)"})
    }

    /*
    smooth scroll (iOS works, android probably not)
    */ 

      $('#mobile-menu a[href*="#"]').click(function() {
          if ( !$(this).hasClass("no-smooth-scroll") ){
            if (location.pathname.replace(/^\//,'') == this.pathname.replace(/^\//,'') && location.hostname == this.hostname) {
                var target = $(this.hash);
                target = target.length ? target : $('[name=' + this.hash.slice(1) +']');
                if (target.length) {
                  $('html,body').animate({
                    scrollTop: target.offset().top
                  }, 500);
                  closeMobileMenu()
                  return false;
                }
              }
          }
          else if ( $(this).hasClass("no-smooth-scroll") ){
            $("#popup-contact").removeClass("animated fadeInTopForm goback").addClass("animated fadeInDownForm");
            $("#mobile-menu-burger").hide()
            $("#close-pop img").attr("src","../static/img/close-menu.png")
            closeMobileMenu()
          }
      });

      
      // click logo to scroll 1st slide
      $("#logo, .digisol-item-pair").on( "click", function(e){
            first_slide()
        });

        // scroll 1st slide
    function first_slide(){
        var position = $("#about-us").offset().top;
    
        $("body, html").animate({
            scrollTop: position
        }, 300 /* speed */ );
        e.preventDefault();

    }

    /*
     * scroll monitoring effects
    */
    var position = $(window).scrollTop(); 
    $(document).scroll(function(e){
        var scrollAmount = $(window).scrollTop();
        var documentHeight = $(document).height();
        var windowHeight = window.innerHeight;

        var scrollPercent = (scrollAmount / (documentHeight - windowHeight)) * 100;
        var roundScroll = Math.round(scrollPercent)
        var cof = windowHeight / 320
        var finalShift = cof * roundScroll

        if (isMobile){
              // circle position depends on scroll distance (mobile)
              $("section").removeClass("opaque")
              $(".big").css({"-webkit-transform":"translate(0, -" + finalShift + "%)"})
              $(".small").css({"-webkit-transform":"translate(0, -" + finalShift + "%)"})

        }
        else{
            console.log(roundScroll)
            if (roundScroll <= 10){
                $(".big").removeClass("c1 c2 c3 c4").addClass("c1");
                $(".small").removeClass("c1 c2 c3 c4").addClass("c1");
                // if scrolled down
                // if(scrollAmount > position) {
                //     e.preventDefault();
                //     first_slide()
                // }
            }
            else if ( (roundScroll > 10) && (roundScroll <= 29) ){
                // about us
                $(".big").removeClass("c1 c2 c3 c4").addClass("c2");
                $(".small").removeClass("c1 c2 c3 c4").addClass("c2");
            }
            else if ( (roundScroll > 29) && (roundScroll <= 45) ){
                // services and prices
                $(".big").removeClass("c1 c2 c3 c4").addClass("c3");
                $(".small").removeClass("c1 c2 c3 c4").addClass("c3");
            }
            else if (roundScroll > 45){
                // portfolio    
                $(".big").removeClass("c1 c2 c3 c4").addClass("c4");
                $(".small").removeClass("c1 c2 c3 c4").addClass("c4");
            }
        }
        
        position = scrollAmount;
          
    });


    // AOS

    AOS.init();

    // You can also pass an optional settings object
    // below listed default settings
    AOS.init({
      // Global settings:
      disable: "mobile", // accepts following values: 'phone', 'tablet', 'mobile', boolean, expression or function
      startEvent: 'DOMContentLoaded', // name of the event dispatched on the document, that AOS should initialize on
      initClassName: 'aos-init', // class applied after initialization
      animatedClassName: 'aos-animate', // class applied on animation
      useClassNames: false, // if true, will add content of `data-aos` as classes on scroll
      disableMutationObserver: false, // disables automatic mutations' detections (advanced)
      debounceDelay: 50, // the delay on debounce used while resizing window (advanced)
      throttleDelay: 99, // the delay on throttle used while scrolling the page (advanced)

    });



}, false);








