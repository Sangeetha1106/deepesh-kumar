/* Enquiry form -> opens WhatsApp chat with the filled details.
   Runs only after the browser's own validation passes (required fields, email/phone format). */
(function () {
  var form = document.getElementById('enquiry-form');
  if (!form) return;
  var number = form.getAttribute('data-wa') || '919380214777';
  form.addEventListener('submit', function (e) {
    e.preventDefault();
    var v = function (id) { var el = document.getElementById(id); return el ? el.value.trim() : ''; };
    var lines = ['Hello Deepesh, I would like to make an enquiry.', ''];
    lines.push('Name: ' + v('n'));
    if (v('o')) lines.push('Organisation: ' + v('o'));
    lines.push('Email: ' + v('e'));
    if (v('p')) lines.push('Phone: ' + v('p'));
    lines.push('Interested in: ' + v('t'));
    lines.push('');
    lines.push('Message: ' + v('m'));
    var url = 'https://wa.me/' + number + '?text=' + encodeURIComponent(lines.join('\n'));
    window.open(url, '_blank', 'noopener');
    form.reset();
  });
})();
