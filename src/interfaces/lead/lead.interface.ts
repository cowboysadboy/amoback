interface Company {
  id: number;
  _links: {
    self: {
      href: string;
    };
  };
}
export interface Lead {
  id: number;
  name: string;
  price: number;
  responsible_user_id: number;
  group_id: number;
  status_id: number;
  pipeline_id: number;
  loss_reason_id: null;
  created_by: number;
  updated_by: number;
  created_at: number;
  updated_at: number;
  closed_at: null;
  closest_task_at: number;
  is_deleted: boolean;
  custom_fields_values: null;
  score: null;
  account_id: number;
  labor_cost: null;
  _links: {
    self: {
      href: string;
    };
  };
  _embedded: { tags: []; companies: Company[]; contacts: [{ id: number }] };
}
