const COMMAND_DELAY = 1000;
const commands = ['click'];


for (const command of commands) {
  Cypress.Commands.overwrite(command, (originalFn, ...args) => {
      const origVal = originalFn(...args);

      return new Promise((resolve) => {
          setTimeout(() => {
              resolve(origVal);
          }, COMMAND_DELAY);
      });
  });
}; 
