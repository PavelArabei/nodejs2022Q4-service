import { ApiProperty } from '@nestjs/swagger';
import { StatusCodes } from 'http-status-codes';

export class NotFoundDto {
  @ApiProperty({ example: StatusCodes.NOT_FOUND })
  statusCode: StatusCodes.NOT_FOUND;
  @ApiProperty({ example: 'Not found' })
  message: 'Not found';
  @ApiProperty({ example: 'Not found' })
  error: 'Not Found';
}
