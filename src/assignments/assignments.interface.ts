import { Scenario } from 'src/scenarios/scenarios.interface';

export interface Assignment {
  id: number;
  created: string;
  deleted: number;
  modified: string;
  created_by_id: number;
  modified_by_id: number;
  scenario_id: number;
  user_id: number;
  scenario: Scenario;
}
