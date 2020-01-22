// Return a random DNA base:
const returnRandBase = () => {
  const dnaBases = ['A', 'T', 'C', 'G']
  return dnaBases[Math.floor(Math.random() * 4)] 
}
// Returns a random single stand of DNA containing 15 bases:
const mockUpStrand = () => {
  const newStrand = []
  for (let i = 0; i < 15; i++) {
    newStrand.push(returnRandBase())
  }
  return newStrand
}
// Factory function:
pAequorFactory = (specimenNum, dna) => {
  return {
    specimenNum,
    dna,
    // Create mutation:
    mutate () {
      const randomIndex = Math.floor(Math.random() * this.dna.length);
      let newBase = returnRandBase();
      while (this.dna[randomIndex] === newBase) {
        newBase = returnRandBase();
      }
      this.dna[randomIndex] = newBase;
      return this.dna;
    },
    compareDNA (otherpAequor) {
      // Compare DNA and tally similar DNA bases:
      const similarities = this.dna.reduce((acc, curr, idx, arr) => {
     if (arr[idx] === otherpAequor[idx]) {
       return acc + 1;
     } else {
       return acc;
     }   
      }, 0);
     const percentOfDNAShared = (similarities / this.dna.length) * 100;
      // Show how much DNA is shared between 2 specimens:
      console.log(`${this.specimenNum} and ${otherpAequor.specimenNum} have ${percentOfDNAShared} percent of their DNA in common.`)
    },
    // Show if a specimen is likely to survive:
    willLikelySurvive () {
      const cOrG = this.dna.filter(base => base === 'C' || base === 'G');
      return cOrG.length / this.dna.length >= 0.6
    },
    // Find a complementary strand of DNA:
    findComplementaryStrand () {
      const complementaryStrand = [];
      for (let i = 0; i < 15; i++) {
        if (this.dna[i] === 'A') {
          complementaryStrand.push('T');
        }
        else if (this.dna[i] === 'T') {
          complementaryStrand.push('A');
        }
        else if (this.dna[i] === 'C') {
          complementaryStrand.push('G');
        }
        else if (this.dna[i] === 'G') {
          complementaryStrand.push('C');
        }
      }
      return complementaryStrand;
    }// End of complementary strand function.
  } // End of returned object.
} // End of factory function.
// Simulate 30 pAequor specimens likely to survive in their natural environment:
const survivingSpecimens = [];
let idCounter = 1;
while (survivingSpecimens.length < 30) {
  let newpAequor = pAequorFactory(idCounter, mockUpStrand());
  if (newpAequor.willLikelySurvive()) {
    survivingSpecimens.push(newpAequor);
  }
  idCounter++;
}
// Log the simulated specimens:
console.log(survivingSpecimens);
// Create and log an example instance of pAequor:
let pAequor1Bases = mockUpStrand();
let pAequor1 = pAequorFactory(1, pAequor1Bases);
console.log(pAequor1Bases);
console.log(pAequor1);
console.log(pAequor1.findComplementaryStrand())
// Find the two most related instaces of pAequor:
findMostRelated = () => {
  let maxPercent = 0;
  maxI = 0;
  maxJ = 0;
  for (let i = 0; i < survivingSpecimens.length; i++) {
    let instance1 = survivingSpecimens[i];
    for (let j = 0; j < survivingSpecimens.length; j++) {
      let instance2 = survivingSpecimens[j];
      if (i != j) {
        let sum = 0;
        for (let k = 0; k < instance1.dna.length; k++) {
          if (instance1.dna[k] === instance2.dna[k]) {
           sum += 1; 
          }
        }
        let percent = sum / instance1.dna.length * 100;
        if (percent > maxPercent) {
          maxPercent = percent;
          maxI = i;
          maxJ = j;
        } // Ends finding highest relation percentage.
      } // Ends comparison function.
    } // Ends second for-loop.
  } // Ends first for-loop.
console.log(`The two most related instances of pAequor are ${survivingSpecimens[maxI].specimenNum} and ${survivingSpecimens[maxJ].specimenNum}.`);
} // Ends findMostRelated function.
// Calls function to find two most related strands.
findMostRelated();
