const API_URL = 'http://127.0.0.1:8000/api'; // ou http://localhost:8000/api 
//selon la config de ton backend Laravel

const HOST_URL = '';
const SITE_URL = '';

export const environment = {
  production: false, 
  imagePath: HOST_URL + '', // utile si tu charges des images depuis un autre domaine
  apiUrl: API_URL, 
  siteUrl: SITE_URL, // URL du site (non utilisée ici)
};
