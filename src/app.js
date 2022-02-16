// Import lit-html
import { html, render, directive, asyncReplace } from 'lit-html';
import SPARQLQueryDispatcher from './SPARQLQueryDispatcher';

// other style solution
import './styles.scss';


// development mode
if (process.env.NODE_ENV !== 'production') {
  console.log('Looks like we are in development mode!');
}

const sparqlQuery = `
#List of popes
#added before 2016-10

SELECT ?link ?linkLabel ?picture ?age ?dateOfBirth ?dateOfDeath
WHERE
{
	?link wdt:P31 wd:Q5 ;
    p:P39 [ ps:P39 wd:Q19546 ; pq:P580 ?startTime ] .
	OPTIONAL { ?link wdt:P569 ?dateOfBirth }
	OPTIONAL { ?link wdt:P18 ?picture }
	OPTIONAL { ?link wdt:P570 ?dateOfDeath }
	BIND(YEAR(?dateOfDeath) - YEAR(?dateOfBirth) as ?age)
	SERVICE wikibase:label { bd:serviceParam wikibase:language "[AUTO_LANGUAGE],fr,en" }
}
ORDER BY DESC(?startTime)`;

const queryDispatcher = new SPARQLQueryDispatcher();
const popes = queryDispatcher.query(sparqlQuery)
  .then((result) => {
    console.log(result.results.bindings)
    return result.results.bindings;    
  });

const name = 'World';

const items = ["This", "is", "awesome!!!"];

const list = (html`Array = ${items.map((i) => ` ${i}`)}`);

const header = (
  html`<h1>Hello ${name}</h1>`
);

const resolvePromise = directive((promise) => (part) => {
  // This first setValue call is synchronous, so 
  // doesn't need the commit
  part.setValue("loading");

  Promise.resolve(promise).then((resolvedValue) => {

    console.log(resolvedValue)

    const popeList = (html`<ul>${resolvedValue.map((i) => html`<li>${i.linkLabel.value} - ${i.dateOfBirth && new Date(i.dateOfBirth.value).getFullYear() || null} - ${i.dateOfDeath && new Date(i.dateOfDeath.value).getFullYear() || null}</li>`)}</ul>`);

    part.setValue(popeList);
    part.commit();
  });
});

const waitForIt = new Promise((resolve, reject) => {
  setTimeout(() => {
    resolve("Promise is resolved.");
  }, 1000);
});

const myTemplate = () => 
   html`<div>${resolvePromise(popes)}</div>`; 


// define a template
const app = () => html`
  ${header}
  ${myTemplate()}
`;


// Render the template to the document
render(app(), document.body);