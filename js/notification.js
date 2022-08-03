var btnPermission = document.getElementById("btn_permission");

if (Notification.permission !== "default") {
    btnPermission.style.display = "none";
} else {
    btnPermission.style.display = "inline-block";
}

btnPermission.onclick = evt => {
    Notification.requestPermission();
}




function spawnNotification(opcoes) {
    let n = new Notification(opcoes.title, opcoes.opt);
    
    if (opcoes.link !== '') {
        n.addEventListener("click", function() {               
            n.close();
            window.focus();
            window.location.href = opcoes.link;
        });
    }
}

document.getElementById("btn_push").onclick = evt => {
    spawnNotification({
        opt: {
            body: "Criando nova notificação",
            icon: "notification-flat.png"
        },
        title: "Olá mundo!",
        link: "https://www.google.com.br/"
    })
}