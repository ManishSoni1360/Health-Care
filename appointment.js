const tableUsers = document.querySelector('.table-users');
let id;
const renderUser = doc => {
    const tr = `
      <tr data-id='${doc.id}'>
        <td>${doc.data().firstName}</td>
        <td>${doc.data().lastName}</td>
        <td>${doc.data().specialisation}</td>
        <td>${doc.data().email}</td>
        <td>
          <button class="btn btn-appointment" id="bookAppointment">Book Appointment</button>
        </td>
      </tr>
    `;

    tableUsers.insertAdjacentHTML('beforeend', tr);
}

db.collection('users').onSnapshot(snapshot => {
    snapshot.docChanges().forEach(change => {
      if(change.type === 'added') {
        renderUser(change.doc);
      }
      if(change.type === 'removed') {
        let tr = document.querySelector(`[data-id='${change.doc.id}']`);
        let tbody = tr.parentElement;
        tableUsers.removeChild(tbody);
      }
      if(change.type === 'modified') {
        let tr = document.querySelector(`[data-id='${change.doc.id}']`);
        let tbody = tr.parentElement;
        tableUsers.removeChild(tbody);
        renderUser(change.doc);
      }
    })
  })