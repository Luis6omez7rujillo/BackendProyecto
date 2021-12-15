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
  Persona,
} from '../models';
import {PagoRepository} from '../repositories';

export class PagoPersonaController {
  constructor(
    @repository(PagoRepository)
    public pagoRepository: PagoRepository,
  ) { }

  @get('/pagos/{id}/persona', {
    responses: {
      '200': {
        description: 'Persona belonging to Pago',
        content: {
          'application/json': {
            schema: {type: 'array', items: getModelSchemaRef(Persona)},
          },
        },
      },
    },
  })
  async getPersona(
    @param.path.string('id') id: typeof Pago.prototype.id,
  ): Promise<Persona> {
    return this.pagoRepository.persona(id);
  }
}
