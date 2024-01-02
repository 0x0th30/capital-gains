import { Controller } from '@controllers/controller';

export const ControllerMock = {
  start: jest.spyOn(Controller.prototype, 'start'),
  handleInput: jest.spyOn((Controller as any).prototype, 'handleInput'),
  runSimulations: jest.spyOn((Controller as any).prototype, 'runSimulations'),
  showSimulationsResults: jest.spyOn(
    (Controller as any).prototype,
    'showSimulationsResults',
  ),
  stdinCallback: jest.spyOn((Controller as any).prototype, 'stdinCallback'),
};
