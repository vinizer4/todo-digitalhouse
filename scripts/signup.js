// const formulario = document.querySelector('form')
const nome = document.getElementById("name");
const msgNome = document.getElementById("msgNome");

const sobrenome = document.getElementById("last-name");
const msgSobrenome = document.getElementById("msgSobrenome");

const email = document.getElementById("email");
const msgEmail = document.getElementById("msgEmail");

const password = document.getElementById("password");
const msgPassword = document.getElementById("msgPassword");

const repeatPassword = document.getElementById("repeat-password");
const msgPasswordConfirmation = document.getElementById(
  "msgPasswordConfirmation"
);

const btnSubmit = document.getElementById("btn");

const msg_01 = "Por favor, informe um Nome válido!";
const msg_02 = "Por favor, informe um Sobrenomenome válido!";
const msg_03 = "Por favor, informe um Email válido!";
const msg_04 = `
Sua senha deve conter:<br/>
ao menos uma letra minúscula<br/>
ao menos uma letra maiúscula<br/>
ao menos um caractere especial<br/>
ao menos um número<br/>
ao menos 8 dos caracteres mencionados<br/>
`;
const msg_05 = "As senhas precisam ser iguais!";

const data = {};

const habilitarBotao = () => {
  const { firstName, lastName, email, password, repeatPassword } = data;
  if (
    firstName &&
    lastName &&
    email &&
    password &&
    password == repeatPassword
  ) {
    btnSubmit.removeAttribute("disabled");
  } else {
    btnSubmit.setAttribute("disabled", "");
  }
};

const mensagemErro = (display, text, owner) => {
  owner.style.display = display;
  owner.innerHTML = text;
};

const erro = (elemento, error) => {
  if (error) {
    elemento.classList.add("error");
  } else {
    elemento.classList.remove("error");
  }
};

const validateName = (e) => {
  let regexNome = /^[A-Za-záàâãéèêíïóôõöúçñÁÀÂÃÉÈÍÏÓÔÕÖÚÇÑ]+$/;

  if (regexNome.test(nome.value) && nome.value.length >= 3) {
    erro(nome, false);
    mensagemErro("none", "", msgNome);
    data.firstName =
      nome.value[0].toUpperCase() + nome.value.substr(1).toLowerCase();
  } else {
    erro(nome, true);
    mensagemErro("block", msg_01, msgNome);
    data.firstName = "";
  }
  habilitarBotao();
};

const validateLastname = (e) => {
  let regexNome = /^[A-Za-záàâãéèêíïóôõöúçñÁÀÂÃÉÈÍÏÓÔÕÖÚÇÑ]+$/;

  if (regexNome.test(sobrenome.value) && sobrenome.value.length >= 3) {
    erro(sobrenome, false);
    mensagemErro("none", "", msgSobrenome);
    data.lastName =
      sobrenome.value[0].toUpperCase() +
      sobrenome.value.substr(1).toLowerCase();
  } else {
    erro(sobrenome, true);
    mensagemErro("block", msg_02, msgSobrenome);
    data.lastName = "";
  }
  habilitarBotao();
};

const validateEmail = (e) => {
  let regexEmail = /^[a-z0-9.]+@[a-z0-9]+.[a-z]+(.[a-z]+)?$/i;
  console.log(regexEmail.test(e.target.value));
  if (regexEmail.test(e.target.value)) {
    erro(email, false);
    mensagemErro("none", "", msgEmail);
    data.email = e.target.value;
  } else {
    erro(email, true);
    mensagemErro("block", msg_03, msgEmail);
    data.email = "";
  }
  habilitarBotao();
};

const validatePassword = (e) => {
  let regexNome =
    /^(?=.*\d)(?=.*[a-z])(?=.*[A-Z])(?=.*[$*&@#])[0-9a-zA-Z$*&@#]{8,}$/;

  if (regexNome.test(password.value) && password.value.length >= 8) {
    erro(password, false);
    mensagemErro("none", "", msgPassword);
    data.password = e.target.value;
  } else {
    erro(password, true);
    mensagemErro("block", msg_04, msgPassword);
    data.password = "";
  }
  habilitarBotao();
};

const validateRepeatPassword = (e) => {
  if (password.value == repeatPassword.value) {
    erro(repeatPassword, false);
    mensagemErro("none", "", msgPasswordConfirmation);
    data.repeatPassword = password.value;
  } else {
    erro(repeatPassword, true);
    mensagemErro("block", msg_05, msgPasswordConfirmation);
    data.repeatPassword = "";
  }

  habilitarBotao();
};

const Submit = (e) => {
  e.preventDefault();
  mostrarSpinner()

  delete data.repeatPassword;

  console.log(data);

  const configuracaoRequisicao = {
    method: "POST",
    headers: {
      "Content-type": "application/json",
    },
    body: JSON.stringify(data),
  };

  setTimeout(() => {
    fetch(
      "https://ctd-fe2-todo-v2.herokuapp.com/v1/users",
      configuracaoRequisicao
    )
      .then((response) => {
        if (response.status == 201) {
          return response.json();
        }
      })
      .then(function (resposta) {
        ocultarSpinner()
        localStorage.setItem("user", JSON.stringify(data));
        alert("Usuario cadastrado com sucesso");
        location.href = "/index.html";
      })
      .catch((error) => {
        cadastroErro(error);
      });
  }, 3000);

  function cadastroErro(statusErro) {
    console.log("Erro ao cadastrar");
    console.log(statusErro);
  }
};

const body = document.querySelector("body");
const form = document.querySelector("form");

function mostrarSpinner() {
  const spinnerContainer = document.createElement("div");
  const spinner = document.createElement("div");

  spinnerContainer.setAttribute("id", "container-load");
  spinner.setAttribute("id", "load");

  form.classList.add("hidden");

  spinnerContainer.appendChild(spinner);
  body.appendChild(spinnerContainer);

  return;
}

function ocultarSpinner() {
  const spinnerContainer = document.querySelector("#container-load");

  body.removeChild(spinnerContainer);

  form.classList.remove("hidden");
  return;
}
