const inputEmail = document.getElementById("inputEmail");
const inputPassword = document.getElementById("inputPassword");
const btnSubmit = document.getElementById("btn");

const msgEmail = document.getElementById("msgEmail");
const msgPassword = document.getElementById("msgPassword");

const msg_01 = "Email informado invalido.";
const msg_02 = "Senha inválida.";

const data = {};

const mensagemErroEmail = (display, text) => {
  msgEmail.style.display = display;
  msgEmail.innerHTML = text;
};
const mensagemErroPass = (display, text) => {
  msgPassword.style.display = display;
  msgPassword.innerHTML = text;
};

const erro = (elemento, error) => {
  if (error) {
    elemento.classList.add("error");
  } else {
    elemento.classList.remove("error");
  }
};

inputEmail.addEventListener("change", (e) => {
  let regexEmail = /^[a-z0-9.]+@[a-z0-9]+.[a-z]+(.[a-z]+)?$/i;

  if (regexEmail.test(inputEmail.value)) {
    erro(inputEmail, false);
    mensagemErroEmail("none", "");
    data.email = inputEmail.value;
  } else {
    erro(inputEmail, true);
    mensagemErroEmail("block", msg_01);
  }
});

inputPassword.addEventListener("keyup", (e) => {
  if (inputPassword.value.length <= 8) {
    erro(inputPassword, true);
    mensagemErroPass("block", msg_02);
  } else {
    erro(inputPassword, false);
    mensagemErroPass("none", "");
    data.password = inputPassword.value;
  }
});

const Submit = (e) => {
  e.preventDefault();
  mostrarSpinner()

  const configuracaoRequisicao = {
    method: "POST",
    headers: {
      "Content-type": "application/json",
    },
    body: JSON.stringify(data),
  };

  setTimeout(() => {
    fetch(
      "https://ctd-fe2-todo-v2.herokuapp.com/v1/users/login",
      configuracaoRequisicao
    )
      .then((response) => {
        if (response.status === 201) {
          return response.json();
        }
      })
      .then(function (resposta) {
        ocultarSpinner()
        resposta != "" && alert("Login successful");
        localStorage.setItem("token", resposta.jwt);
        window.location.href = "tarefas.html";
        console.log(resposta);
        console.log(data);
      })
      .catch((err) => {
        console.log(err);
        alert("Login failed");
      });
  }, 3000);
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
