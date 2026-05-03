import {
  ValidatorConstraint,
  ValidatorConstraintInterface,
  ValidationArguments,
} from 'class-validator';

@ValidatorConstraint({ name: 'OnlyOneCorrect', async: false })
export class OnlyOneCorrect implements ValidatorConstraintInterface {

  validate(options: any[], args: ValidationArguments) {
    const correctCount = options.filter(opt => opt.isCorrect === true).length;
    return correctCount === 1;
  }

  defaultMessage(args: ValidationArguments) {
    return 'Deve existir exatamente uma opção correta';
  }
}