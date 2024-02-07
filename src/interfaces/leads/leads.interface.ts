interface ContactValue {
  value: string;
  enum_id: number;
  enum_code: string;
}
interface Contacts {
  field_id: number;
  field_name: string;
  field_code: string;
  field_type: string;
  values: ContactValue[];
}
interface ContactPerson {
  id: number;
  name: string;
  contacts: Contacts[];
}
export interface Leads {
  key: number;
  name: string;
  created_by: number;
  price: number;
  user: {
    id: number;
    name: string;
    email: string;
  };
  status: {
    id: number;
    name: string;
  };
  contact_person: ContactPerson[];
}
