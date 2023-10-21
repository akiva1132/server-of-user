"use strict";
const fet = require('node-fetch');
fetch('https://api-m.sandbox.paypal.com/v1/notifications/webhooks', {
    method: 'POST',
    headers: {
        'Content-Type': 'application/json',
        'Authorization': 'Bearer ECvJ_yBNz_UfMmCvWEbT_2ZWXdzbFFQZ-1Y5K2NGgeHn'
    },
    body: JSON.stringify({ "url": "https://example.com/example_webhook", "event_types": [{ "name": "PAYMENT.AUTHORIZATION.CREATED" }, { "name": "PAYMENT.AUTHORIZATION.VOIDED" }] })
});
