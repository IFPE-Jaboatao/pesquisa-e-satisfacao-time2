import {
  ValidatorConstraint,
  ValidatorConstraintInterface,
} from 'class-validator';
import { CreateOptionDto } from '../../option/dto/CreateOptionDto';

@ValidatorConstraint({ name: 'NoDuplicateOptions', async: false })
export class NoDuplicateOptions implements ValidatorConstraintInterface {
  validate(options: CreateOptionDto[]) {
    if (!options || options.length === 0) {
      return true;
    }

    const labels = options.map((opt) => opt.label.toLowerCase().trim());
    const unique = new Set(labels);

    return labels.length === unique.size;
  }

  defaultMessage() {
    return 'Não pode haver opções duplicadas';
  }
}
