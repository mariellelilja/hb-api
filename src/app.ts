//import dotenv from 'dotenv';
//dotenv.config();

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
            const response = await fetch(`${this.baseUrl}api_key=${this.apiKey}&tag=${inputQuery}`);
            if (!response.ok) {
                throw new Error('Network response not ok.');
            }
            const data = await response.json();
            const gifUrl = data.data.images.original.url;
            //return data;
            return gifUrl;
        } catch (error) {
            console.error('Error fetching the GIF:', error);
            return 'Error fetching GIF';
        }
    }
}
//export default TheService;

const theService = new TheService();

document.getElementById('searchButton')!.addEventListener('click', async () => {
    const inputQuery = (document.getElementById('inputQuery') as HTMLInputElement).value;
    const gifUrl = await theService.fetchData(inputQuery);
    const outputDiv = document.getElementById('outputDiv');

    if (outputDiv && gifUrl === 'Error fetching GIF') {
        outputDiv.innerHTML = '<p>Sorry, something went wrong. Please try again later.</p>';
    }

    else if (outputDiv && gifUrl) {
        outputDiv.innerHTML = '';

        const img = document.createElement('img');
        console.log('gifUrl: ' + gifUrl);
        img.src = gifUrl;
        img.alt = `GIF showing ${inputQuery}`;
        img.style.maxWidth = '100%';

        //const img = `<img src="${gifUrl}" alt="GIF showing ${inputQuery}" style="max-width: 100%;">`;


        outputDiv.appendChild(img);
    //    outputDiv.style.opacity = '0';
    //    outputDiv.style.opacity = '1';

        img.onload = () => {
            img.classList.add('loaded');
        };
    }
});