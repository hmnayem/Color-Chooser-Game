function Color(red, green, blue){
    this.red = red;
    this.green = green;
    this.blue = blue;
    this.toString = function(){
        return "[" + this.red + "," + this.green + "," + this.blue + "]";
    }
}

function generateColor (){
    var red = Math.floor(Math.random() * 255 + 1);
    var green = Math.floor(Math.random() * 255 + 1);
    var blue = Math.floor(Math.random() * 255 + 1);

    return new Color(red, green, blue);
}

$(function(){
    
    var $boxes = $('.box');
    var colors = [];
    var correctColorIndex;
    var clickCount = 0;
    var gameScore = 0;
    var isStarted = false;

    $('#start').on('click', function(){
        fillBoxes();
        $(this).attr('disabled', true);
        correctColorIndex = Math.floor(Math.random() * colors.length);
        $("#red").text(colors[correctColorIndex].red);
        $("#green").text(colors[correctColorIndex].green);
        $("#blue").text(colors[correctColorIndex].blue);
        isStarted = true;
    });
    
    $('#next').on('click', function(){
        colors.length = 0;
        correctColorIndex = 0;
        clickCount = 0;
        fillBoxes();
        correctColorIndex = Math.floor(Math.random() * colors.length);
        $("#red").text(colors[correctColorIndex].red);
        $("#green").text(colors[correctColorIndex].green);
        $("#blue").text(colors[correctColorIndex].blue);
    });

    function fillBoxes(){
        $boxes.each(function() {
          var color = generateColor();
          colors.push(color);
          $(this).css("background", colorString(color));
        });
    }

    $boxes.each(function(){
        $(this).on("click", function() {
          if ($($boxes).index($(this)) === correctColorIndex) {
            $("#game-status")
              .text("Correct")
              .css({ background: "green", color: "white" });
            $boxes.each(function() {
              $(this)
                .show()
                .css("background", colorString(colors[correctColorIndex]));
            });
            gameScore += score();
            $("#score").text(gameScore);
          } else {
            $(this).hide();
            $("#game-status")
              .text("Try Again")
              .css({ background: "white", color: "black" });
          }

          clickCount++;
        });
    });

    function score(){
        switch(clickCount) {
            case 0: return 10;
            case 1: return 8;
            case 2: return 6;
            case 3: return 5;
            default: return 0;
        }
    }
});

function colorString(color){
    var colorStr = 'rgb(';
    colorStr += color.red;
    colorStr += ',';
    colorStr += color.green;
    colorStr += ',';
    colorStr += color.blue;
    colorStr += ')';

    return colorStr;
}