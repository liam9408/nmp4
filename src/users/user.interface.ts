import { Assignment } from 'src/assignments/assignments.interface';

export class User {
  id: number;
  created: string;
  deleted: number;
  modified: string;
  email: string;
  first_name: string;
  last_ip: string;
  last_name: string;
  password: string;
  status: number;
  verification_code: string;
  created_by_id: number;
  modified_by_id: number;
  tenant_id: number;
  assignments?: Assignment[];
}
