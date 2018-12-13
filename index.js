var dict = {'#win1': 'High Line Observation Deck#Chelsea, New York', '#win2':'Chelsea Market#Chelsea, New York','#win3' :  'Parsons School of Design#Greenwich, New York', '#win4' : 'West 17th street#Chelsea, New York'};
var source = {'#win1': 'https://en.wikipedia.org/wiki/High_Line,https://www.instagram.com/explore/locations/3001573/the-high-line/?hl=en', '#win2' : 'https://en.wikipedia.org/wiki/Chelsea_Market,https://www.instagram.com/explore/tags/chelseamarket/?hl=en',
              '#win3' : 'https://en.wikipedia.org/wiki/Parsons_School_of_Design,https://www.instagram.com/explore/locations/1565497/parsons-school-of-design/', '#win4':'https://en.wikipedia.org/wiki/List_of_numbered_streets_in_Manhattan#17th_to_19th_Streets,https://www.instagram.com/explore/locations/249918654/west-17th-street-nyc/'};
var isAboutPageIn = false;
$(document).ready(function() {
  google.maps.event.addDomListener(window, "load", streetViewAll);
  $('#b1').click(function() {
    scaleAndHide('#b1');
  });
  $('#b2').click(function() {
    scaleAndHide('#b2');
  });
  $('#b3').click(function() {
    scaleAndHide('#b3');
  });
  $('#b4').click(function() {
    scaleAndHide('#b4');
  });
  $('#overlay1').click(function() {
    scaleAndHide('#b1');
  });
  $('#overlay2').click(function() {
    scaleAndHide('#b2');
  });
  $('#overlay3').click(function() {
    scaleAndHide('#b3');
  });
  $('#overlay4').click(function() {
    scaleAndHide('#b4');
  });

  //hover change image for infor BUTTON
  $(".info").on({
    mouseenter: function(){
     $(this).attr('src','Shape2.png');
    },
    mouseleave: function(){
      $(this).attr('src','Shape.png');
    }
  });
  // hover change image for close icon.
  //$("#close").on({
  //  mouseenter: function(){
  //   $(this).attr('src','fm2.png');
  //  },
  //  click: function() {
  //    $(this).attr('src', 'fm3.png');
  //  },
  //  mouseleave: function(){
  //    $(this).attr('src','fm1.png');
  //  }
  //});
  // close BUTTON
  $('#close').click(function() {
    var e;
    if ($('#win1').is(':visible')) {
      e = '#win1';
    } else if ($('#win2').is(':visible')) {
      e = '#win2';
    } else if ($('#win3').is(':visible')) {
      e = '#win3';
    } else {
      e = '#win4';
    }
    setTimeout(function(){
      scaleAndShow(e);
    },300);
  });

  //about BUTTON
  $('#about').click(function() {
    if (!isAboutPageIn) {
      slideInLeft();
      $('#win1').hide();
      $('#win2').hide();
      $('#win3').hide();
      $('#win4').hide();
      isAboutPageIn = true;
    }
  });
  //stree View aboutPage
  $('#stView').click(function() {
    if (isAboutPageIn) {
      slideInLeft();
      $('#win1').show();
      $('#win2').show();
      $('#win3').show();
      $('#win4').show();
      isAboutPageIn = false;
    }
  });
});

//load all street view at once.
function streetViewAll() {
    var panoramas = [];
    $(".view").each(function(idx, el) {
        var panorama = new google.maps.StreetViewPanorama(
          el, {
          position: {
              lat: parseFloat($(this).data("lat")),
              lng: parseFloat($(this).data("lng"))
          },
          pov: {
              heading: parseFloat($(this).data("heading")),
              pitch: 0
          },
          visible: true,
          });
    panoramas.push(panorama);
  });
}

//load specific street view. based on input id.
// for performance optimization purpose.
function streetView(e) {
  $(e).each(function(idx, el) {
      var panorama = new google.maps.StreetViewPanorama(
        el, {
        position: {
            lat: parseFloat($(this).data("lat")),
            lng: parseFloat($(this).data("lng"))
        },
        pov: {
            heading: parseFloat($(this).data("heading")),
            pitch: 0
        },
        visible: true,
        });
    });
}

//scale the input button related elememnt, hide others.
function scaleAndHide(e) {
  var a,b,c,d;
  if (e == '#b1') {
    a = '#win2';
    b = '#win3';
    c = '#win4';
    d = '#win1';
  } else if (e == '#b2') {
    a = '#win1';
    b = '#win3';
    c = '#win4';
    d = '#win2';
  } else if (e == '#b3') {
    a = '#win1';
    b = '#win2';
    c = '#win4';
    d = '#win3';
  } else {
    a = '#win1';
    b = '#win2';
    c = '#win3';
    d = '#win4';
  }
  // visbility check
  var isD_Visible = $(d).is(':visible');
  if (!isD_Visible) {
    $(d).show();
  }
  $(a).hide();
  $(b).hide();
  $(c).hide();
  $('#overlay1').hide();
  $('#overlay2').hide();
  $('#overlay3').hide();
  $('#overlay4').hide();
  //delay reload streeview in order to refill new div.
  setTimeout(function() {
    streetView(d);
    }, 300);
  $(d).css({height: '94.6vh', width:'69vw', transition: '0.1s'});
  //load new title and webpage, newsfeed before slidein, increase ux.
  var title = dict[d].split('#');
  $('#line1').text("Location:"+"\xa0\xa0\xa0\xa0\xa0\xa0"+title[0]);
  $('#line2').text("District:"+"\xa0\xa0\xa0\xa0\xa0\xa0\xa0\xa0\xa0"+title[1]);
  var content = source[d].split(',');
  $('#wiki').attr('src',content[0]);
  //$('#feed').attr('src',content[1]);
  //iframe delay slide in, in order to allocate more resource on streetview loading.
  setTimeout("slideInRight()", 100);
}


//iframe slide in from right, input is the id
function slideInRight() {
  if($('#website').css('right')=='0px'){
      $('#website').animate({right: '-100%'}, 1000);
  }else{
      $('#website').animate({right:0}, 1000);
  }
}
// iframe slide in from left
function slideInLeft() {
  if($('#aboutPage').css('left')=='0px'){
      $('#aboutPage').animate({left: '-100%'}, 700);
  }else{
      $('#aboutPage').animate({left:0}, 700);
  }
}

function scaleAndShow(e) {
  if($('#website').css('right')=='0px'){
      $('#website').animate({right: '-100%'}, 1000);
  }else{
      $('#website').animate({right:0}, 1000);
  }

  //show hide windows
  if (e == '#win1') {
    $('#win2').show();
    $('#win3').show();
    $('#win4').show();
  } else if (e == '#win2') {
    $('#win1').show();
    $('#win3').show();
    $('#win4').show();
  } else if (e == '#win3') {
    $('#win1').show();
    $('#win2').show();
    $('#win4').show();
  } else {
    $('#win1').show();
    $('#win2').show();
    $('#win3').show();
  }
  $('#overlay1').show();
  $('#overlay2').show();
  $('#overlay3').show();
  $('#overlay4').show();
  $(e).css({height: '47.5vh', width:'50vw', transition : '0.1s'});
  streetView(e);
}
