import {
  ValidationArguments,
  ValidatorConstraint,
  ValidatorConstraintInterface,
} from 'class-validator';

@ValidatorConstraint({ name: 'priorityValidator', async: false })
export class priorityValidator implements ValidatorConstraintInterface {
  allowedPriorities = ['low', 'medium', 'high'];
  validate(priority: string): boolean {
    return this.allowedPriorities.includes(priority);
  }

  defaultMessage(validationArguments?: ValidationArguments): string {
    return `Wrong cards priority = ${validationArguments.value}, allowed types = ${this.allowedPriorities}`;
  }
}
