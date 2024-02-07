import { Injectable } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';

@Injectable()

//Сервис для чтения переменных из .env файла
export class AmoConfigService {
  constructor(private configService: ConfigService) {}

  getClientId(): string {
    return this.configService.get<string>('CLIENT_ID');
  }

  getClientSecret(): string {
    return this.configService.get<string>('CLIENT_SECRET');
  }

  getCode(): string {
    return this.configService.get<string>('CODE');
  }

  getAccessToken(): string {
    return this.configService.get<string>('ACCESS_TOKEN');
  }

  getRefreshToken(): string {
    return this.configService.get<string>('REFRESH_TOKEN');
  }
}
