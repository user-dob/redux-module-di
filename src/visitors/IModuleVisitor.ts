import { Module } from '../Module';

export interface IModuleVisitor {
    visit(module: Module): void;
}