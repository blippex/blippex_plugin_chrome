blippex.define('blippex.config', {
  'api': {
    'upload': 'https://api.blippex.org/add/'
  },
  'status': {
    'na':               0x00,
    'ok':               0x01,
    'processed':        0x02,
    'skip':             0x07,
    'uploading':        0x09,
    'unloading':        0x10,
    'https':            0x03
  },
  'values': {
    'timeout': 2
  },
  'settings': {
    'timespentvalues':  ''
  },
  'plugin': {
    'debugmode':  true
  }
});