---
title: What is the Internet of Things?
date: '2018-10-29T22:12:51.142Z'
course: Internet of Things
draft: false
---

Like all heavily hyped buzzwords the question of what the IoT actually is can't
be answered in a short way. The topic ranges from embedded programs running on
extremely restricted hardware, to machine learning algorithms running on large
server clusters. And in between there is a whole industry searching for the
right way to standardize management of entities in this growing network (
[RAMI 4.0 initiative (german)](https://industrie40.vdma.org/viewer/-/v2article/render/15557415)).

From a software developer's perspective I see these main areas:

1. Programs running on the edge collecting data
2. Servers digesting the information
3. Actors available on the edge triggered by (outside-)conditions
4. Platforms providing tools to analyze the collected data

Each area on its own can be arbitrarily complex, but the complexity in IoT comes
almost always from large scale. Starting with a very small scaled system on the
other hand is quite easy so getting a foot in the door is not as difficult as
you might think. Platforms like Arduino or Raspberry Pi have opened the field of
programmable electronics to the masses. Also it's easier than ever to run
programs in the cloud so there is not much left to be an active part of the
internet of things.

This course will focus on introductions to all these topics, the "thing" in the
examples and exercises will be a Raspberry Pi zero. So the hardware is not very
restricted and can even run programs written in JavaScript. And it is possible
to remote control the small computer over the network with ssh.

### Tasks

- Install a code editor, recommended:
  [Visual Studio Code](https://code.visualstudio.com/download)
- Install [Node.js](https://nodejs.org/en/) to run and develop JavaScript
  programs
- If you are on Windows you might need to get an ssh client
  [PuTTY](https://www.putty.org/) is the most used one. (Windows 10 is equipped
  with a built in solution)
