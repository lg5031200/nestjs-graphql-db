import { INestApplication } from '@nestjs/common';
import { Test, TestingModule } from '@nestjs/testing';
import * as request from 'supertest';
import { AppModule } from './app.module';

describe('App Test', () => {
  let app: INestApplication;

  const PRODUCT = `
    query product($id: String!) {
      product(id: $id) {
        id
        name
        description
      }
    }
  `;

  const PRODUCTS = `
    query products($params: CreateProductInput) {
      products(params: $params) {
        id
        name
        description
      }
    }
  `;

  const LOGIN = `
    mutation login($loginData: LoginInput!) {
      login(loginData: $loginData) {
        id
        token
      }
    }
  `;

  beforeEach(async () => {
    const moduleFixture: TestingModule = await Test.createTestingModule({
      imports: [AppModule],
    }).compile();

    app = moduleFixture.createNestApplication();
    await app.init();
  });

  it('Should login success', () => {
    return request(app.getHttpServer())
      .post('/graphql')
      .send({
        operationName: null,
        variables: {
          loginData: { email: 'lg5031200@gmail.com', password: 'sweety912' },
        },
        query: LOGIN,
      })
      .expect(200);
  });

  it('Should get a product by id', () => {
    return request(app.getHttpServer())
      .post('/graphql')
      .send({
        operationName: null,
        variables: { id: '5f599407b612e70026218902' },
        query: PRODUCT,
      })
      .expect(200);
  });

  it('Should get an array of products', () => {
    return request(app.getHttpServer())
      .post('/graphql')
      .send({
        operationName: null,
        variables: { params: { name: 'newUser' } },
        query: PRODUCTS,
      })
      .expect(200);
  });

  afterAll(async () => {
    await app.close();
  });
});
