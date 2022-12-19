import { time, loadFixture } from "@nomicfoundation/hardhat-network-helpers";
import { anyValue } from "@nomicfoundation/hardhat-chai-matchers/withArgs";
import { expect } from "chai";
import { ethers } from "hardhat";
import { sha256, sha512 } from 'multiformats/hashes/sha2'

import * as digest from "multiformats/hashes/digest";


describe("HashesStorage", function () {
    async function deployHashesStorageFixture() {
        const owner = await ethers.getSigners().then((signers) => signers[0]);
        const HashesStorage = await ethers.getContractFactory("HashesStorage");
        const hashesStorage = await HashesStorage.deploy();
        return { hashesStorage, owner };
    }

    describe("Upload hash", function () {
        it("Should upload sha256 hash", async function () {
            const { hashesStorage } = await loadFixture(deployHashesStorageFixture);
            const hash = await sha256.digest(Uint8Array.from([1, 2, 3]));

            await hashesStorage.addHash(hash.bytes);

            const storedHash = await hashesStorage["getHash()"]();
            const response = digest.decode(ethers.utils.arrayify(storedHash));

            expect(response.bytes).to.deep.eq(hash.bytes);
        });

        it("Should upload sha256 hash and get by address", async function () {
            const { hashesStorage, owner } = await loadFixture(deployHashesStorageFixture);
            const hash = await sha256.digest(Uint8Array.from([1, 2, 3]));

            await hashesStorage.addHash(hash.bytes);

            const storedHash = await hashesStorage["getHash(address)"](owner.address);
            const response = digest.decode(ethers.utils.arrayify(storedHash));

            expect(response.bytes).to.deep.eq(hash.bytes);
        });

        it("Should upload sha512 hash", async function () {
            const { hashesStorage } = await loadFixture(deployHashesStorageFixture);
            const hash = await sha512.digest(Uint8Array.from([1, 2, 3]));

            await hashesStorage.addHash(hash.bytes);

            const storedHash = await hashesStorage["getHash()"]();
            const response = digest.decode(ethers.utils.arrayify(storedHash));

            expect(response.bytes).to.deep.eq(hash.bytes);
        });
    });
});