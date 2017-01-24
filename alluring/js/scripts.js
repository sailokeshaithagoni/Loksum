(function($){
    "use strict";

    $(document).on('ready', function () {
    /*-----------------------------------------------------------------*/
    /* Main Js Functions
    /*-----------------------------------------------------------------*/
        function doAnimations(elems) {
          //Cache the animationend event in a variable
          var animEndEv = 'webkitAnimationEnd animationend';
          elems.each(function () {
              var $this = $(this),
                  $animationType = $this.data('animation');
              $this.addClass($animationType).one(animEndEv, function () {
                  $this.removeClass($animationType);
              });
          });
        }

        //Variables on page load
        var $immortalCarousel = $('.animate_text'),
            $firstAnimatingElems = $immortalCarousel.find('.item:first').find("[data-animation ^= 'animated']");
        //Initialize carousel
        $immortalCarousel.carousel();
        //Animate captions in first slide on page load
        doAnimations($firstAnimatingElems);
        //Other slides to be animated on carousel slide event
        $immortalCarousel.on('slide.bs.carousel', function (e) {
            var $animatingElems = $(e.relatedTarget).find("[data-animation ^= 'animated']");
            doAnimations($animatingElems);
        });

        //============= Sticky Menu ============ 
        $("#header").sticky({topSpacing:0});
        //Scrollspy offset
        $("body").scrollspy({target: ".navbar-collapse", offset:200});

        //============= Smooth Scroll  ============ 
        $('li.smooth-menu a').on('click', function(event){
            var $anchor = $(this);
            var headerH = '116';
            $('html, body').stop().animate({
            scrollTop : $($anchor.attr('href')).offset().top - headerH + "px"
            },1500, 'easeInOutExpo');
            event.preventDefault();
        });

        // Wow Init
        var wow = new WOW(
        {
            boxClass:     'wow',      // animated element css class (default is wow)
            animateClass: 'animated', // animation css class (default is animated)
            offset:       0,          // distance to the element when triggering the animation (default is 0)
            mobile:       true,       // trigger animations on mobile devices (default is true)
            live:         true        // act on asynchronously loaded content (default is true)
        });
        wow.init();

        // Active tab menu
        $('.nav-tabs a[href="#joinus"]').tab('show');

        //============= Parallax section ============ 
        $('.parallax').parallaxify({
            alphaFilter: 0.1,
        });

        // Display the progress bar calling progressbar.js
        $('.progressbargo').progressBar({
            shadow : true,
            percentage : false,
            animation : true,
            animateTarget : true,
            barColor : "#52ADF9",
        });

        //============= Work Js ============
        $(".latest-project-item-carousel").owlCarousel({
            items : 3, 
            itemsDesktop : [1000,3], 
            itemsDesktopSmall : [900,3], 
            itemsTablet: [600,2], 
            itemsTabletSmall: [480,1],
            navigation : true, // Show next and prev buttons
            navigationText: [
              "<i class='fa fa-angle-left'></i>",
              "<i class='fa fa-angle-right'></i>"
              ],
            autoPlay : false,
            slideSpeed : 300,
            singleItem:false,
            pagination : false,
        });

        //============= Join Team Section ============
        $(".join-team-inner").owlCarousel({
            navigation : false, // Show next and prev buttons
            navigationText: [
              "<i class='fa fa-chevron-left'></i>",
              "<i class='fa fa-chevron-right'></i>"
              ],
            autoPlay : false,
            slideSpeed : 300,
            paginationSpeed : 400,
            singleItem:true,
            // Navigation
            pagination : true,
            // "singleItem:true" is a shortcut for:
            // items : 1, 
            // itemsDesktop : false,
            // itemsDesktopSmall : false,
            // itemsTablet: false,
            // itemsMobile : false
        });

        /* Join Us Accordion */
        function toggleIcon(e) {
            $(e.target)
            .prev('.panel-heading')
            .find(".more-less")
            .toggleClass('glyphicon-plus glyphicon-minus');
        }
        $('.panel-group').on('hidden.bs.collapse', toggleIcon);
        $('.panel-group').on('shown.bs.collapse', toggleIcon);
        $('.panel-collapse:first').collapse('show');

        //============= Testimonial Section ============
        $(".testimonial-content-area").owlCarousel({
            navigation : false, // Show next and prev buttons
            navigationText: [
              "<i class='fa fa-chevron-left'></i>",
              "<i class='fa fa-chevron-right'></i>"
              ],
            autoPlay : false,
            slideSpeed : 300,
            paginationSpeed : 400,
            singleItem:true,
            // Navigation
            pagination : true,
            // "singleItem:true" is a shortcut for:
            // items : 1, 
            // itemsDesktop : false,
            // itemsDesktopSmall : false,
            // itemsTablet: false,
            // itemsMobile : false
        });

        //============= Hot News Section ============
        $(".hot-news-area").owlCarousel({
            navigation : false, // Show next and prev buttons
            navigationText: [
              "<i class='fa fa-chevron-left'></i>",
              "<i class='fa fa-chevron-right'></i>"
              ],
            autoPlay : false,
            slideSpeed : 300,
            paginationSpeed : 400,
            singleItem:true,
            // Navigation
            pagination : true,
            // "singleItem:true" is a shortcut for:
            // items : 1, 
            // itemsDesktop : false,
            // itemsDesktopSmall : false,
            // itemsTablet: false,
            // itemsMobile : false
        });

        //============= Partners Section ============
        $(".partners-area").owlCarousel({
            items : 5, 
            itemsDesktop : [1000,4], 
            itemsDesktopSmall : [900,3], 
            itemsTablet: [600,2], 
            itemsTabletSmall: [480,1],
            navigation : false, // Show next and prev buttons
            navigationText: [
              "<i class='fa fa-angle-left'></i>",
              "<i class='fa fa-angle-right'></i>"
              ],
            autoPlay : false,
            slideSpeed : 300,
            singleItem:false,
            pagination : true,
        });

        /*--------------------------------------------------*/
        /* Counter
        /*--------------------------------------------------*/         
        $('.timer').countTo();
        $('.counter-item').appear(function() {
            $('.timer').countTo();
        },
        {
            accY: -100
        });


        /* ==================================================
        Contact Form Validations
        ================================================== */
        $('.contact-form').each(function(){
            var formInstance = $(this);
            formInstance.submit(function(){
                var action = $(this).attr('action');
                $("#message").slideUp(750,function() {
                    $('#message').hide();
                  
                    $('#submit')
                      .after('<img src="images/assets/ajax-loader.gif" class="loader" />')
                      .attr('disabled','disabled');
                  
                    $.post(action, {
                      name: $('#name').val(),
                      email: $('#email').val(),
                      phone: $('#phone').val(),
                      comments: $('#comments').val()
                    },
                    function(data){
                        document.getElementById('message').innerHTML = data;
                        $('#message').slideDown('slow');
                        $('.contact-form img.loader').fadeOut('slow',function(){$(this).remove()});
                        $('#submit').removeAttr('disabled');
                    }
                    );
                });
                return false;
            });
        });

        /* remove the scroll to zoom from maps*/
        $('#google-maps').on('click',function(){
            $(this).find('iframe').addClass('clicked');
        })
        .mouseleave(function(){
            $(this).find('iframe').removeClass('clicked');
        });

        // Preloader
        $(window).on('load',function() {
            // Animate loader off screen
            $(".se-pre-con").fadeOut("slow");
        });
    });
})(jQuery); 