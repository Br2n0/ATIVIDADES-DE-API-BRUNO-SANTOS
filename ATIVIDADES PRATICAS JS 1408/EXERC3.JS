const numeroDia = parseInt(prompt("Digite um número de 1 a 7 para representar um dia da semana:"));

switch (numeroDia) {
    case 1:
        console.log("1 - Domingo");
        break;
    case 2:
        console.log("2 - Segunda-feira");
        break;
    case 3:
        console.log("3 - Terça-feira");
        break;
    case 4:
        console.log("4 - Quarta-feira");
        break;
    case 5:
        console.log("5 - Quinta-feira");
        break;
    case 6:
        console.log("6 - Sexta-feira");
        break;
    case 7:
        console.log("7 - Sábado");
        break;
    default:
        console.log("Valor inválido. Por favor, digite um número de 1 a 7.");
}
