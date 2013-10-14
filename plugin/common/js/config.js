blippex.define('blippex.config', {
  'pubkey': '-----BEGIN PUBLIC KEY-----\
MIICIjANBgkqhkiG9w0BAQEFAAOCAg8AMIICCgKCAgEAyrDV7bHJ5t8iqqiqG0F8\
LBoBfB+cRF9v3pDrhcD/SxLz5jqprsByQXdFbhe1r7Ir6KbwVufIRl5qbAJljcpd\
dFNxiSx7LaTCzunwRz5HeJrYjtQUwzqNjcBTJSAi9lteJ1i90HtdZd5boE3WaoEU\
YZMu1TBpmSZ4mWMNpV/6u2kAGlXHf9s5iNoMmDfvOZxzovRgOEiOY/o94ZDCFN+3\
0WT+fpIPdhAwcPqyyXdh8Kr7fHn9T12PV4h9eqcXo1KVbDkELmxj4rPJNCqd1lix\
y6h3iKDdWgb4VzXHc07tgVSWQVRHsgJJUKD3jyzl33xI6hS3OMEFjZ9/AJ6tfWuV\
8uqeybqe64CJgfw/GDD+mnKpZRJ+HSH18Qob3Mkk7dZdUUUrOp84YE5SxVHy0TV2\
7yFm6Gi0Sca167psNDUEbZDnicR4JcqT4Kq/dACtxEKhDrjRjNodzAi+ij5e/n1Z\
lHih5W+lnj9TnnxNayhpX9PT8rG84WLzdqTwa4wBShfA8CyAKdayj87k7ymvTOkv\
LX6b6FhdrAVJ1AndTSivALgwkejBSpFmBEm8QlNzKIqpPmLqW/goHU3ULUJHWz/Q\
9VmES5tF5CEW3mZ7M14R9GWcBjfeU7CQ8Cih3BkMTnLR6nSVNqol7R0caofUVRBZ\
OfnYZ2Ljfah2jwaGtVZTqpECAwEAAQ==\
-----END PUBLIC KEY-----',
  'p2p': {
    'host':   'p2p.blippex.org',
    'port':   9001
  },
  'announce': 10 * 60 * 1000,
  'api': {
    'upload': 'https://api.blippex.org/add/',
    'search': 'https://api.blippex.org/search?limit=6&q=',
    'p2p':    'https://api.blippex.org/p2p/'
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
    'timedisabled': 0,
    'timeout':      2,
    'disabled':     30 * 60 * 1000
  },
  'settings': {
    'timespentvalues':  '',
    'https':            true,
    'google':           true,
    'peerid':           '',
    'p2p':              true
  },
  'plugin': {
    'debugmode':  true
  }
});