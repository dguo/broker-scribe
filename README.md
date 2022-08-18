# BrokerScribe

[![CI status](https://github.com/dguo/broker-scribe/workflows/CI/badge.svg)](https://github.com/dguo/broker-scribe/actions?query=branch%3Amain)

BrokerScribe reads
[1099-B](https://www.investopedia.com/terms/f/form-1099-b.asp) transactions from
the CSV file provided by [Betterment](https://www.betterment.com/) and enters
them into [Intuit](https://www.intuit.com/)'s [TurboTax
Online](https://turbotax.intuit.com/) using
[Puppeteer](https://github.com/GoogleChrome/puppeteer).

Disclaimer: I have only used this script for my 2018 tax return, and I only
worked on it enough to get the job done. The code is not particularly polished,
and I expect that the TurboTax website will inevitably change in a way that
breaks the code (if it hasn't already).

Here's what it looks like at half speed:

![demo video](https://i.imgur.com/rSXtbz2.gif)

## Background

Betterment does have a [TurboTax
integration](https://www.betterment.com/resources/tax-software-importing/) to do
this work automatically, but TurboTax [doesn't
allow](https://turbotax.intuit.com/personal-taxes/compare/online/) importing
forms unless you have the Premier plan or above. So I wrote this script as a
workaround. I also wrote a [blog
post](https://www.dannyguo.com/blog/automating-turbotax-data-entry-with-puppeteer/)
on the experience.

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
