import { useQuery } from "@tanstack/react-query";
import { AvailableChain } from "../utils/chains";

export interface Validator {
  operator_address: string;
  consensus_pubkey: ConsensusPubkey;
  jailed: boolean;
  status: string;
  tokens: string;
  delegator_shares: string;
  description: Description;
  unbonding_height: string;
  unbonding_time: string;
  commission: Commission;
  min_self_delegation: string;
  icon?: string;
}

interface Commission {
  commission_rates: CommissionRates;
  update_time: string;
}

interface CommissionRates {
  rate: string;
  max_rate: string;
  max_change_rate: string;
}

interface ConsensusPubkey {
  "@type": string;
  key: string;
}

interface Description {
  moniker: string;
  identity: string;
  website: string;
  security_contact: string;
  details: string;
}

export const fetchVal = (chainId: AvailableChain) =>
  fetch(`http://validators-api.herokuapp.com/allValidators/${chainId}`)
    .then((r) => r.json())
    .then((validators: Validator[]) => {
      return validators;
    });

export const useQueryValidator = (chainId: AvailableChain, addr: string) =>
  useQuery({
    queryKey: ["validator", chainId],
    queryFn: () => fetchVal(chainId),
  });
