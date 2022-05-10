import React from 'react';
import axios from 'axios';

const Api = axios.create({
  baseURL: 'https://showmanager.moldar.net',
});

export function getInfo(chave) {
  return Api.get('/exportacao/info?chave=' + chave);
}

export function getProducts(id) {
  return Api.get('/exportacao/produtos?evento_id=' + id);
}

export function getColaboradores(id) {
  return Api.get('/exportacao/colaboradores?evento_id=' + id);

}
