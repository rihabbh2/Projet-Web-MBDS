# Projet-Web-MBDS
Projet Web du Master 2 MBDS avec React JS,  Node JS et MongoDB de Ben Hamouda Rihab

#Pour lancer le projet : 

Ouvrir un terminal de commander et entrez:

sudo service mongod start 

//puis avec le terminal entrer à l'intérireur du projet et tapez : 

mongoimport --db test --collection videos --file db.json --jsonArray

// afin d'importer la base de données , puis entrez 

npm install

//Entrer dans le répertoire Back_end_NodeJs_MongoDb

cd Back_end_NodeJs_MongoDb

node serverCrudWithMongo.js 

// celà lancera l' API avec NodeJS et MongoDB sur le port 8000
//Ensuite dans un autre terminal, accédez à mbds_web-project

cd mbds_web-project

npm start 

// lancera l'application sur le port 3000
