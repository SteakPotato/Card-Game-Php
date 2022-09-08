// Listenners
const btnAddArticleListenners = () => {
    let btnAdd = document.querySelector('.addArticle')
    if(btnAdd){
        btnAdd.addEventListener('click', ()=>{
            displayAddArticleForm()
        })

    }

}
const windowListennerClosebtn = () => {
    window.addEventListener("click",(e) => {
        let modaladd = document.querySelector(".modal-add");
        let modal = document.querySelector(".modal-container");
        if (e.target == modaladd) {
            modaladd.remove()
        }else if(e.target == modal){
            modal.remove()
        }
    })

}
const addArticleFormListsenners = () => {
    let articleForm = document.querySelector('.input-article').addEventListener('submit', (e)=>{
        let modaladd = document.querySelector(".modal-add");
        e.preventDefault();
        addArticleData();
        modaladd.remove()
    })
    let closeBtn = document.querySelector(".close").addEventListener("click",() => {
        let modaladd = document.querySelector(".modal-add");
        modaladd.remove()
    })
}
const addCommentFormListsenners = () => {
    let commentForm = document.querySelector('.input-comment').addEventListener('submit', (e)=>{
        e.preventDefault();
        addCommentData();
    })
    let closeBtn = document.querySelector(".close").addEventListener("click",() => {
        let modaladd = document.querySelector(".modal-container");
        modaladd.remove()
    })
    let edit = document.querySelector(".edit")
    if(edit){
        edit.addEventListener("click",() => {
            let text = document.getElementById("contenu-text")
            if(text.contentEditable == "false" || text.contentEditable == "inherit"){
                text.contentEditable = true;
            }
            else if(text.contentEditable == "true"){
                text.contentEditable = false;
            }
            let save = document.querySelector(".save")
            save.classList.toggle("showBtn")
            text.focus()
        })
    }
    let save = document.querySelector(".save")
    if(save){
        save.addEventListener("click",() => {
            let text = document.querySelector(".text")
            if(text.contentEditable == "false" || text.contentEditable == "inherit"){
                text.contentEditable = true;
            }
            else if(text.contentEditable == "true"){
                text.contentEditable = false;
            }
            let save = document.querySelector(".save")
            save.classList.remove("showBtn")
            editArticleData()
        })
    }
    let remove = document.querySelector(".delete")
    if(remove){
        remove.addEventListener("click",() => {
            removeArticleData()
        })
    }
}

//edit data
const editArticleData = () => {
    let titre = document.querySelector(".titre").innerHTML
    let text = document.querySelector(".text").innerHTML
    let modal = document.querySelector(".modal-article")

    let data = new FormData();
    data.append("type","editArticle");
    data.append("titre",titre);
    data.append("text",text);
    data.append("articleId",modal.id);


    fetch("guideAjax.php", {
        method : "POST",
        credentials : "include",
        body: data
    })
    .then(()=> {
        getArticleData()
    })
}
//remove data
const removeArticleData = () => {
    let modal = document.querySelector(".modal-article")
    let modaladd = document.querySelector(".modal-container");
    
    let data = new FormData();
    data.append("type","removeArticle");
    data.append("articleId",modal.id);
    fetch("guideAjax.php", {
        method : "POST",
        credentials : "include",
        body: data
    })
    .then(()=> {
        getArticleData()
        modaladd.remove()
    })
}
//Add Data
const addArticleData = () => {
    let titre = document.querySelector("#titre").value
    let text = document.querySelector("#contenu-text").value

    let data = new FormData();
    data.append("type","addArticle");
    data.append("titre",titre);
    data.append("text",text);

    fetch("guideAjax.php", {
        method : "POST",
        credentials : "include",
        body: data
    })
    .then(response => response.json())
    .then(data => {
        console.log(data)
        getArticleData()
    })
}
const addCommentData = () => {
    let name = document.querySelector("#name")
    let comment = document.querySelector("#contenu-comment")
    let modal = document.querySelector(".modal-article")

    let data = new FormData();
    data.append("type","addComment");
    if(name){
        data.append("name",name.value);
        name.value = ""
    }
    data.append("articleId",modal.id);
    data.append("comment",comment.value);
    comment.value = ""

    fetch("guideAjax.php", {
        method : "POST",
        credentials : "include",
        body: data
    })
    .then(response => response.json())
    .then(data => {
        console.log(data)
        getCommentData(modal.id)
    })
}

//Get data 
const getArticleData = () => {
    let data = new FormData();
    data.append("type","getArticle");
    fetch("guideAjax.php", {
        method : "POST",
        credentials : "include",
        body: data
    })
    .then(response => response.json())
    .then(data => {
        console.log(data)
        displayArticle(data)
    })
}
const getCommentData = (id) => {
    let data = new FormData();
    data.append("type","getComment");
    data.append("id",id);
    fetch("guideAjax.php", {
        method : "POST",
        credentials : "include",
        body: data
    })
    .then(response => response.json())
    .then(data => {
        console.log(data)
        displayComment(data)
    })
}
let displayAddArticleForm = () => {
    let container = document.querySelector(".guide-container")
    let template = document.querySelector(".ficheAjoutArticle").innerHTML;
    let div = document.createElement("div");
    div.className = "modal-add";
    div.innerHTML = template;
    container.appendChild(div)
    addArticleFormListsenners()
}
let displayArticle = (data) => {
    let container = document.querySelector(".article-container")
    container.innerHTML =""
    data.forEach(article => {
        let template = document.querySelector(".ficheArticle").innerHTML;
        let div = document.createElement("div");
        div.className = "article";
        div.id = article.id;
        div.innerHTML = template;
        div.querySelector(".titre").innerHTML = article.titre
        div.querySelector(".date").innerHTML = article.creation
        div.querySelector(".auteur").innerHTML = article.auteur
        container.appendChild(div)

        div.addEventListener("click",() => {
            displayArticleFull(article)
            addCommentFormListsenners()

        })
    });
}
let displayArticleFull = (article) => {
    let container = document.querySelector(".guide-container")
    let template = document.querySelector(".ficheArticleFull").innerHTML;
    let double = document.querySelector(".modal-container")
    if(double){double.remove()}
    let div = document.createElement("div");
    div.className = "modal-container";
    div.innerHTML = template;
    div.querySelector(".modal-article").id = article.id;
    div.querySelector(".titre").innerHTML = article.titre
    div.querySelector(".date").innerHTML = article.creation
    div.querySelector(".text").innerHTML = article.texte
    div.querySelector(".auteur").innerHTML = article.auteur
    container.appendChild(div)
    getCommentData(article.id)
}
let displayComment = (data) => {
    let container = document.querySelector(".comment-container")
    container.innerHTML=""
    data.forEach(comment => {
        let template = document.querySelector(".ficheComment").innerHTML;
        let div = document.createElement("div");
        div.className = "comment";
        div.innerHTML = template;
        div.querySelector(".comment-name").innerHTML = comment.nom
        div.querySelector(".comment-content").innerHTML = comment.texte
        container.appendChild(div)
    });
}
window.addEventListener("load",() => {
    windowListennerClosebtn()
    btnAddArticleListenners()
    getArticleData()
})