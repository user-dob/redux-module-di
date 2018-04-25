import 'babel-polyfill';
import 'todomvc-app-css/index.css';
import { bootstrapModule } from '../../../src';
import { AppModule } from './app';

bootstrapModule(AppModule, document.getElementById('root') as HTMLElement);