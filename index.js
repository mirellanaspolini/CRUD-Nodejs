const express = require("express");
const app = express();
const { engine } = require("express-handlebars");
const path = require("path");
const bodyparser = require("body-parser");

app.use(bodyparser.urlencoded({ extended: false }));
app.set("view engine", "handlebars");
app.engine("handlebars", engine());

app.use(
    "/css",
    express.static(path.join(__dirname, "node_modules/bootstrap/dist/css"))
);
app.use(
    "/js",
    express.static(path.join(__dirname, "node_modules/bootstrap/dist/js"))
);
app.use(
    "/js",
    express.static(path.join(__dirname, "node_modules/jquery/dist"))
);

app.use("/public", express.static(path.join(__dirname, "public")));

// * OBS: Todos as informações dos clientes são fictícias ou foram geradas aleatoriamente.
const fakeData = [
    {
        id: 1,
        nome: "Luiz Otávio",
        endereco: "Rua dos bobos, 0",
        sexo: "Masculino",
        telefone: "47 99928-5889",
    },
    {
        id: 2,
        nome: "Beatriz da Conceição",
        endereco: "Rua Baker Street, 221B",
        sexo: "Feminino",
        telefone: "48 94399-2929",
    },
    {
        id: 3,
        nome: "Vínicius Mendes",
        endereco: "Rua do Macaco Louco, 22",
        sexo: "Masculino",
        telefone: "49 93499-7247",
    },
    {
        id: 4,
        nome: "Alexandre Viana",
        endereco: "Rua do Limão, 15",
        sexo: "Masculino",
        telefone: "47 97585-7446",
    },
    {
        id: 5,
        nome: "Davi Lucas da Conceição",
        endereco: "Rua Evergreen, 742",
        sexo: "Masculino",
        telefone: "47 96259-5491",
    },
    {
        id: 6,
        nome: "Luiza da Mata",
        endereco: "Rua das Camélias, 81",
        sexo: "Feminino",
        telefone: "48 96408-5836",
    },
    {
        id: 7,
        nome: "Carolina Farias",
        endereco: "Rua Três, 3",
        sexo: "Feminino",
        telefone: "47 90573-9188",
    },
];

app.get("/", function (req, res) {
    res.render("cliente/cliente", { listaclientes: fakeData });
});

app.get("/clientes/delete/:id", function (req, res) {
    let umCliente = fakeData.find((o) => o.id == req.params["id"]);
    let posicao = fakeData.indexOf(umCliente);
    if (posicao > -1) {
        fakeData.splice(posicao, 1);
    }
    res.redirect("/");
});

app.get("/clientes/novo", function (req, res) {
    res.render("cliente/formcliente");
});

app.get("/clientes/editar/:id", (req, res) => {
    let id = req.params["id"];
    let umCliente = fakeData.find((cliente) => cliente.id == id);

    res.render("cliente/formcliente", { cliente: umCliente });
});

app.post("/clientes/save", function (req, res) {
    if (req.body.nome === "") {
        res.render("cliente/formclient", { cliente: req.body });
        return;
    }

    let clienteAntigo = fakeData.find((o) => o.id == req.body.id);

    if (clienteAntigo != undefined) {
        clienteAntigo.nome = req.body.nome;
        clienteAntigo.endereco = req.body.endereco;
        clienteAntigo.sexo = req.body.sexo;
        clienteAntigo.telefone = req.body.telefone;
    } else {
        let maiorid = Math.max(...fakeData.map((o) => o.id));
        if (maiorid == -Infinity) maiorid = 0;

        let novoCliente = {
            id: maiorid + 1,
            nome: req.body.nome,
            endereco: req.body.endereco,
            sexo: req.body.sexo,
            telefone: req.body.telefone,
        };
        fakeData.push(novoCliente);
    }
    res.redirect("/");
});

app.listen(3000, () => {
    console.log("Servidor online: http://localhost:3000/");
});
