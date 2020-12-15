import ACT from '../../lib/index';

const { wrap } = require('@brodao/act-jest-snapshot-console');

test('Mensagem aninhada', () => {
	expect(
		wrap(() => {
			ACT.logger.log('Mensagem aninhada');
			ACT.logger.nested('Linha 1');
			ACT.logger.nested('Linha 2');
			ACT.logger.log('Mensagem desaninhada');
		})
	).toMatchSnapshot();
});
