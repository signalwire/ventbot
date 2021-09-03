# Deplying an NLU bot to the 5G edge with SignalWire and AWS Wavelength

Edge computing is a distributed system paradigm that involves deploying applications closer to their final users to improve latency and save bandwidth. The 5G networks across the world, with their enhanced computing resources, enable an entire class of applications that were not feasible before, and make the user experience incomparably better.

In this post, we will explore a prototype built by [SignalWire](https://signalwire.com) and deployed on the [AWS Wavelength](https://aws.amazon.com/wavelength/) network, powered by Verizon. Our goal will be to build and deploy a chatbot that uses natural language processing to listen to users and reassure them.

## What is AWS Wavelength?

Even 5G networks of today, which are up to 20 times faster than 4G, an application running on a mobile device incurs a latency of at least 100ms due to the many hops data has to travel through, in addition to normal overhead.

Features such as natural language processing and other machine learning require the lowest possible latency to feel natural and available, and studies have shown that quick activation and response times are the most important characteristic an user looks for.

Wavelength is an AWS infrastructure optimized for mobile edge computing on the 5G network. The unique feature of Wavelength is that it allows a company to move its services to the edge without re-architecting the entire application, as it permits running classic EC2 workloads closer to customers and almost without modifications.

It acts as an extension of a company's AWS Private Network, so that the edge-deployed services can share resources with the internal servers and databases. Wavelength abstracts away all the complexity of an edge deployment.

## What is SignalWire?

[SignalWire](https://signalwire.com) is the leading provider of real time communications APIs, founded by leading open source contributors to revolutionize communications. The company provides innovative APIs for voice, video and SMS, plus a rich set of reporting endpoints and SDKs in many languages.

SignalWire services include audio and video conferencing, speech recognition, text-to-speech, messaging and a video conferencing SDK.

In particular, this application utilizes the low latency speech recognition capabilities of the SignalWire Cloud API to provide the data to a local sentiment analysis service.

Leveraging the unique elastic cloud based deployment of SignalWire allowed us to put application nodes on a 5G node, reducing the latency and streamlining resources very efficiently.

## The demo application

Our application was built with the goal of measuring latency and round trip time of a WebRTC service.

To demonstrate the improvements, we opted for a simple natural language processing powered chatbot. It is written in Node.JS and consists of two main parts. 

The frontend is the actual web page you can see on the [demo page](https://sw-edge-bot.herokuapp.com/) and it utilizes SignalWire's WebRTC client in its v2 version. When an interaction is made with the bot, events are reported to the browser via a real time Websocket connection. Additionally, the network statistics used to measure the round trip, latency, jitter and packet loss are extracted from the browser API.

The backend is a SignalWire Relay consumer. [Relay](https://docs.signalwire.com/topics/relay/#relay-documentation) is a SignalWire innovation that controls a call via a Websocket connection, providing very fast interaction with next to no overhead. That is crucial so that the measurements taken during this test can be as accurate as possible, since the quick application response time does not affect the newtork interactions.

## Comparison data

TBA