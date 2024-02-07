import { Controller, Get, Query } from '@nestjs/common';
import { HttpServiceService } from 'src/http-service/http-service.service';
import { Leads } from 'src/interfaces/leads/leads.interface';

@Controller('api/leads')
export class LeadsController {
  constructor(private readonly httpService: HttpServiceService) {}
  @Get()
  async getLeads(@Query() query: { query: string }): Promise<Leads[]> {
    //Получение всех необходимые данные из http с помощью Promise.all
    const [leads, users, pipelines, contacts] = await Promise.all([
      this.httpService.getLeads(query.query),
      this.httpService.getUsers(),
      this.httpService.getPipelines(),
      this.httpService.getContacts(),
    ]);
    //Формирование одного ответа из разных источников
    if (!leads) {
      return [];
    }
    const response = leads.map((lead) => {
      const user = users.find((user) => user.id === lead.responsible_user_id);
      const pipeline = pipelines.find((elem) => elem.id === lead.pipeline_id);
      const status = pipeline._embedded.statuses.find(
        (elem) => elem.id === lead.status_id,
      );
      const contact = lead._embedded.contacts.map((elem) => {
        const person = contacts.find((person) => person.id === elem.id);
        return {
          id: person.id,
          name: person.name,
          contacts: person.custom_fields_values,
        };
      });
      return {
        key: lead.id,
        name: lead.name,
        created_by: lead.created_at,
        price: lead.price,
        user: { id: user.id, name: user.name, email: user.email },
        status: {
          id: status.id,
          name: status.name,
          color: status.color,
        },
        contact_person: contact,
      };
    });
    return response;
  }
}
