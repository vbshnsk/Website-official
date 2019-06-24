var i=0;
$('#slider').mousemove(function(event) {
  var msg = 'mousemove() position - x : ' + event.pageX + ', y : '
                + event.pageY + ' [counter] : ' + i++;
  console.log(msg)
});