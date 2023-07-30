import { ApiProperty } from '@nestjs/swagger';
import { StatusCodes } from 'http-status-codes';

export class BadRequest {
  @ApiProperty({ example: StatusCodes.BAD_REQUEST })
  statusCode: StatusCodes.BAD_REQUEST;
  @ApiProperty({ example: 'invalid data' })
  message: 'Not found';
  @ApiProperty({ example: 'invalid data' })
  error: 'Not Found';
}
