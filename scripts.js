let reuniones = [
    {
      id: 1,
      fecha: '2024-06-30',
      hora: '10:00 AM',
      tema: 'Actualización del Proyecto',
      area: 'Desarrollo',
      detalles: 'Detalles sobre la reunión de actualización del proyecto.',
      plataforma: 'teams',
      link: 'https://teams.microsoft.com/l/meetup-join/19%3ameeting_YzM2M2YyNzItMTIwNy00NjUwLTkxNjgtYTI4ZjA0ODQ4ODBi%40thread.v2/0?context=%7b%22Tid%22%3a%227fc66f3b-4910-4af6-b537-0a6b5e50f5bb%22%2c%22Oid%22%3a%225a5c6a00-36c2-4ecb-8dd5-e5c8e7e3f0a6%22%7d'
    },
    // Más reuniones de ejemplo
  ];
  
  function showTab(tabId) {
    const tabs = document.getElementsByClassName('tab-content');
    for (let i = 0; i < tabs.length; i++) {
      tabs[i].style.display = 'none';
    }
    document.getElementById(tabId).style.display = 'block';
  }
  
  function guardarReunion() {
    const fecha = document.getElementById('fecha').value;
    const hora = document.getElementById('hora').value;
    const tema = document.getElementById('tema').value;
    const area = document.getElementById('area').value;
    const detalles = document.getElementById('detalles').value;
    const plataforma = document.getElementById('plataforma').value;
    const link = document.getElementById('link').value;
  
    const nuevaReunion = {
      id: reuniones.length + 1,
      fecha,
      hora,
      tema,
     
  
id: reuniones.length + 1,
fecha,
hora,
tema,
area,
detalles,
plataforma,
link
};

reuniones.push(nuevaReunion);
alert('Reunión guardada exitosamente');
document.getElementById('nuevaReunionForm').reset();
mostrarReuniones();
inicializarCalendario();
showTab('historial');
}

function mostrarReuniones() {
const tbody = document.getElementById('historialTable').getElementsByTagName('tbody')[0];
tbody.innerHTML = '';
reuniones.forEach(reunion => {
const row = tbody.insertRow();
row.onclick = () => mostrarDetallesReunion(reunion.id);
Object.values(reunion).forEach((value, index) => {
  if (index < 6) { // Excluir la plataforma y el link de la tabla
    const cell = row.insertCell();
    cell.textContent = value;
  }
});
const cell = row.insertCell();
cell.textContent = 'Detalles...';
});
}

function mostrarDetallesReunion(id) {
const reunion = reuniones.find(r => r.id === id);
let plataformaLogo = '';
if (reunion.plataforma === 'teams') {
plataformaLogo = '<img src="https://upload.wikimedia.org/wikipedia/commons/4/4f/Microsoft_Office_Teams_%282018%E2%80%93present%29.svg" alt="Teams" width="50">';
} else if (reunion.plataforma === 'meet') {
plataformaLogo = '<img src="https://upload.wikimedia.org/wikipedia/commons/thumb/5/5e/Google_Meet_icon_%282020%29.svg/512px-Google_Meet_icon_%282020%29.svg.png" alt="Meet" width="50">';
} else if (reunion.plataforma === 'zoom') {
plataformaLogo = '<img src="https://upload.wikimedia.org/wikipedia/commons/thumb/7/7b/Zoom_Communications_Logo.svg/1024px-Zoom_Communications_Logo.svg.png" alt="Zoom" width="50">';
}
document.getElementById('detallesReunion').innerHTML = `
<p><strong>Fecha:</strong> ${reunion.fecha}</p>
<p><strong>Hora:</strong> ${reunion.hora}</p>
<p><strong>Tema:</strong> ${reunion.tema}</p>
<p><strong>Área:</strong> ${reunion.area}</p>
<p><strong>Detalles:</strong> ${reunion.detalles}</p>
<p><strong>Plataforma:</strong> ${plataformaLogo}</p>
<p><strong>Link:</strong> <a href="${reunion.link}" target="_blank">${reunion.link}</a></p>
`;
document.getElementById('detallesReunionModal').style.display = 'block';
}

function cerrarModal() {
document.getElementById('detallesReunionModal').style.display = 'none';
}

function inicializarCalendario() {
const calendarEl = document.getElementById('calendar');
const calendar = new FullCalendar.Calendar(calendarEl, {
initialView: 'dayGridMonth',
events: reuniones.map(reunion => ({
  title: reunion.tema,
  start: reunion.fecha,
  extendedProps: {
    id: reunion.id,
    detalles: reunion.detalles,
    plataforma: reunion.plataforma,
    link: reunion.link
  }
})),
eventClick: function(info) {
  const evento = info.event.extendedProps;
  mostrarDetallesReunion(evento.id);
}
});
calendar.render();
}

document.addEventListener('DOMContentLoaded', () => {
mostrarReuniones();
inicializarCalendario();
showTab('historial');
});
