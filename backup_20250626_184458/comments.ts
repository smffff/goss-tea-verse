
export interface Comment {
  id: string;
  content: string;
  created_at: string;
  anonymous_token: string;
  submission_id?: string;
}

export interface CommentFormData {
  content: string;
}
