
export interface PolicyConflictData {
  total_potential_conflicts: number;
  policy_summary: Array<{
    table_name: string;
    policy_count: number;
    has_conflicts: boolean;
  }>;
  last_check: string;
}
