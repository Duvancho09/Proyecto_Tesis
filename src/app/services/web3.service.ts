import { Injectable, signal } from '@angular/core';
import { BrowserProvider, ethers } from 'ethers';

declare global {
  interface Window {
    ethereum?: any;
  }
}

@Injectable({
  providedIn: 'root'
})
export class Web3Service {
  
  public currentAccount = signal<string | null>(null);
  public currentNetwork = signal<string | null>(null);
  public isConnected = signal<boolean>(false);

  private provider: BrowserProvider | null = null;
  private readonly SESSION_DURATION_MS = 5 * 60 * 1000;

  constructor() {
    if(this.checkIfMetaMaskIsInstalled()){
      this.checkExistingSession();
    }
  }

  public checkIfMetaMaskIsInstalled(): boolean {
    return typeof window !== 'undefined' && typeof window.ethereum !== 'undefined';
  }

  public logout(): void {
    sessionStorage.removeItem('web3_account');
    sessionStorage.removeItem('web3_timestamp');
    this.currentAccount.set(null);
    this.isConnected.set(false);
  }

  public checkExistingSession(): void{
    const savedAccount = sessionStorage.getItem('web3_account');
    const loginTimestamp = sessionStorage.getItem('web3_timestamp');

    if(savedAccount && loginTimestamp){
      const elapsed = Date.now() - Number(loginTimestamp);

      if(elapsed > this.SESSION_DURATION_MS){
        this.logout();
      } else {
        this.currentAccount.set(savedAccount);
        this.isConnected.set(true);
        this.listenToEvents();
      }
    }
  }

  public async switchToSepolia(): Promise<void>{
    if(!this.checkIfMetaMaskIsInstalled()) return;

    const sepoliachainId = '0xaa36a7';

    try{
      await window.ethereum.request({
        method: 'wallet_switchEthereumChain',
        params: [{ chainId: sepoliachainId }],
      });
    } catch (error: any){
      if(error.code === 4902){
        await window.ethereum.request({
          method: 'wallet_addEthereumChain',
          params: [
            {
              chainId: sepoliachainId,
              chainName: 'Sepolia Test Network',
              nativeCurrency: { name: 'Sepolia Ether', symbol: 'SEP', decimals: 18 },
              rpcUrls: ['https://rpc.sepolia.org'],
              blockExplorerUrls: ['https://sepolia.etherscan.io'],
            },
          ],
        });
      } else {
        console.error('Error al cambiar a la red Sepolia:', error);
      }
    }
  }

  public async connectWallet(): Promise<string | null> {
    if (!this.checkIfMetaMaskIsInstalled()) {
      alert('MetaMask no está instalado. Por favor instala la extensión para continuar.');
      return null;
    }

    try {
      await this.switchToSepolia();

      this.provider = new ethers.BrowserProvider(window.ethereum);

      const accounts: string[] = await window.ethereum.request({
        method: 'eth_requestAccounts'
      });

      if (accounts.length > 0) {
        const account = accounts[0];
        this.currentAccount.set(accounts[0]);
        this.isConnected.set(true);

        sessionStorage.setItem('web3_account', account);
        sessionStorage.setItem('web3_timestamp', Date.now().toString());

        this.listenToEvents();

        return account;
      }
    } catch (error) {
      console.error('Error al conectar con MetaMask:', error);
    }

    return null;
  }

  public async getSigner() {
    if (!this.checkIfMetaMaskIsInstalled()) {
      throw new Error('MetaMask no esta instalado en tu navegador.');
    }
    await this.switchToSepolia();
    this.provider = new ethers.BrowserProvider(window.ethereum);

    const accounts: string[] = await window.ethereum.request({ method: 'eth_accounts' });

    if(!accounts || accounts.length === 0){
      const requested: string[] = await window.ethereum.request({ method: 'eth_requestAccounts' });
      if (requested.length === 0) {
        throw new Error('No hay ninguna cuenta conectada.');
      }
      this.currentAccount.set(requested[0]);
      return await this.provider.getSigner(requested[0]);
    }

    const activeAccount = accounts[0];
    this.currentAccount.set(activeAccount);
    sessionStorage.setItem('web3_account', activeAccount);

    return await this.provider.getSigner(activeAccount!);
  }

  private listenToEvents(): void {
    if (!window.ethereum) return;

    window.ethereum.on('accountsChanged', (accounts: string[]) => {
      if (accounts.length > 0) {
        this.currentAccount.set(accounts[0]);
        this.isConnected.set(true);
      } else {
        this.currentAccount.set(null);
        this.isConnected.set(false);
      }
    });

    window.ethereum.on('chainChanged', () => {
      window.location.reload();
    });
  }

  public async buyNftOnChain(contractAddress: string, abi: any, tokenId: number, priceInEth: string){
    try {
      const signer = await this.getSigner();
      const contract = new ethers.Contract(contractAddress, abi, signer);

      const priceInWei = ethers.parseEther(priceInEth);

      const tx = await contract.getFunction('buyNFT')(tokenId, { value: priceInWei });

      console.log('Transacción enviada:', tx.hash);

      const receipt = await tx.wait();
      console.log('Transacción confirmada:', receipt);

      return {
        success: true,
        txHash: tx.hash,
        tokenId: tokenId
      };
    } catch (error: any){
      console.error('Error en la compra en blockchain:', error);
      throw error;
    }
  }
}