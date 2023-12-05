// Definindo os preços por quilo das carnes
const precos = {
    "File Duplo": { ate5Kg: 4.90, acima5Kg: 5.80 },
    "Alcatra": { ate5Kg: 5.90, acima5Kg: 6.80 },
    "Picanha": { ate5Kg: 6.90, acima5Kg: 7.80 }
};

// Solicitando ao usuário o tipo e a quantidade de carne
const tipoCarne = prompt("Digite o tipo de carne (File Duplo, Alcatra ou Picanha):");
const quantidadeKg = parseFloat(prompt("Digite a quantidade em Kg:"));

// Verificando se os valores inseridos são válidos
if (tipoCarne && quantidadeKg && !isNaN(quantidadeKg) && quantidadeKg > 0) {
    // Calculando o preço total de acordo com a quantidade e tipo de carne
    let precoTotal;
    if (quantidadeKg <= 5) {
        precoTotal = quantidadeKg * precos[tipoCarne].ate5Kg;
    } else {
        precoTotal = quantidadeKg * precos[tipoCarne].acima5Kg;
    }

    // Verificando se a compra é feita no cartão Assaí para aplicar o desconto
    const tipoPagamento = prompt("A compra será feita no cartão Assaí? (S para sim, N para não):").toUpperCase();
    let desconto = 0;
    if (tipoPagamento === 'S') {
        desconto = 0.05 * precoTotal;
    }

    // Calculando o valor a ser pago pelo cliente
    const valorAPagar = precoTotal - desconto;

    // Exibindo o cupom fiscal
    console.log("\nCupom Fiscal");
    console.log("Tipo de carne: " + tipoCarne);
    console.log("Quantidade: " + quantidadeKg.toFixed(2) + " Kg");
    console.log("Preço total: R$ " + precoTotal.toFixed(2));
    console.log("Tipo de pagamento: " + (tipoPagamento === 'S' ? "Cartão Assaí" : "Outros meios"));
    console.log("Desconto: R$ " + desconto.toFixed(2));
    console.log("Valor a pagar: R$ " + valorAPagar.toFixed(2));

} else {
    console.log("Por favor, insira valores válidos para o tipo de carne e a quantidade em Kg.");
}
