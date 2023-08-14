import * as commandsCommon from './commands/common';
import * as commandsAuth from './commands/auth';
import * as commandsPost from './commands/post';
import * as commandsLogin from './commands/login';
import * as commandsSearch from './commands/search';

Cypress.Commands.addAll(commandsCommon);
Cypress.Commands.addAll(commandsAuth);
Cypress.Commands.addAll(commandsPost);
Cypress.Commands.addAll(commandsLogin);
Cypress.Commands.addAll(commandsSearch);
