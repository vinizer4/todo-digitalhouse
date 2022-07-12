const nomeUsuario = document.getElementById("nomeUsuario");
const listaPendente = document.getElementById("tarefasPendentes");
const listaTerminadas = document.getElementById("tarefasTerminadas");
const botao = document.getElementById("botao");


window.onload = () => {
  receberUsuario();
  listarTarefas();
  botao.addEventListener("click",(e)=> {
    e.preventDefault();
    criarTarefa();
  } )
};

const dataTask = {}

const jwt = localStorage.getItem("token");

function receberUsuario() {
  const configuracaoRequisicao = {
    method: "GET",
    headers: {
      "Content-type": "application/json",
      Authorization: jwt,
    },
  };

  fetch(
    "https://ctd-fe2-todo-v2.herokuapp.com/v1/users/getMe",
    configuracaoRequisicao
  )
    .then((response) => response.json())

    .then((data) => {
      const dados = `${data.firstName} ${data.lastName}`;
      nomeUsuario.innerHTML = dados;
    })

    .catch((err) => {
      console.log(err);
    });
}

function renderizarTarefas(tasks) {
  listaPendente.innerHTML = "";
  listaTerminadas.innerHTML = "";
  console.log(tasks);

  // setTimeout(() => {
   tasks.forEach(task => {
      
      const dataFormatada = new Date(task.createdAt).toLocaleDateString(
        "pt-BR",
        {
          day: "2-digit",
          month: "2-digit",
          year: "numeric",
          hour: 'numeric',
          minute: 'numeric',
        }
      );

      if (task.completed) {
        listaTerminadas.innerHTML += `
              <li class="tarefa">
              <div class="not-done" onclick="atualizarTarefa(${task.id},false)"><img src="./assets/undo.svg" alt="Tarefa feita."></div>
              <div class="descricao">
              <p class="nome">${task.description}</p>
              <p class="timestamp"> Criada em: ${dataFormatada}</p>
              <button class="close" onclick="removerTarefa(${task.id})"><img src="./assets/close.svg" alt="Tarefa feita."></button>
              </div>
              </li>`;
      } else {
        listaPendente.innerHTML += `
        <li class="tarefa">
        <div class="not-done" onclick="atualizarTarefa(${task.id},true)"><img src="./assets/check-line.svg" alt="Tarefa feita."></div>
        <div class="descricao">
          <p class="nome">${task.description}</p>
          <p class="timestamp"> Criada em: ${dataFormatada}</p>
          <button class="close" onclick="removerTarefa(${task.id})"><img src="./assets/close.svg" alt="Tarefa feita."></button>
        </div>
      </li>`;
      }
    });
  // }, 500);
}

function listarTarefas() {
  const configuracaoRequisicao = {
    method: "GET",
    headers: {
      "Content-type": "application/json",
      Authorization: jwt,
    },
  };

  fetch("https://ctd-fe2-todo-v2.herokuapp.com/v1/tasks", configuracaoRequisicao)
    .then((response) => response.json() )

    .then((data) => {
      renderizarTarefas(data);
    })

    .catch((err) => {
      console.log(err);
    });
}

function inputTarefa(e) {
  e.preventDefault()
  //Capiturando inputs do usuario e atribuindo ao objeto para ser usado no request. 
  dataTask.description = e.target.value;
  dataTask.completed = false
  
  console.log(dataTask);

}
function criarTarefa(e) {
  const configuracaoRequisicao = {
    method: "POST",
    headers: {
      "Content-type": "application/json",
      Authorization: jwt,
    },
    body: JSON.stringify(dataTask),
  };

  fetch("https://ctd-fe2-todo-v2.herokuapp.com/v1/tasks", configuracaoRequisicao)
    .then((response) => response.json())

    .then((data) => {
      const dataFormatada = new Date(data.createdAt).toLocaleDateString(
        "pt-BR",
        {
          day: "2-digit",
          month: "2-digit",
          year: "numeric",
          hour: 'numeric',
          minute: 'numeric',
        }
      );
      listaPendente.innerHTML += `
        <li class="tarefa">
        <div class="not-done" onclick="atualizarTarefa(${data.id},true)"><img src="./assets/check-line.svg" alt="Tarefa feita."></div>
        <div class="descricao">
          <p class="nome">${data.description}</p>
          <p class="timestamp"> Criada em: ${dataFormatada}</p>
          <button class="close" onclick="removerTarefa(${data.id})"><img src="./assets/close.svg" alt="Tarefa feita."></button>
        </div>
      </li>`;
    })

    .catch((err) => {
      console.log(err);
    });
}

function atualizarTarefa(id,completedStatus){
  const configuracaoRequisicao = {
    method: "PUT",
    headers: {
      "Content-type": "application/json",
      Authorization: jwt,
    },
    body: JSON.stringify({completed:completedStatus}),
  };
  
  fetch(`https://ctd-fe2-todo-v2.herokuapp.com/v1/tasks/${id}`, configuracaoRequisicao)
  .then((response) => response.json())

  .then(() => { 
    listarTarefas()
  })

  .catch((err) => {
    console.log(err);
  });
}

function removerTarefa(id){
  const configuracaoRequisicao = {
    method: "DELETE",
    headers: {
      "Content-type": "application/json",
      Authorization: jwt,
    },
  };
  
  fetch(`https://ctd-fe2-todo-v2.herokuapp.com/v1/tasks/${id}`, configuracaoRequisicao)
  .then((response) => response.json())

  .then(() => { 
    listarTarefas()
  })

  .catch((err) => {
    console.log(err);
  });
  
}

function finalizar( ) {
  window.location.href = "index.html"

  
}