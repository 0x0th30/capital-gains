import { Simulation, SimulationResults } from 'global';
import { SimulationOperator } from '@entities/simulation-operator';

export class Controller {
  constructor(
    private readonly SimulationOperatorEntity: SimulationOperator,
  ) {}

  public start(): void {
    process.stdin.on('data', this.stdinCallback.bind(this));
  }

  private handleInput(chunk: Buffer): Array<Simulation> {
    const entriesArray = chunk.toString().split('\n').filter((entry) => entry !== '');
    const entriesJSON = JSON.parse(`[${entriesArray.join(',')}]`) as Array<Simulation>;
    return entriesJSON;
  }

  private runSimulations(simulations: Array<Simulation>): Array<SimulationResults> {
    const simulationResults: Array<SimulationResults> = [];

    simulations.forEach((simulation) => {
      const simulationResult = this.SimulationOperatorEntity.run(simulation);
      simulationResults.push(simulationResult);
    });

    return simulationResults;
  }

  private showSimulationsResults(simulationResults: Array<SimulationResults>): void {
    simulationResults.forEach((line) => console.log(line));
  }

  private stdinCallback(chunk: Buffer): void {
    const input = this.handleInput(chunk);
    const output = this.runSimulations(input);

    this.showSimulationsResults(output);

    process.stdin.destroy();
  }
}
