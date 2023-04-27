var extActive = localStorage.getItem("extActive");

if (extActive !== null) {
  extActive = !!JSON.parse(extActive);
} else {
  var extActive = true
  localStorage.setItem("extActive", extActive);
  console.log("NO existe en local storage");
}

if (extActive === true) {
  console.log("Esta acitvo");
  setInterval(function () {
    const decodedToken = JSON.parse(localStorage.getItem('decoded_token'));
    const dealerId = decodedToken.dealer_id;
    let elementos = document.querySelectorAll('div[id^="note-"],div[id^="offer-"]');
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
    //Tasks
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
        let existingIdSpan = document.getElementById(`extension${id}`);
        if (!existingIdSpan) {
          let idSpan = document.createElement('span');
          idSpan.style.cssText = 'display: flex; align-items: center; justify-content: center; background-color: #F2F2F2; border-radius: 5px; padding: 5px 10px; font-size: 14px; font-weight: bold; margin: 0 auto; color: red; font-size: 12px;';
          idSpan.setAttribute('id', `extension${id}`);
          fetch(`https://api.crm.walcu.com/dealers/${dealerId}/tasks/${id}`, {
            credentials: "include",
          })
            .then(response => {
              if (!response.ok) {
                throw new Error('Network response was not ok');
              }
              return response.json();
            })
            .then(data => {
              const filteredData = data.map(({ notification, created_at, updated_at, updated_by }) => ({
                notification,
                created_at,
                updated_at,
                updated_by,
              }));
              const done = data[0].notification.done;
              const doneBy = data[0].notification.done_by;
              const done_at = data[0].notification.done_at;
              const updated_by = data[0].updated_by;
              const updated_at = new Date(data[0].updated_at).toLocaleString('es-ES');
              fetch(`https://api.crm.walcu.com/dealers/${dealerId}/users/${updated_by}`, {
                credentials: "include",
              })
                .then(response => response.json())
                .then(data => {
                  const updated_at_name = data[0].first_name + " " + data[0].last_name;
                  //Done=true
                  if (done == true) {
                    fetch(`https://api.crm.walcu.com/dealers/${dealerId}/users/${doneBy}`, {
                      credentials: "include",
                    })
                      .then(response => response.json())
                      .then(data => {
                        const name = data[0].first_name + " " + data[0].last_name;
                        if (updated_by) {
                          idSpan.innerHTML = `ID: ${id}
                                <br>Actualizado por: ${updated_at_name}
                                <br>Actualizado a las: ${updated_at}
                                <br>Marcado como hecho por: ${name}
                                <br>Marcado como hecho a las: ${done_at}`;
                        } else {
                          idSpan.innerHTML = `ID: ${id}
                                <br>Marcado como hecho por: ${name}
                                <br>Marcado como hecho a las: ${done_at}`;
                        }
                        idSpan.classList.add('hover-appear');
                        emptyDiv3.appendChild(idSpan);

                      })
                  } else {        //Done=false
                    if (updated_by) {
                      idSpan.innerHTML = `ID: ${id}
                            <br>Actualizado por: ${updated_at_name}
                            <br>Actualizado a las: ${updated_at}`;
                    } else {
                      idSpan.innerHTML = `ID: ${id}`;
                    }
                    idSpan.classList.add('hover-appear');
                    emptyDiv3.appendChild(idSpan);

                  }
                })
            })
            .catch(error => {
              console.error('There was an error:', error);
            });
        }
      }
    });
    //Dates
    let elementosdate = document.querySelectorAll('div[id^="date-"]');
    elementosdate.forEach((elemento) => {
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
        let existingIdSpan = document.getElementById(`extension${id}`);
        if (!existingIdSpan) {
          let idSpan = document.createElement('span');
          idSpan.style.cssText = 'display: flex; align-items: center; justify-content: center; background-color: #F2F2F2; border-radius: 5px; padding: 5px 10px; font-size: 14px; font-weight: bold; margin: 0 auto; color: red; font-size: 12px;';
          idSpan.setAttribute('id', `extension${id}`);
          fetch(`https://api.crm.walcu.com/dealers/${dealerId}/dates/${id}`, {
            credentials: "include",
          })
            .then(response => {
              if (!response.ok) {
                throw new Error('Network response was not ok');
              }
              return response.json();
            })
            .then(data => {
              const filteredData = data.map(({ notification, created_at, updated_at, updated_by }) => ({
                notification,
                created_at,
                updated_at,
                updated_by,
              }));
              const done = data[0].notification.done;
              const doneBy = data[0].notification.done_by;
              const done_at = data[0].notification.done_at;
              const updated_by = data[0].updated_by;
              const updated_at = new Date(data[0].updated_at).toLocaleString('es-ES');
              fetch(`https://api.crm.walcu.com/dealers/${dealerId}/users/${updated_by}`, {
                credentials: "include",
              })
                .then(response => response.json())
                .then(data => {
                  const updated_at_name = data[0].first_name + " " + data[0].last_name;
                  //Done=true
                  if (done == true) {
                    fetch(`https://api.crm.walcu.com/dealers/${dealerId}/users/${doneBy}`, {
                      credentials: "include",
                    })
                      .then(response => response.json())
                      .then(data => {
                        const name = data[0].first_name + " " + data[0].last_name;
                        if (updated_by) {
                          idSpan.innerHTML = `ID: ${id}
                                <br>Actualizado por: ${updated_at_name}
                                <br>Actualizado a las: ${updated_at}
                                <br>Marcado como hecho por: ${name}
                                <br>Marcado como hecho a las: ${done_at}`;
                        } else {
                          idSpan.innerHTML = `ID: ${id}
                                <br>Marcado como hecho por: ${name}
                                <br>Marcado como hecho a las: ${done_at}`;
                        }
                        idSpan.classList.add('hover-appear');
                        emptyDiv3.appendChild(idSpan);
                      })
                  } else {        //Done=false
                    if (updated_by) {
                      idSpan.innerHTML = `ID: ${id}
                            <br>Actualizado por: ${updated_at_name}
                            <br>Actualizado a las: ${updated_at}`;
                    } else {
                      idSpan.innerHTML = `ID: ${id}`;
                    }
                    idSpan.classList.add('hover-appear');
                    emptyDiv3.appendChild(idSpan);

                  }
                })
            })
            .catch(error => {
              console.error('There was an error:', error);
            });
        }
      }
    });
    //Emails
    let elementosemail = document.querySelectorAll('div[id^="email-"]');
    elementosemail.forEach((elemento) => {
      let id = elemento.id.match(/^.+?-(.+)$/)[1];
      if (elemento.innerHTML.includes(id)) {
        return;
      }
      let hoverContainer = elemento.querySelector('.hover-container');
      let emptyDiv = hoverContainer.querySelector('div');
      if (emptyDiv) {
        let existingIdSpan = document.getElementById(`extension${id}`);
        if (!existingIdSpan) {
          let idSpan = document.createElement('span');
          idSpan.style.cssText = 'display: flex; align-items: center; justify-content: center; background-color: #F2F2F2; border-radius: 5px; padding: 5px 10px; font-size: 14px; font-weight: bold; margin: 0 auto; color: red; font-size: 12px;';
          idSpan.setAttribute('id', `extension${id}`);
          fetch(`https://api.crm.walcu.com/dealers/${dealerId}/emails/${id}`, {
            credentials: "include",
          })
            .then(response => {
              if (!response.ok) {
                throw new Error('Network response was not ok');
              }
              return response.json();
            })
            .then(data => {
              if (data[0].notification) {
                const filteredData = data.map(({ notification, created_at, updated_at, updated_by }) => ({
                  notification,
                  created_at,
                  updated_at,
                  updated_by,
                }));
                const done = data[0].notification.done;
                const doneBy = data[0].notification.done_by;
                const done_at = data[0].notification.done_at;
                const updated_by = data[0].updated_by;
                const updated_at = new Date(data[0].updated_at).toLocaleString('es-ES');
                fetch(`https://api.crm.walcu.com/dealers/${dealerId}/users/${updated_by}`, {
                  credentials: "include",
                })
                  .then(response => response.json())
                  .then(data => {
                    //Done=true
                    if (done) {
                      fetch(`https://api.crm.walcu.com/dealers/${dealerId}/users/${doneBy}`, {
                        credentials: "include",
                      })
                        .then(response => response.json())
                        .then(data => {
                          const name = data[0].first_name + " " + data[0].last_name;
                          if (updated_by) {
                            const updated_at_name = data[0].first_name + " " + data[0].last_name;
                            idSpan.innerHTML = `ID: ${id}
                              <br>Actualizado por: ${updated_at_name}
                              <br>Actualizado a las: ${updated_at}
                              <br>Marcado como hecho por: ${name}
                              <br>Marcado como hecho a las: ${done_at}`;
                          } else {
                            idSpan.innerHTML = `ID: ${id}
                              <br>Marcado como hecho por: ${name}
                              <br>Marcado como hecho a las: ${done_at}`;
                          }
                          idSpan.classList.add('hover-appear');
                          emptyDiv.appendChild(idSpan);
                        })
                    } else {        //Done=false
                      if (updated_by) {
                        const updated_at_name = data[0].first_name + " " + data[0].last_name;
                        idSpan.innerHTML = `ID: ${id}
                          <br>Actualizado por: ${updated_at_name}
                          <br>Actualizado a las: ${updated_at}`;
                      } else {
                        idSpan.innerHTML = `ID: ${id}`;
                      }
                      idSpan.classList.add('hover-appear');
                      emptyDiv.appendChild(idSpan);
                    }
                  })
              } else {
                idSpan.innerHTML = `ID: ${id}`;
                idSpan.classList.add('hover-appear');
                emptyDiv.appendChild(idSpan);
              }
            })
            .catch(error => {
              console.error('There was an error:', error);
            });
        }
      }
    });
    //SMS
    let elementossms = document.querySelectorAll('div[id^="sms-"]');
    elementossms.forEach((elemento) => {
      let id = elemento.id.match(/^.+?-(.+)$/)[1];
      if (elemento.innerHTML.includes(id)) {
        return;
      }
      let hoverContainer = elemento.querySelector('.hover-container');
      let emptyDiv = hoverContainer.querySelector('div');
      if (emptyDiv) {
        let existingIdSpan = document.getElementById(`extension${id}`);
        if (!existingIdSpan) {
          let idSpan = document.createElement('span');
          idSpan.style.cssText = 'display: flex; align-items: center; justify-content: center; background-color: #F2F2F2; border-radius: 5px; padding: 5px 10px; font-size: 14px; font-weight: bold; margin: 0 auto; color: red; font-size: 12px;';
          idSpan.setAttribute('id', `extension${id}`);
          fetch(`https://api.crm.walcu.com/dealers/${dealerId}/sms/${id}`, {
            credentials: "include",
          })
            .then(response => {
              if (!response.ok) {
                throw new Error('Network response was not ok');
              }
              return response.json();
            })
            .then(data => {
              const filteredData = data.map(({ notification, created_at, updated_at, updated_by, twilio_sms_sid, template_id }) => ({
                notification,
                created_at,
                updated_at,
                updated_by,
                twilio_sms_sid,
                template_id,
              }));
              const done = data[0].notification?.done;
              const doneBy = data[0].notification?.done_by;
              const done_at = data[0].notification?.done_at;
              const updated_by = data[0].updated_by;
              const updated_at = new Date(data[0].updated_at).toLocaleString('es-ES');
              const twilio_sms_sid = data[0].twilio_sms_sid;
              const template_id = data[0].template_id;
              fetch(`https://api.crm.walcu.com/dealers/${dealerId}/users/${updated_by}`, {
                credentials: "include",
              })
                .then(response => response.json())
                .then(data => {
                  //Done=true
                  if (done === true) {
                    fetch(`https://api.crm.walcu.com/dealers/${dealerId}/users/${doneBy}`, {
                      credentials: "include",
                    })
                      .then(response => response.json())
                      .then(data => {
                        const name = data[0].first_name + " " + data[0].last_name;
                        if (updated_by) {
                          const updated_at_name = data[0].first_name + " " + data[0].last_name;
                          if (template_id) {
                            fetch(`https://api.crm.walcu.com/dealers/${dealerId}/templates/${template_id}`, {
                              credentials: "include",
                            })
                              .then(response => response.json())
                              .then(data => {
                                const nameTemplate = data[0].name
                                idSpan.innerHTML = `ID: ${id}
                            <br>Actualizado por: ${updated_at_name}
                            <br>Actualizado a las: ${updated_at}
                            <br>Marcado como hecho por: ${name}
                            <br>Marcado como hecho a las: ${done_at}
                            <br>Twilio sms sid: ${twilio_sms_sid}
                            <br>Nombre de la plantilla: ${nameTemplate}`;
                              })
                          } else {
                            idSpan.innerHTML = `ID: ${id}
                          <br>Actualizado por: ${updated_at_name}
                          <br>Actualizado a las: ${updated_at}
                          <br>Marcado como hecho por: ${name}
                          <br>Marcado como hecho a las: ${done_at}
                          <br>Twilio sms sid: ${twilio_sms_sid}`;
                          }
                        } else {
                          if (template_id) {
                            fetch(`https://api.crm.walcu.com/dealers/${dealerId}/templates/${template_id}`, {
                              credentials: "include",
                            })
                              .then(response => response.json())
                              .then(data => {
                                const nameTemplate = data[0].name
                                idSpan.innerHTML = idSpan.innerHTML = `ID: ${id}
                            <br>Marcado como hecho por: ${name}
                            <br>Marcado como hecho a las: ${done_at}
                            <br>Twilio sms sid: ${twilio_sms_sid}
                            <br>Nombre de la plantilla: ${nameTemplate}`;
                              })
                          } else {
                            idSpan.innerHTML = `ID: ${id}
                            <br>Marcado como hecho por: ${name}
                            <br>Marcado como hecho a las: ${done_at}
                            <br>Twilio sms sid: ${twilio_sms_sid}`;
                          }
                        }
                        idSpan.classList.add('hover-appear');
                        emptyDiv.appendChild(idSpan);

                      })
                  } else {        //Done=false
                    if (updated_by) {
                      const updated_at_name = data[0].first_name + " " + data[0].last_name;
                      if (template_id) {
                        fetch(`https://api.crm.walcu.com/dealers/${dealerId}/templates/${template_id}`, {
                          credentials: "include",
                        })
                          .then(response => response.json())
                          .then(data => {
                            const nameTemplate = data[0].name
                            idSpan.innerHTML = `ID: ${id}
                            <br>Actualizado por: ${updated_at_name}
                            <br>Actualizado a las: ${updated_at}
                            <br>Twilio sms sid: ${twilio_sms_sid}
                        <br>Nombre de la plantilla: ${nameTemplate}`;
                          })
                      } else {
                        idSpan.innerHTML = `ID: ${id}
                            <br>Actualizado por: ${updated_at_name}
                            <br>Actualizado a las: ${updated_at}
                            <br>Twilio sms sid: ${twilio_sms_sid}`;
                      }
                    } else {
                      if (template_id) {
                        fetch(`https://api.crm.walcu.com/dealers/${dealerId}/templates/${template_id}`, {
                          credentials: "include",
                        })
                          .then(response => response.json())
                          .then(data => {
                            const nameTemplate = data[0].name
                            idSpan.innerHTML = `ID: ${id}
                            <br>Twilio sms sid: ${twilio_sms_sid}
                        <br>Nombre de la plantilla: ${nameTemplate}`;
                          })
                      } else {
                        idSpan.innerHTML = `ID: ${id}
                      <br>Twilio sms sid: ${twilio_sms_sid}`;
                      }
                    }
                    idSpan.classList.add('hover-appear');
                    emptyDiv.appendChild(idSpan);

                  }
                })
            })
            .catch(error => {
              console.error('There was an error:', error);
            });
        }
      }
    });
    //Whatsapps
    let elementoswhatsapp = document.querySelectorAll('div[id^="whatsappsession-"]');
    elementoswhatsapp.forEach((elemento) => {
      let id = elemento.id.match(/^.+?-(.+)$/)[1];
      if (elemento.innerHTML.includes(id)) {
        return;
      }
      let hoverContainer = elemento.querySelector('.hover-container');
      let emptyDiv = hoverContainer.querySelector('div');
      if (emptyDiv) {
        let existingIdSpan = document.getElementById(`extension${id}`);
        if (!existingIdSpan) {
          let idSpan = document.createElement('span');
          idSpan.style.cssText = 'display: flex; align-items: center; justify-content: center; background-color: #F2F2F2; border-radius: 5px; padding: 5px 10px; font-size: 14px; font-weight: bold; margin: 0 auto; color: red; font-size: 12px;';
          idSpan.setAttribute('id', `extension${id}`);
          fetch(`https://api.crm.walcu.com/dealers/${dealerId}/whatsappsessions/${id}`, {
            credentials: "include",
          })
            .then(response => {
              if (!response.ok) {
                throw new Error('Network response was not ok');
              }
              return response.json();
            })
            .then(data => {
              if (data[0].notification) {
                const filteredData = data.map(({ notification, created_at, updated_at, updated_by }) => ({
                  notification,
                  created_at,
                  updated_at,
                  updated_by,
                }));
                const done = data[0].notification.done;
                const doneBy = data[0].notification.done_by;
                const done_at = data[0].notification.done_at;
                const updated_by = data[0].updated_by;
                const updated_at = new Date(data[0].updated_at).toLocaleString('es-ES');
                fetch(`https://api.crm.walcu.com/dealers/${dealerId}/users/${updated_by}`, {
                  credentials: "include",
                })
                  .then(response => response.json())
                  .then(data => {
                    //Done=true
                    if (done == true) {
                      fetch(`https://api.crm.walcu.com/dealers/${dealerId}/users/${doneBy}`, {
                        credentials: "include",
                      })
                        .then(response => response.json())
                        .then(data => {
                          const name = data[0].first_name + " " + data[0].last_name;
                          if (updated_by) {
                            const updated_at_name = data[0].first_name + " " + data[0].last_name;
                            idSpan.innerHTML = `ID: ${id}
                            <br>Actualizado por: ${updated_at_name}
                            <br>Actualizado a las: ${updated_at}
                            <br>Marcado como hecho por: ${name}
                            <br>Marcado como hecho a las: ${done_at}`;
                          } else {
                            idSpan.innerHTML = `ID: ${id}
                              <br>Marcado como hecho por: ${name}
                              <br>Marcado como hecho a las: ${done_at}`;
                          }
                          idSpan.classList.add('hover-appear');
                          emptyDiv.appendChild(idSpan);

                        })
                    } else {        //Done=false
                      if (updated_by) {
                        const updated_at_name = data[0].first_name + " " + data[0].last_name;
                        idSpan.innerHTML = `ID: ${id}
                              <br>Actualizado por: ${updated_at_name}
                              <br>Actualizado a las: ${updated_at}`;
                      } else {
                        idSpan.innerHTML = `ID: ${id}`;
                      }
                      idSpan.classList.add('hover-appear');
                      emptyDiv.appendChild(idSpan);
                    }
                  })
              } else {
                idSpan.innerHTML = `ID: ${id}`;
                idSpan.classList.add('hover-appear');
                emptyDiv.appendChild(idSpan);
              }
            })
            .catch(error => {
              console.error('There was an error:', error);
            });
        }
      }
    });
    //Calls
    let elementosconference = document.querySelectorAll('div[id^="conference-"]');
    elementosconference.forEach((elemento) => {
      let id = elemento.id.match(/^.+?-(.+)$/)[1];
      if (elemento.innerHTML.includes(id)) {
        return;
      }
      let hoverContainer = elemento.querySelector('.hover-container');
      let emptyDiv = hoverContainer.querySelector('div');
      if (emptyDiv) {
        let existingIdSpan = document.getElementById(`extension${id}`);
        if (!existingIdSpan) {
          let idSpan = document.createElement('span');
          idSpan.style.cssText = 'display: flex; align-items: center; justify-content: center; background-color: #F2F2F2; border-radius: 5px; padding: 5px 10px; font-size: 14px; font-weight: bold; margin: 0 auto; color: red; font-size: 12px;';
          idSpan.setAttribute('id', `extension${id}`);
          fetch(`https://api.crm.walcu.com/dealers/${dealerId}/conferences/${id}`, {
            credentials: "include",
          })
            .then(response => {
              if (!response.ok) {
                throw new Error('Network response was not ok');
              }
              return response.json();
            })
            .then(data => {
              if (data[0].notification) {
                const filteredData = data.map(({ notification, created_at, updated_at, updated_by, participants }) => ({
                  notification,
                  created_at,
                  updated_at,
                  updated_by,
                  participants,
                }));
                const done = data[0].notification.done;
                const doneBy = data[0].notification.done_by;
                const done_at = data[0].notification.done_at;
                const updated_by = data[0].updated_by;
                const updated_at = new Date(data[0].updated_at).toLocaleString('es-ES');
                const call_sid = data[0].participants[0].call_sid;
                fetch(`https://api.crm.walcu.com/dealers/${dealerId}/users/${updated_by}`, {
                  credentials: "include",
                })
                  .then(response => response.json())
                  .then(data => {
                    //Done=true
                    if (done == true) {
                      fetch(`https://api.crm.walcu.com/dealers/${dealerId}/users/${doneBy}`, {
                        credentials: "include",
                      })
                        .then(response => response.json())
                        .then(data => {
                          const name = data[0].first_name + " " + data[0].last_name;
                          if (updated_by) {
                            const updated_at_name = data[0].first_name + " " + data[0].last_name;
                            idSpan.innerHTML = `ID: ${id}
                          <br>Actualizado por: ${updated_at_name}
                          <br>Actualizado a las: ${updated_at}
                          <br>Marcado como hecho por: ${name}
                          <br>Marcado como hecho a las: ${done_at}
                          <br>Call SID: ${call_sid}`;
                          } else {
                            idSpan.innerHTML = `ID: ${id}
                            <br>Marcado como hecho por: ${name}
                            <br>Marcado como hecho a las: ${done_at}
                            <br>Call SID: ${call_sid}`;
                          }
                          idSpan.classList.add('hover-appear');
                          emptyDiv.appendChild(idSpan);

                        })
                    } else {        //Done=false
                      if (updated_by) {
                        const updated_at_name = data[0].first_name + " " + data[0].last_name;
                        idSpan.innerHTML = `ID: ${id}
                            <br>Actualizado por: ${updated_at_name}
                            <br>Actualizado a las: ${updated_at}
                            <br>Call SID: ${call_sid}`;
                      } else {
                        idSpan.innerHTML = `ID: ${id}
                      <br>Call SID: ${call_sid}`;
                      }
                      idSpan.classList.add('hover-appear');
                      emptyDiv.appendChild(idSpan);

                    }
                  })
              } else {
                idSpan.innerHTML = `ID: ${id}`;
                idSpan.classList.add('hover-appear');
                emptyDiv.appendChild(idSpan);
              }
            })
            .catch(error => {
              console.error('There was an error:', error);
            });
        }
      }
    });
  }, 3000);
} else {
  console.log("extOff");
}

//Activar desactivar extensión
document.body.addEventListener('keydown', function (e) {
  if (e.key == ")" && e.ctrlKey) {
    extActive = !extActive
    localStorage.setItem("extActive", extActive);
    console.log(extActive);
  }
})
