export const bestHands = (hands) => {
  const pokerHands = {
    royalFlush: [],       // Флеш-рояль Т♥ К♥ Д♥ В♥ 10♥
    straightFlush: [],    // Стрит-флеш 9♠ 8♠ 7♠ 6♠ 5♠
    fourOfAKind: [],      // Каре       3♥ 3♦ 3♣ 3♠
    fullHouse: [],        // Фулл-хаус  10♥ 10♦ 10♠ 8♣ 8♥
    flush: [],            // Флеш       К♠ В♠ 8♠ 4♠ 3♠
    straight: [],         // Стрит      5♦ 4♥ 3♠ 2♦ Т♦
    threeOfAKind: [],     // Тройка     7♣ 7♥ 7♠
    twoPair: [],          // Две пары   8♣ 8♠ 4♥ 4♣
    onePair: [],          // Пара       9♥ 9♠
    highCard: []          // Старшая карта А♦ 10♦ 9♠ 5♣ 4♣
  };

  for (let hand of hands) {
    const oneHand = {
      nominal: {},
      suit: {}
    };

    let modHand = hand.split(' ');

    for (let i = 0; i < modHand.length; i++) {
      let oneCardNominal = modHand[i][0];
      let oneCardSuit = modHand[i][1];

      if(modHand[i].length === 3) {
        oneCardNominal = modHand[i].slice(0, 2);
        oneCardSuit = modHand[i].slice(2);
      }

      oneHand.nominal[oneCardNominal] = (oneHand.nominal[oneCardNominal] || 0) + 1;
      oneHand.suit[oneCardSuit] = (oneHand.suit[oneCardSuit] || 0) + 1;
    }

    for (let key in oneHand.nominal) {
      if (key === 'A') {
        oneHand.nominal['14'] = oneHand.nominal['A'];
        delete oneHand.nominal['A'];
      } else if (key === 'K') {
        oneHand.nominal['13'] = oneHand.nominal['K'];
        delete oneHand.nominal['K'];
      } else if (key === 'Q') {
        oneHand.nominal['12'] = oneHand.nominal['Q'];
        delete oneHand.nominal['Q'];
      } else if (key === 'J') {
        oneHand.nominal['11'] = oneHand.nominal['J'];
        delete oneHand.nominal['J'];
      }
    }

    //Сортируем объект nominal

    Object.keys(oneHand.nominal)
        .sort((a, b) => Number(a) - Number(b))
        .reduce((acc, key) => {
          acc[key] = oneHand.nominal[key];
          return acc;
        }, {});

    // Флеш-рояль Т♥ К♥ Д♥ В♥ 10♥

    let nominals = Object.keys(oneHand.nominal);
    let suits = Object.keys(oneHand.suit);

    if (nominals.includes('14') && nominals.includes('13') && nominals.includes('12') && nominals.includes('11') && nominals.includes('10') && suits.length === 1) {
      pokerHands.royalFlush.push(`${hand}: ${nominals.reverse()}`);
      continue;
    }
    // Стрит-флеш 9♠ 8♠ 7♠ 6♠ 5♠

    let countDifOfNominals = 0;
    for (let i = 1; i < nominals.length; i++) {
      if (nominals[i] - nominals[i - 1] === 1) countDifOfNominals++;
    }

    if (countDifOfNominals === 4 && suits.length === 1) {
      pokerHands.straightFlush.push(`${hand}: ${nominals.reverse()}`);
      continue;
    } else if (nominals.includes('5') && nominals.includes('4') && nominals.includes('3') && nominals.includes('2') && nominals.includes('14') && suits.length === 1) {
      nominals.splice(4, 1);
      nominals.unshift('1');
      pokerHands.straightFlush.push(`${hand}: ${nominals.reverse()}`);
      continue;
    }

    let nominalsValues = Object.values(oneHand.nominal).sort((a, b) => b - a);
    let sortedNominals = [];

    // Каре       3♥ 3♦ 3♣ 3♠

    if (nominalsValues.includes(4)) {
       sortedNominals = [
        ...nominals.filter(key => oneHand.nominal[key] === 4),
        ...nominals.filter(key => oneHand.nominal[key] === 1)
      ];
      pokerHands.fourOfAKind.push(`${hand}: ${sortedNominals}`);
      continue;
    }

    // Фулл-хаус  10♥ 10♦ 10♠ 8♣ 8♥

    if (nominalsValues.includes(3) && nominalsValues.includes(2)) {
      sortedNominals = [
        ...nominals.filter(key => oneHand.nominal[key] === 3),
        ...nominals.filter(key => oneHand.nominal[key] === 2)
      ];
      pokerHands.fullHouse.push(`${hand}: ${sortedNominals}`);
      continue;
    }

    // Флеш       К♠ В♠ 8♠ 4♠ 3♠

    if (suits.length === 1) {
      pokerHands.flush.push(`${hand}: ${nominals.reverse()}`);
      continue;
    }

    // Стрит      5♦ 4♥ 3♠ 2♦ Т♦

    countDifOfNominals = 0;
    for (let i = 1; i < nominals.length; i++) {
      if (nominals[i] - nominals[i - 1] === 1) countDifOfNominals++;
    }

    if (countDifOfNominals === 4) {
      pokerHands.straight.push(`${hand}: ${nominals.reverse()}`);
      continue;
    } else if (nominals.includes('5') && nominals.includes('4') && nominals.includes('3') && nominals.includes('2') && nominals.includes('14')) {
      nominals.splice(4, 1);
      nominals.unshift('1');
      pokerHands.straight.push(`${hand}: ${nominals.reverse()}`);
      continue;
    }

    // Тройка     7♣ 7♥ 7♠

    if (nominalsValues.includes(3)) {
      let findNominalOfThreeOfAKind;
      sortedNominals = [
        ...nominals.filter(key => oneHand.nominal[key] === 3),
          ...nominals.filter(key => oneHand.nominal[key] !== 3)
      ];
      pokerHands.threeOfAKind.push(`${hand}: ${sortedNominals}`);
      continue;
    }

    // Две пары   8♣ 8♠ 4♥ 4♣

    let countValues = 0;
    let modNominals = [];
    for (let nominal in oneHand.nominal) {
      if (oneHand.nominal[nominal] === 2){
        countValues++;
        modNominals.push(nominal);
      }
    }

    modNominals.sort((a, b) => b - a).concat([...nominals]);
    modNominals.push(nominals[0]);

    if (countValues === 2) {
      pokerHands.twoPair.push(`${hand}: ${modNominals}`);
      continue;
    }

    // Пара       9♥ 9♠
    if (nominalsValues.includes(2)) {
      let findNominalOfOnePare;
      for (let nominal in oneHand.nominal) {
        if (oneHand.nominal[nominal] === 2) findNominalOfOnePare = nominal;
      }

      sortedNominals = [
        ...nominals.filter(key => oneHand.nominal[key] === 2),
          ...nominals.filter(nominal => nominal !== findNominalOfOnePare)
      ];
      pokerHands.onePair.push(`${hand}: ${sortedNominals}`);
      continue;
    }

    // Старшая карта А♦ 10♦ 9♠ 5♣ 4♣

    if (hand) {
      pokerHands.highCard.push(`${hand}: ${nominals.reverse()}`);
      continue;
    }
  }

  let bestHands = Object.values(pokerHands);
  let sortedBestHands = [];

  for (let i = 0; i < bestHands.length; i++) {
    if (bestHands[i].length !== 0) sortedBestHands.push(bestHands[i]);
  }

  let firstHand = sortedBestHands[0];
  if (firstHand.length === 1) {
    firstHand = firstHand[0].split(':');
    return [firstHand[0]];
  }

  if (firstHand.length > 1) {
    let arrayOfNominals = [];

    for (let i = 0; i < firstHand.length; i++) {
      let [, nominalOfFirstHand] = [...firstHand[i].split(':')];
      arrayOfNominals.push(nominalOfFirstHand);
    }

    for (let i = 0; i < arrayOfNominals.length; i++) {
      arrayOfNominals[i] = arrayOfNominals[i].split(',').map(Number);
    }

    let bestNominal = arrayOfNominals.reduce((acc, nominal ) => {
      for (let i = 0; i < nominal.length; i++) {
        if (acc[i] === nominal[i]) continue;

        let bestIndex = acc[i] > nominal[i] ? acc : nominal;

        return bestIndex;
      }

      return acc;
    });

    let bestHandArray = [];

    for (let i = 0; i < arrayOfNominals.length; i++) {
      let isMatch = arrayOfNominals[i].length === bestNominal.length &&
          arrayOfNominals[i].every((val, idx) => val === bestNominal[idx]);

      if (isMatch) {
        let bestHand = sortedBestHands[0][i].split(':').slice(0, 1);
        bestHandArray.push(...bestHand);
      }
    }

    return bestHandArray;
  }
  console.log(pokerHands);
};


