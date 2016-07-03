const _moods = [
  {
    name: 'light',
    valence: 0.500,
    energy: 0.500
  },
  {
    name: 'exciting',
    valence: 0.691,
    energy: 0.962
  },
  {
    name: 'happy',
    valence: 0.962,
    energy: 0.691
  },
  {
    name: 'chilled',
    valence: 0.962,
    energy: 0.309
  },
  {
    name: 'peaceful',
    valence: 0.591,
    energy: 0.038
  },
  {
    name: 'boring',
    valence: 0.309,
    energy: 0.038
  },
  {
    name: 'depressing',
    valence: 0.038,
    energy: 0.309
  },
  {
    name: 'stressful',
    valence: 0.038,
    energy: 0.691
  },
  {
    name: 'aggressive',
    valence: 0.309,
    energy: 0.962
  }
];

function getMood(valence, energy) {
  var shortestDistance = 999;
  var result;

  if (!valence || !energy) {
    return 'Unknown';
  }

  _moods.forEach((mood) => {
    var valence2 = mood.valence;
    var energy2 = mood.energy;
    var innerEquation = Math.pow((valence2 - valence), 2) + Math.pow((energy2 - energy), 2);
    var distance = Math.sqrt(innerEquation);

    if (distance < shortestDistance) {
      shortestDistance = distance;
      result = mood.name;
    }
  });

  return result;
}

module.exports = getMood;
