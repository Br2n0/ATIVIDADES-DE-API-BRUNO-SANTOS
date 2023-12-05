// Definindo os preços dos combustíveis
const precoGasolina = 2.50;
const precoAlcool = 1.90;

// Solicitando ao usuário o número de litros e o tipo de combustível
const litrosVendidos = parseFloat(prompt("Digite o número de litros vendidos:"));
const tipoCombustivel = prompt("Digite o tipo de combustível (A para álcool, G para gasolina):").toUpperCase();

// Verificando se os valores inseridos são válidos
if (!isNaN(litrosVendidos) && (tipoCombustivel === 'A' || tipoCombustivel === 'G')) {
    let descontoPorLitro;

    // Calculando desconto de acordo com o tipo de combustível e a quantidade de litros
    if (tipoCombustivel === 'A') {
        descontoPorLitro = (litrosVendidos <= 20) ? 0.03 : 0.05;
    } else {
        descontoPorLitro = (litrosVendidos <= 20) ? 0.04 : 0.06;
    }

    // Calculando o valor a ser pago pelo cliente
    const precoCombustivel = (tipoCombustivel === 'A') ? precoAlcool : precoGasolina;
    const valorComDesconto = litrosVendidos * (precoCombustivel - (precoCombustivel * descontoPorLitro));

    // Exibindo o resultado
    console.log("Valor a ser pago: R$ " + valorComDesconto.toFixed(2));
} else {
    console.log("Por favor, insira valores válidos para o número de litros e o tipo de combustível.");
}
