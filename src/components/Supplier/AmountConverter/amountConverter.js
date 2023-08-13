function convertAmountToWords(amount) {
  const units = ['', 'one', 'two', 'three', 'four', 'five', 'six', 'seven', 'eight', 'nine'];
  const teens = ['ten', 'eleven', 'twelve', 'thirteen', 'fourteen', 'fifteen', 'sixteen', 'seventeen', 'eighteen', 'nineteen'];
  const tens = ['', '', 'twenty', 'thirty', 'forty', 'fifty', 'sixty', 'seventy', 'eighty', 'ninety'];

  function convertLessThanOneHundred(num) {
    if (num < 10) {
      return units[num];
    } else if (num < 20) {
      return teens[num - 10];
    } else {
      const tensDigit = Math.floor(num / 10);
      const unitDigit = num % 10;
      return tens[tensDigit] + (unitDigit !== 0 ? ` ${units[unitDigit]}` : '');
    }
  }

  function convertLessThanOneThousand(num) {
    const hundredsDigit = Math.floor(num / 100);
    const remainingNum = num % 100;
    let result = '';

    if (hundredsDigit !== 0) {
      result += `${units[hundredsDigit]} hundred `;
    }

    if (remainingNum !== 0) {
      result += convertLessThanOneHundred(remainingNum);
    }

    return result.trim();
  }

  if (amount === 0) {
    return 'zero';
  }

  if (amount < 0) {
    return 'minus ' + convertAmountToWords(Math.abs(amount));
  }

  let result = '';

  if (Math.floor(amount / 1000000) > 0) {
    result += convertAmountToWords(Math.floor(amount / 1000000)) + ' million ';
    amount %= 1000000;
  }

  if (Math.floor(amount / 1000) > 0) {
    result += convertAmountToWords(Math.floor(amount / 1000)) + ' thousand ';
    amount %= 1000;
  }

  if (amount > 0) {
    result += convertLessThanOneThousand(amount);
  }

  return result.trim();
}


  export { convertAmountToWords };