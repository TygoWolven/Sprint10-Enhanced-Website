// Function for 'Initiatieven'
const listVraag = document.getElementById('listVraag'),
      listAanbod = document.getElementById('listAanbod'),
      listError = document.getElementById('listError');

function showList(val) {
    if(val==1) {
        listVraag.style.display='flex'
        listAanbod.style.display='none'
        listError.style.display='none'
    } if(val==2) {
        listVraag.style.display='none'
        listAanbod.style.display='flex'
        listError.style.display='none'
    }
}