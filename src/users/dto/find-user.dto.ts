export class FindUserDto {
  id: bigint | null;
  created: string | null;
  deleted: number | null;
  modified: string | null;
  email: string | null;
  first_name: string | null;
  last_ip: string | null;
  last_name: string | null;
  password: string | null;
  status: number | null;
  verification_code: string | null;
  created_by_id: bigint | null;
  modified_by_id: bigint | null;
  tenant_id: bigint | null;
}
