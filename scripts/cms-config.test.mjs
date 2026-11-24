/**
 * The editor form (public/admin/config.yml) must match the content schemas (src/content.config.ts).
 * Nothing else checks this: a misnamed field is silently dropped, and a required field the form
 * doesn't ask for breaks the deploy only after an editor has saved. Compared against the JSON
 * Schemas `astro sync` writes to .astro/collections/, because the TS config needs Astro to load.
 */
import { readFileSync } from 'node:fs';
import assert from 'node:assert/strict';
import { describe, it } from 'node:test';
import yaml from 'js-yaml';

const root = new URL('../', import.meta.url);
const cms = yaml.load(readFileSync(new URL('public/admin/config.yml', root), 'utf8'));

const schemaOf = (collection) => {
  const file = new URL(`.astro/collections/${collection}.schema.json`, root);
  const json = JSON.parse(readFileSync(file, 'utf8'));

  return json.definitions[collection];
};

/** The object schema a nested CMS widget maps to: an object's own, or a list's items. */
const nestedSchemaOf = (property) => property.items ?? property;

/**
 * Every `null` in the config, as a path: an unquoted comma in a `{ label: … }` line splits the
 * label, and the tail becomes an empty key. The config itself uses no `null`.
 */
const nullPathsOf = (value, path) => {
  if (value === null) {
    return [path];
  }

  if (typeof value !== 'object') {
    return [];
  }

  return Object.entries(value).flatMap(([key, child]) => nullPathsOf(child, `${path}.${key}`));
};

/** Every mismatch between CMS fields and an object schema, as readable paths. */
const mismatchesOf = (fields, schema, path = '') => {
  const problems = [];
  const properties = schema.properties ?? {};
  const required = schema.required ?? [];

  for (const field of fields) {
    // The Markdown body is not front matter
    if (field.name === 'body' && !path) {
      continue;
    }

    const where = `${path}${field.name}`;
    const property = properties[field.name];

    if (!property) {
      problems.push(`${where}: in the form, not in the schema`);
      continue;
    }

    if (field.widget === 'select') {
      const allowed = property.enum ?? [];
      const values = field.options.map((option) => option.value ?? option);
      const unknown = values.filter((value) => !allowed.includes(value));

      if (unknown.length) {
        problems.push(`${where}: options ${unknown.join(', ')} not in the schema enum`);
      }
    }

    // The form's pattern is what stops "9.00" before it reaches the build
    if (property.pattern && field.pattern?.[0] !== property.pattern) {
      problems.push(`${where}: form pattern differs from the schema`);
    }

    if (field.fields) {
      problems.push(...mismatchesOf(field.fields, nestedSchemaOf(property), `${where}.`));
    }
  }

  for (const name of required) {
    const field = fields.find((candidate) => candidate.name === name);

    if (!field) {
      problems.push(`${path}${name}: required by the schema, missing from the form`);
    } else if (field.required === false) {
      problems.push(`${path}${name}: required by the schema, optional in the form`);
    }
  }

  return problems;
};

describe('admin config.yml vs content schemas', () => {
  it('config.yml → parses, with collections', () => {
    assert.ok(cms.collections.length > 0);
  });

  it('a label with a comma → quoted, so no label is cut short', () => {
    assert.deepEqual(nullPathsOf(cms, 'config'), []);
  });

  for (const collection of cms.collections) {
    it(`${collection.name} → every field, required field and option matches the schema`, () => {
      assert.deepEqual(mismatchesOf(collection.fields, schemaOf(collection.name)), []);
    });
  }
});
