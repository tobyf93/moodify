// https://kinesiscem.files.wordpress.com/2015/09/moods.jpg
const _moods = [
  {
    name: 'distressed',
    valence: 0.15,
    energy: 0.78
  },
  {
    name: 'frustrated',
    valence: 0.3,
    energy: 0.69
  },
  {
    name: 'angry',
    valence: 0.29,
    energy: 0.89
  },
  {
    name: 'annoyed',
    valence: 0.28,
    energy: 0.83
  },
  {
    name: 'alarmed',
    valence: 0.46,
    energy: 0.95
  },
  {
    name: 'tense',
    valence: 0.49,
    energy: 0.93
  },
  {
    name: 'afraid',
    valence: 0.45,
    energy: 0.89
  },
  {
    name: 'aroused',
    valence: 0.68,
    energy: 0.96
  },
  {
    name: 'astonished',
    valence: 0.71,
    energy: 0.94
  },
  {
    name: 'excited',
    valence: 0.85,
    energy: 0.86
  },
  {
    name: 'delighted',
    valence: 0.94,
    energy: 0.68
  },
  {
    name: 'happy',
    valence: 0.95,
    energy: 0.58
  },
  {
    name: 'pleased',
    valence: 0.94,
    energy: 0.45
  },
  {
    name: 'glad',
    valence: 0.98,
    energy: 0.42
  },
  {
    name: 'content',
    valence: 0.91,
    energy: 0.23
  },
  {
    name: 'at ease',
    valence: 0.88,
    energy: 0.2
  },
  {
    name: 'satisfied',
    valence: 0.88,
    energy: 0.18
  },
  {
    name: 'relaxed',
    valence: 0.86,
    energy: 0.17
  },
  {
    name: 'sleepy',
    valence: 0.01,
    energy: 0.01
  },
  {
    name: 'miserable',
    valence: 0.04,
    energy: 0.43
  },
  {
    name: 'sad',
    valence: 0.09,
    energy: 0.3
  },
  {
    name: 'gloomy',
    valence: 0.06,
    energy: 0.27
  },
  {
    name: 'depressed',
    valence: 0.09,
    energy: 0.27
  },
  {
    name: 'bored',
    valence: 0.33,
    energy: 0.1
  },
  {
    name: 'droopy',
    valence: 0.34,
    energy: 0.04
  },
  {
    name: 'tired',
    valence: 0.49,
    energy: 0.01
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
