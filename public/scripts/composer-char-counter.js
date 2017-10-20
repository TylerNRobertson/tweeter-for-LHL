$( document ).ready(function() {
    console.log( "loaded counter!" );
});
$("main form textarea").keyup(function () {
let max = 140;
let len = $(this).val().length;
let counter = $(this).parent().find("span.counter")
let charLeft = max - len;
if (charLeft <= 0) {
  $(counter).css("color", "red");
} else {
  $(counter).css("color", "black");
}
counter.text(charLeft + ' characters left');
});
