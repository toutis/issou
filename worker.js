// worker.js
function combination(n, r) {
  if (r > n) return 0;
  let num = 1, den = 1;
  for (let i = 0; i < r; i++) {
    num *= (n - i);
    den *= (i + 1);
  }
  return num / den;
}

// Renvoie un set d'entiers aléatoires
function randomSet(count, max) {
  let arr = [];
  while (arr.length < count) {
    const n = Math.floor(Math.random() * max) + 1;
    if (!arr.includes(n)) arr.push(n);
  }
  return arr;
}

// Simule un batch de tirages
self.onmessage = function(e) {
  const { batchSize, numCount, starCount, numTickets, stopNumbers, stopStars } = e.data;
  const stats = {};
  for (let nb = 0; nb <= 5; nb++) for (let sb = 0; sb <= 2; sb++) stats[nb + "_" + sb] = 0;

  for (let i = 0; i < batchSize; i++) {
    const drawNumbers = randomSet(5, 50);
    const drawStars = randomSet(2, 12);

    for (let t = 0; t < numTickets; t++) {
      const ticketNumbers = randomSet(numCount, 50);
      const ticketStars = randomSet(starCount, 12);
      const nGood = ticketNumbers.filter(x => drawNumbers.includes(x)).length;
      const sGood = ticketStars.filter(x => drawStars.includes(x)).length;

      // Simple (tu peux ajouter les combinaisons complexes si tu veux)
      const key = Math.min(nGood, 5) + "_" + Math.min(sGood, 2);
      stats[key]++;
    }
  }

  self.postMessage({ stats });
};
