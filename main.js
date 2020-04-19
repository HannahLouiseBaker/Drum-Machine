$(document).ready(() => {

  /*Power Button*/
  $("#power-on").hide();

  $("#power-button").click(() => {
    $("#power-on").toggle();
    $("#power-off").toggle();
    $("#power-button").toggleClass("btn-success");
    $("#power-button").toggleClass("btn-danger");
    $(".drum-pad").toggleClass("active");
    $("#bank-display").html("");
  });

  /*Bank Toggle*/
  $("#bank-two").hide();

  $("#bank-toggle").click(() => {
      if ($(".drum-pad").hasClass("active")) {    
      $("#bank-one").toggle().toggleClass("active");
      $("#bank-two").toggle().toggleClass("active");
      $(".drum-pad").toggleClass("second-bank");
      if ($("#bank-one").hasClass("active")) {
       $("#bank-display").html("Bank Name 2");
      } else {
        $("#bank-display").html("Bank Name 1");
      }
    }
  });

  /*Trigger Audio by Pressing Button*/
  $(".drum-pad").on('click', function() {
    //Create variables
    let drumId = $(this).attr("id");
    let firstClip = $(this).children("audio.first").attr("id");
    let secondClip = $(this).children("audio.second").attr("id");

    //Create display variables and capitalise first letter
    let firstDisplay = firstClip.replace(/-/g, " ").replace("hh", "Hi-Hat").replace(firstClip[0], firstClip[0].toUpperCase());

    let secondDisplay = secondClip.replace(/-/g, " ").replace("hh", "Hi-Hat").replace(secondClip[0], secondClip[0].toUpperCase());

    //If display has two words, capitalise second word
   if (firstDisplay.split(' ')[1] !== undefined) {
      firstDisplay = firstDisplay.replace(firstDisplay.split(' ')[1][0], firstDisplay.split(' ')[1][0].toUpperCase());
    }

   if (secondDisplay.split(' ')[1] !== undefined) {
      secondDisplay = secondDisplay.replace(secondDisplay.split(' ')[1][0], secondDisplay.split(' ')[1][0].toUpperCase());
    }

    //Trigger audio based on bank and whether power is on
    if ($("#" + drumId).hasClass("active")) {
      $("#" + drumId).animate({left: '1px', top: '1px'}, 50).animate({left: null, top: null, right: '1px', bottom: '1px'});
    if ($("#" + drumId).hasClass("second-bank")) {
      $("#" + secondClip).trigger('play');
      $("#bank-display").html(secondDisplay);
    } else {
      $("#" + firstClip).trigger('play');
      $("#bank-display").html(firstDisplay);
    }
    }
  });

  /*Trigger Audio with Keypress*/
  $(document).keypress((event) => {
    //Create and assign variables
    let x = event.keyCode;
    let keyDrumId;

    switch(x) {
      case 113:
        keyDrumId = "#clip-one";
        break;
      case 119:
        keyDrumId = "#clip-two";
        break;
      case 101:
        keyDrumId = "#clip-three";
        break;
      case 97:
        keyDrumId = "#clip-four";
        break;
      case 115:
        keyDrumId = "#clip-five";
        break;
      case 100:
        keyDrumId = "#clip-six";
        break;
      case 122:
        keyDrumId = "#clip-seven";
        break;
      case 120:
        keyDrumId = "#clip-eight";
        break;
      case 99:
        keyDrumId = "#clip-nine";
    }

    let keyFirstClip = "#" + $(keyDrumId).children("audio.first").attr("id");
    let keySecondClip = "#" + $(keyDrumId).children("audio.second").attr("id");

    //Create display variables and capitalise first letter
    let keyFirstDisplay = keyFirstClip.replace("#", "").replace(/-/g, " ").replace("hh", "Hi-Hat").replace(keyFirstClip[1], keyFirstClip[1].toUpperCase());

    let keySecondDisplay = keySecondClip.replace("#", "").replace(/-/g, " ").replace("hh", "Hi-Hat").replace(keySecondClip[1], keySecondClip[1].toUpperCase());

    //If display has two words, capitalise second word
   if (keyFirstDisplay.split(' ')[1] !== undefined) {
      keyFirstDisplay = keyFirstDisplay.replace(keyFirstDisplay.split(' ')[1][0], keyFirstDisplay.split(' ')[1][0].toUpperCase());
    }

   if (keySecondDisplay.split(' ')[1] !== undefined) {
      keySecondDisplay = keySecondDisplay.replace(keySecondDisplay.split(' ')[1][0], keySecondDisplay.split(' ')[1][0].toUpperCase());
    }

    //Trigger audio based on bank and whether power is on
    if ($(keyDrumId).hasClass("active")) {
      $(keyDrumId).animate({left: '1px', top: '1px'}, 50).animate({left: null, top: null, right: '1px', bottom: '1px'});
      if ($(keyDrumId).hasClass("second-bank")) {
        $(keySecondClip).trigger('play');
        $("#bank-display").html(keySecondDisplay)
      } else {
        $(keyFirstClip).trigger('play');
        $("#bank-display").html(keyFirstDisplay);
        }
      }
  });
});
