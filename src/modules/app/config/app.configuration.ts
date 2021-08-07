import { readFileSync, existsSync } from 'fs';
import * as yaml from 'js-yaml';
import { join } from 'path';

const YAML_CONFIG_FILENAME = 'config.yaml';

export default () => {
  const filePath = join(__dirname, YAML_CONFIG_FILENAME);

  if (!existsSync(filePath)) {
    return;
  }

  return yaml.load(readFileSync(filePath, 'utf8')) as Record<string, any>;
};
