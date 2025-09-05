document.addEventListener('DOMContentLoaded', function () {
    // ===== Acessibilidade =====
    const botaoDeAcessibilidade = document.getElementById('botao-acessibilidade');
    const opcoesDeAcessibilidade = document.getElementById('opcoes-acessibilidade');

    botaoDeAcessibilidade.addEventListener('click', function () {
        botaoDeAcessibilidade.classList.toggle('rotacao-botao');
        opcoesDeAcessibilidade.classList.toggle('apresenta-lista');
    });

    const aumentaFonteBotao = document.getElementById('aumentar-fonte');
    const diminuiFonteBotao = document.getElementById('diminuir-fonte');
    const alternaContraste = document.getElementById('alterna-contraste');

    let tamanhoAtualFonte = 1;

    aumentaFonteBotao.addEventListener('click', function () {
        tamanhoAtualFonte += 0.1;
        document.body.style.fontSize = `${tamanhoAtualFonte}rem`;
    });

    diminuiFonteBotao.addEventListener('click', function () {
        tamanhoAtualFonte -= 0.1;
        document.body.style.fontSize = `${tamanhoAtualFonte}rem`;
    });

    alternaContraste.addEventListener('click', function () {
        document.body.classList.toggle('alto-contraste');
    });

    ScrollReveal().reveal('#inicio', { delay: 500 });
    ScrollReveal().reveal('#tropicalia', { delay: 500 });
    ScrollReveal().reveal('#galeria', { delay: 500 });
    ScrollReveal().reveal('#contato', { delay: 500 });

    // ===== Formulário com EmailJS =====
    const form = document.getElementById("contato-form");
    const enviarBtn = document.getElementById("enviarBtn");
    const spinner = document.getElementById("spinner");
    const btnText = document.querySelector(".btn-text");
    const msg = document.getElementById("msg");

    // Inicializa o EmailJS com seu PUBLIC KEY
    emailjs.init("Ma2sCjOJtGrH5w41d");

    form.addEventListener("submit", async function (e) {
        e.preventDefault();

        const nome = this.nome.value;
        const email = this.email.value;
        const mensagem = this.mensagem ? this.mensagem.value : "";

        // Ativa spinner e desativa botão
        spinner.style.display = "inline-block";
        btnText.textContent = "Enviando...";
        enviarBtn.disabled = true;
        msg.textContent = "";

        try {
            const res = await emailjs.send("service_gb4l7y3", "template_kpez4wa", {
                // CORREÇÃO: Mudança dos nomes das variáveis para corresponder ao template
                name: nome,           // {{name}} no template
                email: email,         // {{email}} no template - usado no "To Email"
                message: mensagem     // {{message}} no template
            });

            msg.textContent = "Mensagem enviada com sucesso!";
            msg.style.color = "green";
            form.reset();

        } catch (err) {
            console.error("Erro detalhado:", err);
            msg.textContent = "Erro ao enviar a mensagem. Tente novamente.";
            msg.style.color = "red";
        } finally {
            spinner.style.display = "none";
            btnText.textContent = "Enviar mensagem";
            enviarBtn.disabled = false;
        }
    });
});