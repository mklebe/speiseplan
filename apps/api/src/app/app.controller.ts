import { Controller, Get } from '@nestjs/common';

import { Message, Recipe } from '@angular-nest/api-interfaces';

import { AppService } from './app.service';

const gulasch: Recipe = {
  name: 'Gulasch',
  ingredients: [
    {
      name: 'Zwiebeln',
      amount: {
        quantity: 2000,
        unit: 'g'
      }
    },
    {
      name: 'Paprika',
      amount: {
        quantity: 1000,
        unit: 'g'
      }
    },
    {
      name: 'Fleisch',
      amount: {
        quantity: 500,
        unit: 'g'
      }
    }
  ]
}

const quark: Recipe = {
  name: 'Kartoffeln mit Quark',
  ingredients: [
    {
      name: 'Kartoffeln',
      amount: {
        quantity: 600,
        unit: 'g'
      }
    },
    {
      name: 'Quark',
      amount: {
        quantity: 1000,
        unit: 'g',
      }
    },
    {
      name: 'Zwiebeln',
      amount: {
        quantity: 500,
        unit: 'g'
      }
    }
  ],
}

@Controller()
export class AppController {
  constructor(private readonly appService: AppService) {}

  @Get('hello')
  getData(): Message {
    return this.appService.getData();
  }

  @Get('gulasch')
  getGulasch(): Recipe[] {
    return [ gulasch, quark ]
  }
}
