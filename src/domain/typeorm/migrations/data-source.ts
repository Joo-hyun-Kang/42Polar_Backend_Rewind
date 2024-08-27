import { DataSource } from 'typeorm';
import {
  basicOption,
  entityTsOption,
  migrationOption,
} from '../data-source-option';

const newOption = {
  ...basicOption,
  ...entityTsOption,
  ...migrationOption,
};

export const appDataSource = new DataSource(newOption);
