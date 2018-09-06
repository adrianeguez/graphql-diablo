import { Scalar } from '@nestjs/graphql';

@Scalar('Date')
export class DateScalar {
    description = 'Date custom scalar type use IsoString format.';
}