import { Address, beginCell, Cell, Contract, contractAddress, ContractProvider, Sender, SendMode } from '@ton/core';

export type TypeCollectorConfig = {
    scam_number: number;
    scam_owner: Address;
};

export function typeCollectorConfigToCell(config: TypeCollectorConfig): Cell {
    return beginCell().storeCoins(config.scam_number).storeAddress(config.scam_owner).endCell();
}


export class TypeCollector implements Contract {
    constructor(readonly address: Address, readonly init?: { code: Cell; data: Cell }) {}

    static createFromAddress(address: Address) {
        return new TypeCollector(address);
    }

    static createFromConfig(config: TypeCollectorConfig, code: Cell, workchain = 0) {
        const data = typeCollectorConfigToCell(config);
        const init = { code, data };
        return new TypeCollector(contractAddress(workchain, init), init);
    }

    async sendDeploy(provider: ContractProvider, via: Sender, value: bigint) {
        await provider.internal(via, {
            value,
            sendMode: SendMode.PAY_GAS_SEPARATELY
        });
    }

}
