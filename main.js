import './scss/main.scss';
import Handlebars from 'handlebars';

const start = async () => {
  try {
    const respuesta = await fetch('templates/cards.hbs');
    if (!respuesta.ok) {
      throw new Error('No se pudo obtener la plantilla.');
    }

    const plantilla = await respuesta.text();
    const template = Handlebars.compile(plantilla);
    const respuestaBack = await fetch(
      'https://6695af990312447373bfcb75.mockapi.io/productos',
    );
    if (!respuestaBack) {
      throw new Error('Ha ocurrido un error en la respuestaBack');
    }

    const dataProductos = await respuestaBack.json();

    const data = { productos: dataProductos };

    const html = template(data);
    const contenedorCards = document.querySelector('#containerCards');
    contenedorCards.innerHTML = html;
  } catch (error) {
    console.error(error);
  }
};

document.addEventListener('DOMContentLoaded', () => {
  start();
  const form = document.getElementById('form');
  const nombreInput = document.getElementById('nombre');
  const passwordInput = document.getElementById('apellido');
  const correoInput = document.getElementById('email');
  const numPedidoInput = document.getElementById('numPedido');
  const tipoConsultaInput = document.getElementById('tipoConsulta');

  const nombreError = document.querySelector('[data-error="nombre-error"]');
  const passwordError = document.querySelector('[data-error="apellido-error"]');
  const correoError = document.querySelector('[data-error="email-error"]');
  const numPedidoError = document.querySelector(
    '[data-error="numPedido-error"]',
  );
  const tipoConsultaError = document.querySelector(
    '[data-error="tipoConsulta-error"]',
  );

  function validarNombre() {
    if (nombreInput.value.trim() === '') {
      nombreError.innerText = 'El nombre es obligatorio';
      return nombreError.innerText;
    } else {
      nombreError.innerText = '';
      return nombreError.innerText;
    }
  }
  const chequeoMailRegexExp =
    /^(([^<>()\[\]\\.,;:\s@”]+(\.[^<>()\[\]\\.,;:\s@”]+)*)|(“.+”))@((\[[0–9]{1,3}\.[0–9]{1,3}\.[0–9]{1,3}\.[0–9]{1,3}])|(([a-zA-Z\-0–9]+\.)+[a-zA-Z]{2,}))$/;
  function validarCorreo() {
    if (correoInput.value.trim() === '') {
      correoError.innerText = 'El correo es obligatorio';
      return correoError.innerText;
    } else if (!chequeoMailRegexExp.test(correoInput.value.trim())) {
      correoError.innerText = 'El correo es obligatorio';
      return correoError.innerText;
    } else {
      correoError.innerText = '';
      return correoError.innerText;
    }
  }

  function validarPassword() {
    if (passwordInput.value.trim() === '') {
      passwordError.innerText = 'El contraseña es obligatorio';
      return passwordError.innerText;
    } else {
      passwordError.innerText = '';
      return passwordError.innerText;
    }
  }
  function validarNumPedido() {
    if (numPedidoInput.value.trim() === '') {
      numPedidoError.innerText = 'El num. de pedido es obligatorio';
      return numPedidoError.innerText;
    } else {
      numPedidoError.innerText = '';
      return numPedidoError.innerText;
    }
  }
  function validarTipoConsulta() {
    if (tipoConsultaInput.value.trim() === '') {
      tipoConsultaError.innerText = 'El área de consulta es obligatorio';
      return tipoConsultaError.innerText;
    } else {
      tipoConsultaError.innerText = '';
      return tipoConsultaError.innerText;
    }
  }

  form.addEventListener('submit', function (objEvento) {
    objEvento.preventDefault();
    console.log('El usuario apretó el botón de enviar');

    const resultado =
      validarNombre() === '' &&
      validarCorreo() === '' &&
      validarNumPedido() === '' &&
      validarTipoConsulta() === '' &&
      validarPassword() === '';

    if (!resultado) {
      console.log('Los input no tienen informacion, no enviar el formulario');
      validarNombre();
      validarCorreo();
      validarNumPedido();
      validarTipoConsulta();
      validarPassword();
    } else {
      console.log('Los input tienen informacion, puedo enviar la data');
    }
  });
  nombreInput.addEventListener('input', () => validarNombre());
  correoInput.addEventListener('input', () => validarCorreo());
  passwordInput.addEventListener('input', () => validarPassword());
  numPedidoInput.addEventListener('input', () => validarNumPedido());
  tipoConsultaInput.addEventListener('input', () => validarTipoConsulta());
});
