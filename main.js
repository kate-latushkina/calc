let resNumber = 0;
function expressionCalculator(expr) {
  
  expr = expr
    .trim()
    .replace(/\s+/g, " ")
    .split(" ");
  let firstBr = 0;
  let lastBr = 0;
  let bracketsOpen = 0;
  let bracketsClose = 0;
  let bracketsNumbers = 0;
  expr.forEach(element => {
    if (element == '(') {
      firstBr++;
    }
    if (element == ')') {
      lastBr++;
    }
  });
  if (firstBr != lastBr) {
    throw new Error("ExpressionError: Brackets must be paired");
  }
  if (firstBr > 0) {
    bracketsOpen = expr.lastIndexOf("(");
    bracketsClose = expr.indexOf(")", bracketsOpen);
    bracketsNumbers = expr.slice(bracketsOpen + 1, bracketsClose);
    solution(bracketsNumbers);
    //   console.log(bracketsNumbers)
    let bracketsDelete = expr.splice(bracketsOpen,bracketsClose + 1,resNumber);
    console.log(bracketsDelete);
    console.log(expr);
  }

  solution(expr);
    // return expr;
  console.log(resNumber);
}





function solutionDelete(arr1, arr2, result) {
  arr1.splice(0, 2, result);
  arr2.splice(0, 1);
}




function solution(string) {
  let numbers = []; //числа
  let sign = []; //знаки
  let result = 0;
  const prioritet = {
    '+': 1,
    '-': 1,
    '*': 2,
    '/': 2,
  }
  for (let i = 0; i < string.length; i++) {
    if (
      string[i] == "*" ||
      string[i] == "+" ||
      string[i] == "-" ||
      string[i] == "/"
    ) {
      sign.push(string[i]);
    } else {
      string[i] = Number(string[i]);
      numbers.push(string[i]);
      if (numbers.length == 2) {
        if (sign[0] == "*") {
          result = numbers[0] * numbers[1];
          solutionDelete(numbers, sign, result);
        }
        if (sign[0] == "/") {
          if (numbers[1] == 0 || numbers[0] == 0) {
            throw new Error("TypeError: Division by zero.");
          } else {
            result = numbers[0] / numbers[1];
            solutionDelete(numbers, sign, result);
          }
        }
        if (sign[0] == "-") {
          result = numbers[0] - numbers[1];
          solutionDelete(numbers, sign, result);
        }
        if (sign[0] == "+") {
          result = numbers[0] + numbers[1];
          solutionDelete(numbers, sign, result);
        }
        resNumber = Number(numbers[0].toFixed(4));
      }
    }
  }
}

// expressionCalculator('2 * 3') // 6   !!!в тестах нет пробела в этой строке
// expressionCalculator('49 * 63 / 58 * 36')  //1916.0690
// expressionCalculator("64 + 19 - 77 - 93"); //-87
// expressionCalculator(' ( ( 1 + 2 ) * 3') //ERROR
expressionCalculator(" 20 - 57 * 12 - (  58 + 84 * 32 / 27  ) "); //72.6978
