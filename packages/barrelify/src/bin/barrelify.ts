#!/usr/bin/env node
import 'reflect-metadata';
import { makeBarrel } from '../barrelify';
import { BarrelifyConfig } from '../config/barrelify-config';

makeBarrel(process.cwd(), new BarrelifyConfig())
    .subscribe(file => console.log('Create barrel file:', file),
        err => console.error('Failed with error', err),
        () => console.log('done'));