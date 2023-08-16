import {
  ValidationArguments,
  ValidatorConstraint,
  ValidatorConstraintInterface,
} from 'class-validator';

@ValidatorConstraint({ name: 'statusValidator', async: false })
export class StatusValidator implements ValidatorConstraintInterface {
  validate(status: string): boolean {
    const allowedStatuses = ['toDo', 'inProgress', 'review', 'completed'];
    return allowedStatuses.includes(status);
  }

  defaultMessage(validationArguments?: ValidationArguments): string {
    return `Wrong cards status = ${validationArguments.value}`;
  }
}
