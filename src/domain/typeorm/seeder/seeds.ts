import { DataSource } from 'typeorm';
import {
  basicOption,
  entityTsOption,
  seedingOption,
} from '../data-source-option';
import { runSeeders } from 'typeorm-extension';

const newOption = {
  ...basicOption,
  ...entityTsOption,
  ...seedingOption,
};

const dataSource = new DataSource(newOption);

dataSource.initialize().then(async () => {
  await dataSource.synchronize(false);
  await runSeeders(dataSource);

  process.exit();
});
