class UserController{ // Classe pra controle de usuario
    //Constructor da classe
    constructor(formId, tableId){ 

        this.formEl = document.getElementById(formId) //Variavel que recebe o ID de formulário
        this.tableEl = document.getElementById(tableId) //Variavel que recebe o ID da tabela
        this.onSubmit() //Chama a função dentro do constructor

    }
    //Testa o botão de envio
    onSubmit(){

      this.formEl.addEventListener("submit", event =>{ //Arrow function, simplifica o jeito de trabalhar com função

            event.preventDefault() // Stops the default action of an element from happening

            let values = this.getValues()

            //Função dentro do getPhoto - recebe o conteudo do arquivo(content), é passado para o valuePhoto e depois disso addLinha
            this.getPhoto((content)=>{
                values.photo = content

                this.addLine(this.getValues())
            })

        })

    }
    //Funcao que pega a foto -> callback, função usada como retorno, apos a execução de uma rotina
    getPhoto(callback){

        let fileReader = new FileReader();

        //Recebe cada item do array, e retorna apenas se o item do array for igual: photo
        //Gera um novo array com os dados filtrados
        let elements = [...this.formEl.elements].filter(item=>{
            if (item.name === 'photo'){
                return item
            }
        })
         
        let file = elements[0].files[0] 
        fileReader.onload = ()=>{
        
             callback(fileReader.result)
        }
        fileReader.readAsDataURL(file)
    }


    //Retorn os dados do usuario
    getValues(){

        let user = {};

        [...this.formEl.elements].forEach(function(field,index){ //Usa o método Spread- Funciona para que o dev nao precise saber quantos indices terão

            //Busca os names aonde é genero
            if(field.name == "gender"){
        
                if(field.checked){
                    user[field.name] = field.value
                }
            }else{
                user[field.name] = field.value
            }
        })
        
        return new User(
            user.name,
            user.gender,
            user.birth,
            user.country,
            user.email,
            user.password,
            user.photo,
            user.admin
        )
        
    }

    //Função que adiciona linhas na tabela
   addLine(dataUser){  

    this.tableEl.innerHTML = `
        <tr>
            <td><img src="${dataUser.photo}" alt="User Image" class="img-circle img-sm"></td>
            <td>${dataUser.name}</td>
            <td>${dataUser.email}</td>
            <td>${dataUser.admin}</td>
            <td>${dataUser.birth}</td>
            <td>
                <button type="button" class="btn btn-primary btn-xs btn-flat">Editar</button>
                <button type="button" class="btn btn-danger btn-xs btn-flat">Excluir</button>
            </td>
    </tr>
    `

} 

}