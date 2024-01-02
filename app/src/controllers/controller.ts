import { Simulation, SimulationResults } from 'global';
import { SimulationOperator } from '@entities/simulation-operator';

export class Controller {
  constructor(
    private readonly SimulationOperatorEntity: SimulationOperator,
  ) {}

  public start(): void {
    process.stdin.on('data', async (chunk) => {
      const entriesArray = chunk.toString().split('\n').filter((entry) => entry !== '');
      const entriesJSON = JSON.parse(`[${entriesArray.join(',')}]`) as Array<Simulation>;

      const output: Array<SimulationResults> = [];
      entriesJSON.forEach((simulation) => {
        output.push(this.SimulationOperatorEntity.run(simulation));
      });

      output.forEach((line) => console.log(line));
      process.stdin.destroy();
    });
  }
}
