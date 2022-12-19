<script lang="ts">

import { defineComponent, ref } from 'vue'
import { create, CID } from 'kubo-rpc-client'
import { ethers } from 'ethers'
import { Buffer } from 'buffer'
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
    name: 'Download',
    methods: {
        async downloadFile() {
            // const added = await client.add(this.file)
            const store = new storage.HashesStorage__factory().attach(contractAddress).connect(signer)
            const result = await store['getHash()']().then((val) => ethers.utils.arrayify(val))

            const cid = CID.decode(result)

            const file = client.cat(cid)

            const content = []

            for await (const chunk of file) {
                content.push(chunk)
            }

        
            
            const blob = new Blob(content, { type: 'application/octet-stream' })
            const url = URL.createObjectURL(blob)
            const link = document.createElement('a')

            link.href = url
            link.download = 'test.txt'
            link.click()
            
        }
    }
})
</script>

<template>
    <button @click="downloadFile">Download file</button>
</template>
