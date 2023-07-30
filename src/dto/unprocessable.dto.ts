import { ApiProperty } from '@nestjs/swagger';
import { StatusCodes } from 'http-status-codes';

export class UnprocessableDto {
  @ApiProperty({ example: StatusCodes.UNPROCESSABLE_ENTITY })
  statusCode: StatusCodes.NOT_FOUND;
  @ApiProperty({ example: 'Not found' })
  message: 'Not found';
  @ApiProperty({ example: 'Not found' })
  error: 'Not Found';
}
