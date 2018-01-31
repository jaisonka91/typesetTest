document.addEventListener("DOMContentLoaded", function() {
  document.getElementById("text").innerHTML = "";
});

function RichText(element, smileys) {
  smileys = smileys || {}

  element.addEventListener('keydown', function (e) {
      if(e.keyCode != 'Enter') {
          for(key in smileys) {
          var smileyTxt = key;
          var sel = window.getSelection();
          var range = sel.getRangeAt(0);
          if(range.startOffset - smileyTxt.length >= 0) {
              var clone = range.cloneRange();
              clone.setStart(range.startContainer, range.startOffset - smileyTxt.length);
              clone.setEnd(range.startContainer, range.startOffset);
              var contents = clone.toString();
              if(contents == smileyTxt) {
                  clone.deleteContents();
                  var txtNode = document.createElement('img');
                  txtNode.src = smileys[key];
                  range.insertNode(txtNode);
                  range.setStartAfter(txtNode);
                  sel.removeAllRanges();
                  sel.addRange(range);
              }
          }
        }
      }
      if(e.key == 'Enter'){
        e.preventDefault();
        document.getElementById("data").innerHTML = document.getElementById("text").innerHTML;
        document.getElementById("text").innerHTML = "";
        document.getElementById("text").focus();
        return;
      }
  });
}
