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
  Persona,
  Pago,
} from '../models';
import {PersonaRepository} from '../repositories';

export class PersonaPagoController {
  constructor(
    @repository(PersonaRepository) protected personaRepository: PersonaRepository,
  ) { }

  @get('/personas/{id}/pagos', {
    responses: {
      '200': {
        description: 'Array of Persona has many Pago',
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
    return this.personaRepository.pagos(id).find(filter);
  }

  @post('/personas/{id}/pagos', {
    responses: {
      '200': {
        description: 'Persona model instance',
        content: {'application/json': {schema: getModelSchemaRef(Pago)}},
      },
    },
  })
  async create(
    @param.path.string('id') id: typeof Persona.prototype.id,
    @requestBody({
      content: {
        'application/json': {
          schema: getModelSchemaRef(Pago, {
            title: 'NewPagoInPersona',
            exclude: ['id'],
            optional: ['personaId']
          }),
        },
      },
    }) pago: Omit<Pago, 'id'>,
  ): Promise<Pago> {
    return this.personaRepository.pagos(id).create(pago);
  }

  @patch('/personas/{id}/pagos', {
    responses: {
      '200': {
        description: 'Persona.Pago PATCH success count',
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
    return this.personaRepository.pagos(id).patch(pago, where);
  }

  @del('/personas/{id}/pagos', {
    responses: {
      '200': {
        description: 'Persona.Pago DELETE success count',
        content: {'application/json': {schema: CountSchema}},
      },
    },
  })
  async delete(
    @param.path.string('id') id: string,
    @param.query.object('where', getWhereSchemaFor(Pago)) where?: Where<Pago>,
  ): Promise<Count> {
    return this.personaRepository.pagos(id).delete(where);
  }
}
