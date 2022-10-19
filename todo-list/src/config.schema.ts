import { plainToInstance } from 'class-transformer';
import { IsNumberString, IsOptional, IsString, validateSync } from 'class-validator';

export class EnvironmentVariables {
  // using IsString because IsUrl doesn't allow localhost
  @IsString()
  BASE_URL: string;

  // using IsString because IsUrl doesn't allow localhost
  @IsString()
  DATABASE_CONNECTION_URL: string;

  @IsNumberString()
  @IsOptional()
  PORT = 3000;
}

export function validate(config: Record<string, unknown>): EnvironmentVariables {
  const env = plainToInstance(EnvironmentVariables, config, {
    enableImplicitConversion: true
  });

  const errors = validateSync(env);
  if (errors.length > 0) {
    throw new Error(errors.toString());
  }

  return env;
}
