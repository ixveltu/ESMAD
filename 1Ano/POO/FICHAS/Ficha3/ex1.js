compra = {
    nomeProduto : prompt("Nome do produto: "),
    catProduto : prompt("Categoria do produto: "),
    precoBase : 2.5,
    txIva : 23,
    precoFinal : function() {
        return this.precoBase + (this.precoBase * (this.txIva/100));
    },
    dadosEncomenda : {
        dataEncomenda : "(2023-03-27)",
        prazoEntrega : "(7) Dias",
        localEntrega : "Avenida do Mar, 74, 4460-810 Matosinhos",
    },
    showLength : function() {
        return Object.keys(this).length;
    },
    showProperties : function() {
        return Object.keys(this);
    },
    showProp : function() {
        delete compra.catProduto;
    }
}
console.log(compra.nomeProduto + " - " + compra.catProduto);
console.log("Preço Base: " + compra.precoBase);
console.log("Taxa de IVA: " + compra.txIva + "%");
console.log("Preço Final: " + compra.precoFinal());
console.log("O objeto de compra tem : " + compra.showLength() + " propriedades");
console.log("As propriedades do objeto de compra são: " + compra.showProperties());
console.log(compra);
