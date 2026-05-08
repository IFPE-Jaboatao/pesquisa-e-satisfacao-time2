import {
  ValidatorConstraint,
  ValidatorConstraintInterface,
  ValidationArguments,
} from 'class-validator';

@ValidatorConstraint({ name: 'NoDuplicateOptions', async: false })
export class NoDuplicateOptions implements ValidatorConstraintInterface {
  validate(options: any[], args: ValidationArguments) {
    const texts = options.map((opt) => opt.text.toLowerCase().trim());
    const unique = new Set(texts);
    return texts.length === unique.size;
  }

  defaultMessage(args: ValidationArguments) {
    return 'Não pode haver opções duplicadas';
  }
}
