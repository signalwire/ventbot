require('dotenv').config();
const { RelayConsumer } = require('@signalwire/node')
let faye = require('faye');
let nlp = require('./lib/nlp');
const fetch = require('node-fetch');

const sendUpdate = async (uuid, msg) => {
  var url = process.env.UPDATES_URL;

  var request = {
    method: 'POST',
    cache: 'no-cache',
    headers: {
      'Content-Type': 'application/json',
    }
  }

  var payload = {
    uuid,
    msg
  }

  request.body = JSON.stringify(payload)
  const response = await fetch(process.env.UPDATES_URL, request);
}

const consumer = new RelayConsumer({
  project: process.env.SIGNALWIRE_PROJECT_KEY,
  token: process.env.SIGNALWIRE_TOKEN,
  contexts: [process.env.SIGNALWIRE_CONTEXT],

  wsClient: null,

  ready: async ({ client }) => {
    if (process.env.ENABLE_DEBUG) { 
      client.__logger.setLevel(client.__logger.levels.DEBUG)
    }
  },

  onIncomingCall: async (call) => {
    await call.answer()

    var uuid = call.device.params.to.split('@')[0];
    var prompt = 'Welcome. How can I help you today?';


    for (let step = 0; step < 10; step++) {
      if (call.ended) {
        break;
      }
      const params = {
        type: 'speech',
        text: prompt
      }
      const promptResult = await call.promptTTS(params)

      if (promptResult.successful) {
        console.log(promptResult.result)
        await nlp.analyzeString(promptResult.result)
        .then(async result => {
          var update = {
            heard: result.utterance,
            said: result.sentence,
            entities: result.entities.map(ent => ent.option),
            sentiment: result.sentiment.vote
          }
          console.log('before update')

          await sendUpdate(uuid, update);

          await call.playTTS({ text: result.sentence });
          prompt = nlp.getContinuation();
        })
      }
    }

    await call.playTTS({ text: 'It was great talking with you. Goodbye.' });
    await call.hangup();
  },
  
})

consumer.run()