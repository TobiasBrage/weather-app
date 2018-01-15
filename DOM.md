# Javascript DOM

### Mål
* DOM Navigation - kan navigere i DOM vha. javascript
* DOM Manipulation - kan oprette og manipulere objekter i DOM vha. javascript

Primær referencer: javascript.info

### Lektie denne uge
Læs afsnittet `Document` http://javascript.info/document Test samtidig en række af eksemplerne

### Nodes i DOM
![DOM](http://javascript.info/article/dom-navigation/dom-links@2x.png)

### Øvelse 1: DOM Navigation
http://javascript.info/dom-navigation 
1. Opret en html-side med 3 div-elementer og tilhørende js-fil med en eventlistener til `DOMContentLoaded`
```html
<!DOCTYPE html>
<html lang="en">

<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <meta http-equiv="X-UA-Compatible" content="ie=edge">
    <title>Document</title>
</head>

<body>
    <div>div 1</div>
    <div>div 2</div>
    <div>div 3</div>
</body>
<script src="dom.js"></script>

</html>
```
2. Udskriv følgende med `console.log`
    - document
    - document.documentElement
    - document.body;
> break

3. Find og udskriv det første div-element med "child"
4. og herefter de øvrige div-elementer med "sibling"
> break

5. Hent alle div-elementer og udskriv de enkelte nodeValues vha. en for-løkke
> break


### Øvelse 2: DOM Manipulation
[http://javascript.info/modifying-document](http://javascript.info/modifying-document)
1. Slet alle div-elementer vha. javascript
> break

2. Opret et div-element med createElement
3. Opret en text-node med createTextNode
4. Tilføj text-node til div-element, for til sidst body - alle tre med appenChild
> break

5. Tilføj en class og et id til div-elementet
> break

6. Opret et h2-element med teksten "DOM Javascript" og placer det før div-elementet
> break

7. Operet et ol-element samt to tilhørende li-elementer
> break

8. Opret et array med tre elementer
9. Opret en forEach-løkke som tilføjer et list-element for hvert argument i array'et
> break

10. Opret et div-element med tekst, lav en klon og tilføj en ny tekst til klonen. Vis begge div-elementer på siden.

11. Opret flg. html hvor teksterne hentes fra et array
```html
    <nav>
      <ul>
        <li><a href="#">Home</a></li>
        <li><a href="#">Our team</a></li>
        <li><a href="#">Projects</a></li>
        <li><a href="#">Contact</a></li>
      </ul>
     </nav>
```

### Øvlese 3: fetch

1. Hent en række forskellige informationer fra api'en og generer en dynamisk udskrift vha. createElement i stedet for innerHTML.

Eksemplet herunder er fra tidligere undervisning.

```javascript
document.addEventListener('DOMContentLoaded', function (event) {

    fetch('https://swapi.co/api/people/')
        .then((response) => {
            return response.json();
        })
        .then((json) => {
            console.log(json);
            var content = document.getElementById('content');
            content.innerHTML = '<h1>' + json.results[0].name + '</h1>';
        })

});
```
### Øvlese 4: Validering

1. Valider kontaktformularen vha. DOM. ved at indsætte en rød stjerne ud for de felter som ikke er valide.


```html
    <form ation="#" method="post">
        <div>
            <label for="name">Name:</label>
            <input type="text" id="name" name="user_name">
        </div>
        <div>
            <label for="mail">E-mail:</label>
            <input type="email" id="mail" name="user_mail">
        </div>
        <div>
            <label for="msg">Message:</label>
            <textarea id="msg" name="user_message"></textarea>
        </div>
        <div class="button">
            <button type="submit">Send your message</button>
        </div>
    </form>
```

Brug denne CSS
```css
form {
    /* Just to center the form on the page */
    margin: 0 auto;
    width: 400px;
    /* To see the outline of the form */
    padding: 1em;
    border: 1px solid #CCC;
    border-radius: 1em;
  }
  
  form div + div {
    margin-top: 1em;
  }
  
  label {
    /* To make sure that all labels have the same size and are properly aligned */
    display: inline-block;
    width: 60px;
    text-align: right;
  }
  
  input, textarea {
    /* To make sure that all text fields have the same font settings
       By default, textareas have a monospace font */
    font: 1em sans-serif;
  
    /* To give the same size to all text fields */
    width: 300px;
    box-sizing: border-box;
  
    /* To harmonize the look & feel of text field border */
    border: 1px solid #999;
  }
  
  input:focus, textarea:focus {
    /* To give a little highlight on active elements */
    border-color: #000;
  }
  
  textarea {
    /* To properly align multiline text fields with their labels */
    vertical-align: top;
  
    /* To give enough room to type some text */
    height: 5em;
  }
  
  .button {
    /* To position the buttons to the same position of the text fields */
    padding-left: 90px; /* same size as the label elements */
  }
  
  button {
    /* This extra margin represent roughly the same space as the space
       between the labels and their text fields */
    margin-left: .5em;
  }
```
