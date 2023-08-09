import {
  ValidatorConstraint,
  ValidatorConstraintInterface,
} from 'class-validator';

@ValidatorConstraint({ name: 'statusValidator', async: false })
export class StatusValidator implements ValidatorConstraintInterface {
  validate(status: string): boolean {
    const allowedStatuses = ['toDo', 'inProgress', 'Review', 'Completed'];
    return allowedStatuses.includes(status);
  }
}
