#!/usr/bin/env node
// Rename the 15 Angular architecture diagrams (from the official Angular docs)
// to descriptive filenames and write contextual alts based on the post section.

import { readFileSync, writeFileSync, renameSync, existsSync } from 'node:fs';
import { join } from 'node:path';

const imageDir = 'public/blog/migrated/2016/12';
const post = 'src/content/blog/angular-architecture-overview-the-building-blocks-part-1.md';

const mapping = [
  ['122916_2125_AngularArch1.png', 'angular-architecture-overview-diagram.png',
   'Angular architecture overview diagram — Module, Component, Template, Directive, Metadata, Service, and Injector connected by property and event binding'],
  ['122916_2125_AngularArch2.png', 'angular-modules-component-box.png',
   'Angular Module containing a Component — illustration of an NgModule declaring the components and services that belong to it'],
  ['122916_2125_AngularArch3.png', 'angular-libraries-module-pieces.png',
   'Angular libraries as collections of modules — Component, Service, Value, and Function pieces shown as small dashed module boxes'],
  ['122916_2125_AngularArch4.png', 'angular-hero-component-superhero-rendering.png',
   "Hero Component arrow rendering into a superhero illustration — showing how an Angular @Component class produces a rendered UI piece"],
  ['122916_2125_AngularArch5.png', 'angular-template-html-component-view.png',
   "Angular Template — HTML markup with Angular bindings that defines the component's view"],
  ['122916_2125_AngularArch6.png', 'angular-hero-list-component-template.png',
   "HeroListComponent template snippet — list of heroes rendered with *ngFor and Angular event handlers"],
  ['122916_2125_AngularArch7.png', 'angular-hero-list-component-class.png',
   "HeroListComponent TypeScript class — properties, constructor, and methods that the template binds to"],
  ['122916_2125_AngularArch8.png', 'angular-hero-list-metadata-decorator.png',
   "@Component decorator metadata for HeroListComponent — selector, templateUrl, providers connecting class to template"],
  ['122916_2125_AngularArch9.png', 'angular-data-binding-types.png',
   "Angular data binding types — interpolation, property binding, event binding, and two-way binding shown side by side"],
  ['122916_2125_AngularArch10.png', 'angular-data-binding-syntax-examples.png',
   "Angular data binding syntax examples — {{ }} interpolation, [property], (event), and [(ngModel)] two-way binding notation"],
  ['122916_2125_AngularArch11.png', 'angular-data-binding-component-template.png',
   "Data binding flow between an Angular Component class and its Template — arrows showing both directions of property and event binding"],
  ['122916_2125_AngularArch12.png', 'angular-directives-structural-attribute.png',
   "Angular Directives — structural directives like *ngFor and *ngIf that change DOM layout, plus attribute directives that change appearance"],
  ['122916_2125_AngularArch13.png', 'angular-service-class-example.png',
   "Angular Service class — a TypeScript class with a narrow purpose like fetching data or logging, injected into components"],
  ['122916_2125_AngularArch14.png', 'angular-dependency-injection-injector-service.png',
   "Angular Dependency Injection — Injector providing a Service instance to a Component constructor via its provider configuration"],
  ['122916_2125_AngularArch15.png', 'angular-providers-array-component-decorator.png',
   "Angular @Component providers array — telling the injector how to construct a service for a component's dependency tree"],
];

let renamed = 0;
for (const [oldName, newName] of mapping) {
  const oldPath = join(imageDir, oldName);
  const newPath = join(imageDir, newName);
  if (!existsSync(oldPath)) { console.warn(`MISSING: ${oldName}`); continue; }
  if (existsSync(newPath)) { console.warn(`SKIP target exists: ${newName}`); continue; }
  renameSync(oldPath, newPath);
  renamed++;
}
console.log(`Renamed ${renamed}/${mapping.length} files`);

let md = readFileSync(post, 'utf8');
for (const [oldName, newName, alt] of mapping) {
  const oldUrl = `/blog/migrated/2016/12/${oldName}`;
  const newUrl = `/blog/migrated/2016/12/${newName}`;
  const re = new RegExp(`!\\[[^\\]]*\\]\\(${oldUrl.replace(/[.*+?^${}()|[\\]\\\\]/g, '\\\\$&')}\\)`, 'g');
  md = md.replace(re, `![${alt}](${newUrl})`);
  md = md.split(oldUrl).join(newUrl);
}
writeFileSync(post, md, 'utf8');
console.log('Markdown rewritten.');
