function $(id) {
  return document.getElementById(id);
}
window.onload = () => {
  const usuario = $("usuario");
  const nombre = $('nombre');
  const apellido = $('apellido');
  const correo = $('correo');
  const telefono = $('teledono');
  const dataUser = JSON.parse(localStorage.getItem("userInfo"));
  usuario.innerHTML = '<i class="material-icons left">account_circle</i>' + dataUser.usuario;
  nombre.value = dataUser.nombre;
  apellido.value = dataUser.apellido;
  correo.value = dataUser.correo;
  telefono.value = dataUser.telefono
}
function update() {
  const dataUser = JSON.parse(localStorage.getItem("userInfo"));
  const data = {
    nombre: $('nombre').value,
    apellido: $('apellido').value,
    usuario: dataUser.usuario,
    correo: $('correo').value,
    pass: $('pass').value,
    telefono: $('telefono').value
  },
    params = {
      method: "PUT",
      headers: new Headers({ 'Content-Type': 'application/json' }),
      body: JSON.stringify(data)
    }
  fetch("./../edit", params)
    .then(resp => resp.json())
    .then(resp => {
      if (resp.status === 200) {
        localStorage.setItem("userInfo", JSON.stringify(resp.data));
        location.href = "./../views/dashboard.html";
      } else {
        M.toast({ html: resp.message + ", status(" + resp.status + ")", inDuration: 500, outDuration: 500 })
      }
    });
}
$('btn').hidden = true
function check() {
  if ($('pass').value.length > 5) {
    $('btn').hidden = false;
  } else {
    $('btn').hidden = true;
  }
}
function out() {
  const params = {
    method: "GET",
    headers: new Headers({ 'Content-Type': 'application/json' }),
  }
  fetch("./../logout", params)
    .then(resp => resp.json())
    .then(resp => {
      if (resp.status === 200) {
        M.toast({ html: 'Bye!', completeCallback: window.location.href = "./../", inDuration: 500, outDuration: 500 })
      } else {
        M.toast({ html: data.message + ", status(" + data.status + ")", inDuration: 500, outDuration: 500 })
      }
    });
}
document.addEventListener('DOMContentLoaded', function () {
  M.updateTextFields();
});