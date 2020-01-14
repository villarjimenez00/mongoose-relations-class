module.exports = ({ name, confirmationCode }) => {
  return `<h1>Bienvenido ${name} </h1>
      <h3>Ya solo queda un paso!!!!! </h3>
      <p>Para completar la subscripción tiene que clickar en el siguiente enlace</p>
        <a href="http://localhost:3000/users/codeconfirmation/${confirmationCode}">Pulse aquí </a>
      `;
};
