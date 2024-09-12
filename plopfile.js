export default function Plopfile(plop) {
  plop.setGenerator('component', {
    description: 'Create a new component',
    prompts: [
      {
        type: 'input',
        name: 'parentPath',
        message: 'src/components/{path please}',
      },
      {
        type: 'input',
        name: 'name',
        message: 'Component name',
      },
    ],
    actions: [
      {
        type: 'add',
        path: 'src/components/{{parentPath}}/{{name}}/{{name}}.tsx',
        templateFile: 'plop-templates/component/Component.tsx.hbs',
      },
      {
        type: 'add',
        path: 'src/components/{{parentPath}}/{{name}}/index.ts',
        templateFile: 'plop-templates/component/index.ts.hbs',
      },
      {
        type: 'add',
        path: 'src/components/{{parentPath}}/{{name}}/{{name}}.stories.tsx',
        templateFile: 'plop-templates/component/Component.stories.tsx.hbs',
      },
      {
        type: 'add',
        path: 'src/components/{{parentPath}}/{{name}}/{{name}}.test.tsx',
        templateFile: 'plop-templates/component/Component.test.tsx.hbs',
      },
    ],
  });

  plop.setGenerator('icon', {
    description: 'Create a new icon',
    prompts: [
      {
        type: 'input',
        name: 'name',
        message: 'Icon name',
      },
    ],
    actions: [
      {
        type: 'add',
        path: 'src/components/icons/{{name}}/{{name}}.tsx',
        templateFile: 'plop-templates/icon/Icon.tsx.hbs',
      },
      {
        type: 'append',
        path: 'src/components/icons/index.ts',
        template: "export * from './{{name}}/{{name}}';",
      },
    ],
  });
}
