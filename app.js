

const githubForm = document.getElementById("github-form")
const nameInput = document.getElementById("githubname")
const clearLastUsers = document.getElementById("clear-last-users")

const lastUsers = document.getElementById("last-users")


const github = new Github()

const ui = new UI()

addEventListeners()

function addEventListeners(){

    githubForm.addEventListener("submit",getData)
    clearLastUsers.addEventListener("click",clearAllSearched)
    document.addEventListener("DOMContentLoaded",getAllSearched)

}

function getData(e){

    let username = nameInput.value.trim()

    if(username === "" ){
        alert("geçerli kullanıcı adı giriniz.")
    }
    else{
        github.getGithubData(username)
        .then(response => {
            
            if(response.user.message ==="Not Found"){
            
                ui.showError("lütfen geçerli bir kullanıcı adı giriniz","danger")
            
            }

            else{
                console.log(response.user)   // repo yazarsan repo gelir.
                console.log(response)
                ui.addSearchedUserToUI(username)

                Storage.addSearchedUserToStorage(username)

                ui.showUserInfo(response.user)
                ui.showRepoInfo(response.repo)
            }

        }) 
        .catch(err => console.log(err))
    }

    ui.clearInput()
    e.preventDefault()
}

function clearAllSearched(){
    if (confirm("emin misiniz ?")){
        Storage.clearAllSearchedUsersFromStorage()
        ui.clearAllSearchedFromUI()
    }
}

function getAllSearched (){
    let users = Storage.getSearchedUsersFromStorage()

    let result =""
    
    users.forEach(user => {
        result +=`<li class="list-group-item">${user}</li>`
        
    })

    lastUsers.innerHTML = result
}

