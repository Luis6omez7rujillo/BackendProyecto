import {
  repository,
} from '@loopback/repository';
import {
  param,
  get,
  getModelSchemaRef,
} from '@loopback/rest';
import {
  Pago,
  Pedido,
} from '../models';
import {PagoRepository} from '../repositories';

export class PagoPedidoController {
  constructor(
    @repository(PagoRepository)
    public pagoRepository: PagoRepository,
  ) { }

  @get('/pagos/{id}/pedido', {
    responses: {
      '200': {
        description: 'Pedido belonging to Pago',
        content: {
          'application/json': {
            schema: {type: 'array', items: getModelSchemaRef(Pedido)},
          },
        },
      },
    },
  })
  async getPedido(
    @param.path.string('id') id: typeof Pago.prototype.id,
  ): Promise<Pedido> {
    return this.pagoRepository.pedido(id);
  }
}
