
















































// Progressiebalk op Homepagina
window.onscroll = function() {updateProgressBar()};

function updateProgressBar() {
  var winScroll = document.body.scrollTop || document.documentElement.scrollTop;
  var height = document.documentElement.scrollHeight - document.documentElement.clientHeight;
  var scrolled = (winScroll / height) * 100;
  document.getElementById("myBar").style.width = scrolled + "%";
}

// Functie voor de 'Initiatieven'
const listVraag = document.getElementById('listVraag'),
      listAanbod = document.getElementById('listAanbod')

function showList(val) {
    if(val==1) {
        listVraag.style.display='flex'
        listAanbod.style.display='none'
    } if(val==2) {
        listVraag.style.display='none'
        listAanbod.style.display='flex'
    }
}

// Functie voor de Like Popup
const likePopup = document.querySelector('.likePopup'),
      answerYes = document.getElementById('answerYes'),
      answerNo = document.getElementById('answerNo')

answerNo.addEventListener('click', closePopup)
function closePopup() {
    likePopup.classList.add('closePopup')
}