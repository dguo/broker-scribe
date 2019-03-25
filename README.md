# BrokerScribe

This project is a work in progress and not suitable for public use.

BrokerScribe reads 1099-B transactions from the CSV file provided by Betterment
and enters them into TurboTax Online using
[Puppeteer](https://github.com/GoogleChrome/puppeteer).

Betterment does have a [TurboTax
integration](https://www.betterment.com/resources/tax-software-importing/) to
do this automatically, but TurboTax [doesn't
allow](https://turbotax.intuit.com/personal-taxes/compare/online/) importing
forms unless you have the Premier plan or above.
