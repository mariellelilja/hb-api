class TheService {
    private apiKey: string;
    private baseUrl: string;

    constructor(apiKey: string) {
        this.apiKey = apiKey;
        this.baseUrl = 'https://api.openweathermap.org/data/2.5/weather';
    }

    async fetchData(inputQuery: string): Promise<any> {
        const response = await fetch(`${this.baseUrl}?q=${inputQuery}&appid=${this.apiKey}&units=metric`);

        const data = await response.json();
        return data;
    }
}

const theService = new TheService('apikey todo');

document.getElementById('searchButton')!.addEventListener('click', async () => {
    const inputQuery = (document.getElementById('inputQuery') as HTMLInputElement).value;
    const data = await theService.fetchData(inputQuery);
    const outputDiv = document.getElementById('outputDiv');

    if (outputDiv) {
        outputDiv.innerText = `Temperature: ${data.main.temp}°C
        Weather: ${data.weather[0].description}`;
    }
});