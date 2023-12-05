function calcularFolhaPagamento(valorHora, horasTrabalhadas) {
    const salarioBruto = valorHora * horasTrabalhadas;
    let descontoIr = 0;

    // Calculando desconto do Imposto de Renda
    if (salarioBruto <= 900) {
        descontoIr = 0;
    } else if (salarioBruto <= 1500) {
        descontoIr = 5;
    } else if (salarioBruto <= 2500) {
        descontoIr = 10;
    } else {
        descontoIr = 20;
    }

    const descontoInss = (salarioBruto * 10) / 100;
    const fgts = (salarioBruto * 11) / 100;
    const totalDescontos = (salarioBruto * descontoIr) / 100 + descontoInss;
    const salarioLiquido = salarioBruto - totalDescontos;

    // Exibindo os resultados
    console.log("Salário Bruto: (" + horasTrabalhadas + "h * R$ " + valorHora.toFixed(2) + "): R$ " + salarioBruto.toFixed(2));
    console.log("(-) IR (" + descontoIr + "%): R$ " + ((salarioBruto * descontoIr) / 100).toFixed(2));
    console.log("(-) INSS (10%): R$ " + descontoInss.toFixed(2));
    console.log("FGTS (11%): R$ " + fgts.toFixed(2));
    console.log("Total de descontos: R$ " + totalDescontos.toFixed(2));
    console.log("Salário Líquido: R$ " + salarioLiquido.toFixed(2));
}

// Exemplo de uso da função
const valorHora = parseFloat(prompt("Digite o valor da sua hora de trabalho:"));
const horasTrabalhadas = parseFloat(prompt("Digite a quantidade de horas trabalhadas no mês:"));

// Verificando se os valores inseridos são números válidos
if (!isNaN(valorHora) && !isNaN(horasTrabalhadas)) {
    calcularFolhaPagamento(valorHora, horasTrabalhadas);
} else {
    console.log("Por favor, insira valores válidos para o valor da hora e horas trabalhadas.");
}
