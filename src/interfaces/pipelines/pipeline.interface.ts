export interface Pipeline {
  id: number;
  name: string;
  sort: number;
  is_main: boolean;
  is_unsorted_on: boolean;
  is_archive: boolean;
  account_id: number;
  _links: {
    self: {
      href: string;
    };
  };
  _embedded: {
    statuses: [
      {
        id: number;
        name: string;
        sort: number;
        is_editable: boolean;
        pipeline_id: number;
        color: string;
        type: number;
        account_id: number;
        _links: {
          self: {
            href: string;
          };
        };
      },
    ];
  };
}
