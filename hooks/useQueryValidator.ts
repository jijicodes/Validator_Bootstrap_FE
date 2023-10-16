import { useQuery } from "@tanstack/react-query";
import { AvailableChain } from "../components/Utils/chainOptions";

interface ValidatorResp {
  validator: Validator;
}

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

export const fetchVal = (chainId: AvailableChain, addr: string) =>
  fetch("http://validators-api.herokuapp.com/allValidators/cosmoshub-4")
    .then((r) => r.json())
    .then((validator) => {
      return validator;
    });

export const useQueryValidator = (chainId: AvailableChain, addr: string) =>
  useQuery({
    queryKey: ["validator", chainId, addr],
    queryFn: () => fetchVal(chainId, addr),
  });
