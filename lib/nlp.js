const { SentimentAnalyzer, NlpManager } = require('node-nlp');

const manager = new NlpManager({ ner: { builtins: [] }, forceNER: true });
manager.addNamedEntityText(
  'subject',
  'phone',
  ['en'],
  ['iphone', 'phone', 'cellphone'],
);
manager.addNamedEntityText(
  'subject',
  'plan',
  ['en'],
  ['plan', 'payment', 'subscription'],
);
manager.addLanguage(['en']);
manager.train();

const sentences = {
  negativePhrases: [
    'That is unfortunate.',
    'I will make sure that is addressed.'
  ],

  positivePhrases: [
    'That is good.',
    'I like it when people are happy.'
  ],

  neutralPhrases: [
    'That is interesting.',
    'Thanks for your input.'
  ],

  continuationPhrases: [
    'Please tell me more.',
    'Is there anything more you would like to discuss?'
  ],

  negativeAbout: [
    'I am sorry to hear you have issues with your',
    'I apologize if you are unhappy with your'
  ],

  positiveAbout: [
    'I happy to hear you like your',
    'It is fantastic that you like your'
  ],

  neutralAbout: [
    'Thank you for your input about your',
    'It is interesting to hear about your'
  ]
}

function randomElement(items) {
  return items[Math.floor(Math.random() * items.length)];
}

function analyzeString(utterance) {
  return manager.process(
    utterance
  ).then(nlpResult => {
    let result = nlpResult;
    var sentiment = nlpResult.sentiment.vote;
    if (nlpResult.entities.length === 0) {
      result.sentence = randomElement(sentences[sentiment + 'Phrases'])
    } else {
      result.sentence = randomElement(sentences[sentiment + 'About']) + ' ' + nlpResult.entities[0].option
    }
    return result;
  })
}

function getContinuation() {
  return randomElement(sentences.continuationPhrases)
}

module.exports =  { analyzeString, getContinuation };