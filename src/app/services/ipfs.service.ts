import { Injectable } from '@angular/core';
import axios from 'axios';

@Injectable({
  providedIn: 'root'
})
export class IpfsService {

  private pinataApiKey = 'fa7faa5b7de6a8c2679e';
  private pinataSecretApiKey = 'e2a684f1b65749a8e05fb02ca4913c517a09831004d19bc34d41ba52418b803c';

  async uploadImageToIPFS(file: File): Promise<string> {
    const formData = new FormData();
    formData.append('file', file);

    const res = await axios.post('https://api.pinata.cloud/pinning/pinFileToIPFS', formData, {
      headers: {
        'Content-Type': 'multipart/form-data',
        pinata_api_key: this.pinataApiKey,
        pinata_secret_api_key: this.pinataSecretApiKey,
      },
    });

    return `https://gateway.pinata.cloud/ipfs/${res.data.IpfsHash}`;
  }

  async uploadMetadataToIPFS(name: string, description: string, imageUrl: string, price: string): Promise<string> {
    const metadata = {
      name,
      description,
      image: imageUrl,
      attributes: [
        { trait_type: 'PriceETH', value: price }
      ]
    };

    const res = await axios.post('https://api.pinata.cloud/pinning/pinJSONToIPFS', metadata, {
      headers: {
        pinata_api_key: this.pinataApiKey,
        pinata_secret_api_key: this.pinataSecretApiKey,
      },
    });

    return `https://gateway.pinata.cloud/ipfs/${res.data.IpfsHash}`;
  }
}