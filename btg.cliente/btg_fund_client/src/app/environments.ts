import { isDevMode } from '@angular/core';
import * as api_url from './api_url.json';

export const environment = () => {
  var baseUrl = 'http://localhost:8080/api';

  if (!isDevMode()) {
    baseUrl = api_url['base_url']['value'] + "api";
  }

  return {
    production: !isDevMode(),
    baseUrl: baseUrl,
  };
};
