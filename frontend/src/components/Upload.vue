<script lang="ts">

import { defineComponent, ref } from 'vue'
import { create } from 'kubo-rpc-client'
import { ethers } from 'ethers'
import * as storage from '../../../typechain-types'

const client = create({
    host: 'localhost',
    port: 5001,
    protocol: 'http'
})

const provider = new ethers.providers.Web3Provider(window.ethereum)
await provider.send("eth_requestAccounts", []);
const signer = provider.getSigner()
const contractAddress = '0x5FbDB2315678afecb367f032d93F642f64180aa3'

export default defineComponent({
    name: 'Upload',
    data(): { file: File | null } {
        return {
            file: null
        }
    },

    methods: {
        async uploadFile() {
            this.file = this.$refs.file.files[0]
            console.log(this.file)
        },

        async submitFile() {
            if (!this.file) {
                return
            }
            const added = await client.add(this.file)
            const store = new storage.HashesStorage__factory().attach(contractAddress).connect(signer)
            const tx = await store.addHash(added.cid.bytes)
        }
    }
})

</script>

<template>
    <input
        type="file"
        @change="uploadFile"
        ref="file"
      />
      <button @click="submitFile">Upload!</button>
</template>
