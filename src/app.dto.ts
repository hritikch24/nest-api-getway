import { Field, InputType, ObjectType } from '@nestjs/graphql';

@InputType()
export class requestDto {
    @Field()
    name: string;
}

@ObjectType()
export class AppType {
    @Field()
    name: string;
}
