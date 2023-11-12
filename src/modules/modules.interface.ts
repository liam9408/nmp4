import { Scenario } from 'src/scenarios/scenarios.interface';

export interface Module {
  id: number;
  created: string;
  deleted: number;
  modified: string;
  name: string;
  created_by_id: number;
  modified_by_id: number;
  tenant_id: number;
  scenarios?: Array<Scenario>;
}
