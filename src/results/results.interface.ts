export interface Result {
  id: number;
  created: string;
  deleted: number;
  modified: string;
  hyp: string;
  intonation: string;
  pace: string;
  pronunciation: string;
  ref: string;
  rhythm: string;
  word_accuracy: string;
  created_by_id: number;
  modified_by_id: number;
  answer_id: number;
  detected_text: string;
  prompt: string;
  general_audio: string;
  general_text: string;
  peel_audio: string;
  peel_text: string;
  suggest_audio: string;
  suggest_text: string;
  generated_text: string;
}
