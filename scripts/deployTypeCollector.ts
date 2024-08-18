import { Address, toNano } from '@ton/core';
import { TypeCollector } from '../wrappers/TypeCollector';
import { compile, NetworkProvider } from '@ton/blueprint';

export async function run(provider: NetworkProvider) {
    const typeCollector = provider.open(
            TypeCollector.createFromConfig(
                {
                    scam_number: 13371337,
                    scam_owner: provider.sender().address as Address,
                },
                await compile('TypeCollector')
            )
    );
    await typeCollector.sendDeploy(provider.sender(), toNano('0.05'));

    await provider.waitForDeploy(typeCollector.address);

}
