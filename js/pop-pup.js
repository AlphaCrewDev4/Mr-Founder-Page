(()=>{
    const list = document.querySelector(".list");
    list.classList.remove("show-list");
    list.classList.add("hide-list");
    
    const containt = document.querySelector(".containt");
    containt.style.backgroundColor = "transparent";
    let show = true;
    const services = document.querySelector("#services");
    services.addEventListener("click", ()=>{
    
        
        if(show){
            list.classList.remove("hide-list");
           list.classList.add("show-list");
            containt.style.backgroundColor = "gray";
            show = false;
        }else{
            list.classList.remove("show-list");
            list.classList.add("hide-list");
            containt.style.backgroundColor = "transparent";
            show = true;
        }
    });
})();
