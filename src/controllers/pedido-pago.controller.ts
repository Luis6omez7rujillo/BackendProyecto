import {
  Count,
  CountSchema,
  Filter,
  repository,
  Where,
} from '@loopback/repository';
import {
  del,
  get,
  getModelSchemaRef,
  getWhereSchemaFor,
  param,
  patch,
  post,
  requestBody,
} from '@loopback/rest';
import {
  Pedido,
  Pago,
} from '../models';
import {PedidoRepository} from '../repositories';

export class PedidoPagoController {
  constructor(
    @repository(PedidoRepository) protected pedidoRepository: PedidoRepository,
  ) { }

  @get('/pedidos/{id}/pagos', {
    responses: {
      '200': {
        description: 'Array of Pedido has many Pago',
        content: {
          'application/json': {
            schema: {type: 'array', items: getModelSchemaRef(Pago)},
          },
        },
      },
    },
  })
  async find(
    @param.path.string('id') id: string,
    @param.query.object('filter') filter?: Filter<Pago>,
  ): Promise<Pago[]> {
    return this.pedidoRepository.pagos(id).find(filter);
  }

  @post('/pedidos/{id}/pagos', {
    responses: {
      '200': {
        description: 'Pedido model instance',
        content: {'application/json': {schema: getModelSchemaRef(Pago)}},
      },
    },
  })
  async create(
    @param.path.string('id') id: typeof Pedido.prototype.id,
    @requestBody({
      content: {
        'application/json': {
          schema: getModelSchemaRef(Pago, {
            title: 'NewPagoInPedido',
            exclude: ['id'],
            optional: ['pedidoId']
          }),
        },
      },
    }) pago: Omit<Pago, 'id'>,
  ): Promise<Pago> {
    return this.pedidoRepository.pagos(id).create(pago);
  }

  @patch('/pedidos/{id}/pagos', {
    responses: {
      '200': {
        description: 'Pedido.Pago PATCH success count',
        content: {'application/json': {schema: CountSchema}},
      },
    },
  })
  async patch(
    @param.path.string('id') id: string,
    @requestBody({
      content: {
        'application/json': {
          schema: getModelSchemaRef(Pago, {partial: true}),
        },
      },
    })
    pago: Partial<Pago>,
    @param.query.object('where', getWhereSchemaFor(Pago)) where?: Where<Pago>,
  ): Promise<Count> {
    return this.pedidoRepository.pagos(id).patch(pago, where);
  }

  @del('/pedidos/{id}/pagos', {
    responses: {
      '200': {
        description: 'Pedido.Pago DELETE success count',
        content: {'application/json': {schema: CountSchema}},
      },
    },
  })
  async delete(
    @param.path.string('id') id: string,
    @param.query.object('where', getWhereSchemaFor(Pago)) where?: Where<Pago>,
  ): Promise<Count> {
    return this.pedidoRepository.pagos(id).delete(where);
  }
}
