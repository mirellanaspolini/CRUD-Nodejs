(function () {
    //let reftabela = document.getElementById("clientes");
    $("#clientes").on("click", ".js-delete", function () {
        let botaoClicado = $(this);
        $("#btn-excluir").attr("data-id", botaoClicado.attr("data-id"));
        $("#modal-excluir").modal("show");
    });
    $("#btn-cancelar").on("click", function () {
        $("#modal-excluir").modal("hide");
    });
    $("#btn-excluir").on("click", function () {
        let botaoExcluir = $(this);
        let id = botaoExcluir.attr("data-id");

        $.ajax({
            url: "/clientes/delete/" + id,
            method: "GET",
            success: function () {
                window.location.href = "/";
            },
        });
    });
})();
