// Função para calcular o reajuste do salário
function calcularReajuste(salario) {
    let percentualAumento, valorAumento, novoSalario;

    if (salario <= 280) {
        percentualAumento = 20;
    } else if (salario <= 700) {
        percentualAumento = 15;
    } else if (salario <= 1500) {
        percentualAumento = 10;
    } else {
        percentualAumento = 5;
    }

    valorAumento = (salario * percentualAumento) / 100;
    novoSalario = salario + valorAumento;

    // Exibindo os resultados
    console.log("Salário antes do reajuste: R$" + salario.toFixed(2));
    console.log("Percentual de aumento aplicado: " + percentualAumento + "%");
    console.log("Valor do aumento: R$" + valorAumento.toFixed(2));
    console.log("Novo salário após o aumento: R$" + novoSalario.toFixed(2));
}

// Exemplo de uso da função
const salarioColaborador = parseFloat(prompt("Digite o salário do colaborador:"));

// Verificando se o valor inserido é um número válido
if (!isNaN(salarioColaborador)) {
    calcularReajuste(salarioColaborador);
} else {
    console.log("Por favor, insira um valor válido para o salário.");
}
