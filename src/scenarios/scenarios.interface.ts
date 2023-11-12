import { Assignment } from 'src/assignments/assignments.interface';
import { Result } from '../results/results.interface';

export interface Answer {
  id: number;
  created: string;
  deleted: number;
  modified: string;
  audio_file_url: string;
  created_by_id: number;
  modified_by_id: number;
  question_id: number;
  result_id: number;
  result: Result;
}

export interface Question {
  id: number;
  created: string;
  deleted: number;
  modified: string;
  audio_file_url: string;
  content: string;
  hint: string;
  created_by_id: number;
  modified_by_id: number;
  scenario_id: number;
  ref_content: string;
  ref_audio_file_url: string;
  agent_speak_first: number;
  consistency: number;
  trainer_audio_file_url: string;
  customer_audio_file_url: string;
  answers: Array<Answer>;
}

export interface Scenario {
  id: number;
  created: string;
  deleted: number;
  modified: string;
  lang: string;
  name: string;
  created_by_id: number;
  modified_by_id: number;
  module_id: number;
  assessment: boolean;
  assessment_scenario: number;
  published: boolean;
  type: string;
  introduction_url: string;
  quiz_image_url: string;
  user_scenario_value: string;
  questions?: Array<Question>;
  assignments?: Array<Assignment>;
}
