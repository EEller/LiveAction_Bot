'use strict';

var Lime = require('lime-js');
var menu = require('../menu/menu');

exports.final = function(message, client, user){

	let msg = {
        id: Lime.Guid(),
        type: "text/plain",
        to: message.from,
        content: "Espero ter ajudado a sanar a suas dúvidas. Qualquer coisa é só chamar ;D"
    };
    client.sendMessage(msg);
	//interrompe a execucao de outros maisFaculdade
	return false;
};

exports.loop = function(message, client, user){

    let msg = {
        id: Lime.Guid(),
        type: "text/plain",
        to: message.from,
        content: "Ops! Não entendi o que você falou, vamos voltar no menu inicial."
    };
    client.sendMessage(msg);
    setTimeout(function() {
        client.sendMessage(menu.menuInicial(message.from, user));
    }, 1000);
    //interrompe a execucao de outros maisFaculdade
    return false;
};