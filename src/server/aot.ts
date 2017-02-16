import * as fs from 'fs';
import {ReflectiveInjector, Type, NgModuleFactory} from '@angular/core';
import {COMPILER_PROVIDERS, JitCompiler, ResourceLoader} from '@angular/compiler';

class FileLoader implements ResourceLoader {
  get(url: string): Promise<string> {
    return new Promise((resolve, reject) => {
      resolve(fs.readFileSync(url
        //.replace('/deploy/', '/src/')
        ).toString());
    });
  }
}

export function compileModule<T>(module: Type<T>): Promise<NgModuleFactory<T>> {
  let injector = ReflectiveInjector.resolveAndCreate([
    COMPILER_PROVIDERS,
    {provide: ResourceLoader, useValue: new FileLoader()}
  ]);
  const compiler = injector.get(JitCompiler) as JitCompiler;
  return compiler.compileModuleAsync(module);
}
