module.exports = ({ name, message, emitter }) => {
  return `<h1>Bienvenido ${name} </h1>
    <h3>${emitter} ha enviado un mensaje para tí: </h3>
    <p>${message}</p>
    `;
};
