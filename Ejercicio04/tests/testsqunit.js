QUnit.module("Modulo función toCani()");
QUnit.test('Funcion Canificador.toCani()', function(assert) {
    assert.expect(2);
    assert.equal( Canificador.toCani({"texto": "Cecilia me ha dicho que este es el texto a canificar",
        "final":"ORGGG"}), "CeCiLiA Me hA DiXo kE EsTe eS El tExTo a kAnIfIkArORGGG", 'ok, las cadenas son iguales');
    assert.equal( Canificador.getTotal(), 1, 'ok, El contador de usos vale uno');
});

QUnit.module("Modulo función unCanii()");
QUnit.test('Funcion Canificador.toCani()', function(assert) {
    assert.expect(2);
    assert.equal( Canificador.unCani(), "cecilia me ha dixo ce este es el texto a canificar", 'ok, El contador de usos vale uno');
    assert.equal( Canificador.getTotal(), 0, 'ok, El contador de usos vale cero');
});
