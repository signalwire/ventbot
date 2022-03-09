# VentBot

This is VentBot, a bot you can vent to.

## The demo application

Our application was built with the goal of measuring latency and round trip time of a WebRTC service.

To demonstrate the improvements, we opted for a simple natural language processing powered chatbot. It is written in Node.JS and consists of two main parts. 

The frontend is the actual web page you can see on the [demo page](https://sw-edge-bot.herokuapp.com/) and it utilizes SignalWire's WebRTC client in its v2 version. When an interaction is made with the bot, events are reported to the browser via a real time Websocket connection. Additionally, the network statistics used to measure the round trip, latency, jitter and packet loss are extracted from the browser API.

The backend is a SignalWire Relay consumer. [Relay](https://docs.signalwire.com/topics/relay/#relay-documentation) is a SignalWire innovation that controls a call via a Websocket connection, providing very fast interaction with next to no overhead. That is crucial so that the measurements taken during this test can be as accurate as possible, since the quick application response time does not affect the newtork interactions.

## Necessary credentials

Start by copying the `env.example` file to `.env`.

The application needs a SignalWire API token. You can sign up [here](https://signalwire.com/signup), then put the Project ID and Token in the `.env` file as `SIGNALWIRE_PROJECT_KEY` and `SIGNALWIRE_PROJECT_KEY`.
Put your Space URL in `SIGNALWIRE_SPACE`.

Your account will be start in trial mode, which you can exit by making a manual top up of $5.00. You can find more information [on the Trial Mode resource page](https://signalwire.com/resources/getting-started/trial-mode).

To use the application, you will need a SignalWire SIP Domain Application pointed at the Relay context you specify in the `.env` as `SIGNALWIRE_CONTEXT`. That is found within the `Settings` of each phone number on the dashboard. You can refer to our [SignalWire 101](https://signalwire.com/resources/getting-started/signalwire-101) and [SignalWire SIP](https://signalwire.com/resources/guides/sip) guides for more information. Add the URL to the SIP Domain Application as `SIP_APP` to your configuration.

Finally, specify `UPDATES_URL` to allow for the NLU results to be streamed to the browser. If you are running on Docker, it should be set to `http://web:5000/updates`.

Set `ENABLE_DEBUG` to `true` to get extra console output.

## Running the application

There is a sample `docker-compose` setup provided, which is the recommended way to run the application. Once you have `.env` set up, just run `docker-compose up` and go to [http://localhost:5000](http://localhost:5000).

## Documentation links

[Relay Documentation](https://docs.signalwire.com/topics/relay/#relay-documentation)

[Getting started with Relay](https://github.com/signalwire/signalwire-guides/blob/master/intros/getting_started_relay.md)

[Relay Docker Images](https://github.com/signalwire/signalwire-relay-docker)

[SignalWire 101](https://signalwire.com/resources/getting-started/signalwire-101)

Copyright 2022, [SignalWire Inc.](https://signalwire.com)