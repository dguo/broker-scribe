# BrokerScribe

BrokerScribe reads
[1099-B](https://www.investopedia.com/terms/f/form-1099-b.asp) transactions from
the CSV file provided by [Betterment](https://www.betterment.com/) and enters
them into [Intuit](https://www.intuit.com/)'s [TurboTax
Online](https://turbotax.intuit.com/) using
[Puppeteer](https://github.com/GoogleChrome/puppeteer).

Disclaimer: I used this for my 2018 tax return, but I only worked on the script
enough to get the job done. It's not particularly polished, and changes to the
TurboTax website might mean the script needs to be updated for future years.

Here's what it looks like at half speed:

![demo video](https://i.imgur.com/rSXtbz2.gif)

## Background

Betterment does have a [TurboTax
integration](https://www.betterment.com/resources/tax-software-importing/) to do
this work automatically, but TurboTax [doesn't
allow](https://turbotax.intuit.com/personal-taxes/compare/online/) importing
forms unless you have the Premier plan or above. I wrote this script because I
had hundreds of transactions to enter, but I didn't want to pay for the Premier
plan, in part because of Intuit's [lobbying
efforts](https://www.propublica.org/article/filing-taxes-could-be-free-simple-hr-block-intuit-lobbying-against-it)
against a simpler tax filing system.

## Requirements

* [Node](https://nodejs.org/) (at least v8 for [async/await](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Statements/async_function) support)
* [Yarn](https://yarnpkg.com/) (though [npm](https://www.npmjs.com/) would be fine too)

## Installation

* Clone the repo
* Run `yarn install` or `npm install`.

## Usage

* Download the 1099-B in CSV form from Betterment, and save it as
  `betterment-1099-b.csv` in the project directory
* Run `yarn start` or `npm start`

## License

MIT
