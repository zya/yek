function scrollTo(element, to, duration) {
  if (duration <= 0) return;
  var difference = to - element.scrollTop;
  var perTick = difference / duration * 10;

  setTimeout(function() {
    element.scrollTop = element.scrollTop + perTick;
    if (element.scrollTop === to) return;
    scrollTo(element, to, duration - 10);
  }, 10);
}
window.onload = function() {
  var w = window.innerWidth;
  var h = window.innerHeight * 0.9;
  var svg = document.getElementById('svg');
  var pathString = svg.children[0].children[0].getAttribute('d');
  var things = [];
  var map = function(value, istart, istop, ostart, ostop) {
    return ostart + (ostop - ostart) * ((value - istart) / (istop - istart));
  };

  var interactiveElement = document.getElementById('interactive');
  var section1Element = document.getElementById('section1');
  var downElement = document.getElementById('down');
  var paymentElement = document.getElementById('section');
  var paper = Raphael(interactiveElement, w, h);
  paper.canvas.id = 'logo';
  var a = paper.path(pathString);
  a.attr('fill', 'red');
  a.attr('stroke', 'black');
  a.translate(w / 2 - 150, h / 2 - 150);
  a.scale(0.7339360936839422, 0.7339360936839422);
  a.hide();

  things.push(a);

  var hoverOn = function() {
    this.attr('fill', 'red');
  };

  var hoverOff = function() {
    this.attr('fill', 'black');
  };

  for (var i = 1; i < 29; i++) {
    var one = paper.path(pathString);
    one.attr('fill', 'black');
    one.attr('stroke', 'red');
    one.translate(w / 2 - 150, h / 2 - 150);
    var scaledI = map(i, 1, 200, 0.2, 10);
    one.scale(Math.exp(scaledI) * 0.33, Math.exp(scaledI) * 0.33);
    one.insertBefore(things[i - 1]);
    if (i > 2) {
      one.translate(1, 0);
      one.hover(hoverOn, hoverOff);
    }

    things.push(one);
  }

  things[1].hover(function() {
    interactiveElement.style['background-color'] = 'black';
    section1Element.style['background-color'] = 'black';
    interactiveElement.style.cursor = 'crosshair';
    downElement.style['color'] = 'white';
    things[1].attr('fill', 'white');
    things[1].attr('stroke', 'black');
    things.forEach(function(thing, index) {
      if (index <= 1) return;
      thing.attr('fill', 'red');
      thing.attr('stroke', 'black');
    });
  }, function() {
    things.forEach(function(thing, index) {
      interactiveElement.style['background-color'] = 'red';
      interactiveElement.style.cursor = 'auto';
      section1Element.style['background-color'] = 'red';
      downElement.style['color'] = 'black';
      if (index < 1) return;
      thing.attr('fill', 'black');
      thing.attr('stroke', 'red');
    });
  });

  downElement.addEventListener('click', function() {
    $("html, body").animate({
      scrollTop: h * 1.2
    }, 800);
  });
};
