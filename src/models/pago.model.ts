import {Entity, model, property, belongsTo} from '@loopback/repository';
import {Persona} from './persona.model';
import {Pedido} from './pedido.model';

@model()
export class Pago extends Entity {
  @property({
    type: 'string',
    id: true,
    generated: true,
  })
  id?: string;

  @property({
    type: 'date',
    required: true,
  })
  fecha: string;

  @property({
    type: 'number',
    required: true,
  })
  valor: number;

  @belongsTo(() => Persona)
  personaId: string;

  @belongsTo(() => Pedido)
  pedidoId: string;

  constructor(data?: Partial<Pago>) {
    super(data);
  }
}

export interface PagoRelations {
  // describe navigational properties here
}

export type PagoWithRelations = Pago & PagoRelations;
