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

  constructor() {
    this.checkIfMetaMaskIsInstalled();
  }

  public checkIfMetaMaskIsInstalled(): boolean {
    return typeof window !== 'undefined' && typeof window.ethereum !== 'undefined';
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
        this.currentAccount.set(accounts[0]);
        this.isConnected.set(true);

        this.listenToEvents();

        return accounts[0];
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
    await window.ethereum.request({ method: 'eth_requestAccounts' });
    this.provider = new ethers.BrowserProvider(window.ethereum);

    return await this.provider.getSigner();
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
}