//importando dependencias

const bip32 = require('bip32')
const bip39 = require('bip39')
const bitcoin = require('bitcoinjs-lib')

//definir a rede
const network = bitcoin.networks.testnet

const path = `m/49'/1'/0'/0`

let mnenonic = bip39.generateMnemonic()
const seed = bip39.mnemonicToSeedSync(mnenonic)

//criando a raiz da carteira HD
let root = bip32.fromSeed(seed,network)

//criando uma conta - par pvt-pub keys
let account = root.derivePath(path)
let node = account.derive(0).derive(0)

let btcaddress = bitcoin.payments.p2pkh({
    pubkey: node.publicKey,
    network: network
}).address

console.log("carteira gerada")
console.log("Endereco: ", btcaddress)
console.log("Chave privada: ", node.toWIF())
console.log("Seed: ", mnenonic)

