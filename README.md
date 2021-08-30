# ![sw_logo_logo-cd7faf335a23faa5e6056f14f1a981bca5fbd767cc13279e77c4a11bc2c8434d](https://user-images.githubusercontent.com/838618/158233575-139fdd52-22fc-4a9e-b113-a52a5639321c.png) &nbsp; VentBot 

This is VentBot, a SignalWire NLU bot that can _feel_ your joy or frustration. 

---
<img width="1327" alt="Screen Shot 2022-03-14 at 10 44 05 AM" src="https://user-images.githubusercontent.com/838618/158230606-8e0796b8-401e-45c9-b175-f2b1e684c00a.png">

---

## The Demo Application

VentBot was built to show the power and speed of a SignaWire WebRTC services deployed Near or Far Edge datacenters like AWS Wavelength and EC2.

To demonstrate the power and speed, we have opted for a simple natural language processing powered chatbot. It is written in Node.js and consists of two main parts. 

The frontend is a web page that utilizes SignalWire's [Javascript WebRTC client](https://developer.signalwire.com/client-sdk/docs/getting-started). When an interaction is made with the bot, events are reported to the browser via a real time Websocket connection. Network statistics used to measure the round trip, latency, jitter and packet loss are extracted from the browser API.

The backend is a SignalWire Relay consumer. [Relay](https://docs.signalwire.com/topics/relay/#relay-documentation) is the innoviate Websocket-based API that  SignalWire uses control calls, providing extremely responsive interaction with next-to-no overhead. That is crucial so that the measurements taken during this test can be as accurate as possible, since the quick application response time has less effect on the newtork interactions.

## Setup & Necessary Credentials

1. Copy the `env.example` file to `.env`.

2. In order to access the WebRTC services, your application will nee a SignalWire API Project Key & Token. 
 - Log into your [SignalWire Space](https://sigalwire.com/signin) or [sign up for an account.](https://signalwire.com/signup)
 - Put the `Project ID` and `Token` in the `.env` file as `SIGNALWIRE_PROJECT_KEY` and `SIGNALWIRE_TOKEN`.
 - Use your Space URL (e.g. your-space.signalwire.com) in `SIGNALWIRE_SPACE`.
 - If you've just first signed up, your account will be in Trial mode. You can find more information [on the Trial Mode resource page](https://signalwire.com/resources/getting-started/trial-mode).

3. To use the application, you will need to setup a SignalWire SIP Domain Application.
 - On your SignalWire Dashboard, go to SIP -> Domain Apps and click `Create a Domain App`
 - You can name the Relay context whatever you want - put that same name into the `.env` as `SIGNALWIRE_CONTEXT`. 
 - Add the URL to the SIP Domain Application as `SIP_APP` to your configuration.

4. Specify `UPDATES_URL` to allow for the NLU results to be streamed to the browser. If you are running via Docker-Compose, it should be set to `http://web:5000/updates`.

Set `ENABLE_DEBUG` to `true` to get extra console output.

## Running the application

There is a sample `docker-compose` setup provided, which is the recommended way to run the application. 

Once you have `.env` set up, just run `docker-compose up` and go to [http://localhost:5000](http://localhost:5000).

## Documentation links

[Relay Documentation](https://docs.signalwire.com/topics/relay/#relay-documentation)

[Getting started with Relay](https://github.com/signalwire/signalwire-guides/blob/master/intros/getting_started_relay.md)

[Relay Docker Images](https://github.com/signalwire/signalwire-relay-docker)

[SignalWire 101](https://signalwire.com/resources/getting-started/signalwire-101)

Copyright 2022, [SignalWire Inc.](https://signalwire.com)