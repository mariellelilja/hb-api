import dotenv from 'dotenv';
dotenv.config();
console.log('Loaded API key:', process.env.GIPHY_API_KEY);


class TheService {
    private apiKey: string;
    private baseUrl: string;

    constructor() {
        this.apiKey = process.env.GIPHY_API_KEY!;
        console.log('API Key:', this.apiKey);

        this.baseUrl = 'https://api.giphy.com/v1/gifs/random?';
    }

    async fetchData(inputQuery: string): Promise<any> {

        try {
            const response = await fetch(`https://api.giphy.com/v1/gifs/random?api_key=${this.apiKey}&tag=${inputQuery}`);

            const data = await response.json();
            const gifUrl = data.data.images.original.url;
            //return data;
            return gifUrl;
        } catch (error) {
            console.error('Error fetching the GIF:', error);
        }
    }
}
//export default TheService;

const theService = new TheService();

document.getElementById('searchButton')!.addEventListener('click', async () => {
    console.log('FUNKA FÖRIHELVETE');
    const inputQuery = (document.getElementById('inputQuery') as HTMLInputElement).value;
    const gifUrl = await theService.fetchData(inputQuery);
    const outputDiv = document.getElementById('outputDiv');

    if (outputDiv && gifUrl) {
        outputDiv.innerHTML = '';

        const img = document.createElement('img');
        console.log('gifUrl: ' + gifUrl);
        img.src = gifUrl;
        img.alt = `GIF showing ${inputQuery}`;
        img.style.maxWidth = '100%';

        outputDiv.appendChild(img);
        outputDiv.style.opacity = '1';
    }
});