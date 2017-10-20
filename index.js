var MessagingHub = require('messaginghub-client');
var WebSocketTransport = require( 'lime-transport-websocket');
var Lime = require('lime-js');


/*receivers */
var menu = require('./modules/menu/menu');
var receivers = require('./modules/receivers/init');
var receiverFAQ = require('./modules/receivers/faq');
var receiverFaculdade = require('./modules/receivers/faculdade');
var receiverTecnologo = require('./modules/receivers/tecnologo');
var receiverBacharelado = require('./modules/receivers/bacharelado');
var receiverInscricao = require('./modules/receivers/inscricao');
var receiverSaiba = require('./modules/receivers/saiba-mais');
var receiverFim = require('./modules/receivers/fim');

var client = new MessagingHub.ClientBuilder()
.withIdentifier('fisrstjavascript')
.withAccessKey('bkJ0OEFyd29CSlB0eUE3QktBcWg=')
.withTransportFactory(() => new WebSocketTransport())
.build();

// var menuInicial = function() {
// 	return {};
// }
	
client.connect()
.then(() => {
	console.log('BOT CONNECTADO!');
	

	// client.addMessageReceiver('text/plain', function(message) {
	// 	var msgInit = {		
	// 		id: Lime.Guid(),
	// 		type: "text/plain",
	// 		content: "Sejá bem vindo ao bot do colégio Cotemig. ",
	// 		to: message.from			
	// 	};
	// 	client.sendMessage(msgInit);
	// });

	

	// receiver para mensagens de texto
	client.addMessageReceiver("text/plain", function(message) {
        console.log(message);

        if (message.content === 'COMEÇAR'){
            console.log('oi');
            receivers.init(message, client, '');
        } else {
            receiverFim.loop(message, client);
        }

        /* Receivers responsáveis pelo controle do fluxo do Menu.*/
        client.addMessageReceiver('application/vnd.cotemig.inicio+json', function(message) {
            receivers.init(message, client, '');
        });
        client.addMessageReceiver('application/vnd.cotemig.faculdade+json', function(message) {
            receiverFaculdade.faculdade(message, client);
        });
        client.addMessageReceiver('application/vnd.cotemig.faq+json', function(message) {
            receiverFAQ.faq(message, client);
        });
        client.addMessageReceiver('application/vnd.cotemig.tecnologo+json', function(message) {
            receiverTecnologo.tecnico(message, client);
        });
        client.addMessageReceiver('application/vnd.cotemig.bacharelado+json', function(message) {
            receiverBacharelado.bacharel(message, client);
        });
        client.addMessageReceiver('application/vnd.cotemig.inscrever-inscricao+json', function(message) {
            receiverInscricao.inscrever(message, client);
        });
        client.addMessageReceiver('application/vnd.cotemig.saiba+json', function(message) {
            receiverSaiba.mais(message, client);
        });
        client.addMessageReceiver('application/vnd.cotemig.fim+json', function(message) {
            receiverFim.final(message, client);
        });
    });
})
.catch((err) => console.error(err));;