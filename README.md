# Capital Gains CLI
CLI application for simulating buying/selling stocks and calculating taxes for each scenario.

### Build App
The application was built using a Docker infrastructure. To build the Docker image, navigate to the root directory and run the following command:

```bash
$ docker build -t capital-gains -f docker/Dockerfile.app.prod .
```

If you prefer to build it without Docker (using yarn), navigate to the `app/` folder and run the following commands:

```bash
$ yarn install
$ yarn build
```

### Running App
If you chose the Dockerized build process, you have two ways to run the app. 

Interactive mode, where you manually input the simulations:

```bash
$ docker run -it capital-gains:latest
```

Or, using input redirection with your simulations stored in a **.txt** file:

```bash
$ docker run -i capital-gains:latest < file.txt
```

Here is an example of a valid **file.txt**:

```txt
1    [{"operation":"buy", "unit-cost":10.00, "quantity": 100}, {"operation":"sell", "unit-cost":15.00, "quantity": 50}]
2    [{"operation":"buy", "unit-cost":10.00, "quantity": 10000}, {"operation":"sell", "unit-cost":20.00, "quantity": 5000}]
3    ...
4    ...
```

If you built it using yarn, navigate to the `app/` folder and run the following command (supports input redirection):

```bash
$ yarn start:prod
```

### Running Tests
To run unit and integration test suites, navigate to the `app/` folder and run the following commands (just replace "quiet" by "verbose" to get execution details):

```bash
$ yarn install
$ yarn test:unit:quiet
$ yarn test:integration:quiet
```
Note that running unit tests the coverage report will be auto generated and can be located inside `app/` folder.

### Notes
To avoid errors and frustration, consider the following important points:

- Each simulation consists of an array of operation objects, e.g., `[{"operation":"buy", "unit-cost":10.00, "quantity": 100}]`.
- Each simulation should occupy one line in the **file.txt**.
- To run multiple simulations, use input redirection or enter them via echo, using **\n** to separate each simulation. For example:

```bash
$ echo '[{"operation":"buy", "unit-cost":10.00, "quantity": 100}, {"operation":"sell", "unit-cost":15.00, "quantity": 50}]\n[{"operation":"buy", "unit-cost":10.00, "quantity": 100}, {"operation":"sell", "unit-cost":15.00, "quantity": 50}]' | docker run -i capital-gains:latest
```

<br/>

Read about development decisions [here](docs/development.md).