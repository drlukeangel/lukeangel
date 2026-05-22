---
title: "Angular 2 CLI moves from SystemJS to Webpack"
date: 2016-11-09T08:48:48
category: tools
tags: ["angular", "developer", "front-end"]
excerpt: "The Modern JavaScript ecosystem has reached the point of maturity where some projects are becoming the de-facto standard. Build system veterans such as Grunt and Gulp were first challenged by Brows…"
wpCategory: "developers"
wpUrl: "/developers/angular/angular-2-cli-moves-from-systemjs-to-webpack/"
cover: "/blog/migrated/2016/11/110916_1644_Angular2CLI1.jpg"
coverAlt: "Angular 2 CLI moves from SystemJS to Webpack"
---

~~The Modern JavaScript ecosystem has reached the point of maturity where some projects are becoming the de-facto standard. Build system veterans such as Grunt and Gulp were first challenged by Browserify to packaging files for distribution, but now WebPack is the norm. The Angular 2 CLI curiously used the SystemJS for loading modules.~~**
~~~~

[~~Angular 2 CLI~~](https://cli.angular.io/)~~ is an official project from the [Angular 2](http://angular.io/) development team. It aims to help developers waste less time in setting up a project before getting stated. This standard scaffolding used a tool call [SystemJS](https://github.com/systemjs/systemjs), which is “a universal dynamic module loader” capable of loading different JavaScript formats (ES6, AMD, CommonJS).~~

~~Edging towards the 1.0 release, the Angular 2 CLI team announced [a move to Webpack over SystemJS](https://github.com/angular/angular-cli/blob/master/CHANGELOG.md) for loading JavaScript. Work still continues, but this is another move towards a more unified JavaScript ecosystem. The recently released [React project scaffolding tool](http://react-etc.net/entry/react-gets-official-boilerplate-scaffolding-through-react-cli), influenced by the [Ember CLI](https://ember-cli.com/) tool also uses [Webpack](https://webpack.github.io/).~~

~~Just like the NPM package manager for the Node.js server environment is now the default for all JavaScript Packaging, it looks like Webpack is cementing its position as the de-facto module packaging tool. All of this means that in your [Decoupled CMS projects](http://symfony-cms.net/decoupling-headless-cms), for example, you can spend more time on productive work rather than setting up or learning new tooling.~~

~~The transition from SystemJS to Webpack is still work in progress, but the team is looking to make the change as simple as possible:~~**
~~~~

~~*We want to make sure it’s ready. That’s why we need your help. Basically, things should work. Build and Serve should work. Also, testing and E2E should too. To put it short, everything should work as it was before. But we’re not certain! Test every commands you can think of. Use your normal work flows. We need you to test your projects and file issues about it.**
*~~

~~Developers already using Angular 2 CLI should take a look at[ the migration pull request](https://github.com/angular/angular-cli/pull/1456). In any case if you’re looking to start new [Angular 2](https://www.symfony.fi/entry/introduction-to-angular-2-for-symfony-developers) projects using the CLI you should probably already start using the Webpack powered beta as that will spare you from migration in the future~~

~~**
~~**
~~~~
