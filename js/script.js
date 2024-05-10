document.addEventListener("DOMContentLoaded", function () {
    const form = document.getElementById("cadastroForm");
    const sincronizarBtn = document.getElementById("sincronizarBtn");
    const pessoasTableBody = document.getElementById("pessoasTableBody");

    let pessoas = [];

    form.addEventListener("submit", function (event) {
        event.preventDefault();

        const nome = document.getElementById("nome").value;
        const email = document.getElementById("email").value;
        const telefone = document.getElementById("telefone").value;

        const pessoa = { nome, email, telefone };
        pessoas.push(pessoa);

        form.reset();
    });

    sincronizarBtn.addEventListener("click", function () {
        sincronizarPessoas();
    });

    function sincronizarPessoa(pessoa) {
        fetch("https://661050890640280f219cd1bc.mockapi.io/api/v1/pessoas", {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify(pessoa)
        })
        .then(response => response.json())
        .then(data => {
            console.log("Dados sincronizados com sucesso:", data);
        })
        .catch(error => {
            console.error("Erro ao sincronizar dados:", error);
        });
    }

    function sincronizarPessoas() {
        pessoas.forEach(pessoa => {
            sincronizarPessoa(pessoa);
        });

        // Atualiza a tabela após a sincronização bem-sucedida
        carregarPessoas();
    }

    function carregarPessoas() {
        fetch("https://661050890640280f219cd1bc.mockapi.io/api/v1/pessoas")
        .then(response => response.json())
        .then(data => {
            pessoas = data; // Atualiza o array de pessoas com os dados do servidor
            atualizarTabela(); // Atualiza a tabela com os dados atualizados
        })
        .catch(error => {
            console.error("Erro ao carregar pessoas:", error);
        });
    }

    function atualizarTabela() {
        pessoasTableBody.innerHTML = ""; // Limpa a tabela antes de adicionar novas linhas

        pessoas.forEach((pessoa, index) => {
            const row = document.createElement("tr");
            row.innerHTML = `
                <td>${index + 1}</td>
                <td>${pessoa.nome}</td>
                <td>${pessoa.email}</td>
                <td>${pessoa.telefone}</td>
            `;
            pessoasTableBody.appendChild(row);
        });
    }
});
