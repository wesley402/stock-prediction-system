(function($) {
  "use strict"; // Start of use strict

  // Toggle the side navigation
  $("#sidebarToggle").on('click', function(e) {
    e.preventDefault();
    $("body").toggleClass("sidebar-toggled");
    $(".sidebar").toggleClass("toggled");
  });

  // Prevent the content wrapper from scrolling when the fixed side navigation hovered over
  $('body.fixed-nav .sidebar').on('mousewheel DOMMouseScroll wheel', function(e) {
    if ($(window).width() > 768) {
      var e0 = e.originalEvent,
        delta = e0.wheelDelta || -e0.detail;
      this.scrollTop += (delta < 0 ? 1 : -1) * 30;
      e.preventDefault();
    }
  });



  // Scroll to top button appear
  $(document).on('scroll', function() {
    var scrollDistance = $(this).scrollTop();
    if (scrollDistance > 100) {
      $('.scroll-to-top').fadeIn();
    } else {
      $('.scroll-to-top').fadeOut();
    }
  });

  // Smooth scrolling using jQuery easing
  $(document).on('click', 'a.scroll-to-top', function(event) {
    var $anchor = $(this);
    $('html, body').stop().animate({
      scrollTop: ($($anchor.attr('href')).offset().top)
    }, 1000, 'easeInOutExpo');
    event.preventDefault();
  });



  $('#addNewStockButton').click(function() {
  //Send the AJAX call to the server
    console.log("QQQ");
    var newStock = $('#addNewStockField').val();
    console.log(newStock);
    $.ajax({
      'url' : 'http://localhost:5000/historical-stock-data/' + newStock,
      'type' : 'PUT',
      'success' : function(data) {
        // addData(myLineChart, stockData['da']);
      }
    });
  });

  $('#searchStockByPeriodButton').click(function() {
    var company = document.getElementById('searchByStockName').value;
    var from = document.getElementById('dateFrom').value;
    var to = document.getElementById('dateTo').value;
    $.ajax({
      'url' : 'http://localhost:5000/historical-stock-data/' + company +"/query",
      'type' : 'POST',
      'success' : function(data) {
        var stockData = JSON.parse(data);
        console.log(typeof stockData[0]);
        addData(myLineChart, stockData['dates'], stockData['prices']);
      }
    });
  });

  function addData(chart, dates, prices) {
    chart.data.labels = dates;
    chart.data.datasets.forEach((dataset) => {
        dataset.data = prices;
    });
        chart.update();
  }





})(jQuery); // End of use strict
