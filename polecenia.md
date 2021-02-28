1. Uzywaj camelCase w nazewnictwach pól do bazy / schemy
2. Unikaj numberów w JS, najlepiej jest użyć: decimal.js
3. Do tworzenia Summary użyje: 'monogdb views' + 'agregacja' która sama wyliczy mi całe podsumowanie.
    - UWAGA! Jeśli mongodb będzie liczył źle, trzeba dodać pole do bazy danych = np. summary
4. Ogarnąc doładowanie danych po NIPie (Polskim i zagranicznym)

### ZRÓDŁA DO POCZYTANIA
   [Validacja pól w nestJS](https://www.merixstudio.com/blog/validated-rest-api-nestjs/?fbclid=IwAR1kxeYUCgTqedATuX57fK7vCukfhsgV_6NGs_QJeGyI3G3TvL2kVJH1yS4)
   
   [Agregowanie pól w mongodb](https://stackoverflow.com/questions/4621300/how-to-sum-the-value-of-a-key-across-all-documents-in-a-mongodb-collection/13875668#13875668)
   
   [Sumowanie tylko kiedy tego che](https://docs.mongodb.com/manual/core/materialized-views/)
   
   [Sumowanie pól w mongoDb](https://docs.mongodb.com/manual/core/views/)