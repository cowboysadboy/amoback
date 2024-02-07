export interface User {
  id: number;
  name: string;
  email: string;
  lang: string;
  rights: {
    leads: {
      view: string;
      edit: string;
      add: string;
      delete: string;
      export: string;
    };
    contacts: {
      view: string;
      edit: string;
      add: string;
      delete: string;
      export: string;
    };
    companies: {
      view: string;
      edit: string;
      add: string;
      delete: string;
      export: string;
    };
    tasks: {
      edit: string;
      delete: string;
    };
    mail_access: boolean;
    catalog_access: boolean;
    files_access: boolean;
    status_rights: [
      {
        entity_type: string;
        pipeline_id: number;
        status_id: number;
        rights: {
          view: string;
          edit: string;
          delete: string;
        };
      },
    ];
    catalog_rights: null;
    custom_fields_rights: null;
    oper_day_reports_view_access: boolean;
    oper_day_user_tracking: boolean;
    is_admin: boolean;
    is_free: boolean;
    is_active: boolean;
    group_id: null;
    role_id: null;
  };
  _links: {
    self: {
      href: string;
    };
  };
}
