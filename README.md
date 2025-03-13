## Arcadia Chronicles

## Descrizione

* Arcadia Chronicles È una web app sviluppata con react che si ispira graficamente, con colori vivaci,  alle pagine dei fumetti. L'applicazione permette di visualizzare tutti i giochi attualmente sul mercato tramite una ricerca full text, una ricerca per generi e una ricerca per piattaforme. Permette inoltre di creare un profilo(registrandosi), autenticarsi, aggiungere ad una lista di favoriti i giochi che si preferiscono e di usufruire di una chat in tempo reale sul dettaglio del gioco selezionato.

## API

* API utilizzata: [RAWG](https://api.rawg.io/docs/)
* Database: Supabase

## Stile

* Bootstrap 
* CSS Puro

## Pagine

* Pagine visitabili

1. Account - Pagina che permette all' utente registrato di gestire il profilo
2. Game - Pagina dettaglio gioco
3. Genre - Pagina che permette di visualizzare giochi in base al genere
4. Platform - Pagina che permette di visualizzare giochi in base alla piattaforma
5. Home - Pagina che ti permette di visualizzare tutti i giochi
6. SearchGame - Pagina che restituisce i giochi ricercati per nome
7. SingIn - Pagina di autenticazione
8. SingUp - Pagina di autenticazione

## User Interactions

* Lista di interazioni che utenti autenticati e non posso fare nell'applicazione.

1. Utente non autenticato puo scrollare sui giochi in piattaforma
2. Utente non autenticato puo filtrare per nome del gioco, generi, piattaforme
3. Utente non autenicato puo registrarsi con email e password in piattaforma
4. Utente auteticato puo creare una lista di giochi favoriti
5. Utente autenticato può usufruire della chat in tempo reale
6. Utente autenticato può modificare profilo

## Context

* SessionContext - Gestisce la sessione del profilo

## Deployment

* [LINK](https://alessandro-palumbo-arcadia-chronicles.vercel.app/)