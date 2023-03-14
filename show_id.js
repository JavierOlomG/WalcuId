

setInterval(function() {
  let elementos = document.querySelectorAll('div[id^="email-"], div[id^="note-"],div[id^="date-"],div[id^="offer-"],div[id^="conference-"],div[id^="sms-"],div[id^="whatsappsession-"]');
  elementos.forEach((elemento) => {
    let id = elemento.id.match(/^.+?-(.+)$/)[1];
    if (elemento.innerHTML.includes(id)) {
      return;
    }
    let hoverContainer = elemento.querySelector('.hover-container');
    let emptyDiv = hoverContainer.querySelector('div');
    if (emptyDiv) {
      let idDiv = document.createElement('div');
      idDiv.style.cssText = 'display: flex; align-items: center; justify-content: center; background-color: #F2F2F2; border-radius: 5px; padding: 5px 10px; font-size: 14px; font-weight: bold; margin: 0 auto; color: red; font-size: 12px;';
      idDiv.innerHTML = `ID: ${id}`;
      idDiv.classList.add('hover-appear');
      emptyDiv.appendChild(idDiv);
    }
  });


//Separo las tareas del resto para probar si queda mejor esteticamente

  let elementostask = document.querySelectorAll('div[id^="task-"]');
  elementostask.forEach((elemento) => {
    let id = elemento.id.match(/^.+?-(.+)$/)[1];
    if (elemento.innerHTML.includes(id)) {
      return;
    }
    let hoverContainer = elemento.querySelector('.hover-container');
    let emptyDiv = hoverContainer.querySelector('div');
    let hoverContainer2 = emptyDiv.querySelector('.hover-container');
    let emptyDiv2 = hoverContainer2.querySelector('div');
    let emptyDiv3 = emptyDiv2.querySelector('div');
    if (emptyDiv3) {
      let idSpan = document.createElement('span');
      idSpan.style.cssText = 'display: flex; align-items: center; justify-content: center; background-color: #F2F2F2; border-radius: 5px; padding: 5px 10px; font-size: 14px; font-weight: bold; margin: 0 auto; color: red; font-size: 12px;';
      idSpan.innerHTML = `ID: ${id}`;
      idSpan.classList.add('hover-appear');
      emptyDiv3.appendChild(idSpan);
    }
  });





}, 3000);
