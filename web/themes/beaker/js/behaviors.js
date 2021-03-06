(function ($) {
  /**
  * Get CSS Breakpoints
  * Usage: window.breakpoint gives you the actual breakpoint
  * E.g.: if(window.breakpoint == 'mobile') { Your Code }
  */
  Drupal.behaviors.getBreakpointsFromCSS = {
    attach: function(context, settings) {
      var breakpoint;
      var breakpoint_refreshValue;
      breakpoint_refreshValue = function () {
        window.breakpoint = window.getComputedStyle(document.querySelector('html'), ':before').getPropertyValue('content').replace(/\"/g, '');
      };

      $(window).resize(function () {
        breakpoint_refreshValue();
      }).resize();
    }
  };

  // This is just a template
  // Drupal.behaviors.somecustomModule = {
  //   attach: function(context, settings) {

  //   }
  // };


  Drupal.behaviors.expandHamburger = {
    attach: function(context, settings) {

      $('.sf-accordion-toggle a').click(function() {

        $(this).toggleClass('sf-expanded');
        $('.h-wrapper').toggleClass('opemMenu');

      });

    }
  };

  /*
  * Window Scroll event
  * - On scroll, decrease size of the logo
  */
  Drupal.behaviors.stickyHeader = {
    attach: function (context, settings) {

      $(window).on('scroll touchmove', function () {
        $('.header').toggleClass('slim-header', $(document).scrollTop() > $('header').outerHeight());
      });

    }
  };

  /*
  * - On Scroll, remove the opened menu
  */
  Drupal.behaviors.scrollCloseElements = {
    attach: function (context, settings) {

      checkOrientationMenu = function () {
        $('.region-header-right .h-wrapper').removeClass('opemMenu');
        $('.sf-accordion-toggle a').removeClass('sf-expanded');
      }

      $(window).scroll(function () {
        checkOrientationMenu();
      });
    }
  };


  /*
  * - On Scroll, slowly Fadein paragrapgh content
  */
  Drupal.behaviors.scrollInContent = {
    attach: function (context, settings) {

      window.sr = ScrollReveal();
      sr.reveal('.field--name-field-paragraph-content');
    }
  };


  /*
  * - Video Overlays (site wide)
  */
  Drupal.behaviors.videoOverlays = {
    attach: function (context, settings) {

      $('.paragraph--type--video', context).each(function (index, item) {

        var $this = $(this),
            $button = $this.find('a'),
            $overlay = $this.find('.js-video-overlay'),
            $iframesrc = $this.find('.field--name-field-video iframe').attr('src');
            $iframesrc = $iframesrc.replace("autoplay=0", "autoplay=1");

        // popup code for youtube videos
        $button.magnificPopup({
          items: {
            src: ''
          },
          type: 'iframe',
          iframe: {
            markup: '<div class="mfp-iframe-scaler">' +
            '<div class="mfp-close"></div>' +
            '<div class="mfp-title">Some caption</div>' +
            '<iframe class="mfp-iframe" frameborder="0" allowfullscreen></iframe>' +
            '</div>'
          },
          callbacks: {
            markupParse: function (template, values, item) {
              values.title = $overlay.find('h2').text();
            },
            open: function () {
              $(this.content).find('iframe').attr('src', $iframesrc);
              dataLayer.push(
                {'event': 'youtubeStarted'}
              );
            }
          }
        });


      });
    }
  };


  /*
  * - Main Gallery Images (News & Events)
  */
  Drupal.behaviors.mainGalleryCarousels = {
    attach: function (context, settings) {

      $('.node--type-events .field-gallery',context).owlCarousel({
          loop: true,
          nav: true,
          items: 1,
          animateIn: 'fadeIn',
          animateOut: 'fadeInDown',
          smartSpeed:250

      });

      $('.node--type-article .field-gallery',context).owlCarousel({
          loop: true,
          nav: true,
          items: 1,
          animateIn: 'fadeIn',
          animateOut: 'fadeInDown',
          smartSpeed: 250

      });
    }
  };


  /*
  * - Gallery Images (The ladies node pages)
  */
  Drupal.behaviors.imageOverlays = {
    attach: function (context, settings) {

      $('.paragraph--type--gallery .field--name-field-images').magnificPopup({

        delegate: 'a',
        type: 'image',
        mainClass: 'mfp-img-mobile',
        gallery: {
          enabled: true,
          navigateByImgClick: true,
          preload: [0,1]
        },
        image: {
          tError: '<a href="%url%">The image #%curr%</a> could not be loaded.',
          titleSrc: function(item) {
            return item;
          }
        }
      });

    }
  };


  /*
  * - Filters (News & Events)
  */
  Drupal.behaviors.filtersNewsEvents = {
    attach: function (context, settings) {

      var $news_container = $('.news-teaser .view-content').isotope({
         itemSelector: '.news-item',
         layoutMode: 'fitRows'
      });

      var $events_container = $('.event-teaser .view-content').isotope({
         itemSelector: '.event-item',
         layoutMode: 'fitRows'
      });

      $news_container = $('.news-teasers .view-content', context);
      $events_container = $('.event-teasers .view-content', context);


      /*
      * - News filter
      */
      $('.news-filter .view-content .filter-row a', context).bind('click',function(){

          if($(this).hasClass('active')){

            $news_container.isotope( {filter: ''});
            $(this).removeClass('active').css({'color':'#252525'});
          }
          else{

            $('.news-filter .view-content .filter-row a').removeClass('active').css({'color':'#bdbdbd'});
            $news_container.isotope( {filter: '.' + $(this).attr('rel')});
            $(this).addClass('active').css({'color':'#dbbc90'});
          }
      });

      /*
      * - Events Filter
      */
      $('.event-filter .view-content .filter-row a', context).bind('click',function(){

          if($(this).hasClass('active')){

            $events_container.isotope( {filter: ''});
            $(this).removeClass('active').css({'color':'#dbbc90'});
          }
          else{

            $('.event-filter .view-content .filter-row a').removeClass('active').css({'color':'#bdbdbd'});;
            $events_container.isotope( {filter: '.' + $(this).attr('rel')});
            $(this).addClass('active').css({'color':'#dbbc90'});
          }
      });


    }
  };



  /*
  * - The Ladies (Mini Teasers)
  * - mini owl carousel
  */

  Drupal.behaviors.theLadiesMini = {
    attach: function (context, settings) {

      $('.mini-tl-teasers .view-content',context).owlCarousel({

          loop: true,
          nav: true,
          margin:10,
          animateIn: 'fadeIn',
          animateOut: 'fadeInDown',
          smartSpeed:250,
          responsive:{
            0:{
                items:1
            },
            600:{
                items:3
            },
            1000:{
                items:5
            }
          }
      });
    }
  };



  /*
  * - The Ladies (Large Teasers)
  * - large owl carousel
  */

  Drupal.behaviors.theLadiesLarge = {
    attach: function (context, settings) {

      $('.the-ladies .view-content',context).owlCarousel({
          loop: true,
          nav: true,
          items: 1,
          animateIn: 'fadeIn',
          animateOut: 'fadeOut',
          smartSpeed:250
      });
    }
  };


  /*
  * - Open the mini carousel under The Ladies
  * -
  */

  Drupal.behaviors.openMiniCarousel = {
    attach: function (context, settings) {

      $('#js-more-btn').click(function() {

        $('.the-ladies').toggleClass('open-mini');
        $('.info-box').removeClass('onload');

      });

    }
  };

  /*
  * - Open the mini carousel under The Ladies
  */

  Drupal.behaviors.openMiniCarousel = {
    attach: function (context, settings) {

      $('#js-more-btn').click(function() {

        $('.the-ladies').toggleClass('open-mini');
        $('.info-box').removeClass('onload');

      });

    }
  };


  /*
  * - On load of the ladies page transition the section info box
  */
  Drupal.behaviors.transInfoBox = {
    attach: function (context, settings) {

      $(window).load(function() {
        $('.node--type-the-ladies.node--view-mode-teaser .info-box').addClass('onload');
        $('.node--type-the-ladies.node--view-mode-hp-teasers .info-box').addClass('onload');
      });
    }
  };


  /*
  * - On click of the class .info-icon display the .info-box on mobile
  */
  Drupal.behaviors.displayInfoBox = {
    attach: function (context, settings) {

      $('.info-icon').click(function() {
        $(this).find('.js-info-box').css({'visibility':'visible'});
      });
    }
  };


})(jQuery);
