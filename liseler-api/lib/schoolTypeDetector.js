const capitalize = require('./capitalize');

const TYPE_MAP = {
  Lisesi: 'lise',
  'İmam Hatip Lisesi': 'imam_hatip',
  'Anadolu Lisesi': 'anadolu_lisesi',
  'Fen Lisesi': 'fen_lisesi',
  İlkokulu: 'ilkokul',
  Ortaokulu: 'ortaokul',
  Anaokulu: 'anaokul',
  'Mesleki Ve Teknik Anadolu Lisesi': 'meslek_lisesi',
  'Uygulama Merkezi': 'uygulama_merkezi',
};

const schoolTypeDetector = name => {
  let type = 'diger';

  Object.keys(TYPE_MAP).forEach(item => {
    const regex = new RegExp(item, 'gi');

    if (regex.test(capitalize(name))) {
      type = TYPE_MAP[item];
    }
  });

  return type;
};

module.exports = schoolTypeDetector;
