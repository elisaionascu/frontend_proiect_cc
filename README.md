# FrontendProiectCc

This project was generated with [Angular CLI](https://github.com/angular/angular-cli) version 13.3.5.

## Development server

Run `ng serve` for a dev server. Navigate to `http://localhost:4200/`. The application will automatically reload if you change any of the source files.

Introducere

Proiectul pe care l-am realizat este o aplicație web care utilizează servicii din Google Cloud. Partea de backend a fost realizata in nodejs, iar pentru interfata am folosit Angular 12. Ambele tehnologii sunt foarte populare, ușor de folosit și customizat în funcție de necesități. Codul sursă a fost postat pe github la următoarele adrese: Repository backend: https://github.com/elisaionascu/backend_proiect_cc Repository frontend: https://github.com/elisaionascu/frontend_proiect_cc

Link-ul unde găsiți prezentarea video a proiectului este https://youtu.be/Y-FKtsR4QJ8 , iar link-ul de publicare este https://aqueous-wave-63731.herokuapp.com/ În continuare voi prezenta serviciile în cloud folosite prin request-uri de tip REST (request-response), exemplificarea acestora atât din postman, cât și din cadrul aplicației.

Descriere problema

În zilele noastre, manipularea imaginilor a devenit foarte populară și des utilizată mai ales în arhitecturi destinate machine learning. Din prelucrarea imaginilor putem obține o multitudine de informații care ne pot fi de folos în aplicații de detectare, recunoaștere, etc. Astfel, reușim să identificăm texte, culori, adnotari sau obiecte de orice fel prin compararea acestora cu cele deja cunoscute. Procesul de prelucrare al imaginilor se bazează pe sarcini vizuale cum ar fi identificarea etichetelor din imagini, a culorilor, căutarea conținutului și multe altele. Astfel, m-am ajutat de serviciul cloud oferit de Google-Vision API pentru a implementa două prelucrari ale imaginilor: • Prima funcționalitate primește ca input adresa unei imagini si extrage conținutul de tip text din aceasta • Cea de-a doua funcționalitate primește o imagine locală selectată prin browse și detectează repere geografice.

Descriere API

Google Cloud Vision API folosește Recunoașterea Optică a Caracterelor (OCR) pentru a detecta și extrage textul din anumite imagini. Implementare în practică a acestuia se poate realiza în doua moduri: prin furnizare adresei URL a imaginii de prelucrat sau proate prelucra imagini care se află stocate în Google Cloud Storage. [1] Totodată, Vision API implementează și Landmark Detection prin care identifică structuri geografice populare create de oameni în cadrul unor imagini. Este important de menționat că acest API perfomează pe o imagine locală încărcată de utilizator, din care se trimite conținutul ei în format base64, variantă pe care eu am ales să o implementez. De asemenea, se pot folosi și imagini stocate în Google Cloud Storage. [2]

Flux de date

Un flux de date este un mecanism de transmitere a unor date de la server către client automat sau la cerere. Clientul introduce datele care îi sunt necesare și trimite astfel cererea către server. Acesta din urmă realizează diferite prelucrari, dacă este cazul, caută în baza de date sau apelează alte servicii pentru a obține răspunsul dorit. Ulterior, serverul trimite răspunsul către client, furnizându-i informațiile pe care le-a solicitat. Pentru aplicația implementă am realizat atât request-uri de tip GET, cât și request-uri de tip POST. 

În primul rând am configurat o instanță SQL în Google Platform. Folosind această instanță și un user atașat am creat și m-am conectat la o baza de date pentru a crea tabela de care aveam nevoie. Conectarea bazei de date la backend am realizat-o prin intermediul fișierului .env în care am păstrat informațiile de conectare la baza dedate precum numele bazi de date, userul și parola pentru a accesa această bază de date, instanta SQL creată anterior si portul de conectare. 

Pentru a utiliza Vision Cloud API, am enablat acest API căutând-ul în Google Cloud și am creat un API KEY pe care îl voi folosi în stabilirea conexiunii și autentificarea in cloud atunci cand realizez request-urile. Pentru a prelua textul dintr-o imagine, am creat un request de tip GET care primește adresa URL a unei imagini. Prin funcția textDetection(file) am preluat adnotările imaginii și am trimis sub formă de text către utilizator, asa cum se observă în imaginea de mai jos.
![app_img2](https://user-images.githubusercontent.com/64652782/168487715-650e6355-ed9d-48f2-b62c-f2c4d82af95d.PNG)

Cu ajutorul celei de-a doua funcții din Vision API, landmarkDetect(image), am identificat reperul geografic ilustrat. Câmpul obligatoriu image se referă la conținutul base64 al imaginii. 
![app_img3](https://user-images.githubusercontent.com/64652782/168487721-71d2b396-5787-44c8-9951-0812b380e132.PNG)

De asemenea, am găsit interesantă implementare unei hărți a lumii, în care utilizatorul să vadă și locațiile în care se află aceste repere. Pentru acest lucru, m-am folosit de informația locației oferită tot de Vision Cloud API prin functia landmarkDetection. Totodată, am utilizat Maps Javascript API din Google Cloud pentru a desena mapa. În cadrul hărții, prin Geocoding API am afisat cu un marker locatia în care se află respectivul punct geografic. Astfel, în momentul în care utilizatorul încarcă imaginea dorită, primește atât denumirea locației, cât și poziția sa exactă. [3]
![app_img5](https://user-images.githubusercontent.com/64652782/168487728-9a849c16-28c2-479b-aca9-fc53b3915b60.PNG)

Aplicația finală este ilustrată în imaginea de mai jos. 
![app_img1](https://user-images.githubusercontent.com/64652782/168487737-22873b54-929f-4425-9bb3-dfaf63568e84.PNG)

De asemenea, aceste rute au fost testate și în postman pentru o verificare rapidă a backend-ului în procesul de dezvoltare. 
![postman](https://user-images.githubusercontent.com/64652782/168487746-72725183-7091-48bd-8414-f076a0a79bf9.PNG)

Bibliografie

[1] https://cloud.google.com/vision/docs/ocr [2] https://cloud.google.com/vision/docs/detecting-landmarks [3] https://developers.google.com/maps/documentation/javascript/overview


