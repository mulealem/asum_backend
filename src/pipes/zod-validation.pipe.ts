// pipes/zod-validation.pipe.ts
import { Injectable, PipeTransform, BadRequestException } from '@nestjs/common';
import { ZodSchema, ZodError } from 'zod';

@Injectable()
export class ZodValidationPipe implements PipeTransform {
  constructor(private schema: ZodSchema<any>) {}

  transform(value: any) {
    try {
      return this.schema.parse(value); // Validate the input using the provided schema
    } catch (error) {
      if (error instanceof ZodError) {
        throw new BadRequestException(error.errors); // Handle validation errors
      }
      throw new BadRequestException('Invalid input');
    }
  }
}
