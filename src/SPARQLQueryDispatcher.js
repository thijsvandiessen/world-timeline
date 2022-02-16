
export default class SPARQLQueryDispatcher {
	constructor(endpoint) {
		this.endpoint = endpoint || 'https://query.wikidata.org/sparql';
	}

	query(sparqlQuery) {
		const fullUrl = this.endpoint + '?query=' + encodeURIComponent(sparqlQuery);
		const headers = { 
      'Accept': 'application/sparql-results+json'
    };

		return fetch( fullUrl, { headers } )
      .then( body => body.json() );
	}
}
