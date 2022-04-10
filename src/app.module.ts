import { Module } from '@nestjs/common';
import { ClientsModule, Transport } from '@nestjs/microservices';
import { join } from 'path';
import { AppController } from './app.controller';
import { GraphQLModule } from '@nestjs/graphql';
import { AppResolver } from './app.resolver';
import { ApolloDriver, ApolloDriverConfig } from '@nestjs/apollo';

@Module({
    imports: [
        GraphQLModule.forRoot<ApolloDriverConfig>({
            driver: ApolloDriver,
            autoSchemaFile: true
        }),
        ClientsModule.register([
            {
                name: 'microservice',
                transport: Transport.GRPC,
                options: {
                    package: 'microservice',
                    protoPath: join(__dirname, '_proto/microservice.proto')
                }
            }
        ])
    ],
    controllers: [AppController],
    providers: [AppResolver]
})
export class AppModule {}
