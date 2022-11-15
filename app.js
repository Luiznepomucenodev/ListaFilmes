const url = "https://api.themoviedb.org/4/list/1?api_key=ae05866df6e80e7fe75f063094e53261"

const getMovies = () => {
    axios.get(url)
        .then(response => {
            const data = response.data.results


            setLocalStorage(data)
            setFilmes()

        })
}
getMovies()

function setLocalStorage(dados) {
    dados.forEach(element => {
        localStorage.setItem(element.id, JSON.stringify(element))
    });
}

function mandarDados() {

    setLocalStorage([
        {
            id: hashCode(document.getElementById("nome").value.concat(new Date())),
            title: document.getElementById("nome").value,
            overview: document.getElementById("resumo").value,
            vote_average: document.getElementById("nota").value,
            release_date: document.getElementById("data").value

        }
    ])

    setFilmes()
    clearField()

    $("#Modal").modal("show")
    document.getElementById("ModalLabel").innerHTML = "Confirmação de cadastro"
    document.getElementById("modalTitulo").innerHTML = "Filme cadastrado com sucesso"
}

function setFilmes() {
    let listafilme = document.getElementById("listafilmes")
    listafilme.innerHTML = ""

    const keys = Object.keys(localStorage)
    keys.forEach((element) => {
        let linhas = listafilme.insertRow()

        const filme = JSON.parse(localStorage.getItem(element))

        linhas.insertCell(0).innerHTML = filme.title
        linhas.insertCell(1).innerHTML = filme.overview
        linhas.insertCell(2).innerHTML = filme.vote_average
        linhas.insertCell(3).innerHTML = filme.release_date
        linhas.insertCell(4).append(getButtons(element))
    })
}

function hashCode(value) {
    var hash = 0,
        i, chr;
    if (value.length === 0) return hash;
    for (i = 0; i < value.length; i++) {
        chr = value.charCodeAt(i);
        hash = ((hash << 5) - hash) + chr;
        hash |= 0;
    }
    return hash;
}

function clearField() {

    document.getElementById("nome").value = ""
    document.getElementById("resumo").value = ""
    document.getElementById("nota").value = ""
    document.getElementById("data").value = ""
}
function getButtonDelete(key) {
    let deleteButton = document.createElement("button")
    deleteButton.className = "btn btn-danger"
    deleteButton.id = "ButtonDelete"
    deleteButton.innerHTML = '<i class="fas fa-trash"></i>'
    deleteButton.style = "font-size: 10px; margin: 2px;"

    deleteButton.onclick = function () {

        setFilmes()

        $("#editModal").modal("show")
        document.getElementById("ModalLabel").innerHTML = "Confirmação de exclusão"
        document.getElementById("modalBody").innerHTML = "Deseja confirmar a exclusão ?"
        document.getElementById("confirmar").innerHTML = "Confirmar"
        document.getElementById("confirmar").onclick = function () {
            localStorage.removeItem(key); setFilmes()
            $("#Modal").modal("show")
            document.getElementById("ModalLabel").innerHTML = "Confirmação de exclusão"
            document.getElementById("modalTitulo").innerHTML = "Filme excluido com sucesso"
        }
    }

    return deleteButton
}

function getButtonEdit(key) {
    let editButton = document.createElement("button")
    editButton.className = "btn btn-primary"
    editButton.id = "ButtonDelete"
    editButton.innerHTML = '<i class="fas fa-edit"></i>'
    editButton.style = "font-size: 10px; margin: 2px;"

    editButton.onclick = function () {

        $("#editModal").modal("show")

        const chaves = Object.keys(localStorage)
        chaves.forEach(() => {
            const filme = JSON.parse(localStorage.getItem(key))

            document.getElementById("inputNomeModal").value = filme.title
            document.getElementById("inputResumoModal").value = filme.overview
            document.getElementById("inputNotaModal").value = filme.vote_average
            document.getElementById("inputDataModal").value = filme.release_date
            document.getElementById("confirmar").onclick = function () {

                setLocalStorage([
                    {
                        id: hashCode(document.getElementById("nome").value.concat(new Date())),
                        title: document.getElementById("inputNomeModal").value,
                        overview: document.getElementById("inputResumoModal").value,
                        vote_average: document.getElementById("inputNotaModal").value,
                        release_date: document.getElementById("inputDataModal").value
                    }
                ])
                localStorage.removeItem(key); setFilmes()

                $("#Modal").modal("show")
                document.getElementById("ModalLabel").innerHTML = "Confirmação de edição"
                document.getElementById("modalTitulo").innerHTML = "Filme editado com sucesso"
            }

        })
    }
    return editButton
}

function getButtons(key) {

    let div = document.createElement("div")
    div.append(getButtonEdit(key))
    div.append(getButtonDelete(key))
    div.style = "display: flex;"

    return div
}




