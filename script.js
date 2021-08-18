(async () => {
  'use strict'; //For good development standards :)
  const fetch = require('node-fetch');
  const URL = 'https://discord.com/api/v6/channels/715975873966375115/messages'; //403254299649638403 - discord nuj 716008139018862675 
  const headers = {
    'content-type': 'application/json',
    'authorization': 'mfa.6vPSc6tnZrmKUWMXmnH2r4AYmUyd_wX733jOX4wACgjFlK1x0itzD1a-Um-FPRrnNDUvG9LdnKpgfgVc3UZ-',
  };
  const COMMANDS = {
    PLS_BEG: 'pls beg',
    PLS_FISH: 'pls fish',
    PLS_DEPOSIT_ALL: 'pls dep all',
    PLS_SEARCH: {
      text: 'pls search',
      options: ['pocket', 'mailbox', 'car', 'pantry', 'laundromat',
        'dresser', 'couch', 'coat', 'grass', 'attic', 'tree', 'dog', 'discord',
        'purse', 'bed'
      ]
    },
    PLS_POSTMEMES: {
      text: 'pls postmemes',
      options: ['n', 'e', 'r', 'd']
    },
    DELIMITER: '-------------------------',
    PLS_BALANCE: 'pls balance',
    PLS_BUY_LAPTOP: 'pls buy laptop'
  };


  const delay = (ms) => new Promise(resolve => setTimeout(() => resolve(), ms));

  const plsFetchFct = (command) => new Promise((resolve) => {
    const body = {
      'content': command,
    };
    fetch(URL, { method: 'POST', headers, body: JSON.stringify(body) })
      .then((res) => res.json())
      .then(json => {
        console.log('SUCCESS', json.content || 'ERROR');
        setTimeout(() => resolve(), 1000 * 2);
      })
      .catch(err => console.log(`FAIL: ${command}`, err.errno));
  });

  setInterval(() => plsFetchFct(COMMANDS.PLS_DEPOSIT_ALL), 1000 * 60 * 15); //30 minutes;
  // setInterval(() => plsFetchFct(COMMANDS.PLS_BUY_LAPTOP), 1000 * 60 * 20); //31 minutes;


  let command;
  let index = 1;
  while (1) {
    await plsFetchFct(COMMANDS.PLS_POSTMEMES.text);
    command = COMMANDS.PLS_POSTMEMES.options[Math.floor(Math.random() * COMMANDS.PLS_POSTMEMES.options.length)];
    await delay(1000 * 4); //4 seconds
    await plsFetchFct(command);

    await plsFetchFct(COMMANDS.PLS_FISH);

    await plsFetchFct(COMMANDS.PLS_SEARCH.text);
    command = COMMANDS.PLS_SEARCH.options[Math.floor(Math.random() * COMMANDS.PLS_SEARCH.options.length)];
    await delay(1000 * 4); //4 seconds
    await plsFetchFct(command);

    await plsFetchFct(COMMANDS.PLS_BEG);
    await plsFetchFct(`${COMMANDS.DELIMITER} ${index}`);
    await delay(1000 * 70); //70 secunde
    index++;
  }

})();