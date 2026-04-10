import { INestApplication } from '@nestjs/common';
import { AbstractHttpAdapter } from '@nestjs/core/adapters/http-adapter';
export declare function createApp(adapter?: AbstractHttpAdapter): Promise<INestApplication<any>>;
