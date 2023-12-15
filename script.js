const empresaForm = document.getElementById('empresaForm');
const doacaoForm = document.getElementById('doacaoForm');
const produtoForm = document.getElementById('produtoForm');

window.onload = () => {
    //criarGet();
}



function alertaPost(response) {
    
    if (response.status >= 200 && response.status < 300) {
        alert('Post realizado com sucesso!');
    } else {
        
        alert('Erro ao realizar o post. Verifique o console para mais detalhes.');
        console.error(response);
    }
}

function cadastrar(form, endpoint) 
{
    const formData = new FormData(form);

    axios.post(`http://localhost:8080/${endpoint}`, Object.fromEntries(formData))
        .then(response => {
            alertaPost(response);
            //criarGet();
        })
        .catch(error => {
            console.error('Erro ao cadastrar:', error);
        });
}

empresaForm.addEventListener('submit', function (event) {
    event.preventDefault();
    cadastrar(this, 'usuario'); 
});

doacaoForm.addEventListener('submit', function (event) {
    event.preventDefault();
    cadastrar(this, 'doacao'); 
});

produtoForm.addEventListener('submit', function (event) {
    event.preventDefault();
    cadastrar(this, 'produto'); 
});

//function criarGet() {
    
//}
