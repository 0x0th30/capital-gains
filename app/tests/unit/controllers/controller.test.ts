import { Controller } from '@controllers/controller';
import { SimulationOperator } from '@entities/simulation-operator';
import { SimulationOperatorMock } from '@tests/unit/entities/simulation-operator.mock';
import { ControllerMock } from './controller.mock';

const ControllerSUT = new Controller(
  SimulationOperatorMock as unknown as SimulationOperator,
);

describe('Controller class', () => {
  describe('(private) handleInput method', () => {
    it('should parse single-line buffer into JSON and return it', () => {
      const stringifiedObject = '[{"foo": "bar"}]';
      const chunk = Buffer.from(stringifiedObject);

      const expectedHandledInput = [[{ foo: 'bar' }]];

      const handledInput = (ControllerSUT as any).handleInput(chunk);

      expect(handledInput).toEqual(expectedHandledInput);
    });
    it('should parse multi-line buffer into JSON and return it', () => {
      const stringifiedObject = '[{"foo": "bar"}]\n[{"foo": "bar"}]';
      const chunk = Buffer.from(stringifiedObject);

      const expectedHandledInput = [
        [{ foo: 'bar' }], [{ foo: 'bar' }],
      ];

      const handledInput = (ControllerSUT as any).handleInput(chunk);

      expect(handledInput).toEqual(expectedHandledInput);
    });
  });
  describe('(private) runSimulations method', () => {
    it('should call "SimulationOperatorEntity.run()" to each received simulation', () => {
      const simulations = [
        [{ foo: 'bar' }], [{ foo: 'bar' }],
      ];

      SimulationOperatorMock.run.mockReturnValueOnce(null as any);
      SimulationOperatorMock.run.mockReturnValueOnce(null as any);

      (ControllerSUT as any).runSimulations(simulations);

      expect(SimulationOperatorMock.run).toHaveBeenCalledTimes(2);
    });
    it('should return all simulation results', () => {
      const simulations = [
        [{ foo: 'bar' }], [{ foo: 'bar' }],
      ];
      const simulationResult = [{ tax: 0 }];
      const expectedSimulationResults = [[{ tax: 0 }], [{ tax: 0 }]];

      SimulationOperatorMock.run.mockReturnValueOnce(simulationResult);
      SimulationOperatorMock.run.mockReturnValueOnce(simulationResult);

      const simulationResults = (ControllerSUT as any).runSimulations(simulations);
      expect(simulationResults).toEqual(expectedSimulationResults);
    });
  });
  describe('(private) showSimulationsResults method', () => {
    it('should call "console.log()" to show results of each simulation', () => {
      const ConsoleLogMock = jest.spyOn(global.console, 'log');

      const simulationResults = [[{ tax: 0 }], [{ tax: 0 }]];

      (ControllerSUT as any).showSimulationsResults(simulationResults);

      expect(ConsoleLogMock).toHaveBeenCalledTimes(2);
    });
  });
  describe('(private) stdinCallback method', () => {
    it('should call ".handleInput()" method', () => {
      const chunk = Buffer.from('foo');

      ControllerMock.handleInput.mockReturnValueOnce(null);
      ControllerMock.runSimulations.mockReturnValueOnce(null);
      ControllerMock.showSimulationsResults.mockReturnValueOnce(null);

      (ControllerSUT as any).stdinCallback(chunk);

      expect(ControllerMock.handleInput).toHaveBeenCalled();
    });
    it('should call ".handleInput()" method using provided buffer', () => {
      const chunk = Buffer.from('foo');

      ControllerMock.handleInput.mockReturnValueOnce(null);
      ControllerMock.runSimulations.mockReturnValueOnce(null);
      ControllerMock.showSimulationsResults.mockReturnValueOnce(null);

      (ControllerSUT as any).stdinCallback(chunk);

      expect(ControllerMock.handleInput).toHaveBeenCalledWith(chunk);
    });
    it('should call ".runSimulations()" method', () => {
      const chunk = Buffer.from('foo');

      ControllerMock.handleInput.mockReturnValueOnce(null);
      ControllerMock.runSimulations.mockReturnValueOnce(null);
      ControllerMock.showSimulationsResults.mockReturnValueOnce(null);

      (ControllerSUT as any).stdinCallback(chunk);

      expect(ControllerMock.runSimulations).toHaveBeenCalled();
    });
    it('should call ".runSimulations()" method using handled chunk', () => {
      const chunk = Buffer.from('foo');

      const handledInput = [
        [{ operation: 'buy', 'unit-cost': 10.00, quantity: 10000 }],
      ];

      ControllerMock.handleInput.mockReturnValueOnce(handledInput);
      ControllerMock.runSimulations.mockReturnValueOnce(null);
      ControllerMock.showSimulationsResults.mockReturnValueOnce(null);

      (ControllerSUT as any).stdinCallback(chunk);

      expect(ControllerMock.runSimulations).toHaveBeenCalledWith(handledInput);
    });
    it('should call ".showSimulationsResults()" method', () => {
      const chunk = Buffer.from('foo');

      ControllerMock.handleInput.mockReturnValueOnce(null);
      ControllerMock.runSimulations.mockReturnValueOnce(null);
      ControllerMock.showSimulationsResults.mockReturnValueOnce(null);

      (ControllerSUT as any).stdinCallback(chunk);

      expect(ControllerMock.showSimulationsResults).toHaveBeenCalled();
    });
    it('should call ".showSimulationsResults()" method using correct data', () => {
      const chunk = Buffer.from('foo');

      const simulationsResults = [[{ tax: 0 }]];

      ControllerMock.handleInput.mockReturnValueOnce(null);
      ControllerMock.runSimulations.mockReturnValueOnce(simulationsResults);
      ControllerMock.showSimulationsResults.mockReturnValueOnce(null);

      (ControllerSUT as any).stdinCallback(chunk);

      expect(ControllerMock.showSimulationsResults)
        .toHaveBeenCalledWith(simulationsResults);
    });
  });
});
