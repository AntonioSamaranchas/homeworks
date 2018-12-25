'use strict';

const ws = new WebSocket('wss://neto-api.herokuapp.com/mouse');

showBubbles(ws);