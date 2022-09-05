import * as Handlebars from 'handlebars';
import helpers from './helpers';
import { PartialTemplate } from '../types'

let firstRun = true;

function registerHelpers() {
    helpers.forEach(({name, helperFn}) => Handlebars.registerHelper(name, helperFn));
}

export function registerPartials(partials: PartialTemplate[]) {
  if (firstRun) {
    registerHelpers();
    firstRun = false;
  }
  partials.forEach(({name, template}) => {
    Handlebars.registerPartial(name, template);
  });
}

export function compileTemplate(template: string): HandlebarsTemplateDelegate<any> {
  return Handlebars.compile(template);
}
