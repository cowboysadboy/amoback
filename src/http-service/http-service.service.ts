import { Injectable } from '@nestjs/common';
import { HttpService } from '@nestjs/axios';
import { AmoConfigService } from 'src/amo-config/amo-config.service';
import { Lead } from 'src/interfaces/lead/lead.interface';
import { User } from 'src/interfaces/user/user.interface';
import { Pipeline } from 'src/interfaces/pipelines/pipeline.interface';
import { Contact } from 'src/interfaces/contact/contact.interface';

@Injectable()
export class HttpServiceService {
  //токены для получения доступа к информации REST API
  access_token = '';
  refresh_token = '';

  //адрес запроса к личному кабинету
  url_amo = 'https://s11v2358z.amocrm.ru';

  //данные для авторизации в amocrm
  data = {
    client_id: '',
    client_secret: '',
    grant_type: 'authorization_code',
    code: '',
    redirect_uri: 'https://s11v2358z.amocrm.ru/',
  };
  constructor(
    private readonly httpService: HttpService,
    private readonly AmoConfig: AmoConfigService,
  ) {
    //Присвоение полям data данных из .env для работы с rest api
    this.access_token = this.AmoConfig.getAccessToken();
    this.refresh_token = this.AmoConfig.getRefreshToken();

    //Если токен явно не указан в .env, присваиваем данные для доступа и проходим процедуру авторизации
    if (!this.refresh_token) {
      this.data.client_id = this.AmoConfig.getClientId();
      this.data.client_secret = this.AmoConfig.getClientSecret();
      this.data.code = this.AmoConfig.getCode();
      this.sendPostRequest();
    }
  }

  // Получение токенов авторизации
  async sendPostRequest() {
    const url = `${this.url_amo}/oauth2/access_token`;
    try {
      const response = await this.httpService.post(url, this.data).toPromise();
      this.access_token = response.data.access_token;
      this.refresh_token = response.data.refresh_token;
      console.log('access_token: ', this.access_token);
      console.log('refresh_token: ', this.refresh_token);
      console.log('Успешная авторизация');
    } catch (error) {
      if (error.response.status === 400) {
        console.log(
          ' Ошибка авторизации. Попробуйте изменить настройки ключей и доступов к AMOCRM в файле env. \n' +
            '\n ВНИМАНИЕ! Приложение не подразумевает функционала сохранения токенов на стороне backend (этого не было в задании)' +
            '\n\n Если токены не указаны в .env или потеряли актуальность,' +
            '\n рекомендуется пройти процедуру авторизации и вручную указать их в .env \n ' +
            error.response.data.detail,
        );
      } else {
        console.log(error);
      }
    }
  }

  //Получение пользователей, ответственных за заявки
  async getUsers(): Promise<User[]> {
    const url = this.url_amo + `/api/v4/users`;
    const headers = {
      Authorization: `Bearer ${this.access_token}`,
    };
    try {
      const response = await this.httpService.get(url, { headers }).toPromise();
      return response.data._embedded.users;
    } catch (error) {
      console.error(error);
    }
  }

  //Получение данных аккаунта (в текущих целях не используется)
  async getAccount(): Promise<any> {
    const url = this.url_amo + `/api/v4/account`;
    const headers = {
      Authorization: `Bearer ${this.access_token}`,
    };
    try {
      const response = await this.httpService.get(url, { headers }).toPromise();
      return response.data;
    } catch (error) {
      console.error(error);
    }
  }

  //Получение заявок
  async getLeads(query: string): Promise<Lead[]> {
    const url =
      this.url_amo + `/api/v4/leads?with=${'contacts'}&query=${query}`;
    const headers = {
      Authorization: `Bearer ${this.access_token}`,
    };
    try {
      const response = await this.httpService.get(url, { headers }).toPromise();
      return response.data._embedded.leads;
    } catch (error) {
      console.error(error);
    }
  }

  //Получение контактов со стороны клиента
  async getContacts(): Promise<Contact[]> {
    const url = this.url_amo + `/api/v4/contacts`;
    const headers = {
      Authorization: `Bearer ${this.access_token}`,
    };
    try {
      const response = await this.httpService.get(url, { headers }).toPromise();
      return response.data._embedded.contacts;
    } catch (error) {
      console.error(error);
    }
  }

  //Получение воронок и статусов заявки
  async getPipelines(): Promise<Pipeline[]> {
    const url = this.url_amo + `/api/v4/leads/pipelines`;
    const headers = {
      Authorization: `Bearer ${this.access_token}`,
    };
    try {
      const response = await this.httpService.get(url, { headers }).toPromise();
      return response.data._embedded.pipelines;
    } catch (error) {
      console.error(error.response.data);
    }
  }
}
