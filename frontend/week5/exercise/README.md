Övning 3 - JavaScript
Skapa en webbsida för inmatning av vitsord i en tentamen. På sidan finns ett formulär med:

en textruta där användaren kan mata in tentens namn
en dropdownlista där användaren kan välja en studerande
en textruta där användaren kan fylla i poäng
en knapp "Beräkna vitsord"
Sidan används så här:

Anvädnaren fyller i tentens namn, väljer studerande och fyller i poäng.
Så fort poängen har fyllts i kontrolleras om poängen ligger mellan 0 och 30.
- Om poängen inte är ok skrivs ett felmeddelande ut strax bredvid textrutan för poäng.
- Om poängen är ok kan användaren klicka på knappen "Vitsord", varvid studerandens vitsord beräknas och skrivs in i listan längst nere på sidan.

Vitsordet beräknas med formeln: heltalsdelen(0,25 * poäng-1,5). Undantag:om poängen ligger under 7 är vitsordet 0. Om poäng är 30 är vitsordet 5.

Längst nere på sidan visas alla vitsordsberäkningar som gjorts under sessionen.

Använd en klass Student som har egenskaper för en studerandes namn och poäng samt funtkionalitet för att beräkna vitsord samt vitsordstyp (0=failed, 1,2,=satisfactory, 3,4=good, 5=excellent) samt för att skriva ut data om en studernade och hens resultat.
