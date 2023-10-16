export type RedelegationResp =
  | QueryError
  | {
      redelegation_responses: RedelegationResponse[];
      pagination: Pagination;
    };

interface Pagination {
  next_key: null;
  total: string;
}

export interface RedelegationResponse {
  redelegation: Redelegation;
  entries: Entry[];
}

interface Entry {
  redelegation_entry: RedelegationEntry;
  balance: string;
}

interface RedelegationEntry {
  creation_height: number;
  completion_time: string;
  initial_balance: string;
  shares_dst: string;
}

export interface Redelegation {
  delegator_address: string;
  validator_src_address: string;
  validator_dst_address: string;
  entries: null;
}

interface QueryError {
  code: number;
  message: string;
  details: any[];
}

export const isQueryError = (
  UnbondingResponse: RedelegationResp
): UnbondingResponse is QueryError => UnbondingResponse.hasOwnProperty('code');
